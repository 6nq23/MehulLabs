import type { MetadataRoute } from 'next';
import { site } from '@/data/site';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: site.url ? { userAgent: '*', allow: '/' } : { userAgent: '*', disallow: '/' },
    sitemap: site.url ? `${site.url}/sitemap.xml` : undefined,
  };
}
