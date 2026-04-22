import Link from 'next/link';
import { Star, MapPin, Video } from 'lucide-react';
import { api, LawyerCard } from '@/lib/api';

type SearchParams = {
  city?: string;
  specialty?: string;
  priceMax?: string;
  ratingMin?: string;
};

export default async function SearchPage({ searchParams }: { searchParams: SearchParams }) {
  const qs = new URLSearchParams(searchParams as any).toString();
  const data = await api<{ items: LawyerCard[]; total: number }>(
    `/lawyers${qs ? `?${qs}` : ''}`,
  ).catch(() => ({ items: [], total: 0 }));

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <h1 className="text-2xl font-bold">
        {data.total} avocat{data.total > 1 ? 's' : ''}
        {searchParams.city ? ` à ${searchParams.city}` : ''}
        {searchParams.specialty ? ` en ${searchParams.specialty.replaceAll('-', ' ')}` : ''}
      </h1>

      <div className="mt-6 grid md:grid-cols-2 lg:grid-cols-3 gap-5">
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
        <p className="mt-10 text-slate-500">Aucun avocat trouvé. Essayez d’élargir votre recherche.</p>
      )}
    </div>
  );
}
