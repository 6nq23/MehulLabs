'use client';

import { useCallback, useRef } from 'react';

import { gsap, ScrollTrigger } from '@/lib/gsap';
import {
  FRAME_COUNT,
  MOBILE_BREAKPOINT,
  STORY_SCROLL_VH,
  frameUrl,
  type FrameSet,
} from '@/lib/frames';
import { useFrameSequence } from '@/hooks/useFrameSequence';
import { useIsomorphicLayoutEffect } from '@/hooks/useIsomorphicLayoutEffect';
import { useMediaQuery, usePrefersReducedMotion } from '@/hooks/useMediaQuery';

/** Narrative beats laid over the sequence, spaced across scroll progress. */
const beats = [
  {
    kicker: '01 — Origin',
    line: 'It starts with a person,',
    emphasis: 'not a prompt.',
    align: 'left' as const,
  },
  {
    kicker: '02 — Practice',
    line: 'Nine years spent watching',
    emphasis: 'where software breaks.',
    align: 'right' as const,
  },
  {
    kicker: '03 — Conviction',
    line: 'Judgment is the part',
    emphasis: 'you cannot automate.',
    align: 'left' as const,
  },
  {
    kicker: '04 — Output',
    line: 'Everything after that',
    emphasis: 'is just shipping.',
    align: 'right' as const,
  },
];

export function ScrollStory() {
  const wrapRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const beatsRef = useRef<HTMLDivElement>(null);
  const railRef = useRef<HTMLSpanElement>(null);
  const lastDrawnRef = useRef<HTMLImageElement | null>(null);

  const reduced = usePrefersReducedMotion();
  const isMobile = useMediaQuery(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`);

  // Stay null through hydration so we never start pulling the 1600px set on a phone.
  const set: FrameSet | null = isMobile === null ? null : isMobile ? 'mobile' : 'desktop';

  const srcFor = useCallback(
    (index: number) => frameUrl(index, set ?? 'desktop'),
    [set]
  );

  const { getFrame, progress, ready } = useFrameSequence({
    count: FRAME_COUNT,
    srcFor,
    concurrency: 8,
    // Mobile bitmaps are smaller, but so is the RAM budget — cap tighter there.
    maxDecoded: isMobile ? 200 : 280,
    enabled: set !== null && !reduced,
  });

  useIsomorphicLayoutEffect(() => {
    const wrap = wrapRef.current;
    const canvas = canvasRef.current;
    if (!wrap || !canvas || reduced) return;

    const context = canvas.getContext('2d', { alpha: false });
    if (!context) return;

    // Scroll maps straight to frame index — every frame plays in order.
    const state = { frame: 0 };

    const paintBackdrop = () => {
      context.fillStyle = '#FFFFFF';
      context.fillRect(0, 0, canvas.width, canvas.height);
    };

    const draw = () => {
      const image = getFrame(state.frame);
      if (!image) return;
      // Identity check, not index check: while coarse passes are still filling
      // in, many indices resolve to the same nearest frame and redrawing them
      // would burn a drawImage every tick for no visual change.
      if (image === lastDrawnRef.current) return;
      lastDrawnRef.current = image;

      const cw = canvas.width;
      const ch = canvas.height;
      const imageRatio = image.width / image.height;
      const canvasRatio = cw / ch;

      let dw: number;
      let dh: number;
      if (canvasRatio > imageRatio) {
        dw = cw;
        dh = cw / imageRatio;
      } else {
        dh = ch;
        dw = ch * imageRatio;
      }

      context.drawImage(image, (cw - dw) / 2, (ch - dh) / 2, dw, dh);
    };

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      if (!rect.width || !rect.height) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const nextW = Math.round(rect.width * dpr);
      const nextH = Math.round(rect.height * dpr);
      if (canvas.width === nextW && canvas.height === nextH) return;

      canvas.width = nextW;
      canvas.height = nextH;
      paintBackdrop();
      lastDrawnRef.current = null; // force a repaint at the new size
      draw();
    };

    resize();
    const observer = new ResizeObserver(resize);
    observer.observe(canvas);

    const ctx = gsap.context(() => {
      gsap.to(state, {
        frame: FRAME_COUNT - 1,
        ease: 'none',
        scrollTrigger: {
          trigger: wrap,
          start: 'top top',
          end: 'bottom bottom',
          // Higher scrub = the canvas eases toward the target frame instead of
          // snapping to it, which reads as smoother, more cinematic playback.
          scrub: 1.1,
          invalidateOnRefresh: true,
        },
      });

      gsap.fromTo(
        railRef.current,
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: wrap,
            start: 'top top',
            end: 'bottom bottom',
            scrub: 0.4,
          },
        }
      );

      // Beats cross-fade against the sequence rather than cutting.
      const items = beatsRef.current?.querySelectorAll('[data-beat]') ?? [];
      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: wrap,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 0.5,
        },
      });

      items.forEach((item, index) => {
        const at = index * 2.2 + 0.5;
        timeline
          .fromTo(
            item,
            { opacity: 0, y: 34, filter: 'blur(6px)' },
            { opacity: 1, y: 0, filter: 'blur(0px)', duration: 0.9, ease: 'power2.out' },
            at
          )
          .to(
            item,
            { opacity: 0, y: -28, filter: 'blur(6px)', duration: 0.8, ease: 'power2.in' },
            at + 1.3
          );
      });
    }, wrapRef);

    gsap.ticker.add(draw);

    return () => {
      gsap.ticker.remove(draw);
      observer.disconnect();
      ctx.revert();
    };
  }, [getFrame, reduced]);

  // Reduced motion: a single still, no pinning, no sequence download.
  if (reduced) {
    return (
      <section id="story" className="relative bg-canvas py-section">
        <div className="shell">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/hero.webp"
            alt="Portrait of the founder against a bright studio backdrop"
            className="aspect-video w-full rounded-xl3 object-cover"
            loading="lazy"
            decoding="async"
          />
          <div className="mt-12 grid gap-10 sm:grid-cols-2">
            {beats.map((beat) => (
              <div key={beat.kicker}>
                <span className="eyebrow">{beat.kicker}</span>
                <p className="mt-3 font-display text-display-sm text-ink">
                  {beat.line} <span className="text-accent">{beat.emphasis}</span>
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      id="story"
      ref={wrapRef}
      className="relative bg-canvas"
      style={{ height: `${STORY_SCROLL_VH}vh` }}
      aria-label="Cinematic brand story"
    >
      <div className="sticky top-0 h-[100svh] w-full overflow-hidden">
        <canvas
          ref={canvasRef}
          className="absolute inset-0 h-full w-full"
          aria-hidden="true"
        />

        {/* Blends the footage edges into the white page on both ends */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              'linear-gradient(180deg, #fff 0%, rgba(255,255,255,0) 18%, rgba(255,255,255,0) 78%, rgba(255,255,255,0.96) 100%)',
          }}
          aria-hidden="true"
        />

        {/* Narrative beats */}
        <div ref={beatsRef} className="absolute inset-0">
          {beats.map((beat) => (
            <div
              key={beat.kicker}
              data-beat
              style={{ opacity: 0 }}
              className={`shell absolute inset-x-0 top-1/2 flex -translate-y-1/2 flex-col ${
                beat.align === 'right' ? 'items-start md:items-end md:text-right' : 'items-start'
              }`}
            >
              <span className="eyebrow mb-4 text-ink-muted">{beat.kicker}</span>
              <p className="max-w-[16ch] font-display text-display-md leading-[1.02] text-ink">
                {beat.line}{' '}
                <span className="text-accent">{beat.emphasis}</span>
              </p>
            </div>
          ))}
        </div>

        {/* Timeline rail */}
        <div className="pointer-events-none absolute right-[var(--shell-x)] top-1/2 hidden h-40 -translate-y-1/2 md:block">
          <span className="absolute inset-y-0 left-1/2 w-px -translate-x-1/2 bg-ink/12" />
          <span
            ref={railRef}
            className="absolute inset-y-0 left-1/2 w-px origin-top -translate-x-1/2 bg-accent"
            style={{ transform: 'translateX(-50%) scaleY(0)' }}
          />
        </div>

        {/* Buffering hint — disappears the moment scrubbing is gapless */}
        <div
          className={`pointer-events-none absolute bottom-8 left-[var(--shell-x)] flex items-center gap-3 transition-opacity duration-700 ${
            ready ? 'opacity-0' : 'opacity-100'
          }`}
        >
          <span className="h-1.5 w-1.5 animate-pulse-dot rounded-full bg-accent" />
          <span className="text-xs tabular-nums text-ink-muted">
            Buffering sequence {Math.round(progress * 100)}%
          </span>
        </div>
      </div>
    </section>
  );
}
