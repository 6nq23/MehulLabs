import { ArrowIcon, MagneticButton } from '@/components/ui/MagneticButton';

export function Hero() {
  return (
    <section id="top" className="hero" aria-labelledby="hero-title">
      <div className="shell">
        <h1 id="hero-title" className="hero-title">
          <span>Use AI Better Than 99%</span>
          <span>of People & Businesses</span>
        </h1>
        <div className="hero-intro">
          <p>
            Learn how to use AI for actual D2C business growth.<br />
            We share the exact automations, custom tools, and strategies<br />
            we use to scale our own brands—from voice agents to marketing analytics.
          </p>
        </div>
        <div className="hero-cta">
          <MagneticButton href="#contact" variant="primary" strength={0.12}>
            Join Now <ArrowIcon />
          </MagneticButton>
        </div>
      </div>
    </section>
  );
}
