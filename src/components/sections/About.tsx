import { Reveal } from '@/components/ui/Reveal';
import { ArrowIcon } from '@/components/ui/MagneticButton';
import { VideoStory } from './VideoStory';

export function About() {
  return (
    <section id="about" className="about-section section-space" aria-labelledby="about-title">
      <div className="shell about-grid">
        <div className="about-note"><span className="section-label"><span>03 /</span> Behind Mehul Labs</span>
          <p className="founder-monogram" aria-hidden="true">m<span>.</span></p>
          <div className="founder-caption"><strong>Mehul</strong><span>Founder, Mehul Labs</span></div>
        </div>
        <Reveal className="about-copy">
          <h2 id="about-title" className="section-title">We run D2C brands, too.<br /><span className="muted-heading">That shapes what we build.</span></h2>
          <p className="about-lead">I&apos;m Mehul. We use our infrastructure in our own jewellery and seasonal-product businesses. That gives us first-hand experience of the work behind an order.</p>
          <p>Your brand will have its own tools, team, and challenges. We start there—not with an assumption that our setup should be copied unchanged.</p>
          <p>We agree what the system should handle and where your team&apos;s judgment belongs before deciding what to build.</p>
          <a href="#contact" className="text-link" data-cta-location="about">Talk through your setup with Mehul <ArrowIcon /></a>
        </Reveal>
      </div>
      <VideoStory />
    </section>
  );
}
