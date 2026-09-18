import type { APIRoute } from 'astro';

import { site } from '@/data/site';

export const GET = (() => {
  const body = site.url && site.indexable
    ? `User-agent: *\nAllow: /\nSitemap: ${site.url}/sitemap.xml\n`
    : 'User-agent: *\nDisallow: /\n';

  return new Response(body, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
}) satisfies APIRoute;
