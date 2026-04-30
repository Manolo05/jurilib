// @ts-nocheck
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Calendar, Clock, Video, MapPin, CheckCircle, User, Mail, Phone, FileText, ArrowLeft } from 'lucide-react';

const SLOTS_AM = ['09:00','09:30','10:00','10:30','11:00','11:30'];
const SLOTS_PM = ['14:00','14:30','15:00','15:30','16:00','16:30','17:00'];

export default function ReservationPage({ searchParams }: { searchParams: { avocat?: string; heure?: string } }) {
  const [step, setStep] = useState(1);
  const [date, setDate] = useState('');
  const [time, setTime] = useState(searchParams?.heure || '');
  const [type, setType] = useState('visio');
  const [nom, setNom] = useState('');
  const [email, setEmail] = useState('');
  const [tel, setTel] = useState('');
  const [motif, setMotif] = useState('');
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  const today = new Date();
  const dates = Array.from({length:14}, (_, i) => {
    const d = new Date(today);
    d.setDate(d.getDate() + i + 1);
    if (d.getDay() === 0 || d.getDay() === 6) return null;
    return d.toISOString().split('T')[0];
  }).filter(Boolean);

  const submit = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    try {
      await fetch('https://formspree.io/f/xrgvakok', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          _subject: `Nouveau RDV Jurilib - ${nom}`,
          avocat: searchParams?.avocat || 'non specifie',
          date, heure: time, type,
          client_nom: nom, client_email: email, client_tel: tel,
          motif,
        }),
      });
      setDone(true);
    } catch {
      alert('Erreur. Veuillez r\u00e9essayer.');
    }
    setLoading(false);
  };

  if (done) {
    return (
      <div className="mx-auto max-w-xl px-4 py-20 text-center">
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-green-400/10 border border-green-400/20 mb-6">
          <CheckCircle className="h-10 w-10 text-green-400" />
        </div>
        <h1 className="text-2xl font-serif font-medium text-juri-text">Rendez-vous confirm&eacute; !</h1>
        <p className="mt-3 text-juri-muted font-sans">Votre rendez-vous du <span className="text-gold font-semibold">{date}</span> &agrave; <span className="text-gold font-semibold">{time}</span> en <span className="text-gold font-semibold">{type}</span> a bien &eacute;t&eacute; enregistr&eacute;.</p>
        <p className="mt-2 text-sm text-juri-muted font-sans">Un email de confirmation a &eacute;t&eacute; envoy&eacute; &agrave; <span className="text-gold">{email}</span>.</p>
        <div className="mt-8 flex gap-3 justify-center">
          <Link href="/" className="rounded-xl border border-juri-border px-6 py-2.5 text-sm font-sans text-juri-text hover:border-gold/30 hover:text-gold transition-all">Retour &agrave; l&rsquo;accueil</Link>
          <Link href="/recherche" className="rounded-xl bg-gradient-to-r from-gold-dark via-gold to-gold-light text-juri-bg px-6 py-2.5 text-sm font-sans font-semibold hover:shadow-[0_0_20px_rgba(201,168,76,0.3)] transition-all">Rechercher un avocat</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl px-4 py-10">
      <Link href={searchParams?.avocat ? `/avocat/${searchParams.avocat}` : '/recherche'} className="inline-flex items-center gap-1 text-sm text-juri-muted hover:text-gold transition-colors font-sans mb-6">
        <ArrowLeft className="h-4 w-4" /> Retour
      </Link>

      <h1 className="text-2xl font-serif font-medium text-juri-text mb-2">Prendre rendez-vous</h1>
      <p className="text-sm text-juri-muted font-sans mb-8">Choisissez votre cr&eacute;neau et confirmez votre r&eacute;servation.</p>

      {/* PROGRESS */}
      <div className="flex items-center gap-2 mb-8">
        {[1,2,3].map(s => (
          <div key={s} className="flex items-center gap-2 flex-1">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-sans font-bold shrink-0 ${step >= s ? 'bg-gradient-to-r from-gold-dark to-gold text-juri-bg' : 'bg-juri-card border border-juri-border text-juri-muted'}`}>{s}</div>
            <span className={`text-xs font-sans hidden sm:block ${step >= s ? 'text-gold' : 'text-juri-muted'}`}>
              {s === 1 ? 'Date & heure' : s === 2 ? 'Type' : 'Vos infos'}
            </span>
            {s < 3 && <div className={`flex-1 h-px ${step > s ? 'bg-gold' : 'bg-juri-border'}`} />}
          </div>
        ))}
      </div>

      {/* STEP 1 */}
      {step === 1 && (
        <div className="space-y-6">
          <div className="rounded-2xl border border-juri-border bg-juri-card p-6">
            <h2 className="font-serif font-medium text-juri-text mb-4 flex items-center gap-2"><Calendar className="h-5 w-5 text-gold" /> Choisissez une date</h2>
            <div className="grid grid-cols-4 sm:grid-cols-5 gap-2">
              {dates.map(d => {
                const dt = new Date(d + 'T00:00:00');
                const day = dt.toLocaleDateString('fr-FR', { weekday: 'short' });
                const num = dt.getDate();
                const mon = dt.toLocaleDateString('fr-FR', { month: 'short' });
                return (
                  <button key={d} onClick={() => setDate(d)} className={`rounded-xl py-3 text-center transition-all ${date === d ? 'bg-gradient-to-r from-gold-dark to-gold text-juri-bg' : 'border border-juri-border hover:border-gold/30'}`}>
                    <div className={`text-xs font-sans ${date === d ? 'text-juri-bg/80' : 'text-juri-muted'}`}>{day}</div>
                    <div className="text-lg font-serif font-medium">{num}</div>
                    <div className={`text-xs font-sans ${date === d ? 'text-juri-bg/80' : 'text-juri-muted'}`}>{mon}</div>
                  </button>
                );
              })}
            </div>
          </div>

          {date && (
            <div className="rounded-2xl border border-juri-border bg-juri-card p-6">
              <h2 className="font-serif font-medium text-juri-text mb-4 flex items-center gap-2"><Clock className="h-5 w-5 text-gold" /> Choisissez un cr&eacute;neau</h2>
              <p className="text-xs text-juri-muted font-sans mb-3">Matin</p>
              <div className="grid grid-cols-4 sm:grid-cols-6 gap-2 mb-4">
                {SLOTS_AM.map(s => (
                  <button key={s} onClick={() => setTime(s)} className={`rounded-lg py-2 text-sm font-sans text-center transition-all ${time === s ? 'bg-gradient-to-r from-gold-dark to-gold text-juri-bg' : 'border border-juri-border text-juri-text hover:border-gold/30 hover:text-gold'}`}>{s}</button>
                ))}
              </div>
              <p className="text-xs text-juri-muted font-sans mb-3">Apr&egrave;s-midi</p>
              <div className="grid grid-cols-4 sm:grid-cols-6 gap-2">
                {SLOTS_PM.map(s => (
                  <button key={s} onClick={() => setTime(s)} className={`rounded-lg py-2 text-sm font-sans text-center transition-all ${time === s ? 'bg-gradient-to-r from-gold-dark to-gold text-juri-bg' : 'border border-juri-border text-juri-text hover:border-gold/30 hover:text-gold'}`}>{s}</button>
                ))}
              </div>
            </div>
          )}

          {date && time && (
            <button onClick={() => setStep(2)} className="w-full rounded-xl bg-gradient-to-r from-gold-dark via-gold to-gold-light text-juri-bg py-3 font-sans font-semibold text-sm hover:shadow-[0_0_30px_rgba(201,168,76,0.3)] active:scale-[0.98] transition-all">Continuer</button>
          )}
        </div>
      )}

      {/* STEP 2 */}
      {step === 2 && (
        <div className="space-y-4">
          <div className="rounded-2xl border border-juri-border bg-juri-card p-6">
            <h2 className="font-serif font-medium text-juri-text mb-4">Type de consultation</h2>
            {[
              { id: 'visio', icon: Video, label: 'Visioconf\u00e9rence', desc: 'Google Meet ou Zoom — lien envoy\u00e9 par email' },
              { id: 'cabinet', icon: MapPin, label: 'Au cabinet', desc: 'Rendez-vous en personne' },
            ].map(t => (
              <button key={t.id} onClick={() => setType(t.id)} className={`w-full flex items-center gap-4 p-4 rounded-xl mb-3 transition-all ${type === t.id ? 'border-2 border-gold bg-gold/5' : 'border border-juri-border hover:border-gold/30'}`}>
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${type === t.id ? 'bg-gold/20' : 'bg-juri-bg border border-juri-border'}`}>
                  <t.icon className={`h-5 w-5 ${type === t.id ? 'text-gold' : 'text-juri-muted'}`} />
                </div>
                <div className="text-left">
                  <p className={`font-sans text-sm font-medium ${type === t.id ? 'text-gold' : 'text-juri-text'}`}>{t.label}</p>
                  <p className="font-sans text-xs text-juri-muted">{t.desc}</p>
                </div>
              </button>
            ))}
          </div>
          <div className="flex gap-3">
            <button onClick={() => setStep(1)} className="flex-1 rounded-xl border border-juri-border py-3 text-sm font-sans text-juri-text hover:border-gold/30 transition-all">Retour</button>
            <button onClick={() => setStep(3)} className="flex-1 rounded-xl bg-gradient-to-r from-gold-dark via-gold to-gold-light text-juri-bg py-3 font-sans font-semibold text-sm hover:shadow-[0_0_30px_rgba(201,168,76,0.3)] transition-all">Continuer</button>
          </div>
        </div>
      )}

      {/* STEP 3 */}
      {step === 3 && (
        <form onSubmit={submit} className="space-y-4">
          <div className="rounded-2xl border border-gold/20 bg-gold/5 p-4 flex items-center gap-3 text-sm font-sans">
            <Calendar className="h-5 w-5 text-gold shrink-0" />
            <span className="text-juri-muted"><span className="text-gold font-semibold">{date}</span> &agrave; <span className="text-gold font-semibold">{time}</span> — {type === 'visio' ? 'Visioconf\u00e9rence' : 'Au cabinet'}</span>
          </div>

          <div className="rounded-2xl border border-juri-border bg-juri-card p-6 space-y-4">
            <h2 className="font-serif font-medium text-juri-text flex items-center gap-2"><User className="h-5 w-5 text-gold" /> Vos coordonn&eacute;es</h2>
            <div>
              <label className="block text-xs font-sans font-medium text-juri-muted mb-1.5">Nom complet</label>
              <input type="text" value={nom} onChange={e => setNom(e.target.value)} required placeholder="Jean Dupont" className="w-full rounded-xl bg-juri-bg border border-juri-border text-juri-text px-4 py-3 text-sm font-sans focus:outline-none focus:border-gold/50 transition-all placeholder:text-juri-muted" />
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-sans font-medium text-juri-muted mb-1.5">Email</label>
                <input type="email" value={email} onChange={e => setEmail(e.target.value)} required placeholder="jean@email.com" className="w-full rounded-xl bg-juri-bg border border-juri-border text-juri-text px-4 py-3 text-sm font-sans focus:outline-none focus:border-gold/50 transition-all placeholder:text-juri-muted" />
              </div>
              <div>
                <label className="block text-xs font-sans font-medium text-juri-muted mb-1.5">T&eacute;l&eacute;phone</label>
                <input type="tel" value={tel} onChange={e => setTel(e.target.value)} placeholder="06 12 34 56 78" className="w-full rounded-xl bg-juri-bg border border-juri-border text-juri-text px-4 py-3 text-sm font-sans focus:outline-none focus:border-gold/50 transition-all placeholder:text-juri-muted" />
              </div>
            </div>
            <div>
              <label className="block text-xs font-sans font-medium text-juri-muted mb-1.5">Motif de la consultation</label>
              <textarea value={motif} onChange={e => setMotif(e.target.value)} required rows={3} placeholder="D\u00e9crivez bri\u00e8vement votre situation..." className="w-full rounded-xl bg-juri-bg border border-juri-border text-juri-text px-4 py-3 text-sm font-sans focus:outline-none focus:border-gold/50 transition-all placeholder:text-juri-muted resize-none" />
            </div>
          </div>

          <div className="flex gap-3">
            <button type="button" onClick={() => setStep(2)} className="flex-1 rounded-xl border border-juri-border py-3 text-sm font-sans text-juri-text hover:border-gold/30 transition-all">Retour</button>
            <button type="submit" disabled={loading} className="flex-1 rounded-xl bg-gradient-to-r from-gold-dark via-gold to-gold-light text-juri-bg py-3 font-sans font-semibold text-sm hover:shadow-[0_0_30px_rgba(201,168,76,0.3)] active:scale-[0.98] transition-all disabled:opacity-50">
              {loading ? 'Envoi...' : 'Confirmer le rendez-vous'}
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
