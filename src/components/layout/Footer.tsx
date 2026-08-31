'use client';

import { useRef } from 'react';

import { gsap } from '@/lib/gsap';
import { useIsomorphicLayoutEffect } from '@/hooks/useIsomorphicLayoutEffect';
import { useLenis } from '@/components/providers/SmoothScrollProvider';
import { navLinks, site, socials } from '@/data/site';

const columns = [
  {
    title: 'Navigate',
    links: navLinks.map((link) => ({ label: link.label, href: link.href })),
  },
  {
    title: 'Products',
    links: [
      { label: 'Voice Calling Agent', href: '#products' },
      { label: 'D2C Assistant', href: '#products' },
      { label: 'Inventory Management', href: '#products' },
      { label: 'Customer Support', href: '#products' },
      { label: 'Sales Automation', href: '#products' },
      { label: 'Analytics Platform', href: '#products' },
    ],
  },
];

export function Footer() {
  const wordmarkRef = useRef<HTMLDivElement>(null);
  const lenis = useLenis();

  useIsomorphicLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        wordmarkRef.current,
        { yPercent: 22, opacity: 0.4 },
        {
          yPercent: 0,
          opacity: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: wordmarkRef.current,
            start: 'top bottom',
            end: 'bottom bottom',
            scrub: 0.6,
          },
        }
      );
    }, wordmarkRef);

    return () => ctx.revert();
  }, []);

  const toTop = () => {
    if (lenis) lenis.scrollTo(0, { duration: 1.6 });
    else window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="grain relative overflow-hidden border-t border-line bg-surface">
      <div className="shell flex flex-col gap-16 pt-section">
        <div className="grid gap-12 md:grid-cols-[1.4fr_1fr_1fr] md:gap-8">
          <div className="flex max-w-sm flex-col gap-6">
            <div className="flex items-center gap-2.5">
              <span className="h-2 w-2 rounded-full bg-accent" />
              <span className="font-display text-[0.95rem] font-semibold tracking-tight">
                {site.name}
              </span>
            </div>
            <p className="text-sm leading-relaxed text-ink-muted">
              {site.tagline}
            </p>
            <a
              href={`mailto:${site.email}`}
              className="group inline-flex w-fit items-center gap-2 text-sm text-ink"
            >
              {site.email}
              <span className="h-px w-4 bg-accent transition-all duration-500 ease-premium group-hover:w-8" />
            </a>
          </div>

          {columns.map((column) => (
            <nav key={column.title} aria-label={column.title} className="flex flex-col gap-4">
              <span className="eyebrow">{column.title}</span>
              <ul className="flex flex-col gap-2.5">
                {column.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-sm text-ink-muted transition-colors duration-300 hover:text-accent"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <div className="flex flex-col gap-6 border-t border-line pt-8 sm:flex-row sm:items-center sm:justify-between">
          <ul className="flex flex-wrap gap-2">
            {socials.map((social) => (
              <li key={social.label}>
                <a
                  href={social.href}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="inline-flex rounded-full border border-line bg-canvas px-4 py-2 text-xs text-ink-muted transition-colors duration-300 hover:border-accent hover:text-accent"
                >
                  {social.label}
                </a>
              </li>
            ))}
          </ul>

          <button
            type="button"
            onClick={toTop}
            className="group inline-flex items-center gap-2.5 self-start text-xs uppercase tracking-[0.18em] text-ink-faint transition-colors hover:text-ink sm:self-auto"
          >
            Back to top
            <span className="flex h-8 w-8 items-center justify-center rounded-full border border-line transition-colors duration-500 group-hover:border-accent group-hover:bg-accent group-hover:text-white">
              <svg viewBox="0 0 16 16" fill="none" aria-hidden="true" className="h-3 w-3">
                <path
                  d="M8 13V3m0 0L4 7m4-4 4 4"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
          </button>
        </div>
      </div>

      {/* Oversized wordmark, clipped by the viewport edge */}
      <div ref={wordmarkRef} className="mt-16 select-none overflow-hidden px-[var(--shell-x)]">
        <span
          className="block whitespace-nowrap font-display font-semibold leading-[0.8] tracking-[-0.05em] text-ink/[0.07]"
          style={{ fontSize: 'clamp(4rem, 19vw, 20rem)' }}
          aria-hidden="true"
        >
          {site.name}
        </span>
      </div>

      <div className="shell flex flex-col gap-2 border-t border-line py-8 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-xs text-ink-faint">
          © {new Date().getFullYear()} {site.name}. All rights reserved.
        </p>
        <p className="text-xs text-ink-faint">
          Built with Next.js, GSAP &amp; Lenis. Content is placeholder.
        </p>
      </div>
    </footer>
  );
}
