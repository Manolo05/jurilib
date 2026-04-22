'use client';

import { Suspense, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';

function BookingContent() {
  const params = useSearchParams();
  const router = useRouter();
  const availabilityId = params.get('availabilityId');
  const [notes, setNotes] = useState('');
  const [loading, setLoading] = useState(false);

  async function book() {
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/appointments`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ availabilityId, notes, meetingType: 'video' }),
      });
      if (!res.ok) throw new Error('Erreur de réservation');
      const appt = await res.json();

      const checkout = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/payments/checkout`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ appointmentId: appt.id }),
      });
      const { url } = await checkout.json();
      window.location.href = url;
    } catch (e) {
      alert('Une erreur est survenue. Essayez à nouveau.');
    } finally {
      setLoading(false);
    }
  }

  if (!availabilityId) {
    return <p className="p-10">Aucun créneau sélectionné.</p>;
  }

  return (
    <div className="mx-auto max-w-xl px-4 py-10">
      <h1 className="text-2xl font-bold">Finaliser votre rendez-vous</h1>
      <label className="mt-6 block text-sm font-medium">Note pour l&rsquo;avocat (optionnel)</label>
      <textarea
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
        rows={4}
        placeholder="Décrivez brièvement votre situation…"
        className="mt-2 w-full rounded-lg border px-3 py-2"
      />

      <button
        onClick={book}
        disabled={loading}
        className="mt-6 w-full rounded-lg bg-brand-600 text-white py-3 font-medium hover:bg-brand-700 disabled:opacity-50"
      >
        {loading ? 'Redirection vers le paiement…' : 'Payer et confirmer'}
      </button>

      <p className="mt-3 text-xs text-slate-500">
        Paiement sécurisé par Stripe. Remboursement intégral en cas d&rsquo;annulation &gt; 24 h avant le RDV.
      </p>
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
