import { ArrowIcon, MagneticButton } from '@/components/ui/MagneticButton';
import { solutions } from '@/data/commerce';

export function Hero() {
  return (
    <section id="top" className="hero" aria-labelledby="hero-title">
      <div className="shell">
        <p className="eyebrow-accent">D2C infrastructure &amp; automation</p>
        <h1 id="hero-title" className="hero-title">
          D2C operations,<br />
          <span>ready for more orders.</span>
        </h1>
        <div className="hero-intro">
          <p>Infrastructure for founders scaling toward <strong>1,500+ daily orders.</strong> Bring clarity to order management, then add AI for COD calls, Meta creatives, and SEO.</p>
        </div>
        <div className="hero-cta">
          <MagneticButton href="#contact" variant="primary" strength={0.12} trackingLocation="hero">
            Discuss my setup <ArrowIcon />
          </MagneticButton>
          <a href="#services" className="text-link">Explore the four solutions <ArrowIcon className="rotate-90" /></a>
        </div>
        <nav className="solution-shortcuts" aria-label="Find your solution">
          {solutions.map(solution => <a href={'#' + solution.id} key={solution.id}>
            <span className="shortcut-number" aria-hidden="true">{solution.number}</span>
            <span><strong>{solution.label}</strong><span>{solution.shortcut}</span></span>
            <ArrowIcon />
          </a>)}
        </nav>
      </div>
    </section>
  );
}
