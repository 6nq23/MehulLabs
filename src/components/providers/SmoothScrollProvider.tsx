import Lenis from 'lenis';
import { createContext, useContext, useEffect, useState } from 'react';

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
      // Lenis runs its own rAF loop, so the site-wide island does not need GSAP's ticker.
      // Section animations that use ScrollTrigger still follow the native scroll events Lenis emits.
      autoRaf: true,
    });

    setLenis(instance);

    return () => {
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
        const headerOffset = document.querySelector<HTMLElement>('[data-hive-header]')?.offsetHeight ?? 0;
        lenis.scrollTo(target as HTMLElement, { offset: -(headerOffset + 16), duration: 0.9 });
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
