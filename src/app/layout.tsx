import type { Metadata, Viewport } from 'next';
import { Inter, Manrope } from 'next/font/google';

import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { ScrollProgress } from '@/components/layout/ScrollProgress';
import { SmoothScrollProvider } from '@/components/providers/SmoothScrollProvider';
import { ConversionEvents } from '@/components/providers/ConversionEvents';
import { contactEmail, site } from '@/data/site';

import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const display = Manrope({
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url || 'http://localhost:3000'),
  alternates: site.url ? { canonical: site.url } : undefined,
  title: {
    default: `${site.name} — ${site.role}`,
    template: `%s — ${site.name}`,
  },
  description: site.tagline,
  keywords: [
    'D2C infrastructure',
    'D2C order management',
    'Shopify conversion rate optimization',
    'Shopify smart cart',
    'AI calling agent',
    'COD confirmation calls',
    'AI workflow automation',
    'SEO automation',
    site.name,
  ],
  authors: [{ name: site.name, url: site.url || undefined }],
  creator: site.name,
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: site.url || undefined,
    siteName: site.name,
    title: `${site.name} — ${site.role}`,
    description: site.tagline,
    images: [{ url: '/opengraph-image', width: 1200, height: 630, alt: 'Mehul Labs — the operating layer behind D2C brands' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${site.name} — ${site.role}`,
    description: site.tagline,
    images: ['/opengraph-image'],
  },
  robots: {
    index: Boolean(site.url),
    follow: Boolean(site.url),
    googleBot: { index: Boolean(site.url), follow: Boolean(site.url), 'max-image-preview': 'large' },
  },
};

export const viewport: Viewport = {
  themeColor: '#F7F7F2',
  colorScheme: 'light',
  width: 'device-width',
  initialScale: 1,
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: site.name,
  url: site.url || undefined,
  email: contactEmail || undefined,
  description: site.tagline,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${inter.variable} ${display.variable}`}>
      <head>
        {/* Preserve readable content when JavaScript is unavailable. */}
        <noscript>
          <style>{`[data-reveal],[data-word]{opacity:1!important;transform:none!important}.film-play,.film-corner,.enquiry-form{display:none!important}`}</style>
        </noscript>
      </head>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c') }}
        />
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-6 focus:top-6 focus:z-[100] focus:rounded-full focus:bg-ink focus:px-5 focus:py-3 focus:text-sm focus:text-white"
        >
          Skip to content
        </a>

        <SmoothScrollProvider>
          <ConversionEvents />
          <ScrollProgress />
          <Navbar />
          <main id="main">{children}</main>
          <Footer />
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
