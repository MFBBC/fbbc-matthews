import type { Metadata } from 'next';
export const metadata: Metadata = { title: 'Privacy Policy | Fit Body Boot Camp Matthews', robots: { index: false } };
export default function Privacy() {
  return (
    <main className="mx-auto max-w-2xl px-4 py-16">
      <h1 className="h-section">Privacy Policy</h1>
      <p className="mt-4 text-steel">
        TODO: paste the studio&apos;s privacy policy here (how application data, SMS consent, and
        tracking pixels are used). Placeholder page so footer links resolve.
      </p>
    </main>
  );
}
