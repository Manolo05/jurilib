import Link from 'next/link';
import { CalendarClock } from 'lucide-react';

export const metadata = { title: 'Tableau de bord avocat — Jurilib' };

export default function LawyerDashboard() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-16 text-center">
      <CalendarClock className="mx-auto h-12 w-12 text-brand-600" />
      <h1 className="mt-4 text-2xl font-bold">Tableau de bord avocat</h1>
      <p className="mt-3 text-slate-600">
        L&rsquo;espace avocat (agenda, revenus, messagerie, avis clients) ouvre en bêta
        privée. Inscrivez-vous pour être prévenu&nbsp;:
      </p>
      <a
        href="mailto:contact@jurilib.fr?subject=Inscription%20avocat%20Jurilib"
        className="mt-6 inline-block rounded-lg bg-brand-600 text-white px-5 py-3 hover:bg-brand-700"
      >
        Rejoindre la bêta
      </a>
      <p className="mt-6 text-xs text-slate-400">
        <Link href="/" className="underline">Retour à l&rsquo;accueil</Link>
      </p>
    </div>
  );
}
