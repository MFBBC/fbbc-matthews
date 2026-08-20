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
  dark = false,
}: {
  href: string;
  children: React.ReactNode;
  sub?: string;
  className?: string;
  /** Set when the button sits on a bg-ink band — keeps the sub caption AA-legible. */
  dark?: boolean;
}) {
  // Resolve UTMs client-side after mount (localStorage), fall back to plain href for SSR.
  const [resolved, setResolved] = useState(href);
  useEffect(() => setResolved(withUtm(href)), [href]);

  return (
    <div className={`w-full ${className}`}>
      <Link
        href={resolved}
        className="block w-full rounded-lg bg-fbyellow px-6 py-4 text-center font-display text-lg font-extrabold uppercase tracking-wide text-ink shadow-cta transition-colors hover:bg-fbyellowDark active:bg-fbyellowDark focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-fbblue sm:mx-auto sm:max-w-md md:text-xl"
        style={{ minHeight: 56 }}
      >
        {children}
      </Link>
      {sub && (
        <p className={`mt-2 text-center text-sm ${dark ? 'text-silver' : 'text-graphite/70'}`}>
          {sub}
        </p>
      )}
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
      className={`fixed inset-x-0 bottom-0 z-50 border-t border-line bg-white/95 p-3 shadow-[0_-4px_14px_rgba(0,0,0,0.08)] backdrop-blur transition-transform duration-300 md:hidden ${
        show ? 'translate-y-0' : 'translate-y-full'
      }`}
      style={{ paddingBottom: 'max(0.75rem, env(safe-area-inset-bottom))' }}
    >
      <Link
        href={resolved}
        className="block w-full rounded-lg bg-fbyellow px-4 py-3.5 text-center font-display text-base font-extrabold uppercase tracking-wide text-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-fbblue"
        style={{ minHeight: 52 }}
      >
        {label}
      </Link>
    </div>
  );
}

export function TrustStrip({ onDark = false }: { onDark?: boolean } = {}) {
  const label = onDark ? 'text-white' : 'text-ink';
  const sub = onDark ? 'text-silver' : 'text-graphite/70';
  return (
    <div className="mx-auto grid max-w-3xl grid-cols-1 gap-4 text-center sm:grid-cols-3">
      <div>
        <p className="font-display font-extrabold text-fbyellow" aria-hidden>
          ★★★★★
        </p>
        <p className={`font-display font-bold uppercase tracking-wide ${label}`}>5.0 on Google</p>
        <p className={`text-sm ${sub}`}>Every single review: five stars</p>
      </div>
      <div>
        <p className="font-display font-extrabold text-fbyellow" aria-hidden>
          30:00
        </p>
        <p className={`font-display font-bold uppercase tracking-wide ${label}`}>30-Minute Sessions</p>
        <p className={`text-sm ${sub}`}>Coach-led, all fitness levels</p>
      </div>
      <div>
        <p className="font-display font-extrabold text-fbyellow" aria-hidden>
          10,000s
        </p>
        <p className={`font-display font-bold uppercase tracking-wide ${label}`}>Transformed</p>
        <p className={`text-sm ${sub}`}>Across hundreds of Fit Body locations worldwide</p>
      </div>
    </div>
  );
}
