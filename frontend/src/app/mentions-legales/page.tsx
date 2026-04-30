// @ts-nocheck
export const metadata = {
  title: 'Mentions l\u00e9gales — Jurilib',
  description: 'Mentions l\u00e9gales de la plateforme Jurilib.',
};

export default function MentionsLegalesPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16">
      <h1 className="text-3xl font-serif font-medium text-juri-text mb-8">Mentions l&eacute;gales</h1>
      <div className="space-y-6 text-sm text-juri-muted font-sans leading-relaxed">
        <section>
          <h2 className="text-lg font-serif font-medium text-juri-text mb-2">&Eacute;diteur du site</h2>
          <p>Jurilib<br />Plateforme de mise en relation entre justiciables et avocats<br />Email : contact@jurilib.fr<br />SIRET : en cours d&rsquo;immatriculation</p>
        </section>
        <section>
          <h2 className="text-lg font-serif font-medium text-juri-text mb-2">H&eacute;bergement</h2>
          <p>Vercel Inc.<br />440 N Baxter St, Los Angeles, CA 90012, USA<br />Site : vercel.com</p>
        </section>
        <section>
          <h2 className="text-lg font-serif font-medium text-juri-text mb-2">Propri&eacute;t&eacute; intellectuelle</h2>
          <p>L&rsquo;ensemble du contenu du site (textes, images, logo, code) est prot&eacute;g&eacute; par le droit d&rsquo;auteur. Toute reproduction sans autorisation est interdite.</p>
        </section>
        <section>
          <h2 className="text-lg font-serif font-medium text-juri-text mb-2">Donn&eacute;es personnelles</h2>
          <p>Conform&eacute;ment au RGPD, vous disposez d&rsquo;un droit d&rsquo;acc&egrave;s, de rectification et de suppression de vos donn&eacute;es. Contactez contact@jurilib.fr pour exercer vos droits.</p>
        </section>
        <section>
          <h2 className="text-lg font-serif font-medium text-juri-text mb-2">Cookies</h2>
          <p>Le site utilise des cookies techniques n&eacute;cessaires au fonctionnement et des cookies d&rsquo;analyse anonymes pour am&eacute;liorer l&rsquo;exp&eacute;rience utilisateur.</p>
        </section>
      </div>
    </div>
  );
}
