'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

const CONSENT_COOKIE = 'jurilib_consent';

function readConsent(): boolean {
  if (typeof document === 'undefined') return true; // SSR: ne pas afficher
  return document.cookie
    .split(';')
    .some((c) => c.trim().startsWith(`${CONSENT_COOKIE}=`));
}

function writeConsent(value: 'accepted' | 'declined') {
  const sixMonths = 60 * 60 * 24 * 180;
  document.cookie = `${CONSENT_COOKIE}=${value}; Max-Age=${sixMonths}; Path=/; SameSite=Lax`;
}

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(!readConsent());
  }, []);

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-label="Consentement cookies"
      className="fixed bottom-4 left-4 right-4 md:left-auto md:right-6 md:bottom-6 md:max-w-md rounded-xl border bg-white shadow-lg p-5 z-50"
    >
      <p className="text-sm text-slate-700">
        Jurilib utilise uniquement un cookie technique pour mémoriser votre
        consentement. Aucun traceur publicitaire.{' '}
        <Link href="/politique-de-confidentialite" className="underline">
          En savoir plus
        </Link>
        .
      </p>
      <div className="mt-4 flex gap-2 justify-end">
        <button
          onClick={() => {
            writeConsent('declined');
            setVisible(false);
          }}
          className="text-sm px-3 py-1.5 rounded-md border hover:bg-slate-50"
        >
          Refuser
        </button>
        <button
          onClick={() => {
            writeConsent('accepted');
            setVisible(false);
          }}
          className="text-sm px-3 py-1.5 rounded-md bg-brand-600 text-white hover:bg-brand-700"
        >
          OK, j&rsquo;ai compris
        </button>
      </div>
    </div>
  );
}
