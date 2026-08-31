/**
 * Rebuilds the scroll-story frame sequence.
 *
 * The source video (~29s @ 30fps) was exported as PNGs across three folders
 * (1/, 2/, 3/) purely because of export limits — they are ONE continuous take.
 * This script stitches them back together in order, removes frames that barely
 * change from the one before (see DEDUP_T), and writes two WebP sets sized for
 * desktop and mobile.
 *
 * Why the dedup: the take holds still at a few moments (the palm-up gesture, the
 * fire-fist at the end). Played frame-by-frame those holds look like the same
 * frame repeating as you scroll. Dropping the near-still frames — while keeping
 * every frame that actually moves — makes each remaining frame visibly distinct,
 * so the scrub always moves and nothing looks repeated.
 *
 * Requires ffmpeg on PATH.
 *   node scripts/build-frames.mjs
 * After it runs, set FRAME_COUNT in src/lib/frames.ts to the number it prints.
 */
import { execFileSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

const SOURCE_DIRS = ['1', '2', '3'];
const STAGE_DIR = path.join(root, '.frames-src'); // all stitched frames
const SEL_DIR = path.join(root, '.frames-sel'); //   deduped, renumbered

/** Keep every Nth source frame. 1 → full native 30fps before dedup. */
const STRIDE = 1;
/** Hard cutoff on the stitched length. Infinity = keep the whole take. */
const LAST_FRAME = Infinity;
/**
 * Dedup strength. A frame is kept once the accumulated (blurred) motion since
 * the last kept frame reaches this. Higher = drop more near-still frames.
 * 0 disables dedup entirely. ~1.0 collapses the holds while keeping all real
 * motion at full frame rate.
 */
const DEDUP_T = 1.0;
/**
 * Drop this many frames off the end AFTER dedup — the take finishes on an
 * unwanted fire-fist push-in we don't use. With DEDUP_T fixed the dedup is
 * deterministic (446 kept), so trimming 7 lands on 439.
 */
const TRIM_LAST = 7;

const OUTPUTS = [
  { name: 'desktop', width: 1600, quality: 86 },
  { name: 'mobile', width: 1024, quality: 82 },
];

const numeric = (file) => {
  const match = file.match(/(\d+)/);
  return match ? Number(match[1]) : 0;
};

/** Stitch folders 1→2→3 into STAGE_DIR as f_00000.png … (0-indexed). */
function stage() {
  fs.rmSync(STAGE_DIR, { recursive: true, force: true });
  fs.mkdirSync(STAGE_DIR, { recursive: true });

  let index = 0;
  let source = 0;
  for (const dir of SOURCE_DIRS) {
    const abs = path.join(root, dir);
    if (!fs.existsSync(abs)) throw new Error(`Missing source folder: ${abs}`);

    const files = fs
      .readdirSync(abs)
      .filter((file) => file.toLowerCase().endsWith('.png'))
      .sort((a, b) => numeric(a) - numeric(b));

    for (const file of files) {
      if (index >= LAST_FRAME) return index;
      if (source % STRIDE === 0) {
        const target = path.join(STAGE_DIR, `f_${String(index).padStart(5, '0')}.png`);
        try {
          fs.linkSync(path.join(abs, file), target);
        } catch {
          fs.copyFileSync(path.join(abs, file), target);
        }
        index += 1;
      }
      source += 1;
    }
  }
  return index;
}

/** Per-frame motion = mean luma of the blurred frame-to-frame difference. */
function computeMotion(count) {
  execFileSync(
    'ffmpeg',
    [
      '-y', '-loglevel', 'error', '-start_number', '0',
      '-i', 'f_%05d.png',
      // Downscale + blur so flame flicker and tiny camera drift don't register
      // as motion — only real movement of the subject does.
      '-vf',
      'scale=160:90,boxblur=3:1,tblend=all_mode=difference,signalstats,metadata=print:file=__motion.txt',
      '-f', 'null', '-',
    ],
    { cwd: STAGE_DIR, stdio: 'inherit' }
  );

  const text = fs.readFileSync(path.join(STAGE_DIR, '__motion.txt'), 'utf8');
  fs.rmSync(path.join(STAGE_DIR, '__motion.txt'), { force: true });

  const motion = new Array(count).fill(0);
  let frame = -1;
  for (const line of text.split('\n')) {
    const f = line.match(/^frame:(\d+)/);
    if (f) { frame = Number(f[1]); continue; }
    const y = line.match(/YAVG=([\d.]+)/);
    if (y && frame >= 0 && frame < count) motion[frame] = Number(y[1]);
  }
  motion[0] = motion[1] ?? 0; // frame 0 diffs against black
  return motion;
}

/** Keep a frame each time accumulated motion crosses DEDUP_T. */
function selectFrames(motion, count) {
  if (!DEDUP_T) return Array.from({ length: count }, (_, i) => i);
  const kept = [0];
  let acc = 0;
  for (let i = 1; i < count; i += 1) {
    acc += motion[i];
    if (acc >= DEDUP_T) {
      kept.push(i);
      acc = 0;
    }
  }
  if (kept[kept.length - 1] !== count - 1) kept.push(count - 1);
  return kept;
}

/** Re-link the kept frames into SEL_DIR with contiguous numbering. */
function restage(kept) {
  fs.rmSync(SEL_DIR, { recursive: true, force: true });
  fs.mkdirSync(SEL_DIR, { recursive: true });
  kept.forEach((srcIndex, j) => {
    const from = path.join(STAGE_DIR, `f_${String(srcIndex).padStart(5, '0')}.png`);
    const to = path.join(SEL_DIR, `f_${String(j).padStart(5, '0')}.png`);
    try {
      fs.linkSync(from, to);
    } catch {
      fs.copyFileSync(from, to);
    }
  });
}

function encode(fromDir) {
  for (const output of OUTPUTS) {
    const dir = path.join(root, 'public', 'frames', output.name);
    fs.rmSync(dir, { recursive: true, force: true });
    fs.mkdirSync(dir, { recursive: true });

    console.log(`Encoding ${output.name} @ ${output.width}px…`);
    execFileSync(
      'ffmpeg',
      [
        '-y', '-loglevel', 'error', '-stats',
        '-framerate', '30', '-start_number', '0',
        '-i', path.join(fromDir, 'f_%05d.png'),
        '-vf', `scale=${output.width}:-2`,
        '-fps_mode', 'passthrough',
        '-c:v', 'libwebp',
        '-quality', String(output.quality),
        '-compression_level', '5',
        path.join(dir, 'frame_%04d.webp'),
      ],
      { stdio: 'inherit' }
    );

    const files = fs.readdirSync(dir);
    const bytes = files.reduce((sum, f) => sum + fs.statSync(path.join(dir, f)).size, 0);
    console.log(`  ${files.length} frames · ${(bytes / 1024 / 1024).toFixed(1)} MB total\n`);
  }
}

const staged = stage();
console.log(`Staged ${staged} source frames.`);

let encodeDir = STAGE_DIR;
let finalCount = staged;
if (DEDUP_T) {
  console.log('Measuring motion for dedup…');
  const motion = computeMotion(staged);
  let kept = selectFrames(motion, staged);
  if (TRIM_LAST > 0) kept = kept.slice(0, Math.max(1, kept.length - TRIM_LAST));
  restage(kept);
  encodeDir = SEL_DIR;
  finalCount = kept.length;
  console.log(
    `Dedup (T=${DEDUP_T}) + trim ${TRIM_LAST}: kept ${kept.length} of ${staged} frames.`
  );
}

encode(encodeDir);
fs.rmSync(STAGE_DIR, { recursive: true, force: true });
fs.rmSync(SEL_DIR, { recursive: true, force: true });

console.log(`\nDone. Set FRAME_COUNT in src/lib/frames.ts to ${finalCount}.`);
