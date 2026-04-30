// @ts-nocheck
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Scale, Users, Calendar, TrendingUp, Video, Shield, Star, CheckCircle, ArrowRight, ArrowLeft, Mail, Lock, Eye, EyeOff, Phone, MapPin, Briefcase, Crown, Clock, Globe, ChevronDown } from 'lucide-react';

const SPECIALITES = [
  'Droit de la famille','Droit p\u00e9nal','Droit du travail','Droit des affaires',
  'Droit immobilier','Droit fiscal','Droit de la sant\u00e9','Droit de l\u2019environnement',
  'Droit de la propri\u00e9t\u00e9 intellectuelle','Droit de la consommation',
  'Droit administratif','Droit des \u00e9trangers','Droit social','Autre',
];

const VILLES = [
  'Paris','Lyon','Marseille','Toulouse','Bordeaux','Lille','Nice','Nantes',
  'Strasbourg','Montpellier','Rennes','Grenoble','Autre',
];

function FormInput({ label, value, onChange, type='text', icon: Icon, placeholder, error, showPwToggle, showPw, onTogglePw }: any) {
  return (
    <div>
      <label className="block text-xs font-sans font-medium text-juri-muted mb-1.5">{label}</label>
      <div className="relative">
        {Icon && <Icon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-juri-muted pointer-events-none" />}
        <input type={type} value={value} onChange={onChange} placeholder={placeholder}
          className={`w-full rounded-xl bg-juri-bg border ${error ? 'border-red-400' : 'border-juri-border'} text-juri-text ${Icon ? 'pl-10' : 'px-4'} pr-4 py-3 text-sm font-sans focus:outline-none focus:border-gold/50 transition-all placeholder:text-juri-muted`} />
        {showPwToggle && (
          <button type="button" onClick={onTogglePw} className="absolute right-3 top-1/2 -translate-y-1/2 text-juri-muted hover:text-gold transition-colors">
            {showPw ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          </button>
        )}
      </div>
      {error && <p className="text-xs text-red-400 mt-1 font-sans">{error}</p>}
    </div>
  );
}

function FormSelect({ label, value, onChange, options, icon: Icon, error }: any) {
  return (
    <div>
      <label className="block text-xs font-sans font-medium text-juri-muted mb-1.5">{label}</label>
      <div className="relative">
        {Icon && <Icon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-juri-muted pointer-events-none" />}
        <select value={value} onChange={onChange}
          className={`w-full rounded-xl bg-juri-bg border ${error ? 'border-red-400' : 'border-juri-border'} text-juri-text ${Icon ? 'pl-10' : 'px-4'} pr-4 py-3 text-sm font-sans focus:outline-none focus:border-gold/50 transition-all appearance-none cursor-pointer`}>
          <option value="">S&eacute;lectionnez...</option>
          {options.map((o: string) => <option key={o} value={o}>{o}</option>)}
        </select>
        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-juri-muted pointer-events-none" />
      </div>
      {error && <p className="text-xs text-red-400 mt-1 font-sans">{error}</p>}
    </div>
  );
}

export default function RejoindreAvocatPage() {
  const [step, setStep] = useState(0);
  const [prenom, setPrenom] = useState('');
  const [nom, setNom] = useState('');
  const [email, setEmail] = useState('');
  const [tel, setTel] = useState('');
  const [ville, setVille] = useState('');
  const [specialite, setSpecialite] = useState('');
  const [barreau, setBarreau] = useState('');
  const [password, setPassword] = useState('');
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<any>({});
  setErrors(e);
    return Object.keys(e).length === 0;
  };

  const next = () => { if (validateStep()) setStep(s => s + 1); };
  const prev = () => setStep(s => s - 1);

  const submit = async () => {
    if (!validateStep()) return;
    setLoading(true);
    try {
      await fetch('https://formspree.io/f/xrgvakok', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ _subject: `Nouvel avocat Jurilib - Me ${prenom} ${nom}`, prenom, nom, email, tel, ville, specialite, barreau }),
      });
      window.location.href = 'https://buy.stripe.com/28EeVd9I26v14J27pP4Rq02';
    } catch { alert('Erreur, veuillez r\u00e9essayer.'); }
    setLoading(false);
  };

  if (step === 0) {
    return (
      <div className="min-h-screen">
        <section className="relative overflow-hidden py-20 px-4">
          <div className="absolute inset-0 bg-gradient-to-b from-gold/5 via-transparent to-transparent" />
          <div className="mx-auto max-w-6xl relative">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="inline-flex items-center gap-2 bg-gold/10 border border-gold/20 rounded-full px-4 py-1.5 mb-6">
                  <Crown className="h-4 w-4 text-gold" />
                  <span className="text-xs font-sans text-gold font-semibold">Offre Fondateur &mdash; Places limit&eacute;es</span>
                </div>
                <h1 className="text-4xl lg:text-5xl font-serif font-medium text-juri-text leading-tight">
                  D&eacute;veloppez votre <span className="text-gold">cabinet</span> gr&acirc;ce &agrave; Jurilib
                </h1>
                <p className="mt-4 text-lg text-juri-muted font-sans leading-relaxed">
                  Rejoignez la 1&egrave;re plateforme de prise de rendez-vous pour avocats. Recevez des clients qualifi&eacute;s, g&eacute;rez votre agenda et d&eacute;veloppez votre visibilit&eacute; en ligne.
                </p>
                <div className="mt-8 flex flex-col sm:flex-row gap-3">
                  <button onClick={() => setStep(1)} className="rounded-xl bg-gradient-to-r from-gold-dark via-gold to-gold-light text-juri-bg px-8 py-3.5 font-sans font-semibold text-sm hover:shadow-[0_0_30px_rgba(201,168,76,0.3)] active:scale-[0.98] transition-all flex items-center justify-center gap-2">
                    Cr&eacute;er mon profil avocat <ArrowRight className="h-4 w-4" />
                  </button>
                  <a href="#fonctionnement" className="rounded-xl border border-juri-border px-8 py-3.5 font-sans text-sm text-juri-text hover:border-gold/30 hover:text-gold transition-all text-center">Comment &ccedil;a marche ?</a>
                </div>
                <div className="mt-8 flex items-center gap-6 text-sm text-juri-muted font-sans">
                  <span className="flex items-center gap-1.5"><CheckCircle className="h-4 w-4 text-gold" /> 15 jours gratuits</span>
                  <span className="flex items-center gap-1.5"><CheckCircle className="h-4 w-4 text-gold" /> Sans engagement</span>
                  <span className="flex items-center gap-1.5"><CheckCircle className="h-4 w-4 text-gold" /> 0% commission</span>
                </div>
              </div>
              <div className="hidden lg:block">
                <div className="rounded-3xl border border-juri-border bg-juri-card p-6 shadow-2xl shadow-gold/5 relative">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-gold-dark to-gold flex items-center justify-center text-juri-bg font-serif font-bold text-lg">JL</div>
                    <div><p className="font-serif font-medium text-juri-text text-sm">Me Sophie Martin</p><p className="text-xs text-juri-muted font-sans">Avocate &bull; Droit de la famille</p></div>
                    <div className="ml-auto flex items-center gap-1"><Star className="h-4 w-4 text-gold fill-gold" /><Star className="h-4 w-4 text-gold fill-gold" /><Star className="h-4 w-4 text-gold fill-gold" /><Star className="h-4 w-4 text-gold fill-gold" /><Star className="h-4 w-4 text-gold fill-gold" /></div>
                  </div>
                  <div className="space-y-2">
                    {['09:00','10:30','14:00','15:30'].map((h,i) => (
                      <div key={h} className={`flex items-center justify-between rounded-lg px-3 py-2 text-xs font-sans ${i === 1 ? 'bg-gold/10 border border-gold/20' : 'bg-juri-bg border border-juri-border'}`}>
                        <span className={i === 1 ? 'text-gold font-semibold' : 'text-juri-muted'}>{h}</span>
                        <span className={i === 1 ? 'text-gold' : 'text-juri-muted'}>{i === 1 ? 'RDV confirm\u00e9' : 'Disponible'}</span>
                      </div>
                    ))}
                  </div>
                  <div className="absolute -top-3 -right-3 bg-green-400 text-juri-bg text-xs font-sans font-bold px-3 py-1 rounded-full shadow-lg">+12 RDV/mois</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-12 px-4 border-y border-juri-border bg-juri-card/50">
          <div className="mx-auto max-w-4xl grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[{n:'2 500+',l:'Justiciables inscrits'},{n:'127',l:'Avocats fondateurs'},{n:'98%',l:'Satisfaction client'},{n:'0%',l:'Commission sur honoraires'}].map(s => (
              <div key={s.l}><p className="text-2xl font-serif font-medium text-gold">{s.n}</p><p className="text-xs text-juri-muted font-sans mt-1">{s.l}</p></div>
            ))}
          </div>
        </section>

        <section id="fonctionnement" className="py-20 px-4">
          <div className="mx-auto max-w-5xl">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-serif font-medium text-juri-text">Comment &ccedil;a marche ?</h2>
              <p className="mt-3 text-juri-muted font-sans">Rejoignez Jurilib en 3 &eacute;tapes simples</p>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {step:'1',icon:Briefcase,title:'Cr\u00e9ez votre profil',desc:'Renseignez vos informations, votre sp\u00e9cialit\u00e9, votre barreau et votre zone g\u00e9ographique.',color:'from-blue-500/20 to-blue-600/5'},
                {step:'2',icon:Calendar,title:'G\u00e9rez votre agenda',desc:'D\u00e9finissez vos disponibilit\u00e9s, synchronisez avec Google Agenda. Les clients r\u00e9servent en ligne 24h/24.',color:'from-gold/20 to-gold/5'},
                {step:'3',icon:Users,title:'Recevez des clients',desc:'Les justiciables vous trouvent par sp\u00e9cialit\u00e9 et ville. Notifications \u00e0 chaque r\u00e9servation.',color:'from-green-500/20 to-green-600/5'},
              ].map(s => (
                <div key={s.step} className="rounded-2xl border border-juri-border bg-juri-card p-6 hover:border-gold/30 transition-all group">
                  <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${s.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                    <s.icon className="h-6 w-6 text-gold" />
                  </div>
                  <div className="text-xs text-gold font-sans font-bold mb-2">&Eacute;TAPE {s.step}</div>
                  <h3 className="font-serif font-medium text-juri-text mb-2">{s.title}</h3>
                  <p className="text-sm text-juri-muted font-sans leading-relaxed">{s.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 px-4 bg-juri-card/50 border-y border-juri-border">
          <div className="mx-auto max-w-5xl">
            <div className="text-center mb-16"><h2 className="text-3xl font-serif font-medium text-juri-text">Pourquoi rejoindre Jurilib ?</h2></div>
            <div className="grid md:grid-cols-2 gap-6">
              {[
                {icon:Globe,title:'Visibilit\u00e9 en ligne',desc:'Profil professionnel optimis\u00e9 SEO visible dans les recherches Google.'},
                {icon:Calendar,title:'Agenda intelligent',desc:'Sync Google Agenda. Vos clients r\u00e9servent en ligne, z\u00e9ro appel inutile.'},
                {icon:Video,title:'Consultations en visio',desc:'Proposez des consultations en visioconf\u00e9rence depuis votre profil.'},
                {icon:Shield,title:'Z\u00e9ro commission',desc:'Jurilib ne pr\u00e9l\u00e8ve aucune commission sur vos honoraires.'},
                {icon:TrendingUp,title:'Tableau de bord',desc:'Suivez vos RDV, statistiques et croissance depuis un dashboard.'},
                {icon:Clock,title:'Gain de temps',desc:'Automatisez la prise de RDV et les rappels.'},
              ].map(a => (
                <div key={a.title} className="flex gap-4 rounded-2xl border border-juri-border bg-juri-card p-5 hover:border-gold/30 transition-all">
                  <div className="w-10 h-10 rounded-xl bg-gold/10 flex items-center justify-center shrink-0"><a.icon className="h-5 w-5 text-gold" /></div>
                  <div><h3 className="font-serif font-medium text-juri-text text-sm">{a.title}</h3><p className="text-xs text-juri-muted font-sans mt-1 leading-relaxed">{a.desc}</p></div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 px-4">
          <div className="mx-auto max-w-lg text-center">
            <div className="inline-flex items-center gap-2 bg-gold/10 border border-gold/20 rounded-full px-4 py-1.5 mb-6"><Crown className="h-4 w-4 text-gold" /><span className="text-xs font-sans text-gold font-semibold">Offre Fondateur</span></div>
            <div className="rounded-2xl border-2 border-gold/30 bg-juri-card p-8">
              <p className="text-juri-muted font-sans text-sm line-through">199&euro;/mois</p>
              <div className="flex items-baseline justify-center gap-1 mt-1"><span className="text-5xl font-serif font-medium text-gold">99&euro;</span><span className="text-juri-muted font-sans text-sm">/mois HT</span></div>
              <p className="text-xs text-gold font-sans font-semibold mt-2">Tarif garanti &agrave; vie &bull; 15 jours d&rsquo;essai gratuit</p>
              <ul className="mt-6 space-y-3 text-left">
                {['Profil professionnel optimis\u00e9','Agenda en ligne + sync Google','Prise de RDV 24h/24','Consultations visio','Tableau de bord + statistiques','Notifications email \u00e0 chaque RDV','0% commission sur honoraires','Support prioritaire'].map(f => (
                  <li key={f} className="flex items-center gap-2 text-sm text-juri-text font-sans"><CheckCircle className="h-4 w-4 text-gold shrink-0" />{f}</li>
                ))}
              </ul>
              <button onClick={() => setStep(1)} className="w-full mt-8 rounded-xl bg-gradient-to-r from-gold-dark via-gold to-gold-light text-juri-bg py-3.5 font-sans font-semibold text-sm hover:shadow-[0_0_30px_rgba(201,168,76,0.3)] active:scale-[0.98] transition-all flex items-center justify-center gap-2">
                Commencer l&rsquo;essai gratuit <ArrowRight className="h-4 w-4" />
              </button>
            </div>
            <p className="mt-4 text-xs text-juri-muted font-sans">En continuant, vous acceptez nos <Link href="/cgu" className="text-gold hover:text-gold-light">CGU</Link>.</p>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <div className="text-center mb-6">
          <button onClick={() => setStep(0)} className="inline-flex items-center gap-2 text-sm text-juri-muted hover:text-gold transition-colors font-sans mb-4">
            <ArrowLeft className="h-4 w-4" /> Retour
          </button>
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-gold-dark to-gold mb-3 shadow-[0_0_30px_rgba(201,168,76,0.15)]">
            <Scale className="h-7 w-7 text-juri-bg" />
          </div>
          <h1 className="text-xl font-serif font-medium text-juri-text">
            {step === 1 ? 'Vos informations' : step === 2 ? 'Votre cabinet' : 'Cr\u00e9ez votre compte'}
          </h1>
          <p className="text-xs text-juri-muted font-sans mt-1">&Eacute;tape {step}/3</p>
        </div>
        <div className="flex gap-2 mb-6">
          {[1,2,3].map(s => (<div key={s} className={`flex-1 h-1.5 rounded-full transition-all ${step >= s ? 'bg-gradient-to-r from-gold-dark to-gold' : 'bg-juri-border'}`} />))}
        </div>
        <div className="rounded-2xl border border-juri-border bg-juri-card p-6">
          {step === 1 && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <FormInput label="Pr&eacute;nom" value={prenom} onChange={(e: any) => setPrenom(e.target.value)} placeholder="Jean" error={errors.prenom} />
                <FormInput label="Nom" value={nom} onChange={(e: any) => setNom(e.target.value)} placeholder="Dupont" error={errors.nom} />
              </div>
              <FormInput label="Email professionnel" value={email} onChange={(e: any) => setEmail(e.target.value)} type="email" icon={Mail} placeholder="avocat@cabinet.fr" error={errors.email} />
              <FormInput label="T&eacute;l&eacute;phone" value={tel} onChange={(e: any) => setTel(e.target.value)} type="tel" icon={Phone} placeholder="06 12 34 56 78" error={errors.tel} />
            </div>
          )}
          {step === 2 && (
            <div className="space-y-4">
              <FormSelect label="Ville du cabinet" value={ville} onChange={(e: any) => setVille(e.target.value)} icon={MapPin} options={VILLES} error={errors.ville} />
              <FormSelect label="Sp&eacute;cialit&eacute; principale" value={specialite} onChange={(e: any) => setSpecialite(e.target.value)} icon={Briefcase} options={SPECIALITES} error={errors.specialite} />
              <FormInput label="Barreau d&rsquo;inscription" value={barreau} onChange={(e: any) => setBarreau(e.target.value)} placeholder="Barreau de Paris" error={errors.barreau} />
            </div>
          )}
          {step === 3 && (
            <div className="space-y-4">
              <div className="rounded-xl bg-gold/5 border border-gold/20 p-4">
                <p className="text-xs text-juri-muted font-sans"><span className="text-gold font-semibold">R&eacute;capitulatif :</span> Me {prenom} {nom} &bull; {specialite} &bull; {ville}</p>
              </div>
              <FormInput label="Mot de passe" value={password} onChange={(e: any) => setPassword(e.target.value)} type={showPw ? 'text' : 'password'} icon={Lock} placeholder="8 caract&egrave;res minimum" error={errors.password} showPwToggle onTogglePw={() => setShowPw(!showPw)} showPw={showPw} />
              <div className="rounded-xl bg-gold/5 border border-gold/20 p-3 flex items-center gap-3">
                <Crown className="h-5 w-5 text-gold shrink-0" />
                <p className="text-xs text-juri-muted font-sans">Apr&egrave;s inscription, vous serez redirig&eacute; vers la page de paiement pour activer votre <span className="text-gold font-semibold">essai gratuit de 15 jours</span>.</p>
              </div>
            </div>
          )}
          <div className="flex gap-3 mt-6">
            {step > 1 && (<button onClick={prev} className="flex-1 rounded-xl border border-juri-border py-3 text-sm font-sans text-juri-text hover:border-gold/30 transition-all">Retour</button>)}
            {step < 3 ? (
              <button onClick={next} className="flex-1 rounded-xl bg-gradient-to-r from-gold-dark via-gold to-gold-light text-juri-bg py-3 font-sans font-semibold text-sm hover:shadow-[0_0_30px_rgba(201,168,76,0.3)] active:scale-[0.98] transition-all">Continuer</button>
            ) : (
              <button onClick={submit} disabled={loading} className="flex-1 rounded-xl bg-gradient-to-r from-gold-dark via-gold to-gold-light text-juri-bg py-3 font-sans font-semibold text-sm hover:shadow-[0_0_30px_rgba(201,168,76,0.3)] active:scale-[0.98] transition-all disabled:opacity-50 flex items-center justify-center gap-2">
                {loading ? 'Chargement...' : 'S\u2019inscrire et commencer l\u2019essai'} <ArrowRight className="h-4 w-4" />
              </button>
            )}
          </div>
        </div>
        <p className="text-center text-xs text-juri-muted font-sans mt-4">
          En continuant, vous acceptez nos <Link href="/cgu" className="text-gold hover:text-gold-light">CGU</Link> et notre <Link href="/mentions-legales" className="text-gold hover:text-gold-light">politique de confidentialit&eacute;</Link>.
        </p>
      </div>
    </div>
  );
}
