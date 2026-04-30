// @ts-nocheck
'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Calendar, Video, Star, TrendingUp, Eye, Crown, ExternalLink, BarChart3, Clock, Phone, CheckCircle, AlertCircle, Zap } from 'lucide-react';

const STATS = {
  views: 342, viewsTrend: '+18%',
  rdv: 12, rdvTrend: '+3',
  rating: 4.8, ratingCount: 23,
  conversionRate: '3.5%', conversionTrend: '+0.8%',
};

const RDV = [
  { id: 1, client: 'Marie Dupont', date: "Aujourd'hui", heure: '14:00', type: 'Visio', motif: 'Divorce', status: 'confirm\u00e9' },
  { id: 2, client: 'Jean Martin', date: "Aujourd'hui", heure: '16:30', type: 'Cabinet', motif: 'Droit du travail', status: 'confirm\u00e9' },
  { id: 3, client: 'Sophie Bernard', date: 'Demain', heure: '09:00', type: 'Visio', motif: 'Succession', status: 'en attente' },
  { id: 4, client: 'Thomas Petit', date: 'Demain', heure: '11:00', type: 'Cabinet', motif: 'Licenciement', status: 'confirm\u00e9' },
  { id: 5, client: 'Claire Moreau', date: '03/05', heure: '10:00', type: 'Visio', motif: 'Garde enfants', status: 'en attente' },
];

const DAYS = ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven'];
const HOURS = ['08:00','09:00','10:00','11:00','12:00','14:00','15:00','16:00','17:00','18:00'];

export default function DashboardPage() {
  const [tab, setTab] = useState('apercu');

  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 gap-4">
        <div>
          <h1 className="text-2xl font-serif font-medium text-juri-text flex items-center gap-2">
            Tableau de bord
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full border border-gold/20 bg-gold/5 text-xs font-sans text-gold">
              <Crown className="h-3 w-3" /> Fondateur
            </span>
          </h1>
          <p className="text-sm text-juri-muted font-sans mt-1">Bienvenue, Ma&icirc;tre. G&eacute;rez votre cabinet depuis Jurilib.</p>
        </div>
        <div className="flex gap-2">
          <Link href="/avocat/mon-profil" className="rounded-xl border border-juri-border bg-juri-card px-4 py-2 text-sm font-sans text-juri-text hover:border-gold/30 hover:text-gold transition-all">Voir mon profil</Link>
          <Link href="#" className="rounded-xl bg-gradient-to-r from-gold-dark via-gold to-gold-light text-juri-bg px-4 py-2 text-sm font-sans font-semibold hover:shadow-[0_0_20px_rgba(201,168,76,0.3)] transition-all">+ Bloquer un cr&eacute;neau</Link>
        </div>
      </div>

      {/* TABS */}
      <div className="flex gap-1 mb-8 border-b border-juri-border">
        {[
          { id: 'apercu', label: 'Aper\u00e7u', icon: BarChart3 },
          { id: 'agenda', label: 'Agenda', icon: Calendar },
        ].map(t => (
          <button key={t.id} onClick={() => setTab(t.id)} className={`flex items-center gap-2 px-4 py-3 text-sm font-sans border-b-2 transition-all ${tab === t.id ? 'border-gold text-gold' : 'border-transparent text-juri-muted hover:text-juri-text'}`}>
            <t.icon className="h-4 w-4" /> {t.label}
          </button>
        ))}
      </div>

      {/* APERCU */}
      {tab === 'apercu' && (
        <div className="space-y-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { icon: Eye, label: 'Vues du profil', value: STATS.views, trend: STATS.viewsTrend, color: 'text-blue-400' },
              { icon: Calendar, label: 'Rendez-vous', value: STATS.rdv, trend: STATS.rdvTrend, color: 'text-green-400' },
              { icon: Star, label: 'Note moyenne', value: STATS.rating, trend: `${STATS.ratingCount} avis`, color: 'text-gold' },
              { icon: TrendingUp, label: 'Taux conversion', value: STATS.conversionRate, trend: STATS.conversionTrend, color: 'text-purple-400' },
            ].map(s => (
              <div key={s.label} className="rounded-2xl border border-juri-border bg-juri-card p-5">
                <div className="flex items-center justify-between mb-3">
                  <s.icon className={`h-5 w-5 ${s.color}`} />
                  <span className="text-xs font-sans text-green-400 bg-green-400/10 px-2 py-0.5 rounded-full">{s.trend}</span>
                </div>
                <p className="text-2xl font-serif font-medium text-juri-text">{s.value}</p>
                <p className="text-xs text-juri-muted font-sans mt-1">{s.label}</p>
              </div>
            ))}
          </div>

          <div className="rounded-2xl border border-juri-border bg-juri-card p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-serif font-medium text-juri-text flex items-center gap-2"><Calendar className="h-5 w-5 text-gold" /> Prochains rendez-vous</h2>
              <button onClick={() => setTab('agenda')} className="text-xs text-gold hover:text-gold-light font-sans transition-colors">Voir l&rsquo;agenda &rarr;</button>
            </div>
            <div className="space-y-3">
              {RDV.map(r => (
                <div key={r.id} className="flex items-center justify-between p-3 rounded-xl border border-juri-border hover:border-gold/20 transition-all">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-juri-bg border border-juri-border flex items-center justify-center">
                      {r.type === 'Visio' ? <Video className="h-4 w-4 text-gold" /> : <Phone className="h-4 w-4 text-juri-muted" />}
                    </div>
                    <div>
                      <p className="font-sans text-sm text-juri-text font-medium">{r.client}</p>
                      <p className="font-sans text-xs text-juri-muted">{r.motif} &middot; {r.date} &agrave; {r.heure}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`inline-flex items-center gap-1 text-xs font-sans px-2 py-0.5 rounded-full ${r.status === 'confirm\u00e9' ? 'bg-green-400/10 text-green-400' : 'bg-yellow-400/10 text-yellow-400'}`}>
                      {r.status === 'confirm\u00e9' ? <CheckCircle className="h-3 w-3" /> : <AlertCircle className="h-3 w-3" />}
                      {r.status}
                    </span>
                    {r.type === 'Visio' && (<a href="#" className="text-xs text-gold hover:text-gold-light font-sans flex items-center gap-1">Rejoindre <ExternalLink className="h-3 w-3" /></a>)}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-gold/20 bg-gold/5 p-6">
            <div className="flex items-start gap-3">
              <Zap className="h-5 w-5 text-gold shrink-0 mt-0.5" />
              <div>
                <h3 className="font-serif font-medium text-juri-text">Conseil du jour</h3>
                <p className="text-sm text-juri-muted font-sans mt-1">Les avocats qui r&eacute;pondent dans les 2h apr&egrave;s une demande de RDV ont 8x plus de chances de convertir. Activez les notifications email.</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* AGENDA */}
      {tab === 'agenda' && (
        <div className="space-y-6">
          <div className="rounded-2xl border border-gold/20 bg-gold/5 p-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="flex items-start gap-3">
              <Calendar className="h-6 w-6 text-gold shrink-0" />
              <div>
                <h3 className="font-serif font-medium text-juri-text">Connectez Google Agenda</h3>
                <p className="text-sm text-juri-muted font-sans mt-1">Synchronisez votre calendrier pour afficher vos disponibilit&eacute;s en temps r&eacute;el.</p>
              </div>
            </div>
            <a href="#" className="shrink-0 inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-gold-dark via-gold to-gold-light text-juri-bg px-6 py-2.5 font-sans font-semibold text-sm hover:shadow-[0_0_20px_rgba(201,168,76,0.3)] transition-all">Connecter Google Agenda</a>
          </div>

          <div className="rounded-2xl border border-juri-border bg-juri-card p-6 overflow-x-auto">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-serif font-medium text-juri-text">Semaine du 28 avril 2026</h2>
              <div className="flex gap-2">
                <button className="rounded-lg border border-juri-border px-3 py-1.5 text-xs font-sans text-juri-muted hover:text-gold hover:border-gold/30 transition-all">&larr; Pr&eacute;c.</button>
                <button className="rounded-lg border border-juri-border px-3 py-1.5 text-xs font-sans text-juri-muted hover:text-gold hover:border-gold/30 transition-all">Suiv. &rarr;</button>
              </div>
            </div>
            <div className="min-w-[600px]">
              <div className="grid grid-cols-[60px_repeat(5,1fr)] gap-px">
                <div className="p-2" />
                {DAYS.map(d => (<div key={d} className="p-2 text-center text-xs font-sans font-medium text-juri-muted border-b border-juri-border">{d}</div>))}
                {HOURS.map(h => (
                  <div key={h} className="contents">
                    <div className="p-2 text-xs font-sans text-juri-muted text-right pr-3 border-t border-juri-border/50">{h}</div>
                    {DAYS.map(d => {
                      const busy = (d==='Mer'&&h==='14:00')||(d==='Mer'&&h==='16:00')||(d==='Jeu'&&h==='09:00')||(d==='Jeu'&&h==='11:00')||(d==='Ven'&&h==='10:00');
                      return (
                        <div key={`${d}-${h}`} className={`p-1 border-t border-juri-border/50 min-h-[40px] ${busy?'':'hover:bg-gold/5 cursor-pointer'}`}>
                          {busy && <div className="rounded-lg bg-gold/10 border border-gold/20 px-2 py-1 text-xs font-sans text-gold truncate">RDV</div>}
                        </div>
                      );
                    })}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-juri-border bg-juri-card p-6">
            <h2 className="font-serif font-medium text-juri-text mb-4">Rendez-vous &agrave; venir</h2>
            <div className="space-y-3">
              {RDV.map(r => (
                <div key={r.id} className="flex items-center justify-between p-3 rounded-xl border border-juri-border hover:border-gold/20 transition-all">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-juri-bg border border-juri-border flex items-center justify-center"><Clock className="h-4 w-4 text-juri-muted" /></div>
                    <div>
                      <p className="font-sans text-sm text-juri-text font-medium">{r.client}</p>
                      <p className="font-sans text-xs text-juri-muted">{r.date} &agrave; {r.heure} &middot; {r.type} &middot; {r.motif}</p>
                    </div>
                  </div>
                  <span className={`text-xs font-sans px-2 py-0.5 rounded-full ${r.status==='confirm\u00e9'?'bg-green-400/10 text-green-400':'bg-yellow-400/10 text-yellow-400'}`}>{r.status}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
