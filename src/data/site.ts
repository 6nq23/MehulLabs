/** Public brand information. Configure contact details and the canonical URL before launch. */
export const site = {
  name: 'mlabs Growth',
  founder: 'Mehul',
  role: 'AI workflows, products and brand services',
  tagline:
    'Practical AI systems for growing brands. Explore Shopify conversion, order operations, AI workflows and mlabs Skill Manager. Start with a free 20-minute audit.',
  location: 'Bengaluru, India',
  email: import.meta.env.PUBLIC_CONTACT_EMAIL?.trim() || '',
  url: import.meta.env.PUBLIC_SITE_URL?.replace(/\/$/, '') || (import.meta.env.PROD ? 'https://www.mlabsgrowth.com' : ''),
  whatsappUrl: 'https://wa.me/919426016918',
  /** The reply promise published under the enquiry form. Only publish what you will hold to. */
  replyWindow: 'Usually within one working day',
} as const;

export const contactEmail =
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(site.email) && !/@example\.(com|org|net)$/i.test(site.email)
    ? site.email
    : '';

export const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'Services', href: '/#services' },
  { label: 'Products', href: '/products' },
  { label: 'About', href: '/about' },
  { label: 'FAQs', href: '/#faq' },
  { label: 'Pricing & scope', href: '/offers' },
  { label: 'Free tools', href: '/tools' },
] as const;

/** The single action every CTA on the page asks for. */
export const primaryCta = {
  label: 'Get my free leak audit',
  short: 'Get my leak audit',
  /** FUD reducers. These sit directly under the button, never anywhere else. */
  reducers: ['20 minutes on WhatsApp', 'No retainer, no obligation', 'Practical next steps to keep'],
} as const;
