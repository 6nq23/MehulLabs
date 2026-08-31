import { Marquee } from '@/components/ui/Marquee';
import { Reveal } from '@/components/ui/Reveal';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { marqueeSkills, skillGroups } from '@/data/skills';

export function Skills() {
  return (
    <section id="skills" className="relative bg-surface py-section">
      <div className="shell">
        <SectionHeading
          eyebrow="Capabilities"
          title="The stack behind the studio."
          description="Placeholder copy. Three disciplines that rarely sit in one person — which is exactly why the seams between them tend to be where products fail."
        />

        <div className="mt-16 grid gap-px overflow-hidden rounded-xl2 border border-line bg-line md:grid-cols-3">
          {skillGroups.map((group, index) => (
            <Reveal
              key={group.title}
              delay={index * 0.08}
              className="group relative flex flex-col gap-6 bg-canvas p-8 transition-colors duration-500 ease-premium hover:bg-accent-soft lg:p-10"
            >
              <div className="flex items-baseline justify-between">
                <h3 className="font-display text-lg tracking-tight text-ink">
                  {group.title}
                </h3>
                <span className="font-display text-xs text-ink-faint">
                  0{index + 1}
                </span>
              </div>

              <p className="text-sm leading-relaxed text-ink-muted">
                {group.detail}
              </p>

              <ul className="mt-auto flex flex-col gap-0">
                {group.items.map((item) => (
                  <li
                    key={item}
                    className="flex items-center gap-3 border-t border-line py-3 text-sm text-ink"
                  >
                    <span className="h-1 w-1 shrink-0 rounded-full bg-accent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                    {item}
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>
      </div>

      <Marquee items={marqueeSkills} className="mt-20 border-line bg-canvas" />
    </section>
  );
}
