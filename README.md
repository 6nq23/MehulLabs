# Mehul Labs — D2C growth & technology studio

A typography-led landing page for D2C brands across their own storefronts and marketplaces. Built with the existing Next.js App Router, TypeScript, Tailwind, GSAP, and Lenis stack.

## Run

```sh
npm install
npm run dev
npm run build
npm start
```

## Page and content

The current route is composed of Hero, VideoStory, Services, Approach, Community, Faq, and Contact. The hero intentionally contains no image. The ten-second `public/story-video.mp4` is preserved; `public/story-poster.webp` is its responsive poster. Video playback is opt-in, with native controls and a text description. The animated marketplace scenes illustrate a broader D2C service offering, not an Amazon-only business.

- Brand and public configuration: `src/data/site.ts`
- Service, process, and FAQ copy: `src/data/commerce.ts`
- Page composition: `src/app/page.tsx`
- Design tokens and component styles: `src/app/globals.css` and `tailwind.config.ts`
- Brand film: `public/story-video.mp4`
- Film poster: `public/story-poster.webp`
- Social preview: `public/og.png`

The old demo portfolio, products, testimonials, preloader, portrait, and frame-sequence implementation remain in the repository for reference but are not imported into the active page. Their illustrative results and quotes are not displayed, and the frame sequence is not downloaded. No client outcomes, ratings, customer logos, or partner status have been invented for the redesign.

## Contact and launch configuration

Copy `.env.example` to `.env.local` and set:

```dotenv
NEXT_PUBLIC_CONTACT_EMAIL=your-real-business-address
NEXT_PUBLIC_SITE_URL=https://your-real-domain
```

Both settings are public and embedded at build time. Use a valid email and an absolute HTTP(S) origin, then rebuild. Do not put secrets in these variables.

The contact form does **not** submit to a backend. It validates fields and prepares a downloadable/copyable text enquiry. When a valid business email is configured, it also offers a `mailto:` draft for the visitor to review and send through their own email app. It never reports successful delivery. Connecting an actual form delivery provider is a separate integration.

The page is noindex, with an empty sitemap, until a canonical URL is configured. The configured URL drives canonical metadata, social-image URLs, robots, and sitemap. No dummy contact addresses or generic social-profile links appear in the page.

## Accessibility and motion

The navigation uses a native modal dialog for focus containment, Escape-to-close, and a visible close button. FAQs use native disclosure controls. Form controls are labeled and keyboard accessible. Reduced-motion preferences disable smooth scrolling and reveal motion; core copy remains readable without JavaScript. No preloader blocks the first view.

## Deployment

The existing Next.js build and package scripts are preserved. This repository does not currently include `.openai/hosting.json` or an OpenNext/Cloudflare deployment adapter. Deploy using the established Next.js hosting setup, or add and validate a compatible adapter before using Sites hosting. Do not substitute an unvalidated static or Worker build for the application.
