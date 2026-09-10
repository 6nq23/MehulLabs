import { SolutionLink } from '@/components/ui/SolutionLink';
import { OperatingExperience } from '@/components/ui/OperatingExperience';
import { setupConsiderations, solutions } from '@/data/commerce';

export function Services() {
  const [infrastructure, ...supporting] = solutions;

  return (
    <section id="services" className="services-section section-space" aria-labelledby="services-title">
      <div className="shell">
        <div className="section-intro">
          <span className="section-label"><span>01 /</span> Four focused solutions</span>
          <div>
            <h2 id="services-title" className="section-title">Order operations first.<br /><span className="muted-heading">Grounded in our own work.</span></h2>
            <p className="section-description">A system we use, and a setup shaped around your business. Start with order management or a specific need for automation.</p>
          </div>
        </div>
        <article id={infrastructure.id} className="infrastructure-feature" aria-labelledby="infrastructure-title">
          <div className="infrastructure-copy">
            <div className="service-top"><span>{infrastructure.number}</span><span>{infrastructure.label}</span></div>
            <h3 id="infrastructure-title">{infrastructure.title}</h3>
            <p>{infrastructure.description}</p>
            <ul className="solution-points">{infrastructure.items.map(item => <li key={item}><span aria-hidden="true">↗</span>{item}</li>)}</ul>
            <SolutionLink id={infrastructure.id}>{infrastructure.action}</SolutionLink>
          </div>
          <OperatingExperience />
        </article>
        <dl className="setup-considerations" aria-label="What we clarify before setup">
          {setupConsiderations.map(item => <div key={item.title}><dt>{item.title}</dt><dd>{item.body}</dd></div>)}
        </dl>
        <div className="supporting-heading"><p>Three focused ways to add AI.</p><span>Start with one. You don&apos;t need all four.</span></div>
        <div className="service-grid">
          {supporting.map(solution => (
            <article id={solution.id} className="service-card" key={solution.id} aria-labelledby={solution.id + '-title'}>
              <div className="service-card-inner">
                <div className="service-top"><span>{solution.number}</span><span>{solution.label}</span></div>
                <h3 id={solution.id + '-title'}>{solution.title}</h3>
                <p>{solution.description}</p>
                <div className="service-fit"><h4>A good fit when</h4><p>{solution.need}</p></div>
                <div className="service-card-bottom">
                  <dl className="solution-workflow">
                    <div><dt>Start with</dt><dd>{solution.input}</dd></div>
                    <div><dt>Work toward</dt><dd>{solution.output}</dd></div>
                  </dl>
                  <SolutionLink id={solution.id}>{solution.action}</SolutionLink>
                </div>
              </div>
            </article>
          ))}
        </div>
        <p className="solutions-note">Not sure where to start? <a href="#contact" data-cta-location="solutions">Tell us what&apos;s slowing your team down <span aria-hidden="true">↗</span></a></p>
      </div>
    </section>
  );
}
