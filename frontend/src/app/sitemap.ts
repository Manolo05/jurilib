import type { MetadataRoute } from 'next';
import { listLawyers } from '@/lib/supabase';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://jurilib.vercel.app';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${SITE_URL}/`, lastModified: now, changeFrequency: 'weekly', priority: 1 },
    { url: `${SITE_URL}/recherche`, lastModified: now, changeFrequency: 'daily', priority: 0.9 },
    { url: `${SITE_URL}/avocat-inscription`, lastModified: now, changeFrequency: 'monthly', priority: 0.6 },
  ];

  const { items } = await listLawyers({}).catch(() => ({ items: [] as Array<{ slug: string }> }));
  const lawyerRoutes: MetadataRoute.Sitemap = items.map((l) => ({
    url: `${SITE_URL}/avocat/${l.slug}`,
    lastModified: now,
    changeFrequency: 'weekly',
    priority: 0.8,
  }));

  return [...staticRoutes, ...lawyerRoutes];
}
