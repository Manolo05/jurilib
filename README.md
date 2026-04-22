# Jurilib — Le Doctolib des avocats

Plateforme de prise de rendez-vous pour avocats et clients.

## Stack

| Couche | Techno |
|---|---|
| Frontend | Next.js 14 (App Router) + Tailwind |
| Backend | NestJS (REST + OpenAPI) |
| ORM | Prisma |
| DB | PostgreSQL |
| Auth | JWT (argon2) |
| Paiement | Stripe (Checkout + Connect) |
| Email | Resend |
| Hébergement | Vercel (front) + Railway/Supabase (back+DB) |

## Démarrage rapide

```bash
# 1. Base de données
docker run -d --name jurilib-db -p 5432:5432 \
  -e POSTGRES_PASSWORD=postgres -e POSTGRES_DB=jurilib postgres:16

# 2. Backend
cd backend
cp .env.example .env
npm i
npx prisma migrate dev --name init
npx prisma db seed
npm run dev            # http://localhost:3001/docs (Swagger)

# 3. Frontend
cd ../frontend
cp .env.example .env
npm i
npm run dev            # http://localhost:3000
```

Comptes de démo (après seed) :
- Client : `client@jurilib.fr` / `test1234`
- Avocat : `avocat1@jurilib.fr` / `test1234`

## Structure

```
jurilib/
├── backend/            # NestJS + Prisma + Stripe
│   ├── prisma/schema.prisma
│   ├── prisma/seed.ts
│   └── src/
│       ├── main.ts
│       ├── app.module.ts
│       ├── common/prisma.module.ts
│       └── modules/
│           ├── auth/
│           ├── lawyers/
│           ├── availabilities/
│           ├── appointments/
│           ├── payments/
│           ├── reviews/
│           └── messages/
├── frontend/           # Next.js 14 (App Router)
│   └── src/app/
│       ├── page.tsx                 # Homepage + recherche
│       ├── recherche/page.tsx       # Résultats
│       ├── avocat/[slug]/page.tsx   # Profil SEO
│       ├── reservation/page.tsx     # Checkout
│       ├── login/page.tsx
│       └── dashboard/avocat/page.tsx
├── db/schema.sql                    # Version SQL pure
└── docs/                            # Spécifications
```

## Roadmap MVP — 7 jours

| Jour | Livrable |
|---|---|
| 1 | DB + Prisma + seed, auth JWT |
| 2 | Modules `lawyers` + `availabilities`, recherche avec filtres |
| 3 | Module `appointments` + réservation atomique |
| 4 | Intégration Stripe Checkout + webhook |
| 5 | Front : homepage, recherche, profil avocat SEO (ISR) |
| 6 | Dashboard avocat + agenda, emails Resend |
| 7 | QA, responsive, déploiement Vercel + Railway |

## Déploiement

1. Pousser sur GitHub.
2. **Frontend** → Vercel : `cd frontend` → import repo → var `NEXT_PUBLIC_API_URL`.
3. **Backend + DB** → Railway : New Project → Postgres + Node → var env Stripe/Resend.
4. Webhook Stripe pointé vers `https://api.jurilib.fr/payments/webhook`.
