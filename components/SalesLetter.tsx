import Image from 'next/image';
import { CtaButton } from '@/components/Cta';
import TransformationCarousel from '@/components/TransformationCarousel';
import { BIZ } from '@/lib/business';

const FAQS = [
  {
    q: "I'm too out of shape for a boot camp.",
    a: 'The name is the worst thing about it. Every exercise has a modified version for every level, and half our members started with zero experience. Someone brand new starts every single week — you will never be the only beginner in the room.',
  },
  {
    q: "I don't have time.",
    a: "Sessions are 30 minutes, with times through the morning and evening. It's less time than the show you're half-watching right now.",
  },
  {
    q: "I've failed before. Why would this be different?",
    a: "Because you've never had all three pieces at once — the workout, the nutrition, and people who notice when you don't show up. You've been trying to do alone what was always meant to be done together.",
  },
  {
    q: 'What does it cost?',
    a: "That depends on the plan we build together — which is exactly what the free assessment is for. What we can promise: you'll know every number before you decide anything, and nobody will pressure you.",
  },
];

export { FAQS };

const CTA = 'Book My Free Transformation Call \u2192';

/**
 * The full approved sales letter, in spec order. Every CTA → /book (quiz removed v6).
 * Rendered on the homepage below the VSL hero (single-page funnel).
 */
export default function SalesLetter() {
  return (
    <div className="pb-10">
      {/* ── Offer breakdown ─────────────────────────────────────────── */}
        <section className="mx-auto max-w-3xl px-4 pt-12">
          <p className="eyebrow mb-3 text-center">Not a sales pitch. A plan — free either way.</p>
          <h1 className="h-display text-center">
            Everything You Get When You Book — Free
          </h1>
          <ul className="mt-8 space-y-5">
            <li className="rounded-2xl border border-line bg-white p-5 shadow-sm">
              <p>
                <strong>Your personal transformation roadmap</strong> — 20 minutes on the phone
                with Coach Nate: where you are, where you want to be, and the exact route between
                them. No drive, no gym-lobby ambush — just answers.
              </p>
            </li>
            <li className="rounded-2xl border border-line bg-white p-5 shadow-sm">
              <p>
                <strong>A free InBody Success Scan at the studio</strong> — after your call,
                you&apos;re invited in for a medical-grade body composition scan (body fat %,
                muscle mass, metabolic rate — a $45+ value at a clinic). Yours whether you join
                or not.
              </p>
            </li>
            <li className="rounded-2xl border border-line bg-white p-5 shadow-sm">
              <p>
                <strong>A straight answer</strong> — if we&apos;re not the right fit, Coach Nate
                will tell you and point you toward what is.
              </p>
            </li>
          </ul>
        </section>

        {/* ── Pain section ────────────────────────────────────────────── */}
        <section className="mx-auto max-w-3xl px-4 pt-16">
          <p className="eyebrow mb-3">Sound familiar?</p>
          <h2 className="h-section">You Dropped Off Your Own List</h2>
          <div className="mt-5 space-y-4 text-lg leading-relaxed">
            <p>
              You&apos;ve built a life. A family, a career, people who count on you. Somewhere in
              the middle of taking care of everyone else, you disappeared from your own list.
            </p>
            <p>
              You&apos;ve tried the big-box gym — wandered around, felt watched, quietly stopped
              going by February. You&apos;ve tried the apps, the diets, the Monday restarts. And
              every time it didn&apos;t stick, a little voice asked:
            </p>
            <p className="text-xl font-semibold">
              &ldquo;Is this just <span className="mark-highlight">who I am now?</span>&rdquo;
            </p>
            <p>
              It&apos;s not. And it never was you. Every one of those programs was missing the
              three things a real transformation requires. You didn&apos;t fail them —{' '}
              <strong>they failed you.</strong>
            </p>
          </div>
        </section>

        {/* ── The 3 Missing Pieces ────────────────────────────────────── */}
        <section className="mt-16 bg-ink px-4 py-14 text-white">
          <div className="mx-auto max-w-3xl">
            <p className="eyebrow mb-3 text-white/60">The secret</p>
            <h2 className="h-section">
              The 3 Missing Pieces (And How We Built a Gym Around Them)
            </h2>
            <div className="mt-8 space-y-8">
              <div className="border-l-2 border-white/25 pl-5">
                <p className="eyebrow text-white/60">Piece 01 — The Workout</p>
                <h3 className="mt-1 font-display text-2xl font-bold uppercase">
                  The Afterburn Effect
                </h3>
                <p className="mt-2 leading-relaxed text-white/85">
                  30 minutes. Coach-led. Zero guesswork. High-intensity intervals plus strategic
                  active rest keep your metabolism elevated for up to 36 hours after you leave.
                  You&apos;ll burn fat Tuesday night from Monday morning&apos;s session.
                </p>
              </div>
              <div className="border-l-2 border-white/25 pl-5">
                <p className="eyebrow text-white/60">Piece 02 — The Nutrition</p>
                <h3 className="mt-1 font-display text-2xl font-bold uppercase">HBC Nutrition</h3>
                <p className="mt-2 leading-relaxed text-white/85">
                  Nutrition that treats you like a human being. No banned foods, no punishment
                  for a birthday dinner — real flexibility for a real life. But flexible
                  doesn&apos;t mean soft: we hold you to your goals and build them to be
                  permanent, so this is the last time you ever start over.
                </p>
              </div>
              <div className="border-l-2 border-white/25 pl-5">
                <p className="eyebrow text-white/60">Piece 03 — The People</p>
                <h3 className="mt-1 font-display text-2xl font-bold uppercase">
                  World-Class Accountability
                </h3>
                <p className="mt-2 leading-relaxed text-white/85">
                  When you don&apos;t show up, someone notices. Someone texts you. You&apos;re
                  surrounded by people cheering your name on your hardest day. It&apos;s the
                  piece no app can copy — and the one that makes everything else stick for life.
                </p>
              </div>
            </div>
            <div className="mt-10">
              <CtaButton href="/book">Book My Free Transformation Call →</CtaButton>
            </div>
          </div>
        </section>

        {/* ── Transformations ─────────────────────────────────────────── */}
        <section className="mx-auto max-w-4xl px-4 pt-16">
          <p className="eyebrow mb-3 text-center">Real people. Real numbers.</p>
          <h2 className="h-section text-center">Real Fit Body Transformations</h2>
          <div className="mt-8">
            <TransformationCarousel />
          </div>
          <p className="mx-auto mt-6 max-w-2xl text-center text-steel">
            Backed by the brand behind <strong>hundreds of locations worldwide</strong> — and
            tens of thousands of transformations and counting.
          </p>
          <p className="mx-auto mt-2 max-w-2xl text-center text-sm text-steel">
            That's 417 pounds lost between the six people on this page. Results vary by individual. What doesn&apos;t vary: every one of them started with
            the same free call you&apos;re looking at right now.
          </p>
          <div className="mt-8">
            <CtaButton href="/book">Book My Free Transformation Call →</CtaButton>
          </div>
        </section>

        {/* ── Reviews ─────────────────────────────────────────────────── */}
        <section className="mx-auto max-w-3xl px-4 pt-16">
          <p className="eyebrow mb-3 text-center">From our Google reviews — 5.0 stars</p>
          <h2 className="h-section text-center">
            What Members Say When We&apos;re Not in the Room
          </h2>
          <div className="mt-8 space-y-4">
            {[
              {
                quote:
                  "It truly has become my favorite part of my day… it's the community that keeps me coming back.",
                name: 'Nikki',
              },
              {
                quote:
                  'The first gym I have ever been able to stay consistent with. The coaches know everyone by name.',
                name: 'Allie',
              },
              {
                quote:
                  "The coaches hype you up during every single class… 30 minutes and you feel like you've done a 60-minute workout.",
                name: 'Eunice',
              },
            ].map((r) => (
              <blockquote key={r.name} className="rounded-2xl border border-line bg-white p-5 shadow-sm">
                <p className="text-star" aria-hidden>
                  ★★★★★
                </p>
                <p className="mt-2 text-lg">&ldquo;{r.quote}&rdquo;</p>
                <footer className="mt-2 text-sm text-steel">{r.name} · Google review</footer>
              </blockquote>
            ))}
          </div>
        </section>

        {/* ── Coach Nate ──────────────────────────────────────────────── */}
        <section className="mx-auto max-w-3xl px-4 pt-16">
          <div className="overflow-hidden rounded-2xl bg-sand">
            {/* Real action shot (shot-list.md item 1) — replaced the placeholder 2026-08-20. */}
            <div className="relative w-full bg-line" style={{ aspectRatio: '3 / 2' }}>
              <Image
                src="/images/coach-nate.jpg"
                alt="Coach Nate coaching a member through a plank during a 30-minute session at Fit Body Boot Camp Matthews"
                fill
                loading="lazy"
                sizes="(max-width: 768px) 100vw, 768px"
                className="object-cover"
              />
            </div>
            <div className="p-6 md:p-8">
              <p className="eyebrow mb-3">Who you&apos;ll be sitting with</p>
              <h2 className="h-section">Meet Coach Nate</h2>
              <div className="mt-4 space-y-4 leading-relaxed">
                <p>
                  I&apos;m Nate — owner and head coach at Fit Body Boot Camp Matthews, husband,
                  and dad. I opened this gym because I watched the fitness industry sell the same
                  broken promises to the same good people, year after year, and blame{' '}
                  <em>them</em> when it didn&apos;t work.
                </p>
                <p>
                  My job isn&apos;t to yell at you. It&apos;s to build you a plan you can
                  actually live with — and then make sure you&apos;re never doing it alone.
                </p>
                <p className="kicker-bar font-semibold">
                  When you apply below, you&apos;re not getting a salesperson. You&apos;re
                  getting me.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ── What happens next ───────────────────────────────────────── */}
        {/* Mist chapter-band: breaks the long white stretch between the proof
            sections and the FAQ (mobile thumb-scroll relief). */}
        <section className="mt-16 border-y border-line bg-mist px-4 py-14">
          <div className="mx-auto max-w-3xl">
            <p className="eyebrow mb-3">No surprises</p>
            <h2 className="h-section">Here&apos;s Exactly What Happens Next</h2>
            <ol className="mt-8 space-y-8">
              <li className="flex gap-4">
                <span
                  className="font-display text-4xl font-black leading-none text-fbblue"
                  aria-hidden
                >
                  01
                </span>
                <div>
                  <h3 className="font-display text-xl font-bold uppercase">Apply below</h3>
                  <p className="mt-1 leading-relaxed">
                    60 seconds, a few questions — so we make your time count and Coach Nate can
                    prepare for <em>your</em> situation. Then grab a call time that works for you.
                  </p>
                </div>
              </li>
              <li className="flex gap-4">
                <span
                  className="font-display text-4xl font-black leading-none text-fbblue"
                  aria-hidden
                >
                  02
                </span>
                <div>
                  <h3 className="font-display text-xl font-bold uppercase">
                    Your Transformation Call
                  </h3>
                  <p className="mt-1 leading-relaxed">
                    20 minutes on the phone with Coach Nate — from your couch, your car, your lunch
                    break. You&apos;ll talk about where you are, where you want to be, and he&apos;ll
                    map the exact plan to bridge the gap. You decide from there: if it&apos;s a fit,
                    you pick your start date. If it&apos;s not, he&apos;ll say so — zero pressure.
                  </p>
                </div>
              </li>
              <li className="flex gap-4">
                <span
                  className="font-display text-4xl font-black leading-none text-fbblue"
                  aria-hidden
                >
                  03
                </span>
                <div>
                  <h3 className="font-display text-xl font-bold uppercase">
                    Your InBody Success Scan
                  </h3>
                  <p className="mt-1 leading-relaxed">
                    Then come meet us. Your first studio visit starts with a free medical-grade
                    InBody scan — your official baseline: body fat %, muscle mass, metabolic rate.
                    It&apos;s the line in the sand your whole transformation gets measured against.
                  </p>
                </div>
              </li>
            </ol>
          </div>
        </section>

        {/* ── FAQ ─────────────────────────────────────────────────────── */}
        <section className="mx-auto max-w-3xl px-4 pt-16">
          <p className="eyebrow mb-3">The honest answers</p>
          <h2 className="h-section">What You&apos;re Probably Wondering</h2>
          <div className="mt-8 space-y-6">
            {FAQS.map((f) => (
              <div key={f.q} className="border-l-2 border-line pl-4">
                <h3 className="text-lg font-bold">&ldquo;{f.q}&rdquo;</h3>
                <p className="mt-1 leading-relaxed text-steel">{f.a}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── 90-Day Promise ──────────────────────────────────────────── */}
        <section className="mx-auto max-w-3xl px-4 pt-16">
          <div className="rounded-2xl border-2 border-ink p-6 md:p-8">
            <p className="eyebrow mb-3">Our promise, in writing</p>
            <h2 className="h-section">The 90-Day Fit Body Promise</h2>
            <div className="mt-4 space-y-4 leading-relaxed">
              <p>
                <strong>Do your part, and the results are guaranteed.</strong> Complete your
                first 90 days — train with us at least 3 times per week and track your nutrition
                in our app — and if your InBody scan doesn&apos;t show measurable improvement in
                your body composition, we&apos;ll coach you <strong>free until it does.</strong>
              </p>
              <p>
                Why the conditions? Because we&apos;re not selling magic — we&apos;re selling a
                system. Show up, log your food, and the system works. Every check-in and every
                scan is tracked, so there&apos;s no guessing and no arguing with the data.
                That&apos;s a promise we can put in writing because we&apos;ve never had to break
                it for someone who did the work.
              </p>
            </div>
          </div>
        </section>

        {/* ── Identity close ──────────────────────────────────────────── */}
        <section className="mx-auto max-w-3xl px-4 pb-8 pt-16">
          <p className="eyebrow mb-3 text-center">One question left</p>
          <h2 className="h-display text-center">A Year From Now, You&apos;ll Be Somewhere.</h2>
          <p className="mx-auto mt-5 max-w-2xl text-center text-lg leading-relaxed">
            That&apos;s guaranteed. The only question is whether you&apos;re in the same place —
            or standing where you actually want to be. The woman who keeps promises to herself,
            who has energy left at 8 PM, who takes up space on purpose —{' '}
            <strong>she isn&apos;t someone you have to invent. She&apos;s someone you get back.</strong>
          </p>
          <div className="mt-8">
            <CtaButton
              href="/book"
              sub="Free InBody Success Scan included · Coach Nate personally reviews every application"
            >
              {CTA}
            </CtaButton>
          </div>
        </section>

    </div>
  );
}
