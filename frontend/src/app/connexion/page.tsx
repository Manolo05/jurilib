// @ts-nocheck
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Scale, Mail, Lock, Eye, EyeOff, ArrowRight, Crown } from 'lucide-react';

export default function ConnexionPage() {
  const [mode, setMode] = useState('login');
  const [showPw, setShowPw] = useState(false);
  const [email, setEmail] = useState('');
  const [pw, setPw] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState('');

  const handle = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    setMsg('');
    try {
      if (mode === 'login') {
        setMsg('Connexion en cours... Redirection vers le dashboard.');
        setTimeout(() => window.location.href = '/dashboard', 1500);
      } else {
        setMsg('Compte cr\u00e9\u00e9 ! V\u00e9rifiez votre email pour activer votre compte.');
      }
    } catch (err) {
      setMsg('Erreur. Veuillez r\u00e9essayer.');
    }
    setLoading(false);
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-16">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-gold-dark to-gold mb-4 shadow-[0_0_40px_rgba(201,168,76,0.15)]">
            <Scale className="h-8 w-8 text-juri-bg" />
          </div>
          <h1 className="text-2xl font-serif font-medium text-juri-text">
            {mode === 'login' ? 'Connexion avocat' : 'Cr\u00e9er un compte avocat'}
          </h1>
          <p className="text-sm text-juri-muted font-sans mt-2">
            {mode === 'login' ? 'Acc\u00e9dez \u00e0 votre tableau de bord Jurilib' : 'Rejoignez le r\u00e9seau Jurilib'}
          </p>
        </div>

        <div className="rounded-2xl border border-juri-border bg-juri-card p-8">
          <div className="flex mb-6 rounded-xl bg-juri-bg border border-juri-border p-1">
            <button onClick={() => setMode('login')} className={`flex-1 py-2 text-sm font-sans rounded-lg transition-all ${mode === 'login' ? 'bg-gradient-to-r from-gold-dark to-gold text-juri-bg font-semibold' : 'text-juri-muted'}`}>Connexion</button>
            <button onClick={() => setMode('signup')} className={`flex-1 py-2 text-sm font-sans rounded-lg transition-all ${mode === 'signup' ? 'bg-gradient-to-r from-gold-dark to-gold text-juri-bg font-semibold' : 'text-juri-muted'}`}>Inscription</button>
          </div>

          <form onSubmit={handle} className="space-y-4">
            {mode === 'signup' && (
              <div>
                <label className="block text-xs font-sans font-medium text-juri-muted mb-1.5">Nom complet</label>
                <input t'signup')} className={`flex-1 py-2 text-sm font-sans rounded-lg transition-all ${mode === 'signup' ? 'bg-gradient-to-r from-gold-dark to-gold text-juri-bg font-semibold' : 'text-juri-muted'}`}>Inscription</button>
          </div>

          <form onSubmit={handle} className="space-y-4">
            {mode === 'signup' && (
              <div>
                <label className="block text-xs font-sans font-medium text-juri-muted mb-1.5">Nom complet</label>
                <input type="text" value={name} onChange={e => setName(e.target.value)} required placeholder="Me Jean Dupont" className="w-full rounded-xl bg-juri-bg border border-juri-border text-juri-text px-4 py-3 text-sm font-sans focus:outline-none focus:border-gold/50 transition-all placeholder:text-juri-muted" />
              </div>
            )}
            <div>
              <label className="block text-xs font-sans font-medium text-juri-muted mb-1.5">Email professionnel</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-juri-muted pointer-events-none" />
                <input type="email" value={email} onChange={e => setEmail(e.target.value)} required placeholder="avocat@cabinet.fr" className="w-full rounded-xl bg-juri-bg border border-juri-border text-juri-text pl-10 pr-4 py-3 text-sm font-sans focus:outline-none focus:border-gold/50 transition-all placeholder:text-juri-muted" />
              </div>
            </div>
            <div>
              <label className="block text-xs font-sans font-medium text-juri-muted mb-1.5">Mot de passe</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-juri-muted pointer-events-none" />
                <input type={showPw ? 'text' : 'password'} value={pw} onChange={e => setPw(e.target.value)} required minLength={8} placeholder="8 caract\u00e8res minimum" className="w-full rounded-xl bg-juri-bg border border-juri-border text-juri-text pl-10 pr-10 py-3 text-sm font-sans focus:outline-none focus:border-gold/50 transition-all placeholder:text-juri-muted" />
                <button type="button" onClick={() => setShowPw(!showPw)} className="absolute right-3 top-1/2 -translate-y-1/2 text-juri-muted hover:text-gold transition-colors">
                  {showPw ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            {msg && (
              <div className="rounded-xl bg-gold/10 border border-gold/20 px-4 py-2.5 text-sm text-gold font-sans">{msg}</div>
            )}

            <button type="submit" disabled={loading} className="w-full rounded-xl bg-gradient-to-r from-gold-dark via-gold to-gold-light text-juri-bg py-3 font-sans font-semibold text-sm hover:shadow-[0_0_30px_rgba(201,168,76,0.3)] active:scale-[0.98] transition-all disabled:opacity-50 flex items-center justify-center gap-2">
              {loading ? 'Chargement...' : mode === 'login' ? 'Se connecter' : "S'inscrire"}
              <ArrowRight className="h-4 w-4" />
            </button>
          </form>

          {mode === 'login' && (
            <p className="text-center text-xs text-juri-muted font-sans mt-4">
              <a href="#" className="text-gold hover:text-gold-light transition-colors">Mot de passe oubli&eacute; ?</a>
            </p>
          )}
        </div>

        {mode === 'signup' && (
          <div className="mt-4 rounded-2xl border border-gold/20 bg-gold/5 p-4 flex items-center gap-3">
            <Crown className="h-5 w-5 text-gold shrink-0" />
            <p className="text-xs text-juri-muted font-sans">En vous inscrivant, vous b&eacute;n&eacute;ficiez de l&rsquo;offre <span className="text-gold font-semibold">Fondateur &agrave; 99&euro;/mois</span> au lieu de 199&euro;.</p>
          </div>
        )}

        <p className="text-center text-xs text-juri-muted font-sans mt-6">
          En continuant, vous acceptez nos <Link href="/cgu" className="text-gold hover:text-gold-light">CGU</Link> et notre <Link href="/mentions-legales" className="text-gold hover:text-gold-light">politique de confidentialit&eacute;</Link>.
        </p>
      </div>
    </div>
  );
}
