import { cn } from '@/lib/utils';
import { Reveal } from './Reveal';
import { TextReveal } from './TextReveal';

interface Props {
  eyebrow: string;
  title: string;
  description?: string;
  align?: 'left' | 'center';
  className?: string;
  action?: React.ReactNode;
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = 'left',
  className,
  action,
}: Props) {
  return (
    <div
      className={cn(
        'flex flex-col gap-6',
        align === 'center' && 'items-center text-center',
        action && 'md:flex-row md:items-end md:justify-between',
        className
      )}
    >
      <div className={cn('flex flex-col gap-5', align === 'center' ? 'items-center' : 'max-w-2xl')}>
        <Reveal>
          <span className="eyebrow-accent">{eyebrow}</span>
        </Reveal>

        <TextReveal as="h2" className="text-display-md text-ink">
          {title}
        </TextReveal>

        {description ? (
          <Reveal delay={0.12}>
            <p className="max-w-xl text-[1.0625rem] leading-relaxed text-ink-muted">
              {description}
            </p>
          </Reveal>
        ) : null}
      </div>

      {action ? <Reveal delay={0.18} className="shrink-0">{action}</Reveal> : null}
    </div>
  );
}
