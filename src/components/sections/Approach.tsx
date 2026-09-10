import { Reveal } from '@/components/ui/Reveal';
import { processSteps } from '@/data/commerce';

export function Approach() {
  return (
    <section id="approach" className="approach-section section-space" aria-labelledby="approach-title">
      <div className="shell">
        <div className="section-intro">
          <span className="section-label">
            <span>05 /</span> How it works
          </span>
          <div>
            <h2 id="approach-title" className="section-title">
              One workflow live<br />
              <span>beats a six-month roadmap.</span>
            </h2>
            <p className="section-description">
              4 steps. Nobody rebuilds their whole operation at once, and nobody should — so we close the most
              expensive leak first, prove it holds, and only then touch the next one.
            </p>
          </div>
        </div>
        <div className="process-grid">
          {processSteps.map(step => (
            <Reveal className="process-step" key={step.number}>
              <span className="process-number">{step.number}</span>
              <h3>{step.title}</h3>
              <p>{step.body}</p>
              <span className="process-output">
                <span aria-hidden="true">↳</span> {step.output}
              </span>
            </Reveal>
          ))}
        </div>
        <div className="approach-note">
          <span className="status-dot" aria-hidden="true" />
          <p>Scope, costs and responsibilities are agreed in writing before implementation — and you can stop after any step.</p>
        </div>
      </div>
    </section>
  );
}
