import Image from 'next/image';
import { getImageSlot, type ImageSlotId } from '@/data/media';

/**
 * Renders one page image slot. `data-placeholder` marks stand-in artwork so it is greppable
 * in the DOM and in tests; it changes nothing a visitor sees.
 */
export function SlotImage({
  id,
  className,
  priority = false,
  sizes,
  showCaption = true,
}: {
  id: ImageSlotId;
  className?: string;
  priority?: boolean;
  sizes: string;
  showCaption?: boolean;
}) {
  const slot = getImageSlot(id);
  return (
    <figure className={className} data-placeholder={slot.placeholder ? '' : undefined}>
      <Image
        src={slot.src}
        alt={slot.alt}
        width={slot.width}
        height={slot.height}
        sizes={sizes}
        priority={priority}
      />
      {showCaption && <figcaption>{slot.caption}</figcaption>}
    </figure>
  );
}
