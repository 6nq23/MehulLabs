export interface Testimonial {
  id: string;
  quote: string;
  name: string;
  title: string;
  company: string;
}

export const testimonials: Testimonial[] = [
  {
    id: 't1',
    quote:
      'Placeholder copy. He shipped in six weeks what two vendors had spent a year describing. The difference was that he cared what happened after launch.',
    name: 'Priya Raghavan',
    title: 'VP Operations',
    company: 'Atlas Retail Group',
  },
  {
    id: 't2',
    quote:
      'Placeholder copy. The voice agent handles calls our team used to dread. Customers routinely do not realise it is not a person.',
    name: 'Daniel Okafor',
    title: 'Head of Support',
    company: 'Northwind Logistics',
  },
  {
    id: 't3',
    quote:
      'Placeholder copy. Rare combination — the taste of a designer and the rigour of an infrastructure engineer. Our dashboards finally mean something.',
    name: 'Mei Lin Chen',
    title: 'Chief Data Officer',
    company: 'Meridian Capital',
  },
  {
    id: 't4',
    quote:
      'Placeholder copy. He told us which two features to cut before he wrote a line of code. That saved the quarter.',
    name: 'Sofia Almeida',
    title: 'Founder',
    company: 'Lumen Health',
  },
];
