# MLabs content and journey review — 16 September 2026

## Scope and facts
All routes, shared navigation, conversion paths and supplied MLabs business documents. Astro/React retained; clean git baseline. Primary service outcome: a qualified WhatsApp audit enquiry. Separate product outcome: an explicit Skill Manager interest message, not a sale or account registration. Traffic, conversion baseline and currency/timeframe of the owner's “1 M” ambition are unknown; no revenue promise is published.

Authority: business/business-model.md, offer-ladder.md, digital-products.md and the September 11 owner decision. Existing September 14 implementation has a $5,000 service pilot, preserved as existing offer; software pricing remains undecided. Scheduler README describes local scheduling and output review but public distribution rights and commercial readiness are unresolved. No build, restricted library or customer data will be distributed.

## Before editing
| ID | Priority | Observation | Consequence / principle | Fix and acceptance | Confidence |
|---|---|---|---|---|---|
| A | P1 | Hero, menus and all purchase paths describe services only | Product visitors cannot identify their next step; P11/P47/P48 | Two clear paths and dedicated product pages, linked in desktop/mobile/footer | High |
| B | P1 | Full-height looping video and rotating headline precede a long repeated services argument | Reading may be harder; hypothesis, P14/P27/P39 | Static, self-contained headline; concrete service choices, earlier evidence | High on observation; unmeasured conversion effect |
| C | P0 | Five-second popup offers /d2c-brand-pillars.pdf, absent from public | Broken download and interrupted reading, P49/P78 | Remove timed popup from runtime; preserve audit CTA | High |
| D | P1 | Repeated image placeholders; “ten times” outcome; absolute uninterrupted-operation claims | Unsupported expectations, P31/P37 | Original labelled SVG explanation; bounded delivery and ownership copy | High |
| E | P1 | Offers page says $5,000 while FAQ provides no price | Buyer cannot reconcile commitment, P38/P46 | Retain existing pilot, distinguish scope/usage/custom and enquiry from purchase | High |
| F | P2 | Generic process and dense jargon; tool copy says “exact profit” | Hard to judge actual deliverables and limits, P13/P14/P46 | Specific handover, requirements, plain definitions and estimate language | High |

## Structure
Home: clear promise and two paths → brand service choices → owned-brand experience → Skill Manager preview → delivery process → short FAQs → audit form.
Products: availability-led catalogue → Skill Manager → digital-product direction → existing free calculators.
Skill Manager: intended job → illustrative workflow → buyer fit and current status → separate interest message.
About: Mehul, operating experience, business model and how work is evaluated.
Service details: existing route retained → problem and scope → tangible handover → process/ownership → related services → audit.
Offers: service pilot/custom choices with product alternative and commitment explained.

## Coverage
Applied research/offer, messaging, visuals/mobile, proof, page roles, forms and implementation groups. No invented social proof, discounts, urgency, lifetime entitlements or launch dates. Physical commerce and checkout groups do not apply: no payment/fulfilment integration exists. No new analytics provider; retain local conversion events and distinguish product CTA location. Measure qualified service enquiries and product interest separately; clicks alone are not sales. The hypothesis is that clearer paths and bounded offers improve qualified interest; only post-launch data can establish this.

## Verification
Pending implementation and runtime checks. Live messages/payments will not be sent during verification.

## Completed verification

A–F implemented. Homepage repetition and placeholder media are removed from the active route; service details now state example use cases, client inputs, handover and measurement. Software remains pre-release with a separate product-interest draft. The existing pilot price is shared by the FAQ and enquiry prefill. The popup is no longer mounted. Additional defects caught and fixed during verification: service card media queries were overridden by later desktop rules; the longer footer wordmark overflowed; the mobile header lacked contrast over pale sections; a service-delivery lookup used a route slug instead of its pillar ID.

- Node 24.13.0: Astro check passed; 29 tests passed; final production build generated 15 pages.
- Lockfile validation: `npm ci --dry-run --ignore-scripts --no-audit --no-fund` passed after repairing the missing optional runtime entry. No application dependency was added.
- Browser: all 15 routes checked at 390px mobile and 1440px desktop. One H1 per page and no horizontal overflow after corrections. Screens inspected for home, product catalogue, Skill Manager, services and pricing. No browser console errors during the form journey.
- Mobile navigation opens and reaches Products. Campaign `solution=operations&offer=pilot` selects the right service and exposes the $5,000 USD draft. Empty brand validation focuses the field. AI/marketing selection hides irrelevant order volume. Submission generates the correct encoded WhatsApp draft and fallback/status; no message was sent. Product CTA independently carries Skill Manager interest.
- Built-output crawl: 834 internal links/asset references checked across 15 pages, including fragment destinations; zero missing targets. Sitemap contains all 15 routes. Canonicals, index directives and social preview are present in production; local preview stays noindex without an override.
- Desktop menu supports Escape. New diagrams are static and labelled illustrations. Existing reduced-motion support is retained; no live reduced-motion or JavaScript-disabled browser emulation was performed. A no-JavaScript navigation fallback and existing direct WhatsApp path are present in source.
- The initial runtime baseline was blocked by missing Astro dependencies and an inconsistent lockfile; before-state observations are source-based, not a claimed before/after browser experiment.

Remaining business dependencies: software distribution/release readiness, price/access model, support, fulfilment and third-party charges before accepting software payments. Digital products need an actual first SKU. Customer case studies and measured outcomes remain unavailable. Existing $5,000 service pricing was preserved from the current implementation; detailed engagement terms are confirmed in each written scope. Website delivery does not establish or guarantee the owner's 1 M sales ambition. Analytics events remain local; revenue measurement requires connecting qualified enquiries to deals and payments. No deployment or real lead submission was performed by this task.
