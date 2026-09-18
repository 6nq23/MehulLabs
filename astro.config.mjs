import react from '@astrojs/react';
import { defineConfig } from 'astro/config';

export default defineConfig({
  integrations: [react()],
  trailingSlash: 'never',
  // Expose only the deployment tier, never server environment secrets.
  vite: { define: { 'import.meta.env.PUBLIC_DEPLOY_ENV': JSON.stringify(process.env.VERCEL_ENV || '') } },
});
