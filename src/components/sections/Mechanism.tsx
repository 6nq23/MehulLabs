import { Reveal } from '@/components/ui/Reveal';
import { failedFixes, mechanism } from '@/data/offer';

export function Mechanism() {
  return (
    <section id="mechanism" className="mechanism-section section-space" aria-labelledby="mechanism-title">
      <div className="shell">
        <div className="section-intro">
          <span className="section-label">
            <span>02 /</span> Why the usual fixes slip
          </span>
          <div>
            <h2 id="mechanism-title" className="section-title">
              8 apps and an agency<br />
              <span className="muted-heading">is not a system.</span>
            </h2>
            <p className="section-description">
              Everything you have tried works on its own. That is the problem — each piece is optimising a number that
              nobody gets paid on.
            </p>
          </div>
        </div>
        <ol className="failed-fixes">
          {failedFixes.map(fix => (
            <li key={fix.title}>
              <h3>{fix.title}</h3>
              <p>{fix.body}</p>
            </li>
          ))}
        </ol>
        <Reveal className="mechanism-block">
          <span className="mechanism-label">{mechanism.label}</span>
          <h3>{mechanism.headline}</h3>
          <p className="mechanism-body">{mechanism.body}</p>
          <ul className="mechanism-effects">
            {mechanism.effects.map(effect => (
              <li key={effect}>
                <span aria-hidden="true">→</span>
                {effect}
              </li>
            ))}
          </ul>
          <p className="mechanism-close">{mechanism.close}</p>
        </Reveal>
      </div>
    </section>
  );
}
