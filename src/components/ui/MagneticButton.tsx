import { useRef } from 'react';

import { gsap } from '@/lib/gsap';
import { cn } from '@/lib/utils';
import { useIsomorphicLayoutEffect } from '@/hooks/useIsomorphicLayoutEffect';
import { usePrefersReducedMotion } from '@/hooks/useMediaQuery';

type Variant = 'primary' | 'secondary' | 'ghost';

interface Props {
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  variant?: Variant;
  className?: string;
  /** 0 disables the pull; ~0.4 is a firm but still-natural magnet. */
  strength?: number;
  ariaLabel?: string;
  trackingLocation?: string;
}

const base =
  'group relative inline-flex items-center justify-center gap-2.5 rounded-full text-[0.9375rem] font-medium leading-none transition-colors duration-300 ease-premium will-change-transform';

const variants: Record<Variant, string> = {
  primary:
    'bg-accent px-7 py-4 text-white hover:bg-accent-bright',
  secondary:
    'bg-ink px-7 py-4 text-white hover:bg-accent',
  ghost:
    'border border-line bg-canvas px-7 py-4 text-ink hover:border-ink/25 hover:bg-surface',
};

export function MagneticButton({
  children,
  href,
  onClick,
  type = 'button',
  variant = 'primary',
  className,
  strength = 0.35,
  ariaLabel,
  trackingLocation,
}: Props) {
  const ref = useRef<HTMLAnchorElement & HTMLButtonElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);
  const reduced = usePrefersReducedMotion();

  useIsomorphicLayoutEffect(() => {
    const el = ref.current;
    const label = labelRef.current;
    if (!el || !label || reduced || strength === 0) return;
    if (window.matchMedia('(pointer: coarse)').matches) return;

    const move = {
      x: gsap.quickTo(el, 'x', { duration: 0.55, ease: 'power3.out' }),
      y: gsap.quickTo(el, 'y', { duration: 0.55, ease: 'power3.out' }),
    };
    // The label trails the shell slightly — that offset is what sells the pull.
    const moveLabel = {
      x: gsap.quickTo(label, 'x', { duration: 0.7, ease: 'power3.out' }),
      y: gsap.quickTo(label, 'y', { duration: 0.7, ease: 'power3.out' }),
    };

    const onMove = (event: PointerEvent) => {
      const rect = el.getBoundingClientRect();
      const dx = event.clientX - (rect.left + rect.width / 2);
      const dy = event.clientY - (rect.top + rect.height / 2);
      move.x(dx * strength);
      move.y(dy * strength);
      moveLabel.x(dx * strength * 0.35);
      moveLabel.y(dy * strength * 0.35);
    };

    const onLeave = () => {
      move.x(0);
      move.y(0);
      moveLabel.x(0);
      moveLabel.y(0);
    };

    el.addEventListener('pointermove', onMove);
    el.addEventListener('pointerleave', onLeave);
    return () => {
      el.removeEventListener('pointermove', onMove);
      el.removeEventListener('pointerleave', onLeave);
    };
  }, [reduced, strength]);

  const content = (
    <span ref={labelRef} className="pointer-events-none inline-flex items-center gap-2.5">
      {children}
    </span>
  );

  const classes = cn(base, variants[variant], className);

  if (href) {
    return (
      <a ref={ref} href={href} className={classes} aria-label={ariaLabel} data-cta-location={trackingLocation}>
        {content}
      </a>
    );
  }

  return (
    <button ref={ref} type={type} onClick={onClick} className={classes} aria-label={ariaLabel}>
      {content}
    </button>
  );
}

export function ArrowIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden="true"
      className={cn('h-3.5 w-3.5 transition-transform duration-300 ease-premium group-hover:translate-x-1', className)}
    >
      <path
        d="M3 8h10m0 0-4-4m4 4-4 4"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
