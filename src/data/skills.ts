export interface SkillGroup {
  title: string;
  detail: string;
  items: string[];
}

export const skillGroups: SkillGroup[] = [
  {
    title: 'AI Engineering',
    detail: 'Systems that stay reliable after the demo ends.',
    items: ['LLM orchestration', 'RAG pipelines', 'Evals & guardrails', 'Fine-tuning', 'Realtime voice'],
  },
  {
    title: 'Product & Interface',
    detail: 'Interfaces that make complex systems feel obvious.',
    items: ['Product strategy', 'Design systems', 'Interaction design', 'Prototyping', 'Motion'],
  },
  {
    title: 'Engineering',
    detail: 'The unglamorous parts that decide whether it ships.',
    items: ['TypeScript', 'Next.js', 'Python', 'Postgres', 'Edge infra'],
  },
];

export const marqueeSkills = [
  'LLM Orchestration',
  'Realtime Voice',
  'RAG',
  'Next.js',
  'TypeScript',
  'Evals',
  'Design Systems',
  'Python',
  'Motion Design',
  'Postgres',
  'Vector Search',
  'Product Strategy',
] as const;
