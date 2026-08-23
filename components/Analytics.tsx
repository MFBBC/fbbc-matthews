'use client';

import Script from 'next/script';
import { useEffect } from 'react';
import { captureUtms } from '@/lib/utm';
import { abVariants } from '@/lib/tracking';

const PIXEL = process.env.NEXT_PUBLIC_META_PIXEL_ID;
const GA4 = process.env.NEXT_PUBLIC_GA4_ID;

// PostHog project API key (public by design, phc_…). Env override wins;
// the constant below lets the owner ship it without touching Vercel settings.
const POSTHOG_KEY = process.env.NEXT_PUBLIC_POSTHOG_KEY || '';
const POSTHOG_HOST = process.env.NEXT_PUBLIC_POSTHOG_HOST || 'https://us.i.posthog.com';
const POSTHOG_ASSETS = POSTHOG_HOST.replace('.i.posthog.com', '-assets.i.posthog.com');

export default function Analytics() {
  useEffect(() => {
    captureUtms();
    // A/B split, client-side (replaces the removed edge middleware — this can
    // never take the site down). First pageview renders variant A; the sticky
    // cookie takes effect from the next navigation. Env overrides still win.
    try {
      ['ab_headline', 'ab_q1', 'ab_skip_plan'].forEach((name) => {
        if (!document.cookie.split('; ').some((c) => c.startsWith(name + '='))) {
          const v = Math.random() < 0.5 ? 'a' : 'b';
          document.cookie = `${name}=${v}; max-age=${60 * 60 * 24 * 90}; path=/; samesite=lax`;
        }
      });
    } catch {
      /* non-critical */
    }
  }, []);

  return (
    <>
      {PIXEL && (
        <>
          <Script id="meta-pixel" strategy="afterInteractive">
            {`!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;
n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,
document,'script','https://connect.facebook.net/en_US/fbevents.js');
fbq('init', '${PIXEL}');
fbq('track', 'PageView');`}
          </Script>
          <noscript>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              height="1"
              width="1"
              style={{ display: 'none' }}
              alt=""
              src={`https://www.facebook.com/tr?id=${PIXEL}&ev=PageView&noscript=1`}
            />
          </noscript>
        </>
      )}
      {POSTHOG_KEY && (
        <Script
          src={`${POSTHOG_ASSETS}/static/array.js`}
          strategy="afterInteractive"
          onLoad={() => {
            try {
              const ph = (window as any).posthog;
              ph.init(POSTHOG_KEY, {
                api_host: POSTHOG_HOST,
                defaults: '2026-05-30',
                enable_heatmaps: true,
              });
              // Every autocaptured click/pageview carries the A/B assignments too.
              ph.register(abVariants());
            } catch {
              /* analytics must never break the page */
            }
          }}
        />
      )}
      {GA4 && (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${GA4}`}
            strategy="afterInteractive"
          />
          <Script id="ga4" strategy="afterInteractive">
            {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
window.gtag = gtag;
gtag('js', new Date());
gtag('config', '${GA4}');`}
          </Script>
        </>
      )}
    </>
  );
}
