import type { Metadata } from 'next';
import { GymSchema, FaqSchema } from '@/components/Schema';
import BrandHeader from '@/components/BrandHeader';
import FunnelFooter from '@/components/FunnelFooter';
import { CtaButton, StickyCta } from '@/components/Cta';
import SalesLetter, { FAQS } from '@/components/SalesLetter';
import VslPlayer from '@/components/VslPlayer';

export const metadata: Metadata = {
  title: 'Oh, You’re Nosy | Fit Body Boot Camp Matthews',
  description:
    'You came for the gossip and found a gym: book a free Transformation Call at Fit Body Boot Camp Matthews.',
  robots: { index: false, follow: false },
  alternates: { canonical: '/tom' },
};

/**
 * Campaign page: the gag flyer ("TOM. I have proof that you cheated.").
 * The gag hero stands in for VslHero (two heroes would be absurd), pays the
 * joke off in the first screen, then hands straight to the full sales letter.
 * Funny first, warm always, zero shame. Noindex; every CTA goes to /book.
 */
export default function TomPage() {
  return (
    <>
      <GymSchema />
      <FaqSchema faqs={FAQS} />
      <BrandHeader />
      <main>
        {/* ─────────────────── DARK HERO (the gag) ─────────────────── */}
        <section className="bg-ink pb-14 pt-10 text-white md:pt-16">
          <div className="mx-auto max-w-3xl px-4">
            <p className="eyebrow-onDark mb-4 text-center">Caught you.</p>

            <h1 className="h-display text-center">
              OH, YOU&rsquo;RE <span className="text-fbyellow">NOSY.</span>
            </h1>

            <p className="mx-auto mt-5 max-w-xl text-center text-lg text-silver">
              Not the hot tea you were expecting? Give it a second. It&rsquo;s still piping hot.
            </p>

            <p className="mx-auto mt-3 max-w-xl text-center text-sm italic text-silver">
              (Tom, you can breathe. It&rsquo;s only the best gym ad you&rsquo;ve ever seen. Your
              secrets are safe. Mostly.)
            </p>

            {/* The pivot: register shifts from bit to straight talk, into the letter. */}
            <p className="mx-auto mt-6 max-w-xl text-center text-lg text-silver">
              Now the real confession: ours. We built this gym for everyone who quit in
              February. Coached 30-minute workouts. Nutrition that survives birthdays. A crew
              that notices the day you go missing. Quitting was never your character. It was
              your setup.
            </p>

            <p className="mt-4 text-center text-sm font-medium tracking-wide text-silver">
              <span className="text-fbyellow" aria-hidden>★★★★★</span> 5.0 on Google · Matthews, NC
            </p>

            <div className="mt-8">
              <CtaButton
                href="/book"
                dark
                sub="A free Transformation Call: 20 minutes, a real plan, a straight answer. Joined or not, the plan is yours."
              >
                Fine. I&rsquo;ll Turn Myself In →
              </CtaButton>
            </div>
          </div>
        </section>

        {/* ── The VSL, once it exists: hidden until NEXT_PUBLIC_VSL_ID is set ── */}
        {process.env.NEXT_PUBLIC_VSL_ID ? (
          <section className="bg-ink pb-14 text-white">
            <div className="mx-auto max-w-3xl px-4">
              <div className="border-t border-white/15 pt-10">
                <p className="eyebrow-onDark mb-4 text-center">The full confession</p>

                <div className="overflow-hidden rounded-xl ring-2 ring-fbblue">
                  <VslPlayer />
                </div>

                <p className="mx-auto mt-3 max-w-xl text-center text-sm text-silver">
                  Coach Nate explains the 3 missing pieces in 4 minutes 30 seconds. Sound on.
                </p>
              </div>
            </div>
          </section>
        ) : null}

        <SalesLetter />

        <StickyCta href="/book" label="Book My Free Call →" revealAfter={0.25} />
      </main>
      <FunnelFooter />
    </>
  );
}
