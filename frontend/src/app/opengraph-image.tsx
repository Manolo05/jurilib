import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'Jurilib — Prenez rendez-vous avec un avocat';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '80px',
          background: 'linear-gradient(135deg, #eef2ff 0%, #ffffff 60%)',
          fontFamily: 'sans-serif',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 20,
            fontSize: 44,
            fontWeight: 700,
            color: '#4f46e5',
          }}
        >
          <span style={{ fontSize: 72 }}>⚖️</span>
          Jurilib
        </div>
        <div
          style={{
            marginTop: 40,
            fontSize: 68,
            fontWeight: 800,
            color: '#0f172a',
            lineHeight: 1.15,
            maxWidth: 900,
          }}
        >
          Prenez rendez-vous avec un avocat en quelques clics.
        </div>
        <div
          style={{
            marginTop: 28,
            fontSize: 30,
            color: '#475569',
            maxWidth: 900,
          }}
        >
          Plateforme française de mise en relation avec des avocats vérifiés —
          visio, présentiel, paiement sécurisé.
        </div>
      </div>
    ),
    { ...size },
  );
}
