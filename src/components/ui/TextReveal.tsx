'use client';

import { Fragment, useRef, type ElementType } from 'react';

import { gsap } from '@/lib/gsap';
import { cn } from '@/lib/utils';
import { useIsomorphicLayoutEffect } from '@/hooks/useIsomorphicLayoutEffect';

interface Props {
  children: string;
  as?: ElementType;
  className?: string;
  delay?: number;
  stagger?: number;
  /** Play immediately instead of waiting for the element to enter the viewport. */
  immediate?: boolean;
  /** Wrap a word in {curly braces} in `children` to tint it with the accent. */
  start?: string;
}

/**
 * Per-word mask reveal. Each word sits in an overflow-hidden shell and slides
 * up from below the baseline, so the text appears to rise out of the page
 * rather than fade onto it.
 */
export function TextReveal({
  children,
  as = 'h2',
  className,
  delay = 0,
  stagger = 0.055,
  immediate = false,
  start = 'top 85%',
}: Props) {
  const ref = useRef<HTMLElement>(null);

  useIsomorphicLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      const words = el.querySelectorAll('[data-word]');
      if (!words.length) return;

      gsap.set(el, { opacity: 1 });
      gsap.fromTo(
        words,
        { yPercent: 115 },
        {
          yPercent: 0,
          duration: 1.05,
          ease: 'expo.out',
          stagger,
          delay,
          scrollTrigger: immediate
            ? undefined
            : { trigger: el, start, once: true },
        }
      );
    }, ref);

    return () => ctx.revert();
  }, [delay, stagger, immediate, start]);

  const Tag = as;
  const words = children.split(' ');

  return (
    <Tag ref={ref} className={cn(className)} data-reveal>
      {words.map((word, index) => {
        // {curly braces} mark a word for accent tinting.
        const accent = word.startsWith('{') && word.endsWith('}');
        const text = accent ? word.slice(1, -1) : word;

        return (
          <Fragment key={`${word}-${index}`}>
            <span
              className="inline-block overflow-hidden align-bottom"
              style={{ paddingBottom: '0.14em', marginBottom: '-0.14em' }}
            >
              <span
                data-word
                className={cn('inline-block will-change-transform', accent && 'text-accent')}
              >
                {text}
              </span>
            </span>
            {/* A real space, not a margin — otherwise screen readers and
                copy-paste run every word together. */}
            {index < words.length - 1 ? ' ' : null}
          </Fragment>
        );
      })}
    </Tag>
  );
}
