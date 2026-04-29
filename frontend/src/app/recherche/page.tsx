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
      {/* SIDEBAR FILTERS */}
      <aside className="md:sticky md:top-24 md:self-start">
        <form action="/recherche" className="space-y-5 rounded-2xl border border-juri-border bg-juri-card p-6">
          <h2 className="font-serif font-medium text-juri-text flex items-center gap-2">
            <SlidersHorizontal className="h-4 w-4 text-gold" /> Filtrer
            {activeFilters > 0 && (
              <span className="ml-auto text-xs bg-gold/10 text-gold border border-gold/20 rounded-full px-2 py-0.5 font-sans">
                {activeFilters}
              </span>
            )}
          </h2>

          <div>
            <label className="block text-xs font-sans font-medium text-juri-muted mb-1.5">Ville</label>
            <select
              name="city"
              defaultValue={searchParams.city ?? ''}
              className="w-full rounded-xl bg-juri-bg border border-juri-border text-juri-text px-3 py-2.5 text-sm font-sans focus:outline-none focus:border-gold/50 transition-all cursor-pointer"
            >
              <option value="">Toutes les villes</option>
              {cities.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-sans font-medium text-juri-muted mb-1.5">Sp&eacute;cialit&eacute;</label>
            <select
              name="specialty"
              defaultValue={searchParams.specialty ?? ''}
              className="w-full rounded-xl bg-juri-bg border border-juri-border text-juri-text px-3 py-2.5 text-sm font-sans focus:outline-none focus:border-gold/50 transition-all cursor-pointer"
            >
              <option value="">Toutes les sp&eacute;cialit&eacute;s</option>
              {specialties.map((s) => (
                <option key={s.slug} value={s.slug}>{s.label}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-sans font-medium text-juri-muted mb-1.5">Prix max (&euro;)</label>
            <input
              type="number"
              name="priceMax"
              defaultValue={searchParams.priceMax ?? ''}
              placeholder="300"
              className="w-full rounded-xl bg-juri-bg border border-juri-border text-juri-text px-3 py-2.5 text-sm font-sans focus:outline-none focus:border-gold/50 transition-all placeholder:text-juri-muted"
            />
          </div>

          <div>
            <label className="block text-xs font-sans font-medium text-juri-muted mb-1.5">Note minimum</label>
            <select
              name="ratingMin"
              defaultValue={searchParams.ratingMin ?? ''}
              className="w-full rounded-xl bg-juri-bg border border-juri-border text-juri-text px-3 py-2.5 text-sm font-sans focus:outline-none focus:border-gold/50 transition-all cursor-pointer"
            >
              <option value="">Toutes</option>
              <option value="3.5">&ge; 3,5 &star;</option>
              <option value="4">&ge; 4 &star;</option>
              <option value="4.5">&ge; 4,5 &star;</option>
            </select>
          </div>

          <button
            type="submit"
            className="w-full rounded-xl bg-gradient-to-r from-gold-dark via-gold to-gold-light text-juri-bg py-2.5 text-sm font-sans font-semibold hover:shadow-[0_0_30px_rgba(201,168,76,0.3)] active:scale-[0.98] transition-all flex items-center justify-center gap-2"
          >
            <Search className="h-4 w-4" /> Rechercher
          </button>

          {activeFilters > 0 && (
            <Link
              href="/recherche"
              className="block text-center text-xs font-sans text-juri-muted hover:text-gold transition-colors"
            >
              R&eacute;initialiser les filtres
            </Link>
          )}
        </form>
      </aside>

      {/* RESULTS */}
      <div>
        <div className="flex items-end justify-between mb-6">
          <h1 className="text-2xl font-serif font-medium text-juri-text">
            {data.total} avocat{data.total > 1 ? 's' : ''}
            {searchParams.city ? ` \u00e0 ${searchParams.city}` : ''}
            {searchParams.specialty
              ? ` en ${(specialties.find((s) => s.slug === searchParams.specialty)?.label ?? searchParams.specialty).toLowerCase()}`
              : ''}
          </h1>
        </div>

        <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-5">
          {data.items.map((l) => (
            <Link
              key={l.id}
              href={`/avocat/${l.slug}`}
              className="rounded-2xl border border-juri-border bg-juri-card p-5 hover:border-gold/30 hover:shadow-[0_0_40px_rgba(201,168,76,0.06)] transition-all duration-300 group"
            >
              <div className="flex items-start justify-between">
                <div>
                  <h2 className="font-serif font-medium text-juri-text group-hover:text-gold transition-colors">
                    Me {l.user.firstName} {l.user.lastName}
                  </h2>
                  <p className="text-sm text-juri-muted mt-1 flex items-center gap-1 font-sans">
                    <MapPin className="h-3 w-3" /> {l.city} &middot; {l.barAssociation}
                  </p>
                </div>
                <span className="flex items-center gap-1 text-sm font-sans">
                  <Star className="h-4 w-4 fill-gold text-gold" />
                  {Number(l.ratingAvg).toFixed(1)}
                  <span className="text-juri-muted">({l.ratingCount})</span>
                </span>
              </div>

              <div className="mt-3 flex flex-wrap gap-1.5">
                {l.specialties.map((s) => (
                  <span
                    key={s.specialty.slug}
                    className="text-xs bg-gold/10 text-gold border border-gold/20 rounded-full px-2 py-0.5 font-sans"
                  >
                    {s.specialty.label}
                  </span>
                ))}
              </div>

              <div className="mt-4 flex items-center justify-between pt-3 border-t border-juri-border">
                <span className="text-sm text-juri-muted flex items-center gap-1 font-sans">
                  <Video className="h-4 w-4" /> Visio dispo
                </span>
                <span className="font-serif font-semibold text-gold">{l.consultationPrice} &euro;</span>
              </div>
            </Link>
          ))}
        </div>

        {data.items.length === 0 && (
          <div className="mt-16 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-juri-card border border-juri-border mb-4">
              <Search className="h-6 w-6 text-juri-muted" />
            </div>
            <p className="text-juri-muted font-sans">Aucun avocat trouv&eacute; pour ces crit&egrave;res.</p>
            <p className="text-sm text-juri-muted font-sans mt-2">Essayez d&rsquo;&eacute;largir votre recherche ou de modifier les filtres.</p>
            <Link
              href="/recherche"
              className="mt-4 inline-block text-sm text-gold hover:text-gold-light transition-colors font-sans"
            >
              R&eacute;initialiser les filtres &rarr;
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
