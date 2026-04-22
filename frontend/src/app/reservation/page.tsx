'use client';

import { Suspense, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { CheckCircle2, Info } from 'lucide-react';
import { submitBookingRequest, getAvailabilityLawyer } from '@/lib/supabase';

function BookingContent() {
  const params = useSearchParams();
  const availabilityId = params.get('availabilityId');

  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    note: '',
  });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!availabilityId) {
    return <p className="p-10">Aucun créneau sélectionné.</p>;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      if (!availabilityId) return;
      const slot = await getAvailabilityLawyer(availabilityId);
      if (!slot) throw new Error('Créneau introuvable');

      await submitBookingRequest({
        lawyer_id: slot.lawyer_id,
        availability_id: availabilityId,
        guest_first_name: form.firstName.trim(),
        guest_last_name: form.lastName.trim(),
        guest_email: form.email.trim(),
        guest_phone: form.phone.trim() || null,
        note: form.note.trim() || null,
      });
      setSubmitted(true);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Erreur inconnue';
      setError(`Impossible d'enregistrer la demande : ${msg}`);
    } finally {
      setLoading(false);
    }
  }

  if (submitted) {
    return (
      <div className="mx-auto max-w-xl px-4 py-16 text-center">
        <CheckCircle2 className="mx-auto h-12 w-12 text-green-600" />
        <h1 className="mt-4 text-2xl font-bold">Demande enregistrée !</h1>
        <p className="mt-3 text-slate-600">
          Merci {form.firstName}. Nous avons bien reçu votre demande.
          L&rsquo;avocat·e vous recontactera à <strong>{form.email}</strong> sous 24 h
          pour confirmer le créneau et les modalités de paiement.
        </p>
        <p className="mt-2 text-sm text-slate-500">
          (Version bêta — le paiement Stripe sera activé à l&rsquo;ouverture publique.)
        </p>
        <Link
          href="/recherche"
          className="mt-6 inline-block rounded-lg bg-brand-600 text-white px-6 py-3 hover:bg-brand-700"
        >
          Retour à la recherche
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-xl px-4 py-10">
      <h1 className="text-2xl font-bold">Finaliser votre demande de rendez-vous</h1>

      <div className="mt-4 rounded-lg bg-amber-50 border border-amber-200 p-3 text-sm text-amber-800 flex gap-2">
        <Info className="h-4 w-4 flex-shrink-0 mt-0.5" />
        <span>
          Bêta privée&nbsp;: votre demande est transmise à l&rsquo;avocat·e qui vous
          recontacte sous 24 h. Aucun débit n&rsquo;est effectué à ce stade.
        </span>
      </div>

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
            placeholder="06 12 34 56 78"
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Note pour l&rsquo;avocat·e</label>
          <textarea
            value={form.note}
            onChange={(e) => setForm({ ...form, note: e.target.value })}
            rows={4}
            placeholder="Décrivez brièvement votre situation…"
            className="mt-1 w-full rounded-lg border px-3 py-2"
          />
        </div>

        {error && <p className="text-sm text-red-600">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-lg bg-brand-600 text-white py-3 font-medium hover:bg-brand-700 disabled:opacity-50"
        >
          {loading ? 'Envoi…' : 'Confirmer la demande'}
        </button>

        <p className="text-xs text-slate-500">
          En envoyant ce formulaire, vous acceptez que vos coordonnées soient transmises
          à l&rsquo;avocat·e pour traiter votre demande. Aucune donnée n&rsquo;est
          partagée à des tiers.
        </p>
      </form>
    </div>
  );
}

export default function BookingPage() {
  return (
    <Suspense fallback={<p className="p-10">Chargement…</p>}>
      <BookingContent />
    </Suspense>
  );
}
