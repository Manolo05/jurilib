import Link from 'next/link';

export const metadata = {
  title: 'FAQ — Jurilib',
  description:
    'Questions fréquentes sur Jurilib : tarifs, avocats vérifiés, visio, paiement sécurisé, confidentialité.',
  alternates: { canonical: '/faq' },
};

const FAQ: { q: string; a: string }[] = [
  {
    q: 'Jurilib est-il une plateforme d’avocats ou un cabinet ?',
    a: 'Jurilib est une plateforme de mise en relation entre clients et avocats inscrits au barreau. Nous ne sommes pas un cabinet et ne donnons aucun avis juridique. Chaque avocat reste indépendant et seul responsable de ses conseils.',
  },
  {
    q: 'Les avocats sont-ils vraiment inscrits au barreau ?',
    a: 'Oui. Nous vérifions l’inscription active au barreau indiqué avant publication du profil. Chaque avocat confirme qu’il est à jour de ses obligations ordinales.',
  },
  {
    q: 'Combien coûte une consultation ?',
    a: 'Les tarifs sont affichés sur chaque profil, à partir de 60 € environ pour une première consultation. Jurilib ne prend aucune commission sur la consultation elle-même pendant la bêta.',
  },
  {
    q: 'Puis-je consulter en visio ?',
    a: 'Oui, la plupart des avocats référencés acceptent la visioconférence. Le mode de rendez-vous (visio, cabinet ou les deux) est indiqué sur chaque fiche et à la réservation.',
  },
  {
    q: 'Comment se passe le paiement ?',
    a: 'Le paiement s’effectue en ligne via Stripe lors de la réservation. Vous recevez automatiquement un reçu. Pendant la bêta privée, certains créneaux peuvent être confirmés en direct avec l’avocat.',
  },
  {
    q: 'Puis-je annuler un rendez-vous ?',
    a: 'Oui, vous pouvez annuler gratuitement jusqu’à 24 h avant le rendez-vous depuis votre email de confirmation. Au-delà, le remboursement dépend de la politique de l’avocat.',
  },
  {
    q: 'Mes informations sont-elles confidentielles ?',
    a: 'Vos données personnelles sont uniquement transmises à l’avocat que vous consultez. Elles ne sont jamais revendues ni partagées avec des tiers. Voir notre politique de confidentialité.',
  },
  {
    q: 'Je suis avocat·e, comment rejoindre le réseau ?',
    a: 'Rendez-vous sur la page « Je suis avocat » pour candidater. Nous vérifions votre inscription au barreau puis créons votre profil gratuitement.',
  },
];

export default function Faq() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: FAQ.map((item) => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.a,
      },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <section className="mx-auto max-w-3xl px-4 py-12">
        <h1 className="text-3xl font-bold">Questions fréquentes</h1>
        <p className="mt-2 text-slate-600">
          Toutes les réponses aux questions que vous vous posez avant de réserver.
        </p>

        <div className="mt-10 space-y-5">
          {FAQ.map((item) => (
            <details
              key={item.q}
              className="rounded-lg border bg-white p-5 group"
            >
              <summary className="cursor-pointer font-semibold text-slate-900 list-none flex justify-between items-center">
                {item.q}
                <span className="text-brand-600 transition-transform group-open:rotate-45">
                  +
                </span>
              </summary>
              <p className="mt-3 text-slate-600 text-sm">{item.a}</p>
            </details>
          ))}
        </div>

        <p className="mt-10 text-sm text-slate-500">
          Vous ne trouvez pas votre réponse ?{' '}
          <a href="mailto:contact@jurilib.fr" className="text-brand-600 hover:underline">
            Écrivez-nous
          </a>
          .
        </p>

        <div className="mt-8">
          <Link
            href="/recherche"
            className="inline-block rounded-lg bg-brand-600 text-white px-5 py-2.5 hover:bg-brand-700 text-sm font-medium"
          >
            Chercher un avocat
          </Link>
        </div>
      </section>
    </>
  );
}
