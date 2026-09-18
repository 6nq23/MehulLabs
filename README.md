## SEO update — 18 September 2026

All 19 public routes have page-specific metadata and canonical URLs. The site now includes three practical guides, calculator examples, service FAQs, structured breadcrumbs and a noindex 404. See [the SEO audit and keyword map](docs/seo-audit-2026-09-18.md) for research, verification and release steps.

**The currently deployed site still blocks indexing. Deploy this updated production build to apply the fix.** Production defaults to `https://www.mlabsgrowth.com`. Vercel preview/development builds are excluded from indexing; set `PUBLIC_SITE_INDEXABLE=false` for other staging environments. `PUBLIC_SITE_URL`, if set, must be an HTTPS origin. Optional `PUBLIC_GOOGLE_SITE_VERIFICATION` accepts the Search Console HTML verification token.

Run `npm run check`, `npm test`, `npm run build`, then `npm run test:seo`. To check preview output, run `VERCEL_ENV=preview npm run build` followed by `node scripts/check-seo.cjs --preview`, then rebuild production. Adding a page requires an entry in `src/data/seo.ts` (guides register from `src/data/guides.ts`) and an updated route count in the built-site audit. Maintain guide dates when content changes.

## September 18 booking update

All call/audit CTAs now use `site.bookingUrl`: https://calendly.com/kalathiyamehul13899/30min. The old audit form has been replaced by a direct booking card; WhatsApp remains a clearly labelled optional message channel. Call length is 30 minutes throughout. This supersedes the prior WhatsApp audit-flow notes below.

`ConversionEvents` carries the five standard UTM campaign parameters through internal links and into Calendly. No cookies or session storage are used. Direct Calendly clicks include the current path as `utm_content` unless the campaign already supplies one. This does **not** capture completed bookings, configure an ad pixel, preserve click IDs, or establish cross-domain conversion attribution. See [ad-readiness-2026-09-18.md](docs/ad-readiness-2026-09-18.md) for research and launch dependencies.

# September 16 content refresh

The current public positioning is **mlabs Growth: AI workflows, products and brand services**. The homepage provides separate service and product paths. New routes: `/products`, `/products/skill-manager`, `/about`. All three service detail pages include example scopes, handover, client requirements and measurement. The six calculator pages remain available.

Skill Manager is explicitly **in development**, with a WhatsApp product-interest draft rather than checkout. Price, licence/distribution readiness, supported setup, fulfilment and support must be settled before selling software. The existing $5,000 USD service pilot is retained; it is not a software price. No revenue guarantee or invented client result is published.

The timed popup is no longer mounted (its PDF target did not exist). Original SVG diagrams replace homepage placeholders and autoplay media. Service cards now stack correctly on mobile. Audit details: [content-refresh-2026-09-16.md](docs/content-refresh-2026-09-16.md).

Run with Node >=22.19 (Node 24 also works): `npm ci`, `npm run dev`. Checks: `npm run check`, `npm test`, `npm run build`. The lockfile was repaired so clean installs work. Production canonical URLs default to `https://www.mlabsgrowth.com`; use `PUBLIC_SITE_URL` to override. Local review stays noindex unless configured. The WhatsApp enquiry prepares a message for the visitor to review and send; it does not store leads or confirm delivery. Conversion events are local browser events, not a connected analytics backend.

Changes are local until deployed. The earlier implementation notes below describe prior iterations; this section and the dated audit take precedence where they differ.

---

# Mehul Labs — Astro landing page

A statically generated Astro sales page with selectively hydrated React islands. The existing website copy, section order, data model, Tailwind styling, GSAP motion, and Lenis scrolling are preserved from the Next.js App Router implementation.

## Requirements

- Node.js 22.19 or newer.
- npm 10 or newer.

## Install, run, and verify

```sh
npm install
npm run dev
npm run check
npm test
npm run build
npm run preview
```

`npm run dev` serves the source project. `npm run preview` serves the production build from `dist/` after `npm run build`.

The tests exercise the real enquiry helpers, offer data, price gating, approved risk position, and operating-evidence publication checks. They do not open WhatsApp or send a message.

One content guard currently reports the same pre-migration mismatch: the hero image is marked `placeholder: true`, while its visible caption is `Mehul Labs will handle everything.` The migration deliberately leaves both values unchanged.

## Project structure

```text
.
├── public/                       # Stable public URLs for images, video, favicon, and OG image
├── src/
│   ├── components/
│   │   ├── layout/               # Navbar, footer, progress, and the shared React runtime
│   │   ├── providers/            # React context and browser-wide event providers
│   │   ├── sections/             # Existing landing-page React sections
│   │   └── ui/                   # Reusable React and Astro UI primitives
│   ├── data/                     # Website copy and business configuration
│   ├── hooks/                    # React-only hooks
│   ├── layouts/
│   │   └── Layout.astro          # HTML shell, SEO metadata, global styles, and site chrome
│   ├── lib/                      # Analytics, enquiry, animation, and formatting helpers
│   ├── pages/
│   │   ├── index.astro           # Homepage composition and island boundaries
│   │   ├── robots.txt.ts         # Astro text endpoint
│   │   └── sitemap.xml.ts        # Astro XML endpoint
│   └── styles/
│       └── globals.css           # Existing global and Tailwind CSS
├── tests/
├── astro.config.mjs
├── postcss.config.mjs
├── tailwind.config.ts
└── tsconfig.json
```

This structure is intentionally small: routes compose pages, the layout owns document concerns, data files own content, and components own presentation or interaction. Add a new abstraction only when a second real use case requires it.

## Next.js-to-Astro mapping

| Previous Next.js file | Astro equivalent |
| --- | --- |
| `src/app/page.tsx` | `src/pages/index.astro` |
| `src/app/layout.tsx` | `src/layouts/Layout.astro` |
| `src/app/globals.css` | `src/styles/globals.css` |
| `src/app/icon.svg` | `public/favicon.svg` |
| `src/app/opengraph-image.tsx` | `public/opengraph-image.png` |
| `src/app/robots.ts` | `src/pages/robots.txt.ts` |
| `src/app/sitemap.ts` | `src/pages/sitemap.xml.ts` |

The reusable layout now emits normal HTML title, canonical, robots, Open Graph, Twitter, theme, and JSON-LD tags. It accepts optional `title` and `description` props for future routes.

All links were already standard `<a>` elements, so no link wrapper is needed. The two former `next/image` owners are now Astro components that use `<Image />` from `astro:assets`:

- `src/components/ui/SlotImage.astro`
- `src/components/ui/OperatingExperience.astro`

Their public paths, dimensions, alt text, captions, loading priority, and rendered placement are unchanged. Keeping these stable URLs in `public/` makes this a low-risk migration; move approved future images into `src/assets/` only when build-time optimization is wanted.

## React island policy

React components remain `.tsx` and are rendered by `@astrojs/react`. Hydration is applied only where browser behavior requires it:

| Root rendered by Astro | Directive | Reason |
| --- | --- | --- |
| `SiteRuntime` | `client:load` | Shared Lenis context, navigation dialog, conversion events, and scroll progress |
| `Hero` | `client:load` | Above-the-fold magnetic CTA |
| `Leaks`, `Mechanism`, `Approach` | `client:visible` | Reveal animation |
| `Services` | `client:visible` | Solution-selection event |
| `Assurance` | `client:visible` | Magnetic CTA |
| `About` | `client:visible` | Reveal animation and the opt-in story video |
| `Contact` | `client:load` | Registers the solution listener before an earlier CTA can dispatch it |
| `Proof`, `Faq`, `Footer` | none | Static output or native HTML interaction |

`SiteRuntime` is one React island because the navbar consumes the smooth-scroll provider's React context; separate islands cannot share that context.

## Styling and fonts

`Layout.astro` imports `src/styles/globals.css` once. Tailwind 3 remains connected through PostCSS, and its content scan includes `.astro` and React files. Inter and Manrope are installed locally through Fontsource, retaining the existing `--font-inter` and `--font-display` variables without a build-time network request.

Tailwind is intentionally not upgraded during the Astro migration. The current stylesheet uses Tailwind 3 directives and `theme()` calls; a Tailwind 4 upgrade should be a separate change with visual regression coverage.

## Page and content ownership

The homepage order remains:

Hero → the three leaks → why the usual fixes slip → what we run → who is behind it → how it works → what you are not risking → founder and optional brand film → FAQs → enquiry → footer.

- Brand, contact destination, navigation, and the primary CTA: `src/data/site.ts`
- Pillars, modules, prices, problem, failed fixes, mechanism, assurances, and fit: `src/data/offer.ts`
- Enquiry options, order ranges, process, and FAQs: `src/data/commerce.ts`
- Page image slots, alt text, and replacement requirements: `src/data/media.ts`
- Owned brands and approved evidence or media: `src/data/experience.ts`
- Page composition and hydration: `src/pages/index.astro`
- SEO and shared document markup: `src/layouts/Layout.astro`
- Sections: `src/components/sections/`
- Colors and responsive styles: `src/styles/globals.css` and `tailwind.config.ts`
- Evidence requirements: `docs/operating-evidence.md`
- Conversion rationale and test queue: `docs/conversion-audit.md`

The original palette, fonts, wording, IDs, form fields, analytics attributes, and section order are preserved. Infrastructure remains inside order operations, and the two owned brands remain identified as operating experience rather than independent customers. No outcomes, testimonials, fictional software screenshots, partner claims, or numerical order claims are added.

## Enquiry and measurement

The frontend prepares a WhatsApp draft for the visitor to review and send. It never reports successful delivery. A fallback link and copyable message remain available if the browser does not open WhatsApp. Drafts stay in React memory and are cleared on form changes; there is no database or browser storage.

`src/lib/analytics.ts` emits local `mehul:conversion` custom events for CTA clicks, pillar selection, form starts, and WhatsApp handoff attempts. Payloads contain event names, locations, and pillar IDs only. No tracking service, network transmission, persistence, or cookies are installed.

## Launch configuration

Copy `.env.example` to `.env.local` and set the public values:

```dotenv
PUBLIC_CONTACT_EMAIL=your-real-business-address
PUBLIC_SITE_URL=https://your-real-domain
```

Rebuild after changing environment values. Configure the real WhatsApp destination in `src/data/site.ts`. Every `PUBLIC_` value is shipped to the browser, so never put a secret there.

The site remains `noindex` and returns an empty sitemap until `PUBLIC_SITE_URL` is configured. Before launch, confirm that `site.replyWindow` and the audit offer remain promises the business can keep.

## Deployment

`npm run build` produces a static site in `dist/`. Deploy that directory to any static host. No server adapter, database, external analytics service, or lead-delivery service is required by the current implementation.

## Starting the same migration in a fresh directory

The current repository is already initialized. For a separate project, the equivalent starting commands are:

```sh
npm create astro@latest my-astro-site -- --template minimal --install
cd my-astro-site
npx astro add react
npm install @fontsource-variable/inter @fontsource-variable/manrope clsx gsap lenis tailwind-merge
npm install --save-dev @astrojs/check @types/node @types/react @types/react-dom autoprefixer postcss tailwindcss@3 typescript
```

Then bring over the `src/components`, `src/data`, `src/hooks`, `src/lib`, `public`, and stylesheet files; add the layout and route files shown above; copy this repository's PostCSS and Tailwind configurations; configure the `@/*` alias in `tsconfig.json`; and apply hydration at the route or layout boundary according to actual interactivity.
