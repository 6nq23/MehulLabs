// ponytail: keep Tailwind 3 during the Astro cutover; upgrade CSS separately with visual regression coverage.
/** @type {import('postcss-load-config').Config} */
const config = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
};

export default config;
