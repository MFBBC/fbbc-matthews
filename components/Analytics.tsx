'use client';

import Script from 'next/script';
import { useEffect } from 'react';
import { captureUtms } from '@/lib/utm';

const PIXEL = process.env.NEXT_PUBLIC_META_PIXEL_ID;
const GA4 = process.env.NEXT_PUBLIC_GA4_ID;

export default function Analytics() {
  useEffect(() => {
    captureUtms();
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
