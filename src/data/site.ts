const configuredUrl = import.meta.env.PUBLIC_SITE_URL?.trim();
const canonicalOrigin = configuredUrl ? new URL(configuredUrl) : null;
if (canonicalOrigin && (canonicalOrigin.protocol !== 'https:' || canonicalOrigin.username || canonicalOrigin.password || canonicalOrigin.pathname !== '/' || canonicalOrigin.search || canonicalOrigin.hash)) {
  throw new Error('PUBLIC_SITE_URL must be a public HTTPS origin without a path, query or credentials.');
}

/** Public brand information. Configure contact details and the canonical URL before launch. */
export const site = {
  name: 'MlabsGrowth',
  founder: 'Mehul',
  role: 'AI workflows, products and brand services',
  tagline:
    'We help D2C brands turn booked orders into delivered revenue — Shopify conversion, COD and delivery follow-up, and AI marketing workflows on one connected layer. Start with a free 30-minute audit.',
  location: 'Bengaluru, India',
  email: import.meta.env.PUBLIC_CONTACT_EMAIL?.trim() || '',
  url: canonicalOrigin?.origin || (import.meta.env.PROD ? 'https://www.mlabsgrowth.com' : ''),
  indexable: import.meta.env.PROD && import.meta.env.PUBLIC_SITE_INDEXABLE !== 'false' && !['preview', 'development'].includes(import.meta.env.PUBLIC_DEPLOY_ENV || ''),
  bookingUrl: 'https://calendly.com/kalathiyamehul13899/30min',
  whatsappUrl: 'https://wa.me/919979538416',
  /** The reply promise published under the enquiry form. Only publish what you will hold to. */
  replyWindow: 'Usually within one working day',
  /** Square brand mark used for Organization schema and search favicons. */
  logo: '/mlabsgrowth-icon.png',
  /** Spellings people may search for. One public name (MlabsGrowth) everywhere else. */
  alternateNames: ['Mlabs Growth', 'MLabs Growth'],
  /** Remote-first service business: clients in any country. */
  areaServed: 'Worldwide',
  /**
   * Official profiles that prove this is a real business (LinkedIn page, Instagram, X, YouTube,
   * Clutch, Shopify Partner directory). Add full https URLs only; empty entries are ignored.
   */
  sameAs: [] as string[],
} as const;

/**
 * The person behind the byline. A full name and public profiles are strong trust signals for
 * Google: set `fullName` (for example "Mehul <Surname>") and add LinkedIn/X URLs to `sameAs`.
 */
export const founder = {
  name: 'Mehul',
  fullName: '',
  jobTitle: 'Founder, MlabsGrowth',
  image: '',
  sameAs: [] as string[],
  knowsAbout: [
    'Shopify conversion rate optimization',
    'Cash on delivery (COD) order confirmation',
    'Return to origin (RTO) reduction',
    'Ecommerce order operations',
    'AI marketing workflows',
    'D2C unit economics',
  ],
} as const;

export const founderDisplayName = founder.fullName.trim() || founder.name;

export const contactEmail =
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(site.email) && !/@example\.(com|org|net)$/i.test(site.email)
    ? site.email
    : '';

export const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'Services', href: '/services' },
  { label: 'Products', href: '/products' },
  { label: 'Blog', href: '/blog' },
  { label: 'About', href: '/about' },
  { label: 'FAQs', href: '/services#faq' },
  { label: 'Pricing & scope', href: '/offers' },
  { label: 'Free tools', href: '/tools' },
  { label: 'Guides', href: '/guides' },
] as const;

/** The single action every CTA on the page asks for. */
export const primaryCta = {
  label: 'Book my free audit call',
  short: 'Book a call',
  /** FUD reducers. These sit directly under the button, never anywhere else. */
  reducers: ['30-minute call via Calendly', 'No retainer, no obligation', 'A ranked leak list, yours to keep'],
} as const;
