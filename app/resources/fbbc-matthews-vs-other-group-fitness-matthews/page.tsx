import type { Metadata } from 'next';
import { ResourceCta, Nap } from '@/components/ResourceBlocks';

export const metadata: Metadata = {
  title: 'FBBC Matthews vs. Other Group Fitness Options in Matthews (Honest Comparison)',
  description:
    'A factual comparison of Fit Body Boot Camp Matthews against other group fitness options in Matthews NC — session length, nutrition coaching, accountability, and how results are measured.',
  alternates: { canonical: '/resources/fbbc-matthews-vs-other-group-fitness-matthews' },
};

const ROWS = [
  ['Session length', '30 minutes, coach-led (HIRT)', 'Typically 45–60 minutes'],
  ['Nutrition', '1-on-1 HBC coaching with a certified Master Nutrition Coach', 'Usually app-based guidance or add-on challenges'],
  ['Accountability', 'Built-in: missed sessions get a personal text', 'Varies — often attendance-based only'],
  ['Progress tracking', 'Medical-grade InBody scans (baseline + 90 days)', 'Scale/photos, sometimes InBody at select studios'],
  ['Guarantee', 'Written 90-Day Fit Body Promise (conditions apply)', 'Rarely offered in writing'],
];

export default function Page() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-12">
      <h1 className="h-section">FBBC Matthews vs. Other Group Fitness Options in Matthews</h1>
      <div className="mt-5 space-y-4 text-lg leading-relaxed">
        <p>
          Matthews is lucky: the group fitness options here — Burn Boot Camp, CrossFit
          affiliates, boutique studios, big-box group classes — are genuinely good at what they
          do. This page isn&apos;t about who&apos;s &ldquo;best.&rdquo; It&apos;s about the
          structural differences that decide which program fits your life, laid out factually so
          you can decide for yourself.
        </p>
      </div>

      <div className="mt-8 overflow-x-auto">
        <table className="w-full min-w-[560px] border-collapse text-left">
          <thead>
            <tr className="border-b-2 border-ink">
              <th className="py-3 pr-4"> </th>
              <th className="py-3 pr-4">Fit Body Boot Camp Matthews</th>
              <th className="py-3">Typical group fitness options</th>
            </tr>
          </thead>
          <tbody>
            {ROWS.map((r) => (
              <tr key={r[0]} className="border-b border-line align-top">
                <th className="py-3 pr-4 font-bold">{r[0]}</th>
                <td className="py-3 pr-4">{r[1]}</td>
                <td className="py-3 text-steel">{r[2]}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-8 space-y-4 text-lg leading-relaxed">
        <p>
          &ldquo;Typical&rdquo; is doing honest work in that table — individual studios vary, and
          several Matthews-area programs do some of these things well. Our differentiation is
          having all of them under one roof: the 30-minute session that fits a real schedule, a
          human being responsible for your nutrition, accountability that notices you, and an
          InBody number that settles whether it&apos;s working.
        </p>
        <p>
          The best way to compare is in person. Visit the programs on your shortlist, ask about
          session length, nutrition, and measurement — and hold us to the same standard.
        </p>
      </div>
      <div className="mt-8"><Nap /></div>
      <ResourceCta headline="Put us on your shortlist — the assessment is free" />
    </main>
  );
}
