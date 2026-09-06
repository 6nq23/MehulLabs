import { Reveal } from '@/components/ui/Reveal';
import { processSteps } from '@/data/commerce';

export function Approach() {
  return (
    <section id="approach" className="approach-section section-space" aria-labelledby="approach-title">
      <div className="shell">
        <div className="section-intro">
          <span className="section-label"><span>02 /</span> How it works</span>
          <div><h2 id="approach-title" className="section-title">From your current setup<br /><span>to a working system.</span></h2>
          <p className="section-description">Start with a conversation about the work. Agree on the setup before committing to implementation.</p></div>
        </div>
        <div className="process-grid">{processSteps.map(step => <Reveal className="process-step" key={step.number}>
          <span className="process-number">{step.number}</span>
          <h3>{step.title}</h3><p>{step.body}</p><span className="process-output"><span aria-hidden="true">↳</span> {step.output}</span>
        </Reveal>)}</div>
        <div className="approach-note"><span className="status-dot" aria-hidden="true" /><p>Scope, costs, and support agreed before implementation.</p></div>
      </div>
    </section>
  );
}
