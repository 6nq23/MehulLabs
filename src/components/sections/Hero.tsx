'use client';

import Image from 'next/image';
import { useRef } from 'react';

import { gsap } from '@/lib/gsap';
import { useIsomorphicLayoutEffect } from '@/hooks/useIsomorphicLayoutEffect';
import { MagneticButton, ArrowIcon } from '@/components/ui/MagneticButton';
import { TextReveal } from '@/components/ui/TextReveal';
import { site, stats } from '@/data/site';

/** Hero copy starts as the preloader curtain clears. */
const ENTRANCE = 2.2;

export function Hero() {
  const rootRef = useRef<HTMLElement>(null);

  useIsomorphicLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('[data-hero-fade]', {
        opacity: 0,
        y: 22,
        duration: 1.1,
        ease: 'expo.out',
        stagger: 0.09,
        delay: ENTRANCE + 0.25,
      });

      gsap.from('[data-hero-portrait]', {
        clipPath: 'inset(100% 0 0 0)',
        scale: 1.12,
        duration: 1.6,
        ease: 'expo.out',
        delay: ENTRANCE,
      });

      // Slow drift as the hero leaves — hands off to the story section.
      gsap.to('[data-hero-portrait-inner]', {
        yPercent: 12,
        ease: 'none',
        scrollTrigger: {
          trigger: rootRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      });
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="top"
      ref={rootRef}
      className="gradient-mist relative flex min-h-[100svh] flex-col justify-between overflow-hidden pt-[calc(var(--nav-h)+2rem)]"
    >
      <div className="shell grid flex-1 items-center gap-14 pb-12 lg:grid-cols-[1.15fr_0.85fr] lg:gap-20">
        <div className="flex flex-col gap-8">
          <div data-hero-fade className="flex items-center gap-3">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
            </span>
            <span className="eyebrow text-ink-muted">{site.availability}</span>
          </div>

          <h1 className="text-display-lg text-ink">
            <TextReveal as="span" className="block" immediate delay={ENTRANCE}>
              Building AI that
            </TextReveal>
            <TextReveal as="span" className="block" immediate delay={ENTRANCE + 0.12}>
              {'{earns} its place.'}
            </TextReveal>
          </h1>

          <p
            data-hero-fade
            className="max-w-lg text-[1.0625rem] leading-relaxed text-ink-muted"
          >
            I&apos;m {site.founder} — an {site.roleInline} in{' '}
            {site.location}. I design and ship AI products that survive contact
            with real customers, real data and real operating teams.
          </p>

          <div data-hero-fade className="flex flex-wrap items-center gap-3">
            <MagneticButton href="#products" variant="primary">
              Explore the products
              <ArrowIcon />
            </MagneticButton>
            <MagneticButton href="#story" variant="ghost" strength={0.22}>
              Watch the story
            </MagneticButton>
          </div>
        </div>

        <div
          data-hero-portrait
          className="relative mx-auto w-full max-w-md overflow-hidden rounded-xl3 bg-surface lg:max-w-none"
        >
          <div data-hero-portrait-inner className="relative aspect-[4/5] w-full">
            <Image
              src="/hero.webp"
              alt={`${site.name}, ${site.role}`}
              fill
              priority
              quality={92}
              sizes="(max-width: 1024px) 92vw, 40vw"
              className="object-cover object-[50%_22%]"
            />
            {/* Lifts the dark studio silhouette off the light panel */}
            <div
              className="pointer-events-none absolute inset-0"
              style={{
                background:
                  'linear-gradient(180deg, rgba(10,10,11,0) 55%, rgba(10,10,11,0.10) 100%)',
              }}
              aria-hidden="true"
            />
          </div>
          <div className="pointer-events-none absolute inset-0 rounded-xl3 ring-1 ring-inset ring-ink/5" />
        </div>
      </div>

      <div data-hero-fade className="shell w-full pb-10">
        <div className="hairline mb-8" />
        <div className="flex flex-col gap-8 sm:flex-row sm:items-end sm:justify-between">
          <dl className="grid grid-cols-2 gap-x-10 gap-y-6 sm:flex sm:gap-12">
            {stats.map((stat) => (
              <div key={stat.label} className="flex flex-col gap-1">
                <dt className="order-2 text-xs text-ink-faint">{stat.label}</dt>
                <dd className="order-1 font-display text-2xl tracking-tight text-ink">
                  {stat.value}
                </dd>
              </div>
            ))}
          </dl>

          <a
            href="#story"
            className="group hidden items-center gap-3 text-xs uppercase tracking-[0.18em] text-ink-faint transition-colors hover:text-ink sm:flex"
          >
            Scroll
            <span className="relative flex h-8 w-px overflow-hidden bg-line">
              <span className="absolute inset-x-0 top-0 h-3 bg-accent transition-transform duration-700 ease-premium group-hover:translate-y-5" />
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}
