import Link from 'next/link';
import { Mail } from 'lucide-react';

export const metadata = { title: 'Connexion — Jurilib' };

export default function LoginPage() {
  return (
    <div className="mx-auto max-w-sm px-4 py-16 text-center">
      <h1 className="text-2xl font-bold">Espace membre</h1>
      <p className="mt-3 text-slate-600">
        Jurilib est en bêta privée. L&rsquo;espace connexion (clients et avocats) ouvrira
        prochainement.
      </p>
      <p className="mt-6 text-sm text-slate-500 flex items-center justify-center gap-2">
        <Mail className="h-4 w-4" /> Vous êtes avocat et souhaitez rejoindre le réseau&nbsp;?
      </p>
      <a
        href="mailto:contact@jurilib.fr"
        className="mt-3 inline-block rounded-lg bg-brand-600 text-white px-5 py-2 hover:bg-brand-700"
      >
        contact@jurilib.fr
      </a>
      <p className="mt-8 text-xs text-slate-400">
        <Link href="/" className="underline">Retour à l&rsquo;accueil</Link>
      </p>
    </div>
  );
}
