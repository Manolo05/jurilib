export const metadata = { title: 'Mentions légales — Jurilib' };

export default function MentionsLegales() {
  return (
    <article className="mx-auto max-w-3xl px-4 py-12 prose prose-slate prose-headings:font-semibold">
      <h1>Mentions légales</h1>
      <p className="text-sm text-slate-500">Dernière mise à jour&nbsp;: {new Date().toLocaleDateString('fr-FR')}</p>

      <h2>Éditeur du site</h2>
      <p>
        <strong>Jurilib</strong> — plateforme indépendante de mise en relation entre clients et avocats.<br />
        Responsable de publication&nbsp;: Maxime (gérant).<br />
        Contact&nbsp;: <a href="mailto:contact@jurilib.fr">contact@jurilib.fr</a>
      </p>
      <p className="text-sm text-slate-600">
        Le site est actuellement en bêta privée. Les mentions seront complétées
        (raison sociale, SIRET, RCS) à l&rsquo;ouverture commerciale.
      </p>

      <h2>Hébergement</h2>
      <p>
        Frontend&nbsp;: <strong>Vercel Inc.</strong>, 650 California Street, San Francisco,
        CA 94108, USA — vercel.com.<br />
        Base de données&nbsp;: <strong>Supabase Inc.</strong>, 970 Toa Payoh North #07-04,
        Singapore 318992 — supabase.com. Hébergement UE (région eu-west-3).
      </p>

      <h2>Propriété intellectuelle</h2>
      <p>
        L&rsquo;ensemble du contenu du site (textes, graphismes, logo, code)
        est protégé au titre du droit d&rsquo;auteur. Les photos de profil des avocats
        de démonstration sont fournies par pravatar.cc sous licence libre
        uniquement à des fins d&rsquo;illustration avant lancement.
      </p>

      <h2>Limitation de responsabilité</h2>
      <p>
        Jurilib est une plateforme de mise en relation. Les avocats inscrits
        restent seuls responsables des conseils qu&rsquo;ils délivrent. Jurilib ne
        donne aucun avis juridique.
      </p>

      <h2>Signalement</h2>
      <p>
        Toute demande de retrait de contenu ou signalement d&rsquo;erreur peut être
        adressée à <a href="mailto:contact@jurilib.fr">contact@jurilib.fr</a>.
      </p>
    </article>
  );
}
