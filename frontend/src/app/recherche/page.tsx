import Link from 'next/link';
import { Search, MapPin, Star, SlidersHorizontal, Scale } from 'lucide-react';
import { listLawyers, listSpecialties, listCities } from '@/lib/supabase';

export const metadata = {
  title: 'Trouver un avocat',
  description: 'Recherchez un avocat par sp\u00e9cialit\u00e9, ville et disponibilit\u00e9. R\u00e9servez en ligne en quelques clics.',
};

export default async function RecherchePage({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) {
  const city = searchParams.city ?? '';
  const specialty = searchParams.specialty ?? '';
  const priceMax = searchParams.priceMax ?? '';
  const ratingMin = searchParams.ratingMin ?? '';

  const [result, specialties, cities] = await Promise.all([
    listLawyers({ city, specialty, priceMax, ratingMin }).catch(() => ({ items: [], total: 0 })),
    listSpecialties().catch(() => []),
    listCities().catch(() => []),
  ]);

  const { items: lawyers, total } = result;

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 grid md:grid-cols-[260px_1fr] gap-8">
      {/* SIDEBAR FILTERS */}
      <aside className="md:sticky md:top-24 md:self-start">
        <form
          action="/recherche"
          className="space-y-5 rounded-2xl border border-juri-border bg-juri-card p-6"
        >
          <h2 className="font-serif font-medium text-juri-text flex items-center gap-2">
            <SlidersHorizontal className="h-4 w-4 text-gold" />
            Filtrer
          </h2>

          <div>
            <label className="block text-xs font-sans font-medium text-juri-muted mb-1.5">Ville</label>
            <select
              name="city"
              defaultValue={city}
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
              defaultValue={specialty}
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
              defaultValue={priceMax}
              placeholder="300"
              className="w-full rounded-xl bg-juri-bg border border-juri-border text-juri-text px-3 py-2.5 text-sm font-sans focus:outline-none focus:border-gold/50 transition-all placeholder:text-juri-muted"
            />
          </div>

          <div>
            <label className="block text-xs font-sans font-medium text-juri-muted mb-1.5">Note minimum</label>
            <select
              name="ratingMin"
              defaultValue={ratingMin}
              className="w-full rounded-xl bg-juri-bg border border-juri-border text-juri-text px-3 py-2.5 text-sm font-sans focus:outline-none focus:border-gold/50 transition-all cursor-pointer"
            >
              <option value="">Toutes</option>
              <option value="4">&ge; 4 &star;</option>
              <option value="4.5">&ge; 4,5 &star;</option>
            </select>
          </div>

          <button
            type="submit"
            className="w-full rounded-xl bg-gradient-to-r from-gold-dark via-gold to-gold-light text-juri-bg py-2.5 text-sm font-sans font-semibold hover:shadow-[0_0_30px_rgba(201,168,76,0.3)] active:scale-[0.98] transition-all"
          >
            Appliquer
          </button>

          <Link
            href="/recherche"
            className="block text-center text-xs font-sans text-juri-muted hover:text-gold transition-colors"
          >
            R&eacute;initialiser les filtres
          </Link>
        </form>
      </aside>

      {/* RESULTS */}
      <div>
        <div className="flex items-end justify-between mb-6">
          <h1 className="text-2xl font-serif font-medium text-juri-text">
            {total} avocat{total !== 1 ? 's' : ''}
          </h1>
          {(city || specialty) && (
            <p className="text-sm font-sans text-juri-muted">
              {specialty && specialties.find((s) => s.slug === specialty)?.label}
              {specialty && city && ' \u00e0 '}
              {city}
            </p>
          )}
        </div>

        {lawyers.length > 0 ? (
          <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-5">
            {lawyers.map((l) => (
              <Link
                key={l.id}
                href={'/avocat/' + l.slug}
                className="rounded-2xl border border-juri-border bg-juri-card p-5 hover:border-gold/30 hover:shadow-[0_0_40px_rgba(201,168,76,0.06)] transition-all duration-300 group"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-serif font-medium text-juri-text group-hover:text-gold transition-colors">
                      Me {l.user.firstName} {l.user.lastName}
                    </h3>
                    <p className="text-sm text-juri-muted mt-1 flex items-center gap-1 font-sans">
                      <MapPin className="h-3 w-3" /> {l.city}
                    </p>
                  </div>
                  {Number(l.ratingAvg) > 0 && (
                    <span className="flex items-center gap-1 text-sm font-sans">
                      <Star className="h-4 w-4 fill-gold text-gold" />
                      {Number(l.ratingAvg).toFixed(1)}
                    </span>
                  )}
                </div>

                <div className="mt-3 flex flex-wrap gap-1.5">
                  {l.specialties.slice(0, 2).map((s) => (
                    <span
                      key={s.specialty.slug}
                      className="text-xs bg-gold/10 text-gold border border-gold/20 rounded-full px-2 py-0.5 font-sans"
                    >
                      {s.specialty.label}
                    </span>
                  ))}
                </div>

                <div className="mt-4 flex items-center justify-between">
                  <p className="font-serif font-semibold text-gold">
                    {l.consultationPrice} &euro;
                  </p>
                  <span className="text-xs font-sans text-juri-muted group-hover:text-gold transition-colors">
                    Voir le profil &rarr;
                  </span>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border border-juri-border bg-juri-card p-12 text-center">
            <Scale className="h-12 w-12 text-gold/30 mx-auto" />
            <h2 className="mt-4 font-serif font-medium text-juri-text">Aucun avocat trouv&eacute;</h2>
            <p className="mt-2 text-sm font-sans text-juri-muted max-w-md mx-auto">
              Essayez d&apos;&eacute;largir votre recherche en modifiant les filtres. De nouveaux avocats rejoignent Jurilib chaque semaine.
            </p>
            <Link
              href="/recherche"
              className="mt-6 inline-block rounded-xl bg-gold/10 border border-gold/20 text-gold px-6 py-2.5 font-sans text-sm font-medium hover:bg-gold/20 transition-all"
            >
              R&eacute;initialiser les filtres
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
