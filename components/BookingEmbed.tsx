'use client';

import Script from 'next/script';
import { useEffect, useState } from 'react';

/**
 * GHL "Transformation Call" calendar embed.
 * - Prefills name/email/phone via URL params from sessionStorage (set by the quiz)
 *   so nothing is re-typed.
 * - Height: GHL's form_embed.js auto-sizes the iframe to the widget's real
 *   content at every step (no dead space, no cut-off). A modest min-height
 *   only covers the initial load to limit CLS.
 * - Route to /confirmed: set the calendar's "Thank You / redirect URL" in GHL to
 *   {SITE_URL}/confirmed (README). As a progressive enhancement we also listen for
 *   the widget's booked postMessage and redirect client-side.
 */
const CAL_URL = process.env.NEXT_PUBLIC_GHL_CALENDAR_URL || '';

export default function BookingEmbed() {
  const [src, setSrc] = useState(CAL_URL);

  useEffect(() => {
    if (!CAL_URL) return;
    try {
      const c = JSON.parse(sessionStorage.getItem('fbbc_contact') || '{}');
      const u = new URL(CAL_URL);
      if (c.first_name) u.searchParams.set('first_name', c.first_name);
      if (c.email) u.searchParams.set('email', c.email);
      if (c.phone) u.searchParams.set('phone', c.phone);
      setSrc(u.toString());
    } catch {}
  }, []);

  useEffect(() => {
    const onMsg = (e: MessageEvent) => {
      const d = typeof e.data === 'string' ? e.data : JSON.stringify(e.data ?? '');
      if (/booked|appointment[_-]?scheduled|msgsndr.*success/i.test(d)) {
        window.location.href = '/confirmed';
      }
    };
    window.addEventListener('message', onMsg);
    return () => window.removeEventListener('message', onMsg);
  }, []);

  if (!CAL_URL) {
    return (
      <div className="flex items-center justify-center rounded-2xl border-2 border-dashed border-line p-8 text-center text-steel" style={{ minHeight: 400 }}>
        <p>
          Set <code>NEXT_PUBLIC_GHL_CALENDAR_URL</code> in <code>.env.local</code> to your GHL
          &ldquo;Transformation Call&rdquo; calendar permalink.
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-2xl bg-white shadow-md">
      <iframe
        src={src}
        id="fbbc-booking-widget"
        title="Book your Transformation Call"
        className="w-full"
        style={{ minHeight: 480, border: 0 }}
        scrolling="no"
        loading="eager"
      />
      {/* Official GHL embed helper: resizes the iframe to match widget content */}
      <Script src="https://link.msgsndr.com/js/form_embed.js" strategy="afterInteractive" />
    </div>
  );
}
