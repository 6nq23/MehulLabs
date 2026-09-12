import type { ReactNode } from 'react';
import { ArrowIcon, MagneticButton } from '@/components/ui/MagneticButton';
import { credentials } from '@/data/offer';
import { ownedBrands } from '@/data/experience';
import { getServicePillar, serviceRoutes } from '@/data/services';
import { primaryCta } from '@/data/site';

export function Hero({ heroImage }: { heroImage?: ReactNode }) {
  return (
    <section id="top" className="hero" aria-labelledby="hero-title">
      <div className="shell">
        <div className="hero-video-panel">
          <video className="hero-background-video" autoPlay loop muted playsInline preload="auto" aria-hidden="true">
            <source src="/bg%20header.mp4" type="video/mp4" />
          </video>
          <div className="hero-video-overlay" aria-hidden="true" />
          <div className="hero-video-content">
            <p className="eyebrow-accent">The operating layer behind D2C brands</p>
            <h1 id="hero-title" className="hero-title">
              <span className="sr-only">
                More of your traffic buys. More of your orders stick. Less of it runs on you.
              </span>
              <span aria-hidden="true">
                <span className="hero-title-line hero-title-switch-line">
                  More of your{' '}
                  <span className="hero-title-rotation">
                    <span className="hero-title-rotation-item hero-title-rotation-first">traffic buys.</span>
                    <span className="hero-title-rotation-item hero-title-rotation-second">orders stick.</span>
                  </span>
                </span>
                <span className="hero-title-line hero-title-accent">
                  Less of it runs on you.
                </span>
              </span>
            </h1>
            <div className="hero-intro">
              <p>
                <strong>One connected operating layer, run in our own two brands:</strong> <strong>{ownedBrands[0].name}</strong> and{' '}
                <strong>{ownedBrands[1].name}, every day.</strong>
              </p>
            </div>
            <div className="hero-cta">
              <MagneticButton href="#contact" variant="primary" strength={0.12} trackingLocation="hero">
                {primaryCta.label} <ArrowIcon />
              </MagneticButton>
              <a href="#leaks" className="text-link">
                First, the 3 leaks <ArrowIcon className="rotate-90" />
              </a>
            </div>
            <ul className="cta-reducers" aria-label="What the audit involves">
              {primaryCta.reducers.map(item => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
        <div className="hero-support-layout">
          <dl className="hero-proof">
            {credentials.map(item => (
              <div key={item.label}>
                <dt>{item.label}</dt>
                <dd>{item.body}</dd>
              </div>
            ))}
          </dl>
          {heroImage}
        </div>
        <nav className="solution-shortcuts" aria-label="Choose where it hurts most">
          {serviceRoutes.map(service => {
            const pillar = getServicePillar(service);
            return <a href={`/services/${service.slug}`} key={service.slug}>
              <span className="shortcut-number" aria-hidden="true">
                {pillar.number}
              </span>
              <span>
                <strong>{pillar.label}</strong>
                <span>{pillar.shortcut}</span>
              </span>
              <ArrowIcon />
            </a>;
          })}
        </nav>
      </div>
    </section>
  );
}
