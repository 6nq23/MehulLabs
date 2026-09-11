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
const { solutions, isSolutionId, resolveSolutionId, needsOrderVolume, faqs } = loadSource('src/data/commerce.ts');
const {
  pillars, hasStartingPrice, formatStartingPrice, assurances, leaks, fitCriteria,
  credentials, operatingFacts, publishedMetrics, isPublishableMetric,
} = loadSource('src/data/offer.ts');
const { imageSlots, getImageSlot } = loadSource('src/data/media.ts');
const { ownedBrands, ownershipDisclosure, hasCompleteOrderEvidence } = loadSource('src/data/experience.ts');
const { OperatingExperience } = loadSource('src/components/ui/OperatingExperience.tsx');

test('the four offer pillars drive the enquiry options and their labels', () => {
  assert.equal(Array.from(solutions, item => item.id).join(','), 'store-conversion,operations,growth,all-in-one');
  assert.equal(solutions.length, pillars.length);
  for (const solution of solutions) {
    assert.equal(isSolutionId(solution.id), true);
    assert.ok(buildEnquiry({ brand: 'Local test brand', interest: solution.id }).includes('Biggest pain: ' + solution.label));
  }
  assert.equal(isSolutionId('unknown'), false);
  assert.equal(isSolutionId(null), false);
});

test('campaign links published before the repackaging still resolve to a pillar', () => {
  assert.equal(resolveSolutionId('infrastructure'), 'operations');
  assert.equal(resolveSolutionId('cod-voice'), 'operations');
  assert.equal(resolveSolutionId('meta-creatives'), 'growth');
  assert.equal(resolveSolutionId('seo-content'), 'growth');
  assert.equal(resolveSolutionId('operations'), 'operations');
  assert.equal(resolveSolutionId('unknown'), null);
  assert.equal(resolveSolutionId(null), null);
});

test('every pillar states an outcome, a fit signal and its own modules', () => {
  const moduleIds = new Set();
  for (const pillar of pillars) {
    for (const field of [pillar.outcome, pillar.fit, pillar.headline, pillar.action, pillar.shortcut]) {
      assert.ok(typeof field === 'string' && field.trim().length > 0, 'Empty field on pillar ' + pillar.id);
    }
    assert.ok(pillar.modules.length > 0);
    for (const item of pillar.modules) {
      assert.equal(moduleIds.has(item.id), false, 'Duplicate module id: ' + item.id);
      moduleIds.add(item.id);
      assert.ok(item.name.trim() && item.body.trim());
    }
  }
  // Three delivery systems plus the all-in-one framing.
  assert.equal(moduleIds.size, 11);
});

test('a price is published only when the number, unit and basis are all real', () => {
  for (const pillar of pillars) {
    if (!hasStartingPrice(pillar.startingPrice)) continue;
    assert.ok(formatStartingPrice(pillar.startingPrice).startsWith('From '));
  }
  assert.equal(hasStartingPrice(null), false);
  const sample = { amount: 45000, currency: 'INR', unit: 'month', basis: 'catalogues under 500 SKUs' };
  assert.equal(hasStartingPrice(sample), true);
  assert.match(formatStartingPrice(sample), /45,000 \/ month$/);
  for (const override of [{ amount: 0 }, { amount: -1 }, { amount: NaN }, { unit: ' ' }, { basis: '' }]) {
    assert.equal(hasStartingPrice({ ...sample, ...override }), false);
  }
});

test('the published risk position promises only what the owner approved', () => {
  assert.equal(assurances.length, 3);
  const text = JSON.stringify(assurances).toLowerCase();
  for (const phrase of ['money back', 'refund', 'guarantee', 'roi', 'x%', 'double your']) {
    assert.ok(!text.includes(phrase), 'Unapproved promise in assurances: ' + phrase);
  }
  assert.ok(text.includes('fixed scope'));
  assert.ok(text.includes('your accounts'));
});

test('the problem section asks the reader to check their own numbers, and invents none', () => {
  assert.equal(leaks.length, 3);
  for (const leak of leaks) {
    assert.ok(leak.check.startsWith('Check it yourself:'));
    assert.doesNotMatch(leak.body + leak.check, /\d+\s?%|\d+x\b/i, 'Unsourced statistic in leak ' + leak.number);
  }
  assert.ok(fitCriteria.yes.length > 0 && fitCriteria.no.length > 0);
});

test('every image slot points at a real asset and describes what is actually shown', () => {
  assert.equal(imageSlots.length, 3);
  for (const slot of imageSlots) {
    assert.match(slot.src, /^\/(?!\/)/);
    assert.ok(!slot.src.includes('..'));
    assert.ok(fs.existsSync(path.join(__dirname, '..', 'public', slot.src.slice(1))), 'Missing image: ' + slot.src);
    assert.ok(slot.alt.trim().length > 20, 'Alt text too thin on slot: ' + slot.id);
    assert.ok(slot.caption.trim() && slot.intent.trim());
    assert.ok(slot.width > 0 && slot.height > 0);
    // A slot may only claim to be final once it has stopped borrowing the brand-film poster.
    if (!slot.placeholder) assert.notEqual(slot.src, '/img1.png', 'Slot ' + slot.id + ' is not really final');
    else assert.match(slot.caption, /replaces this|placeholder/i, 'Placeholder caption must say so: ' + slot.id);
  }
  assert.equal(getImageSlot('hero').id, 'hero');
  assert.throws(() => getImageSlot('nope'), /Unknown image slot/);
});

test('above-the-fold credentials stay short and claim nothing that needs a report', () => {
  assert.equal(credentials.length, 4);
  for (const item of credentials) {
    assert.ok(item.label.trim() && item.body.trim());
    assert.ok(item.body.length <= 60, 'Credential body runs past one line: ' + item.body);
  }
  // Structural counts are fine here; a measured result is not.
  assert.doesNotMatch(JSON.stringify(credentials), /\b\d+\s?%\s?(more|less|faster|higher|lower)|\bROI\b/i);
});

test('operating facts are counts that need no report, and metrics are gated until one exists', () => {
  assert.equal(operatingFacts.length, 3);
  for (const fact of operatingFacts) {
    assert.match(fact.value, /^\d+$/, 'Operating facts must be plain counts: ' + fact.value);
    assert.ok(fact.label.trim() && fact.detail.trim());
  }
  for (const metric of publishedMetrics) {
    assert.equal(isPublishableMetric(metric), true, 'Incomplete published metric: ' + metric.id);
  }
  const sample = { id: 'x', value: '1,500', label: 'orders on a peak day', basis: 'Brand · period', source: 'Export' };
  assert.equal(isPublishableMetric(sample), true);
  for (const override of [{ value: '' }, { label: ' ' }, { basis: '' }, { source: '  ' }]) {
    assert.equal(isPublishableMetric({ ...sample, ...override }), false);
  }
});

test('minimal enquiry needs no personal contact details', () => {
  const draft = buildEnquiry({ brand: '  Local test brand  ', interest: 'not-sure' });
  assert.match(draft, /Brand \/ website: Local test brand/);
  assert.match(draft, /Biggest pain: Help me choose/);
  assert.doesNotMatch(draft, /Email:|Name:|Daily orders:/);
});

test('empty and whitespace-only brands are rejected', () => {
  for (const brand of ['', '  ', '\n\t']) {
    assert.throws(() => buildEnquiry({ brand, interest: 'operations' }), /brand name or website/);
  }
});

test('order volume is included only when valid and relevant', () => {
  for (const interest of ['operations', 'store-conversion', 'all-in-one', 'not-sure']) {
    assert.equal(needsOrderVolume(interest), true);
    assert.match(buildEnquiry({ brand: 'Local test', interest, volume: '1,500+' }), /Daily orders: 1,500\+/);
  }
  assert.equal(needsOrderVolume('growth'), false);
  assert.doesNotMatch(buildEnquiry({ brand: 'Local test', interest: 'growth', volume: '1,500+' }), /Daily orders:/);
  assert.doesNotMatch(buildEnquiry({ brand: 'Local test', interest: 'operations', volume: 'unexpected' }), /Daily orders:/);
});

test('WhatsApp draft encoding preserves special characters without sending anything', () => {
  const draft = buildEnquiry({ brand: 'A & B + परीक्षण', interest: 'growth', message: 'https://example.com/?a=1&b=2\nSecond line' });
  const url = new URL(getWhatsAppDraftUrl(draft));
  assert.equal(url.origin, 'https://wa.me');
  assert.equal(url.pathname, '/919426016918');
  assert.equal(url.searchParams.get('text'), draft);
  assert.equal([...url.searchParams].length, 1);
});

test('optional enquiry fields are trimmed and bounded', () => {
  assert.ok(buildEnquiry({ brand: 'Test', interest: 'operations', name: ' A ', message: ' Hi ' }).endsWith('Name: A\n\nHi'));
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

test('FAQ keeps the ownership disclosure and publishes no unverified volume claim', () => {
  assert.doesNotMatch(JSON.stringify(faqs), /1,500|1500|200 orders|scale we are building for/);
  assert.ok(faqs.some(faq => faq.answer.includes('not independent clients')));
});

test('FAQ answers the objection families a sales page has to clear', () => {
  const questions = faqs.map(faq => faq.question.toLowerCase()).join(' | ');
  for (const topic of ['cost', 'trust', 'stop working together', 'data', 'too small']) {
    assert.ok(questions.includes(topic), 'No FAQ covers: ' + topic);
  }
});
