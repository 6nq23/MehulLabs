import type { APIRoute } from 'astro';

import { site } from '@/data/site';
import { pageSeo } from '@/data/seo';

interface BlogModule {
  url: string;
  frontmatter: { publishedOn: string; updatedOn?: string };
}

// Astro discovers Markdown routes at build time, including newly added articles.
const posts = import.meta.glob<BlogModule>('./blog/**/*.md', { eager: true });

const escapeXml = (value: string) =>
  value.replace(/[<>&'\"]/g, character => ({
    '<': '&lt;',
    '>': '&gt;',
    '&': '&amp;',
    "'": '&apos;',
    '"': '&quot;',
  })[character]!);

export const GET = (() => {
  const routes = new Map<string, string | undefined>(Object.keys(pageSeo).map(path => [path, undefined]));
  for (const { url, frontmatter } of Object.values(posts)) {
    const date = frontmatter.updatedOn || frontmatter.publishedOn;
    if (!/^\d{4}-\d{2}-\d{2}$/.test(date) || !Number.isFinite(Date.parse(date)) || new Date(date).toISOString().slice(0, 10) !== date) {
      throw new Error(`Invalid blog sitemap date for ${url}: expected YYYY-MM-DD`);
    }
    routes.set(url, date);
  }
  const entries = site.url && site.indexable
    ? [...routes].map(([path, lastmod]) => `<url><loc>${escapeXml(new URL(path, `${site.url}/`).href)}</loc>${lastmod ? `<lastmod>${lastmod}</lastmod>` : ''}</url>`).join('')
    : '';
  const body = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${entries}</urlset>\n`;

  return new Response(body, {
    headers: { 'Content-Type': 'application/xml; charset=utf-8' },
  });
}) satisfies APIRoute;
