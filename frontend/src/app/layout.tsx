import type { Metadata } from 'next';
import Link from 'next/link';
import { Scale } from 'lucide-react';
import './globals.css';

export const metadata: Metadata = {
  title: 'Jurilib — Prenez rendez-vous avec un avocat',
  description: 'La plateforme qui connecte clients et avocats. Prise de rendez-vous en ligne, visio, paiement sécurisé.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body className="min-h-screen bg-white text-slate-900 font-sans antialiased">
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
        <main>{children}</main>
        <footer className="mt-24 border-t py-10 text-center text-sm text-slate-500">
          © 2026 Jurilib · Plateforme indépendante, les avocats restent seuls responsables de leurs conseils.
        </footer>
      </body>
    </html>
  );
}
