import type { Metadata } from 'next';
import BookingEmbed from '@/components/BookingEmbed';
import BrandHeader from '@/components/BrandHeader';

export const metadata: Metadata = {
  title: 'Book Your Free Transformation Call | Fit Body Boot Camp Matthews',
  robots: { index: false, follow: false },
};

/**
 * v6 — with the quiz removed, THIS is the conversion moment, so it carries the
 * offer stack + risk reversal + honest scarcity right beside the calendar.
 * GHL owns all availability; its embedded form captures name/phone/email.
 * Never build custom scheduling logic.
 */
export default function BookPage() {
  return (
    <>
      <BrandHeader />
      <main className="mx-auto max-w-2xl px-4 pb-16 pt-10">
        <p className="eyebrow mb-3 text-center">Free · 20 minutes · From your couch</p>
        <h1 className="h-section text-center">
          Pick A Time. Leave With A Plan.
        </h1>
        <p className="mx-auto mt-4 max-w-lg text-center text-lg text-graphite/80">
          The calendar below shows Coach Nate&rsquo;s real availability — he personally takes
          every call, so when a week&rsquo;s slots are gone, they&rsquo;re gone.
        </p>

        <div className="mt-8">
          <BookingEmbed />
        </div>

        {/* Offer stack — what booking actually gets them, as named components */}
        <div className="mx-auto mt-10 max-w-lg">
          <p className="eyebrow text-center">Here&rsquo;s everything your free call includes</p>
          <ul className="mt-4 space-y-3">
            <li className="rounded-xl bg-mist p-4">
              <p className="font-display font-extrabold uppercase tracking-wide">
                1 · Your Transformation Roadmap
              </p>
              <p className="mt-1 text-graphite/80">
                Where you are, where you want to be, and the exact route between them — built
                around your schedule, not a template.
              </p>
            </li>
            <li className="rounded-xl bg-mist p-4">
              <p className="font-display font-extrabold uppercase tracking-wide">
                2 · Your InBody Success Scan
              </p>
              <p className="mt-1 text-graphite/80">
                A medical-grade body composition scan at the studio — body fat %, muscle mass,
                metabolic rate. Yours whether you join or not.
              </p>
            </li>
            <li className="rounded-xl bg-mist p-4">
              <p className="font-display font-extrabold uppercase tracking-wide">
                3 · The Straight Answer
              </p>
              <p className="mt-1 text-graphite/80">
                If we&rsquo;re not the right fit, Coach Nate tells you that too — and points you
                at what would work instead. Zero pressure is the whole point of doing this by
                phone.
              </p>
            </li>
          </ul>
          <p className="mt-4 text-center font-bold">
            Total cost: <span className="text-fbblue">$0.</span> Worst case, you lose 20
            minutes and gain a plan.
          </p>
        </div>

        <div className="mx-auto mt-8 max-w-lg rounded-xl bg-ink p-5 text-center text-white">
          <p className="font-display font-extrabold uppercase tracking-wide text-fbyellow">
            After you book
          </p>
          <p className="mt-2 text-white/90">
            Watch for a text from Coach Nate confirming your time. Life happens — if you need
            to move it, reply to that text and pick a new slot. Just don&rsquo;t disappear on
            yourself again.
          </p>
        </div>
      </main>
    </>
  );
}
