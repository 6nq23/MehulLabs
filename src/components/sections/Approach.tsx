import { Reveal } from '@/components/ui/Reveal';
import { processSteps } from '@/data/commerce';

export function Approach({ focused = false, sectionNumber = '04' }: { focused?: boolean; sectionNumber?: string }) {
  return (
    <section id="approach" className="approach-section section-space" aria-labelledby="approach-title">
      <div className="shell">
        <div className="section-intro">
          <span className="section-label">
            <span>{sectionNumber} /</span> How it works
          </span>
          <div>
            <h2 id="approach-title" className="section-title">
              Agree the first fix.<br />
              <span>Build it. Test it. Hand it over.</span>
            </h2>
            <p className="section-description">
              We define the problem, the person who owns it, and the checks that tell us the workflow is ready.
              Your team reviews the work before rollout.
            </p>
          </div>
        </div>
        <div className="process-grid">
          {processSteps.map((step, index) => (
            <Reveal className="process-step" key={step.number}>
              <span className="process-number">{step.number}</span>
              <h3>{step.title}</h3>
              <p>{focused && index === 0 ? '20 minutes on the area you chose and the source material behind it. We name the leaks we can see and which one to close first.' : step.body}</p>
              <span className="process-output">
                <span aria-hidden="true">↳</span> {step.output}
              </span>
            </Reveal>
          ))}
        </div>
        <div className="approach-note">
          <span className="status-dot" aria-hidden="true" />
          <p>Scope, costs and responsibilities are agreed in writing before implementation — further work starts only with your approval.</p>
        </div>
      </div>
    </section>
  );
}
