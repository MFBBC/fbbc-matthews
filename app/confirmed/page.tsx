import type { Metadata } from 'next';
import ConfirmedContent from '@/components/ConfirmedContent';

export const metadata: Metadata = {
  title: 'Your Call Is Booked | Fit Body Boot Camp Matthews',
  robots: { index: false, follow: false },
};

/** Page 5 — fires CallBooked, pre-sells the call with member videos, cuts no-shows. */
export default function ConfirmedPage() {
  return <ConfirmedContent />;
}
