import type { ReactNode } from 'react';

import { Reveal } from '@/components/ui/Reveal';
import { ArrowIcon } from '@/components/ui/MagneticButton';
import { primaryCta, site } from '@/data/site';
import { VideoStory } from './VideoStory';

export function About({ founderImage }: { founderImage?: ReactNode }) {
  return (
    <section id="about" className="about-section section-space" aria-labelledby="about-title">
      <div className="shell about-grid">
        <div className="about-note">
          <span className="section-label">
            <span>07 /</span> Behind Mehul Labs
          </span>
          {founderImage}
          <div className="founder-caption">
            <strong>Mehul</strong>
            <span>Founder, Mehul Labs</span>
          </div>
        </div>
        <Reveal className="about-copy">
          <h2 id="about-title" className="section-title">
            This was our problem first.<br />
            <span className="muted-heading">That is the whole difference.</span>
          </h2>
          <p className="about-lead">
            I am Mehul. Before this was a service, it was our own mess — orders across 2 brands, 3 festive peaks a year
            that decide whether the year works, COD calls nobody had time to make, and stock that ran out at the worst
            possible moment.
          </p>
          <p>
            We built the system to survive our own operations, then made it something other brands could run. So when we
            scope your setup, we are not guessing what an order looks like from the inside. We know what breaks when the
            volume jumps — and we know which of our answers will not transfer to your catalogue.
          </p>
          <p>
            Your brand has its own tools, its own team and its own constraints. We start there, we say plainly where our
            experience stops, and we would rather lose the work than sell you something you do not need yet.
          </p>
          <a href={site.bookingUrl} className="text-link" data-cta-location="about">
            {primaryCta.short} <ArrowIcon />
          </a>
        </Reveal>
      </div>
      <VideoStory />
    </section>
  );
}
