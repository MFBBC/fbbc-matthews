import type { Config } from 'tailwindcss';

/**
 * FBBC Brand Identity & Style Guide (April 2024) — exact palette.
 * Primary: FBBC Blue #0A73CE (PMS 7455C) · Accent: FBBC Yellow #FFC000 (PMS 7408C)
 * Neutrals: Black #000000 · Dark Grey #333333 · Light Grey #A7A9AC · White #FFFFFF
 * CTA buttons are FBBC Yellow with black text (matches fitbodybootcamp.com "Start Trial").
 */
const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        fbblue: '#0A73CE',
        fbblueDark: '#085EA8',
        fbyellow: '#FFC000',
        fbyellowDark: '#E5AC00',
        ink: '#000000',
        graphite: '#333333',
        silver: '#A7A9AC',
        mist: '#F4F5F6',
        line: '#E3E4E6',
        // Back-compat aliases used across components
        paper: '#FFFFFF',
        sand: '#F4F5F6',
        steel: '#333333',
        cta: '#FFC000',
        ctaDark: '#E5AC00',
        star: '#FFC000',
      },
      fontFamily: {
        display: ['var(--font-display)'],
        body: ['var(--font-body)'],
      },
      boxShadow: {
        cta: '0 4px 14px rgba(255, 192, 0, 0.35)',
        card: '0 2px 12px rgba(0, 0, 0, 0.08)',
      },
    },
  },
  plugins: [],
};
export default config;
