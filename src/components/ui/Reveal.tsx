'use client';

import { useRef, type ElementType } from 'react';

import { gsap } from '@/lib/gsap';
import { cn } from '@/lib/utils';
import { useIsomorphicLayoutEffect } from '@/hooks/useIsomorphicLayoutEffect';

interface Props {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  /** Stagger direct children instead of animating the wrapper as one unit. */
  stagger?: number;
  start?: string;
  as?: ElementType;
}

export function Reveal({
  children,
  className,
  delay = 0,
  y = 28,
  stagger,
  start = 'top 88%',
  as: Tag = 'div',
}: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useIsomorphicLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      const targets = stagger ? Array.from(el.children) : [el];
      if (stagger) gsap.set(el, { opacity: 1 });

      gsap.fromTo(
        targets,
        { opacity: 0, y },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'expo.out',
          delay,
          stagger: stagger ?? 0,
          scrollTrigger: { trigger: el, start, once: true },
        }
      );
    }, ref);

    return () => ctx.revert();
  }, [delay, y, stagger, start]);

  return (
    <Tag ref={ref} data-reveal className={cn(className)}>
      {children}
    </Tag>
  );
}
