'use client';

import { useRef } from 'react';

import { gsap } from '@/lib/gsap';
import { useIsomorphicLayoutEffect } from '@/hooks/useIsomorphicLayoutEffect';
import { Reveal } from '@/components/ui/Reveal';
import { TextReveal } from '@/components/ui/TextReveal';
import { testimonials } from '@/data/testimonials';

export function Testimonials() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLUListElement>(null);

  useIsomorphicLayoutEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track) return;

    // gsap.matchMedia handles the teardown/rebuild across breakpoints for us —
    // below md the track is just a normal vertical stack.
    const mm = gsap.matchMedia();

    mm.add('(min-width: 768px) and (prefers-reduced-motion: no-preference)', () => {
      const getDistance = () =>
        Math.max(0, track.scrollWidth - window.innerWidth + 48);

      gsap.to(track, {
        x: () => -getDistance(),
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: () => `+=${getDistance()}`,
          scrub: 0.7,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });
    });

    return () => mm.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="testimonials"
      className="relative overflow-hidden bg-surface py-section"
    >
      <div className="shell">
        <div className="flex max-w-2xl flex-col gap-5">
          <Reveal>
            <span className="eyebrow-accent">Testimonials</span>
          </Reveal>
          <TextReveal as="h2" className="text-display-md text-ink">
            {'What partners say when the {invoice} is paid.'}
          </TextReveal>
        </div>
      </div>

      <ul
        ref={trackRef}
        className="mt-16 flex flex-col gap-5 px-[var(--shell-x)] will-change-transform md:mt-20 md:w-max md:flex-row md:gap-6"
      >
        {testimonials.map((item, index) => (
          <li
            key={item.id}
            className="group flex w-full flex-col justify-between gap-10 rounded-xl2 border border-line bg-canvas p-8 transition-colors duration-500 ease-premium hover:border-accent/25 md:w-[clamp(20rem,32vw,28rem)] md:p-10"
          >
            <div className="flex flex-col gap-7">
              <span className="font-display text-4xl leading-none text-accent">
                &ldquo;
              </span>
              <blockquote className="text-[1.0625rem] leading-relaxed text-ink">
                {item.quote}
              </blockquote>
            </div>

            <footer className="flex items-center gap-4 border-t border-line pt-6">
              {/* Monogram stands in for a headshot */}
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-mist font-display text-sm tracking-tight text-ink-muted transition-colors duration-500 group-hover:bg-accent group-hover:text-white">
                {item.name
                  .split(' ')
                  .map((part) => part[0])
                  .join('')}
              </span>
              <div className="flex flex-col">
                <cite className="not-italic text-sm font-medium text-ink">
                  {item.name}
                </cite>
                <span className="text-xs text-ink-faint">
                  {item.title}, {item.company}
                </span>
              </div>
              <span className="ml-auto hidden font-display text-xs text-ink-faint sm:block">
                0{index + 1}
              </span>
            </footer>
          </li>
        ))}
      </ul>
    </section>
  );
}
