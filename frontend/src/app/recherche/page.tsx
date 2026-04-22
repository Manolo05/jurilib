import Link from 'next/link';
import { Star, MapPin, Video, Search } from 'lucide-react';
import { listLawyers, listSpecialties, listCities } from '@/lib/supabase';

type SearchParams = {
  city?: string;
  specialty?: string;
  priceMax?: string;
  ratingMin?: string;
};

export const revalidate = 60;

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

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 grid md:grid-cols-[240px_1fr] gap-8">
      <aside className="md:sticky md:top-6 md:self-start">
        <form action="/recherche" className="space-y-4 rounded-xl border p-5 bg-white">
          <h2 className="font-semibold flex items-center gap-2">
            <Search className="h-4 w-4" /> Filtrer
          </h2>

          <div>
            <label className="block text-xs font-medium text-slate-600">Ville</label>
            <select
              name="city"
              defaultValue={searchParams.city ?? ''}
              className="mt-1 w-full rounded-lg border px-3 py-2 text-sm"
            >
              <option value="">Toutes les villes</option>
              {cities.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-600">Spécialité</label>
            <select
              name="specialty"
              defaultValue={searchParams.specialty ?? ''}
              className="mt-1 w-full rounded-lg border px-3 py-2 text-sm"
            >
              <option value="">Toutes les spécialités</option>
              {specialties.map((s) => (
                <option key={s.slug} value={s.slug}>
                  {s.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-600">Prix max (€)</label>
            <input
              type="number"
              name="priceMax"
              defaultValue={searchParams.priceMax ?? ''}
              placeholder="150"
              className="mt-1 w-full rounded-lg border px-3 py-2 text-sm"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-600">Note minimum</label>
            <select
              name="ratingMin"
              defaultValue={searchParams.ratingMin ?? ''}
              className="mt-1 w-full rounded-lg border px-3 py-2 text-sm"
            >
              <option value="">Toutes</option>
              <option value="4">≥ 4 ★</option>
              <option value="4.5">≥ 4,5 ★</option>
            </select>
          </div>

          <button
            type="submit"
            className="w-full rounded-lg bg-brand-600 text-white py-2 text-sm hover:bg-brand-700"
          >
            Appliquer
          </button>
          <Link href="/recherche" className="block text-center text-xs text-slate-500 hover:underline">
            Réinitialiser les filtres
          </Link>
        </form>
      </aside>

      <div>
        <h1 className="text-2xl font-bold">
          {data.total} avocat{data.total > 1 ? 's' : ''}
          {searchParams.city ? ` à ${searchParams.city}` : ''}
          {searchParams.specialty
            ? ` en ${(specialties.find((s) => s.slug === searchParams.specialty)?.label ?? searchParams.specialty).toLowerCase()}`
            : ''}
        </h1>

        <div className="mt-6 grid sm:grid-cols-2 xl:grid-cols-3 gap-5">
          {data.items.map((l) => (
            <Link
              key={l.id}
              href={`/avocat/${l.slug}`}
              className="rounded-xl border bg-white p-5 hover:shadow-md transition"
            >
              <div className="flex items-start justify-between">
                <div>
                  <h2 className="font-semibold text-lg">Me {l.user.firstName} {l.user.lastName}</h2>
                  <p className="text-sm text-slate-500 mt-1 flex items-center gap-1">
                    <MapPin className="h-3 w-3" /> {l.city} · {l.barAssociation}
                  </p>
                </div>
                <span className="flex items-center gap-1 text-sm">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  {Number(l.ratingAvg).toFixed(1)} ({l.ratingCount})
                </span>
              </div>
              <div className="mt-3 flex flex-wrap gap-1.5">
                {l.specialties.map((s) => (
                  <span key={s.specialty.slug} className="text-xs bg-brand-50 text-brand-700 rounded-full px-2 py-0.5">
                    {s.specialty.label}
                  </span>
                ))}
              </div>
              <div className="mt-4 flex items-center justify-between">
                <span className="text-sm text-slate-600 flex items-center gap-1">
                  <Video className="h-4 w-4" /> Visio dispo
                </span>
                <span className="font-semibold">{l.consultationPrice} € / 30 min</span>
              </div>
            </Link>
          ))}
        </div>

        {data.items.length === 0 && (
          <p className="mt-10 text-slate-500">
            Aucun avocat trouvé. Essayez d&rsquo;élargir votre recherche.
          </p>
        )}
      </div>
    </div>
  );
}
