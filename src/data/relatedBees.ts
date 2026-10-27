import { beeCharacters } from '@/data/bees';

// One bee per service or audience page, used on the "related" cards. Decorative only.
export const relatedBee = {
  'store-conversion': beeCharacters.shopify.image,
  'order-operations': beeCharacters.calling.image,
  'ai-automation': beeCharacters.brand.image,
  b2b: beeCharacters.marketing.image,
  b2c: beeCharacters.social.image,
} as const;

export type RelatedBeeSlug = keyof typeof relatedBee;
