import type { ReactNode } from 'react';

import { ArrowIcon } from '@/components/ui/MagneticButton';
import { isPublishableMetric, operatingFacts, publishedMetrics } from '@/data/offer';
import { primaryCta } from '@/data/site';

/** Measured figures render only once each one has a basis and a source behind it. */
function MetricBand() {
  const metrics = publishedMetrics.filter(isPublishableMetric);
  if (metrics.length === 0) return null;
  return (
    <dl className="metric-band" aria-label="Reported operating figures">
      {metrics.map(metric => (
        <div key={metric.id}>
          <dt>
            <strong>{metric.value}</strong> {metric.label}
          </dt>
          <dd>
            {metric.basis}
            <span>Source: {metric.source}</span>
          </dd>
        </div>
      ))}
    </dl>
  );
}

export function Proof({
  proofImage,
  operatingExperience,
}: {
  proofImage?: ReactNode;
  operatingExperience?: ReactNode;
}) {
  return (
    <section id="proof" className="proof-section section-space" aria-labelledby="proof-title">
      <div className="shell">
        <div className="proof-grid">
          <div className="proof-copy">
            <span className="section-label">
              <span>04 /</span> Who is behind it
            </span>
            <h2 id="proof-title" className="section-title">
              We are not an agency<br />
              <span className="muted-heading">that read about D2C.</span>
            </h2>
            <p className="proof-lead">
              Sanskrutibydiorin ships Ganpati, Rakhi and Navratri products, where 14 days decide the year. Diorin
              Demifine Jewellery runs on daily jewellery operations. Both run on this infrastructure. Both are ours.
            </p>
            <dl className="operating-facts">
              {operatingFacts.map(fact => (
                <div key={fact.value + fact.label}>
                  <dt>
                    <strong>{fact.value}</strong> {fact.label}
                  </dt>
                  <dd>{fact.detail}</dd>
                </div>
              ))}
            </dl>
            <p>
              That is operating experience, not a client list — and we will not dress it up as one. On the audit call we
              walk you through the actual screens rather than a slide about them, and we tell you which parts of our
              experience transfer to your catalogue and which parts do not.
            </p>
            <p className="proof-honesty">
              We publish a number only once we can show you the report behind it. Until then, judge us on what you can
              see working.
            </p>
            <a href="#contact" className="text-link" data-cta-location="proof">
              {primaryCta.short} <ArrowIcon />
            </a>
          </div>
          <div className="proof-media">
            {proofImage}
            {operatingExperience}
          </div>
        </div>
        <MetricBand />
      </div>
    </section>
  );
}
