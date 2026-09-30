import queen from '../../asset/individual-bees/queen-flower-throne-v1.png';
import marketing from '../../asset/individual-bees/01-marketing-brain-no-name.png';
import seo from '../../asset/individual-bees/02-seo-automation-no-name.png';
import social from '../../asset/individual-bees/03-social-media-analyser-no-name.png';
import shopify from '../../asset/individual-bees/04-shopify-sales-agent-no-name.png';
import calling from '../../asset/individual-bees/05-calling-agent-no-name.png';
import brand from '../../asset/individual-bees/06-brand-second-brain-no-name.png';

// Shared artwork and labels for every hive placement.
export const queenBee = queen;
export const beeCharacters = {
  shopify: { image: shopify, label: 'Shopify Agent' },
  marketing: { image: marketing, label: 'Marketing Brain' },
  calling: { image: calling, label: 'Calling Agent' },
  seo: { image: seo, label: 'SEO Agent' },
  social: { image: social, label: 'Social Analyst' },
  brand: { image: brand, label: 'Brand Brain' },
} as const;

export type BeeId = keyof typeof beeCharacters;
// Percent radii and initial angles mirror the reference's three concentric orbits.
export const beeTracks = [
  { radiusX: 44, radiusY: 32 },
  { radiusX: 36, radiusY: 25 },
  { radiusX: 25.5, radiusY: 17 },
] as const;

export const beeOrbits = [
  { id: 'social', track: 0, angle: -90 },
  { id: 'calling', track: 0, angle: -42 },
  { id: 'seo', track: 1, angle: 26 },
  { id: 'shopify', track: 1, angle: 95 },
  { id: 'marketing', track: 2, angle: -122 },
] as const satisfies readonly { id: BeeId; track: number; angle: number }[];
