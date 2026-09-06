const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const ts = require('typescript');

// Exercise the actual TypeScript helpers without a browser, server, or network.
const cache = new Map();
function loadSource(relativePath) {
  if (cache.has(relativePath)) return cache.get(relativePath);
  const filename = path.join(__dirname, '..', relativePath);
  const source = ts.transpileModule(fs.readFileSync(filename, 'utf8'), {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020 },
  }).outputText;
  const exports = {};
  vm.runInNewContext(source, {
    exports,
    process: { env: {} },
    require: id => {
      if (!id.startsWith('@/data/')) throw new Error('Unexpected dependency: ' + id);
      return loadSource('src/' + id.slice(2) + '.ts');
    },
  }, { filename });
  cache.set(relativePath, exports);
  return exports;
}

const { buildEnquiry, getWhatsAppDraftUrl } = loadSource('src/lib/enquiry.ts');
const { solutions, isSolutionId } = loadSource('src/data/commerce.ts');

test('all four solution IDs resolve to the correct draft label', () => {
  assert.equal(solutions.length, 4);
  for (const solution of solutions) {
    assert.equal(isSolutionId(solution.id), true);
    assert.ok(buildEnquiry({ brand: 'Preview brand', interest: solution.id }).includes('Interested in: ' + solution.label));
  }
  assert.equal(isSolutionId('product-research'), false);
});

test('a brand and default interest are sufficient, without personal contact fields', () => {
  const draft = buildEnquiry({ brand: '  Preview brand  ', interest: 'not-sure' });
  assert.ok(draft.includes('Brand / website: Preview brand'));
  assert.ok(draft.includes('Interested in: Help me choose'));
  assert.doesNotMatch(draft, /Email:|Name:|Daily orders:/);
});

test('blank or whitespace-only brands are rejected', () => {
  for (const brand of ['', '   ', '\n\t']) {
    assert.throws(() => buildEnquiry({ brand, interest: 'infrastructure' }), /brand name or website/);
  }
});

test('valid order volumes are included only for relevant solutions', () => {
  for (const interest of ['infrastructure', 'cod-voice', 'not-sure']) {
    assert.ok(buildEnquiry({ brand: 'Preview', interest, volume: '1,500+' }).includes('Daily orders: 1,500+'));
  }
  for (const interest of ['meta-creatives', 'seo-content']) {
    assert.ok(!buildEnquiry({ brand: 'Preview', interest, volume: '1,500+' }).includes('Daily orders:'));
  }
  assert.ok(!buildEnquiry({ brand: 'Preview', interest: 'infrastructure', volume: 'unexpected' }).includes('Daily orders:'));
});

test('Unicode, ampersands, URLs, plus signs, and newlines survive URL encoding', () => {
  const draft = buildEnquiry({ brand: 'Preview & Co + परीक्षण', interest: 'seo-content', message: 'https://example.com/?a=1&b=2\nA second line.' });
  const url = new URL(getWhatsAppDraftUrl(draft));
  assert.equal(url.origin, 'https://wa.me');
  assert.equal(url.pathname, '/919426016918');
  assert.equal(url.searchParams.get('text'), draft);
  assert.equal([...url.searchParams].length, 1);
});

test('optional text is trimmed and bounded without requiring a long brief', () => {
  const draft = buildEnquiry({ brand: 'Preview', interest: 'cod-voice', name: ' A ', message: ' Hi ' });
  assert.ok(draft.endsWith('Name: A\n\nHi'));
  const longDraft = buildEnquiry({ brand: 'B'.repeat(300), interest: 'not-sure', name: 'N'.repeat(200), message: 'M'.repeat(1000) });
  assert.ok(!longDraft.includes('B'.repeat(201)));
  assert.ok(!longDraft.includes('N'.repeat(101)));
  assert.ok(!longDraft.includes('M'.repeat(601)));
});
