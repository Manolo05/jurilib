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
      {/* HERO */}
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
            <p className="mt-6 text-lg text-juri-muted max-w-2xl mx-auto font-sans leading-relaxed">Trouvez le sp&eacute;cialiste qu&rsquo;il vous faut et r&eacute;servez votre consultation juridique en ligne.</p>
            <form action="/recherche" className="mt-10 bg-juri-card rounded-2xl border border-juri-border p-3 flex flex-col md:flex-row gap-3 max-w-3xl mx-auto">
              <select name="specialty" className="flex-1 px-4 py-3.5 rounded-xl bg-juri-bg border border-juri-border text-juri-text font-sans text-sm" defaultValue="">
                <option value="">Toutes les sp&eacute;cialit&eacute;s</option>
                {specialties.map((s) => (<option key={s.slug} value={s.slug}>{s.label}</option>))}
              </select>
              <select name="city" className="flex-1 px-4 py-3.5 rounded-xl bg-juri-bg border border-juri-border text-juri-text font-sans text-sm" defaultValue="">
                <option value="">Toute la France</option>
                {cities.map((c) => (<option key={c} value={c}>{c}</option>))}
              </select>
              <button className="bg-gradient-to-r from-gold-dark via-gold to-gold-light text-juri-bg rounded-xl px-8 py-3.5 font-sans font-semibold text-sm flex items-center justify-center gap-2">
                <Search className="h-4 w-4" /> Rechercher
              </button>
            </form>
            <div className="mt-14 flex items-center justify-center gap-10">
              {[{ v: '2 400+', l: 'Avocats' }, { v: '98%', l: 'Satisfaction' }, { v: '14', l: 'Villes' }].map((s) => (
                <div key={s.l}><div className="font-serif text-2xl text-gold font-medium">{s.v}</div><div className="text-xs font-sans text-juri-muted mt-1">{s.l}</div></div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ââ FEATURES ââ */}
      <section className="mx-auto max-w-6xl px-4 py-20 grid md:grid-cols-3 gap-6">
        {[{ icon: ShieldCheck, t: 'Avocats v\u00e9rifi\u00e9s', d: 'Inscription au barreau contr\u00f4l\u00e9e.' }, { icon: CalendarClock, t: 'Dispos en temps r\u00e9el', d: 'Agenda visible, r\u00e9servez 24/7.' }, { icon: CreditCard, t: 'Paiement s\u00e9curis\u00e9', d: 'Stripe, re\u00e7u automatique.' }].map(({ icon: I, t, d }) => (
          <div key={t} className="rounded-2xl border border-juri-border bg-juri-card p-6 hover:border-gold/30 transition-all group">
            <I className="h-8 w-8 text-gold" />
            <h3 className="mt-4 font-serif font-medium text-juri-text">{t}</h3>
            <p className="mt-2 text-sm text-juri-muted font-sans">{d}</p>
          </div>
        ))}
      </section>

      {/* ââ CTA AHOCAT ââ */}
      <section className="border-t border-juri-border bg-juri-card/50">
        <div className="mx-auto max-w-6xl px-4 py-16 md:flex md:items-center md:justify-between gap-8">
          <div>
            <h2 className="text-2xl font-serif font-medium text-juri-text">Vous &ecirc;tes avocat&middot;e&nbsp;?</h2>
            <p className="mt-2 text-juri-muted max-w-xl font-sans">Rejoignez la plateforme et d&eacute;veloppez votre cabinet.</p>
          </div>
          <Link href="/avocat-inscription" className="mt-6 md:mt-0 inline-block rounded-xl bg-gradient-to-r from-gold-dark via-gold to-gold-light text-juri-bg px-8 py-3.5 font-sans font-semibold transition-all">Rejoindre le r&eacute;seau</Link>
        </div>
      </section>
    </>
  );
}
