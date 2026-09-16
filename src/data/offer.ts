/**
 * The offer: what is sold, what it removes, and what the buyer is not risking.
 *
 * Nothing here may state a price, a result, or an assurance the business has not
 * agreed to honour. Prices publish only when a real starting number is set (see
 * `hasStartingPrice`); until then the page says the scope is quoted after the audit,
 * which is the truth.
 */

export interface StartingPrice {
  /** A real, honoured starting number. Never a placeholder or an aspiration. */
  amount: number;
  currency: 'INR' | 'USD';
  /** What the amount buys: 'month', 'setup', 'workflow'. */
  unit: string;
  /** What the number depends on, so it reads as a floor and not as a quote. */
  basis: string;
}

export interface OfferModule {
  id: string;
  name: string;
  /** Plain-language benefit. Never a feature list. */
  body: string;
}

export type PillarId = 'store-conversion' | 'operations' | 'ai-automation' | 'all-in-one';

export interface Pillar {
  id: PillarId;
  number: string;
  label: string;
  /** The one-line outcome, in the operator's own vocabulary. */
  outcome: string;
  shortcut: string;
  headline: string;
  description: string;
  modules: readonly OfferModule[];
  /** The qualifying signal. Answers "is this me?" before the price does. */
  fit: string;
  startingPrice: StartingPrice | null;
  action: string;
}

/**
 * Set `startingPrice` for a pillar only once the number is real and honoured.
 * Example: { amount: 45000, currency: 'INR', unit: 'month', basis: 'catalogues under 500 SKUs' }
 */
export const pillars: readonly Pillar[] = [
  {
    id: 'store-conversion',
    number: '01',
    label: 'Store conversion',
    outcome: 'More revenue from the traffic you already pay for.',
    shortcut: 'Sell more to the same traffic',
    headline: 'Help shoppers find the product, proof and next step they need.',
    description:
      'Three pieces working on the same visitor: the page they land on, the moment they try to leave, and the cart they finally reach.',
    modules: [
      {
        id: 'cro',
        name: 'Shopify CRO',
        body: 'We rebuild the pages that actually carry your sales — product, collection, cart, checkout — against what your own store data says is stopping people.',
      },
      {
        id: 'sell-agent',
        name: 'Shopify sell agent',
        body: 'Help shoppers discover relevant products using approved store data and rules. We agree where recommendations appear and test the experience before rollout.',
      },
      {
        id: 'smart-cart',
        name: 'Shopify smart cart',
        body: 'The cart offers the add-ons that genuinely fit the order, so shoppers can find relevant extras without a blanket discount.',
      },
    ],
    fit: 'Traffic is arriving, and your conversion rate and average order value have been flat for months.',
    startingPrice: null,
    action: 'Close my conversion leak',
  },
  {
    id: 'operations',
    number: '02',
    label: 'Order operations',
    outcome: 'Less repetitive order work. More time for exceptions.',
    shortcut: 'Handle volume without hiring',
    headline: 'Keep orders moving from confirmation to delivery.',
    description:
      'Orders, stock, brands and follow-up calls handled by one system, so your team spends the day on exceptions instead of on everything.',
    modules: [
      {
        id: 'infrastructure',
        name: 'D2C infrastructure',
        body: 'Connect supported order, stock and courier data so your team can spot dispatch delays and stock gaps. We confirm available integrations before scoping the build.',
      },
      {
        id: 'calling-agent',
        name: 'AI calling agent',
        body: 'Scope cash-on-delivery confirmation, failed-delivery follow-up, cart recovery or feedback calls. Confirm language support, call rules and human handoff before launch.',
      },
      {
        id: 'workflow',
        name: 'AI workflow automation',
        body: 'The repetitive work between your tools — the copying, the updating, the chasing — mapped into a workflow with logs, exception rules and a named owner.',
      },
    ],
    fit: 'Your volume has outgrown spreadsheets, and every festive spike costs you a week of firefighting.',
    startingPrice: null,
    action: 'Fix my order operations',
  },
  {
    id: 'ai-automation',
    number: '03',
    label: 'AI & marketing workflows',
    outcome: 'A marketing system that keeps what your brand learns.',
    shortcut: 'Turn brand knowledge into action',
    headline: 'Your marketing should not have to start from zero every Monday.',
    description:
      'Managed marketing handles the work in market. Your Claude Brain keeps the approved context behind it — customers, offers, voice, past decisions and what the numbers taught us.',
    modules: [
      {
        id: 'marketing',
        name: 'Marketing, managed',
        body: 'Competitor teardown, the angles worth testing, creative and content production, ads, and day-to-day social. Channels, deliverables and review responsibilities are agreed in your scope.',
      },
      {
        id: 'claude-brain',
        name: 'Claude Brain',
        body: 'A private, structured AI workspace built from the source material you approve, so briefs, analysis and repeat decisions begin with your brand context instead of a blank chat.',
      },
    ],
    fit: 'Marketing knowledge is scattered across chats, people and decks, and every new task needs the same context explained again.',
    startingPrice: null,
    action: 'Build my AI growth engine',
  },
  {
    id: 'all-in-one',
    number: '04',
    label: 'All-in-one',
    outcome: 'The whole layer. One scope, one team.',
    shortcut: 'Everything, connected',
    headline: 'All three, connected — which is where they are worth the most.',
    description:
      'One scope, one team, one point of contact. We start with the leak costing you the most, then add the rest in a sequence you approve.',
    modules: [
      {
        id: 'sequenced',
        name: 'Sequenced, not dumped',
        body: 'We review the first workflow against agreed checks before adding another. You approve each step before it starts.',
      },
      {
        id: 'custom',
        name: 'Customised to your operation',
        body: 'Your catalogue, your couriers, your languages, your brands. The modules are ours; the configuration is yours.',
      },
      {
        id: 'one-owner',
        name: 'One person accountable',
        body: 'One scope and one contact across store, operations and demand — instead of three vendors explaining why it was the other two.',
      },
    ],
    fit: 'You want the whole operating layer rather than one module, and you want one person answerable for it.',
    startingPrice: null,
    action: 'Scope the whole layer',
  },
];

/**
 * Above-the-fold credentials. Each one is checkable or plainly true today — an operator fact,
 * not a performance claim. One line of body copy each; if it wraps to three, it is too long.
 */
export const credentials = [
  { label: 'We run 2 D2C brands ourselves', body: 'Sanskrutibydiorin · Diorin Demifine Jewellery' },
  { label: 'AI calling agent', body: 'Confirms COD, chases NDR, recovers carts by phone' },
  { label: 'Shopify-first', body: 'CRO, sell agent and smart cart built for your store' },
  { label: '100% in your accounts', body: 'Your Shopify, your ad accounts, your data' },
] as const;

/**
 * Counts that are true by construction — no report required to state them. Numbers that depend
 * on a measurement belong in `publishedMetrics`, which does require one.
 */
export const operatingFacts = [
  { value: '2', label: 'brands we own and run', detail: 'Seasonal products and jewellery, under one parent business' },
  { value: '3', label: 'festive peaks a year', detail: 'Ganpati, Rakhi and Navratri — where 14 days decide the year' },
  { value: '1', label: 'system behind both', detail: 'The same layer we would build for you' },
] as const;

export interface PublishedMetric {
  id: string;
  /** The figure exactly as the report states it. */
  value: string;
  /** What it counts: 'orders on a peak day', 'calls completed', 'SKUs live'. Be exact. */
  label: string;
  /** Whose number it is and over what window: 'Sanskrutibydiorin · Ganpati 2026'. */
  basis: string;
  /** The report anyone could be shown: 'Shopify order export, IST'. Never a private dashboard link. */
  source: string;
}

/**
 * Measured numbers. Empty until a figure has a dated report, a count definition and a source
 * behind it — see docs/operating-evidence.md. An incomplete entry renders nothing.
 *
 *   { id: 'peak-orders', value: '1,500', label: 'orders on a peak day',
 *     basis: 'Sanskrutibydiorin · Ganpati 2026', source: 'Shopify order export, IST' },
 */
export const publishedMetrics: readonly PublishedMetric[] = [];

export function isPublishableMetric(metric: PublishedMetric) {
  return [metric.value, metric.label, metric.basis, metric.source].every(
    field => typeof field === 'string' && field.trim().length > 0,
  );
}

export function hasStartingPrice(price: StartingPrice | null): price is StartingPrice {
  return Boolean(
    price && Number.isFinite(price.amount) && price.amount > 0 && price.unit.trim() && price.basis.trim(),
  );
}

export function formatStartingPrice(price: StartingPrice) {
  const locale = price.currency === 'INR' ? 'en-IN' : 'en-US';
  const amount = new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: price.currency,
    maximumFractionDigits: 0,
  }).format(price.amount);
  return 'From ' + amount + ' / ' + price.unit;
}

/** Problem section. Every claim here is checkable by the reader in their own dashboard. */
export const leaks = [
  {
    number: '01',
    title: 'You pay for the same visit twice.',
    body: 'You bought the click. They landed on a product that was not your best seller, did not find what they came for, and left. Then you paid again to bring them back with a retargeting ad.',
    check: 'Check it yourself: compare the add-to-cart rate on your top five landing pages with your site conversion rate. The gap is the leak.',
  },
  {
    number: '02',
    title: 'You booked the order. You never got the money.',
    body: 'COD orders nobody confirmed. NDR nobody chased on day one. Carts abandoned at the last step. The order shows up in your dashboard and never shows up in your bank.',
    check: 'Check it yourself: count last month’s returns to origin and multiply by shipping both ways — before you count the stock that came back unsellable.',
  },
  {
    number: '03',
    title: 'Your team’s day goes to work a system should do.',
    body: 'Copying orders between panels. Calling to confirm. Updating stock by hand. Writing the product descriptions nobody ever has time to write.',
    check: 'Check it yourself: ask your team what they did yesterday, then count how many of those hours a customer would have paid for.',
  },
] as const;

/** Failed alternatives, named honestly — the reader has already tried all three. */
export const failedFixes = [
  {
    title: 'You added apps.',
    body: 'A cart app, an upsell app, a review app, a WhatsApp app. Each optimises its own dashboard. None of them knows what is in stock, what actually gets delivered, or what your team already told the customer this morning.',
  },
  {
    title: 'You hired an agency.',
    body: 'They optimise what the ad platform reports. The ad platform counts a booked order. Your bank counts a delivered one. You pay for the difference between the two.',
  },
  {
    title: 'You hired more people.',
    body: 'Headcount absorbs the work; it does not remove it. The work returns at the next spike, and by then it costs more.',
  },
] as const;

/** The mechanism. This is what makes the modules worth more together than apart. */
export const mechanism = {
  label: 'One connected layer',
  headline: 'Everything reads the same order data.',
  body: 'We build all of it on one layer that reads your live orders — what is in stock, what actually sells, what actually gets delivered, and what your team has already done about it. That single change is what makes each piece work harder than it would alone.',
  effects: [
    'The smart cart offers what is genuinely in stock and genuinely converting — not a rule somebody set six months ago.',
    'The sell agent catches a visitor leaving a slow product and shows them what your buyers actually buy.',
    'The calling agent knows the real state of the order before it dials, so nobody is asked something they already answered.',
    'Marketing is judged on delivered revenue, not on what the ad platform claims it delivered.',
  ],
  close: 'That last one is the whole argument. Delivered revenue is the only number that pays salaries.',
} as const;

/**
 * Risk position — owner-approved: free audit, fixed written scope, client-owned accounts.
 * Do not add a refund, results or timeline promise here without written owner approval.
 */
export const assurances = [
  {
    title: '20 minutes. Zero cost. Zero commitment.',
    body: 'We name the leaks we can see and which one to close first. If the honest answer is that you do not need us yet, you will hear that instead of a proposal.',
  },
  {
    title: '1 fixed scope, in writing, before anything is built.',
    body: 'What is included, what it costs, what your team does, what we do, and what happens at handover. No open-ended retainer, and no scope that grows quietly.',
  },
  {
    title: '100% of it is built in your accounts.',
    body: 'Your Shopify, your ad accounts, your domains, your data, your workflows. You keep your accounts and agreed deliverables. Handover identifies the subscriptions, licences and maintenance needed to keep them running.',
  },
] as const;

/** Qualification. Disqualifying honestly protects lead quality and earns the rest of the page. */
export const fitCriteria = {
  yes: [
    'You are on Shopify, or moving to it, and a bad week already costs real money.',
    'COD is a meaningful share of your orders, and RTO is a meaningful share of your costs.',
    'You run more than one brand, or you are about to.',
    'You already have traffic. The problem is what happens to it after it arrives.',
  ],
  no: [
    'You have not launched, or you are still looking for a product people want. Fix that first — no system rescues a product nobody is buying.',
    'You want someone to take the business off your hands. We build systems your team runs; somebody on your side has to own it.',
    'You need a guaranteed revenue outcome. We can agree deliverables and measurement, but cannot promise sales.',
  ],
} as const;
