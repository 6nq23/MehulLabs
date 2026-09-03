/** Public brand information. Configure contact details and the canonical URL before launch. */
export const site = {
  name: 'Mehul Labs',
  founder: 'Mehul',
  role: 'AI Tools & Automation for D2C Brands',
  roleInline: 'AI tools and automation partner for D2C brands',
  tagline: 'We give D2C founders the AI tools, Claude skills, and hands-on support to grow across every platform — without hiring a tech team.',
  location: 'Bengaluru, India',
  email: process.env.NEXT_PUBLIC_CONTACT_EMAIL?.trim() || '',
  url: process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, '') || '',
  availability: 'Now onboarding founders for Q3',
} as const;

export const contactEmail =
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(site.email) && !/@example\.(com|org|net)$/i.test(site.email)
    ? site.email
    : '';

export const navLinks = [
  { label: 'Services', href: '#services' },
  { label: 'How it works', href: '#approach' },
  { label: 'Community', href: '#community' },
  { label: 'FAQs', href: '#faq' },
] as const;

