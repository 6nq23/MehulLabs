import type { Config } from 'tailwindcss';

/**
 * Warm paper, deep charcoal, and forest green connect the identity to the film.
 */
const config: Config = {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        canvas: '#F7F7F2',
        surface: '#efede7',
        line: '#dddad1',
        ink: {
          DEFAULT: '#18181b',
          muted: '#605d56',
          faint: '#6b675c',
        },
        accent: {
          DEFAULT: '#ffcb16',
          bright: '#facc15',
          soft: '#ebe8dd',
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
