import type { APIRoute } from 'astro';

import { site } from '@/data/site';
import { pageSeo } from '@/data/seo';

const escapeXml = (value: string) =>
  value.replace(/[<>&'\"]/g, character => ({
    '<': '&lt;',
    '>': '&gt;',
    '&': '&amp;',
    "'": '&apos;',
    '"': '&quot;',
  })[character]!);

export const GET = (() => {
  const entries = site.url && site.indexable
    ? Object.keys(pageSeo).map(path => `<url><loc>${escapeXml(new URL(path, `${site.url}/`).href)}</loc></url>`).join('')
    : '';
  const body = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${entries}</urlset>\n`;

  return new Response(body, {
    headers: { 'Content-Type': 'application/xml; charset=utf-8' },
  });
}) satisfies APIRoute;
