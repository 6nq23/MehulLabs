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
        mist: '#E9ECE4',
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
        'display-xl': ['clamp(3.25rem, 11vw, 11rem)', { lineHeight: '0.92', letterSpacing: '-0.045em', fontWeight: '600' }],
        'display-lg': ['clamp(2.75rem, 7.5vw, 6.5rem)', { lineHeight: '0.98', letterSpacing: '-0.04em', fontWeight: '600' }],
        'display-md': ['clamp(2rem, 4.6vw, 3.75rem)', { lineHeight: '1.06', letterSpacing: '-0.032em', fontWeight: '600' }],
        'display-sm': ['clamp(1.5rem, 2.6vw, 2.25rem)', { lineHeight: '1.16', letterSpacing: '-0.025em', fontWeight: '600' }],
        eyebrow: ['0.6875rem', { lineHeight: '1', letterSpacing: '0.18em', fontWeight: '500' }],
      },
      maxWidth: {
        shell: '96rem',
      },
      spacing: {
        section: 'clamp(5rem, 9vw, 9rem)',
      },
      borderRadius: {
        xl2: '1.25rem',
        xl3: '1.75rem',
      },
      transitionTimingFunction: {
        premium: 'cubic-bezier(0.22, 1, 0.36, 1)',
        swift: 'cubic-bezier(0.4, 0, 0.2, 1)',
      },
      boxShadow: {
        card: '0 1px 2px rgba(10,10,11,0.04), 0 8px 24px -12px rgba(10,10,11,0.10)',
        lift: '0 2px 4px rgba(10,10,11,0.04), 0 24px 48px -20px rgba(10,10,11,0.18)',
        accent: '0 12px 32px -12px rgba(73,101,70,0.25)',
      },
      keyframes: {
        marquee: {
          from: { transform: 'translateX(0)' },
          to: { transform: 'translateX(-50%)' },
        },
        shimmer: {
          '100%': { transform: 'translateX(100%)' },
        },
        pulseDot: {
          '0%, 100%': { opacity: '1', transform: 'scale(1)' },
          '50%': { opacity: '0.35', transform: 'scale(0.82)' },
        },
      },
      animation: {
        marquee: 'marquee 38s linear infinite',
        shimmer: 'shimmer 2.2s infinite',
        'pulse-dot': 'pulseDot 2s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};

export default config;
