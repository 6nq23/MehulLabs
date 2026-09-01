'use client';

import Lenis from 'lenis';
import { createContext, useContext, useEffect, useState } from 'react';

import { gsap, ScrollTrigger } from '@/lib/gsap';
import { usePrefersReducedMotion } from '@/hooks/useMediaQuery';

const LenisContext = createContext<Lenis | null>(null);

export const useLenis = () => useContext(LenisContext);

export function SmoothScrollProvider({ children }: { children: React.ReactNode }) {
  const [lenis, setLenis] = useState<Lenis | null>(null);
  const reducedMotion = usePrefersReducedMotion();

  // Expose the preference to CSS so reveal primitives can opt out wholesale.
  useEffect(() => {
    document.documentElement.classList.toggle('no-motion', reducedMotion);
  }, [reducedMotion]);

  useEffect(() => {
    if (reducedMotion) return;

    const instance = new Lenis({
      duration: 0.85,
      // expo-out: quick to respond, long tail — the "expensive" feel.
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1,
      infinite: false,
    });

    setLenis(instance);

    // Single rAF loop for both libraries — two loops means two different
    // clocks and visible jitter on scrubbed timelines.
    instance.on('scroll', ScrollTrigger.update);
    const tick = (time: number) => instance.raf(time * 1000);
    gsap.ticker.add(tick);

    return () => {
      gsap.ticker.remove(tick);
      instance.destroy();
      setLenis(null);
    };
  }, [reducedMotion]);

  // Anchor links have to go through Lenis, otherwise native jump fights the loop.
  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      if (event.defaultPrevented || event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
      const anchor = (event.target as HTMLElement | null)?.closest?.('a[href^="#"]');
      if (!anchor) return;

      const href = anchor.getAttribute('href');
      if (!href || href === '#') return;

      const target = document.querySelector(href);
      if (!target) return;

      event.preventDefault();
      if (lenis) {
        lenis.scrollTo(target as HTMLElement, { offset: -24, duration: 0.9 });
      } else {
        target.scrollIntoView({ behavior: reducedMotion ? 'instant' : 'smooth', block: 'start' });
      }
      if (href === '#main') {
        (target as HTMLElement).setAttribute('tabindex', '-1');
        (target as HTMLElement).focus({ preventScroll: true });
      }
      history.replaceState(null, '', href);
    };

    document.addEventListener('click', onClick);
    return () => document.removeEventListener('click', onClick);
  }, [lenis, reducedMotion]);

  return <LenisContext.Provider value={lenis}>{children}</LenisContext.Provider>;
}
