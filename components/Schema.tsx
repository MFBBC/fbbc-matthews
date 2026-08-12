import { BIZ, SITE_URL } from '@/lib/business';

export function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

/** LocalBusiness/ExerciseGym — NAP exactly matches the Google Business Profile. */
export function GymSchema() {
  return (
    <JsonLd
      data={{
        '@context': 'https://schema.org',
        '@type': 'ExerciseGym',
        name: BIZ.name,
        url: SITE_URL,
        telephone: BIZ.phoneE164,
        address: {
          '@type': 'PostalAddress',
          streetAddress: BIZ.street,
          addressLocality: BIZ.city,
          addressRegion: BIZ.state,
          postalCode: BIZ.zip,
          addressCountry: 'US',
        },
        geo: { '@type': 'GeoCoordinates', latitude: BIZ.geo.lat, longitude: BIZ.geo.lng },
        aggregateRating: {
          '@type': 'AggregateRating',
          ratingValue: BIZ.rating.value,
          reviewCount: BIZ.rating.count,
          bestRating: '5',
        },
        areaServed: ['Matthews NC', 'Stallings NC', 'South Charlotte NC'],
        priceRange: '$$',
      }}
    />
  );
}

export function VideoSchema() {
  return (
    <JsonLd
      data={{
        '@context': 'https://schema.org',
        '@type': 'VideoObject',
        name: 'The 3 Missing Pieces Behind Every Lasting Transformation',
        description:
          "Coach Nate reveals the 3 missing pieces behind every lasting transformation in his gym — and why every program you've tried was missing at least two of them.",
        thumbnailUrl: `${SITE_URL}${process.env.NEXT_PUBLIC_VSL_POSTER || '/images/vsl-poster.jpg'}`,
        uploadDate: '2026-08-01',
        duration: 'PT4M30S',
        publisher: { '@type': 'Organization', name: BIZ.name },
      }}
    />
  );
}

export function FaqSchema({ faqs }: { faqs: { q: string; a: string }[] }) {
  return (
    <JsonLd
      data={{
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: faqs.map((f) => ({
          '@type': 'Question',
          name: f.q,
          acceptedAnswer: { '@type': 'Answer', text: f.a },
        })),
      }}
    />
  );
}
