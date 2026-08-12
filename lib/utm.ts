'use client';

/**
 * UTM persistence: capture on first touch, store in localStorage,
 * pass through on internal funnel links, and include in every GHL
 * webhook payload — so ad→booked-call attribution lives in GHL.
 */

const KEYS = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term', 'fbclid', 'gclid'] as const;
const STORE = 'fbbc_utms';

export type Utms = Partial<Record<(typeof KEYS)[number], string>> & { landed_at?: string };

export function captureUtms() {
  if (typeof window === 'undefined') return;
  try {
    const qs = new URLSearchParams(window.location.search);
    const found: Utms = {};
    KEYS.forEach((k) => {
      const v = qs.get(k);
      if (v) found[k] = v;
    });
    if (Object.keys(found).length > 0) {
      found.landed_at = new Date().toISOString();
      localStorage.setItem(STORE, JSON.stringify(found)); // last-touch wins
    }
  } catch {}
}

export function getUtms(): Utms {
  try {
    return JSON.parse(localStorage.getItem(STORE) || '{}');
  } catch {
    return {};
  }
}

/** Append persisted UTMs to an internal href (query passthrough). */
export function withUtm(href: string): string {
  const utms = getUtms();
  const entries = Object.entries(utms).filter(([k]) => k !== 'landed_at');
  if (entries.length === 0) return href;
  const [path, existing] = href.split('?');
  const qs = new URLSearchParams(existing || '');
  entries.forEach(([k, v]) => {
    if (v && !qs.has(k)) qs.set(k, v);
  });
  const s = qs.toString();
  return s ? `${path}?${s}` : path;
}
