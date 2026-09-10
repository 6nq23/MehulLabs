# Operating evidence: publication checklist

## Implemented direction

The page is a sales page for a free 20-minute leak audit, leading to three delivery systems and an all-in-one engagement. It keeps the original visual identity, campaign selection, and WhatsApp draft flow. The optional brand film follows the founder introduction and is explicitly not a product demonstration. See `conversion-audit.md` for the offer rationale and the section-by-section jobs.

Sanskrutibydiorin and Diorin Demifine Jewellery are owned brands under one parent business, not independent clients. Their use of infrastructure does not establish results for the calling agent, workflow automation, Shopify CRO, the sell agent, the smart cart, marketing, or SEO/blog automation. Collect evidence for each of those separately.

## Owner-reported figures — not published

- Sanskrutibydiorin: 1,500 orders on peak days. Reporting dates and count definition still need records.
- Diorin Demifine Jewellery: a separate 200-order figure. Its period, basis, and count definition still need confirmation.

Do not combine these numbers, describe a peak as sustained daily throughput, or label an order received as processed or shipped. The enquiry form's `1,500+` choice asks about the visitor's business; it is not a claim about Mehul Labs.

`src/data/experience.ts` carries a commented template showing the five required fields. Fill `period` and `source` only from a real dated report; an incomplete object renders nothing, and `npm test` enforces that.

## What to provide

1. A dated order report with the brand, date filters, timezone, and count visible. Redact customer information without obscuring the evidence.
2. A precise count definition: received, managed, processed, or shipped. State whether the figure is one peak day or an average over a named period.
3. Two or three actual system screenshots, each with a caption explaining the work shown and descriptive alternative text.
4. A short real workflow recording with customer information hidden, a poster image, an accurate transcript, and captions for speech or meaningful audio.
5. A factual list of system tasks, tasks retained by the team, required tools/connections, and implementation responsibilities.
6. Owner approval of what may be public, including brand names, reports, media, and captions.

Volume records establish volume; workflow recordings explain system use. Neither alone establishes lower costs, fewer errors, higher revenue, or a universal capacity guarantee. Before/after claims require a measured baseline. Collect equivalent evidence separately for the three supporting solutions.

## How approved content is added

- Keep pending material out of public assets and `src/data/experience.ts`.
- After review, put only anonymized, approved files in `public/evidence/` and reference them from the matching brand's `approvedMedia` array. Do not create this folder until real assets exist.
- Image entries require a caption, alt text, and dimensions. Video entries require a poster, transcript, and caption-track path. Images use Next.js image optimization; recordings are user-controlled and do not preload.
- Add `approvedOrderEvidence` only after verification. Its required fields are count, basis, measure, period, and source. Source text should identify the report; do not link visitors to a private dashboard.
- Incomplete numerical evidence is not rendered. An empty media array renders no figures or placeholder cards. Automated checks validate completeness, not authenticity; human approval remains essential.
- Run `npm test` and `npm run build` after adding approved evidence. Review the actual captions, figures, source context, and media at mobile and desktop widths.

## Research boundaries

The approved design adapts [NN/g's clear-writing research](https://www.nngroup.com/articles/concise-scannable-and-objective-how-to-write-for-the-web/), [B2B buying-information research](https://www.nngroup.com/articles/b2b-trust-from-b2c/), and [Google's message-match guidance](https://support.google.com/google-ads/answer/6238826?hl=en). These inform the layout; they do not prove a conversion increase for this page. No artificial urgency, guarantees, customer testimonials, fabricated interfaces, or unsupported outcome percentages have been added.

## Follow-up validation — requires real participants and evidence

- Ask representative D2C owners, including relevant prospects who did not proceed: What is offered? Who uses it? What would it handle in your business? What remains unclear? What evidence would you need before an enquiry?
- Check understanding without requiring them to watch the film. Record their own words, not AI-generated customer insights.
- Treat this as qualitative feedback, not conversion-uplift evidence.
- Before a live experiment, define one hypothesis, randomization, qualified-enquiry criteria, and downstream customer outcomes. Keep unrelated ad changes out of the comparison. Clicks and WhatsApp handoffs are not confirmed leads or sales.

No buyer interviews, live conversion experiment, deployment, or analytics installation is included in this implementation.

## Implementation checks — 8 September 2026

- Production build passed, including lint and TypeScript checks.
- All 12 local tests passed: solution compatibility, enquiry validation/encoding, conditional order ranges, evidence completeness, missing-media omission, and accessible opt-in media markup.
- Browser review covered 320, 375, 768, 1024, and 1440px widths. No horizontal overflow or out-of-bounds content text was detected. The mobile opening shows the offer and primary enquiry button without playing media.
- All four solution actions preserve form selection. The COD campaign link selects COD calling and lands at its section. Mobile navigation opens with Enter, closes with Escape, and returns focus; the owned-brand FAQ opens with the keyboard. Empty enquiry submission focuses the required field.
- The film loads on request, plays, and stops at the end without looping. No browser warnings/errors were recorded in the tested session. No WhatsApp message was sent; draft generation was checked locally.
- Reduced-motion CSS, the motion-preference hook, the smooth-scroll guard, and reveal conditions were reviewed in source. Reduced-motion browser emulation was unavailable, so runtime verification with that preference remains a follow-up check.
- No duplicate IDs were detected; the film remains within the founder section. No count claim or product-media placeholder is currently published.

## Published claims added with the sales page — 10 September 2026

Three assurances are now published in `src/data/offer.ts`, owner-approved: the audit is free and
non-committal; scope is fixed and agreed in writing before work starts; everything is built inside
the client's own accounts and nothing switches off if the engagement ends. `npm test` fails if a
refund, money-back, guarantee or results promise is added to that array. Do not add one without a
written owner decision.

Two further published statements need confirmation before launch:

- `site.replyWindow` publishes "Usually within one working day". Confirm or change the string.
- Assurance 3 assumes every module is built in accounts the client owns and retains. If any module
  runs on Mehul Labs infrastructure the client would lose access to, rewrite the assurance first.

The problem section quotes no statistic. Each of the three leaks ends with an instruction for the
reader to measure their own dashboard. Keep it that way unless a verified figure with a named source
becomes available.

Prices are gated the same way as evidence. `startingPrice: null` publishes "Scoped after the audit".
A published anchor requires a real amount, currency, unit and basis, and must be a number the
business will honour.

## Image slots and measured numbers — 10 September 2026

`src/data/media.ts` defines three image slots: hero, proof and founder. All three currently point at
`public/img1.png`, the brand-film poster, as a stand-in. That file is a brand illustration —
not a photograph of anyone and not a screenshot of the system — so every slot's `alt` and `caption`
describe it as an illustration and say a real image replaces it. Do not caption it as a photo of
Mehul, as a product screen, or as a customer.

To replace a slot: add the real file to `public/`, update `src`, `width`, `height`, `alt` and
`caption`, and set `placeholder: false`. `npm test` fails if a slot claims to be final while still
pointing at the poster. Each slot's `intent` field states what the replacement has to show; the proof
slot is the one that carries the trust gate, so it wants a redacted screenshot of the live order
system with a dated filter visible.

`publishedMetrics` in `src/data/offer.ts` is the only place a measured figure may appear on the page.
It is empty. An entry needs a value, an exact count definition, a basis (whose number, over what
window) and a nameable source; incomplete entries render nothing, and the stat band disappears
entirely when the array is empty.

Everything numeric currently on the page is a structural count that needs no report — 2 brands,
3 leaks, 3 systems, 8 modules, 4 steps, 3 festive peaks, 14 days, 20 minutes, 1 fixed scope, 100%
built in your accounts. No percentage lift, no conversion figure, no RTO reduction and no revenue
claim appears anywhere, and none may be added without a measured baseline behind it.
