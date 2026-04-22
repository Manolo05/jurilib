'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { CheckCircle2, ShieldCheck, CalendarClock, CreditCard, Users } from 'lucide-react';
import { submitLawyerApplication, listSpecialties } from '@/lib/supabase';

type Specialty = { slug: string; label: string };

export default function LawyerSignupPage() {
  const [specialties, setSpecialties] = useState<Specialty[]>([]);
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    barAssociation: '',
    yearsExperience: '',
    city: '',
    message: '',
  });
  const [selectedSpecialties, setSelectedSpecialties] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    listSpecialties().then(setSpecialties).catch(() => setSpecialties([]));
  }, []);

  function toggleSpecialty(slug: string) {
    setSelectedSpecialties((curr) =>
      curr.includes(slug) ? curr.filter((s) => s !== slug) : [...curr, slug],
    );
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      await submitLawyerApplication({
        first_name: form.firstName.trim(),
        last_name: form.lastName.trim(),
        email: form.email.trim(),
        phone: form.phone.trim() || null,
        bar_association: form.barAssociation.trim(),
        years_experience: Number(form.yearsExperience) || 0,
        city: form.city.trim(),
        specialties: selectedSpecialties,
        message: form.message.trim() || null,
      });
      setSubmitted(true);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Erreur inconnue';
      setError(`Impossible d'enregistrer votre candidature : ${msg}`);
    } finally {
      setLoading(false);
    }
  }

  if (submitted) {
    return (
      <div className="mx-auto max-w-xl px-4 py-16 text-center">
        <CheckCircle2 className="mx-auto h-12 w-12 text-green-600" />
        <h1 className="mt-4 text-2xl font-bold">Candidature reçue !</h1>
        <p className="mt-3 text-slate-600">
          Merci Me {form.firstName} {form.lastName}. Notre équipe vous contacte sous 48 h
          pour finaliser votre inscription au barreau virtuel Jurilib.
        </p>
        <Link
          href="/"
          className="mt-6 inline-block rounded-lg bg-brand-600 text-white px-6 py-3 hover:bg-brand-700"
        >
          Retour à l&rsquo;accueil
        </Link>
      </div>
    );
  }

  return (
    <>
      <section className="bg-gradient-to-b from-brand-50 to-white">
        <div className="mx-auto max-w-4xl px-4 py-16 text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-slate-900 max-w-3xl mx-auto">
            Développez votre cabinet grâce à Jurilib
          </h1>
          <p className="mt-4 text-lg text-slate-600 max-w-2xl mx-auto">
            Rejoignez la première plateforme française de prise de rendez-vous avec avocats vérifiés.
            Agenda synchronisé, paiement sécurisé, zéro frais d&rsquo;inscription.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-4 py-10 grid md:grid-cols-4 gap-6 text-sm">
        {[
          { icon: Users, title: '+3 000 visites/mois', text: 'par ville en rythme de croisière' },
          { icon: CalendarClock, title: 'Agenda intégré', text: 'Google Calendar & Office 365' },
          { icon: CreditCard, title: '15 % de commission', text: 'uniquement sur RDV honorés' },
          { icon: ShieldCheck, title: 'Avocats vérifiés', text: 'numéro CNB contrôlé' },
        ].map(({ icon: Icon, title, text }) => (
          <div key={title} className="rounded-xl border p-5">
            <Icon className="h-6 w-6 text-brand-600" />
            <p className="mt-3 font-semibold">{title}</p>
            <p className="text-slate-600 text-xs mt-1">{text}</p>
          </div>
        ))}
      </section>

      <section className="mx-auto max-w-xl px-4 pb-16">
        <h2 className="text-xl font-semibold">Votre candidature</h2>
        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-medium">Prénom *</label>
              <input
                required
                value={form.firstName}
                onChange={(e) => setForm({ ...form, firstName: e.target.value })}
                className="mt-1 w-full rounded-lg border px-3 py-2"
              />
            </div>
            <div>
              <label className="block text-sm font-medium">Nom *</label>
              <input
                required
                value={form.lastName}
                onChange={(e) => setForm({ ...form, lastName: e.target.value })}
                className="mt-1 w-full rounded-lg border px-3 py-2"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-medium">Email *</label>
              <input
                required
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="mt-1 w-full rounded-lg border px-3 py-2"
              />
            </div>
            <div>
              <label className="block text-sm font-medium">Téléphone</label>
              <input
                type="tel"
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                className="mt-1 w-full rounded-lg border px-3 py-2"
              />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div className="col-span-2">
              <label className="block text-sm font-medium">Barreau *</label>
              <input
                required
                value={form.barAssociation}
                onChange={(e) => setForm({ ...form, barAssociation: e.target.value })}
                placeholder="Paris, Lyon…"
                className="mt-1 w-full rounded-lg border px-3 py-2"
              />
            </div>
            <div>
              <label className="block text-sm font-medium">Années d&rsquo;exp. *</label>
              <input
                required
                type="number"
                min={0}
                value={form.yearsExperience}
                onChange={(e) => setForm({ ...form, yearsExperience: e.target.value })}
                className="mt-1 w-full rounded-lg border px-3 py-2"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium">Ville d&rsquo;exercice *</label>
            <input
              required
              value={form.city}
              onChange={(e) => setForm({ ...form, city: e.target.value })}
              className="mt-1 w-full rounded-lg border px-3 py-2"
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Spécialités</label>
            <div className="mt-2 flex flex-wrap gap-2">
              {specialties.map((s) => {
                const active = selectedSpecialties.includes(s.slug);
                return (
                  <button
                    type="button"
                    key={s.slug}
                    onClick={() => toggleSpecialty(s.slug)}
                    className={`text-sm rounded-full border px-3 py-1 transition ${
                      active
                        ? 'bg-brand-600 border-brand-600 text-white'
                        : 'bg-white border-slate-300 text-slate-700 hover:border-brand-500'
                    }`}
                  >
                    {s.label}
                  </button>
                );
              })}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium">Message (optionnel)</label>
            <textarea
              rows={3}
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              placeholder="Présentez brièvement votre cabinet…"
              className="mt-1 w-full rounded-lg border px-3 py-2"
            />
          </div>

          {error && <p className="text-sm text-red-600">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-brand-600 text-white py-3 font-medium hover:bg-brand-700 disabled:opacity-50"
          >
            {loading ? 'Envoi…' : 'Envoyer ma candidature'}
          </button>
        </form>
      </section>
    </>
  );
}
