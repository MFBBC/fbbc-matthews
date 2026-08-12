import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#14161A',       // primary text / dark sections
        paper: '#FBFAF7',     // page background
        sand: '#F1EEE8',      // alternate section background
        steel: '#5C6270',     // secondary text
        line: '#E4E1DA',      // hairlines
        cta: '#E8332A',       // CTA ONLY — never used elsewhere (spec)
        ctaDark: '#C4241C',   // CTA hover/active
        star: '#E9A13B',      // review stars
      },
      fontFamily: {
        display: ['var(--font-display)'],
        body: ['var(--font-body)'],
      },
    },
  },
  plugins: [],
};
export default config;
