// @ts-nocheck
import Link from 'next/link';
import { CheckCircle, ArrowRight, Calendar, Video, BarChart3, Crown } from 'lucide-react';

export const metadata = {
  title: 'Bienvenue sur Jurilib — Votre compte fondateur est activ\u00e9',
  description: 'F\u00e9licitations ! Configurez votre profil avocat et commencez \u00e0 recevoir des clients.',
};

export default function BienvenuePage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16">
      {/* SUCCESS HEADER */}
      <div className="text-center mb-12">
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gold/10 border border-gold/20 mb-6">
          <CheckCircle className="h-10 w-10 text-gold" />
        </div>
        <h1 className="text-3xl md:text-4xl font-serif font-medium text-juri-text">
          Bienvenue dans le r&eacute;seau Jurilib !
        </h1>
        <p className="mt-4 text-juri-muted font-sans max-w-xl mx-auto leading-relaxed">
          Votre compte <span className="text-gold font-semibold">Avocat Fondateur</span> est activ&eacute;. Vous b&eacute;n&eacute;ficiez de 15 jours d&rsquo;essai gratuit, puis 99&euro;/mois &agrave; vie.
        </p>
        <div className="inline-flex items-center gap-2 mt-4 px-4 py-1.5 rounded-full border border-gold/20 bg-gold/5">
          <Crown className="h-4 w-4 text-gold" />
          <span className="text-xs font-sans tracking-widest uppercase text-gold">Fondateur</span>
        </div>
      </div>

      {/* NEXT STEPS */}
      <div className="space-y-4 mb-12">
        <h2 className="font-serif font-medium text-juri-text text-xl text-center mb-6">Prochaines &eacute;tapes</h2>

        <div className="rounded-2xl border border-juri-border bg-juri-card p-6 flex items-start gap-4 hover:border-gold/30 transition-all">
          <span className="flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-r from-gold-dark to-gold text-juri-bg text-sm font-sans font-bold shrink-0">1</span>
          <div>
            <h3 className="font-serif font-medium text-juri-text">Compl&eacute;tez votre profil</h3>
            <p className="text-sm text-juri-muted font-sans mt-1">Ajoutez votre photo, votre bio, vos sp&eacute;cialit&eacute;s et vos tarifs. Un profil complet re&ccedil;oit 3x plus de demandes.</p>
          </div>
        </div>

        <div className="rounded-2xl border border-juri-border bg-juri-card p-6 flex items-start gap-4 hover:border-gold/30 transition-all">
          <span className="flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-r from-gold-dark to-gold text-juri-bg text-sm font-sans font-bold shrink-0">2</span>
          <div>
            <h3 className="font-serif font-medium text-juri-text flex items-center gap-2">
              <Calendar className="h-4 w-4 text-gold" /> Connectez votre agenda Google
            </h3>
            <p className="text-sm text-juri-muted font-sans mt-1">Synchronisez votre Google Agenda pour que vos disponibilit&eacute;s s&rsquo;affichent en temps r&eacute;el. Vos clients r&eacute;servent directement.</p>
          </div>
        </div>

        <div className="rounded-2xl border border-juri-border bg-juri-card p-6 flex items-start gap-4 hover:border-gold/30 transition-all">
          <span className="flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-r from-gold-dark to-gold text-juri-bg text-sm font-sans font-bold shrink-0">3</span>
          <div>
            <h3 className="font-serif font-medium text-juri-text flex items-center gap-2">
              <Video className="h-4 w-4 text-gold" /> Ajoutez votre lien visio
            </h3>
            <p className="text-sm text-juri-muted font-sans mt-1">Collez votre lien Google Meet ou Zoom. Vos clients pourront rejoindre la consultation en un clic depuis votre profil.</p>
          </div>
        </div>

        <div className="rounded-2xl border border-juri-border bg-juri-card p-6 flex items-start gap-4 hover:border-gold/30 transition-all">
          <span className="flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-r from-gold-dark to-gold text-juri-bg text-sm font-sans font-bold shrink-0">4</span>
          <div>
            <h3 className="font-serif font-medium text-juri-text flex items-center gap-2">
              <BarChart3 className="h-4 w-4 text-gold" /> Suivez vos performances
            </h3>
            <p className="text-sm text-juri-muted font-sans mt-1">Acc&eacute;dez &agrave; votre tableau de bord pour suivre vos rendez-vous, vos avis et votre visibilit&eacute;.</p>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="text-center space-y-4">
        <Link
          href="/dashboard"
          className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-gold-dark via-gold to-gold-light text-juri-bg px-8 py-3.5 font-sans font-semibold text-sm hover:shadow-[0_0_30px_rgba(201,168,76,0.3)] active:scale-[0.98] transition-all"
        >
          Acc&eacute;der &agrave; mon tableau de bord <ArrowRight className="h-4 w-4" />
        </Link>
        <p className="text-xs text-juri-muted font-sans">
          Besoin d&rsquo;aide ? Contactez-nous &agrave; <a href="mailto:contact@jurilib.fr" className="text-gold hover:text-gold-light transition-colors">contact@jurilib.fr</a>
        </p>
      </div>
    </div>
  );
}
