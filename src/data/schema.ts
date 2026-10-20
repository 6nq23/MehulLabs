import { contactEmail, founder, founderDisplayName, site } from '@/data/site';

/** Entity nodes shared by every page shell, so Google sees one consistent business and author. */
const clean = (values: readonly string[]) => values.map(value => value.trim()).filter(value => /^https:\/\//.test(value));

export const organizationId = `${site.url}/#organization`;
export const websiteId = `${site.url}/#website`;
export const personId = `${site.url}/about#person`;

export function organizationNode() {
  const sameAs = clean(site.sameAs);
  return {
    '@type': 'Organization',
    '@id': organizationId,
    name: site.name,
    alternateName: site.alternateNames,
    url: `${site.url}/`,
    logo: { '@type': 'ImageObject', url: `${site.url}${site.logo}`, width: 1024, height: 1024 },
    image: `${site.url}/social-preview.png`,
    email: contactEmail || undefined,
    description: site.tagline,
    founder: { '@id': personId },
    areaServed: site.areaServed,
    knowsAbout: founder.knowsAbout,
    address: { '@type': 'PostalAddress', addressLocality: 'Bengaluru', addressCountry: 'IN' },
    contactPoint: { '@type': 'ContactPoint', contactType: 'sales', url: site.bookingUrl, availableLanguage: ['English'],areaServed: site.areaServed },
    ...(sameAs.length ? { sameAs } : {}),
  };
}

export function personNode() {
  const sameAs = clean(founder.sameAs);
  return {
    '@type': 'Person',
    '@id': personId,
    name: founderDisplayName,
    jobTitle: founder.jobTitle,
    url: `${site.url}/about`,
    worksFor: { '@id': organizationId },
    knowsAbout: founder.knowsAbout,
    ...(founder.image ? { image: `${site.url}${founder.image}` } : {}),
    ...(sameAs.length ? { sameAs } : {}),
  };
}

export function websiteNode() {
  return { '@type': 'WebSite', '@id': websiteId, name: site.name, alternateName: site.alternateNames, url: `${site.url}/`, publisher: { '@id': organizationId }, inLanguage: 'en' };
}
