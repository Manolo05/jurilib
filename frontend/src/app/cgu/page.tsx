export const metadata = { title: 'Conditions générales d’utilisation — Jurilib' };

export default function CGU() {
  return (
    <article className="mx-auto max-w-3xl px-4 py-12 prose prose-slate prose-headings:font-semibold">
      <h1>Conditions générales d&rsquo;utilisation</h1>
      <p className="text-sm text-slate-500">
        Dernière mise à jour&nbsp;: {new Date().toLocaleDateString('fr-FR')}
      </p>

      <h2>1. Objet</h2>
      <p>
        Les présentes CGU régissent l&rsquo;accès et l&rsquo;utilisation de la plateforme
        Jurilib (jurilib.fr), qui permet aux utilisateurs de prendre rendez-vous
        avec des avocats inscrits à un barreau français.
      </p>

      <h2>2. Accès</h2>
      <p>
        La consultation du site et des fiches avocats est libre et gratuite.
        La prise de rendez-vous nécessite de renseigner un nom, un email
        et un numéro de téléphone. Aucune création de compte n&rsquo;est requise
        pendant la phase de bêta.
      </p>

      <h2>3. Rôle de Jurilib</h2>
      <p>
        Jurilib agit en qualité d&rsquo;intermédiaire technique. Jurilib ne fournit
        pas de prestations juridiques. Les avocats référencés sont
        professionnels indépendants, seuls responsables de leurs conseils,
        honoraires, et de la tenue de leurs rendez-vous.
      </p>

      <h2>4. Prise de rendez-vous</h2>
      <p>
        La demande envoyée via le formulaire ne vaut pas rendez-vous confirmé.
        L&rsquo;avocat dispose d&rsquo;un délai de 24 h ouvrés pour confirmer ou
        refuser la demande. En cas de refus, aucune somme n&rsquo;est prélevée.
      </p>

      <h2>5. Paiement (ouverture prochaine)</h2>
      <p>
        Lors de l&rsquo;ouverture commerciale, les paiements seront traités via
        Stripe. Jurilib prélèvera une commission de <strong>15 %</strong> uniquement
        sur les rendez-vous honorés. En cas d&rsquo;annulation par le client plus
        de 24 h avant le rendez-vous, remboursement intégral. En cas
        d&rsquo;annulation ou d&rsquo;absence de l&rsquo;avocat, remboursement intégral.
      </p>

      <h2>6. Obligations des avocats</h2>
      <p>
        Les avocats candidats s&rsquo;engagent à être inscrits à un barreau
        français et à jour de leurs obligations déontologiques. Jurilib se
        réserve le droit de vérifier cette inscription et de retirer tout
        profil ne respectant pas ces règles.
      </p>

      <h2>7. Données personnelles</h2>
      <p>
        Voir notre <a href="/politique-de-confidentialite">politique de
        confidentialité</a>.
      </p>

      <h2>8. Droit applicable</h2>
      <p>
        Les présentes CGU sont soumises au droit français. Tout litige relève
        de la compétence des tribunaux de Paris.
      </p>
    </article>
  );
}
