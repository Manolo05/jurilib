import Link from 'next/link';
import { notFound } from 'next/navigation';
import { MapPin, Star, ChevronRight } from 'lucide-react';
import { listLawyers, listSpecialties } from '@/lib/supabase';

export const revalidate = 600;

// Contenus rédactionnels par spécialité — nourrit le SEO et rassure le visiteur.
const SPECIALTY_CONTENT: Record<
  string,
  { intro: string; cases: string[]; questions: { q: string; a: string }[] }
> = {
  'droit-du-travail': {
    intro:
      "Licenciement abusif, rupture conventionnelle, harcèlement au travail, contentieux prud'homal… Les avocats en droit du travail référencés sur Jurilib accompagnent salariés et employeurs dans tous les litiges liés au contrat de travail.",
    cases: [
      'Licenciement jugé sans cause réelle et sérieuse',
      'Négociation d’une rupture conventionnelle',
      'Contentieux heures supplémentaires et rappels de salaire',
      'Défense devant le Conseil de prud’hommes',
      'Harcèlement moral ou discrimination',
    ],
    questions: [
      {
        q: 'Combien coûte une consultation en droit du travail ?',
        a: 'La première consultation sur Jurilib démarre à partir de 60 €. Le tarif exact est affiché sur chaque profil d’avocat.',
      },
      {
        q: 'Puis-je consulter un avocat en droit du travail en visio ?',
        a: 'Oui, la plupart des avocats Jurilib acceptent la visioconférence. Le mode est indiqué sur chaque fiche.',
      },
    ],
  },
  'droit-de-la-famille': {
    intro:
      'Divorce, séparation, garde d’enfant, pension alimentaire, succession : le droit de la famille touche à des moments sensibles de la vie. Les avocats Jurilib vous orientent rapidement et avec tact.',
    cases: [
      'Divorce par consentement mutuel',
      'Divorce contentieux et prestation compensatoire',
      'Garde alternée et droit de visite',
      'Pension alimentaire : fixation ou révision',
      'Succession et partage de patrimoine',
    ],
    questions: [
      {
        q: 'Dois-je passer par un avocat pour divorcer ?',
        a: 'Oui, chaque époux doit être représenté par un avocat, y compris dans le divorce par consentement mutuel (loi 2017).',
      },
      {
        q: "Puis-je bénéficier de l'aide juridictionnelle ?",
        a: 'Cela dépend de vos revenus. Demandez à votre avocat lors de la première consultation, il saura vous orienter.',
      },
    ],
  },
  'droit-penal': {
    intro:
      'Garde à vue, convocation au tribunal, plainte, comparution immédiate… En matière pénale, chaque heure compte. Les avocats pénalistes Jurilib proposent des disponibilités rapprochées, y compris en urgence.',
    cases: [
      'Assistance en garde à vue',
      'Défense en correctionnelle et comparution immédiate',
      'Plaintes avec constitution de partie civile',
      'Droit pénal des affaires (abus de biens sociaux, fraude fiscale)',
      'Délits routiers (alcool, stupéfiants, grand excès de vitesse)',
    ],
    questions: [
      {
        q: 'Puis-je prendre un avocat en urgence pour une garde à vue ?',
        a: 'La garde à vue est gérée via le barreau local en temps réel. Pour préparer la suite (audition, déferrement), un avocat Jurilib peut vous recevoir dans les 24–48 h.',
      },
    ],
  },
  'droit-immobilier': {
    intro:
      'Litige de copropriété, vices cachés, bail commercial ou d’habitation, troubles de voisinage : un avocat en droit immobilier sécurise vos démarches, qu’il s’agisse d’un contentieux ou d’une négociation.',
    cases: [
      'Vices cachés et annulation de vente',
      'Litige avec la copropriété ou le syndic',
      'Bail d’habitation : impayés, expulsion, renouvellement',
      'Bail commercial et congé',
      'Troubles de voisinage',
    ],
    questions: [
      {
        q: 'Mon syndic ne répond plus, que faire ?',
        a: 'Un avocat en droit immobilier peut adresser une mise en demeure, puis saisir le tribunal judiciaire. Une consultation suffit souvent à débloquer la situation.',
      },
    ],
  },
  'droit-des-affaires': {
    intro:
      "Rédaction de contrats commerciaux, contentieux B2B, recouvrement de créances, ruptures brutales de relations commerciales : les avocats en droit des affaires Jurilib épaulent TPE, PME et indépendants au quotidien.",
    cases: [
      'Rédaction et négociation de contrats commerciaux',
      'Recouvrement de créances B2B',
      'Rupture brutale de relation commerciale établie',
      'Concurrence déloyale et parasitisme',
      'Baux commerciaux',
    ],
    questions: [
      {
        q: 'Dois-je forcément avoir un avocat pour une TPE ?',
        a: 'Non, mais un rendez-vous d’audit une fois par an permet d’anticiper les risques contractuels et fiscaux.',
      },
    ],
  },
  'droit-des-etrangers': {
    intro:
      'Titre de séjour, regroupement familial, naturalisation, recours contre une OQTF : le droit des étrangers est un domaine technique où les délais sont courts. Nos avocats vous reçoivent rapidement.',
    cases: [
      'Demande ou renouvellement de titre de séjour',
      'Recours contre une OQTF',
      'Regroupement familial',
      'Naturalisation française',
      "Contestation d'un refus de visa",
    ],
    questions: [
      {
        q: 'Quel est le délai pour contester une OQTF ?',
        a: 'Le délai est en principe de 30 jours, mais il peut être réduit à 48 h dans certains cas (OQTF avec placement en rétention). Un avocat doit être saisi en urgence.',
      },
    ],
  },
  'droit-des-societes': {
    intro:
      "Création, cession, restructuration, conflit entre associés : la vie d'une société réserve des étapes juridiques structurantes qu'il vaut mieux sécuriser avec un avocat spécialisé.",
    cases: [
      "Rédaction de statuts et pacte d'associés",
      'Cession de parts sociales / d’actions',
      'Levée de fonds',
      'Conflit entre associés',
      'Fusion, scission, restructuration',
    ],
    questions: [
      {
        q: 'Avocat ou expert-comptable pour créer ma société ?',
        a: 'Les deux interviennent à différents niveaux : l’avocat rédige les statuts et le pacte, le comptable gère les aspects fiscaux et sociaux. Ils sont complémentaires.',
      },
    ],
  },
  'droit-fiscal': {
    intro:
      'Redressement fiscal, contentieux avec l’administration, optimisation d’impôt sur le revenu ou sur les sociétés : un avocat fiscaliste sécurise vos déclarations et vous représente face au fisc.',
    cases: [
      'Contestation d’un redressement fiscal',
      'Optimisation IR / IS',
      'Déclaration d’IFI et ISF',
      'Abus de droit fiscal',
      'Fiscalité internationale et expatriation',
    ],
    questions: [
      {
        q: 'Un avocat fiscaliste peut-il me représenter face au fisc ?',
        a: 'Oui, l’avocat peut vous représenter lors d’un contrôle fiscal, à la commission des impôts et devant le tribunal administratif.',
      },
    ],
  },
  'droit-de-la-consommation': {
    intro:
      "Litige avec un e-commerçant, rétractation non respectée, clauses abusives, produit défectueux : un avocat en droit de la consommation défend vos droits face aux professionnels.",
    cases: [
      "Vice caché ou produit défectueux",
      "Rétractation e-commerce non respectée",
      "Clauses abusives dans un contrat",
      "Démarchage téléphonique abusif",
      "Litige bancaire (frais injustifiés, crédit)",
    ],
    questions: [
      {
        q: 'Quel est le délai pour agir contre un vendeur ?',
        a: 'Le délai de prescription est en général de 2 ans pour un vice caché ou un défaut de conformité, à compter de la découverte du défaut.',
      },
    ],
  },
  'propriete-intellectuelle': {
    intro:
      "Marque, brevet, droit d'auteur, contrefaçon : la propriété intellectuelle protège vos actifs immatériels. Les avocats Jurilib vous aident à déposer, défendre et valoriser vos droits.",
    cases: [
      'Dépôt et opposition de marque',
      'Contrefaçon de logiciel ou de design',
      'Rédaction de contrats de cession de droits',
      'Atteinte au droit d’auteur',
      'Licence et valorisation de brevet',
    ],
    questions: [
      {
        q: 'Faut-il déposer une marque avant de lancer sa société ?',
        a: "Oui, c'est fortement recommandé pour éviter qu'un tiers ne dépose la marque en premier et vous en prive.",
      },
    ],
  },
};

export async function generateStaticParams() {
  const specs = await listSpecialties().catch(() => []);
  return specs.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }> | { slug: string };
}) {
  const { slug } = await Promise.resolve(params);
  const specs = await listSpecialties().catch(() => []);
  const spec = specs.find((s) => s.slug === slug);
  if (!spec) return { title: 'Spécialité' };
  return {
    title: `Avocat ${spec.label.toLowerCase()} — Jurilib`,
    description: `Trouvez un avocat en ${spec.label.toLowerCase()} près de chez vous. Disponibilités en temps réel, tarifs clairs, consultations en visio ou au cabinet.`,
    alternates: { canonical: `/droit/${slug}` },
  };
}

export default async function SpecialtyLanding({
  params,
}: {
  params: Promise<{ slug: string }> | { slug: string };
}) {
  const { slug } = await Promise.resolve(params);
  const [{ items }, specs] = await Promise.all([
    listLawyers({ specialty: slug }),
    listSpecialties().catch(() => []),
  ]);
  const spec = specs.find((s) => s.slug === slug);
  if (!spec) notFound();

  const content = SPECIALTY_CONTENT[slug];
  const avgPrice =
    items.length > 0
      ? Math.round(
          items.reduce((s, l) => s + Number(l.consultationPrice), 0) / items.length,
        )
      : null;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: `Avocats en ${spec.label}`,
    description: content?.intro ?? `Avocats spécialisés en ${spec.label}`,
    mainEntity: {
      '@type': 'ItemList',
      numberOfItems: items.length,
      itemListElement: items.slice(0, 10).map((l, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        url: `https://jurilib.vercel.app/avocat/${l.slug}`,
        name: `Me ${l.user.firstName} ${l.user.lastName}`,
      })),
    },
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
            <span>{spec.label}</span>
          </nav>
          <h1 className="text-3xl md:text-4xl font-bold text-slate-900">
            Avocat en {spec.label.toLowerCase()}
          </h1>
          <p className="mt-4 text-lg text-slate-600">
            {content?.intro ??
              `Trouvez un avocat spécialisé en ${spec.label.toLowerCase()} disponible sur Jurilib.`}
          </p>
          <div className="mt-6 flex flex-wrap gap-4 text-sm text-slate-700">
            <span className="rounded-full bg-white border px-3 py-1">
              <strong>{items.length}</strong> avocat{items.length > 1 ? 's' : ''} référencé{items.length > 1 ? 's' : ''}
            </span>
            {avgPrice ? (
              <span className="rounded-full bg-white border px-3 py-1">
                Tarif moyen <strong>{avgPrice} €</strong>
              </span>
            ) : null}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-4 py-12">
        <h2 className="text-xl font-semibold mb-6">
          Avocats en {spec.label.toLowerCase()} disponibles
        </h2>
        {items.length === 0 ? (
          <p className="text-slate-600">
            Aucun avocat dans cette spécialité pour le moment. Revenez bientôt —
            notre réseau s’élargit chaque semaine.
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
                <p className="mt-4 font-semibold text-right text-brand-700">
                  {l.consultationPrice} €
                </p>
              </Link>
            ))}
          </div>
        )}
      </section>

      {content?.cases && content.cases.length > 0 && (
        <section className="mx-auto max-w-4xl px-4 pb-12">
          <h2 className="text-xl font-semibold mb-4">
            Dans quels cas consulter un avocat en {spec.label.toLowerCase()} ?
          </h2>
          <ul className="space-y-2 text-slate-700">
            {content.cases.map((c) => (
              <li key={c} className="flex gap-2">
                <span className="text-brand-600 font-bold">•</span>
                <span>{c}</span>
              </li>
            ))}
          </ul>
        </section>
      )}

      {content?.questions && content.questions.length > 0 && (
        <section className="mx-auto max-w-4xl px-4 pb-16">
          <h2 className="text-xl font-semibold mb-4">Questions fréquentes</h2>
          <div className="space-y-5">
            {content.questions.map((qa) => (
              <div key={qa.q} className="rounded-lg border p-5 bg-white">
                <h3 className="font-semibold text-slate-900">{qa.q}</h3>
                <p className="mt-2 text-slate-600 text-sm">{qa.a}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      <section className="border-t bg-slate-50">
        <div className="mx-auto max-w-4xl px-4 py-10 text-center">
          <h2 className="text-xl font-semibold">
            Prêt·e à consulter un avocat en {spec.label.toLowerCase()} ?
          </h2>
          <Link
            href={`/recherche?specialty=${slug}`}
            className="mt-4 inline-block rounded-lg bg-brand-600 text-white px-6 py-3 hover:bg-brand-700 font-medium"
          >
            Voir les disponibilités
          </Link>
        </div>
      </section>
    </>
  );
}
