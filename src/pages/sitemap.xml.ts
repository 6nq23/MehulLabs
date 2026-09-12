import type { APIRoute } from 'astro';

import { site } from '@/data/site';
import { serviceRoutes } from '@/data/services';
import { tools } from '@/data/tools';

const escapeXml = (value: string) =>
  value.replace(/[<>&'\"]/g, character => ({
    '<': '&lt;',
    '>': '&gt;',
    '&': '&amp;',
    "'": '&apos;',
    '"': '&quot;',
  })[character]!);

export const GET = (() => {
  const paths = [
    '/',
    '/offers',
    ...serviceRoutes.map(service => `/services/${service.slug}`),
    '/tools',
    ...tools.map(tool => `/tools/${tool.slug}`),
  ];
  const lastModified = new Date().toISOString();
  const entries = site.url
    ? paths.map((path, index) => {
        const url = path === '/' ? site.url : new URL(path, `${site.url}/`).toString();
        const priority = index === 0 ? '1' : path === '/offers' || path.startsWith('/services/') || path === '/tools' ? '0.9' : '0.8';
        return `<url><loc>${escapeXml(url)}</loc><lastmod>${lastModified}</lastmod><changefreq>monthly</changefreq><priority>${priority}</priority></url>`;
      }).join('')
    : '';
  const body = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${entries}</urlset>\n`;

  return new Response(body, {
    headers: { 'Content-Type': 'application/xml; charset=utf-8' },
  });
}) satisfies APIRoute;
