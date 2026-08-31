'use client';

import { useRef, useState } from 'react';

import { gsap, ScrollTrigger } from '@/lib/gsap';
import { cn } from '@/lib/utils';
import { useIsomorphicLayoutEffect } from '@/hooks/useIsomorphicLayoutEffect';
import { MagneticButton } from '@/components/ui/MagneticButton';
import { navLinks, site } from '@/data/site';

export function Navbar() {
  const [open, setOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  useIsomorphicLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Solidify the bar once the hero is behind us.
      ScrollTrigger.create({
        start: 'top -80',
        end: 99999,
        onToggle: (self) =>
          headerRef.current?.classList.toggle('is-stuck', self.isActive),
      });

      gsap.from(headerRef.current, {
        yPercent: -100,
        opacity: 0,
        duration: 1,
        ease: 'expo.out',
        delay: 2.15, // lands just as the preloader curtain lifts
      });
    });
    return () => ctx.revert();
  }, []);

  useIsomorphicLayoutEffect(() => {
    const panel = panelRef.current;
    if (!panel) return;

    const ctx = gsap.context(() => {
      if (open) {
        gsap.set(panel, { display: 'flex' });
        gsap.fromTo(
          panel,
          { clipPath: 'inset(0 0 100% 0)' },
          { clipPath: 'inset(0 0 0% 0)', duration: 0.7, ease: 'expo.out' }
        );
        gsap.fromTo(
          panel.querySelectorAll('[data-menu-item]'),
          { yPercent: 110, opacity: 0 },
          { yPercent: 0, opacity: 1, duration: 0.7, ease: 'expo.out', stagger: 0.06, delay: 0.12 }
        );
      } else {
        gsap.to(panel, {
          clipPath: 'inset(0 0 100% 0)',
          duration: 0.5,
          ease: 'expo.inOut',
          onComplete: () => gsap.set(panel, { display: 'none' }),
        });
      }
    }, panelRef);

    return () => ctx.revert();
  }, [open]);

  return (
    <>
      <header
        ref={headerRef}
        className={cn(
          'fixed inset-x-0 top-0 z-[70] transition-[background-color,border-color,backdrop-filter] duration-500 ease-premium',
          'border-b border-transparent [&.is-stuck]:border-line [&.is-stuck]:bg-canvas/80 [&.is-stuck]:backdrop-blur-xl'
        )}
      >
        <nav
          className="shell flex h-[var(--nav-h)] items-center justify-between"
          aria-label="Primary"
        >
          <a
            href="#top"
            className="group flex items-center gap-2.5 font-display text-[0.95rem] font-semibold tracking-tight"
          >
            <span className="h-2 w-2 rounded-full bg-accent transition-transform duration-500 ease-premium group-hover:scale-125" />
            {site.name}
          </a>

          <ul className="hidden items-center gap-9 md:flex">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="group relative text-sm text-ink-muted transition-colors duration-300 hover:text-ink"
                >
                  {link.label}
                  <span className="absolute -bottom-1.5 left-0 h-px w-full origin-right scale-x-0 bg-accent transition-transform duration-500 ease-premium group-hover:origin-left group-hover:scale-x-100" />
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-3">
            <MagneticButton
              href="#contact"
              variant="primary"
              className="hidden px-5 py-3 text-sm sm:inline-flex"
              strength={0.28}
            >
              Start a project
            </MagneticButton>

            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? 'Close menu' : 'Open menu'}
              className="relative z-[76] flex h-10 w-10 items-center justify-center rounded-full border border-line bg-canvas md:hidden"
            >
              <span className="relative block h-3 w-4">
                <span
                  className={cn(
                    'absolute left-0 h-px w-full bg-ink transition-all duration-300 ease-premium',
                    open ? 'top-1.5 rotate-45' : 'top-0'
                  )}
                />
                <span
                  className={cn(
                    'absolute left-0 h-px w-full bg-ink transition-all duration-300 ease-premium',
                    open ? 'top-1.5 -rotate-45' : 'top-3'
                  )}
                />
              </span>
            </button>
          </div>
        </nav>
      </header>

      <div
        ref={panelRef}
        id="mobile-menu"
        className="fixed inset-0 z-[75] hidden flex-col justify-center bg-canvas px-[var(--shell-x)] md:!hidden"
        style={{ display: 'none' }}
      >
        <ul className="flex flex-col gap-2">
          {navLinks.map((link, index) => (
            <li key={link.href} className="overflow-hidden">
              <a
                data-menu-item
                href={link.href}
                onClick={() => setOpen(false)}
                className="flex items-baseline gap-4 py-2 font-display text-display-sm text-ink"
              >
                <span className="text-xs text-ink-faint">
                  0{index + 1}
                </span>
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <div data-menu-item className="mt-12 flex flex-col gap-2 border-t border-line pt-8">
          <span className="eyebrow">Get in touch</span>
          <a href={`mailto:${site.email}`} className="text-lg text-ink">
            {site.email}
          </a>
        </div>
      </div>
    </>
  );
}
