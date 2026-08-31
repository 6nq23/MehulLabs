/** Single source of truth for brand copy. Replace these with real content. */
export const site = {
  name: 'Mehul Labs',
  /** First name for personal, first-person copy (e.g. the hero intro). */
  founder: 'Mehul',
  role: 'AI Product Engineer',
  /** Mid-sentence form — lowercasing `role` would mangle the "AI" acronym. */
  roleInline: 'AI product engineer',
  tagline: 'I build AI products that businesses actually keep using.',
  location: 'Bengaluru, India',
  email: 'hello@example.com',
  phone: '+91 00000 00000',
  url: 'https://example.com',
  availability: 'Taking on 2 projects for Q3',
} as const;

export const navLinks = [
  { label: 'Story', href: '#story' },
  { label: 'About', href: '#about' },
  { label: 'Products', href: '#products' },
  { label: 'Work', href: '#work' },
  { label: 'Contact', href: '#contact' },
] as const;

export const socials = [
  { label: 'X', href: 'https://x.com' },
  { label: 'LinkedIn', href: 'https://linkedin.com' },
  { label: 'GitHub', href: 'https://github.com' },
  { label: 'Dribbble', href: 'https://dribbble.com' },
] as const;

export const stats = [
  { value: '6+', label: 'AI products shipped' },
  { value: '40+', label: 'Client engagements' },
  { value: '9', label: 'Years building' },
  { value: '4.9', label: 'Average rating' },
] as const;
