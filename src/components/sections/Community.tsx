import { Reveal } from '@/components/ui/Reveal';
import { ArrowIcon } from '@/components/ui/MagneticButton';

export function Community() {
  return (
    <section id="community" className="about-section section-space" aria-labelledby="community-title">
      <div className="shell about-grid">
        <div className="about-note"><span className="section-label"><span>03 /</span> Not a company. A community.</span>
          <p className="founder-monogram" aria-hidden="true">m<span>.</span></p>
          <div className="founder-caption"><strong>Mehul</strong><span>Founder, Mehul Labs</span></div>
        </div>
        <Reveal className="about-copy">
          <h2 id="community-title" className="section-title">We&apos;re not building a company.<br /><span className="muted-heading">We&apos;re building a community.</span></h2>
          <p className="about-lead">A community of founders. A community of D2C brands. A community of future-proof, fast-growing businesses that help each other win.</p>
          <p>When you join Mehul Labs, you don&apos;t just get tools — you get access to a network of founders who share what&apos;s working, what&apos;s not, and how to grow together. We believe the best brands are built when founders aren&apos;t building alone.</p>
          <p>AI tools handle the repetitive work. The community handles the loneliness. Together, you move faster than any agency could take you.</p>
          <a href="#contact" className="text-link">Join the community <ArrowIcon /></a>
        </Reveal>
      </div>
    </section>
  );
}
