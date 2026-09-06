/** Public brand information. Configure contact details and the canonical URL before launch. */
export const site = {
  name: 'Mehul Labs',
  founder: 'Mehul',
  role: 'D2C Infrastructure & AI Automation',
  tagline: 'D2C infrastructure, COD voice agents, Meta creative analysis, and SEO automation for founders managing growing brands. Explore the right setup for your business.',
  location: 'Bengaluru, India',
  email: process.env.NEXT_PUBLIC_CONTACT_EMAIL?.trim() || '',
  url: process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, '') || '',
  whatsappUrl: 'https://wa.me/919426016918',
} as const;

export const contactEmail =
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(site.email) && !/@example\.(com|org|net)$/i.test(site.email)
    ? site.email
    : '';

export const navLinks = [
  { label: 'Solutions', href: '#services' },
  { label: 'How it works', href: '#approach' },
  { label: 'About', href: '#about' },
  { label: 'FAQs', href: '#faq' },
] as const;

