import { ArrowIcon, MagneticButton } from '@/components/ui/MagneticButton';
import { solutions } from '@/data/commerce';
import { ownedBrands } from '@/data/experience';

export function Hero() {
  return (
    <section id="top" className="hero" aria-labelledby="hero-title">
      <div className="shell">
        <p className="eyebrow-accent">D2C infrastructure &amp; automation</p>
        <h1 id="hero-title" className="hero-title">
          Manage your D2C orders<br />
          <span>with a system we use ourselves.</span>
        </h1>
        <div className="hero-intro">
          <p>We use our order-management infrastructure in our own brands, <strong>{ownedBrands[0].name}</strong> and <strong>{ownedBrands[1].name}</strong>. Let&apos;s explore the right setup for yours.</p>
        </div>
        <div className="hero-cta">
          <MagneticButton href="#contact" variant="primary" strength={0.12} trackingLocation="hero">
            Discuss my setup <ArrowIcon />
          </MagneticButton>
          <a href="#infrastructure" className="text-link">Explore the infrastructure <ArrowIcon className="rotate-90" /></a>
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
