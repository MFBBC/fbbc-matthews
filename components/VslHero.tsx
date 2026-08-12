'use client';

import { useEffect, useRef, useState } from 'react';
import VslPlayer from '@/components/VslPlayer';
import { CtaButton, StickyCta, TrustStrip } from '@/components/Cta';
import { getWatchDepth } from '@/lib/tracking';
import type { Variant } from '@/lib/flags';

const CTA_LABEL = 'Apply For Your Free Transformation Assessment →';

/**
 * Everything on Page 1, in spec order. Two behaviors live here:
 *
 * 1. Safety net: if the visitor scrolls past the video without ever playing it,
 *    reveal the truncated mirror-moment hook + the same CTA.
 * 2. skipPlan A/B: variant B + prior watch depth >= 75% → CTA goes to /apply
 *    (retargeting traffic that already watched doesn't need the letter again).
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

  // Reveal the hook once the area below the video enters view without a play.
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
    <main className="mx-auto max-w-3xl px-4 pb-16 pt-10 md:pt-16">
      {/* Qualification pre-headline */}
      <p className="eyebrow mb-4 text-center">
        For women in Matthews, Stallings &amp; South Charlotte who are done starting over
      </p>

      {headlineVariant === 'a' ? (
        <>
          <h1 className="h-display text-center">
            The Reason Nothing Has Worked <em className="normal-case italic">Isn’t You.</em>{' '}
            Watch This.
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-center text-lg text-steel">
            In the next 4 minutes, Coach Nate reveals the 3 missing pieces behind every lasting
            transformation in his gym — and why every program you&apos;ve tried was missing at
            least two of them.
          </p>
        </>
      ) : (
        <>
          {/* Variant B — mirror-moment first, callout second (VSL deployment notes) */}
          <h1 className="h-display text-center">
            Somewhere In The Middle Of Taking Care Of Everyone Else,{' '}
            <em className="normal-case italic">You Disappeared From Your Own List.</em>
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-center text-lg text-steel">
            It was never you. In the next 4 minutes, Coach Nate reveals the 3 missing pieces
            behind every lasting transformation in his gym — and why every program you&apos;ve
            tried was missing at least two of them.
          </p>
        </>
      )}

      <div className="mt-8">
        <VslPlayer onPlay={onPlay} />
      </div>

      <div className="mt-8">
        <CtaButton href={dest} sub="Takes 60 seconds · No credit card · No obligation">
          {CTA_LABEL}
        </CtaButton>
      </div>

      <div className="mt-10 border-t border-line pt-8">
        <TrustStrip />
      </div>

      {/* Safety net for non-watchers — truncated mirror-moment paragraph + same CTA */}
      <div ref={sentinel} aria-hidden className="h-px" />
      {showSafetyNet && !played && (
        <section className="mt-12 rounded-2xl bg-sand p-6 md:p-8">
          <p className="eyebrow mb-3">Not a video person? Read this instead</p>
          <p className="text-lg leading-relaxed">
            You&apos;ve built a life. A family, a career, people who count on you. Somewhere in
            the middle of taking care of everyone else, you disappeared from your own list. And
            every time it didn&apos;t stick, a little voice asked:{' '}
            <span className="mark-highlight font-semibold">&ldquo;Is this just who I am now?&rdquo;</span>{' '}
            It&apos;s not. And it never was you.
          </p>
          <div className="mt-6">
            <CtaButton href={dest}>{CTA_LABEL}</CtaButton>
          </div>
        </section>
      )}

      <StickyCta href={dest} label="Apply For Your Free Assessment →" revealAfter={0.25} />
    </main>
  );
}
