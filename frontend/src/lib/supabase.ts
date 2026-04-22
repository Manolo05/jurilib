// Minimal Supabase PostgREST client — évite d'ajouter @supabase/supabase-js
// pour ne pas toucher au lockfile. On tape directement l'API REST.

const SUPABASE_URL =
  process.env.NEXT_PUBLIC_SUPABASE_URL ?? 'https://uwkyyxdwevltriqmngkr.supabase.co';
const SUPABASE_ANON_KEY =
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ??
  'sb_publishable_iCFFe0NVU9lTEjJOU-QolA_so5ksInw';

type LawyerPublic = {
  id: string;
  slug: string;
  bar_association: string;
  years_experience: number;
  bio: string | null;
  consultation_price: string;
  consultation_duration: number;
  currency: string;
  rating_avg: string;
  rating_count: number;
  verified: string;
  accepts_video: boolean;
  accepts_in_person: boolean;
  address_line: string | null;
  city: string;
  postal_code: string | null;
  latitude: string | null;
  longitude: string | null;
  first_name: string;
  last_name: string;
  avatar_url: string | null;
  specialties: { slug: string; label: string }[] | null;
};

export type LawyerCard = {
  id: string;
  slug: string;
  city: string;
  barAssociation: string;
  yearsExperience: number;
  consultationPrice: string;
  ratingAvg: string;
  ratingCount: number;
  bio?: string | null;
  user: { firstName: string; lastName: string; avatarUrl: string | null };
  specialties: { specialty: { slug: string; label: string } }[];
};

export type Availability = {
  id: string;
  startsAt: string;
  endsAt: string;
  meetingType: string;
};

function mapLawyer(l: LawyerPublic): LawyerCard {
  return {
    id: l.id,
    slug: l.slug,
    city: l.city,
    barAssociation: l.bar_association,
    yearsExperience: l.years_experience,
    consultationPrice: l.consultation_price,
    ratingAvg: l.rating_avg,
    ratingCount: l.rating_count,
    bio: l.bio,
    user: {
      firstName: l.first_name,
      lastName: l.last_name,
      avatarUrl: l.avatar_url,
    },
    specialties: (l.specialties ?? []).map((s) => ({
      specialty: { slug: s.slug, label: s.label },
    })),
  };
}

async function sbGet<T>(path: string): Promise<T> {
  const res = await fetch(`${SUPABASE_URL}/rest/v1/${path}`, {
    headers: {
      apikey: SUPABASE_ANON_KEY,
      Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
      Accept: 'application/json',
    },
    // ISR 60s for lists, we can override per call
    next: { revalidate: 60 },
  });
  if (!res.ok) {
    throw new Error(`Supabase ${res.status}: ${await res.text()}`);
  }
  return res.json() as Promise<T>;
}

export async function listLawyers(filters: {
  city?: string;
  specialty?: string;
  priceMax?: number;
  ratingMin?: number;
}): Promise<{ items: LawyerCard[]; total: number }> {
  const qs = new URLSearchParams();
  qs.set('select', '*');
  qs.set('order', 'rating_avg.desc.nullslast');

  if (filters.city) qs.set('city', `ilike.%${filters.city}%`);
  if (filters.priceMax) qs.set('consultation_price', `lte.${filters.priceMax}`);
  if (filters.ratingMin) qs.set('rating_avg', `gte.${filters.ratingMin}`);

  let rows = await sbGet<LawyerPublic[]>(`lawyers_public?${qs}`);

  if (filters.specialty) {
    rows = rows.filter((l) =>
      (l.specialties ?? []).some((s) => s.slug === filters.specialty),
    );
  }

  return { items: rows.map(mapLawyer), total: rows.length };
}

export async function getLawyerBySlug(slug: string): Promise<LawyerCard | null> {
  const rows = await sbGet<LawyerPublic[]>(
    `lawyers_public?slug=eq.${encodeURIComponent(slug)}&select=*`,
  );
  return rows[0] ? mapLawyer(rows[0]) : null;
}

export async function listAvailabilities(lawyerId: string): Promise<Availability[]> {
  const nowIso = new Date().toISOString();
  const rows = await sbGet<
    { id: string; starts_at: string; ends_at: string; meeting_type: string }[]
  >(
    `availabilities?lawyer_id=eq.${lawyerId}&is_booked=eq.false&starts_at=gte.${nowIso}&order=starts_at.asc&limit=20`,
  );
  return rows.map((a) => ({
    id: a.id,
    startsAt: a.starts_at,
    endsAt: a.ends_at,
    meetingType: a.meeting_type,
  }));
}

export async function listSpecialties(): Promise<{ slug: string; label: string }[]> {
  return sbGet('specialties?select=slug,label&order=label.asc');
}
