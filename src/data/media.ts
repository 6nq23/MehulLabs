/**
 * Image slots on the sales page.
 *
 * Every slot below currently points at the brand-film poster as a stand-in. That poster is a
 * brand illustration, not a photograph and not a product screenshot, so `alt` and `caption`
 * describe what is actually on screen — never what we wish were there.
 *
 * To replace a slot: drop the real file in `public/`, update `src`, `width`, `height`, `alt`
 * and `caption`, and set `placeholder: false`. `intent` says what the real image has to show.
 * `npm test` fails if a slot claims to be final while still pointing at the poster.
 */

export type ImageSlotId = 'hero' | 'proof' | 'founder';

export interface ImageSlot {
  id: ImageSlotId;
  /** What the replacement image must actually show. Written for whoever shoots it. */
  intent: string;
  src: string;
  alt: string;
  width: number;
  height: number;
  caption: string;
  /** True while `src` is a stand-in rather than the real artwork. */
  placeholder: boolean;
}

const posterAlt =
  'Mehul Labs brand illustration: a team member at a desk, surrounded by badges for research, SEO, operations, calling and customer support.';

export const imageSlots: readonly ImageSlot[] = [
  {
    id: 'hero',
    intent:
      'One real screen from the system — the order view, the calling-agent log, or a smart cart in a live store. Shot or cropped around 2.2:1, customer data redacted. This is the only visual most visitors will ever see.',
    src: '/img1.png',
    alt: posterAlt,
    width: 1280,
    height: 720,
    caption: 'Brand illustration placeholder — a real system screen replaces this.',
    placeholder: true,
  },
  {
    id: 'proof',
    intent:
      'The order-management screen running one of the owned brands, with a dated filter visible and customer details redacted. This is the image that carries the proof gate.',
    src: '/img1.png',
    alt: posterAlt,
    width: 1280,
    height: 720,
    caption: 'Brand illustration — a redacted screenshot of the live order system replaces this.',
    placeholder: true,
  },
  {
    id: 'founder',
    intent:
      'A real photograph of Mehul, ideally at the desk where the operation actually runs. A face people can match to the person they will message.',
    src: '/story-poster.webp',
    alt: posterAlt,
    width: 1280,
    height: 720,
    caption: 'Brand illustration — a photograph of Mehul replaces this.',
    placeholder: true,
  },
];

export function getImageSlot(id: ImageSlotId) {
  const slot = imageSlots.find(item => item.id === id);
  if (!slot) throw new Error('Unknown image slot: ' + id);
  return slot;
}
