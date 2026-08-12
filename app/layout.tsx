import type { Metadata } from 'next';
import localFont from 'next/font/local';
import Analytics from '@/components/Analytics';
import { SITE_URL } from '@/lib/business';
import './globals.css';

// Self-hosted fonts (spec: self-hosted or system fonts — no external font requests, no CLS).
const display = localFont({
  src: [
    { path: './fonts/barlow-condensed-latin-600-normal.woff2', weight: '600' },
    { path: './fonts/barlow-condensed-latin-700-normal.woff2', weight: '700' },
    { path: './fonts/barlow-condensed-latin-800-normal.woff2', weight: '800' },
  ],
  variable: '--font-display',
  display: 'swap',
});
const body = localFont({
  src: [
    { path: './fonts/barlow-latin-400-normal.woff2', weight: '400' },
    { path: './fonts/barlow-latin-500-normal.woff2', weight: '500' },
    { path: './fonts/barlow-latin-600-normal.woff2', weight: '600' },
    { path: './fonts/barlow-latin-700-normal.woff2', weight: '700' },
  ],
  variable: '--font-body',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: 'Free Transformation Assessment | Fit Body Boot Camp Matthews',
  description:
    "In 4 minutes, Coach Nate reveals the 3 missing pieces behind every lasting transformation — and why every program you've tried was missing at least two of them.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable}`}>
      <body>
        {/* One room, one door: no nav bar anywhere on funnel pages (spec). */}
        {children}
        <Analytics />
      </body>
    </html>
  );
}
