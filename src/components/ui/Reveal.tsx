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
  y = 12,
  stagger,
  start = 'top 98%',
  as: Tag = 'div',
}: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useIsomorphicLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;

    const mm = gsap.matchMedia();
    mm.add('(prefers-reduced-motion: no-preference)', () => {
      const targets = stagger ? Array.from(el.children) : [el];
      gsap.fromTo(
        targets,
        { y },
        {
          y: 0,
          duration: 0.35,
          ease: 'expo.out',
          delay,
          stagger: stagger ?? 0,
          scrollTrigger: { trigger: el, start, once: true },
        }
      );
    });

    return () => mm.revert();
  }, [delay, y, stagger, start]);

  return (
    <Tag ref={ref} data-reveal className={cn(className)}>
      {children}
    </Tag>
  );
}
