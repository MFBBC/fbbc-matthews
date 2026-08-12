import type { Metadata } from 'next';
import { cookies } from 'next/headers';
import { resolveVariant, AB_COOKIES } from '@/lib/flags';
import QuizForm from '@/components/QuizForm';

export const metadata: Metadata = {
  title: 'Apply For Your Free Transformation Assessment | Fit Body Boot Camp Matthews',
  robots: { index: false, follow: false }, // conversion page — keep out of the index
};

export default function ApplyPage() {
  const q1Variant = resolveVariant('q1', cookies().get(AB_COOKIES.q1)?.value);
  return <QuizForm q1Variant={q1Variant} />;
}
