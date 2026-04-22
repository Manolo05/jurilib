import type { MetadataRoute } from 'next';
import { listLawyers, listSpecialties, listCities } from '@/lib/supabase';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://jurilib.vercel.app';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${SITE_URL}/`, lastModified: now, changeFrequency: 'weekly', priority: 1 },
    { url: `${SITE_URL}/recherche`, lastModified: now, changeFrequency: 'daily', priority: 0.9 },
    { url: `${SITE_URL}/avocat-inscription`, lastModified: now, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${SITE_URL}/comment-ca-marche`, lastModified: now, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${SITE_URL}/faq`, lastModified: now, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${SITE_URL}/mentions-legales`, lastModified: now, changeFrequency: 'yearly', priority: 0.3 },
    { url: `${SITE_URL}/cgu`, lastModified: now, changeFrequency: 'yearly', priority: 0.3 },
    { url: `${SITE_URL}/politique-de-confidentialite`, lastModified: now, changeFrequency: 'yearly', priority: 0.3 },
  ];

  const [{ items }, specs, cities] = await Promise.all([
    listLawyers({}).catch(() => ({ items: [] as Array<{ slug: string }> })),
    listSpecialties().catch(() => [] as { slug: string; label: string }[]),
    listCities().catch(() => [] as string[]),
  ]);

  const lawyerRoutes: MetadataRoute.Sitemap = items.map((l) => ({
    url: `${SITE_URL}/avocat/${l.slug}`,
    lastModified: now,
    changeFrequency: 'weekly',
    priority: 0.8,
  }));

  const specialtyRoutes: MetadataRoute.Sitemap = specs.map((s) => ({
    url: `${SITE_URL}/droit/${s.slug}`,
    lastModified: now,
    changeFrequency: 'weekly',
    priority: 0.7,
  }));

  const cityRoutes: MetadataRoute.Sitemap = cities.map((c) => ({
    url: `${SITE_URL}/ville/${c.toLowerCase()}`,
    lastModified: now,
    changeFrequency: 'weekly',
    priority: 0.7,
  }));

  return [...staticRoutes, ...lawyerRoutes, ...specialtyRoutes, ...cityRoutes];
}
