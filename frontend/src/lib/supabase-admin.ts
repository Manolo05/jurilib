// Server-only helpers qui utilisent la clé service_role Supabase.
// IMPORTANT : ne jamais importer ce fichier depuis un composant 'use client'.
// La clé service_role contourne les RLS et doit rester côté serveur.

if (typeof window !== 'undefined') {
  throw new Error('supabase-admin.ts ne doit jamais être chargé côté client.');
}

const SUPABASE_URL =
  process.env.NEXT_PUBLIC_SUPABASE_URL ?? 'https://uwkyyxdwevltriqmngkr.supabase.co';
const SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

export class AdminNotConfiguredError extends Error {
  constructor() {
    super(
      'SUPABASE_SERVICE_ROLE_KEY non définie. Ajoutez-la dans les variables d’environnement Vercel.',
    );
  }
}

async function sbAdminGet<T>(path: string): Promise<T> {
  if (!SERVICE_ROLE_KEY) throw new AdminNotConfiguredError();
  const res = await fetch(`${SUPABASE_URL}/rest/v1/${path}`, {
    headers: {
      apikey: SERVICE_ROLE_KEY,
      Authorization: `Bearer ${SERVICE_ROLE_KEY}`,
      Accept: 'application/json',
    },
    cache: 'no-store',
  });
  if (!res.ok) throw new Error(`Supabase admin ${res.status}: ${await res.text()}`);
  return res.json() as Promise<T>;
}

export type AdminBookingRequest = {
  id: string;
  created_at: string;
  lawyer_id: string;
  availability_id: string | null;
  guest_first_name: string;
  guest_last_name: string;
  guest_email: string;
  guest_phone: string | null;
  note: string | null;
  status: string | null;
};

export type AdminLawyerApplication = {
  id: string;
  created_at: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string | null;
  bar_association: string;
  years_experience: number;
  city: string;
  specialties: string[];
  message: string | null;
  status: string | null;
};

export function listBookingRequests(): Promise<AdminBookingRequest[]> {
  return sbAdminGet<AdminBookingRequest[]>(
    'booking_requests?select=*&order=created_at.desc&limit=200',
  );
}

export function listLawyerApplications(): Promise<AdminLawyerApplication[]> {
  return sbAdminGet<AdminLawyerApplication[]>(
    'lawyer_applications?select=*&order=created_at.desc&limit=200',
  );
}
