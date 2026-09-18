// Validate the emitted HTML, rather than only the source templates. Run after build.
const fs = require('node:fs');
const path = require('node:path');
const assert = require('node:assert/strict');
const root = path.resolve(__dirname, '../dist');
const decode = value => value.replaceAll('&amp;', '&').replaceAll('&quot;', '"').replaceAll('&#39;', "'");
const attrs = tag => Object.fromEntries([...tag.matchAll(/([\w:-]+)="([^"]*)"/g)].map(m => [m[1], decode(m[2])]));
const walk = dir => fs.readdirSync(dir, {withFileTypes:true}).flatMap(entry => entry.isDirectory() ? walk(path.join(dir, entry.name)) : [path.join(dir, entry.name)]);
const pages = new Map(walk(root).filter(file => file.endsWith('.html')).map(file => {
 const relative = path.relative(root, file).replaceAll(path.sep, '/');
 const route = relative === 'index.html' ? '/' : relative.endsWith('/index.html') ? '/' + relative.slice(0, -11) : '/' + relative;
 const html = fs.readFileSync(file, 'utf8');
 return [route, {html, ids:new Set([...html.matchAll(/\bid="([^"]+)"/g)].map(m => m[1]))}];
}));
const titles = new Set(), descriptions = new Set(), canonicals = new Set();
const sitemap = fs.readFileSync(path.join(root, 'sitemap.xml'), 'utf8');
const sitemapUrls = [...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map(m => decode(m[1]));
const preview = process.argv.includes('--preview');
let checkedLinks = 0;
for (const [route, {html}] of pages) {
 const tags = [...html.matchAll(/<meta\s[^>]+>/g)].map(m => attrs(m[0]));
 const meta = name => tags.filter(t => t.name === name || t.property === name);
 const title = html.match(/<title>(.*?)<\/title>/s)?.[1];
 assert.ok(title && !titles.has(title), `${route}: missing or duplicate title`); titles.add(title);
 assert.equal(meta('description').length, 1, `${route}: one description required`);
 const description = meta('description')[0].content;
 assert.ok(description.length >= 70 && !descriptions.has(description), `${route}: missing/duplicate/short description`); descriptions.add(description);
 assert.equal([...html.matchAll(/<h1\b/g)].length, 1, `${route}: expected one primary heading`);
 assert.ok(html.includes('<html lang="en"'), `${route}: language`);
 const is404 = route === '/404.html';
 assert.equal(meta('robots')[0]?.content, preview || is404 ? 'noindex, follow' : 'index, follow', `${route}: indexing policy`);
 const canonical = [...html.matchAll(/<link\s[^>]+>/g)].map(m => attrs(m[0])).filter(t => t.rel === 'canonical');
 if (!is404) {
  assert.equal(canonical.length, 1, `${route}: expected one canonical`);
  const url = new URL(canonical[0].href);
  assert.equal(url.protocol, 'https:'); assert.equal(url.search, ''); assert.equal(url.hash, '');
  assert.equal(url.pathname, route, `${route}: canonical path`);
  assert.ok(!canonicals.has(url.href)); canonicals.add(url.href);
  if (!preview) assert.ok(sitemapUrls.includes(url.href), `${route}: not in sitemap`);
  assert.equal(meta('og:url')[0]?.content, url.href);
  const scripts = [...html.matchAll(/<script[^>]*type="application\/ld\+json"[^>]*>(.*?)<\/script>/gs)];
  assert.equal(scripts.length, 1, `${route}: schema graph`);
  const graph = JSON.parse(scripts[0][1])['@graph'];
  assert.ok(graph.some(node => node['@type'] === 'Organization'));
  assert.ok(graph.some(node => node['@type'] === 'WebSite'));
  if (route !== '/') {
   const crumbs = graph.find(node => node['@type'] === 'BreadcrumbList');
   assert.ok(crumbs && crumbs.itemListElement.length >= 2, `${route}: breadcrumbs`);
   assert.ok(html.includes('aria-label="Breadcrumb"'));
   assert.equal(crumbs.itemListElement.at(-1).item, url.href);
  }
  if (route.startsWith('/guides/')) {
   const article = graph.find(node => node['@type'] === 'Article');
   assert.ok(article && article.headline && article.author && article.datePublished, `${route}: article schema`);
  }
  if (route.startsWith('/services/')) assert.ok(graph.some(node => node['@type'] === 'Service'));
  assert.equal(meta('og:title')[0].content, decode(title));
 }
 for (const match of html.matchAll(/<img\s[^>]+>/g)) {
  const img = attrs(match[0]); assert.ok('alt' in img && img.width && img.height, `${route}: image alt or dimensions missing`);
 }
 for (const match of html.matchAll(/<(?:a|img|script|link)\b[^>]*>/g)) {
  const tag = attrs(match[0]); const href = tag.href || tag.src;
  if (!href || !/^[\/#]/.test(href) || href.startsWith('//')) continue;
  const url = new URL(href, `https://audit.invalid${route}`);
  const target = url.pathname.replace(/\/$/, '') || '/';
  const dest = pages.get(target);
  assert.ok(dest || fs.existsSync(path.join(root, target)), `${route}: missing local target ${href}`);
  if (dest && url.hash) assert.ok(dest.ids.has(decodeURIComponent(url.hash.slice(1))), `${route}: missing anchor ${href}`);
  checkedLinks++;
 }
}
assert.equal(pages.size, 20, 'Review route inventory when adding/removing pages');
assert.equal(sitemapUrls.length, preview ? 0 : pages.size - 1, 'Sitemap must list exactly indexable pages');
assert.equal(new Set(sitemapUrls).size, sitemapUrls.length, 'Duplicate sitemap entries');
const robots = fs.readFileSync(path.join(root, 'robots.txt'), 'utf8');
assert.ok(preview ? robots.includes('Disallow: /') : robots.includes('Allow: /') && robots.includes('/sitemap.xml'));
console.log(`SEO checks passed: ${pages.size} pages, ${canonicals.size} unique canonical URLs, ${checkedLinks} internal links/assets, ${preview ? 'preview noindex' : 'production indexable'}.`);
