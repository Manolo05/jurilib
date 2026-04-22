const API = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:3001';

export async function api<T>(path: string, init: RequestInit = {}): Promise<T> {
  const res = await fetch(`${API}${path}`, {
    headers: { 'Content-Type': 'application/json', ...(init.headers ?? {}) },
    ...init,
    cache: 'no-store',
  });
  if (!res.ok) throw new Error(`${res.status} ${await res.text()}`);
  return res.json() as Promise<T>;
}

export type LawyerCard = {
  id: string;
  slug: string;
  city: string;
  barAssociation: string;
  yearsExperience: number;
  consultationPrice: string;
  ratingAvg: string;
  ratingCount: number;
  user: { firstName: string; lastName: string; avatarUrl: string | null };
  specialties: { specialty: { slug: string; label: string } }[];
};
