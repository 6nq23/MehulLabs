import { ArrowIcon } from '@/components/ui/MagneticButton';
import { getServicePillar, serviceRoutes } from '@/data/services';

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
              3 expensive leaks.<br />
              <span className="muted-heading">Choose where to start.</span>
            </h2>
            <p className="section-description">
              Each service now has one focused page: the problem it removes, what we build, who it fits and what happens
              next. Start with the leak costing you the most; connect the rest only when it makes sense.
            </p>
          </div>
        </div>
        <div className="service-route-grid">
          {serviceRoutes.map(service => {
            const pillar = getServicePillar(service);
            return (
              <a id={pillar.id} href={`/services/${service.slug}`} className="service-route-card" key={service.slug}>
                <div className="service-top"><span>{pillar.number}</span><span>{service.navLabel}</span></div>
                <h3>{service.navDescription}</h3>
                <p>{pillar.outcome}</p>
                <ul aria-label={`${service.navLabel} includes`}>
                  {pillar.modules.map(module => <li key={module.id}>{module.name}</li>)}
                </ul>
                <span className="service-route-action">See how it works <ArrowIcon /></span>
              </a>
            );
          })}
        </div>
        <p className="solutions-note">
          Need all three connected, or not sure which leak is biggest?{' '}
          <a href="#contact" data-cta-location="solutions">
            Tell us what is slowing you down and we will rank them <span aria-hidden="true">↗</span>
          </a>
        </p>
      </div>
    </section>
  );
}
