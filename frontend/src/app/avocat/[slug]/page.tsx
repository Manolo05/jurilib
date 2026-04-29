import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { Star, MapPin, Video, ChevronLeft, Phone, Mail, Clock, Building, Briefcase, GraduationCap, Euro, ExternalLink, Calendar } from 'lucide-react';
import { getLawyerBySlug } from '@/lib/supabase';

export const revalidate = 60;

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const lawyer = await getLawyerBySlug(params.slug).catch(() => null);
  if (!lawyer) return { title: 'Avocat introuvable' };
  return {
    title: `Me ${lawyer.user.firstName} ${lawyer.user.lastName} — Avocat ${lawyer.city}`,
    description: `Prenez rendez-vous avec Me ${lawyer.user.firstName} ${lawyer.user.lastName}, avocat ${lawyer.city}. Consultation en cabinet ou en visio.`,
  };
}

const SLOTS = [
  { time: '09:00', ok: true }, { time: '09:30', ok: false }, { time: '10:00', ok: true },
  { time: '10:30', ok: true }, { time: '11:00', ok: false }, { time: '14:00', ok: true },
  { time: '14:30', ok: true }, { time: '15:00', ok: true }, { time: '15:30', ok: false },
  { time: '16:00', ok: true }, { time: '16:30', ok: true }, { time: '17:00', ok: true },
];

export default async function LawyerProfilePage({ params }: { params: { slug: string } }) {
  const lawyer = await getLawyerBySlug(params.slug).catch(() => null);
  if (!lawyer) notFound();

  const visioLink = (lawyer as any).visioLink || (lawyer as any).website || null;

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      {/* BACK */}
      <Link href="/recherche" className="inline-flex items-center gap-1 text-sm text-juri-muted hover:text-gold transition-colors font-sans mb-6">
        <ChevronLeft className="h-4 w-4" /> Retour &agrave; la recherche
      </Link>

      <div className="grid md:grid-cols-[1fr_340px] gap-8">
        {/* LEFT — PROFILE */}
        <div className="space-y-6">
          {/* HEADER CARD */}
          <div className="rounded-2xl border border-juri-border bg-juri-card p-6">
            <div className="flex items-start gap-5">
              <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-gold-dark to-gold flex items-center justify-center text-juri-bg text-2xl font-serif font-medium shadow-[0_0_30px_rgba(201,168,76,0.15)]">
                {lawyer.user.firstName?.[0]}{lawyer.user.lastName?.[0]}
              </div>
              <div className="flex-1">
                <h1 className="text-2xl font-serif font-medium text-juri-text">
                  Me {lawyer.user.firstName} {lawyer.user.lastName}
                </h1>
                <p className="text-sm text-juri-muted mt-1 flex items-center gap-1 font-sans">
                  <MapPin className="h-3.5 w-3.5" /> {lawyer.city} &middot; Barreau de {lawyer.barAssociation}
                </p>
                <div className="flex items-center gap-3 mt-3">
                  <span className="flex items-center gap-1 text-sm font-sans">
                    <Star className="h-4 w-4 fill-gold text-gold" />
                    {Number(lawyer.ratingAvg).toFixed(1)}
                    <span className="text-juri-muted">({lawyer.ratingCount} avis)</span>
                  </span>
                  <span className="text-sm text-juri-muted font-sans flex items-center gap-1">
                    <Briefcase className="h-3.5 w-3.5" /> {lawyer.yearsExperience || '5+'} ans
                  </span>
                </div>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {lawyer.specialties?.map((s: any) => (
                    <span key={s.specialty.slug} className="text-xs bg-gold/10 text-gold border border-gold/20 rounded-full px-2.5 py-0.5 font-sans">
                      {s.specialty.label}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* BIO */}
          {lawyer.bio && (
            <div className="rounded-2xl border border-juri-border bg-juri-card p-6">
              <h2 className="font-serif font-medium text-juri-text mb-3 flex items-center gap-2">
                <GraduationCap className="h-5 w-5 text-gold" /> Pr&eacute;sentation
              </h2>
              <p className="text-sm text-juri-muted font-sans leading-relaxed">{lawyer.bio}</p>
            </div>
          )}

          {/* INFOS */}
          <div className="rounded-2xl border border-juri-border bg-juri-card p-6">
            <h2 className="font-serif font-medium text-juri-text mb-4">Informations</h2>
            <div className="grid sm:grid-cols-2 gap-4 text-sm font-sans">
              <div className="flex items-center gap-3 text-juri-muted">
                <Building className="h-4 w-4 text-gold" />
                <span>Cabinet &agrave; {lawyer.city}</span>
              </div>
              <div className="flex items-center gap-3 text-juri-muted">
                <Euro className="h-4 w-4 text-gold" />
                <span>Consultation d&egrave;s {lawyer.consultationPrice} &euro;</span>
              </div>
              <div className="flex items-center gap-3 text-juri-muted">
                <Clock className="h-4 w-4 text-gold" />
                <span>Dur&eacute;e : 30 &agraveute;e : 30 &agrave; 60 min</span>
              </div>
              <div className="flex items-center gap-3 text-juri-muted">
                <Video className="h-4 w-4 text-gold" />
                <span>Visioconf&eacute;rence disponible</span>
              </div>
              {lawyer.phone && (
                <div className="flex items-center gap-3 text-juri-muted">
                  <Phone className="h-4 w-4 text-gold" />
                  <span>{lawyer.phone}</span>
                </div>
              )}
              {lawyer.email && (
                <div className="flex items-center gap-3 text-juri-muted">
                  <Mail className="h-4 w-4 text-gold" />
                  <span>{lawyer.email}</span>
                </div>
              )}
            </div>
          </div>

          {/* AVIS */}
          {lawyer.reviews && lawyer.reviews.length > 0 && (
            <div className="rounded-2xl border border-juri-border bg-juri-card p-6">
              <h2 className="font-serif font-medium text-juri-text mb-4">Avis clients</h2>
              <div className="space-y-4">
                {lawyer.reviews.map((r: any, i: number) => (
                  <div key={i} className="border-b border-juri-border pb-4 last:border-0 last:pb-0">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="flex">
                        {Array(5).fill(0).map((_, j) => (
                          <Star key={j} className={`h-3.5 w-3.5 ${j < r.rating ? 'text-gold fill-gold' : 'text-juri-border'}`} />
                        ))}
                      </div>
                      <span className="text-xs text-juri-muted font-sans">{r.authorName}</span>
                    </div>
                    <p className="text-sm text-juri-muted font-sans">{r.content}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* RIGHT — BOOKING SIDEBAR */}
        <div className="md:sticky md:top-24 md:self-start space-y-5">
          {/* PRICE CARD */}
          <div className="rounded-2xl border border-juri-border bg-juri-card p-6 text-center">
            <p className="text-sm text-juri-muted font-sans mb-1">Consultation</p>
            <p className="text-3xl font-serif font-medium text-gold">{lawyer.consultationPrice} &euro;</p>
            <p className="text-xs text-juri-muted font-sans mt-1">30 &agrave; 60 minutes</p>
          </div>

          {/* VISIO BUTTON */}
          {visioLink && (
            <a
              href={visioLink}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-gold-dark via-gold to-gold-light text-juri-bg py-3.5 font-sans font-semibold text-sm hover:shadow-[0_0_30px_rgba(201,168,76,0.3)] active:scale-[0.98] transition-all"
            >
              <Video className="h-4 w-4" /> Rejoindre en visio
              <ExternalLink className="h-3.5 w-3.5" />
            </a>
          )}

          {/* BOOKING SLOTS */}
          <div className="rounded-2xl border border-juri-border bg-juri-card p-6">
            <h3 className="font-serif font-medium text-juri-text mb-1 flex items-center gap-2">
              <Calendar className="h-4 w-4 text-gold" /> Prendre rendez-vous
            </h3>
            <p className="text-xs text-juri-muted font-sans mb-4">Choisissez un cr&eacute;neau disponible</p>

            <div className="grid grid-cols-3 gap-2">
              {SLOTS.map((s) => (
                <Link
                  key={s.time}
                  href={s.ok ? `/reservation?avocat=${params.slug}&heure=${s.time}` : '#'}
                  className={`rounded-lg py-2 text-center text-sm font-sans transition-all ${
                    s.ok
                      ? 'border border-juri-border bg-juri-bg text-juri-text hover:border-gold/50 hover:text-gold'
                      : 'border border-juri-border/30 bg-juri-bg/50 text-juri-muted/40 cursor-not-allowed line-through'
                  }`}
                >
                  {s.time}
                </Link>
              ))}
            </div>
          </div>

          {/* CONTACT */}
          <div className="rounded-2xl border border-juri-border bg-juri-card p-6 space-y-3">
            <a
              href={`tel:${lawyer.phone || ''}`}
              className="w-full flex items-center justify-center gap-2 rounded-xl border border-juri-border py-2.5 text-sm font-sans text-juri-text hover:border-gold/50 hover:text-gold transition-all"
            >
              <Phone className="h-4 w-4" /> Appeler le cabinet
            </a>
            <a
              href={`mailto:${lawyer.email || 'contact@jurilib.fr'}`}
              className="w-full flex items-center justify-center gap-2 rounded-xl border border-juri-border py-2.5 text-sm font-sans text-juri-text hover:border-gold/50 hover:text-gold transition-all"
            >
              <Mail className="h-4 w-4" /> Envoyer un email
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
