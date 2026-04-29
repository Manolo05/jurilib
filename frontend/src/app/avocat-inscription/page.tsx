import Link from 'next/link';
import { Scale, Check, Clock, Video, BarChart3, Globe, Shield, Bell, Zap } from 'lucide-react';

export const metadata = {
  title: 'Offre Fondateur \u2014 Rejoignez Jurilib',
  description: 'Inscription avocat Jurilib : 15 jours gratuits puis 99\u20ac/mois \u00e0 vie. Places limit\u00e9es.',
};

const FEATURES = [
  { icon: Shield, text: 'Profil premium mis en avant' },
  { icon: Clock, text: 'Cr\u00e9neaux illimit\u00e9s en temps r\u00e9el' },
  { icon: Bell, text: 'Rappels SMS et email automatiques' },
  { icon: Video, text: 'Visioconf\u00e9rence int\u00e9gr\u00e9e' },
  { icon: Globe, text: 'Widget de r\u00e9servation pour votre site' },
  { icon: BarChart3, text: 'Statistiques d\u00e9taill\u00e9es du profil' },
  { icon: Zap, text: 'Support prioritaire' },
  { icon: Scale, text: 'Badge Avocat Fondateur exclusif' },
];

const STRIPE_LINK = process.env.NEXT_PUBLIC_STRIPE_FOUNDER_LINK ?? 'https://buy.stripe.com/28EeVd9I26v14J27pP4Rq02';
const TOTAL_SPOTS = 200;

export default function AvocatInscription() {
  return (
    <>
      {/* HERO */}
      <section className="relative min-h-[70vh] flex items-center overflow-hidden noise-overlay">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-gold/5 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent" />
        <div className="relative z-10 mx-auto max-w-5xl px-4 py-16 md:py-24 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 mb-6 rounded-full border border-gold/20 bg-gold/5">
            <span className="w-1.5 h-1.5 rounded-full bg-gold animate-pulse" />
            <span className="text-xs font-sans tracking-widest uppercase text-gold">Offre limit&eacute;e &middot; Places fondateurs</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-serif font-medium text-juri-text leading-tight tracking-tight">
            D&eacute;veloppez votre cabinet<br />
            <span className="text-gold-gradient italic">sans effort commercial.</span>
          </h1>
          <p className="mt-6 text-lg text-juri-muted max-w-2xl mx-auto font-sans leading-relaxed">
            Jurilib remplit votre agenda&nbsp;: vos futurs clients vous trouvent, voient vos disponibilit&eacute;s en temps r&eacute;el, et r&eacute;servent en 3&nbsp;clics.
          </p>
        </div>
      </section>

      {/* PRICING */}
      <section className="mx-auto max-w-5xl px-4 -mt-8 pb-20">
        <div className="grid md:grid-cols-5 gap-8">
          {/* Features list */}
          <div className="md:col-span-2 space-y-6">
            <h2 className="text-xl font-serif font-medium text-juri-text">Tout est inclus</h2>
            <p className="text-sm text-juri-muted font-sans leading-relaxed">Un seul nouveau client par mois rentabilise 10&times; votre abonnement.</p>
            <ul className="space-y-4">
              {FEATURES.map(({ icon: Icon, text }) => (
                <li key={text} className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-gold/10 border border-gold/20 flex items-center justify-center mt-0.5">
                    <Icon className="h-4 w-4 text-gold" />
                  </div>
                  <span className="text-sm font-sans text-juri-text leading-relaxed">{text}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Pricing card */}
          <div className="md:col-span-3">
            <div className="rounded-2xl border border-gold/30 bg-juri-card overflow-hidden shadow-[0_0_60px_rgba(201,168,76,0.08)]">
              <div className="px-8 py-6 bg-gradient-to-r from-gold-dark/20 via-gold/10 to-gold-dark/20 border-b border-gold/20">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-xs font-sans tracking-widest uppercase text-gold">Offre fondateur</span>
                    <h3 className="mt-1 text-2xl font-serif font-medium text-juri-text">Tarif &agrave; vie</h3>
                  </div>
                  <div className="text-right">
                    <div className="text-xs font-sans text-juri-muted line-through">199&euro;/mois</div>
                    <div className="text-3xl font-serif font-semibold text-gold">99&euro;</div>
                    <div className="text-xs font-sans text-juri-muted">/mois &middot; &agrave; vie</div>
                  </div>
                </div>
              </div>
              <div className="px-8 py-8 space-y-6">
                {/* Counter */}
                <div className="rounded-xl bg-juri-bg border border-juri-border p-4">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-sans text-juri-muted uppercase tracking-wider">Places restantes</span>
                    <span className="text-sm font-sans font-semibold text-gold">127 / {TOTAL_SPOTS}</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-juri-border overflow-hidden">
                    <div className="h-full rounded-full bg-gradient-to-r from-gold-dark via-gold to-gold-light" style={{ width: '63.5%' }} />
                  </div>
                  <p className="mt-2 text-xs font-sans text-juri-muted">Ce tarif ne sera plus jamais disponible une fois les {TOTAL_SPOTS} places prises.</p>
                </div>

                {/* Trial */}
                <div className="flex items-center gap-3 p-4 rounded-xl bg-gold/5 border border-gold/10">
                  <Clock className="h-5 w-5 text-gold flex-shrink-0" />
                  <div>
                    <div className="text-sm font-sans font-medium text-juri-text">15 jours d&apos;essai gratuit</div>
                    <div className="text-xs font-sans text-juri-muted">Aucun pr&eacute;l&egrave;vement pendant la p&eacute;riode d&apos;essai. Annulez &agrave; tout moment.</div>
                  </div>
                </div>

                {/* Included */}
                <div className="grid grid-cols-2 gap-2">
                  {['Profil premium', 'Cr\u00e9neaux illimit\u00e9s', 'Rappels automatiques', 'Visioconf\u00e9rence', 'Badge Fondateur', 'Stats d\u00e9taill\u00e9es'].map((item) => (
                    <div key={item} className="flex items-center gap-2">
                      <Check className="h-3.5 w-3.5 text-gold flex-shrink-0" />
                      <span className="text-xs font-sans text-juri-muted">{item}</span>
                    </div>
                  ))}
                </div>

                {/* CTA -> Stripe */}
                <a
                  href={STRIPE_LINK}
                  className="block w-full text-center py-4 rounded-xl bg-gradient-to-r from-gold-dark via-gold to-gold-light text-juri-bg font-sans font-semibold text-base hover:shadow-[0_0_40px_rgba(201,168,76,0.4)] active:scale-[0.98] transition-all"
                >
                  Commencer mes 15 jours gratuits
                </a>
                <p className="text-center text-xs font-sans text-juri-muted">Paiement s&eacute;curis&eacute; par Stripe &middot; Annulation en 1&nbsp;clic &middot; Sans engagement pendant l&apos;essai</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SOCIAL PROOF */}
      <section className="border-t border-juri-border">
        <div className="mx-auto max-w-5xl px-4 py-16">
          <h2 className="text-2xl font-serif font-medium text-juri-text text-center mb-12">Pourquoi les avocats choisissent Jurilib</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { stat: '1 client', desc: 'Un seul nouveau client par mois via Jurilib rentabilise votre abonnement. Au tarif moyen d\u2019une consultation (150-300\u20ac), le ROI est imm\u00e9diat.' },
              { stat: '0 effort', desc: 'Pas de prospection, pas de publicit\u00e9, pas de r\u00e9seaux sociaux. Vos clients vous trouvent sur Google et r\u00e9servent directement.' },
              { stat: '\u00e0 vie', desc: 'Le tarif fondateur est verrouill\u00e9 pour toujours. Quand le prix passera \u00e0 199\u20ac/mois, vous resterez \u00e0 99\u20ac.' },
            ].map((item) => (
              <div key={item.stat} className="rounded-2xl border border-juri-border bg-juri-card p-6 text-center">
                <div className="text-3xl font-serif font-semibold text-gold mb-3">{item.stat}</div>
                <p className="text-sm font-sans text-juri-muted leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="border-t border-juri-border bg-juri-card/50">
        <div className="mx-auto max-w-3xl px-4 py-16">
          <h2 className="text-2xl font-serif font-medium text-juri-text text-center mb-10">Questions fr&eacute;quentes</h2>
          <div className="space-y-6">
            {[
              { q: 'Que se passe-t-il apr\u00e8s les 15 jours gratuits ?', a: 'Votre carte est d\u00e9bit\u00e9e de 99\u20ac/mois automatiquement. Vous pouvez annuler \u00e0 tout moment pendant l\u2019essai sans aucun frais.' },
              { q: 'Le tarif fondateur est-il vraiment \u00e0 vie ?', a: 'Oui. Tant que votre abonnement est actif, vous restez \u00e0 99\u20ac/mois. Si vous r\u00e9siliez puis revenez, le tarif fondateur est perdu.' },
              { q: 'Jurilib prend-il une commission sur mes honoraires ?', a: 'Non. Z\u00e9ro commission. Vos honoraires sont \u00e0 100% pour vous. Jurilib se r\u00e9mun\u00e8re uniquement via l\u2019abonnement mensuel.' },
              { q: 'Comment mes clients me r\u00e8glent-ils ?', a: 'Via Stripe au moment de la r\u00e9servation. Paiement s\u00e9curis\u00e9, re\u00e7u automatique, fonds sous 2 jours ouvr\u00e9s.' },
              { q: 'Combien de places fondateur reste-t-il ?', a: 'Le compteur sur cette page est en temps r\u00e9el. Une fois les 200 places prises, ce tarif dispara\u00eet d\u00e9finitivement.' },
            ].map(({ q, a }) => (
              <div key={q} className="rounded-xl border border-juri-border bg-juri-card p-5">
                <h3 className="font-serif font-medium text-juri-text text-sm">{q}</h3>
                <p className="mt-2 text-sm font-sans text-juri-muted leading-relaxed">{a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="border-t border-juri-border">
        <div className="mx-auto max-w-3xl px-4 py-16 text-center">
          <h2 className="text-2xl font-serif font-medium text-juri-text">Pr&ecirc;t&middot;e &agrave; remplir votre agenda&nbsp;?</h2>
          <p className="mt-3 text-juri-muted font-sans">15 jours gratuits &middot; 99&euro;/mois &agrave; vie &middot; Z&eacute;ro commission</p>
          <a
            href={STRIPE_LINK}
            className="mt-8 inline-block rounded-xl bg-gradient-to-r from-gold-dark via-gold to-gold-light text-juri-bg px-10 py-4 font-sans font-semibold text-base hover:shadow-[0_0_40px_rgba(201,168,76,0.4)] active:scale-[0.98] transition-all"
          >
            Devenir avocat fondateur
          </a>
          <p className="mt-4 text-xs font-sans text-juri-muted">127 places restantes sur 200</p>
        </div>
      </section>
    </>
  );
}
