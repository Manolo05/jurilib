import Link from 'next/link';
import { notFound } from 'next/navigation';
import { MapPin, Star, ChevronRight } from 'lucide-react';
import { listLawyers, listCities, listSpecialties } from '@/lib/supabase';

export const revalidate = 600;

// Contenus rédactionnels par ville — local SEO + ton humain.
const CITY_CONTENT: Record<
  string,
  { intro: string; facts: string[]; nearby: string[] }
> = {
  paris: {
    intro:
      "Paris concentre la plus grande densité d'avocats de France, tous barreaux confondus. Sur Jurilib, trouvez un avocat disponible près de chez vous : 1er arrondissement comme 20ème, rive gauche ou rive droite.",
    facts: [
      'Plus de 30 000 avocats inscrits au Barreau de Paris',
      'Disponibilités en visio pour consulter depuis toute l’Île-de-France',
      'Tribunal judiciaire, Cour d’appel et Conseil d’État accessibles',
    ],
    nearby: ['Boulogne-Billancourt', 'Versailles', 'Nanterre', 'Créteil'],
  },
  lyon: {
    intro:
      "Lyon, deuxième barreau de France, concentre une expertise pointue en droit des affaires, droit immobilier et droit social. Jurilib référence des avocats lyonnais disponibles rapidement.",
    facts: [
      'Plus de 3 000 avocats au Barreau de Lyon',
      'Cour d’appel de Lyon compétente sur la région AURA',
      'Forte expertise en droit du travail et droit des sociétés',
    ],
    nearby: ['Villeurbanne', 'Saint-Étienne', 'Grenoble', 'Bourg-en-Bresse'],
  },
  marseille: {
    intro:
      'À Marseille, les avocats Jurilib couvrent l’ensemble des contentieux : droit pénal, droit du travail, droit de la famille, droit des étrangers. Consultation en cabinet ou en visio.',
    facts: [
      'Barreau de Marseille : plus de 2 000 avocats',
      'Tribunal judiciaire et Cour d’appel d’Aix-en-Provence compétents',
      'Forte demande en droit pénal et droit des étrangers',
    ],
    nearby: ['Aix-en-Provence', 'Toulon', 'Aubagne', 'Martigues'],
  },
  bordeaux: {
    intro:
      "Bordeaux accueille un barreau dynamique, particulièrement actif en droit viticole, droit immobilier et droit des affaires. Jurilib vous aide à trouver un avocat bordelais en quelques clics.",
    facts: [
      'Plus de 1 500 avocats au Barreau de Bordeaux',
      'Expertise reconnue en droit rural et viticole',
      'Cour d’appel de Bordeaux compétente sur la Nouvelle-Aquitaine',
    ],
    nearby: ['Mérignac', 'Pessac', 'Arcachon', 'Libourne'],
  },
  lille: {
    intro:
      'Lille, carrefour du Nord, dispose d’un barreau solide en droit du travail, droit social et droit des affaires. Les avocats Jurilib à Lille vous reçoivent rapidement, en présentiel ou en visio.',
    facts: [
      'Plus de 1 500 avocats au Barreau de Lille',
      'Spécialisation notable en droit social et prud’homal',
      'Cour d’appel de Douai compétente sur les Hauts-de-France',
    ],
    nearby: ['Roubaix', 'Tourcoing', 'Valenciennes', 'Arras'],
  },
  toulouse: {
    intro:
      'Toulouse, ville universitaire, abrite un barreau en croissance, particulièrement présent en droit aéronautique, droit du numérique et droit immobilier. Trouvez votre avocat toulousain sur Jurilib.',
    facts: [
      "Plus de 1 600 avocats au Barreau de Toulouse",
      'Spécialisation en droit de l’aéronautique et du spatial',
      'Cour d’appel de Toulouse compétente sur l’Occitanie ouest',
    ],
    nearby: ['Montauban', 'Albi', 'Colomiers', 'Tarbes'],
  },
};

export async function generateStaticParams() {
  const cities = await listCities().catch(() => []);
  return cities.map((c) => ({ slug: c.toLowerCase() }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }> | { slug: string };
}) {
  const { slug } = await Promise.resolve(params);
  const cities = await listCities().catch(() => []);
  const city = cities.find((c) => c.toLowerCase() === slug);
  if (!city) return { title: 'Ville' };
  return {
    title: `Avocat à ${city} — Jurilib`,
    description: `Trouvez un avocat à ${city} : disponibilités en temps réel, tarifs clairs, consultations en visio ou au cabinet. Plus de 10 spécialités couvertes.`,
    alternates: { canonical: `/ville/${slug}` },
  };
}

export default async function CityLanding({
  params,
}: {
  params: Promise<{ slug: string }> | { slug: string };
}) {
  const { slug } = await Promise.resolve(params);
  const cities = await listCities().catch(() => []);
  const city = cities.find((c) => c.toLowerCase() === slug);
  if (!city) notFound();

  const [{ items }, specs] = await Promise.all([
    listLawyers({ city }),
    listSpecialties().catch(() => []),
  ]);

  // Compter les avocats par spécialité présente dans cette ville
  const specCounts = new Map<string, number>();
  items.forEach((l) =>
    l.specialties.forEach((s) => {
      specCounts.set(s.specialty.slug, (specCounts.get(s.specialty.slug) ?? 0) + 1);
    }),
  );
  const specLabels = new Map(specs.map((s) => [s.slug, s.label]));

  const content = CITY_CONTENT[slug];

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: `Avocats à ${city} — Jurilib`,
    description: content?.intro ?? `Avocats à ${city} disponibles sur Jurilib`,
    address: { '@type': 'PostalAddress', addressLocality: city, addressCountry: 'FR' },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <section className="bg-gradient-to-b from-brand-50 to-white border-b">
        <div className="mx-auto max-w-4xl px-4 py-16">
          <nav className="text-xs text-slate-500 flex items-center gap-1 mb-4">
            <Link href="/" className="hover:text-brand-600">Accueil</Link>
            <ChevronRight className="h-3 w-3" />
            <Link href="/recherche" className="hover:text-brand-600">Trouver un avocat</Link>
            <ChevronRight className="h-3 w-3" />
            <span>{city}</span>
          </nav>
          <h1 className="text-3xl md:text-4xl font-bold text-slate-900">
            Avocat à {city}
          </h1>
          <p className="mt-4 text-lg text-slate-600">
            {content?.intro ??
              `Trouvez un avocat inscrit au barreau près de ${city} sur Jurilib.`}
          </p>
          <div className="mt-6 flex flex-wrap gap-2 text-sm">
            <span className="rounded-full bg-white border px-3 py-1">
              <strong>{items.length}</strong> avocat{items.length > 1 ? 's' : ''} à {city}
            </span>
            <span className="rounded-full bg-white border px-3 py-1">
              <strong>{specCounts.size}</strong> spécialités
            </span>
          </div>
        </div>
      </section>

      {specCounts.size > 0 && (
        <section className="mx-auto max-w-4xl px-4 py-10">
          <h2 className="text-xl font-semibold mb-4">Spécialités à {city}</h2>
          <div className="flex flex-wrap gap-2">
            {[...specCounts.entries()]
              .sort((a, b) => b[1] - a[1])
              .map(([s, count]) => (
                <Link
                  key={s}
                  href={`/droit/${s}`}
                  className="rounded-full bg-white border px-3 py-1 text-sm hover:border-brand-500"
                >
                  {specLabels.get(s) ?? s} <span className="text-slate-500">({count})</span>
                </Link>
              ))}
          </div>
        </section>
      )}

      <section className="mx-auto max-w-4xl px-4 py-6 pb-12">
        <h2 className="text-xl font-semibold mb-6">
          Avocats à {city} disponibles
        </h2>
        {items.length === 0 ? (
          <p className="text-slate-600">
            Aucun avocat référencé pour le moment à {city}. Le réseau s’élargit chaque semaine.
          </p>
        ) : (
          <div className="grid md:grid-cols-2 gap-5">
            {items.map((l) => (
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
                <p className="mt-4 font-semibold text-right text-brand-700">
                  {l.consultationPrice} €
                </p>
              </Link>
            ))}
          </div>
        )}
      </section>

      {content?.facts && content.facts.length > 0 && (
        <section className="mx-auto max-w-4xl px-4 pb-12">
          <h2 className="text-xl font-semibold mb-4">Bon à savoir sur le barreau de {city}</h2>
          <ul className="space-y-2 text-slate-700">
            {content.facts.map((f) => (
              <li key={f} className="flex gap-2">
                <span className="text-brand-600 font-bold">•</span>
                <span>{f}</span>
              </li>
            ))}
          </ul>
        </section>
      )}

      {content?.nearby && content.nearby.length > 0 && (
        <section className="mx-auto max-w-4xl px-4 pb-16">
          <h2 className="text-xl font-semibold mb-4">Villes proches</h2>
          <p className="text-slate-600 text-sm">
            Nos avocats couvrent également : {content.nearby.join(', ')}. Les consultations
            en visio permettent de consulter depuis n’importe où.
          </p>
        </section>
      )}

      <section className="border-t bg-slate-50">
        <div className="mx-auto max-w-4xl px-4 py-10 text-center">
          <h2 className="text-xl font-semibold">
            Trouvez votre avocat à {city}
          </h2>
          <Link
            href={`/recherche?city=${encodeURIComponent(city)}`}
            className="mt-4 inline-block rounded-lg bg-brand-600 text-white px-6 py-3 hover:bg-brand-700 font-medium"
          >
            Voir les disponibilités
          </Link>
        </div>
      </section>
    </>
  );
}
