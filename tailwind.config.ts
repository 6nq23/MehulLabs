import type { Config } from 'tailwindcss';

/**
 * Warm paper, deep charcoal, and forest green connect the identity to the film.
 */
const config: Config = {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        canvas: '#ffffff',
        surface: '#ffffff',
        line: 'rgba(0, 0, 0, 0.1)',
        ink: {
          DEFAULT: '#000000',
          muted: 'rgba(0, 0, 0, 0.6)',
          faint: 'rgba(0, 0, 0, 0.4)',
        },
        accent: {
          DEFAULT: '#ffcb16',
          bright: '#ffcb16',
          soft: 'rgba(255, 203, 22, 0.1)',
          ring: 'rgba(255, 203, 22, 0.22)',
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
        shell: '96rem',
      },
      transitionTimingFunction: {
        premium: 'cubic-bezier(0.22, 1, 0.36, 1)',
      },
    },
  },
  plugins: [],
};

export default config;
