import Link from 'next/link';
import { Search, ShieldCheck, CalendarClock, CreditCard } from 'lucide-react';

export default function Home() {
  return (
    <>
      <section className="bg-gradient-to-b from-brand-50 to-white">
        <div className="mx-auto max-w-6xl px-4 py-24">
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 max-w-3xl leading-tight">
            Prenez rendez-vous avec un avocat en quelques clics.
          </h1>
          <p className="mt-4 text-lg text-slate-600 max-w-2xl">
            Jurilib vous met en relation avec des avocats vérifiés, en visio ou en présentiel,
            avec des disponibilités en temps réel et un paiement sécurisé.
          </p>

          <form action="/recherche" className="mt-8 bg-white rounded-xl shadow-sm border p-2 flex flex-col md:flex-row gap-2 max-w-3xl">
            <input
              name="specialty"
              placeholder="Spécialité (ex. droit du travail)"
              className="flex-1 px-4 py-3 rounded-lg outline-none"
            />
            <input
              name="city"
              placeholder="Ville"
              className="flex-1 px-4 py-3 rounded-lg outline-none border-t md:border-t-0 md:border-l"
            />
            <button className="bg-brand-600 text-white rounded-lg px-6 py-3 hover:bg-brand-700 flex items-center justify-center gap-2">
              <Search className="h-4 w-4" /> Rechercher
            </button>
          </form>

          <div className="mt-6 flex flex-wrap gap-2 text-sm">
            {['droit-du-travail', 'droit-penal', 'droit-de-la-famille', 'droit-immobilier'].map((s) => (
              <Link
                key={s}
                href={`/recherche?specialty=${s}`}
                className="rounded-full bg-white border px-3 py-1 hover:border-brand-500"
              >
                {s.replaceAll('-', ' ')}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-20 grid md:grid-cols-3 gap-8">
        {[
          { icon: ShieldCheck, title: 'Avocats vérifiés', text: 'Inscription au barreau contrôlée pour chaque profil.' },
          { icon: CalendarClock, title: 'Dispos en temps réel', text: 'Visualisez l’agenda et réservez 24/7.' },
          { icon: CreditCard, title: 'Paiement sécurisé', text: 'Stripe, reçu automatique, facturation claire.' },
        ].map(({ icon: Icon, title, text }) => (
          <div key={title} className="rounded-xl border p-6">
            <Icon className="h-8 w-8 text-brand-600" />
            <h3 className="mt-4 font-semibold">{title}</h3>
            <p className="mt-1 text-sm text-slate-600">{text}</p>
          </div>
        ))}
      </section>
    </>
  );
}
