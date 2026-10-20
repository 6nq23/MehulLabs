// Quality gate for one new blog post: `npm run check:post -- <slug>` (add --json for machine output).
// Fails on problems that hurt rankings or read as mass-produced AI content; warns on softer issues.
const fs = require('node:fs');
const path = require('node:path');

const root = path.resolve(__dirname, '..');
const blogDir = path.join(root, 'src/pages/blog');
const args = process.argv.slice(2);
const slug = args.find(arg => !arg.startsWith('--'));
const asJson = args.includes('--json');
if (!slug) { console.error('Usage: npm run check:post -- <slug>'); process.exit(2); }

const CATEGORIES = ['Shopify conversion', 'COD & order operations', 'AI marketing & automation', 'AI search & commerce', 'Ecommerce profit & finance', 'Inventory & planning'];
const BANNED = ["in today's", 'ever-evolving', 'fast-paced', 'digital landscape', 'it is important to note', "it's important to note", 'it is worth noting', 'delve', 'deep dive', 'dive into', 'game-changer', 'game changer', 'revolutionize', 'revolutionise', 'transformative', 'cutting-edge', 'state-of-the-art', 'harness the power', 'unlock the potential', 'unlock the power', 'seamless', 'seamlessly', 'tapestry', 'multifaceted', 'comprehensive guide', 'look no further', 'in conclusion', 'navigating the', 'elevate your', 'supercharge', 'the key insight is', "here's the thing", 'without further ado', 'treasure trove', 'paradigm shift'];
const SEO_LEAKS = [/keyword famil/i, /use these keywords/i, /\b(primary|secondary|long-tail) keywords?\b/i, /what (are|do) (people|merchants|shoppers) search(ing)? for/i, /search[- ]intent (evidence|signals?)/i, /not (a )?(claims? about )?search[- ]volume/i];
const OLD_SKELETON = ['> **Key takeaways**', '## In this guide', '## The bottom line'];

const errors = [], warnings = [], info = {};
const file = path.join(blogDir, `${slug}.md`);
if (!fs.existsSync(file)) { console.error(`No post at src/pages/blog/${slug}.md`); process.exit(2); }
const raw = fs.readFileSync(file, 'utf8').replace(/\r\n/g, '\n');
const fmMatch = raw.match(/^---\n([\s\S]*?)\n---\n/);
if (!fmMatch) { console.error('Missing frontmatter'); process.exit(2); }
const fm = fmMatch[1];
const body = raw.slice(fmMatch[0].length);
const field = key => fm.match(new RegExp(`^${key}:\\s*"?(.*?)"?\\s*$`, 'm'))?.[1];

// --- Frontmatter ---------------------------------------------------------------------------
if (!/^[a-z0-9]+(-[a-z0-9]+)*$/.test(slug)) errors.push('Slug must be lowercase words joined by hyphens.');
if (slug.split('-').length > 7) warnings.push('Slug is long; keep it to 3-6 meaningful words.');
if (field('layout') !== '../../layouts/BlogPostLayout.astro') errors.push('layout must be ../../layouts/BlogPostLayout.astro');
if (field('draft') === 'true') errors.push('draft: true posts are not published; set draft: false.');
else if (field('draft') !== 'false') warnings.push('Add draft: false to the frontmatter.');
const title = field('title') || '';
if (title.length < 30 || title.length > 62) errors.push(`title is ${title.length} characters; use 30-62 (it is also the H1).`);
const description = field('description') || '';
if (description.length < 120 || description.length > 160) errors.push(`description is ${description.length} characters; use 120-160.`);
for (const key of ['publishedOn', 'updatedOn']) {
  const value = field(key);
  if (!value || !/^\d{4}-\d{2}-\d{2}$/.test(value) || Number.isNaN(Date.parse(value))) errors.push(`${key} must be YYYY-MM-DD.`);
}
const category = field('category');
if (!CATEGORIES.includes(category)) errors.push(`category must be one of: ${CATEGORIES.join(' | ')}`);
if (/^wordCount:/m.test(fm)) errors.push('Remove wordCount; it is measured automatically at build time.');
const cover = field('coverImage');
if (!cover) errors.push('coverImage is required (SVG or WebP/PNG in public/Blogs/<slug>/).');
else if (!fs.existsSync(path.join(root, 'public', decodeURIComponent(cover.replace(/^\//, ''))))) errors.push(`coverImage not found: ${cover}`);
else if (!cover.startsWith(`/Blogs/${slug}/`)) errors.push(`coverImage must live in /Blogs/${slug}/`);
if (!field('coverImageAlt')) errors.push('coverImageAlt is required.');
if (!fs.existsSync(path.join(root, 'public/Blogs', slug, 'og-card.png'))) errors.push('Missing social card: run `npm run og:images`.');
const faqCount = (fm.match(/^\s+- question:/gm) || []).length;
if (faqCount > 5) warnings.push(`${faqCount} FAQs; keep 0-5 genuine questions.`);
// FAQ schema comes from the frontmatter, so every question must also be visible as an H3 in the body.
const faqQuestions = [...fm.matchAll(/^\s+- question:\s*"(.*)"\s*$/gm)].map(m => m[1].replace(/\\"/g, '"'));
const bodyH3 = new Set([...raw.slice(fmMatch[0].length).matchAll(/^###\s+(.+)$/gm)].map(m => m[1].trim()));
const hiddenFaqs = faqQuestions.filter(q => !bodyH3.has(q));
if (hiddenFaqs.length) errors.push(`FAQ schema questions not shown as H3s in the body (must match word for word): ${hiddenFaqs.join(' | ')}`);

// --- Structure -----------------------------------------------------------------------------
const lines = body.split('\n');
const headings = lines.map(line => line.match(/^(#{1,6})\s+(.+)/)).filter(Boolean).map(m => ({ level: m[1].length, text: m[2].trim() }));
if (headings.some(h => h.level === 1)) errors.push('Do not use an H1 (#) in the body; the layout renders the title as H1.');
headings.forEach((h, i) => { const prev = i ? headings[i - 1].level : 1; if (h.level > prev + 1) errors.push(`Heading level skips from H${prev} to H${h.level}: "${h.text}"`); });
const h2 = headings.filter(h => h.level === 2);
if (h2.length < 3) errors.push('Use at least three H2 sections.');
const questionShare = h2.length ? h2.filter(h => h.text.endsWith('?')).length / h2.length : 0;
info.questionH2Share = Math.round(questionShare * 100);
if (questionShare > 0.6) errors.push(`${info.questionH2Share}% of H2s are questions; mix in statements and noun phrases (max 60%).`);
const skeletonUsed = OLD_SKELETON.filter(marker => body.includes(marker));
if (skeletonUsed.length === OLD_SKELETON.length) errors.push('Post uses the full old skeleton (Key takeaways + In this guide + The bottom line). Vary the structure.');
for (const pattern of SEO_LEAKS) if (pattern.test(body)) errors.push(`SEO brief leaked into the article (matches ${pattern}). Keywords and search-intent notes never belong in published copy.`);

// Compare with the five most recent other posts: avoid the same opening/closing pattern every day.
const others = fs.readdirSync(blogDir).filter(name => name.endsWith('.md') && name !== `${slug}.md`).map(name => {
  const text = fs.readFileSync(path.join(blogDir, name), 'utf8').replace(/\r\n/g, '\n');
  return { slug: name.slice(0, -3), text, published: text.match(/^publishedOn:\s*"?([\d-]+)/m)?.[1] || '' };
}).sort((a, b) => b.published.localeCompare(a.published));
const recent = others.slice(0, 5);
for (const marker of OLD_SKELETON) {
  if (body.includes(marker) && recent.filter(post => post.text.includes(marker)).length >= 3) warnings.push(`"${marker}" also appears in 3+ of the last 5 posts; drop or rename it this time.`);
}
// The closing content section (sources and FAQ headings are standard and exempt).
const standard = /^(sources?|source notes|references|further reading|frequently asked questions|faqs?)$/i;
const closing = posts => posts.filter(text => !standard.test(text)).slice(-1)[0];
const lastH2 = closing(h2.map(h => h.text)) || '';
if (lastH2 && recent.some(post => closing((post.text.match(/^## (.+)$/gm) || []).map(line => line.slice(3).trim())) === lastH2)) warnings.push(`Closing section "${lastH2}" matches a recent post; vary the ending.`);

// --- Copy quality --------------------------------------------------------------------------
const prose = body
  .replace(/<(script|style|svg)[\s\S]*?<\/\1>/gi, ' ')
  .replace(/<[^>]+>/g, ' ')
  .replace(/!\[[^\]]*\]\([^)]*\)/g, ' ')
  .replace(/\[([^\]]*)\]\([^)]*\)/g, '$1')
  .replace(/^\|.*\|$/gm, ' ')
  .replace(/[#>*_`~]/g, ' ');
const words = prose.toLowerCase().match(/[\p{L}\p{N}][\p{L}\p{N}'’]*/gu) || [];
info.words = words.length;
if (words.length < 700) errors.push(`${words.length} words; a useful article needs at least 700.`);
if (words.length > 3200) warnings.push(`${words.length} words; check every section earns its place.`);
const lower = prose.toLowerCase();
const banned = BANNED.filter(phrase => lower.includes(phrase));
if (banned.length) errors.push(`AI-cliché phrases: ${banned.join(', ')}`);
const emDashes = (body.match(/—/g) || []).length;
if (emDashes > 4) warnings.push(`${emDashes} em dashes; use at most 4.`);
const hereOpeners = (prose.match(/(^|[.!?]\s+)Here(’|')?s?\b/g) || []).length;
if (hereOpeners > 2) warnings.push(`${hereOpeners} sentences start with "Here"; use at most 2.`);
const paragraphs = body.split(/\n{2,}/).map(p => p.trim()).filter(p => p && !/^(#|<|\||-|\d+\.|>|!\[)/.test(p));
const longParagraphs = paragraphs.filter(p => p.split(/\s+/).length > 150).length;
if (longParagraphs) errors.push(`${longParagraphs} paragraph(s) over 150 words.`);
const sentences = prose.split(/(?<=[.!?])\s+/).map(s => s.trim().split(/\s+/).length).filter(n => n > 2);
if (sentences.length > 10) {
  const mean = sentences.reduce((a, b) => a + b, 0) / sentences.length;
  const sd = Math.sqrt(sentences.reduce((a, b) => a + (b - mean) ** 2, 0) / sentences.length);
  info.burstiness = Number((sd / mean).toFixed(2));
  if (sd / mean < 0.35) warnings.push(`Sentence lengths are too uniform (burstiness ${info.burstiness}); mix short and long sentences.`);
}
const paragraphLengths = paragraphs.map(p => p.split(/\s+/).length);
if (paragraphLengths.length > 6) {
  const mean = paragraphLengths.reduce((a, b) => a + b, 0) / paragraphLengths.length;
  const sd = Math.sqrt(paragraphLengths.reduce((a, b) => a + (b - mean) ** 2, 0) / paragraphLengths.length);
  if (sd < 10) warnings.push('Paragraphs are all about the same length; vary them.');
}

// Near-duplicate check: shared 8-word sequences with any existing post.
const shingles = text => {
  const tokens = text.toLowerCase().replace(/<[^>]+>/g, ' ').replace(/\[([^\]]*)\]\([^)]*\)/g, '$1').match(/[\p{L}\p{N}']+/gu) || [];
  const set = new Set();
  for (let i = 0; i + 8 <= tokens.length; i++) set.add(tokens.slice(i, i + 8).join(' '));
  return set;
};
const mine = shingles(body);
let worst = { slug: '', shared: 0 };
for (const post of others) {
  const theirs = shingles(post.text.slice(post.text.indexOf('\n---', 4) + 4));
  let shared = 0;
  for (const s of mine) if (theirs.has(s)) shared++;
  if (shared > worst.shared) worst = { slug: post.slug, shared };
}
info.maxOverlap = worst;
if (worst.shared > 25) errors.push(`Shares ${worst.shared} identical 8-word sequences with ${worst.slug}; rewrite or merge instead of duplicating.`);
else if (worst.shared > 10) warnings.push(`Shares ${worst.shared} 8-word sequences with ${worst.slug}; check for copied boilerplate.`);
const generic = new Set(['guide', 'practical', 'ecommerce', 'shopify', '2026', 'brands', 'stores', 'store', 'checklist', 'what', 'your', 'with', 'from', 'that', 'before', 'complete', 'plan', 'teams']);
const titleWords = new Set((title.toLowerCase().match(/[a-z0-9]+/g) || []).filter(w => w.length > 3 && !generic.has(w)));
for (const post of others) {
  const other = (post.text.match(/^title:\s*"?(.*?)"?\s*$/m)?.[1] || '').toLowerCase().match(/[a-z0-9]+/g) || [];
  const overlap = new Set(other.filter(w => titleWords.has(w))).size;
  if (titleWords.size >= 2 && overlap / titleWords.size >= 0.7) warnings.push(`Title is very close to "${post.slug}"; make sure the search intent is different.`);
}

// --- Links and media -----------------------------------------------------------------------
const links = [...body.matchAll(/\]\(([^)\s]+)\)|href="([^"]+)"/g)].map(m => m[1] || m[2]);
const internal = [...new Set(links.filter(href => href.startsWith('/') && !href.startsWith('//')).map(href => href.split('#')[0]).filter(Boolean))];
const external = [...new Set(links.filter(href => /^https:\/\//.test(href) && !href.includes('mlabsgrowth.com')))];
info.internalLinks = internal.length; info.externalLinks = external.length;
if (internal.length < 3) errors.push(`${internal.length} internal links; add at least 3 contextual links to live pages.`);
if (!internal.some(href => href.startsWith('/services/'))) errors.push('Link to the one service page that matches the topic (/services/...).');
if (!internal.some(href => href.startsWith('/blog/'))) warnings.push('Link to at least one related blog post.');
if (external.length < 3) errors.push(`${external.length} external sources; cite at least 3 primary or authoritative sources.`);
if (links.some(href => /^http:\/\//.test(href))) errors.push('Use https links only.');
for (const href of internal.filter(href => href.startsWith('/blog/'))) {
  if (!fs.existsSync(path.join(blogDir, `${href.slice(6)}.md`))) errors.push(`Broken blog link: ${href}`);
}
const genericAnchors = [...body.matchAll(/\[(click here|here|read more|this guide|this post|learn more)\]\(/gi)].map(m => m[1]);
if (genericAnchors.length) errors.push(`Generic anchor text: ${genericAnchors.join(', ')}. Describe the destination.`);
const inbound = others.filter(post => post.text.includes(`/blog/${slug})`) || post.text.includes(`/blog/${slug}"`) || post.text.includes(`/blog/${slug}#`)).length;
info.inboundLinks = inbound;
if (!inbound) errors.push('No other post links here. Add one contextual link from the most related older post.');
for (const img of body.match(/<img\s[^>]*>/g) || []) {
  const src = img.match(/src="([^"]+)"/)?.[1];
  const alt = img.match(/alt="([^"]*)"/)?.[1];
  if (alt === undefined) errors.push(`Image needs an alt attribute: ${src}`);
  else if (alt && alt.length < 8) warnings.push(`Alt text is very short: ${src}`);
  if (!/width="\d+"/.test(img) || !/height="\d+"/.test(img)) errors.push(`Image needs width and height: ${src}`);
  if (src?.startsWith('/') && !fs.existsSync(path.join(root, 'public', decodeURIComponent(src.slice(1))))) errors.push(`Image file missing: ${src}`);
  if (src && /\s/.test(src)) errors.push(`No spaces in asset paths: ${src}`);
}
const described = (body.match(/<img\s[^>]*alt="[^"]{8,}"[^>]*>/g) || []).length;
if (described < 2) errors.push('Include at least two described images (hero plus one explanatory visual).');

const score = Math.max(0, 100 - errors.length * 10 - warnings.length * 3);
const result = { slug, score, errors, warnings, info };
if (asJson) console.log(JSON.stringify(result, null, 2));
else {
  console.log(`check:post ${slug}: score ${score}/100`);
  console.log(`  words ${info.words} · internal ${info.internalLinks} · external ${info.externalLinks} · inbound ${info.inboundLinks} · question H2s ${info.questionH2Share}% · burstiness ${info.burstiness ?? 'n/a'} · max overlap ${worst.shared} (${worst.slug || 'none'})`);
  for (const e of errors) console.log(`  ERROR  ${e}`);
  for (const w of warnings) console.log(`  warn   ${w}`);
}
process.exit(errors.length ? 1 : 0);
