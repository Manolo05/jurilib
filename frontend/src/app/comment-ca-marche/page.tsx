import Link from 'next/link';
import { Search, CalendarCheck, MessagesSquare, ShieldCheck } from 'lucide-react';

export const metadata = {
  title: 'Comment ça marche — Jurilib',
  description:
    'Prenez rendez-vous avec un avocat en 3 étapes : recherche, réservation, consultation. Jurilib vous explique.',
  alternates: { canonical: '/comment-ca-marche' },
};

export default function HowItWorks() {
  const steps = [
    {
      icon: Search,
      title: '1. Trouvez un avocat',
      text: 'Filtrez par spécialité, ville, tarif et note. Chaque profil présente l’expérience, le barreau, les avis et les disponibilités.',
    },
    {
      icon: CalendarCheck,
      title: '2. Choisissez un créneau',
      text: 'Les disponibilités sont mises à jour en temps réel. Réservez en visio ou au cabinet, 24/7.',
    },
    {
      icon: MessagesSquare,
      title: '3. Consultez',
      text: 'Au jour J, rendez-vous au cabinet ou rejoignez la visio depuis votre espace. L’avocat vous envoie ensuite un récapitulatif.',
    },
  ];

  return (
    <>
      <section className="bg-gradient-to-b from-brand-50 to-white border-b">
        <div className="mx-auto max-w-3xl px-4 py-16 text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-slate-900">
            Comment ça marche ?
          </h1>
          <p className="mt-4 text-lg text-slate-600">
            Jurilib simplifie la prise de rendez-vous avec un avocat. Trois étapes,
            rien de plus, et aucun intermédiaire sur le fond du dossier.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-4 py-16 grid md:grid-cols-3 gap-8">
        {steps.map(({ icon: Icon, title, text }) => (
          <div key={title} className="text-center">
            <div className="mx-auto inline-flex rounded-full bg-brand-50 p-4">
              <Icon className="h-8 w-8 text-brand-600" />
            </div>
            <h2 className="mt-4 font-semibold">{title}</h2>
            <p className="mt-2 text-sm text-slate-600">{text}</p>
          </div>
        ))}
      </section>

      <section className="mx-auto max-w-3xl px-4 pb-16">
        <div className="rounded-xl border p-6 bg-white flex items-start gap-4">
          <ShieldCheck className="h-6 w-6 text-brand-600 shrink-0 mt-1" />
          <div>
            <h3 className="font-semibold">Avocats vérifiés</h3>
            <p className="mt-1 text-sm text-slate-600">
              Chaque inscription au barreau est contrôlée avant publication. Jurilib
              ne référence que des avocats en activité, inscrits à un barreau français.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-slate-50 border-t">
        <div className="mx-auto max-w-3xl px-4 py-12 text-center">
          <h2 className="text-2xl font-bold">Prêt·e à consulter&nbsp;?</h2>
          <p className="mt-2 text-slate-600">
            Trouvez un avocat disponible près de chez vous, en visio ou au cabinet.
          </p>
          <Link
            href="/recherche"
            className="mt-6 inline-block rounded-lg bg-brand-600 text-white px-6 py-3 hover:bg-brand-700 font-medium"
          >
            Chercher un avocat
          </Link>
        </div>
      </section>
    </>
  );
}
