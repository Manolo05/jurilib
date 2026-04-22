import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Star, MapPin, Award, Video } from 'lucide-react';
import { getLawyerBySlug, listAvailabilities } from '@/lib/supabase';

export const revalidate = 60;

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const l = await getLawyerBySlug(params.slug).catch(() => null);
  if (!l) return { title: 'Avocat — Jurilib' };
  return {
    title: `Me ${l.user.firstName} ${l.user.lastName} — Avocat à ${l.city} | Jurilib`,
    description: l.bio?.slice(0, 160) ?? 'Prenez rendez-vous en ligne.',
  };
}

export default async function LawyerProfile({ params }: { params: { slug: string } }) {
  const l = await getLawyerBySlug(params.slug).catch(() => null);
  if (!l) notFound();

  const availabilities = await listAvailabilities(l.id).catch(() => []);

  return (
    <div className="mx-auto max-w-5xl px-4 py-10 grid md:grid-cols-3 gap-8">
      <div className="md:col-span-2">
        <div className="flex items-start gap-4">
          <div className="h-20 w-20 rounded-full bg-brand-100 flex items-center justify-center text-brand-700 text-xl font-semibold overflow-hidden">
            {l.user.avatarUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={l.user.avatarUrl} alt="" className="h-20 w-20 object-cover" />
            ) : (
              <>{l.user.firstName[0]}{l.user.lastName[0]}</>
            )}
          </div>
          <div>
            <h1 className="text-2xl font-bold">Me {l.user.firstName} {l.user.lastName}</h1>
            <p className="text-slate-500 mt-1 flex items-center gap-1">
              <MapPin className="h-4 w-4" /> {l.city} · {l.barAssociation}
            </p>
            <div className="mt-2 flex items-center gap-4 text-sm">
              <span className="flex items-center gap-1">
                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                {Number(l.ratingAvg).toFixed(1)} ({l.ratingCount} avis)
              </span>
              <span className="flex items-center gap-1">
                <Award className="h-4 w-4" /> {l.yearsExperience} ans d&rsquo;expérience
              </span>
            </div>
          </div>
        </div>

        <h2 className="mt-8 font-semibold">Spécialités</h2>
        <div className="mt-2 flex flex-wrap gap-2">
          {l.specialties.map((s) => (
            <span key={s.specialty.slug} className="bg-brand-50 text-brand-700 rounded-full px-3 py-1 text-sm">
              {s.specialty.label}
            </span>
          ))}
        </div>

        {l.bio && (
          <>
            <h2 className="mt-8 font-semibold">À propos</h2>
            <p className="mt-2 text-slate-700 leading-relaxed">{l.bio}</p>
          </>
        )}
      </div>

      <aside className="rounded-xl border p-5 h-fit sticky top-6">
        <p className="text-2xl font-bold">{l.consultationPrice} €</p>
        <p className="text-sm text-slate-500">Consultation {30} min</p>
        <p className="mt-2 text-sm flex items-center gap-1 text-slate-600">
          <Video className="h-4 w-4" /> Visio disponible
        </p>

        <h3 className="mt-5 font-semibold">Prochaines disponibilités</h3>
        <div className="mt-2 grid grid-cols-2 gap-2">
          {availabilities.slice(0, 6).map((a) => (
            <Link
              key={a.id}
              href={`/reservation?availabilityId=${a.id}`}
              className="rounded-lg border text-center text-sm py-2 hover:border-brand-500"
            >
              {new Date(a.startsAt).toLocaleDateString('fr-FR', { weekday: 'short', day: '2-digit', month: 'short' })}
              <br />
              {new Date(a.startsAt).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}
            </Link>
          ))}
          {availabilities.length === 0 && (
            <p className="col-span-2 text-sm text-slate-500">Aucun créneau disponible pour le moment.</p>
          )}
        </div>
      </aside>
    </div>
  );
}
