# Personal Brand Site

A cinematic, scroll-driven personal brand landing page. Next.js App Router · TypeScript · Tailwind CSS · GSAP + ScrollTrigger · Lenis.

```bash
npm install
npm run dev
```

Open <http://localhost:3000>.

---

## The frame sequence

The centrepiece is a scroll-scrubbed canvas animation built from the source video.

**Source:** a single ~29s take exported as 872 PNGs at 1920×1080, split across `1/`, `2/`, `3/` only because of export limits. It is one continuous shot — `scripts/build-frames.mjs` stitches the folders back in order.

**Output:** the full take is kept — all 872 frames, in order — at the native 30fps, encoded twice. The scroll maps straight to the frame index, so every frame plays across the story from start to finish (`LAST_FRAME = Infinity` in the script keeps the whole take).

| Set | Width | Quality | Frames | Total |
| --- | ----- | ------- | ------ | ----- |
| `public/frames/desktop` | 1600px | q86 | 872 | ~35 MB |
| `public/frames/mobile`  | 1024px | q82 | 872 | ~15 MB |

Keeping every frame (rather than sampling) is what makes slow, deliberate scrubbing look smooth instead of stepping between sparse keyframes. Note the source itself pauses at a couple of moments (the palm-up gesture, the fire-fist at the end) — with every frame played in order, the scrub dwells there too, because that is what the footage does.

The `public/hero.webp` poster (frame 178, 1600px q92) is a dedicated high-quality still for the hero section and the reduced-motion fallback.

To regenerate (requires `ffmpeg` on PATH, plus the `1/2/3` folders):

```bash
npm run frames
```

Tune `STRIDE` and the `OUTPUTS` widths/quality at the top of the script. If the frame count changes, update `FRAME_COUNT` in `src/lib/frames.ts` — the script prints the correct value.

### How playback works

- `src/hooks/useFrameSequence.ts` loads images **coarse-to-fine** — sweeping at stride 16, then 8, 4, 2, 1. After ~30 requests every scrub position already has a frame near it, so the story is scrubbable almost immediately and visibly sharpens as finer passes land. Sequential loading would leave the back half of the timeline blank for seconds.
- **Bounded memory:** 872 decoded frames at 1600px would pin ~5 GB of bitmaps, so the hook holds them in a capped **LRU window** (~280 desktop / 200 mobile). The viewed frame is touched every render tick, so it and its neighbours are never evicted; far-away frames are dropped and re-decoded from the immutable HTTP cache on demand (cheap and rare, because scrubbing is local).
- `getFrame()` walks outward to the nearest decoded neighbour, so scrubbing never blanks.
- `src/components/sections/ScrollStory.tsx` draws to a canvas with cover-fit geometry, DPR capped at 2, and redraws only when the resolved image actually changes. Scroll maps straight to the frame index (frame 0 → 871). The pinned story spans `STORY_SCROLL_VH` (1400vh) with a scrub of 1.1 — a long, eased, cinematic playback rather than a fast snap. **`STORY_SCROLL_VH` in `src/lib/frames.ts` is the single knob for playback speed** — raise it to slow the scrub further, lower it to quicken.
- Below 768px the mobile set is used; the choice is deferred until after hydration so a phone never starts pulling the 1600px set.
- With `prefers-reduced-motion: reduce`, the sequence is not downloaded at all — the poster still and a static text layout render instead.

---

## Structure

```
src/
├── app/              layout, page, globals.css, robots, sitemap
├── components/
│   ├── layout/       Navbar, Footer, ScrollProgress
│   ├── providers/    SmoothScrollProvider (Lenis), Preloader
│   ├── sections/     Hero, ScrollStory, About, Skills, Products,
│   │                 Projects, Testimonials, Contact
│   └── ui/           MagneticButton, TextReveal, Reveal, Parallax,
│                     SectionHeading, Marquee, ProductIcon
├── data/             site, products, projects, skills, testimonials
├── hooks/            useFrameSequence, useMediaQuery, …
└── lib/              gsap singleton, frame config, utils
```

**All copy is placeholder.** Edit the files in `src/data/` — name, role, email, products, projects, testimonials and stats all live there.

---

## Design system

60 / 30 / 10, enforced by the palette in `tailwind.config.ts`:

- **60% `canvas`** `#FFFFFF`
- **30% `surface` / `mist` / `line`** `#F7F7F8` → `#E4E4E7`
- **10% `accent`** `#C8102E` — reserved for actions, live indicators, and single-word emphasis

Type pairs **Space Grotesk** (display) with **Inter** (body), both via `next/font`. Fluid `clamp()` scales live in the Tailwind `fontSize` config.

Wrap a word in `{curly braces}` inside `<TextReveal>` to tint it with the accent:

```tsx
<TextReveal as="h2">{'A builder first. {Everything} else came after.'}</TextReveal>
```

---

## Motion

Lenis and GSAP share **one rAF loop** (`gsap.ticker` drives `lenis.raf`, with `lagSmoothing(0)`), so scrubbed timelines and smooth scroll never run on separate clocks.

Included: page preloader with counter and curtain wipe, scroll progress bar, per-word mask reveals, staggered fade-ins, magnetic buttons, parallax, pinned horizontal testimonial rail, cursor-tracked project preview, and the frame sequence.

Every animation is behind `prefers-reduced-motion`. When it is set, Lenis is not instantiated, the `.no-motion` class forces reveal primitives visible, and the horizontal rail falls back to a vertical stack.

---

## Accessibility & SEO

Skip link, focus-visible rings, labelled form controls, `aria-live` on the form status, `aria-expanded` on the mobile menu, semantic landmarks, and decorative layers marked `aria-hidden`.

Metadata, Open Graph, Twitter card, JSON-LD `Person` schema, `robots.ts` and `sitemap.ts` are wired up. Set the real domain in `src/data/site.ts` (`url`) — `metadataBase` reads from it.

---

## Notes

- Frontend only. The contact form is a demo that prevents default and shows a confirmation; wire it to your provider of choice.
- `public/frames/*` is served with a one-year immutable cache header (`next.config.mjs`).
- Add an Open Graph image at `public/og.png` and reference it in `openGraph.images` in `src/app/layout.tsx`.

# Labs-landing
