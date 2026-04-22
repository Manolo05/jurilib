export const metadata = { title: 'Politique de confidentialité — Jurilib' };

export default function Confidentialite() {
  return (
    <article className="mx-auto max-w-3xl px-4 py-12 prose prose-slate prose-headings:font-semibold">
      <h1>Politique de confidentialité</h1>
      <p className="text-sm text-slate-500">
        Dernière mise à jour&nbsp;: {new Date().toLocaleDateString('fr-FR')}
      </p>

      <h2>Responsable de traitement</h2>
      <p>
        Le responsable du traitement est Jurilib, joignable à
        <a href="mailto:contact@jurilib.fr"> contact@jurilib.fr</a>.
      </p>

      <h2>Données collectées</h2>
      <ul>
        <li>
          <strong>Demande de rendez-vous</strong>&nbsp;: nom, prénom, email,
          numéro de téléphone, note libre.
        </li>
        <li>
          <strong>Candidature avocat</strong>&nbsp;: nom, prénom, email, téléphone,
          barreau, années d&rsquo;expérience, ville, spécialités, message libre.
        </li>
        <li>
          <strong>Données techniques</strong>&nbsp;: adresse IP (logs hébergeurs),
          user-agent. Aucune analytics tierce n&rsquo;est installée à ce jour.
        </li>
      </ul>

      <h2>Finalités et bases légales</h2>
      <p>
        Les données sont collectées pour traiter la demande (base légale&nbsp;:
        <em>exécution du contrat / mesures précontractuelles</em>, art. 6.1.b
        RGPD) et transmises à l&rsquo;avocat sélectionné. Les candidatures
        avocats sont traitées au titre de l&rsquo;intérêt légitime (art. 6.1.f) pour
        constituer le réseau Jurilib.
      </p>

      <h2>Destinataires</h2>
      <p>
        Les données sont transmises uniquement à l&rsquo;avocat concerné par la
        demande de rendez-vous. Aucune donnée n&rsquo;est revendue ou partagée à
        des tiers. Les sous-traitants techniques sont&nbsp;: Vercel (hébergement
        front), Supabase (base de données, UE), Resend (emails, à venir).
      </p>

      <h2>Durée de conservation</h2>
      <p>
        Demandes de RDV&nbsp;: 24 mois puis suppression. Candidatures avocats&nbsp;:
        conservées tant que la candidature est active ou, en cas de refus,
        12 mois.
      </p>

      <h2>Vos droits</h2>
      <p>
        Conformément au RGPD, vous disposez d&rsquo;un droit d&rsquo;accès, de
        rectification, d&rsquo;effacement, d&rsquo;opposition et de portabilité. Ces
        droits s&rsquo;exercent par email à
        <a href="mailto:contact@jurilib.fr"> contact@jurilib.fr</a>. Vous pouvez
        également introduire une réclamation auprès de la CNIL (cnil.fr).
      </p>

      <h2>Cookies</h2>
      <p>
        Le site n&rsquo;utilise aucun cookie publicitaire ou de traçage. Seul un
        cookie technique (<code>jurilib_consent</code>) est déposé pour
        mémoriser votre consentement à la bannière cookies. Sa durée de vie
        est de 6 mois.
      </p>

      <h2>Sécurité</h2>
      <p>
        Toutes les communications sont chiffrées en HTTPS. L&rsquo;accès à la base
        de données est restreint par des règles RLS (Row-Level Security)
        Postgres. Aucune donnée n&rsquo;est exposée publiquement au-delà du profil
        public des avocats.
      </p>
    </article>
  );
}
