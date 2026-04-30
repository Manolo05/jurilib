// @ts-nocheck
import { Mail, Phone, MapPin, MessageSquare } from 'lucide-react';

export const metadata = {
  title: 'Contact — Jurilib',
  description: 'Contactez l\u2019\u00e9quipe Jurilib pour toute question sur la plateforme.',
};

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-serif font-medium text-juri-text">Contactez-nous</h1>
        <p className="mt-3 text-juri-muted font-sans">Une question, une suggestion ou un probl&egrave;me ? Nous sommes l&agrave; pour vous aider.</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6 mb-12">
        <div className="rounded-2xl border border-juri-border bg-juri-card p-6 text-center hover:border-gold/30 transition-all">
          <Mail className="h-8 w-8 text-gold mx-auto mb-3" />
          <h3 className="font-serif font-medium text-juri-text">Email</h3>
          <a href="mailto:contact@jurilib.fr" className="text-sm text-gold hover:text-gold-light font-sans mt-1 block">contact@jurilib.fr</a>
          <p className="text-xs text-juri-muted font-sans mt-2">R&eacute;ponse sous 24h</p>
        </div>
        <div className="rounded-2xl border border-juri-border bg-juri-card p-6 text-center hover:border-gold/30 transition-all">
          <Phone className="h-8 w-8 text-gold mx-auto mb-3" />
          <h3 className="font-serif font-medium text-juri-text">T&eacute;l&eacute;phone</h3>
          <p className="text-sm text-juri-muted font-sans mt-1">Lundi au vendredi, 9h-18h</p>
          <p className="text-xs text-juri-muted font-sans mt-2">Disponible bient&ocirc;t</p>
        </div>
      </div>

      <div className="rounded-2xl border border-juri-border bg-juri-card p-8">
        <h2 className="font-serif font-medium text-juri-text mb-6 flex items-center gap-2"><MessageSquare className="h-5 w-5 text-gold" /> Envoyez-nous un message</h2>
        <form action="https://formspree.io/f/xrgvakok" method="POST" className="space-y-5">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-sans font-medium text-juri-muted mb-1.5">Nom</label>
              <input type="text" name="name" required placeholder="Votre nom" className="w-full rounded-xl bg-juri-bg border border-juri-border text-juri-text px-4 py-3 text-sm font-sans focus:outline-none focus:border-gold/50 transition-all placeholder:text-juri-muted" />
            </div>
            <div>
              <label className="block text-xs font-sans font-medium text-juri-muted mb-1.5">Email</label>
              <input type="email" name="email" required placeholder="votre@email.com" className="w-full rounded-xl bg-juri-bg border border-juri-border text-juri-text px-4 py-3 text-sm font-sans focus:outline-none focus:border-gold/50 transition-all placeholder:text-juri-muted" />
            </div>
          </div>
          <div>
            <label className="block text-xs font-sans font-medium text-juri-muted mb-1.5">Sujet</label>
            <select name="subject" className="w-full rounded-xl bg-juri-bg border border-juri-border text-juri-text px-4 py-3 text-sm font-sans focus:outline-none focus:border-gold/50 transition-all cursor-pointer">
              <option>Question g&eacute;n&eacute;rale</option>
              <option>Je suis avocat — inscription</option>
              <option>Probl&egrave;me technique</option>
              <option>Partenariat</option>
              <option>Autre</option>
            </select>
          </div>
          <div>
            <label className="block text-xs font-sans font-medium text-juri-muted mb-1.5">Message</label>
            <textarea name="message" required rows={5} placeholder="D&eacute;crivez votre demande..." className="w-full rounded-xl bg-juri-bg border border-juri-border text-juri-text px-4 py-3 text-sm font-sans focus:outline-none focus:border-gold/50 transition-all placeholder:text-juri-muted resize-none" />
          </div>
          <button type="submit" className="w-full rounded-xl bg-gradient-to-r from-gold-dark via-gold to-gold-light text-juri-bg py-3 font-sans font-semibold text-sm hover:shadow-[0_0_30px_rgba(201,168,76,0.3)] active:scale-[0.98] transition-all">Envoyer le message</button>
        </form>
      </div>
    </div>
  );
}
