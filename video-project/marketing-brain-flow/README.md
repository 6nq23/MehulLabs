# Homepage motion video source

This Remotion project contains three editable eight-second homepage animations:

- `QueenBrandBrain` — approved brand knowledge guiding the specialist bees. Source: `src/queen/`.
- `MarketingBrainFlow` — the Marketing Brain section. Source: `src/Composition.tsx`.
- `ShopifyGrowth` — the Store Conversion section. Source: `src/shopify/`.

The site serves the rendered MP4s and posters from `public/video/`. Keep the
source project alongside them so the motion can be revised later.

From this directory, reinstall the removed dependency cache and open the editor:

```powershell
npm ci
npm run dev
```

After making changes, render the composition into the site's public folder:

```powershell
npx remotion render src/index.ts MarketingBrainFlow ../../public/video/marketing-brain-flow.mp4
npx remotion render src/index.ts QueenBrandBrain ../../public/video/queen-brand-brain.mp4
npx remotion still src/index.ts QueenBrandBrain ../../public/video/queen-brand-brain-poster.png --frame=190
npx remotion render src/index.ts ShopifyGrowth ../../public/video/shopify-growth.mp4
npx remotion still src/index.ts ShopifyGrowth ../../public/video/shopify-growth-poster.png --frame=158
```

If Remotion cannot download its own Chrome build, add
`--browser-executable "C:\Program Files\Google\Chrome\Application\chrome.exe"`
to the render or still command. Both compositions are 960 × 820 at 30 fps for
240 frames. The Queen Bee network and Shopify product cards are illustrative;
no actual store results or customer products are shown.
