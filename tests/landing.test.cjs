const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const ts = require('typescript');
const React = require('react');
const { renderToStaticMarkup } = require('react-dom/server');

// Test the actual source without a server, external requests, or sending an enquiry.
const cache = new Map();
function loadSource(relativePath) {
  if (cache.has(relativePath)) return cache.get(relativePath);
  const filename = path.join(__dirname, '..', relativePath);
  const source = ts.transpileModule(fs.readFileSync(filename, 'utf8'), {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020, jsx: ts.JsxEmit.ReactJSX },
  }).outputText;
  const exports = {};
  vm.runInNewContext(source, {
    exports,
    process: { env: {} },
    require: id => id.startsWith('@/') ? loadSource('src/' + id.slice(2) + '.ts') : require(id),
  }, { filename });
  cache.set(relativePath, exports);
  return exports;
}

const { buildEnquiry, getWhatsAppDraftUrl } = loadSource('src/lib/enquiry.ts');
const { solutions, isSolutionId, faqs } = loadSource('src/data/commerce.ts');
const { ownedBrands, ownershipDisclosure, hasCompleteOrderEvidence } = loadSource('src/data/experience.ts');
const { OperatingExperience } = loadSource('src/components/ui/OperatingExperience.tsx');

test('all four existing solution IDs and enquiry labels remain compatible', () => {
  assert.equal(Array.from(solutions, item => item.id).join(','), 'infrastructure,cod-voice,meta-creatives,seo-content');
  for (const solution of solutions) {
    assert.equal(isSolutionId(solution.id), true);
    assert.ok(buildEnquiry({ brand: 'Local test brand', interest: solution.id }).includes('Interested in: ' + solution.label));
  }
  assert.equal(isSolutionId('unknown'), false);
  assert.equal(isSolutionId(null), false);
});

test('minimal enquiry needs no personal contact details', () => {
  const draft = buildEnquiry({ brand: '  Local test brand  ', interest: 'not-sure' });
  assert.match(draft, /Brand \/ website: Local test brand/);
  assert.match(draft, /Interested in: Help me choose/);
  assert.doesNotMatch(draft, /Email:|Name:|Daily orders:/);
});

test('empty and whitespace-only brands are rejected', () => {
  for (const brand of ['', '  ', '\n\t']) {
    assert.throws(() => buildEnquiry({ brand, interest: 'infrastructure' }), /brand name or website/);
  }
});

test('order volume is included only when valid and relevant', () => {
  for (const interest of ['infrastructure', 'cod-voice', 'not-sure']) {
    assert.match(buildEnquiry({ brand: 'Local test', interest, volume: '1,500+' }), /Daily orders: 1,500\+/);
  }
  for (const interest of ['meta-creatives', 'seo-content']) {
    assert.doesNotMatch(buildEnquiry({ brand: 'Local test', interest, volume: '1,500+' }), /Daily orders:/);
  }
  assert.doesNotMatch(buildEnquiry({ brand: 'Local test', interest: 'infrastructure', volume: 'unexpected' }), /Daily orders:/);
});

test('WhatsApp draft encoding preserves special characters without sending anything', () => {
  const draft = buildEnquiry({ brand: 'A & B + परीक्षण', interest: 'seo-content', message: 'https://example.com/?a=1&b=2\nSecond line' });
  const url = new URL(getWhatsAppDraftUrl(draft));
  assert.equal(url.origin, 'https://wa.me');
  assert.equal(url.pathname, '/919426016918');
  assert.equal(url.searchParams.get('text'), draft);
  assert.equal([...url.searchParams].length, 1);
});

test('optional enquiry fields are trimmed and bounded', () => {
  assert.ok(buildEnquiry({ brand: 'Test', interest: 'cod-voice', name: ' A ', message: ' Hi ' }).endsWith('Name: A\n\nHi'));
  const draft = buildEnquiry({ brand: 'B'.repeat(300), interest: 'not-sure', name: 'N'.repeat(200), message: 'M'.repeat(1000) });
  for (const [letter, limit] of [['B', 200], ['N', 100], ['M', 600]]) assert.ok(!draft.includes(letter.repeat(limit + 1)));
});

test('owned-brand relationships and pending-evidence omissions are explicit', () => {
  assert.equal(ownedBrands.length, 2);
  assert.equal(ownedBrands[0].name, 'Sanskrutibydiorin');
  assert.equal(ownedBrands[1].name, 'Diorin Demifine Jewellery');
  assert.ok(ownedBrands.every(brand => brand.relationship === 'owned'));
  assert.match(ownershipDisclosure, /own brands under one parent/);
  const previous = ownedBrands.map(brand => ({ media: brand.approvedMedia, evidence: brand.approvedOrderEvidence }));
  try {
    for (const brand of ownedBrands) {
      brand.approvedMedia = [];
      brand.approvedOrderEvidence = undefined;
    }
    const html = renderToStaticMarkup(React.createElement(OperatingExperience));
    assert.match(html, /not independent clients/);
    assert.doesNotMatch(html, /1,500|1500|200 orders|coming soon|<img|<video|<figure/);
  } finally {
    ownedBrands.forEach((brand, i) => {
      brand.approvedMedia = previous[i].media;
      brand.approvedOrderEvidence = previous[i].evidence;
    });
  }
});

test('numbers cannot render as evidence without count, basis, period and source', () => {
  const sample = { count: 42, basis: 'peak day', measure: 'orders managed', period: 'Test fixture period', source: 'Test fixture report' };
  assert.equal(hasCompleteOrderEvidence(sample), true);
  assert.equal(hasCompleteOrderEvidence(), false);
  for (const override of [{ count: 0 }, { count: -1 }, { count: 2.5 }, { basis: 'capacity' }, { period: '' }, { measure: ' ' }, { source: undefined }]) {
    assert.equal(hasCompleteOrderEvidence({ ...sample, ...override }), false);
  }
});

test('complete approved evidence shows its basis, period and source', () => {
  const brand = ownedBrands[0];
  const previous = brand.approvedOrderEvidence;
  try {
    brand.approvedOrderEvidence = { count: 42, basis: 'peak day', measure: 'orders managed', period: 'Test fixture period', source: 'Test fixture report' };
    const html = renderToStaticMarkup(React.createElement(OperatingExperience));
    for (const phrase of ['42', 'peak day', 'orders managed', 'Test fixture period', 'Test fixture report']) assert.ok(html.includes(phrase));
    brand.approvedOrderEvidence = { ...brand.approvedOrderEvidence, source: '' };
    assert.doesNotMatch(renderToStaticMarkup(React.createElement(OperatingExperience)), /class="order-evidence"/);
  } finally {
    brand.approvedOrderEvidence = previous;
  }
});

test('approved media must refer to real local assets with accessible descriptions', () => {
  for (const brand of ownedBrands) {
    for (const media of brand.approvedMedia) {
      const sources = media.kind === 'video' ? [media.src, media.poster, media.captionsSrc] : [media.src];
      for (const src of sources) {
        assert.match(src, /^\/(?!\/)/);
        assert.ok(!src.includes('..'));
        assert.ok(fs.existsSync(path.join(__dirname, '..', 'public', src.slice(1))), 'Missing evidence asset: ' + src);
      }
      assert.ok(media.caption.trim());
      if (media.kind === 'image') assert.ok(media.alt.trim() && media.width > 0 && media.height > 0);
      else assert.ok(media.transcript.trim());
    }
  }
});

test('approved media renders captions, lazy images, and opt-in video controls', () => {
  const brand = ownedBrands[0];
  const previous = brand.approvedMedia;
  try {
    // In-memory render fixtures only: these are never published or requested.
    brand.approvedMedia = [
      { id: 'test-image', kind: 'image', src: '/test-screen.webp', width: 1200, height: 800, alt: 'Test screen description', caption: 'Test screenshot caption' },
      { id: 'test-video', kind: 'video', src: '/test-workflow.mp4', poster: '/test-poster.webp', captionsSrc: '/test-captions.vtt', transcript: 'Test workflow transcript', caption: 'Test workflow caption' },
    ];
    const html = renderToStaticMarkup(React.createElement(OperatingExperience));
    assert.match(html, /loading="lazy"/);
    assert.match(html, /alt="Test screen description"/);
    assert.match(html, /<figcaption>Test screenshot caption<\/figcaption>/);
    assert.match(html, /controls=""/);
    assert.match(html, /preload="none"/);
    assert.match(html, /kind="captions"/);
    assert.match(html, /Test workflow transcript/);
    assert.doesNotMatch(html, /autoPlay|autoplay|loop=/);
  } finally {
    brand.approvedMedia = previous;
  }
});

test('FAQ no longer presents the reported operating volume as a future target', () => {
  assert.doesNotMatch(JSON.stringify(faqs), /1,500|1500|200 orders|scale we are building for/);
  assert.ok(faqs.some(faq => faq.answer.includes('not independent clients')));
});
