import { Reveal } from '@/components/ui/Reveal';
import { ArrowIcon } from '@/components/ui/MagneticButton';
import { leaks } from '@/data/offer';
import { primaryCta } from '@/data/site';

export function Leaks() {
  return (
    <section id="leaks" className="leaks-section section-space" aria-labelledby="leaks-title">
      <div className="shell">
        <div className="section-intro">
          <span className="section-label">
            <span>01 /</span> Where the money goes
          </span>
          <div>
            <h2 id="leaks-title" className="section-title">
              3 leaks.<br />
              <span className="muted-heading">Every growing brand has all three.</span>
            </h2>
            <p className="section-description">
              None of them appear as a line item in your P&amp;L. That is exactly why they survive for years. You can
              check every one of them yourself, today, in numbers you already have.
            </p>
          </div>
        </div>
        <div className="leak-grid">
          {leaks.map(leak => (
            <Reveal className="leak-card" key={leak.number}>
              <span className="leak-number" aria-hidden="true">
                {leak.number}
              </span>
              <h3>{leak.title}</h3>
              <p>{leak.body}</p>
              <p className="leak-check">{leak.check}</p>
            </Reveal>
          ))}
        </div>
        <div className="leaks-close">
          <p>
            You can close all three by hiring. Most brands do, and it works — until the next spike, when you hire again.
          </p>
          <a href="#contact" className="text-link" data-cta-location="leaks">
            {primaryCta.short} — we name yours in 20 minutes <ArrowIcon />
          </a>
        </div>
      </div>
    </section>
  );
}
