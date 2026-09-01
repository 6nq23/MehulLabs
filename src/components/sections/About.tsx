import { Reveal } from '@/components/ui/Reveal';
import { ArrowIcon } from '@/components/ui/MagneticButton';
import { site } from '@/data/site';

export function About() {
  return (
    <section id="about" className="about-section section-space" aria-labelledby="about-title">
      <div className="shell about-grid">
        <div className="about-note"><span className="section-label"><span>03 /</span> The people behind the work</span>
          <p className="founder-monogram" aria-hidden="true">m<span>.</span></p>
          <div className="founder-caption"><strong>{site.founder}</strong><span>Founder, Mehul Labs</span></div>
        </div>
        <Reveal className="about-copy">
          <h2 id="about-title" className="section-title">A little more personal.<br /><span className="muted-heading">A lot more invested.</span></h2>
          <p className="about-lead">Behind every brand is someone who cares an unreasonable amount. We like working with those people.</p>
          <p>Mehul Labs brings growth, design, and technology around the same table. So the store you build, the campaigns you run, and the systems behind them all work toward the same thing.</p>
          <p>You bring the knowledge of your business. We bring fresh eyes, practical thinking, and the willingness to work through the details with you.</p>
          <a href="#contact" className="text-link">Tell us what you’re building <ArrowIcon /></a>
        </Reveal>
      </div>
    </section>
  );
}
