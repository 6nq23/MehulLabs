import type { APIRoute } from 'astro';

import { site } from '@/data/site';

const escapeXml = (value: string) =>
  value.replace(/[<>&'\"]/g, character => ({
    '<': '&lt;',
    '>': '&gt;',
    '&': '&amp;',
    "'": '&apos;',
    '"': '&quot;',
  })[character]!);

export const GET = (() => {
  const entry = site.url
    ? `<url><loc>${escapeXml(site.url)}</loc><lastmod>${new Date().toISOString()}</lastmod><changefreq>monthly</changefreq><priority>1</priority></url>`
    : '';
  const body = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${entry}</urlset>\n`;

  return new Response(body, {
    headers: { 'Content-Type': 'application/xml; charset=utf-8' },
  });
}) satisfies APIRoute;
