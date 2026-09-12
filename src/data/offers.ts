import type { ServiceRoute } from '@/data/services';

export const pilotPrice = {
  amount: 5000,
  currency: 'USD',
} as const;

export type ServiceOffer = {
  pillarId: ServiceRoute['pillarId'];
  pilot: {
    name: string;
    promise: string;
    includes: readonly string[];
  };
  custom: {
    name: string;
    promise: string;
    includes: readonly string[];
  };
};

export const serviceOffers: readonly ServiceOffer[] = [
  {
    pillarId: 'store-conversion',
    pilot: {
      name: 'Conversion Pilot',
      promise: 'Close one priority leak in the path from product page to checkout.',
      includes: [
        'Store and funnel review',
        'One agreed conversion use case',
        'Build, QA and written handover',
      ],
    },
    custom: {
      name: 'Conversion System',
      promise: 'Connect CRO, product discovery and smart-cart work across the store.',
      includes: [
        'Multiple conversion surfaces',
        'Store-specific roadmap and sequencing',
        'Fixed quote after the leak audit',
      ],
    },
  },
  {
    pillarId: 'operations',
    pilot: {
      name: 'Operations Pilot',
      promise: 'Take one repetitive order workflow out of your team’s day.',
      includes: [
        'Workflow and connection mapping',
        'One agreed automation or calling flow',
        'Build, QA and written handover',
      ],
    },
    custom: {
      name: 'Operations Layer',
      promise: 'Connect orders, inventory, calling and workflow automation across the operation.',
      includes: [
        'Multi-workflow or multi-brand scope',
        'Exception rules and team handoffs',
        'Fixed quote after the leak audit',
      ],
    },
  },
  {
    pillarId: 'ai-automation',
    pilot: {
      name: 'AI Growth Pilot',
      promise: 'Prove one useful Claude Brain or managed-marketing workflow with your real context.',
      includes: [
        'Approved source-material structure',
        'One agreed marketing use case',
        'Working setup and team handover',
      ],
    },
    custom: {
      name: 'AI Growth Engine',
      promise: 'Connect your Claude Brain to an ongoing managed-marketing system.',
      includes: [
        'Broader brand knowledge layer',
        'Several repeat marketing workflows',
        'Fixed quote after the leak audit',
      ],
    },
  },
] as const;

export function formatPilotPrice() {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: pilotPrice.currency,
    maximumFractionDigits: 0,
  }).format(pilotPrice.amount);
}

export function getServiceOffer(pillarId: ServiceRoute['pillarId']) {
  const offer = serviceOffers.find(item => item.pillarId === pillarId);
  if (!offer) throw new Error(`Missing offer for service: ${pillarId}`);
  return offer;
}
