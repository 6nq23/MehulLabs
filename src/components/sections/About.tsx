import { Reveal } from '@/components/ui/Reveal';
import { TextReveal } from '@/components/ui/TextReveal';
import { site } from '@/data/site';

const principles = [
  {
    title: 'Start at the edges',
    body: 'Placeholder copy. The interesting problems live where a system meets a person having a bad day. That is where I begin.',
  },
  {
    title: 'Earn the automation',
    body: 'Placeholder copy. Nothing gets automated until the manual version is understood well enough to defend the trade-offs.',
  },
  {
    title: 'Ship, then sharpen',
    body: 'Placeholder copy. A rough thing in production teaches more in a week than a perfect thing in review teaches in a quarter.',
  },
];

export function About() {
  return (
    <section id="about" className="relative bg-canvas py-section">
      <div className="shell">
        <div className="grid gap-16 lg:grid-cols-[0.9fr_1.1fr] lg:gap-24">
          <div className="flex flex-col gap-6">
            <Reveal>
              <span className="eyebrow-accent">About</span>
            </Reveal>
            <TextReveal as="h2" className="text-display-md text-ink">
              {'A builder first. {Everything} else came after.'}
            </TextReveal>
          </div>

          <div className="flex flex-col gap-10">
            <Reveal delay={0.08}>
              <p className="text-[1.25rem] leading-[1.6] text-ink">
                Placeholder copy. I spent nine years shipping software inside
                teams that could not afford to be wrong — logistics, health,
                retail. The pattern was always the same: the model was never
                the hard part.
              </p>
            </Reveal>

            <Reveal delay={0.14}>
              <p className="leading-relaxed text-ink-muted">
                Placeholder copy. What decides whether an AI product survives is
                everything around it — how it fails, who it escalates to, what
                it refuses to guess, and whether the person on the other end
                trusts it by the third interaction. That is the work I care
                about, and it is why I build products end to end rather than
                hand off a prototype.
              </p>
            </Reveal>

            <Reveal delay={0.2}>
              <p className="leading-relaxed text-ink-muted">
                Placeholder copy. Today I run a small studio out of{' '}
                {site.location}, building six AI products and taking on a
                handful of partner engagements each year.
              </p>
            </Reveal>

            <div className="hairline" />

            <Reveal stagger={0.1} className="grid gap-8 sm:grid-cols-3">
              {principles.map((item, index) => (
                <div key={item.title} className="flex flex-col gap-3">
                  <span className="font-display text-xs text-accent">
                    0{index + 1}
                  </span>
                  <h3 className="text-[0.95rem] font-semibold tracking-tight text-ink">
                    {item.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-ink-muted">
                    {item.body}
                  </p>
                </div>
              ))}
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
