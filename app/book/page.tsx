import type { Metadata } from 'next';
import BookingEmbed from '@/components/BookingEmbed';

export const metadata: Metadata = {
  title: 'Book Your Transformation Call | Fit Body Boot Camp Matthews',
  robots: { index: false, follow: false },
};

/**
 * Page 4 — GHL owns all availability. The embed pulls live open slots
 * (that's what prevents double-booking) — never build custom scheduling logic.
 */
export default function BookPage() {
  return (
    <main className="mx-auto max-w-2xl px-4 pb-16 pt-10">
      <p className="eyebrow mb-3 text-center">Application received 🎉 One more step</p>
      <h1 className="h-section text-center">Grab Your Call Time Right Now</h1>
      <p className="mx-auto mt-4 max-w-lg text-center text-lg text-steel">
        20 minutes, on the phone, from your couch. Pick any open slot — the calendar only shows
        times Coach Nate is actually free.
      </p>
      <div className="mt-8">
        <BookingEmbed />
      </div>
      <div className="mx-auto mt-8 max-w-lg rounded-2xl bg-sand p-5 text-center">
        <p className="font-semibold">
          Booked? Watch for a text from Coach Nate confirming your time.
        </p>
        <p className="mt-2 text-sm text-steel">
          Add it to your calendar so nothing bumps it — and remember: your free InBody Success
          Scan happens at your first studio visit.
        </p>
      </div>
    </main>
  );
}
