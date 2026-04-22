# Déploiement Jurilib

Le repo GitHub `Manolo05/jurilib` a été créé (vide). Le code est commité localement
(`b714282 chore: initial Jurilib scaffolding`) et le remote est déjà configuré.
Il ne reste plus qu'à pousser + déployer depuis ta machine.

## 1. Pousser le code sur GitHub

Depuis ton terminal, sur ta machine (où tu as accès à ton compte GitHub) :

```bash
cd <dossier-jurilib>   # le dossier contenant backend/ frontend/ db/ etc.

# si le remote n'est pas déjà présent :
git remote add origin https://github.com/Manolo05/jurilib.git

git push -u origin main
```

Git te demandera ton **username** GitHub et un **Personal Access Token**
(Settings → Developer settings → Personal access tokens → Fine-grained tokens
→ scope `repo`).

## 2. Déployer le frontend sur Vercel

1. Va sur https://vercel.com/new
2. "Import Git Repository" → sélectionne `Manolo05/jurilib`
3. **Root Directory** : `frontend`
4. **Framework Preset** : Next.js (détecté automatiquement)
5. Variables d'environnement :
   - `NEXT_PUBLIC_API_URL` = `https://api.jurilib.fr` (ou ton URL Railway temporaire)
6. Clique **Deploy**

Vercel va compiler et servir le front à une URL du type `jurilib.vercel.app`.

## 3. Déployer le backend (Railway ou Render)

### Option A — Railway

1. https://railway.app → New Project → Deploy from GitHub → `Manolo05/jurilib`
2. **Root** : `backend`
3. Ajouter un service **Postgres** (Railway → "+ New" → Database → PostgreSQL)
4. Variables d'environnement (onglet Variables) :

   ```
   DATABASE_URL=<copie depuis le service Postgres>
   JWT_SECRET=<génère 32 chars aléatoires>
   STRIPE_SECRET_KEY=sk_test_...
   STRIPE_WEBHOOK_SECRET=whsec_...
   RESEND_API_KEY=re_...
   FRONTEND_URL=https://jurilib.vercel.app
   PORT=3001
   ```

5. Dans l'onglet Settings → **Start Command** : `npm run start:prod`
6. Migration DB : Railway → service backend → onglet `Deployments` → redeploy.
   Ajouter un *pre-deploy command* `npx prisma migrate deploy && npx prisma db seed`.

### Option B — Supabase (DB only) + Render (API)

- DB → Supabase (gratuit, Postgres managé).
- API → Render.com → New Web Service → Build `npm ci && npx prisma generate`,
  Start `npm run start:prod`.

## 4. Brancher Stripe

1. Dashboard Stripe → Developers → Webhooks → Add endpoint
2. URL : `https://<ton-backend>.railway.app/payments/webhook`
3. Events : `checkout.session.completed`
4. Copier le signing secret dans `STRIPE_WEBHOOK_SECRET`

## 5. Domaine custom (optionnel)

- Vercel → Project Settings → Domains → ajouter `jurilib.fr`
- DNS chez ton registrar (Gandi/OVH) : CNAME `www` → `cname.vercel-dns.com`
- Backend : `api.jurilib.fr` → CNAME vers Railway

## 6. Comptes de démo (après `prisma db seed`)

- Client : `client@jurilib.fr` / `test1234`
- Avocat : `avocat1@jurilib.fr` / `test1234`

---

Une fois la première visite du site en prod, l'étape suivante est
d'appliquer la checklist SEO (sitemap.xml dynamique, robots.txt, Schema.org
LegalService déjà câblés) et de lancer la collecte des 10 premiers avocats
pilotes.
