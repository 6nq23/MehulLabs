# Mehul Labs — D2C infrastructure & AI automation

A responsive, frontend-only Next.js landing page for four solutions: D2C infrastructure, COD voice calling, Meta creative analysis, and SEO/blog automation. Built with TypeScript, Tailwind CSS, GSAP, and Lenis.

## Run and verify

```sh
npm install
npm run dev
npm run lint
npm test
npm run build
npm start
```

The tests exercise the actual enquiry helpers locally. They do not open WhatsApp or send a message.

## Page and content

Hero → Brand film → Four solutions → Implementation → About → FAQs → Enquiry.

- Brand, contact destination, and navigation: `src/data/site.ts`
- Solutions, shared interest choices, process, and FAQs: `src/data/commerce.ts`
- Page composition: `src/app/page.tsx`
- Sections: `src/components/sections/`
- Colors and responsive styles: `src/app/globals.css` and `tailwind.config.ts`
- Brand film and poster: `public/story-video.mp4`, `public/story-poster.webp`
- Social preview: `src/app/opengraph-image.tsx`, generated statically at build time
- Research and implementation rationale: `docs/landing-page-plan.md`

The original palette and fonts are preserved. The third section leads with infrastructure and gives the three supporting solutions their own cards. No customer outcomes, testimonials, screenshots of fictional software, or partner claims are fabricated.

The 1,500+ daily orders figure describes the scale being built for. Replace it with a demonstrated-capacity statement only when the scope and supporting evidence are available. Reference image 31 was not available during implementation; the feature layout follows the approved written plan.

## Enquiry flow

A brand name or website is required. Solution interest defaults to “Help me choose.” Name and a short note are optional. An optional daily-order range is shown for infrastructure, COD calling, or an undecided visitor, and omitted from Meta/SEO drafts.

Each solution button preselects the matching form option. Campaign links can use `/?solution=cod-voice#cod-voice`; supported IDs are `infrastructure`, `cod-voice`, `meta-creatives`, and `seo-content`.

The frontend prepares a WhatsApp draft; the visitor must review and send it. It never reports successful delivery. A fallback link and copyable message remain available if the browser does not open WhatsApp. Drafts stay in React memory and are cleared on form changes; there is no database or browser storage. A direct WhatsApp link remains available without JavaScript.

## Measurement

`src/lib/analytics.ts` emits local `mehul:conversion` CustomEvents for CTA clicks, solution selection, form starts, and WhatsApp handoff attempts. Payloads contain event names, locations, and solution IDs only. No contact information or message content is included. No tracking service, network transmission, persistence, or cookies are installed.

A future analytics adapter can listen for these events. The current implementation does not collect or report historical conversion statistics. A WhatsApp handoff is not a confirmed message or qualified lead. Reconcile received conversations and sales outcomes separately, initially through your normal sales process.

## Launch configuration

Create `.env.local` from `.env.example` and set the public values:

```dotenv
NEXT_PUBLIC_CONTACT_EMAIL=your-real-business-address
NEXT_PUBLIC_SITE_URL=https://your-real-domain
```

Rebuild after changes. Configure the real WhatsApp destination in `src/data/site.ts`. These values are public; do not add secrets.

The site remains noindex with an empty sitemap until the canonical URL is configured. Pricing, supported integrations, capacity evidence, and service terms must reflect the actual offer. Copy currently describes discussing and agreeing the scope rather than inventing specific rates or support guarantees.

## Accessibility and media

Navigation uses a native modal dialog; Escape closes it and restores focus. FAQs use native disclosure controls. Forms have visible labels, keyboard-accessible choices, clear optional fields, and live status text. Reduced motion disables smooth scrolling and reveal motion. Core content and direct contact links remain available without JavaScript.

The brand film is opt-in and uses native controls. Its video file is not preloaded; the existing poster reserves the layout while visitors explore the page.

## Deployment

Use the existing Next.js deployment setup. This repository has no `.openai/hosting.json` or Cloudflare adapter. This implementation has not published the website or installed any external analytics or lead-delivery service.
