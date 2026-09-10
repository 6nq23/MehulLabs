export const solutions = [
  {
    id: 'infrastructure', number: '01', label: 'D2C infrastructure',
    shortcut: 'Manage daily orders',
    title: 'Built around the work behind your orders.',
    description: 'We use this infrastructure to manage orders in our jewellery and seasonal-product businesses. For your brand, we start with the daily work your team needs to handle.',
    items: ['Order management as the foundation', 'Your workflow and volume shape the setup', 'Automation and human responsibilities defined together'],
    action: 'Discuss my order operations',
  },
  {
    id: 'cod-voice', number: '02', label: 'COD voice agent',
    shortcut: 'Automate order calls',
    title: 'Take repetitive COD calls off your team’s plate.',
    description: 'A voice agent calls customers about their cash-on-delivery orders. Define the conversation flow and where your team needs to step in.',
    need: 'Your team spends too much of the day making COD calls.',
    input: 'Cash-on-delivery orders',
    output: 'Automated customer calls',
    action: 'Discuss COD calling',
  },
  {
    id: 'meta-creatives', number: '03', label: 'Meta creative analysis',
    shortcut: 'Decide what to test',
    title: 'Turn ad results into your next creative direction.',
    description: 'AI analyses your Meta ads and creatives to find performance patterns and recommend what to test next. Your campaigns show what actually works.',
    need: 'You have ad data, but no clear direction for the next creative.',
    input: 'Ad results + creatives',
    output: 'Creative directions to test',
    action: 'Discuss my Meta creatives',
  },
  {
    id: 'seo-content', number: '04', label: 'SEO & blog automation',
    shortcut: 'Keep content moving',
    title: 'Make useful blog content a consistent habit.',
    description: 'AI agents help automate your SEO and blog workflow. Keep quality review in the process, with content written for people—not just search engines.',
    need: 'SEO and blog work keeps slipping behind daily operations.',
    input: 'Your SEO + blog workflow',
    output: 'AI-assisted content production',
    action: 'Discuss SEO automation',
  },
] as const;

export type SolutionId = (typeof solutions)[number]['id'];
export type InterestId = SolutionId | 'not-sure';
export const solutionSelectionEvent = 'mehul:solution-select';

export function isSolutionId(value: unknown): value is SolutionId {
  return solutions.some(solution => solution.id === value);
}

export const orderRanges = ['Under 100', '100–499', '500–999', '1,000–1,499', '1,500+', 'Not live yet'] as const;

export const setupConsiderations = [
  { title: 'Your current tools', body: 'Share what you use today. We confirm the connections required and any custom work before agreeing on your setup.' },
  { title: 'Your team’s role', body: 'Agree which tasks the system handles, which stay with your team, and who reviews situations that need human judgment.' },
  { title: 'Your implementation scope', body: 'Know what is included. Setup costs, usage charges, handover, and support responsibilities are clarified before work starts.' },
] as const;

export const processSteps = [
  { number: '01', title: 'Find the starting point.', body: 'Tell us what slows your team down, which tools you use, and what needs to change. We identify the workflow to tackle first.', output: 'One clearly defined priority' },
  { number: '02', title: 'Agree on the scope.', body: 'Clarify the workflow, connections, costs, and responsibilities together. Know what is included before implementation starts.', output: 'An agreed implementation scope' },
  { number: '03', title: 'Set up. Check. Hand over.', body: 'Configure the agreed workflow, validate it with your team, and explain day-to-day operation and support.', output: 'A workflow your team can operate' },
] as const;

export const faqs = [
  { question: 'Do I need all four solutions?', answer: 'No. Start with the bottleneck you need to address. That might be order operations, COD calls, Meta creative analysis, or SEO content. We discuss the relevant scope with you; you do not need to start with all four.' },
  { question: 'Where do you use the infrastructure yourselves?', answer: 'We use it for order management in Sanskrutibydiorin, our seasonal-products brand, and Diorin Demifine Jewellery. Both are our own businesses under one parent, not independent clients. Their workflows inform our experience; your setup still needs its own scope and validation.' },
  { question: 'Will it suit my order volume?', answer: 'Tell us your normal daily volume and the peaks you need to plan for. We assess the workflow, tools, and team involved. Our own brands’ operating experience is not a guarantee of capacity or results for every business.' },
  { question: 'Will it work with my current store and tools?', answer: 'Tell us what your team uses today. We review the connections your workflow needs and clarify what can be supported, what requires custom work, and any dependencies before agreeing on the setup.' },
  { question: 'What can the COD voice agent handle?', answer: 'The offer focuses on calling customers about cash-on-delivery orders. We define the conversation flow with you and confirm supported languages, call handling, and situations that need your team before implementation. A completed call does not guarantee that an order will be delivered.' },
  { question: 'Does the AI guarantee better ads or search rankings?', answer: 'No. Meta creative analysis identifies patterns and recommends what to test; your campaigns establish what works. SEO and blog automation support consistent, useful content, but rankings and business results also depend on your market, website, offer, and execution.' },
  { question: 'How much does setup cost?', answer: 'The scope depends on the solution, your current tools, and the volume of work involved. We discuss implementation costs and clarify any usage, third-party, or ongoing support charges before work begins. Share your requirements so we can scope the right setup.' },
  { question: 'Who operates the system after setup?', answer: 'We agree on day-to-day responsibilities, account access, and support as part of your scope. The handover explains what your team manages and when to involve us. Ask about ongoing support when we discuss your setup.' },
] as const;
