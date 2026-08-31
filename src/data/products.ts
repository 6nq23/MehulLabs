export interface Product {
  id: string;
  name: string;
  category: string;
  summary: string;
  description: string;
  metrics: { value: string; label: string }[];
  tags: string[];
  status: 'Live' | 'Beta' | 'Private beta';
  /** Icon key rendered by ProductIcon. */
  icon: 'voice' | 'cart' | 'boxes' | 'support' | 'sales' | 'analytics';
}

export const products: Product[] = [
  {
    id: 'voice-agent',
    name: 'AI Voice Calling Agent',
    category: 'Conversational',
    summary: 'Human-grade phone conversations that book, qualify and follow up on their own.',
    description:
      'Placeholder copy. A real-time voice agent that handles inbound and outbound calls with sub-500ms latency, natural interruption handling, and a hand-off to a human the moment intent gets complicated.',
    metrics: [
      { value: '480ms', label: 'Median latency' },
      { value: '92%', label: 'Intent accuracy' },
    ],
    tags: ['Realtime', 'Telephony', 'Multilingual'],
    status: 'Live',
    icon: 'voice',
  },
  {
    id: 'd2c-assistant',
    name: 'D2C AI Assistant',
    category: 'Commerce',
    summary: 'A storefront concierge that turns browsing into buying.',
    description:
      'Placeholder copy. Understands catalogue, inventory and intent together, so it recommends what is actually in stock, answers sizing and returns questions, and quietly lifts basket value.',
    metrics: [
      { value: '+27%', label: 'Conversion lift' },
      { value: '3.1x', label: 'Return on spend' },
    ],
    tags: ['Shopify', 'Recommendations', 'Chat'],
    status: 'Live',
    icon: 'cart',
  },
  {
    id: 'inventory',
    name: 'AI Inventory Management',
    category: 'Operations',
    summary: 'Forecasting that tells you what to reorder before you feel the gap.',
    description:
      'Placeholder copy. Demand signals, seasonality and supplier lead times folded into one forecast, with reorder points that adjust themselves as the season moves.',
    metrics: [
      { value: '-34%', label: 'Stockouts' },
      { value: '18d', label: 'Cash freed' },
    ],
    tags: ['Forecasting', 'ERP sync', 'Alerts'],
    status: 'Live',
    icon: 'boxes',
  },
  {
    id: 'support',
    name: 'AI Customer Support',
    category: 'Service',
    summary: 'Resolution, not deflection — grounded in your own documentation.',
    description:
      'Placeholder copy. Retrieval over your help centre, order system and past tickets, with confidence thresholds that escalate instead of guessing. Every answer carries its citation.',
    metrics: [
      { value: '71%', label: 'Auto-resolved' },
      { value: '<1m', label: 'First response' },
    ],
    tags: ['RAG', 'Ticketing', 'Citations'],
    status: 'Live',
    icon: 'support',
  },
  {
    id: 'sales',
    name: 'AI Sales Automation',
    category: 'Growth',
    summary: 'Pipeline that keeps moving while your team sleeps.',
    description:
      'Placeholder copy. Enriches leads, writes the follow-up in your voice, scores intent from real engagement signals, and pushes clean records straight into the CRM.',
    metrics: [
      { value: '2.4x', label: 'Meetings booked' },
      { value: '11h', label: 'Saved weekly' },
    ],
    tags: ['CRM', 'Sequences', 'Scoring'],
    status: 'Beta',
    icon: 'sales',
  },
  {
    id: 'analytics',
    name: 'AI Analytics Platform',
    category: 'Intelligence',
    summary: 'Ask in plain language. Get the query, the chart and the caveat.',
    description:
      'Placeholder copy. A semantic layer over your warehouse so questions return governed, explainable answers — including an honest note when the data cannot support the claim.',
    metrics: [
      { value: '12s', label: 'Question to chart' },
      { value: '40+', label: 'Sources' },
    ],
    tags: ['Warehouse', 'Semantic layer', 'BI'],
    status: 'Private beta',
    icon: 'analytics',
  },
];
