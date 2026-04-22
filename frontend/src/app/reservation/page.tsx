'use client';

import { Suspense, useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { CheckCircle2, Info } from 'lucide-react';

function BookingContent() {
  const params = useSearchParams();
  const availabilityId = params.get('availabilityId');
  const [notes, setNotes] = useState('');
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    // On pourra brancher Stripe ici — en attendant, on simule une confirmation
  }, []);

  if (!availabilityId) {
    return <p className="p-10">Aucun créneau sélectionné.</p>;
  }

  if (submitted) {
    return (
      <div className="mx-auto max-w-xl px-4 py-16 text-center">
        <CheckCircle2 className="mx-auto h-12 w-12 text-green-600" />
        <h1 className="mt-4 text-2xl font-bold">Demande enregistrée !</h1>
        <p className="mt-3 text-slate-600">
          Nous avons bien reçu votre demande de rendez-vous. Vous recevrez un email de
          confirmation dès que l&rsquo;avocat aura validé le créneau et finalisé le paiement.
        </p>
        <p className="mt-2 text-sm text-slate-500">
          (Mode démo — la passerelle de paiement Stripe sera activée en bêta privée.)
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
      <h1 className="text-2xl font-bold">Finaliser votre rendez-vous</h1>

      <div className="mt-4 rounded-lg bg-amber-50 border border-amber-200 p-3 text-sm text-amber-800 flex gap-2">
        <Info className="h-4 w-4 flex-shrink-0 mt-0.5" />
        <span>
          Version bêta : la demande est enregistrée, l&rsquo;avocat vous recontacte sous 24 h.
          Le paiement sécurisé Stripe sera activé prochainement.
        </span>
      </div>

      <label className="mt-6 block text-sm font-medium">Note pour l&rsquo;avocat (optionnel)</label>
      <textarea
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
        rows={4}
        placeholder="Décrivez brièvement votre situation…"
        className="mt-2 w-full rounded-lg border px-3 py-2"
      />

      <button
        onClick={() => setSubmitted(true)}
        className="mt-6 w-full rounded-lg bg-brand-600 text-white py-3 font-medium hover:bg-brand-700"
      >
        Confirmer la demande
      </button>

      <p className="mt-3 text-xs text-slate-500">
        En bêta privée, vous serez recontacté·e par l&rsquo;avocat. Remboursement intégral en
        cas d&rsquo;annulation &gt; 24 h avant le RDV.
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
