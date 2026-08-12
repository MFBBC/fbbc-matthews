'use client';

import { useRouter } from 'next/navigation';
import { useRef, useState } from 'react';
import { track } from '@/lib/tracking';
import { getUtms } from '@/lib/utm';
import type { Variant } from '@/lib/flags';

/**
 * Page 3 — quiz application. One question per screen, progress bar,
 * auto-advance on tap, 48px+ tap targets, back button.
 *
 * QUESTION WORDING IS LOCKED — Coach Nate's call framework (Phase 2A) reads
 * these answers back verbatim. Do not edit the strings.
 * (Exception: step 1 has an approved A/B variant B per the build spec.)
 *
 * Progressive capture:
 *  - step 2 (contact) complete → POST /api/ghl stage:"started" + fire ApplyStarted
 *  - final submit             → POST /api/ghl stage:"completed" + fire ApplyCompleted
 *  - contact stored in sessionStorage so /book can prefill the GHL calendar
 */

const HOW_LONG = ['Just recently', '6+ months', 'Over a year', 'Honestly… years'];
const OBSTACLES = [
  'Time',
  'Motivation & accountability',
  "Didn't know what to do",
  'Past gym experiences',
  'Other',
];

const TOTAL_STEPS = 5;

type Answers = {
  goal: string;
  first_name: string;
  phone: string;
  email: string;
  how_long: string;
  obstacle: string;
  readiness_score: number;
};

export default function QuizForm({ q1Variant }: { q1Variant: Variant }) {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [a, setA] = useState<Answers>({
    goal: '',
    first_name: '',
    phone: '',
    email: '',
    how_long: '',
    obstacle: '',
    readiness_score: 7, // default 7 (spec)
  });
  const [contactError, setContactError] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const startedSent = useRef(false);

  const q1Text =
    q1Variant === 'b'
      ? 'What would change in your life if this finally worked?'
      : "What's the #1 thing you want to change?";

  const postGhl = (stage: 'started' | 'completed', answers: Answers) => {
    // fire-and-forget with keepalive so navigation never loses the lead
    fetch('/api/ghl', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      keepalive: true,
      body: JSON.stringify({
        stage,
        first_name: answers.first_name,
        phone: answers.phone,
        email: answers.email,
        answers: {
          goal: answers.goal,
          how_long: answers.how_long,
          obstacle: answers.obstacle,
          readiness_score: stage === 'completed' ? answers.readiness_score : '',
        },
        utms: getUtms(),
        ab_q1_variant: q1Variant,
        page: '/apply',
      }),
    }).catch(() => {});
  };

  const completeContact = () => {
    const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(a.email.trim());
    const phoneDigits = a.phone.replace(/\D/g, '');
    if (!a.first_name.trim()) return setContactError('Enter your first name.');
    if (phoneDigits.length < 10) return setContactError('Enter a valid phone number.');
    if (!emailOk) return setContactError('Enter a valid email address.');
    setContactError('');
    if (!startedSent.current) {
      startedSent.current = true;
      postGhl('started', a);
      track('ApplyStarted');
    }
    setStep(3);
  };

  const pick = (field: 'how_long' | 'obstacle', value: string, nextStep: number) => {
    const next = { ...a, [field]: value };
    setA(next);
    // auto-advance on tap (spec)
    setTimeout(() => setStep(nextStep), 150);
  };

  const submit = () => {
    if (submitting) return;
    setSubmitting(true);
    postGhl('completed', a);
    track('ApplyCompleted', { readiness_score: a.readiness_score });
    try {
      sessionStorage.setItem(
        'fbbc_contact',
        JSON.stringify({ first_name: a.first_name, phone: a.phone, email: a.email })
      );
    } catch {}
    // No dead-end thank-you: route straight to booking (spec)
    router.push('/book');
  };

  const optionBtn =
    'w-full rounded-xl border-2 border-line bg-white px-5 py-4 text-left text-lg font-semibold transition-colors hover:border-ink active:border-ink';

  return (
    <main className="mx-auto flex min-h-[100dvh] max-w-md flex-col px-4 pb-10 pt-8">
      {/* Progress */}
      <div className="mb-2 flex items-center justify-between text-sm text-steel">
        <span>
          Step {step} of {TOTAL_STEPS}
        </span>
        {step > 1 && (
          <button
            onClick={() => setStep(step - 1)}
            className="min-h-[44px] px-2 font-semibold underline"
          >
            ← Back
          </button>
        )}
      </div>
      <div className="mb-8 h-2 w-full overflow-hidden rounded-full bg-line" role="progressbar"
        aria-valuemin={1} aria-valuemax={TOTAL_STEPS} aria-valuenow={step}>
        <div
          className="h-full rounded-full bg-ink transition-all duration-300"
          style={{ width: `${(step / TOTAL_STEPS) * 100}%` }}
        />
      </div>

      <p className="eyebrow mb-2">Free Transformation Assessment</p>
      <p className="mb-8 text-steel">
        A few quick questions so Coach Nate can prepare for <strong>YOUR</strong> situation.
      </p>

      {step === 1 && (
        <section>
          <h1 className="h-section">{q1Text}</h1>
          <input
            type="text"
            value={a.goal}
            onChange={(e) => setA({ ...a, goal: e.target.value })}
            onKeyDown={(e) => e.key === 'Enter' && a.goal.trim() && setStep(2)}
            placeholder="One line is plenty…"
            autoFocus
            className="mt-6 w-full rounded-xl border-2 border-line bg-white px-5 py-4 text-lg outline-none focus:border-ink"
            style={{ minHeight: 56 }}
          />
          <button
            onClick={() => a.goal.trim() && setStep(2)}
            disabled={!a.goal.trim()}
            className="mt-6 w-full rounded-lg bg-fbyellow px-6 py-4 font-display text-lg font-extrabold uppercase tracking-wide text-ink shadow-cta md:text-xl disabled:opacity-40"
            style={{ minHeight: 56 }}
          >
            Continue →
          </button>
        </section>
      )}

      {step === 2 && (
        <section>
          <h1 className="h-section">
            Where should Coach Nate send your personalized plan and scan invite?
          </h1>
          <div className="mt-6 space-y-4">
            <input
              type="text"
              autoComplete="given-name"
              value={a.first_name}
              onChange={(e) => setA({ ...a, first_name: e.target.value })}
              placeholder="First name"
              className="w-full rounded-xl border-2 border-line bg-white px-5 py-4 text-lg outline-none focus:border-ink"
              style={{ minHeight: 56 }}
            />
            <input
              type="tel"
              autoComplete="tel"
              inputMode="tel"
              value={a.phone}
              onChange={(e) => setA({ ...a, phone: e.target.value })}
              placeholder="Phone"
              className="w-full rounded-xl border-2 border-line bg-white px-5 py-4 text-lg outline-none focus:border-ink"
              style={{ minHeight: 56 }}
            />
            <input
              type="email"
              autoComplete="email"
              inputMode="email"
              value={a.email}
              onChange={(e) => setA({ ...a, email: e.target.value })}
              placeholder="Email"
              className="w-full rounded-xl border-2 border-line bg-white px-5 py-4 text-lg outline-none focus:border-ink"
              style={{ minHeight: 56 }}
            />
          </div>
          {contactError && <p className="mt-3 font-semibold text-cta">{contactError}</p>}
          <button
            onClick={completeContact}
            className="mt-6 w-full rounded-lg bg-fbyellow px-6 py-4 font-display text-lg font-extrabold uppercase tracking-wide text-ink shadow-cta md:text-xl"
            style={{ minHeight: 56 }}
          >
            Continue →
          </button>
          <p className="mt-3 text-center text-sm text-steel">
            Free InBody Success Scan included · Coach Nate personally reviews every application
          </p>
        </section>
      )}

      {step === 3 && (
        <section>
          <h1 className="h-section">How long have you been wanting to make this change?</h1>
          <div className="mt-6 space-y-3">
            {HOW_LONG.map((opt) => (
              <button
                key={opt}
                onClick={() => pick('how_long', opt, 4)}
                className={`${optionBtn} ${a.how_long === opt ? 'border-ink' : ''}`}
                style={{ minHeight: 56 }}
              >
                {opt}
              </button>
            ))}
          </div>
        </section>
      )}

      {step === 4 && (
        <section>
          <h1 className="h-section">What&apos;s stopped you before?</h1>
          <div className="mt-6 space-y-3">
            {OBSTACLES.map((opt) => (
              <button
                key={opt}
                onClick={() => pick('obstacle', opt, 5)}
                className={`${optionBtn} ${a.obstacle === opt ? 'border-ink' : ''}`}
                style={{ minHeight: 56 }}
              >
                {opt}
              </button>
            ))}
          </div>
        </section>
      )}

      {step === 5 && (
        <section>
          <h1 className="h-section">How ready are you to actually do something about it?</h1>
          <div className="mt-8">
            <p className="text-center font-display text-6xl font-extrabold" aria-hidden>
              {a.readiness_score}
            </p>
            <input
              type="range"
              min={1}
              max={10}
              step={1}
              value={a.readiness_score}
              onChange={(e) => setA({ ...a, readiness_score: Number(e.target.value) })}
              aria-label="Readiness from 1 to 10"
              className="mt-4 h-3 w-full cursor-pointer accent-ink"
            />
            <div className="mt-1 flex justify-between text-sm text-steel">
              <span>1 · Just looking</span>
              <span>10 · Let&apos;s go</span>
            </div>
          </div>
          <button
            onClick={submit}
            disabled={submitting}
            className="mt-10 w-full rounded-lg bg-fbyellow px-6 py-4 font-display text-lg font-extrabold uppercase tracking-wide text-ink shadow-cta disabled:opacity-60 md:text-xl"
            style={{ minHeight: 56 }}
          >
            {submitting ? 'One second…' : 'Submit My Application →'}
          </button>
          <p className="mt-3 text-center text-xs leading-relaxed text-graphite/60">
            By submitting, you agree to our{' '}
            <a href="/terms" className="underline">Terms</a> and{' '}
            <a href="/privacy" className="underline">Privacy Policy</a>, and consent to
            receive calls and texts from Fit Body Boot Camp Matthews about your application
            (msg &amp; data rates may apply; reply STOP to opt out). Consent is not a
            condition of purchase.
          </p>
        </section>
      )}
    </main>
  );
}
