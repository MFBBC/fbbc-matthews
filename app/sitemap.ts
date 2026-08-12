import type { MetadataRoute } from 'next';
import { SITE_URL } from '@/lib/business';

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = [
    '', // VSL page — indexed
    '/plan', // indexed
    '/resources',
    '/resources/gym-in-matthews-nc',
    '/resources/gym-in-stallings-nc',
    '/resources/gym-in-south-charlotte',
    '/resources/burn-boot-camp-alternatives-matthews',
    '/resources/fbbc-matthews-vs-other-group-fitness-matthews',
    '/resources/faq/too-out-of-shape-for-boot-camp',
    '/resources/faq/how-long-are-sessions',
    '/resources/faq/why-would-this-time-be-different',
    '/resources/faq/how-much-does-fit-body-boot-camp-cost',
  ];
  return pages.map((p) => ({
    url: `${SITE_URL}${p}`,
    lastModified: new Date(),
    changeFrequency: p === '' || p === '/plan' ? 'weekly' : 'monthly',
    priority: p === '' ? 1 : p === '/plan' ? 0.9 : 0.6,
  }));
}
