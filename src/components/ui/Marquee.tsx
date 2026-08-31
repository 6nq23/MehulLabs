import { cn } from '@/lib/utils';

interface Props {
  items: readonly string[];
  className?: string;
}

/** Duplicated track + 50% translate = a seam-free loop. */
export function Marquee({ items, className }: Props) {
  const track = [...items, ...items];

  return (
    <div
      className={cn(
        'relative flex overflow-hidden border-y border-line py-6',
        '[mask-image:linear-gradient(90deg,transparent,#000_8%,#000_92%,transparent)]',
        className
      )}
      aria-hidden="true"
    >
      <div className="flex w-max animate-marquee items-center gap-12 pr-12 motion-reduce:animate-none">
        {track.map((item, index) => (
          <span key={`${item}-${index}`} className="flex items-center gap-12 whitespace-nowrap">
            <span className="font-display text-lg tracking-tight text-ink-muted">
              {item}
            </span>
            <span className="h-1 w-1 shrink-0 rounded-full bg-accent/60" />
          </span>
        ))}
      </div>
    </div>
  );
}
