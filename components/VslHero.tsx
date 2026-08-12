'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import VslPlayer from '@/components/VslPlayer';
import { CtaButton, StickyCta, TrustStrip } from '@/components/Cta';
import { getWatchDepth } from '@/lib/tracking';
import type { Variant } from '@/lib/flags';

const CTA_LABEL = 'Apply For Your Free Transformation Assessment →';

/** Homepage proof strip — three strongest transformations, real photos. */
const PROOF = [
  { img: '/images/transformations/monica.jpg', name: 'Monica', stat: '−80 lbs · −59 in' },
  { img: '/images/transformations/kyle.jpg', name: 'Kyle', stat: '−100 lbs · −54 in' },
  { img: '/images/transformations/katie.jpg', name: 'Katie', stat: '−52 lbs · −58 in' },
];

/**
 * Page 1 — VSL page, FBBC brand system.
 *
 * Structure (informed by high-converting VSL page patterns):
 *   DARK HERO  — qualification line → headline → video → ONE CTA → trust numbers.
 *   PROOF      — 3 real transformations w/ photos (social proof within one scroll).
 *   3 STEPS    — defuses "what happens when I click".
 *   PROMISE    — 90-Day guarantee band (risk reversal near the CTA).
 *   FINAL CTA  — same single door.
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
  const [dest, setDest] = useState('/plan');
  const sentinel = useRef<HTMLDivElement>(null);
  const playedRef = useRef(false);

  useEffect(() => {
    if (skipPlanVariant === 'b' && getWatchDepth() >= 75) setDest('/apply');
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
                <span className="text-fbyellow">Isn&rsquo;t You.</span> Watch This.
              </h1>
              <p className="mx-auto mt-5 max-w-xl text-center text-lg text-silver">
                In the next 4 minutes, Coach Nate reveals the 3 missing pieces behind every
                lasting transformation in his gym — and why every program you&apos;ve tried was
                missing at least two of them.
              </p>
            </>
          ) : (
            <>
              <h1 className="h-display text-center">
                Somewhere In The Middle Of Taking Care Of Everyone Else,{' '}
                <span className="text-fbyellow">You Disappeared From Your Own List.</span>
              </h1>
              <p className="mx-auto mt-5 max-w-xl text-center text-lg text-silver">
                It was never you. In the next 4 minutes, Coach Nate reveals the 3 missing
                pieces behind every lasting transformation in his gym — and why every program
                you&apos;ve tried was missing at least two of them.
              </p>
            </>
          )}

          <div className="mt-8 overflow-hidden rounded-xl ring-2 ring-fbblue">
            <VslPlayer onPlay={onPlay} />
          </div>
          <p className="mt-3 text-center text-sm font-medium uppercase tracking-widest text-silver">
            4 min 30 sec · Sound on
          </p>

          <div className="mt-8">
            <CtaButton href={dest} sub="Takes 60 seconds · No credit card · No obligation">
              {CTA_LABEL}
            </CtaButton>
          </div>

          <div className="mt-12 border-t border-white/15 pt-8">
            <TrustStrip onDark />
          </div>
        </div>
      </section>

      {/* Safety net for non-watchers */}
      <div ref={sentinel} aria-hidden className="h-px" />
      {showSafetyNet && !played && (
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

      {/* ───────────────────────── REAL PROOF ───────────────────────── */}
      <section className="bg-white py-14">
        <div className="mx-auto max-w-5xl px-4">
          <p className="eyebrow text-center">Real members · Real numbers</p>
          <h2 className="h-section mt-2 text-center">
            The Video Explains It. <span className="text-fbblue">They Prove It.</span>
          </h2>
          <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-3">
            {PROOF.map((p) => (
              <figure key={p.name} className="overflow-hidden rounded-xl shadow-card">
                <Image
                  src={p.img}
                  alt={`${p.name}'s before and after transformation at Fit Body Boot Camp`}
                  width={480}
                  height={377}
                  className="w-full"
                />
                <figcaption className="flex items-baseline justify-between bg-ink px-4 py-3">
                  <span className="font-display font-extrabold uppercase text-white">
                    {p.name}
                  </span>
                  <span className="font-display font-bold text-fbyellow">{p.stat}</span>
                </figcaption>
              </figure>
            ))}
          </div>
          <p className="mt-4 text-center text-sm text-graphite/70">
            Results vary by individual. Every one of them started with the same free
            assessment you&apos;re looking at right now.
          </p>
        </div>
      </section>

      {/* ───────────────────────── 3 STEPS ───────────────────────── */}
      <section className="bg-mist py-14">
        <div className="mx-auto max-w-4xl px-4">
          <p className="eyebrow text-center">No surprises</p>
          <h2 className="h-section mt-2 text-center">Here&rsquo;s Exactly What Happens Next</h2>
          <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-3">
            {[
              {
                n: '1',
                t: 'Apply below',
                d: '60 seconds, a few questions — so Coach Nate can prepare for YOUR situation, not a generic pitch.',
              },
              {
                n: '2',
                t: 'Your transformation call',
                d: '20 minutes on the phone with Coach Nate. Where you are, where you want to be, and the exact route between them.',
              },
              {
                n: '3',
                t: 'Your free InBody scan',
                d: 'A medical-grade body composition scan at the studio — your official baseline. Yours whether you join or not.',
              },
            ].map((s) => (
              <div key={s.n} className="rounded-xl bg-white p-6 shadow-card">
                <p className="font-display text-4xl font-black text-fbblue">{s.n}</p>
                <p className="mt-2 font-display text-lg font-extrabold uppercase tracking-wide">
                  {s.t}
                </p>
                <p className="mt-2 text-graphite/80">{s.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ───────────────────────── PROMISE + FINAL CTA ───────────────────────── */}
      <section className="bg-fbblue py-14 text-white">
        <div className="mx-auto max-w-3xl px-4 text-center">
          <p className="font-display text-xs font-extrabold uppercase tracking-[0.22em] text-white/80">
            Our promise, in writing
          </p>
          <h2 className="h-section mt-2">The 90-Day Fit Body Promise</h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-white/90">
            Do your part, and the results are guaranteed. Complete your first 90 days and if
            your InBody scan doesn&apos;t show measurable improvement, we&apos;ll coach you{' '}
            <span className="font-bold text-fbyellow">free until it does.</span>
          </p>
          <div className="mt-8">
            <CtaButton href={dest} sub="Free InBody Success Scan included · Coach Nate personally reviews every application">
              {CTA_LABEL}
            </CtaButton>
          </div>
        </div>
      </section>

      <StickyCta href={dest} label="Apply For Your Free Assessment →" revealAfter={0.25} />
    </main>
  );
}
