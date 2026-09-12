import { pillars, type PillarId } from '@/data/offer';

export type ServiceRoute = {
  slug: string;
  pillarId: Exclude<PillarId, 'all-in-one'>;
  navLabel: string;
  navDescription: string;
  title: string;
  accent: string;
  intro: string;
  problemTitle: string;
  problemBody: string;
  outcomes: readonly string[];
};

export const serviceRoutes: readonly ServiceRoute[] = [
  {
    slug: 'store-conversion',
    pillarId: 'store-conversion',
    navLabel: 'Store Conversion',
    navDescription: 'Turn more paid visits into orders.',
    title: 'You already paid for the traffic.',
    accent: 'Make more of it buy.',
    intro:
      'We improve the pages, product discovery and cart decisions that sit between an expensive click and a completed Shopify order.',
    problemTitle: 'The leak is rarely “more traffic.” It is what happens after the click.',
    problemBody:
      'A visitor lands on the wrong product, misses the proof they need or reaches a cart that adds no useful next step. More spend only sends more people through the same gaps.',
    outcomes: [
      'Find the pages and decisions losing the most buyers.',
      'Put proven products in front of visitors before they leave.',
      'Raise order value with relevant additions, not another blanket discount.',
    ],
  },
  {
    slug: 'order-operations',
    pillarId: 'operations',
    navLabel: 'Order Operations',
    navDescription: 'Handle more orders with less firefighting.',
    title: 'More orders should not create',
    accent: 'more operational chaos.',
    intro:
      'We connect order data, repetitive customer calls and the handoffs between your tools so your team works the exceptions instead of every order.',
    problemTitle: 'Booked revenue is not delivered revenue.',
    problemBody:
      'COD confirmations wait, NDR follow-ups happen late, stock changes live in several places and people spend the day copying updates. The dashboard says growth while the team feels the drag.',
    outcomes: [
      'Give every brand and channel one reliable order view.',
      'Make routine outbound calls on time, in the approved flow.',
      'Remove repetitive copying, updating and chasing between tools.',
    ],
  },
  {
    slug: 'ai-automation',
    pillarId: 'ai-automation',
    navLabel: 'AI Automation',
    navDescription: 'Connect managed marketing with a Claude Brain.',
    title: 'Your brand learns every week.',
    accent: 'Your systems should remember.',
    intro:
      'Managed marketing puts the work into market. Your Claude Brain keeps the approved brand context behind that work, so the next brief starts from what you already know.',
    problemTitle: 'The expensive part is not one task. It is explaining the brand again and again.',
    problemBody:
      'Customer insight sits in calls, creative lessons sit in ad accounts and positioning sits in somebody’s head. Each new campaign begins by rebuilding context that the business already paid to learn.',
    outcomes: [
      'Keep approved customer, offer and brand knowledge in one working context.',
      'Turn that context into sharper briefs, analysis and repeat decisions.',
      'Connect the thinking to a managed marketing team that ships the work.',
    ],
  },
] as const;

export function getServiceRoute(slug: string) {
  return serviceRoutes.find(service => service.slug === slug);
}

export function getServicePillar(service: ServiceRoute) {
  const pillar = pillars.find(item => item.id === service.pillarId);
  if (!pillar) throw new Error(`Missing offer pillar for service: ${service.slug}`);
  return pillar;
}
