# Bee animation

`src/components/bees/BeeOrbit.astro` is the shared queen-and-specialists scene.
Artwork, accessible names, and the three orbit tracks live in `src/data/bees.ts`.
Use the component rather than copying animation markup into a page.

```astro
---
import BeeOrbit from '@/components/bees/BeeOrbit.astro';
---

<div class="hive-visual">
  <BeeOrbit duration={100} />
</div>

<style>
  .hive-visual { width: 100%; max-width: 1180px; margin: auto; }
</style>
```

- `duration`: seconds per complete orbit, default 100, minimum 30.
- `labels`: character labels, enabled by default.
- `class`: optional class for placement-specific styling.

The scene scales to its container width, using the reference's 1087:627 landscape
proportions on desktop and a slightly taller composition on mobile.
The existing transparent artwork is resized to WebP by Astro; no video or new animation
library is needed. Motion comes from oval paths, gentle bobbing, and depth scaling.

Each scene has an independent pause/play button. Motion stops outside the viewport,
in background tabs, and when the visitor requests reduced motion. Without JavaScript,
the server-rendered scene remains visible with bees arranged around the queen.

Current placement: one full-width team scene on the homepage, replacing the former
three service cards. The earlier AI agents introduction keeps its original artwork.
