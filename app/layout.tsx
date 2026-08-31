import type { Metadata } from 'next';
import localFont from 'next/font/local';
import Analytics from '@/components/Analytics';
import { SITE_URL } from '@/lib/business';
import './globals.css';

// Brand guide: headers = Avenir Bold, body = Roboto. Avenir is a commercial font;
// Montserrat (bundled here) is the standard open substitute — swap the woff2 files
// for licensed Avenir Next if the franchise provides them.
const display = localFont({
  src: [
    { path: './fonts/montserrat-latin-700-normal.woff2', weight: '700' },
    { path: './fonts/montserrat-latin-800-normal.woff2', weight: '800' },
    { path: './fonts/montserrat-latin-900-normal.woff2', weight: '900' },
  ],
  variable: '--font-display',
  display: 'swap',
});
const body = localFont({
  src: [
    { path: './fonts/roboto-latin-400-normal.woff2', weight: '400' },
    { path: './fonts/roboto-latin-500-normal.woff2', weight: '500' },
    { path: './fonts/roboto-latin-700-normal.woff2', weight: '700' },
  ],
  variable: '--font-body',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: 'Free Transformation Assessment | Fit Body Boot Camp Matthews',
  description:
    "In 4 minutes, Coach Nate reveals the 3 missing pieces behind every lasting transformation — and why every program you've tried was missing at least two of them.",
  openGraph: {
    title: 'Free Transformation Assessment | Fit Body Boot Camp Matthews',
    description:
      "In 4 minutes, Coach Nate reveals the 3 missing pieces behind every lasting transformation — and why every program you've tried was missing at least two of them.",
    url: '/',
    siteName: 'Fit Body Boot Camp Matthews',
    type: 'website',
    locale: 'en_US',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Coach Nate coaching a member at Fit Body Boot Camp Matthews',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free Transformation Assessment | Fit Body Boot Camp Matthews',
    description:
      "In 4 minutes, Coach Nate reveals the 3 missing pieces behind every lasting transformation — and why every program you've tried was missing at least two of them.",
    images: ['/og-image.jpg'],
  },
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
