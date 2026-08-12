'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { withUtm } from '@/lib/utm';

/**
 * The ONE CTA style. The cta color is used nowhere else on the site (spec).
 * Full-width high-contrast on mobile, 48px+ tap target, UTM query passthrough.
 */
export function CtaButton({
  href,
  children,
  sub,
  className = '',
}: {
  href: string;
  children: React.ReactNode;
  sub?: string;
  className?: string;
}) {
  // Resolve UTMs client-side after mount (localStorage), fall back to plain href for SSR.
  const [resolved, setResolved] = useState(href);
  useEffect(() => setResolved(withUtm(href)), [href]);

  return (
    <div className={`w-full ${className}`}>
      <Link
        href={resolved}
        className="block w-full rounded-xl bg-cta px-6 py-4 text-center font-display text-xl font-bold uppercase tracking-wide text-white shadow-lg transition-colors hover:bg-ctaDark active:bg-ctaDark sm:mx-auto sm:max-w-md"
        style={{ minHeight: 56 }}
      >
        {children}
      </Link>
      {sub && <p className="mt-2 text-center text-sm text-steel">{sub}</p>}
    </div>
  );
}

/**
 * Sticky bottom CTA bar on mobile, revealed after `revealAfter` (0–1) scroll depth.
 * Pass revealAfter={0} to show immediately (used on /plan — "throughout").
 */
export function StickyCta({
  href,
  label,
  revealAfter = 0.25,
}: {
  href: string;
  label: string;
  revealAfter?: number;
}) {
  const [show, setShow] = useState(revealAfter === 0);
  const [resolved, setResolved] = useState(href);
  useEffect(() => setResolved(withUtm(href)), [href]);

  useEffect(() => {
    if (revealAfter === 0) return;
    const onScroll = () => {
      const depth =
        window.scrollY / Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      if (depth >= revealAfter) setShow(true);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, [revealAfter]);

  return (
    <div
      aria-hidden={!show}
      className={`fixed inset-x-0 bottom-0 z-50 border-t border-line bg-white/95 p-3 backdrop-blur transition-transform duration-300 md:hidden ${
        show ? 'translate-y-0' : 'translate-y-full'
      }`}
      style={{ paddingBottom: 'max(0.75rem, env(safe-area-inset-bottom))' }}
    >
      <Link
        href={resolved}
        className="block w-full rounded-xl bg-cta px-4 py-3.5 text-center font-display text-lg font-bold uppercase tracking-wide text-white"
        style={{ minHeight: 52 }}
      >
        {label}
      </Link>
    </div>
  );
}

export function TrustStrip() {
  return (
    <div className="mx-auto grid max-w-3xl grid-cols-1 gap-4 text-center sm:grid-cols-3">
      <div>
        <p className="text-star" aria-hidden>
          ★★★★★
        </p>
        <p className="font-bold">5.0 on Google</p>
        <p className="text-sm text-steel">Every single review: five stars</p>
      </div>
      <div>
        <p className="font-bold">30-Minute Sessions</p>
        <p className="text-sm text-steel">Coach-led, all fitness levels</p>
      </div>
      <div>
        <p className="font-bold">Tens of Thousands Transformed</p>
        <p className="text-sm text-steel">Across hundreds of Fit Body locations worldwide</p>
      </div>
    </div>
  );
}
