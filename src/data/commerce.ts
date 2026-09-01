export const services = [
  {
    number: '01', title: 'Find what sells before you invest.', category: 'Product Research',
    description: 'AI-powered product research across Amazon, Flipkart, and D2C niches. Spot winning products, analyse competition, and validate demand before you spend a rupee.',
    items: ['AI competitor & trend analysis', 'Demand validation tools', 'Niche scoring & opportunity maps'],
  },
  {
    number: '02', title: 'Rank higher. Spend less time doing it.', category: 'SEO Automation',
    description: 'Claude-powered SEO pipelines that handle keyword research, content briefs, on-page optimisation, and blog publishing — on autopilot.',
    items: ['Automated keyword research', 'AI content generation & scheduling', 'On-page & technical SEO audits'],
  },
  {
    number: '03', title: 'Stop guessing on ad spend.', category: 'Ads Analysis & Automation',
    description: 'AI tools that monitor your ad campaigns across Meta, Google, and Amazon — flag what\'s bleeding money, and suggest what to scale.',
    items: ['Cross-platform ad performance dashboards', 'Automated bid & budget recommendations', 'Creative analysis & A/B testing'],
  },
  {
    number: '04', title: 'Run leaner. Move faster.', category: 'AI Operations',
    description: 'Automate the repetitive work that slows your team down. From inventory alerts to order processing to reporting — let AI handle the ops.',
    items: ['Workflow automation (Claude skills)', 'Inventory & order management', 'Connected reporting & alerts'],
  },
  {
    number: '05', title: 'Support that never sleeps.', category: 'AI Calling & WhatsApp',
    description: 'AI calling agents and WhatsApp automation that handle customer queries, order updates, and follow-ups — so your team can focus on growth.',
    items: ['AI voice calling agent', 'WhatsApp chatbot & automation', '24/7 customer support without hiring'],
  },
] as const;

export const processSteps = [
  { number: '01', title: 'We set everything up.', body: 'We don\'t hand you a PDF and disappear. We install the tools, configure the automations, and connect them to your existing platforms. You watch, you learn, you own it.', output: 'A working system' },
  { number: '02', title: '1 month hand-in-hand support.', body: 'For 30 days after setup, we\'re right there with you. Teaching, troubleshooting, answering questions. If something breaks, we fix it together. You\'re never left alone.', output: 'Confidence to run it yourself' },
  { number: '03', title: 'You choose what fits.', body: 'Pick a single service, combine a few, or go all-in. No lock-in contracts, no forced bundles. Your brand, your pace, your choice.', output: 'A plan that fits your stage' },
] as const;

export const faqs = [
  { question: 'What exactly do you set up for us?', answer: 'We set up AI tools and Claude-powered automations directly inside your business — product research dashboards, SEO pipelines, ad monitoring, operations automation, and customer support bots. Everything is configured on your accounts, so you own it fully.' },
  { question: 'Do I need to be technical?', answer: 'Not at all. We handle the entire setup. During the 1-month hand-in-hand support period, we teach you how everything works step by step. By the end, you\'ll be running it confidently on your own.' },
  { question: 'Can I pick just one service?', answer: 'Yes. You can choose a single service, a combo of two or three, or go all-in with the complete stack. There are no forced bundles — we build around what your brand actually needs right now.' },
  { question: 'Is this only for Amazon sellers?', answer: 'No. We work with D2C brands across their own websites, Shopify stores, Amazon, Flipkart, and social commerce. The tools and automations adapt to wherever you sell.' },
  { question: 'What happens after the 1-month support?', answer: 'You keep everything we set up — it\'s yours. If you need ongoing support after that, we can discuss extended arrangements. But our goal is to make you self-sufficient within that first month.' },
  { question: 'What makes this different from hiring a marketing agency?', answer: 'We\'re not an agency. We\'re building a community of founders who share tools, strategies, and growth together. You get AI-powered systems that work 24/7, not a team you have to manage. And the community means you\'re never building alone.' },
] as const;
