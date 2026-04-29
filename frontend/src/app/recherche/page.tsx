import Link from 'next/link';
import type { Metadata } from 'next';
import { Star, MapPin, Video, Search, SlidersHorizontal } from 'lucide-react';
import { listLawyers, listSpecialties, listCities } from '@/lib/supabase';

type SearchParams = {
  city?: string;
  specialty?: string;
  priceMax?: string;
  ratingMin?: string;
};

export const revalidate = 60;

export const metadata: Metadata = {
  title: 'Trouver un avocat',
  description:
    'Recherchez un avocat par ville, sp\u00e9cialit\u00e9 et disponibilit\u00e9. R\u00e9servez en ligne en quelques clics.',
};

export default async function SearchPage({ searchParams }: { searchParams: SearchParams }) {
  const [data, specialties, cities] = await Promise.all([
    listLawyers({
      city: searchParams.city,
      specialty: searchParams.specialty,
      priceMax: searchParams.priceMax ? Number(searchParams.priceMax) : undefined,
      ratingMin: searchParams.ratingMin ? Number(searchParams.ratingMin) : undefined,
    }).catch(() => ({ items: [], total: 0 })),
    listSpecialties().catch(() => []),
    listCities().catch(() => []),
  ]);

  const activeFilters = [searchParams.city, searchParams.specialty, searchParams.priceMax, searchParams.ratingMin].filter(Boolean).length;

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 grid md:grid-cols-[260px_1fr] gap-8">
      {/* SIDEBAR */}
      <aside className="md:sticky md:top-24 md:self-start">
        <form action="/recherche" className="space-y-5 rounded-2xl border border-juri-border bg-juri-card p-6">
          <h2 className="font-serif font-medium text-juri-text flex items-center gap-2">
            <SlidersHorizontal className="h-4 w-4 text-gold" /> Filtrer
          </h2>
          <select name="city" defaultValue={searchParams.city??''} className="w-full rounded-xl bg-juri-bg border border-juri-border text-juri-text px-3 py-2.5 text-sm font-sans">
            <option value="">Toutes les villes</option>
            {cities.map(c=>(<option key={c} value={c}>{c}</option>))}
          </select>
          <select name="specialty" defaultValue={searchParams.specialty??''} className="w-full rounded-xl bg-juri-bg border border-juri-border text-juri-text px-3 py-2.5 text-sm font-sans">
            <option value="">Toutes sp&eacute;cialit&eacute;s</option>
            {specialties.map(s=>(<option key={s.slug} value={s.slug}>{s.label}</option>))}
          </select>
          <button type="submit" className="w-full rounded-xl bg-gradient-to-r from-gold-dark via-gold to-gold-light text-juri-bg py-2.5 text-sm font-sans font-semibold flex items-center justify-center gap-2">
            <Search className="h-4 w-4" /> Rechercher
          </button>
        </form>
      </aside>

      {/* RESULTS */}
      <div>
        <h1 className="text-2xl font-serif font-medium text-juri-text mb-6">
          {data.total} avocat{data.total > 1 ? 's' : ''}
        </h1>
        <div className="grid sm:grid-cols-2 gap-5">
          {data.items.map(l => (
            <Link key={l.id} href={`/avocat/${l.slug}`} className="rounded-2xl border border-juri-border bg-juri-card p-5 hover:border-gold/30 transition-all group">
              <div className="flex items-start justify-between">
                <div>
                  <h2 className="font-serif font-medium text-juri-text group-hover:text-gold transition-colors">Me {l.user.firstName} {l.user.lastName}</h2>
                  <p className="text-sm text-juri-muted mt-1 flex items-center gap-1 font-sans"><MapPin className="h-3 w-3" /> {l.city}</p>
                </div>
                <span className="flex items-center gap-1 text-sm font-sans"><Star className="h-4 w-4 fill-gold text-gold" />{Number(l.ratingAvg).toFixed(1)}</span>
              </div>
              <div className="mt-3 flex flex-wrap gap-1.5">
                {l.specialties.slice(0,2).map(s => (
                  <span key={s.specialty.slug} className="text-xs bg-gold/10 text-gold border border-gold/20 rounded-full px-2 py-0.5 font-sans">{s.specialty.label}</span>
                ))}
              </div>
              <div className="mt-4 flex items-center justify-between pt-3 border-t border-juri-border">
                <span className="text-sm text-juri-muted flex items-center gap-1 font-sans"><Video className="h-4 w-4" /> Visio</span>
                <span className="font-serif font-semibold text-gold">{l.consultationPrice} &euro;</span>
              </div>
            </Link>
          ))}
        </div>
        {data.items.length===0 && (
          <div className="mt-16 text-center">
            <Search className="h-8 w-8 text-juri-muted mx-auto mb-4" />
            <p className="text-juri-muted font-sans">Aucun avocat trouv&eacute;.</p>
          </div>
        )}
      </div>
    </div>
  );
}
