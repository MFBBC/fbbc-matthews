'use client';

/**
 * Unified event layer. Every funnel event fires to Meta Pixel + GA4
 * (each guarded — missing IDs are a silent no-op, so dev works without keys).
 *
 * Event map (spec):
 *   VSLPlay            — first play click
 *   VSLProgress25/50/75/100 — watch-depth quartiles (power the retargeting cutdowns)
 *   ApplyStarted       — quiz step 2 (contact) complete — mirrors GHL "application-started"
 *   ApplyCompleted     — final quiz submit — Meta standard "Lead"
 *   CallBooked         — /confirmed — Meta standard "Schedule"
 */

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
    gtag?: (...args: unknown[]) => void;
  }
}

const META_STANDARD: Record<string, string> = {
  ApplyCompleted: 'Lead',
  CallBooked: 'Schedule',
};

export function track(event: string, params: Record<string, unknown> = {}) {
  if (typeof window === 'undefined') return;
  // Meta: standard events via track(), everything else via trackCustom()
  if (window.fbq) {
    const std = META_STANDARD[event];
    if (std) window.fbq('track', std, params);
    else window.fbq('trackCustom', event, params);
  }
  // GA4
  if (window.gtag) window.gtag('event', event, params);
}

/** Persist VSL watch depth so the skip-plan A/B test can read it later. */
export function recordWatchDepth(pct: number) {
  try {
    const prev = Number(localStorage.getItem('vsl_depth') || '0');
    if (pct > prev) localStorage.setItem('vsl_depth', String(pct));
  } catch {}
}

export function getWatchDepth(): number {
  try {
    return Number(localStorage.getItem('vsl_depth') || '0');
  } catch {
    return 0;
  }
}
