import type { Config } from 'tailwindcss';

/**
 * Warm paper, deep charcoal, and forest green connect the identity to the film.
 */
const config: Config = {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        canvas: '#f6f5f1',
        surface: '#ffffff',
        line: '#ebebe6',
        ink: {
          DEFAULT: '#131313',
          muted: '#66676e',
          faint: '#66676e',
        },
        accent: {
          DEFAULT: '#facc15',
          bright: '#facc15',
          soft: '#f6f5f1',
          ring: 'rgba(113, 108, 92, 0.22)',
        },
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        display: ['var(--font-display)', 'var(--font-inter)', 'sans-serif'],
      },
      fontSize: {
        eyebrow: ['0.6875rem', { lineHeight: '1', letterSpacing: '0.18em', fontWeight: '500' }],
      },
      maxWidth: {
        shell: '80rem',
      },
      transitionTimingFunction: {
        premium: 'cubic-bezier(0.22, 1, 0.36, 1)',
      },
    },
  },
  plugins: [],
};

export default config;
