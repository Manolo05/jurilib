import Link from 'next/link';
import { Search, ShieldCheck, CalendarClock, CreditCard, Star, MapPin } from 'lucide-react';
import { listLawyers, listSpecialties, listCities } from '@/lib/supabase';

export const revalidate = 120;

const SPECIALTY_PILLS = [
  'droit-du-travail',
  'droit-penal',
  'droit-de-la-famille',
  'droit-immobilier',
  'droit-des-affaires',
  'droit-des-etrangers',
];

export default async function Home() {
  const [featured, specialties, cities] = await Promise.all([
    listLawyers({}).catch(() => ({ items: [], total: 0 })),
    listSpecialties().catch(() => []),
    listCities().catch(() => []),
  ]);

  const top = [...featured.items]
    .sort((a, b) => Number(b.ratingAvg) - Number(a.ratingAvg))
    .slice(0, 3);

  const specialtyLabels = new Map(specialties.map((s) => [s.slug, s.label]));

  return (
    <>
      <section className="bg-gradient-to-b from-brand-50 to-white">
        <div className="mx-auto max-w-6xl px-4 py-20 md:py-24">
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 max-w-3xl leading-tight">
            Prenez rendez-vous avec un avocat en quelques clics.
          </h1>
          <p className="mt-4 text-lg text-slate-600 max-w-2xl">
            Jurilib connecte clients et avocats inscrits au barreau&nbsp;:
            disponibilités en temps réel, visio ou présentiel, paiement sécurisé.
          </p>

          <form
            action="/recherche"
            className="mt-8 bg-white rounded-xl shadow-sm border p-2 flex flex-col md:flex-row gap-2 max-w-3xl"
          >
            <select
              name="specialty"
              className="flex-1 px-4 py-3 rounded-lg outline-none bg-transparent"
              defaultValue=""
            >
              <option value="">Toutes les spécialités</option>
              {specialties.map((s) => (
                <option key={s.slug} value={s.slug}>
                  {s.label}
                </option>
              ))}
            </select>
            <select
              name="city"
              className="flex-1 px-4 py-3 rounded-lg outline-none bg-transparent border-t md:border-t-0 md:border-l"
              defaultValue=""
            >
              <option value="">Toute la France</option>
              {cities.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
            <button className="bg-brand-600 text-white rounded-lg px-6 py-3 hover:bg-brand-700 flex items-center justify-center gap-2">
              <Search className="h-4 w-4" /> Rechercher
            </button>
          </form>

          <div className="mt-6 flex flex-wrap gap-2 text-sm">
            {SPECIALTY_PILLS.map((s) => (
              <Link
                key={s}
                href={`/droit/${s}`}
                className="rounded-full bg-white border px-3 py-1 hover:border-brand-500"
              >
                {specialtyLabels.get(s) ?? s.replaceAll('-', ' ')}
              </Link>
            ))}
          </div>

          <p className="mt-10 text-sm text-slate-500">
            Déjà <strong>{featured.total}</strong> avocat{featured.total > 1 ? 's' : ''} vérifié
            {featured.total > 1 ? 's' : ''} dans <strong>{cities.length}</strong> ville
            {cities.length > 1 ? 's' : ''} françaises.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-20 grid md:grid-cols-3 gap-8">
        {[
          { icon: ShieldCheck, title: 'Avocats vérifiés', text: 'Inscription au barreau contrôlée pour chaque profil.' },
          { icon: CalendarClock, title: 'Dispos en temps réel', text: 'Visualisez l’agenda et réservez 24/7.' },
          { icon: CreditCard, title: 'Paiement sécurisé', text: 'Stripe, reçu automatique, facturation claire.' },
        ].map(({ icon: Icon, title, text }) => (
          <div key={title} className="rounded-xl border p-6">
            <Icon className="h-8 w-8 text-brand-600" />
            <h3 className="mt-4 font-semibold">{title}</h3>
            <p className="mt-1 text-sm text-slate-600">{text}</p>
          </div>
        ))}
      </section>

      {top.length > 0 && (
        <section className="mx-auto max-w-6xl px-4 pb-20">
          <div className="flex items-end justify-between">
            <h2 className="text-2xl font-bold">Avocats les mieux notés</h2>
            <Link href="/recherche" className="text-sm text-brand-600 hover:underline">
              Voir tout le réseau →
            </Link>
          </div>
          <div className="mt-6 grid md:grid-cols-3 gap-5">
            {top.map((l) => (
              <Link
                key={l.id}
                href={`/avocat/${l.slug}`}
                className="rounded-xl border bg-white p-5 hover:shadow-md transition"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-semibold">Me {l.user.firstName} {l.user.lastName}</h3>
                    <p className="text-sm text-slate-500 mt-1 flex items-center gap-1">
                      <MapPin className="h-3 w-3" /> {l.city}
                    </p>
                  </div>
                  <span className="flex items-center gap-1 text-sm">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    {Number(l.ratingAvg).toFixed(1)}
                  </span>
                </div>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {l.specialties.slice(0, 2).map((s) => (
                    <span key={s.specialty.slug} className="text-xs bg-brand-50 text-brand-700 rounded-full px-2 py-0.5">
                      {s.specialty.label}
                    </span>
                  ))}
                </div>
                <p className="mt-4 font-semibold text-right">{l.consultationPrice} €</p>
              </Link>
            ))}
          </div>
        </section>
      )}

      {cities.length > 0 && (
        <section className="mx-auto max-w-6xl px-4 pb-20">
          <h2 className="text-2xl font-bold">Trouvez un avocat par ville</h2>
          <p className="mt-2 text-slate-600">
            Disponibilités en cabinet ou en visio dans les plus grandes villes françaises.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            {cities.map((c) => (
              <Link
                key={c}
                href={`/ville/${c.toLowerCase()}`}
                className="rounded-lg border bg-white px-4 py-2 hover:border-brand-500 hover:bg-brand-50 transition"
              >
                Avocat à <strong>{c}</strong>
              </Link>
            ))}
          </div>
        </section>
      )}

      <section className="bg-slate-50 border-t">
        <div className="mx-auto max-w-6xl px-4 py-16 md:flex md:items-center md:justify-between gap-8">
          <div>
            <h2 className="text-2xl font-bold">Vous êtes avocat·e&nbsp;?</h2>
            <p className="mt-2 text-slate-600 max-w-xl">
              Rejoignez la plateforme et développez votre cabinet&nbsp;: agenda
              intégré, visibilité locale, commission uniquement sur rendez-vous honorés.
            </p>
          </div>
          <Link
            href="/avocat-inscription"
            className="mt-6 md:mt-0 inline-block rounded-lg bg-brand-600 text-white px-6 py-3 hover:bg-brand-700 font-medium"
          >
            Rejoindre le réseau
          </Link>
        </div>
      </section>
    </>
  );
}
