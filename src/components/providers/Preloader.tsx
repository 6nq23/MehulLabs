'use client';

import { useEffect, useRef, useState } from 'react';

import { gsap, ScrollTrigger } from '@/lib/gsap';
import { useIsomorphicLayoutEffect } from '@/hooks/useIsomorphicLayoutEffect';
import { useLenis } from './SmoothScrollProvider';
import { site } from '@/data/site';

/** Counter sweep; the whole curtain sequence lands at ~2.6s. Hero copy is timed to it. */
const MIN_DURATION = 1.25;

export function Preloader() {
  const [loading, setLoading] = useState(true);
  const rootRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLSpanElement>(null);
  const barRef = useRef<HTMLSpanElement>(null);
  const lenis = useLenis();

  // Lenis may mount after this component; keep the lock in its own effect so
  // it applies whenever the instance actually becomes available.
  useEffect(() => {
    if (!lenis) return;
    if (loading) lenis.stop();
    else lenis.start();
  }, [lenis, loading]);

  useIsomorphicLayoutEffect(() => {
    window.scrollTo(0, 0);
    document.body.style.overflow = 'hidden';

    const ctx = gsap.context(() => {
      const counter = { value: 0 };

      const tl = gsap.timeline({
        onComplete: () => {
          setLoading(false);
          document.body.style.overflow = '';
          ScrollTrigger.refresh();
        },
      });

      tl.to(
        counter,
        {
          value: 100,
          duration: MIN_DURATION,
          ease: 'power2.inOut',
          onUpdate: () => {
            if (counterRef.current) {
              counterRef.current.textContent = String(
                Math.round(counter.value)
              ).padStart(3, '0');
            }
          },
        },
        0
      )
        .to(barRef.current, { scaleX: 1, duration: MIN_DURATION, ease: 'power2.inOut' }, 0)
        .from(
          '[data-preload-line]',
          { yPercent: 120, duration: 0.9, ease: 'expo.out', stagger: 0.08 },
          0.1
        )
        .to('[data-preload-content]', { opacity: 0, duration: 0.4, ease: 'power2.in' }, '+=0.15')
        .to(rootRef.current, {
          yPercent: -100,
          duration: 1.05,
          ease: 'expo.inOut',
        })
        .set(rootRef.current, { pointerEvents: 'none' });
    }, rootRef);

    return () => {
      ctx.revert();
      document.body.style.overflow = '';
    };
  }, []);

  return (
    <div
      ref={rootRef}
      aria-hidden={!loading}
      role="status"
      aria-live="polite"
      className="fixed inset-0 z-[90] flex flex-col justify-between bg-canvas px-[var(--shell-x)] py-10"
      style={{ pointerEvents: loading ? 'auto' : 'none' }}
    >
      <div data-preload-content className="contents">
        <div className="flex items-start justify-between">
          <span data-preload-line className="block font-display text-sm tracking-tight">
            {site.name}
          </span>
          <span className="eyebrow">Loading experience</span>
        </div>

        <div className="flex flex-col gap-8">
          <div className="overflow-hidden">
            <h2
              data-preload-line
              className="font-display text-display-md text-ink"
            >
              Conviction<span className="text-accent">.</span> Then code.
            </h2>
          </div>

          <div className="flex items-end justify-between gap-8">
            <span
              ref={counterRef}
              className="font-display text-[clamp(3rem,10vw,7rem)] leading-none tracking-tighter text-ink"
            >
              000
            </span>
            <span className="mb-2 hidden text-sm text-ink-faint sm:block">
              Preparing the sequence
            </span>
          </div>

          <span className="relative block h-px w-full overflow-hidden bg-line">
            <span
              ref={barRef}
              className="absolute inset-0 origin-left scale-x-0 bg-accent"
            />
          </span>
        </div>
      </div>
    </div>
  );
}
