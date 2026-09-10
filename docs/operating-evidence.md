# Operating evidence: publication checklist

## Implemented direction

The page leads with D2C order infrastructure used in the founder's own businesses. It keeps the original visual identity, solution anchors, campaign selection, and WhatsApp draft flow. The optional brand film follows the founder introduction and is explicitly not a product demonstration.

Sanskrutibydiorin and Diorin Demifine Jewellery are owned brands under one parent business, not independent clients. Their use of infrastructure does not establish results for COD calling, Meta creative analysis, or SEO/blog automation.

## Owner-reported figures — not published

- Sanskrutibydiorin: 1,500 orders on peak days. Reporting dates and count definition still need records.
- Diorin Demifine Jewellery: a separate 200-order figure. Its period, basis, and count definition still need confirmation.

Do not combine these numbers, describe a peak as sustained daily throughput, or label an order received as processed or shipped. The enquiry form's `1,500+` choice asks about the visitor's business; it is not a claim about Mehul Labs.

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
