import type { Config } from 'tailwindcss';

/**
 * Warm paper, deep charcoal, and forest green connect the identity to the film.
 */
const config: Config = {
  content: ['./src/**/*.{ts,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        canvas: '#F7F7F2',
        surface: '#EEEFE7',
        line: '#D8DDD1',
        ink: {
          DEFAULT: '#202720',
          muted: '#586056',
          faint: '#626B5C',
        },
        accent: {
          DEFAULT: '#496546',
          bright: '#3B5538',
          soft: '#E7ECDD',
          ring: 'rgba(92, 114, 98, 0.22)',
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
