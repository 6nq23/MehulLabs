import { ArrowIcon, MagneticButton } from '@/components/ui/MagneticButton';

export function Hero() {
  return (
    <section id="top" className="hero" aria-labelledby="hero-title">
      <div className="shell">
        <div className="hero-topline">
          <span className="eyebrow-accent">AI Tools &amp; Claude Skills for D2C Brands</span>
          <span className="hero-location">Not a company. A community.</span>
        </div>
        <h1 id="hero-title" className="hero-title">
          <span>Grow faster.</span>
          <span className="hero-emphasis">Operate smarter<span className="hero-period">.</span></span>
        </h1>
        <div className="hero-bottom">
          <div className="hero-intro">
            <p>AI-powered tools and automations<br />{' '}built for D2C founders who move fast.</p>
            <a href="#story" className="text-link hero-film-link">
              <span className="play-symbol" aria-hidden="true">▶</span>
              See how it works <span className="text-ink-faint">/ 00:10</span>
            </a>
          </div>
          <div className="hero-description">
            <p>Product research, SEO automation, ads analysis, AI operations, and customer support — all set up for you, with 1 month of hand-in-hand support.</p>
            <MagneticButton href="#contact" variant="secondary" strength={0.12}>
              Start growing your brand <ArrowIcon />
            </MagneticButton>
          </div>
        </div>
        <div className="hero-footnote">
          <span>For founders building the future of D2C.</span>
          <a href="#services" className="text-link">Explore our services <ArrowIcon className="rotate-90" /></a>
        </div>
      </div>
    </section>
  );
}
