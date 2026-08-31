'use client';

import { useRef, useState } from 'react';

import { gsap } from '@/lib/gsap';
import { cn } from '@/lib/utils';
import { useIsomorphicLayoutEffect } from '@/hooks/useIsomorphicLayoutEffect';
import { ArrowIcon } from '@/components/ui/MagneticButton';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { projects } from '@/data/projects';

export function Projects() {
  const rootRef = useRef<HTMLDivElement>(null);
  const previewRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState<number | null>(null);

  // Cursor-tracked preview card. Desktop + fine pointer only; on touch the
  // rows already show their own cover art.
  useIsomorphicLayoutEffect(() => {
    const root = rootRef.current;
    const preview = previewRef.current;
    if (!root || !preview) return;
    if (window.matchMedia('(pointer: coarse)').matches) return;

    const moveX = gsap.quickTo(preview, 'x', { duration: 0.6, ease: 'power3.out' });
    const moveY = gsap.quickTo(preview, 'y', { duration: 0.6, ease: 'power3.out' });

    const onMove = (event: PointerEvent) => {
      const rect = root.getBoundingClientRect();
      moveX(event.clientX - rect.left);
      moveY(event.clientY - rect.top);
    };

    root.addEventListener('pointermove', onMove);
    return () => root.removeEventListener('pointermove', onMove);
  }, []);

  useIsomorphicLayoutEffect(() => {
    const preview = previewRef.current;
    if (!preview) return;
    gsap.to(preview, {
      opacity: active === null ? 0 : 1,
      scale: active === null ? 0.86 : 1,
      duration: 0.45,
      ease: 'expo.out',
    });
  }, [active]);

  return (
    <section id="work" className="relative bg-canvas py-section">
      <div className="shell">
        <SectionHeading
          eyebrow="Selected work"
          title="Engagements worth talking about."
          description="Placeholder copy. A short list — I would rather show four projects properly than forty as thumbnails."
        />

        <div ref={rootRef} className="relative mt-16">
          {/* Floating hover preview */}
          <div
            ref={previewRef}
            aria-hidden="true"
            className="pointer-events-none absolute left-0 top-0 z-10 hidden h-56 w-80 -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-xl2 opacity-0 shadow-lift lg:block"
            style={{ opacity: 0 }}
          >
            {projects.map((project, index) => (
              <div
                key={project.id}
                className={cn(
                  'sheen absolute inset-0 bg-gradient-to-br transition-opacity duration-300',
                  project.gradient,
                  active === index ? 'opacity-100' : 'opacity-0'
                )}
              >
                <div className="absolute inset-0 flex flex-col justify-end p-6">
                  <span className="text-[0.6875rem] uppercase tracking-[0.18em] text-white/60">
                    {project.discipline}
                  </span>
                  <span className="font-display text-lg tracking-tight text-white">
                    {project.title}
                  </span>
                </div>
              </div>
            ))}
          </div>

          <ul className="border-t border-line">
            {projects.map((project, index) => (
              <li key={project.id}>
                <a
                  href="#contact"
                  onMouseEnter={() => setActive(index)}
                  onMouseLeave={() => setActive(null)}
                  onFocus={() => setActive(index)}
                  onBlur={() => setActive(null)}
                  className="group relative flex flex-col gap-5 border-b border-line py-8 transition-colors duration-500 md:grid md:grid-cols-[auto_1.4fr_1fr_auto] md:items-center md:gap-8 md:py-10"
                >
                  {/* Wipe that fills the row from the left on hover */}
                  <span
                    className="pointer-events-none absolute inset-x-[-1.5rem] inset-y-0 -z-10 origin-left scale-x-0 rounded-xl bg-surface transition-transform duration-700 ease-premium group-hover:scale-x-100"
                    aria-hidden="true"
                  />

                  <span className="font-display text-xs text-ink-faint md:w-10">
                    0{index + 1}
                  </span>

                  <div className="flex flex-col gap-1.5">
                    <h3 className="font-display text-[1.75rem] leading-tight tracking-tight text-ink transition-transform duration-500 ease-premium md:group-hover:translate-x-2">
                      {project.title}
                    </h3>
                    <span className="text-sm text-ink-faint">{project.client}</span>
                  </div>

                  <p className="max-w-sm text-sm leading-relaxed text-ink-muted">
                    {project.blurb}
                  </p>

                  <div className="flex items-center justify-between gap-6 md:justify-end">
                    <span className="text-xs text-ink-faint">{project.year}</span>
                    <span className="flex h-10 w-10 items-center justify-center rounded-full border border-line text-ink transition-all duration-500 ease-premium group-hover:border-accent group-hover:bg-accent group-hover:text-white">
                      <ArrowIcon className="h-3.5 w-3.5 -rotate-45 group-hover:translate-x-0" />
                    </span>
                  </div>

                  {/* Touch/mobile cover */}
                  <div
                    className={cn(
                      'sheen relative h-36 w-full overflow-hidden rounded-xl bg-gradient-to-br md:hidden',
                      project.gradient
                    )}
                  >
                    <span className="absolute bottom-4 left-4 text-[0.6875rem] uppercase tracking-[0.18em] text-white/70">
                      {project.discipline}
                    </span>
                  </div>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
