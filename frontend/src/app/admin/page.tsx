import Link from 'next/link';
import {
  listBookingRequests,
  listLawyerApplications,
  AdminNotConfiguredError,
} from '@/lib/supabase-admin';

export const metadata = {
  title: 'Admin — Leads Jurilib',
  robots: { index: false, follow: false },
};

export const dynamic = 'force-dynamic';

function formatDate(iso: string) {
  try {
    return new Date(iso).toLocaleString('fr-FR', {
      dateStyle: 'short',
      timeStyle: 'short',
    });
  } catch {
    return iso;
  }
}

export default async function AdminPage({
  searchParams,
}: {
  searchParams?: Promise<{ key?: string }> | { key?: string };
}) {
  const raw = await Promise.resolve(searchParams ?? {});
  const provided = (raw as { key?: string }).key ?? '';
  const expected = process.env.ADMIN_PASSWORD;

  if (!expected) {
    return (
      <section className="mx-auto max-w-2xl px-4 py-16">
        <h1 className="text-2xl font-bold">Admin non configurée</h1>
        <p className="mt-4 text-slate-600">
          La variable d&rsquo;environnement <code>ADMIN_PASSWORD</code> n&rsquo;est pas
          définie sur Vercel. Ajoutez-la dans <em>Project Settings → Environment
          Variables</em>, puis redéployez.
        </p>
      </section>
    );
  }

  if (provided !== expected) {
    return (
      <section className="mx-auto max-w-md px-4 py-24">
        <h1 className="text-2xl font-bold">Accès restreint</h1>
        <p className="mt-2 text-sm text-slate-600">
          Cette page est réservée à l&rsquo;équipe Jurilib.
        </p>
        <form className="mt-6 flex gap-2">
          <input
            type="password"
            name="key"
            placeholder="Clé admin"
            className="flex-1 rounded-md border px-3 py-2 text-sm"
            autoFocus
          />
          <button className="rounded-md bg-brand-600 text-white px-4 py-2 text-sm hover:bg-brand-700">
            Entrer
          </button>
        </form>
      </section>
    );
  }

  let bookings: Awaited<ReturnType<typeof listBookingRequests>> = [];
  let applications: Awaited<ReturnType<typeof listLawyerApplications>> = [];
  let error: string | null = null;

  try {
    [bookings, applications] = await Promise.all([
      listBookingRequests(),
      listLawyerApplications(),
    ]);
  } catch (e) {
    error = e instanceof AdminNotConfiguredError
      ? e.message
      : `Erreur Supabase : ${(e as Error).message}`;
  }

  if (error) {
    return (
      <section className="mx-auto max-w-2xl px-4 py-16">
        <h1 className="text-2xl font-bold">Erreur</h1>
        <p className="mt-4 text-red-600">{error}</p>
      </section>
    );
  }

  return (
    <section className="mx-auto max-w-6xl px-4 py-12 space-y-12">
      <header className="flex items-end justify-between">
        <div>
          <h1 className="text-3xl font-bold">Leads Jurilib</h1>
          <p className="text-sm text-slate-500">
            {bookings.length} demande{bookings.length > 1 ? 's' : ''} de RDV ·{' '}
            {applications.length} candidature{applications.length > 1 ? 's' : ''} avocat
          </p>
        </div>
        <Link href="/" className="text-sm text-brand-600 hover:underline">
          ← Retour au site
        </Link>
      </header>

      <div>
        <h2 className="text-xl font-semibold mb-4">Demandes de rendez-vous</h2>
        {bookings.length === 0 ? (
          <p className="text-sm text-slate-500">Aucune demande pour le moment.</p>
        ) : (
          <div className="overflow-x-auto rounded-lg border">
            <table className="w-full text-sm">
              <thead className="bg-slate-50 text-left">
                <tr>
                  <th className="px-3 py-2">Date</th>
                  <th className="px-3 py-2">Client</th>
                  <th className="px-3 py-2">Email</th>
                  <th className="px-3 py-2">Téléphone</th>
                  <th className="px-3 py-2">Avocat ID</th>
                  <th className="px-3 py-2">Note</th>
                  <th className="px-3 py-2">Statut</th>
                </tr>
              </thead>
              <tbody>
                {bookings.map((b) => (
                  <tr key={b.id} className="border-t align-top">
                    <td className="px-3 py-2 whitespace-nowrap">{formatDate(b.created_at)}</td>
                    <td className="px-3 py-2">
                      {b.guest_first_name} {b.guest_last_name}
                    </td>
                    <td className="px-3 py-2">
                      <a href={`mailto:${b.guest_email}`} className="text-brand-600 hover:underline">
                        {b.guest_email}
                      </a>
                    </td>
                    <td className="px-3 py-2">{b.guest_phone ?? '—'}</td>
                    <td className="px-3 py-2 font-mono text-xs">{b.lawyer_id.slice(0, 8)}…</td>
                    <td className="px-3 py-2 max-w-xs">{b.note ?? '—'}</td>
                    <td className="px-3 py-2">
                      <span className="rounded-full bg-slate-100 px-2 py-0.5 text-xs">
                        {b.status ?? 'pending'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-4">Candidatures avocats</h2>
        {applications.length === 0 ? (
          <p className="text-sm text-slate-500">Aucune candidature pour le moment.</p>
        ) : (
          <div className="overflow-x-auto rounded-lg border">
            <table className="w-full text-sm">
              <thead className="bg-slate-50 text-left">
                <tr>
                  <th className="px-3 py-2">Date</th>
                  <th className="px-3 py-2">Avocat</th>
                  <th className="px-3 py-2">Contact</th>
                  <th className="px-3 py-2">Barreau</th>
                  <th className="px-3 py-2">Années</th>
                  <th className="px-3 py-2">Ville</th>
                  <th className="px-3 py-2">Spécialités</th>
                  <th className="px-3 py-2">Message</th>
                </tr>
              </thead>
              <tbody>
                {applications.map((a) => (
                  <tr key={a.id} className="border-t align-top">
                    <td className="px-3 py-2 whitespace-nowrap">{formatDate(a.created_at)}</td>
                    <td className="px-3 py-2">
                      Me {a.first_name} {a.last_name}
                    </td>
                    <td className="px-3 py-2">
                      <a href={`mailto:${a.email}`} className="text-brand-600 hover:underline">
                        {a.email}
                      </a>
                      {a.phone ? <div className="text-xs text-slate-500">{a.phone}</div> : null}
                    </td>
                    <td className="px-3 py-2">{a.bar_association}</td>
                    <td className="px-3 py-2">{a.years_experience}</td>
                    <td className="px-3 py-2">{a.city}</td>
                    <td className="px-3 py-2 max-w-xs">
                      <div className="flex flex-wrap gap-1">
                        {(a.specialties ?? []).map((s) => (
                          <span key={s} className="text-xs bg-brand-50 text-brand-700 rounded px-1.5 py-0.5">
                            {s}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="px-3 py-2 max-w-sm">{a.message ?? '—'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </section>
  );
}
