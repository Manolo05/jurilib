import Link from 'next/link';
import { Scale, Search } from 'lucide-react';

export const metadata = { title: 'Page introuvable — Jurilib' };

export default function NotFound() {
  return (
    <section className="mx-auto max-w-3xl px-4 py-24 text-center">
      <div className="inline-flex items-center gap-2 text-brand-600 text-sm font-semibold">
        <Scale className="h-5 w-5" />
        Erreur 404
      </div>
      <h1 className="mt-4 text-4xl md:text-5xl font-bold text-slate-900">
        Cette page a quitté le prétoire.
      </h1>
      <p className="mt-4 text-lg text-slate-600 max-w-xl mx-auto">
        Le lien que vous avez suivi est peut-être périmé, ou l&rsquo;avocat n&rsquo;est
        plus référencé sur Jurilib. Pas d&rsquo;inquiétude&nbsp;: plus de 200&nbsp;avocats
        inscrits au barreau vous attendent.
      </p>

      <div className="mt-10 flex flex-col sm:flex-row gap-3 justify-center">
        <Link
          href="/recherche"
          className="inline-flex items-center justify-center gap-2 rounded-lg bg-brand-600 text-white px-6 py-3 hover:bg-brand-700 font-medium"
        >
          <Search className="h-4 w-4" /> Trouver un avocat
        </Link>
        <Link
          href="/"
          className="inline-flex items-center justify-center rounded-lg border px-6 py-3 hover:border-brand-500 font-medium"
        >
          Retour à l&rsquo;accueil
        </Link>
      </div>

      <p className="mt-12 text-sm text-slate-500">
        Besoin d&rsquo;aide&nbsp;?{' '}
        <a href="mailto:contact@jurilib.fr" className="text-brand-600 hover:underline">
          contact@jurilib.fr
        </a>
      </p>
    </section>
  );
}
