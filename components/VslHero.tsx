'use client';

import { useEffect, useRef, useState } from 'react';
import VslPlayer from '@/components/VslPlayer';
import { CtaButton, StickyCta, TrustStrip } from '@/components/Cta';
import { getWatchDepth } from '@/lib/tracking';
import type { Variant } from '@/lib/flags';

const CTA_LABEL = 'Book My Free Transformation Call →';

// Letter-first interim mode: until the VSL exists (video ships 2026-09-11),
// hide the player entirely — visitors must never see a "not configured" error.
// Flips back to video mode automatically once NEXT_PUBLIC_VSL_ID is set.
const HAS_VIDEO = Boolean(process.env.NEXT_PUBLIC_VSL_ID);

/**
 * Page 1 — VSL page, FBBC brand system.
 *
 * Single-page funnel: this component is the dark VSL hero; the full approved
 * sales letter (SalesLetter) renders directly below it on the homepage —
 * video for watchers, letter for readers, apply buttons throughout.
 *
 * Retained behaviors:
 *   1. Safety net: scroll past video without playing → mirror-moment hook appears.
 *   2. skipPlan A/B: variant B + watch depth >= 75% → CTA goes straight to /apply.
 */
export default function VslHero({
  headlineVariant,
  skipPlanVariant,
}: {
  headlineVariant: Variant;
  skipPlanVariant: Variant;
}) {
  const [played, setPlayed] = useState(false);
  const [showSafetyNet, setShowSafetyNet] = useState(false);
  const [dest, setDest] = useState('/book');
  const sentinel = useRef<HTMLDivElement>(null);
  const playedRef = useRef(false);

  // Legacy skip-plan test is moot now that /apply is the default door; the
  // variant hook stays so the cookie split can be repurposed without a redeploy.
  useEffect(() => {
    void skipPlanVariant;
    void getWatchDepth;
  }, [skipPlanVariant]);

  useEffect(() => {
    const el = sentinel.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting) && !playedRef.current) {
          setShowSafetyNet(true);
        }
      },
      { rootMargin: '0px 0px -20% 0px' }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const onPlay = () => {
    playedRef.current = true;
    setPlayed(true);
    setShowSafetyNet(false);
  };

  return (
    <main>
      {/* ───────────────────────── DARK HERO ───────────────────────── */}
      <section className="bg-ink pb-14 pt-10 text-white md:pt-16">
        <div className="mx-auto max-w-3xl px-4">
          <p className="eyebrow-onDark mb-4 text-center">
            For women in Matthews, Stallings &amp; South Charlotte who are done starting over
          </p>

          {headlineVariant === 'a' ? (
            <>
              <h1 className="h-display text-center">
                The Reason Nothing Has Worked{' '}
                <span className="text-fbyellow">Isn&rsquo;t You.</span>
                {HAS_VIDEO && <> Watch This.</>}
              </h1>
              <p className="mx-auto mt-5 max-w-xl text-center text-lg text-silver">
                {HAS_VIDEO ? (
                  <>
                    In the next 4 minutes, Coach Nate reveals the 3 missing pieces behind every
                    lasting transformation in his gym — and why every program you&apos;ve tried
                    was missing at least two of them.
                  </>
                ) : (
                  <>
                    Below, Coach Nate lays out the 3 missing pieces behind every lasting
                    transformation in his gym — and why every program you&apos;ve tried was
                    missing at least two of them.
                  </>
                )}
              </p>
            </>
          ) : (
            <>
              <h1 className="h-display text-center">
                Somewhere In The Middle Of Taking Care Of Everyone Else,{' '}
                <span className="text-fbyellow">You Disappeared From Your Own List.</span>
              </h1>
              <p className="mx-auto mt-5 max-w-xl text-center text-lg text-silver">
                {HAS_VIDEO ? (
                  <>
                    It was never you. In the next 4 minutes, Coach Nate reveals the 3 missing
                    pieces behind every lasting transformation in his gym — and why every
                    program you&apos;ve tried was missing at least two of them.
                  </>
                ) : (
                  <>
                    It was never you. Below, Coach Nate lays out the 3 missing pieces behind
                    every lasting transformation in his gym — and why every program
                    you&apos;ve tried was missing at least two of them.
                  </>
                )}
              </p>
            </>
          )}

          {HAS_VIDEO && (
            <>
              <div className="mt-8 overflow-hidden rounded-xl ring-2 ring-fbblue">
                <VslPlayer onPlay={onPlay} />
              </div>
              <p className="mt-3 text-center text-sm font-medium uppercase tracking-widest text-silver">
                4 min 30 sec · Sound on
              </p>
            </>
          )}

          <div className="mt-8">
            <CtaButton
              href={dest}
              dark
              sub="Pick a time in 30 seconds · No credit card · Leave with a plan either way"
            >
              {CTA_LABEL}
            </CtaButton>
          </div>

          <div className="mt-12 border-t border-white/15 pt-8">
            <TrustStrip onDark />
          </div>
        </div>
      </section>

      {/* Safety net for non-watchers (video mode only — in letter mode the
          letter below already carries the full argument) */}
      <div ref={sentinel} aria-hidden className="h-px" />
      {HAS_VIDEO && showSafetyNet && !played && (
        <section className="border-b border-line bg-mist">
          <div className="mx-auto max-w-3xl px-4 py-10">
            <p className="eyebrow mb-3">Not a video person? Read this instead</p>
            <p className="text-lg leading-relaxed text-graphite">
              You&apos;ve built a life. A family, a career, people who count on you. Somewhere
              in the middle of taking care of everyone else, you disappeared from your own
              list. And every time it didn&apos;t stick, a little voice asked:{' '}
              <span className="mark-highlight font-bold">
                &ldquo;Is this just who I am now?&rdquo;
              </span>{' '}
              It&apos;s not. And it never was you.
            </p>
            <div className="mt-6">
              <CtaButton href={dest}>{CTA_LABEL}</CtaButton>
            </div>
          </div>
        </section>
      )}

      <StickyCta href={dest} label="Book My Free Call →" revealAfter={0.25} />
    </main>
  );
}
