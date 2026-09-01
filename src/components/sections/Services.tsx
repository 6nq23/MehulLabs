import { Reveal } from '@/components/ui/Reveal';
import { ArrowIcon } from '@/components/ui/MagneticButton';
import { services } from '@/data/commerce';

export function Services() {
  return (
    <section id="services" className="services-section section-space" aria-labelledby="services-title">
      <div className="shell">
        <div className="section-intro">
          <span className="section-label"><span>01 /</span> What we do</span>
          <div><h2 id="services-title" className="section-title">AI tools that work.<br /><span className="muted-heading">While you build your brand.</span></h2>
            <p className="section-description">Pick one service, combine a few, or go all-in. We set everything up, teach you how it works, and support you for 1 full month.</p>
          </div>
        </div>
        <div className="service-grid">
          {services.map(service => (
            <Reveal key={service.number} className="service-card">
              <div className="service-top"><span>{service.number}</span><span>{service.category}</span><ArrowIcon className="-rotate-45" /></div>
              <h3>{service.title}</h3><p>{service.description}</p>
              <ul>{service.items.map(item => <li key={item}><span aria-hidden="true">↗</span>{item}</li>)}</ul>
              <a href="#contact" className="service-link" aria-label={'Discuss ' + service.category.toLowerCase()}>Let's set it up <ArrowIcon /></a>
            </Reveal>
          ))}
        </div>
        <div className="channels"><p>Works across every platform you sell on.</p><ul aria-label="Supported platforms"><li>Your own store</li><li>Shopify</li><li>Amazon</li><li>Flipkart</li><li>Social commerce</li></ul></div>
      </div>
    </section>
  );
}
