import { pillars, type PillarId } from '@/data/offer';

/**
 * The enquiry options mirror the offer pillars, so the page and the form never drift.
 * Four choices plus "help me choose" — enough to route the conversation, few enough
 * that nobody has to weigh eight options before they can act.
 */
export const solutions = pillars.map(pillar => ({
  id: pillar.id,
  number: pillar.number,
  label: pillar.label,
  shortcut: pillar.shortcut,
  outcome: pillar.outcome,
  action: pillar.action,
}));

export type SolutionId = PillarId;
export type InterestId = SolutionId | 'not-sure';
export const solutionSelectionEvent = 'mehul:solution-select';

/** Campaign links published before the offer was repackaged still land in the right place. */
const legacySolutionIds: Readonly<Record<string, SolutionId>> = {
  infrastructure: 'operations',
  'cod-voice': 'operations',
  'meta-creatives': 'ai-automation',
  'seo-content': 'ai-automation',
  growth: 'ai-automation',
};

export function isSolutionId(value: unknown): value is SolutionId {
  return solutions.some(solution => solution.id === value);
}

/** Accepts a current or retired solution ID and returns the pillar it belongs to. */
export function resolveSolutionId(value: unknown): SolutionId | null {
  if (isSolutionId(value)) return value;
  return typeof value === 'string' && value in legacySolutionIds ? legacySolutionIds[value] : null;
}

/** Volume tells us how to scope everything except demand work, where catalogue size matters more. */
export function needsOrderVolume(interest: InterestId) {
  return interest !== 'ai-automation';
}

export const orderRanges = ['Under 100', '100–499', '500–999', '1,000–1,499', '1,500+', 'Not live yet'] as const;

export const processSteps = [
  {
    number: '01',
    title: 'The leak audit.',
    body: '20 minutes on your store and last month’s orders. We name the leaks we can see and which one is costing you the most right now.',
    output: 'Your leaks, ranked — yours to keep',
  },
  {
    number: '02',
    title: 'The scope.',
    body: 'The workflow, the connections, the cost, and who does what. Written down and agreed before a single thing is built.',
    output: 'A fixed scope you approved',
  },
  {
    number: '03',
    title: 'One workflow live.',
    body: 'We build and run the first workflow end to end, with your team, until it holds without anyone watching it.',
    output: 'One thing working, not a roadmap',
  },
  {
    number: '04',
    title: 'Then the next one.',
    body: 'We add the next module only once the last is holding. You approve each step, you own each step, and you can stop after any of them.',
    output: 'A layer that grows at your pace',
  },
] as const;

export const faqs = [
  {
    question: 'What is the leak audit, exactly — and what does it cost?',
    answer:
      '20 minutes on WhatsApp or a call. Before it, we look at your store; during it, we ask about last month’s orders. You leave with the leaks we can see, ranked, and what it would take to close the first one. It costs nothing, and you keep the list whether or not you work with us. If the honest answer is that you do not need us yet, we will say so.',
  },
  {
    question: 'You do not show client case studies. Why should I trust this?',
    answer:
      'Because we will not publish a result we cannot substantiate. What we can show you is the system running in our own businesses: Sanskrutibydiorin and Diorin Demifine Jewellery are our own brands under one parent business, not independent clients. On the call we walk you through the actual screens rather than a slide about them. Judge us on what you can see working, not on a testimonial you cannot check.',
  },
  {
    question: 'Do I have to take all eight modules?',
    answer:
      'No, and most brands should not. Start with the single leak costing you the most — store conversion, order operations, or demand. We add the next module only once the last one is holding on its own. You can stop after any step.',
  },
  {
    question: 'How much does it cost?',
    answer:
      'It depends on your catalogue size, your order volume, and how many brands you run. What we can promise about money is the shape, not the number: a fixed scope agreed in writing before work starts, with setup, usage and any third-party charges named up front. No open-ended retainer. Share your requirements and you get a real number, not a range.',
  },
  {
    question: 'Will an AI agent annoy my customers?',
    answer:
      'It will if you let it. So the sell agent only interrupts a visit that was ending anyway, the smart cart only offers what genuinely fits the order, and the calling agent runs on your script, in your customers’ languages, with the rules about when to stop agreed with you before it dials. You approve the behaviour before it goes live, and you can change it any time.',
  },
  {
    question: 'What can the calling agent actually handle?',
    answer:
      'The repetitive outbound calls: cash-on-delivery confirmation, NDR follow-up, abandoned cart, and delivery feedback. We define the conversation flow with you and confirm supported languages, call handling, and exactly which situations get handed to your team. A completed call is not a guarantee that an order will be delivered — it is a guarantee that somebody asked, on time, every time.',
  },
  {
    question: 'We are on WooCommerce, or on our own stack. Does this still apply?',
    answer:
      'The order operations, calling agent and workflow automation are not Shopify-specific — they work wherever your orders live, subject to the connections your stack supports. The CRO, sell agent and smart cart are built for Shopify. Tell us what you run and we will tell you plainly which parts transfer and which do not.',
  },
  {
    question: 'We only do a few hundred orders a day. Are we too small?',
    answer:
      'Probably not. The question that matters is not volume, it is whether the work is repetitive and whether a bad week already costs you real money. If you are pre-launch or still searching for a product people want, you are too early — and we would rather tell you that than sell you infrastructure.',
  },
  {
    question: 'Who has access to my store and my customer data?',
    answer:
      'Everything is built inside your accounts — your Shopify, your ad accounts, your domains. We work on access you grant and can revoke, we agree what data each workflow touches as part of the scope, and access ends when the engagement does. Nothing important lives in an account you do not control.',
  },
  {
    question: 'What happens if we stop working together?',
    answer:
      'Nothing switches off. The workflows, the accounts, the content and the configurations are yours because they were built in your accounts from day one. Handover explains what your team runs day to day and when to call us. That is the point of building it this way.',
  },
  {
    question: 'Should we wait until after the festive season?',
    answer:
      'It depends which leak. Store conversion is most expensive to leave open exactly when traffic is at its peak, so that work usually belongs before the season. Deep operations changes are safer after it — nobody should be rewiring order flow mid-spike. Tell us your calendar and we will tell you which side of the spike your project belongs on.',
  },
  {
    question: 'Does the AI guarantee better marketing results?',
    answer:
      'No, and be careful of anyone who says otherwise. The Claude Brain keeps approved context available and analysis identifies patterns worth testing; your campaigns establish what actually works. Results still depend on your market, offer, creative and execution. What we control is that the system begins with the right context and the work gets reviewed before it goes live.',
  },
] as const;
