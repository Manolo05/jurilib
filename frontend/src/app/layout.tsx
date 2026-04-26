import type { Metadata } from 'next';
import Link from 'next/link';
import { Scale } from 'lucide-react';
import './globals.css';
import CookieBanner from '@/components/CookieBanner';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://jurilib.vercel.app';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'Jurilib \u2014 Prenez rendez-vous avec un avocat',
    template: '%s | Jurilib',
  },
  description:
    'Jurilib connecte clients et avocats inscrits au barreau. Prise de rendez-vous en ligne, visio ou pr\u00e9sentiel, agenda en temps r\u00e9el.',
  openGraph: {
    title: 'Jurilib \u2014 Prenez rendez-vous avec un avocat',
    description:
      'Trouvez un avocat en droit du travail, de la famille, p\u00e9nal, des affaires\u2026 Disponibilit\u00e9s en temps r\u00e9el, paiement s\u00e9curis\u00e9.',
    url: SITE_URL,
    siteName: 'Jurilib',
    locale: 'fr_FR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Jurilib \u2014 Prenez rendez-vous avec un avocat',
    description:
      'Trouvez un avocat v\u00e9rifi\u00e9 pr\u00e8s de chez vous. Disponibilit\u00e9s en temps r\u00e9el, paiement s\u00e9curis\u00e9.',
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body className="min-h-screen bg-juri-bg text-juri-text font-sans antialiased flex flex-col">
        {/* ── HEADER ── */}
        <header className="sticky top-0 z-50 bg-juri-bg/60 backdrop-blur-2xl border-b border-juri-border/50">
          <div className="mx-auto max-w-6xl flex items-center justify-between px-4 py-4">
            <Link
              href="/"
              className="flex items-center gap-3 group"
            >
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-gold-dark to-gold flex items-center justify-center shadow-[0_0_20px_rgba(201,168,76,0.2)]">
                <Scale className="h-4 w-4 text-juri-bg" />
              </div>
              <span className="font-serif text-xl tracking-tight text-juri-text group-hover:text-gold transition-colors">
                Jurilib
              </span>
            </Link>

            <nav className="flex items-center gap-6 text-sm">
              <Link
                href="/recherche"
                className="font-sans text-juri-muted hover:text-gold transition-colors"
              >
                Trouver un avocat
              </Link>
              <Link
                href="/avocat-inscription"
                className="font-sans text-juri-muted hover:text-gold transition-colors"
              >
                Je suis avocat
              </Link>
              <Link
                href="/login"
                className="rounded-lg bg-gold/10 border border-gold/20 text-gold px-4 py-2 font-sans font-medium hover:bg-gold/20 transition-all"
              >
                Se connecter
              </Link>
            </nav>
          </div>
        </header>

        {/* ── MAIN ── */}
        <main className="flex-1">{children}</main>

        {/* ── FOOTER ── */}
        <footer className="mt-24 border-t border-juri-border">
          <div className="mx-auto max-w-6xl px-4 py-12 grid md:grid-cols-4 gap-8 text-sm">
            <div>
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded bg-gradient-to-br from-gold-dark to-gold flex items-center justify-center">
                  <Scale className="h-3 w-3 text-juri-bg" />
                </div>
                <span className="font-serif text-juri-text">Jurilib</span>
              </div>
              <p className="mt-3 text-juri-muted">
                La plateforme qui connecte clients et avocats v\u00e9rifi\u00e9s en France.
              </p>
            </div>
            <div>
              <h3 className="font-serif text-juri-text">Plateforme</h3>
              <ul className="mt-3 space-y-2 text-juri-muted">
                <li><Link href="/recherche" className="hover:text-gold transition-colors">Trouver un avocat</Link></li>
                <li><Link href="/avocat-inscription" className="hover:text-gold transition-colors">Je suis avocat</Link></li>
                <li><Link href="/comment-ca-marche" className="hover:text-gold transition-colors">Comment \u00e7a marche</Link></li>
                <li><Link href="/faq" className="hover:text-gold transition-colors">FAQ</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-serif text-juri-text">Mentions</h3>
              <ul className="mt-3 space-y-2 text-juri-muted">
                <li><Link href="/mentions-legales" className="hover:text-gold transition-colors">Mentions l\u00e9gales</Link></li>
                <li><Link href="/cgu" className="hover:text-gold transition-colors">CGU</Link></li>
                <li><Link href="/politique-de-confidentialite" className="hover:text-gold transition-colors">Confidentialit\u00e9</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-serif text-juri-text">Contact</h3>
              <ul className="mt-3 space-y-2 text-juri-muted">
                <li>
                  <a href="mailto:contact@jurilib.fr" className="hover:text-gold transition-colors">
                    contact@jurilib.fr
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-juri-border">
            <p className="mx-auto max-w-6xl px-4 py-6 text-xs text-juri-muted text-center">
              \u00a9 2026 Jurilib \u00b7 Plateforme ind\u00e9pendante \u00b7 Les avocats inscrits restent seuls responsables de leurs conseils.
            </p>
          </div>
        </footer>

        <CookieBanner />
      </body>
    </html>
  );
}
