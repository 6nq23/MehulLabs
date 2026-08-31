'use client';

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// registerPlugin is idempotent, so a module-level call is safe even though this
// module is imported by a dozen components.
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
  // Lenis drives the ticker; lag smoothing would fight it during heavy frames.
  gsap.ticker.lagSmoothing(0);
}

export { gsap, ScrollTrigger };
