/**
 * Frame-sequence configuration.
 *
 * The source video (~29s @ 30fps) was exported as 872 PNGs split across three
 * folders purely because of export limits. `scripts/build-frames.mjs` stitches
 * them back into ONE continuous sequence, then drops frames that barely change
 * from the one before (the palm-up hold, the fire-fist tail) so nothing looks
 * like it repeats, then trims the unwanted fire-fist tail — leaving 439 frames.
 * The loader holds the decoded frames in a bounded LRU window so the sequence
 * never blows memory.
 *
 * Scroll maps straight to the frame index, so every remaining frame plays in
 * order across the story. Keep this in sync with the count the build script
 * prints after a dedup run.
 *
 * ffmpeg's image2 muxer numbers output from 1, so file N holds sequence index N-1.
 */
export const FRAME_COUNT = 439;

export type FrameSet = 'desktop' | 'mobile';

/** Below this viewport width we serve the 828px set instead of the 1440px one. */
export const MOBILE_BREAKPOINT = 768;

export function frameUrl(index: number, set: FrameSet): string {
  const n = String(index + 1).padStart(4, '0');
  return `/frames/${set}/frame_${n}.webp`;
}

/** The still shown before the sequence takes over (and for reduced-motion users). */
export const POSTER_FRAME = 0;

/**
 * How much scroll distance the pinned story occupies, in viewport heights.
 * Larger = slower, more deliberate playback (less video advances per scroll).
 * ~1.7vh per (now distinct) frame keeps the scrub slow but still smooth. This
 * is THE knob to tune playback speed — raise it to slow it, lower to quicken.
 */
export const STORY_SCROLL_VH = 760;
