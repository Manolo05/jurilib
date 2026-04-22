'use client';

import useSWR from 'swr';

const fetcher = (url: string) =>
  fetch(url, { headers: { Authorization: `Bearer ${typeof window !== 'undefined' ? localStorage.getItem('token') : ''}` } }).then(
    (r) => r.json(),
  );

export default function LawyerDashboard() {
  const { data: appts } = useSWR(`${process.env.NEXT_PUBLIC_API_URL}/appointments/me`, fetcher);

  const revenue = (appts ?? [])
    .filter((a: any) => a.status === 'completed' || a.status === 'confirmed')
    .reduce((sum: number, a: any) => sum + Number(a.priceCharged), 0);

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <h1 className="text-2xl font-bold">Tableau de bord</h1>

      <div className="mt-6 grid md:grid-cols-3 gap-5">
        <div className="rounded-xl border p-5">
          <p className="text-sm text-slate-500">RDV à venir</p>
          <p className="text-3xl font-bold">
            {(appts ?? []).filter((a: any) => new Date(a.startsAt) > new Date() && a.status !== 'cancelled').length}
          </p>
        </div>
        <div className="rounded-xl border p-5">
          <p className="text-sm text-slate-500">Revenus mois en cours</p>
          <p className="text-3xl font-bold">{revenue} €</p>
        </div>
        <div className="rounded-xl border p-5">
          <p className="text-sm text-slate-500">Clients uniques</p>
          <p className="text-3xl font-bold">{new Set((appts ?? []).map((a: any) => a.clientId)).size}</p>
        </div>
      </div>

      <h2 className="mt-10 text-lg font-semibold">Prochains rendez-vous</h2>
      <div className="mt-3 rounded-xl border divide-y">
        {(appts ?? []).slice(0, 10).map((a: any) => (
          <div key={a.id} className="p-4 flex items-center justify-between">
            <div>
              <p className="font-medium">
                {a.client.firstName} {a.client.lastName}
              </p>
              <p className="text-sm text-slate-500">
                {new Date(a.startsAt).toLocaleString('fr-FR')} · {a.meetingType}
              </p>
            </div>
            <span
              className={`text-xs rounded-full px-2 py-1 ${
                a.status === 'confirmed' ? 'bg-green-100 text-green-700' : 'bg-slate-100 text-slate-700'
              }`}
            >
              {a.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
