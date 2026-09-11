import { SolutionLink } from '@/components/ui/SolutionLink';
import { formatStartingPrice, hasStartingPrice, pillars, type Pillar } from '@/data/offer';

function PriceLine({ pillar }: { pillar: Pillar }) {
  if (hasStartingPrice(pillar.startingPrice)) {
    return (
      <p className="pillar-price">
        <strong>{formatStartingPrice(pillar.startingPrice)}</strong>
        <span>{pillar.startingPrice.basis}</span>
      </p>
    );
  }
  return (
    <p className="pillar-price">
      <strong>Scoped after the audit</strong>
      <span>A fixed number, in writing, before anything is built</span>
    </p>
  );
}

function PillarBlock({ pillar }: { pillar: Pillar }) {
  return (
    <article id={pillar.id} className="pillar" aria-labelledby={pillar.id + '-title'}>
      <div className="pillar-copy">
        <div className="service-top">
          <span>{pillar.number}</span>
          <span>{pillar.label}</span>
        </div>
        <h3 id={pillar.id + '-title'}>{pillar.headline}</h3>
        <p className="pillar-outcome">{pillar.outcome}</p>
        <p>{pillar.description}</p>
        <div className="pillar-fit">
          <h4>A good fit when</h4>
          <p>{pillar.fit}</p>
        </div>
        <PriceLine pillar={pillar} />
        <SolutionLink id={pillar.id}>{pillar.action}</SolutionLink>
      </div>
      <ul className="pillar-modules" aria-label={pillar.label + ' modules'}>
        {pillar.modules.map((module, moduleIndex) => (
          <li key={module.id}>
            <span className="module-index" aria-hidden="true">
              {pillar.number}.{moduleIndex + 1}
            </span>
            <div>
              <h4>{module.name}</h4>
              <p>{module.body}</p>
            </div>
          </li>
        ))}
      </ul>
    </article>
  );
}

export function Services() {
  return (
    <section id="services" className="services-section section-space" aria-labelledby="services-title">
      <div className="shell">
        <div className="section-intro">
          <span className="section-label">
            <span>03 /</span> What we run
          </span>
          <div>
            <h2 id="services-title" className="section-title">
              3 systems. 8 modules.<br />
              <span className="muted-heading">Start with 1.</span>
            </h2>
            <p className="section-description">
              Take a single module, take a whole system, or take the layer. Every module is something we build, run and
              hand over inside your own accounts — not a licence you are left to figure out alone.
            </p>
          </div>
        </div>
        <div className="pillar-stack">
          {pillars.map(pillar => (
            <PillarBlock pillar={pillar} key={pillar.id} />
          ))}
        </div>
        <p className="solutions-note">
          Not sure which leak is biggest?{' '}
          <a href="#contact" data-cta-location="solutions">
            Tell us what is slowing you down and we will rank them <span aria-hidden="true">↗</span>
          </a>
        </p>
      </div>
    </section>
  );
}
