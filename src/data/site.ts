/** Public brand information. Configure contact details and the canonical URL before launch. */
export const site = {
  name: 'Mehul Labs',
  founder: 'Mehul',
  role: 'The operating layer behind D2C brands',
  tagline:
    'Mehul Labs builds and runs the operating layer behind growing D2C brands — Shopify conversion, order operations, and demand — on one connected system, inside your own accounts. Start with a free 20-minute leak audit.',
  location: 'Bengaluru, India',
  email: process.env.NEXT_PUBLIC_CONTACT_EMAIL?.trim() || '',
  url: process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, '') || '',
  whatsappUrl: 'https://wa.me/919426016918',
  /** The reply promise published under the enquiry form. Only publish what you will hold to. */
  replyWindow: 'Usually within one working day',
} as const;

export const contactEmail =
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(site.email) && !/@example\.(com|org|net)$/i.test(site.email)
    ? site.email
    : '';

export const navLinks = [
  { label: 'The leaks', href: '#leaks' },
  { label: 'What we run', href: '#services' },
  { label: 'How it works', href: '#approach' },
  { label: 'FAQs', href: '#faq' },
] as const;

/** The single action every CTA on the page asks for. */
export const primaryCta = {
  label: 'Get my free leak audit',
  short: 'Get my leak audit',
  /** FUD reducers. These sit directly under the button, never anywhere else. */
  reducers: ['20 minutes on WhatsApp', 'No retainer, no obligation', 'You keep the 3 leaks either way'],
} as const;
