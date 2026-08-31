'use client';

import { useRef } from 'react';

import { gsap } from '@/lib/gsap';
import { cn } from '@/lib/utils';
import { useIsomorphicLayoutEffect } from '@/hooks/useIsomorphicLayoutEffect';
import { ArrowIcon, MagneticButton } from '@/components/ui/MagneticButton';
import { ProductIcon } from '@/components/ui/ProductIcon';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { products } from '@/data/products';

export function Products() {
  const gridRef = useRef<HTMLUListElement>(null);

  useIsomorphicLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '[data-product-card]',
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'expo.out',
          stagger: { each: 0.07, from: 'start' },
          scrollTrigger: { trigger: gridRef.current, start: 'top 80%', once: true },
        }
      );
    }, gridRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="products" className="relative bg-canvas py-section">
      <div className="shell">
        <SectionHeading
          eyebrow="AI Products"
          title="Six products. One operating philosophy."
          description="Placeholder copy. Each one started as a problem a client could not buy their way out of. All figures below are illustrative."
          action={
            <MagneticButton href="#contact" variant="ghost" strength={0.24}>
              Request a walkthrough
              <ArrowIcon />
            </MagneticButton>
          }
        />

        <ul
          ref={gridRef}
          className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
        >
          {products.map((product) => (
            <li key={product.id} data-product-card data-reveal>
              <article className="card-surface group flex h-full flex-col gap-7 p-7 lg:p-8">
                {/* Accent wash that only appears on hover — keeps red rationed */}
                <span
                  className="pointer-events-none absolute inset-0 rounded-xl2 opacity-0 transition-opacity duration-500 ease-premium group-hover:opacity-100"
                  style={{
                    background:
                      'radial-gradient(120% 90% at 0% 0%, rgba(200,16,46,0.055), transparent 60%)',
                  }}
                  aria-hidden="true"
                />

                <header className="relative flex items-start justify-between gap-4">
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl border border-line bg-surface p-2.5 text-ink transition-colors duration-500 ease-premium group-hover:border-accent/25 group-hover:bg-canvas group-hover:text-accent">
                    <ProductIcon name={product.icon} />
                  </span>

                  <span
                    className={cn(
                      'inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[0.6875rem] font-medium',
                      product.status === 'Live'
                        ? 'border-accent/20 bg-accent-soft text-accent'
                        : 'border-line bg-surface text-ink-faint'
                    )}
                  >
                    {product.status === 'Live' ? (
                      <span className="h-1.5 w-1.5 animate-pulse-dot rounded-full bg-accent" />
                    ) : null}
                    {product.status}
                  </span>
                </header>

                <div className="relative flex flex-col gap-2.5">
                  <span className="eyebrow">{product.category}</span>
                  <h3 className="font-display text-[1.375rem] leading-tight tracking-tight text-ink">
                    {product.name}
                  </h3>
                  <p className="text-[0.9375rem] leading-relaxed text-ink-muted">
                    {product.summary}
                  </p>
                </div>

                <p className="relative text-sm leading-relaxed text-ink-faint">
                  {product.description}
                </p>

                <dl className="relative mt-auto grid grid-cols-2 gap-4 border-t border-line pt-6">
                  {product.metrics.map((metric) => (
                    <div key={metric.label} className="flex flex-col gap-0.5">
                      <dt className="order-2 text-xs text-ink-faint">
                        {metric.label}
                      </dt>
                      <dd className="order-1 font-display text-xl tracking-tight text-ink">
                        {metric.value}
                      </dd>
                    </div>
                  ))}
                </dl>

                <ul className="relative flex flex-wrap gap-2">
                  {product.tags.map((tag) => (
                    <li
                      key={tag}
                      className="rounded-full border border-line px-2.5 py-1 text-[0.6875rem] text-ink-muted transition-colors duration-300 group-hover:border-line/80"
                    >
                      {tag}
                    </li>
                  ))}
                </ul>

                <a
                  href="#contact"
                  className="relative inline-flex w-fit items-center gap-2 text-sm font-medium text-ink transition-colors duration-300 hover:text-accent"
                >
                  Learn more about {product.name}
                  <ArrowIcon />
                </a>
              </article>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
