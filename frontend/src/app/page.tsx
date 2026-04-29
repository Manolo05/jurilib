import Link from 'next/link';
import { Search, MapPin, Star, ShieldCheck, CalendarClock, CreditCard, Video, Scale, Home, Briefcase, Building, Car, Coins, FileText, MessageSquare, CalendarCheck, ChevronRight } from 'lucide-react';
import { listLawyers, listSpecialties, listCities } from '@/lib/supabase';

export const revalidate = 120;

const SPECS = [
  { slug: 'droit-de-la-famille', label: 'Droit de la famille', desc: "Divorce, garde, pensions, successions", icon: 'Home' },
  { slug: 'droit-du-travail', label: 'Droit du travail', desc: "Contrats, licenciement, prud'hommes", icon: 'Briefcase' },
  { slug: 'droit-des-affaires', label: 'Droit des affaires', desc: "Cr\u00e9ation d'entreprise, contrats, litiges", icon: 'Building' },
  { slug: 'droit-immobilier', label: 'Droit immobilier', desc: "Achat/vente, baux, copropri\u00e9t\u00e9", icon: 'Home' },
  { slug: 'droit-penal', label: 'Droit p\u00e9nal', desc: "D\u00e9fense p\u00e9nale, infractions", icon: 'Scale' },
  { slug: 'droit-des-etrangers', label: 'Droit des \u00e9trangers', desc: "Visa, s\u00e9jour, asile", icon: 'FileText' },
  { slug: 'droit-fiscal', label: 'Droit fiscal', desc: "Fiscalit\u00e9, contr\u00f4les", icon: 'Coins' },
  { slug: 'droit-routier', label: 'Droit routier', desc: "Infractions, permis, accidents", icon: 'Car' },
];

const ICONS: Record<string, React.ReactNode> = {
  Home: <Home className="h-7 w-7 text-gold" />, Briefcase: <Briefcase className="h-7 w-7 text-gold" />,
  Building: <Building className="h-7 w-7 text-gold" />, Scale: <Scale className="h-7 w-7 text-gold" />,
  FileText: <FileText className="h-7 w-7 text-gold" />, Coins: <Coins className="h-7 w-7 text-gold" />,
  Car: <Car className="h-7 w-7 text-gold" />,
};

const STEPS = [
  { id: 1, title: 'Recherchez', desc: "Trouvez l'avocat qui correspond \u00e0 vos besoins.", icon: <Search className="h-8 w-8 text-gold" /> },
  { id: 2, title: 'R\u00e9servez', desc: "Choisissez un cr\u00e9neau et confirmez en ligne.", icon: <CalendarCheck className="h-8 w-8 text-gold" /> },
  { id: 3, title: 'Consultez', desc: "En cabinet ou en visio, selon votre pr\u00e9f\u00e9rence.", icon: <MessageSquare className="h-8 w-8 text-gold" /> },
];

const REVIEWS = [
  { id: 1, text: "J'ai trouv\u00e9 un avocat en droit de la famille en moins de 5 minutes. RDV confirm\u00e9 imm\u00e9diatement.", author: "Marie D.", rating: 5 },
  { id: 2, text: "Interface intuitive. Visio-consultation le jour m\u00eame avec un sp\u00e9cialiste en droit du travail.", author: "Thomas L.", rating: 5 },
  { id: 3, text: "Service remarquable. Les avis clients m'ont rassur\u00e9 avant de choisir mon avocat.", author: "Sophie M.", rating: 5 },
];

export default async function HomePage() {
  const [featured, specialties, cities] = await Promise.all([
    listLawyers({}).catch(() => ({ items: [], total: 0 })),
    listSpecialties().catch(() => []),
    listCities().catch(() => []),
  ]);
  const top = [...featured.items].sort((a, b) => Number(b.ratingAvg) - Number(a.ratingAvg)).slice(0, 3);

  return (
    <>
      {/* ── HERO ── */}
      <section className="relative min-h-[85vh] flex items-center overflow-hidden noise-overlay">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-gold/5 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent" />
        <div className="relative z-10 mx-auto max-w-6xl px-4 py-20 md:py-28">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 mb-8 rounded-full border border-gold/20 bg-gold/5">
              <span className="w-1.5 h-1.5 rounded-full bg-gold animate-pulse" />
              <span className="text-xs font-sans tracking-widest uppercase text-gold">La r&eacute;f&eacute;rence juridique</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-medium text-juri-text leading-tight tracking-tight">
              Prenez rendez-vous avec un avocat,{' '}
              <span className="text-gold-gradient italic">en quelques clics.</span>
            </h1>
            <p className="mt-6 text-lg text-juri-muted max-w-2xl mx-auto font-sans leading-relaxed">
              Trouvez le sp&eacute;cialiste qu&rsquo;il vous faut et r&eacute;servez votre consultation juridique en ligne, rapidement et simplement.
            </p>
            <form action="/recherche" className="mt-10 bg-juri-card rounded-2xl border border-juri-border p-3 flex flex-col md:flex-row gap-3 max-w-3xl mx-auto shadow-[0_0_60px_rgba(201,168,76,0.06)]">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-juri-muted pointer-events-none" />
                <select name="specialty" className="w-full pl-10 pr-4 py-3.5 rounded-xl bg-juri-bg border border-juri-border text-juri-text font-sans text-sm focus:outline-none focus:border-gold/50 transition-all cursor-pointer appearance-none" defaultValue="">
                  <option value="">Toutes les sp&eacute;cialit&eacute;s</option>
                  {specialties.map((s) => (<option key={s.slug} value={s.slug}>{s.label}</option>))}
                </select>
              </div>
              <div className="relative flex-1">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-juri-muted pointer-events-none" />
                <select name="city" className="w-full pl-10 pr-4 py-3.5 rounded-xl bg-juri-bg border border-juri-border text-juri-text font-sans text-sm focus:outline-none focus:border-gold/50 transition-all cursor-pointer appearance-none" defaultValue="">
                  <option value="">Toute la France</option>
                  {cities.map((c) => (<option key={c} value={c}>{c}</option>))}
                </select>
              </div>
              <button className="bg-gradient-to-r from-gold-dark via-gold to-gold-light text-juri-bg rounded-xl px-8 py-3.5 font-sans font-semibold text-sm hover:shadow-[0_0_30px_rgba(201,168,76,0.3)] active:scale-[0.98] transition-all flex items-center justify-center gap-2">
                <Search className="h-4 w-4" /> Rechercher
              </button>
            </form>
            <div className="mt-6 flex flex-wrap justify-center gap-2">
              {SPECS.slice(0, 6).map((s) => (
                <Link key={s.slug} href={`/droit/${s.slug}`} className="rounded-full bg-juri-card border border-juri-border px-3 py-1 text-juri-muted hover:border-gold/30 hover:text-gold transition-all font-sans text-xs">{s.label}</Link>
              ))}
            </div>
            <div className="mt-14 flex items-center justify-center gap-10 md:gap-16">
              {[{ v: featured.total > 0 ? `${featured.total}+` : '2 400+', l: 'Avocats' }, { v: '98%', l: 'Satisfaction' }, { v: `${cities.length || 14}`, l: 'Villes' }].map((s) => (
                <div key={s.l}><div className="font-serif text-2xl md:text-3xl text-gold font-medium">{s.v}</div><div className="text-xs font-sans text-juri-muted mt-1">{s.l}</div></div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── FEATURES ── */}
      <section className="mx-auto max-w-6xl px-4 py-20 grid md:grid-cols-3 gap-6">
        {[{ icon: ShieldCheck, t: 'Avocats v\u00e9rifi\u00e9s', d: 'Inscription au barreau contr\u00f4l\u00e9e.' }, { icon: CalendarClock, t: 'Dispos en temps r\u00e9el', d: "Agenda visible, r\u00e9servez 24/7." }, { icon: CreditCard, t: 'Paiement s\u00e9curis\u00e9', d: 'Stripe, re\u00e7u automatique.' }].map(({ icon: I, t, d }) => (
          <div key={t} className="rounded-2xl border border-juri-border bg-juri-card p-6 hover:border-gold/30 transition-all duration-300 group">
            <I className="h-8 w-8 text-gold group-hover:scale-110 transition-transform" />
            <h3 className="mt-4 font-serif font-medium text-juri-text">{t}</h3>
            <p className="mt-2 text-sm text-juri-muted font-sans">{d}</p>
          </div>
        ))}
      </section>

      {/* ── SPECIALTIES ── */}
      <section className="border-t border-juri-border bg-juri-card/30">
        <div className="mx-auto max-w-6xl px-4 py-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-serif font-medium text-juri-text">Nos sp&eacute;cialit&eacute;s juridiques</h2>
            <p className="mt-3 text-juri-muted font-sans max-w-2xl mx-auto">Consultez des avocats sp&eacute;cialis&eacute;s dans tous les domaines du droit</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {SPECS.map((s) => (
              <Link key={s.slug} href={`/droit/${s.slug}`} className="rounded-2xl border border-juri-border bg-juri-card p-5 text-center hover:border-gold/30 hover:shadow-[0_0_40px_rgba(201,168,76,0.06)] transition-all duration-300 group">
                <div className="mx-auto w-14 h-14 rounded-2xl bg-gold/10 border border-gold/20 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">{ICONS[s.icon]}</div>
                <h3 className="font-serif font-medium text-juri-text text-sm group-hover:text-gold transition-colors">{s.label}</h3>
                <p className="mt-1 text-xs text-juri-muted font-sans">{s.desc}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section className="border-t border-juri-border">
        <div className="mx-auto max-w-6xl px-4 py-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-serif font-medium text-juri-text">Comment &ccedil;a marche</h2>
            <p className="mt-3 text-juri-muted font-sans">Trois &eacute;tapes simples pour consulter un avocat</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {STEPS.map((s) => (
              <div key={s.id} className="text-center">
                <div className="mx-auto w-16 h-16 rounded-2xl bg-juri-card border border-juri-border flex items-center justify-center mb-4 shadow-[0_0_30px_rgba(201,168,76,0.08)]">{s.icon}</div>
                <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-gradient-to-r from-gold-dark to-gold text-juri-bg text-sm font-sans font-semibold mb-3">{s.id}</span>
                <h3 className="font-serif font-medium text-juri-text text-lg">{s.title}</h3>
                <p className="mt-2 text-sm text-juri-muted font-sans">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TOP LAWYERS ── */}
      {top.length > 0 && (
        <section className="border-t border-juri-border bg-juri-card/30">
          <div className="mx-auto max-w-6xl px-4 py-20">
            <div className="flex items-end justify-between mb-8">
              <h2 className="text-2xl font-serif font-medium text-juri-text">Avocats les mieux not&eacute;s</h2>
              <Link href="/recherche" className="text-sm text-gold hover:text-gold-light font-sans">Voir tout &rarr;</Link>
            </div>
            <div className="grid md:grid-cols-3 gap-5">
              {top.map((l) => (
                <Link key={l.id} href={`/avocat/${l.slug}`} className="rounded-2xl border border-juri-border bg-juri-card p-5 hover:border-gold/30 hover:shadow-[0_0_40px_rgba(201,168,76,0.06)] transition-all duration-300 group">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-serif font-medium text-juri-text group-hover:text-gold transition-colors">Me {l.user.firstName} {l.user.lastName}</h3>
                      <p className="text-sm text-juri-muted mt-1 flex items-center gap-1 font-sans"><MapPin className="h-3 w-3" /> {l.city}</p>
                    </div>
                    <span className="flex items-center gap-1 text-sm font-sans"><Star className="h-4 w-4 fill-gold text-gold" />{Number(l.ratingAvg).toFixed(1)}</span>
                  </div>
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {l.specialties.slice(0, 2).map((s) => (
                      <span key={s.specialty.slug} className="text-xs bg-gold/10 text-gold border border-gold/20 rounded-full px-2 py-0.5 font-sans">{s.specialty.label}</span>
                    ))}
                  </div>
                  <div className="mt-4 flex items-center justify-between pt-3 border-t border-juri-border">
                    <span className="text-sm text-juri-muted flex items-center gap-1 font-sans"><Video className="h-4 w-4" /> Visio</span>
                    <span className="font-serif font-semibold text-gold">{l.consultationPrice} &euro;</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── TESTIMONIALS ── */}
      <section className="border-t border-juri-border">
        <div className="mx-auto max-w-6xl px-4 py-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-serif font-medium text-juri-text">Ils nous font confiance</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {REVIEWS.map((r) => (
              <div key={r.id} className="rounded-2xl border border-juri-border bg-juri-card p-6 hover:border-gold/30 transition-all">
                <div className="flex mb-4">{Array(5).fill(0).map((_, i) => (<Star key={i} className={`h-4 w-4 ${i < r.rating ? 'text-gold fill-gold' : 'text-juri-border'}`} />))}</div>
                <p className="text-sm text-juri-muted font-sans leading-relaxed italic">&ldquo;{r.text}&rdquo;</p>
                <p className="mt-4 font-serif font-medium text-juri-text text-sm">{r.author}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CITIES ── */}
      {cities.length > 0 && (
        <section className="border-t border-juri-border bg-juri-card/30">
          <div className="mx-auto max-w-6xl px-4 py-20">
            <h2 className="text-2xl font-serif font-medium text-juri-text">Trouvez un avocat par ville</h2>
            <div className="mt-6 flex flex-wrap gap-3">
              {cities.map((c) => (
                <Link key={c} href={`/ville/${c.toLowerCase()}`} className="rounded-xl border border-juri-border bg-juri-card px-4 py-2 hover:border-gold/30 transition-all font-sans text-sm text-juri-muted hover:text-gold">
                  Avocat &agrave; <strong className="text-juri-text">{c}</strong>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── CTA AVOCAT ── */}
      <section className="border-t border-juri-border relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-gold-dark/10 via-gold/5 to-gold-dark/10 pointer-events-none" />
        <div className="relative mx-auto max-w-6xl px-4 py-16 md:flex md:items-center md:justify-between gap-8">
          <div>
            <h2 className="text-2xl font-serif font-medium text-juri-text">Vous &ecirc;tes avocat&middot;e&nbsp;?</h2>
            <p className="mt-2 text-juri-muted max-w-xl font-sans leading-relaxed">Rejoignez Jurilib et d&eacute;veloppez votre cabinet&nbsp;: agenda int&eacute;gr&eacute;, visibilit&eacute; locale, z&eacute;ro commission.</p>
          </div>
          <Link href="/avocat-inscription" className="mt-6 md:mt-0 inline-block rounded-xl bg-gradient-to-r from-gold-dark via-gold to-gold-light text-juri-bg px-8 py-3.5 hover:shadow-[0_0_30px_rgba(201,168,76,0.3)] font-sans font-semibold transition-all">Rejoindre le r&eacute;seau</Link>
        </div>
      </section>
    </>
  );
}
