import { Reveal } from '@/components/ui/Reveal';
import { ArrowIcon } from '@/components/ui/MagneticButton';

export function About() {
  return (
    <section id="about" className="about-section section-space" aria-labelledby="about-title">
      <div className="shell about-grid">
        <div className="about-note"><span className="section-label"><span>03 /</span> Behind Mehul Labs</span>
          <p className="founder-monogram" aria-hidden="true">m<span>.</span></p>
          <div className="founder-caption"><strong>Mehul</strong><span>Founder, Mehul Labs</span></div>
        </div>
        <Reveal className="about-copy">
          <h2 id="about-title" className="section-title">Your business first.<br /><span className="muted-heading">The technology follows.</span></h2>
          <p className="about-lead">I&apos;m Mehul. I&apos;m building Mehul Labs around a practical question: what would make running your D2C brand easier?</p>
          <p>That starts with order operations, then the work around them: customer calls, creative decisions, and useful content. The right starting point depends on your team.</p>
          <p>We work out what can be automated and where human judgment still matters, before deciding what to build.</p>
          <a href="#contact" className="text-link" data-cta-location="about">Talk through your setup with Mehul <ArrowIcon /></a>
        </Reveal>
      </div>
    </section>
  );
}
