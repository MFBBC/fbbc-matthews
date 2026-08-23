'use client';

import { useEffect, useState } from 'react';
import { CtaButton } from '@/components/Cta';
import { track } from '@/lib/tracking';
import { getUtms } from '@/lib/utm';
import { BIZ } from '@/lib/business';

/**
 * GHL "Lead Opt In.v3" form (free form-submission workflow trigger — the
 * inbound-webhook trigger is a GHL premium feature). Leads land directly in
 * GHL contacts. Env override wins; empty string falls back to the custom
 * form + /api/ghl webhook path below.
 */
const OPTIN_FORM_URL =
  process.env.NEXT_PUBLIC_GHL_OPTIN_FORM_URL ||
  'https://api.leadconnectorhq.com/widget/form/qBeydDoksD3JstewWFBe';

/**
 * Low-commitment second door: "have Coach Nate text you first."
 * Captures first name + phone (+ optional email) → /api/ghl (stage "optin",
 * tag website-optin) for manual follow-up. On success: stores the contact in
 * sessionStorage so the /book calendar prefills, fires LeadOptIn (Meta "Lead"),
 * and immediately offers the calendar — the post-opt-in moment is the highest
 * intent this visitor will ever have.
 *
 * If the pipeline fails for any reason (including GHL_WEBHOOK_URL unset), the
 * form falls back to showing the gym's phone number — never silently drop a lead.
 */
export default function LeadOptIn({ id }: { id?: string }) {
  if (OPTIN_FORM_URL) return <LeadOptInEmbed id={id} />;
  return <LeadOptInCustom id={id} />;
}

/** GHL form embed inside the styled second-door section. */
function LeadOptInEmbed({ id }: { id?: string }) {
  const [src, setSrc] = useState(OPTIN_FORM_URL);
  const [submitted, setSubmitted] = useState(false);

  // Pass stored ad attribution through to the GHL form's URL params.
  useEffect(() => {
    try {
      const u = new URL(OPTIN_FORM_URL);
      Object.entries(getUtms()).forEach(([k, v]) => {
        if (v && k !== 'landed_at') u.searchParams.set(k, String(v));
      });
      setSrc(u.toString());
    } catch {}
  }, []);

  // Best-effort submit detection (GHL's embed posts messages on submit):
  // fire the Meta/GA4/PostHog Lead event and reveal the "skip the wait" nudge.
  useEffect(() => {
    const onMsg = (e: MessageEvent) => {
      const d = typeof e.data === 'string' ? e.data : JSON.stringify(e.data ?? '');
      if (/form[_:-]?submit|submitted|thank[_:-]?you/i.test(d)) {
        setSubmitted(true);
        track('LeadOptIn');
      }
    };
    window.addEventListener('message', onMsg);
    return () => window.removeEventListener('message', onMsg);
  }, []);

  return (
    <section id={id} className="mx-auto max-w-3xl px-4 pt-16">
      <div className="rounded-2xl border border-line bg-mist p-6 md:p-8">
        <p className="eyebrow mb-3">Not ready to book a call?</p>
        <h2 className="h-section">Have Coach Nate Text You First</h2>
        <p className="mt-4 text-lg leading-relaxed text-graphite">
          Booking a call is a bigger first step than some people want — that&apos;s fine.
          Leave your name and number instead. Coach Nate will text you personally: ask him
          anything, or set up a free trial session whenever you&apos;re ready. No pressure,
          no spam — one real human, texting back.
        </p>
        {/* NOTE: deliberately NOT using GHL's form_embed.js helper — it wipes the
            src of duplicate embeds of the same form (verified). Fixed height +
            internal scroll instead. */}
        <div className="mt-6 overflow-hidden rounded-xl bg-white">
          <iframe
            src={src}
            id={`${id}-ghl-form`}
            title="Have Coach Nate text you first"
            className="w-full"
            style={{ minHeight: 640, border: 0 }}
            loading="lazy"
          />
        </div>
        {submitted && (
          <div className="mt-6">
            <p className="mb-3 text-center font-bold">
              Want to skip the wait? Put a time on the calendar now:
            </p>
            <CtaButton href="/book">Book My Free Call →</CtaButton>
          </div>
        )}
      </div>
    </section>
  );
}

/** Custom-form path (unused while OPTIN_FORM_URL is set; kept for the day a
    paid inbound-webhook trigger exists — posts to /api/ghl, stage "optin"). */
function LeadOptInCustom({ id }: { id?: string }) {
  const [firstName, setFirstName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [hp, setHp] = useState(''); // honeypot — real users never fill this
  const [state, setState] = useState<'idle' | 'sending' | 'done' | 'failed'>('idle');
  const [error, setError] = useState('');

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (hp) return; // bot
    const digits = phone.replace(/\D/g, '');
    if (!firstName.trim()) {
      setError('Add your first name so Coach Nate knows who he’s texting.');
      return;
    }
    if (digits.length < 10) {
      setError('That phone number looks short — double-check it?');
      return;
    }
    setError('');
    setState('sending');
    try {
      const res = await fetch('/api/ghl', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          stage: 'optin',
          first_name: firstName.trim(),
          phone: digits,
          email: email.trim(),
          utms: getUtms(),
          page: window.location.pathname,
        }),
      });
      const json = await res.json().catch(() => ({}));
      if (!res.ok || json.dev) {
        setState('failed');
        return;
      }
      try {
        sessionStorage.setItem(
          'fbbc_contact',
          JSON.stringify({ first_name: firstName.trim(), phone: digits, email: email.trim() })
        );
      } catch {}
      track('LeadOptIn');
      setState('done');
    } catch {
      setState('failed');
    }
  };

  const inputClass =
    'w-full rounded-lg border border-line bg-white px-4 py-3 text-base focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-fbblue';

  return (
    <section id={id} className="mx-auto max-w-3xl px-4 pt-16">
      <div className="rounded-2xl border border-line bg-mist p-6 md:p-8">
        {state === 'done' ? (
          <div className="text-center">
            <p className="eyebrow mb-3">You&apos;re on the list</p>
            <h2 className="h-section">Done — Watch Your Texts</h2>
            <p className="mx-auto mt-4 max-w-xl text-lg leading-relaxed text-graphite">
              Coach Nate will text you personally, usually the same day. Ask him anything —
              or skip the wait and put a time on his calendar right now:
            </p>
            <div className="mt-6">
              <CtaButton href="/book">Book My Free Call →</CtaButton>
            </div>
          </div>
        ) : state === 'failed' ? (
          <div className="text-center">
            <p className="eyebrow mb-3">One hiccup</p>
            <h2 className="h-section">That Didn&apos;t Go Through</h2>
            <p className="mx-auto mt-4 max-w-xl text-lg leading-relaxed text-graphite">
              No problem — text Coach Nate directly at{' '}
              <a href={`sms:${BIZ.phoneE164}`} className="font-bold text-fbblue underline">
                {BIZ.phone}
              </a>{' '}
              and he&apos;ll take it from there.
            </p>
          </div>
        ) : (
          <>
            <p className="eyebrow mb-3">Not ready to book a call?</p>
            <h2 className="h-section">Have Coach Nate Text You First</h2>
            <p className="mt-4 text-lg leading-relaxed text-graphite">
              Booking a call is a bigger first step than some people want — that&apos;s fine.
              Leave your name and number instead. Coach Nate will text you personally: ask him
              anything, or set up a free trial session whenever you&apos;re ready. No pressure,
              no spam — one real human, texting back.
            </p>
            <form onSubmit={submit} className="mt-6 space-y-4" noValidate>
              {/* honeypot */}
              <input
                type="text"
                value={hp}
                onChange={(e) => setHp(e.target.value)}
                tabIndex={-1}
                autoComplete="off"
                aria-hidden
                className="absolute left-[-9999px] h-px w-px"
              />
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label htmlFor={`${id}-name`} className="mb-1 block text-sm font-bold">
                    First name
                  </label>
                  <input
                    id={`${id}-name`}
                    type="text"
                    autoComplete="given-name"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className={inputClass}
                    style={{ minHeight: 48 }}
                  />
                </div>
                <div>
                  <label htmlFor={`${id}-phone`} className="mb-1 block text-sm font-bold">
                    Cell number
                  </label>
                  <input
                    id={`${id}-phone`}
                    type="tel"
                    autoComplete="tel"
                    inputMode="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className={inputClass}
                    style={{ minHeight: 48 }}
                  />
                </div>
              </div>
              <div>
                <label htmlFor={`${id}-email`} className="mb-1 block text-sm font-bold">
                  Email <span className="font-normal text-graphite/60">(optional)</span>
                </label>
                <input
                  id={`${id}-email`}
                  type="email"
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={inputClass}
                  style={{ minHeight: 48 }}
                />
              </div>
              {error && <p className="text-sm font-semibold text-red-700">{error}</p>}
              <button
                type="submit"
                disabled={state === 'sending'}
                className="block w-full rounded-lg bg-fbyellow px-6 py-4 text-center font-display text-lg font-extrabold uppercase tracking-wide text-ink shadow-cta transition-colors hover:bg-fbyellowDark active:bg-fbyellowDark focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-fbblue disabled:opacity-60 sm:mx-auto sm:max-w-md md:text-xl"
                style={{ minHeight: 56 }}
              >
                {state === 'sending' ? 'Sending…' : 'Text Me First →'}
              </button>
              <p className="text-center text-xs leading-relaxed text-graphite/60">
                By submitting you agree to receive texts from Fit Body Boot Camp Matthews.
                Message rates may apply. Reply STOP any time to opt out.
              </p>
            </form>
          </>
        )}
      </div>
    </section>
  );
}
