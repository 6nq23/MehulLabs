export interface Project {
  id: string;
  title: string;
  client: string;
  year: string;
  discipline: string;
  blurb: string;
  /** Tailwind gradient classes for the generated cover art. */
  gradient: string;
}

export const projects: Project[] = [
  {
    id: 'atlas',
    title: 'Atlas Commerce Cloud',
    client: 'Atlas Retail Group',
    year: '2025',
    discipline: 'Platform · AI',
    blurb:
      'Placeholder copy. Rebuilt a fragmented retail stack into one operating layer serving 240 stores in real time.',
    gradient: 'from-[#1A1A1E] via-[#3A3A42] to-[#8E8E96]',
  },
  {
    id: 'northwind',
    title: 'Northwind Voice OS',
    client: 'Northwind Logistics',
    year: '2025',
    discipline: 'Voice · Realtime',
    blurb:
      'Placeholder copy. A dispatch assistant taking 4,000 driver calls a week without a queue.',
    gradient: 'from-[#C8102E] via-[#8E1220] to-[#2A0A10]',
  },
  {
    id: 'meridian',
    title: 'Meridian Insight Suite',
    client: 'Meridian Capital',
    year: '2024',
    discipline: 'Analytics · Design',
    blurb:
      'Placeholder copy. Turned a 60-tab reporting ritual into a single question box the whole desk trusts.',
    gradient: 'from-[#E4E4E7] via-[#B4B4BC] to-[#5A5A64]',
  },
  {
    id: 'lumen',
    title: 'Lumen Care Companion',
    client: 'Lumen Health',
    year: '2024',
    discipline: 'Product · Research',
    blurb:
      'Placeholder copy. A patient follow-up companion designed around consent, clarity and escalation.',
    gradient: 'from-[#0A0A0B] via-[#2A1216] to-[#C8102E]',
  },
];
