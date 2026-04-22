import type { Metadata } from 'next';
import Link from 'next/link';
import { Scale } from 'lucide-react';
import './globals.css';
import CookieBanner from '@/components/CookieBanner';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://jurilib.vercel.app';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'Jurilib — Prenez rendez-vous avec un avocat',
    template: '%s | Jurilib',
  },
  description:
    'Jurilib connecte clients et avocats inscrits au barreau. Prise de rendez-vous en ligne, visio ou présentiel, agenda en temps réel.',
  openGraph: {
    title: 'Jurilib — Prenez rendez-vous avec un avocat',
    description:
      'Trouvez un avocat en droit du travail, de la famille, pénal, des affaires… Disponibilités en temps réel, paiement sécurisé.',
    url: SITE_URL,
    siteName: 'Jurilib',
    locale: 'fr_FR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Jurilib — Prenez rendez-vous avec un avocat',
    description:
      'Trouvez un avocat vérifié près de chez vous. Disponibilités en temps réel, paiement sécurisé.',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body className="min-h-screen bg-white text-slate-900 font-sans antialiased flex flex-col">
        <header className="border-b bg-white">
          <div className="mx-auto max-w-6xl flex items-center justify-between px-4 py-4">
            <Link href="/" className="flex items-center gap-2 font-semibold text-lg">
              <Scale className="h-6 w-6 text-brand-600" />
              <span>Jurilib</span>
            </Link>
            <nav className="flex items-center gap-6 text-sm">
              <Link href="/recherche" className="hover:text-brand-600">Trouver un avocat</Link>
              <Link href="/avocat-inscription" className="hover:text-brand-600">Je suis avocat</Link>
              <Link href="/login" className="rounded-md bg-brand-600 text-white px-4 py-2 hover:bg-brand-700">
                Se connecter
              </Link>
            </nav>
          </div>
        </header>

        <main className="flex-1">{children}</main>

        <footer className="mt-24 border-t bg-slate-50">
          <div className="mx-auto max-w-6xl px-4 py-12 grid md:grid-cols-4 gap-8 text-sm">
            <div>
              <div className="flex items-center gap-2 font-semibold">
                <Scale className="h-5 w-5 text-brand-600" />
                <span>Jurilib</span>
              </div>
              <p className="mt-3 text-slate-600">
                La plateforme qui connecte clients et avocats vérifiés en France.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-slate-900">Plateforme</h3>
              <ul className="mt-3 space-y-2 text-slate-600">
                <li><Link href="/recherche" className="hover:text-brand-600">Trouver un avocat</Link></li>
                <li><Link href="/avocat-inscription" className="hover:text-brand-600">Je suis avocat</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-slate-900">Mentions</h3>
              <ul className="mt-3 space-y-2 text-slate-600">
                <li><Link href="/mentions-legales" className="hover:text-brand-600">Mentions légales</Link></li>
                <li><Link href="/cgu" className="hover:text-brand-600">CGU</Link></li>
                <li><Link href="/politique-de-confidentialite" className="hover:text-brand-600">Confidentialité</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-slate-900">Contact</h3>
              <ul className="mt-3 space-y-2 text-slate-600">
                <li>
                  <a href="mailto:contact@jurilib.fr" className="hover:text-brand-600">contact@jurilib.fr</a>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t">
            <p className="mx-auto max-w-6xl px-4 py-6 text-xs text-slate-500 text-center">
              © 2026 Jurilib · Plateforme indépendante · Les avocats inscrits restent seuls responsables de leurs conseils.
            </p>
          </div>
        </footer>

        <CookieBanner />
      </body>
    </html>
  );
}
