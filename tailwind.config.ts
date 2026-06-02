import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './lib/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        // Luxury palette — soft beige, ivory, walnut, taupe, charcoal
        ivory: '#FBF9F5',
        cream: '#F4EFE6',
        sand: '#E7DECF',
        linen: '#EDE7DB',
        taupe: '#B6A892',
        stone: '#9C8E78',
        walnut: '#6A5440',
        cocoa: '#473829',
        charcoal: '#23201C',
        ink: '#161412',
        brass: '#A98E63',
        gold: '#C2A878',
      },
      fontFamily: {
        serif: ['var(--font-serif)', 'Georgia', 'serif'],
        sans: ['var(--font-sans)', 'system-ui', 'sans-serif'],
      },
      letterSpacing: {
        luxe: '0.25em',
        wide2: '0.18em',
      },
      maxWidth: {
        editorial: '1440px',
      },
      transitionTimingFunction: {
        luxe: 'cubic-bezier(0.22, 1, 0.36, 1)',
      },
      keyframes: {
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'slow-zoom': {
          '0%': { transform: 'scale(1)' },
          '100%': { transform: 'scale(1.12)' },
        },
        shimmer: {
          '100%': { transform: 'translateX(100%)' },
        },
      },
      animation: {
        'fade-up': 'fade-up 1s cubic-bezier(0.22,1,0.36,1) forwards',
        'slow-zoom': 'slow-zoom 14s ease-out forwards',
        shimmer: 'shimmer 2s infinite',
      },
    },
  },
  plugins: [],
};

export default config;
