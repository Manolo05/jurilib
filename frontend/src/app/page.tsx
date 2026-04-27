import Link from 'next/link';
import { Search, ShieldCheck, CalendarClock, CreditCard, Star, MapPin } from 'lucide-react';
import { listLawyers, listSpecialties, listCities } from '@/lib/supabase';

export const revalidate = 120;

const SPECIALTY_PILLS = [
  'droit-du-travail',
  'droit-penal',
  'droit-de-la-famille',
  'droit-immobilier',
  'droit-des-affaires',
  'droit-des-etrangers',
];

export default async function Home() {
  const [featured, specialties, cities] = await Promise.all([
    listLawyers({}).catch(() => ({ items: [], total: 0 })),
    listSpecialties().catch(() => []),
    listCities().catch(() => []),
  ]);

  const top = [...featured.items]
    .sort((a, b) => Number(b.ratingAvg) - Number(a.ratingAvg))
    .slice(0, 3);

  const specialtyLabels = new Map(specialties.map((s) => [s.slug, s.label]));

  return (
    <>
      <section className="relative min-h-[85vh] flex items-center overflow-hidden noise-overlay">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-gold/5 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent" />
        <div className="relative z-10 mx-auto max-w-6xl px-4 py-20 md:py-28">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 mb-8 rounded-full border border-gold/20 bg-gold/5">
            <span className="w-1.5 h-1.5 rounded-full bg-gold animate-pulse" />
            <span className="text-xs font-sans tracking-widest uppercase text-gold">La r&eacute;f&eacute;rence juridique</span>
          </div>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif font-medium text-juri-text max-w-4xl leading-tight tracking-tight">
            Prenez rendez-vous avec un avocat,{' '}
            <span className="text-gold-gradient italic">en quelques clics.</span>
          </h1>
          <p className="mt-6 text-lg text-juri-muted max-w-2xl font-sans leading-relaxed">
            Jurilib connecte clients et avocats inscrits au barreau&nbsp;: disponibilit&eacute;s en temps r&eacute;el, visio ou pr&eacute;sentiel, paiement s&eacute;curis&eacute;.
          </p>
          <form action="/recherche" className="mt-10 bg-juri-card rounded-2xl border border-juri-border p-2 flex flex-col md:flex-row gap-2 max-w-3xl">
            <select name="specialty" className="flex-1 px-4 py-3.5 rounded-xl bg-juri-bg border border-juri-border text-juri-text font-sans text-sm focus:outline-none focus:border-gold/50 transition-all cursor-pointer" defaultValue="">
              <option value="">Toutes les sp&eacute;cialit&eacute;s</option>
              {specialties.map((s) => (<option key={s.slug} value={s.slug}>{s.label}</option>))}
            </select>
            <select name="city" className="flex-1 px-4 py-3.5 rounded-xl bg-juri-bg border border-juri-border text-juri-text font-sans text-sm focus:outline-none focus:border-gold/50 transition-all cursor-pointer" defaultValue="">
              <option value="">Toute la France</option>
              {cities.map((c) => (<option key={c} value={c}>{c}</option>))}
            </select>
            <button className="bg-gradient-to-r from-gold-dark via-gold to-gold-light text-juri-bg rounded-xl px-8 py-3.5 font-sans font-semibold text-sm hover:shadow-[0_0_30px_rgba(201,168,76,0.3)] active:scale-[0.98] transition-all flex items-center justify-center gap-2">
              <Search className="h-4 w-4" /> Rechercher
            </button>
          </form>
          <div className="mt-6 flex flex-wrap gap-2 text-sm">
            {SPECIALTY_PILLS.map((s) => (
              <Link key={s} href={`/droit/${s}`} className="rounded-full bg-juri-card border border-juri-border px-3 py-1 text-juri-muted hover:border-gold/30 hover:text-gold transition-all font-sans text-xs">
                {specialtyLabels.get(s) ?? s.replaceAll('-', ' ')}
              </Link>
            ))}
          </div>
          <div className="mt-14 flex items-center gap-10">
            {[
              { v: featured.total > 0 ? `${featured.total}+` : '2 400+', l: 'Avocats v\u00e9rifi\u00e9s' },
              { v: '98%', l: 'Satisfaction' },
              { v: `${cities.length}`, l: 'Villes' },
            ].map((s) => (
              <div key={s.l}>
                <div className="font-serif text-2xl md:text-3xl text-gold font-medium">{s.v}</div>
                <div className="text-xs font-sans text-juri-muted mt-1 tracking-wide">{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-20 grid md:grid-cols-3 gap-6">
        {[
          { icon: ShieldCheck, title: 'Avocats v\u00e9rifi\u00e9s', text: 'Inscription au barreau contr\u00f4l\u00e9e pour chaque profil.' },
          { icon: CalendarClock, title: 'Dispos en temps r\u00e9el', text: "Visualisez l'agenda et r\u00e9servez 24/7." },
          { icon: CreditCard, title: 'Paiement s\u00e9curis\u00e9', text: 'Stripe, re\u00e7u automatique, facturation claire.' },
        ].map(({ icon: Icon, title, text }) => (
          <div key={title} className="rounded-2xl border border-juri-border bg-juri-card p-6 hover:border-gold/30 hover:bg-juri-card-hover transition-all duration-300 group">
            <Icon className="h-8 w-8 text-gold group-hover:scale-110 transition-transform" />
            <h3 className="mt-4 font-serif font-medium text-juri-text">{title}</h3>
            <p className="mt-2 text-sm text-juri-muted font-sans leading-relaxed">{text}</p>
          </div>
        ))}
      </section>

      {top.length > 0 && (
        <section className="mx-auto max-w-6xl px-4 pb-20">
          <div className="flex items-end justify-between">
            <h2 className="text-2xl font-serif font-medium text-juri-text">Avocats les mieux not&eacute;s</h2>
            <Link href="/recherche" className="text-sm text-gold hover:text-gold-light transition-colors font-sans">Voir tout le r&eacute;seau &rarr;</Link>
          </div>
          <div className="mt-6 grid md:grid-cols-3 gap-5">
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
                <p className="mt-4 font-serif font-semibold text-gold text-right">{l.consultationPrice} &euro;</p>
              </Link>
            ))}
          </div>
        </section>
      )}

      {cities.length > 0 && (
        <section className="mx-auto max-w-6xl px-4 pb-20">
          <h2 className="text-2xl font-serif font-medium text-juri-text">Trouvez un avocat par ville</h2>
          <p className="mt-2 text-juri-muted font-sans">Disponibilit&eacute;s en cabinet ou en visio dans les plus grandes villes fran&ccedil;aises.</p>
          <div className="mt-6 flex flex-wrap gap-3">
            {cities.map((c) => (
              <Link key={c} href={`/ville/${c.toLowerCase()}`} className="rounded-xl border border-juri-border bg-juri-card px-4 py-2 hover:border-gold/30 hover:bg-juri-card-hover transition-all font-sans text-sm text-juri-muted hover:text-gold">
                Avocat &agrave; <strong className="text-juri-text">{c}</strong>
              </Link>
            ))}
          </div>
        </section>
      )}

      <section className="border-t border-juri-border bg-juri-card/50">
        <div className="mx-auto max-w-6xl px-4 py-16 md:flex md:items-center md:justify-between gap-8">
          <div>
            <h2 className="text-2xl font-serif font-medium text-juri-text">Vous &ecirc;tes avocat&middot;e&nbsp;?</h2>
            <p className="mt-2 text-juri-muted max-w-xl font-sans leading-relaxed">Rejoignez la plateforme et d&eacute;veloppez votre cabinet&nbsp;: agenda int&eacute;gr&eacute;, visibilit&eacute; locale, commission uniquement sur rendez-vous honor&eacute;s.</p>
          </div>
          <Link href="/avocat-inscription" className="mt-6 md:mt-0 inline-block rounded-xl bg-gradient-to-r from-gold-dark via-gold to-gold-light text-juri-bg px-8 py-3.5 hover:shadow-[0_0_30px_rgba(201,168,76,0.3)] font-sans font-semibold transition-all">Rejoindre le r&eacute;seau</Link>
        </div>
      </section>
    </>
  );
}
