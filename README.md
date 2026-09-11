# Mehul Labs — the operating layer behind D2C brands

A responsive, frontend-only Next.js sales page for three delivery systems and eight modules: store conversion (Shopify CRO, sell agent, smart cart), order operations (D2C infrastructure, AI calling agent, workflow automation), and growth (managed marketing, SEO automation) — plus an all-in-one custom engagement. Built with TypeScript, Tailwind CSS, GSAP, and Lenis.

## Run and verify

```sh
npm install
npm run dev
npm run lint
npm test
npm run build
npm start
```

The tests exercise the real enquiry helpers, the offer data (pillars, price gating, the approved risk position), and the operating-evidence publication checks locally. They do not open WhatsApp or send a message.

## Page and content

Hero → the three leaks → why the usual fixes slip (failed alternatives + mechanism) → what we run (pillars, modules, price) → who is behind it → how it works → what you are not risking (risk position + fit) → founder and optional brand film → FAQs → enquiry → footer.

- Brand, contact destination, navigation, and the single primary CTA: `src/data/site.ts`
- The offer — pillars, modules, prices, problem, failed fixes, mechanism, assurances, fit: `src/data/offer.ts`
- Enquiry options, order ranges, process, and FAQs: `src/data/commerce.ts`
- Page image slots, their alt text and what each replacement must show: `src/data/media.ts`
- Owned brands and approved evidence/media: `src/data/experience.ts`
- Page composition: `src/app/page.tsx`
- Sections: `src/components/sections/`
- Colors and responsive styles: `src/app/globals.css` and `tailwind.config.ts`
- Evidence requirements and follow-up checks: `docs/operating-evidence.md`
- Conversion rationale, section jobs, and the test queue: `docs/conversion-audit.md`

The original palette and fonts are preserved. Infrastructure sits inside order operations, with the two owned brands clearly identified as operating experience, not independent customers. No customer outcomes, testimonials, screenshots of fictional software, or partner claims are fabricated. The problem section asks the reader to check their own dashboard rather than quoting an industry statistic.

No numerical order claim is published. Add an approved figure only after the brand, reporting period, count definition, and supporting source have been verified.

## The offer

One primary action: a free 20-minute leak audit, delivered over WhatsApp or a call. Every CTA on the page asks for the same thing, and the three FUD reducers under each button come from `primaryCta.reducers`.

**Published risk position (owner-approved).** The audit is free and non-committal; scope is fixed and agreed in writing before work starts; everything is built inside the client's own accounts. `src/data/offer.ts` documents this, and `npm test` fails if a refund, guarantee, or results promise is added to `assurances` without an owner decision.

**Prices.** Each pillar carries `startingPrice: null`, so the page shows "Scoped after the audit — a fixed number, in writing, before anything is built." Setting a real `{ amount, currency, unit, basis }` publishes a "From ₹X / month" anchor instead. Incomplete price objects never render.

## Enquiry flow

A brand name or website is required. Interest defaults to "Help me choose". Name and a short note are optional. An optional daily-order range is shown for every pillar except growth, where catalogue size matters more than order count.

Each pillar button preselects the matching form option. Campaign links use `/?solution=<id>#<id>`; current IDs are `store-conversion`, `operations`, `growth`, and `all-in-one`. Retired IDs from the previous four-solution page still resolve: `infrastructure` and `cod-voice` map to `operations`, `meta-creatives` and `seo-content` map to `growth`.

The frontend prepares a WhatsApp draft; the visitor must review and send it. It never reports successful delivery. A fallback link and copyable message remain available if the browser does not open WhatsApp. Drafts stay in React memory and are cleared on form changes; there is no database or browser storage. A direct WhatsApp link remains available without JavaScript.

## Measurement

`src/lib/analytics.ts` emits local `mehul:conversion` CustomEvents for CTA clicks, pillar selection, form starts, and WhatsApp handoff attempts. Payloads contain event names, locations, and pillar IDs only. No contact information or message content is included. No tracking service, network transmission, persistence, or cookies are installed.

A future analytics adapter can listen for these events. A WhatsApp handoff is not a confirmed message or a qualified lead. Reconcile received conversations and sales outcomes separately, initially through your normal sales process.

## Launch configuration

Create `.env.local` from `.env.example` and set the public values:

```dotenv
NEXT_PUBLIC_CONTACT_EMAIL=your-real-business-address
NEXT_PUBLIC_SITE_URL=https://your-real-domain
```

Rebuild after changes. Configure the real WhatsApp destination in `src/data/site.ts`. These values are public; do not add secrets.

The site remains noindex with an empty sitemap until the canonical URL is configured. Before launch, confirm that `site.replyWindow` ("Usually within one working day") is a promise you will keep, and that the audit is something you can actually deliver at your lead volume — it is the whole front end of the offer.

## Accessibility and media

Navigation uses a native modal dialog; Escape closes it and restores focus. FAQs use native disclosure controls. Forms have visible labels, keyboard-accessible choices, clear optional fields, and live status text. Reduced motion disables smooth scrolling and reveal motion. Core content and direct contact links remain available without JavaScript.

The brand film is opt-in and uses native controls. Its video file is not preloaded; the existing poster reserves the layout while visitors explore the page.

## Deployment

Use the existing Next.js deployment setup. This repository has no `.openai/hosting.json` or Cloudflare adapter. This implementation has not published the website or installed any external analytics or lead-delivery service.
