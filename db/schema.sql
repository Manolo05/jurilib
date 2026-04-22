-- =====================================================================
-- JURILIB — Schéma PostgreSQL (MVP)
-- Plateforme de prise de rendez-vous avocats
-- Auteur : Jurilib
-- Version : 1.0.0
-- =====================================================================

-- Extensions utiles
CREATE EXTENSION IF NOT EXISTS "pgcrypto";     -- gen_random_uuid
CREATE EXTENSION IF NOT EXISTS "citext";       -- emails case-insensitive
CREATE EXTENSION IF NOT EXISTS "pg_trgm";      -- recherche floue
CREATE EXTENSION IF NOT EXISTS "unaccent";     -- recherche sans accents

-- =====================================================================
-- ENUMS
-- =====================================================================
CREATE TYPE user_role        AS ENUM ('client', 'lawyer', 'admin');
CREATE TYPE appointment_status AS ENUM ('pending', 'confirmed', 'cancelled', 'completed', 'no_show');
CREATE TYPE payment_status   AS ENUM ('pending', 'succeeded', 'failed', 'refunded');
CREATE TYPE meeting_type     AS ENUM ('video', 'in_person', 'phone');
CREATE TYPE verification_status AS ENUM ('unverified', 'pending', 'verified', 'rejected');

-- =====================================================================
-- USERS — compte de base (client ou avocat)
-- =====================================================================
CREATE TABLE users (
    id               UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email            CITEXT UNIQUE NOT NULL,
    password_hash    TEXT NOT NULL,                   -- bcrypt/argon2
    first_name       TEXT NOT NULL,
    last_name        TEXT NOT NULL,
    phone            TEXT,
    role             user_role NOT NULL DEFAULT 'client',
    email_verified   BOOLEAN NOT NULL DEFAULT FALSE,
    avatar_url       TEXT,
    locale           TEXT NOT NULL DEFAULT 'fr-FR',
    last_login_at    TIMESTAMPTZ,
    created_at       TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at       TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
CREATE INDEX idx_users_role ON users(role);

-- =====================================================================
-- LAWYERS — profil professionnel (1-1 avec users)
-- =====================================================================
CREATE TABLE lawyers (
    id                   UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id              UUID NOT NULL UNIQUE REFERENCES users(id) ON DELETE CASCADE,
    slug                 TEXT UNIQUE NOT NULL,         -- pour SEO : /avocat/paris/maitre-dupont
    bar_association      TEXT NOT NULL,                 -- "Barreau de Paris"
    bar_number           TEXT,                          -- n° toque
    years_experience     INT NOT NULL DEFAULT 0 CHECK (years_experience >= 0),
    bio                  TEXT,
    consultation_price   NUMERIC(8,2) NOT NULL CHECK (consultation_price >= 0),
    consultation_duration INT NOT NULL DEFAULT 30,     -- minutes
    currency             TEXT NOT NULL DEFAULT 'EUR',
    rating_avg           NUMERIC(3,2) NOT NULL DEFAULT 0 CHECK (rating_avg BETWEEN 0 AND 5),
    rating_count         INT NOT NULL DEFAULT 0,
    verified             verification_status NOT NULL DEFAULT 'unverified',
    accepts_video        BOOLEAN NOT NULL DEFAULT TRUE,
    accepts_in_person    BOOLEAN NOT NULL DEFAULT TRUE,
    address_line         TEXT,
    city                 TEXT NOT NULL,
    postal_code          TEXT,
    country              TEXT NOT NULL DEFAULT 'FR',
    latitude             NUMERIC(9,6),
    longitude            NUMERIC(9,6),
    stripe_account_id    TEXT,                          -- Stripe Connect
    is_active            BOOLEAN NOT NULL DEFAULT TRUE,
    created_at           TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at           TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
CREATE INDEX idx_lawyers_city ON lawyers(city);
CREATE INDEX idx_lawyers_verified ON lawyers(verified);
CREATE INDEX idx_lawyers_rating ON lawyers(rating_avg DESC);
CREATE INDEX idx_lawyers_location ON lawyers(latitude, longitude);
CREATE INDEX idx_lawyers_slug ON lawyers(slug);

-- =====================================================================
-- SPECIALTIES — référentiel + jointure N-N
-- =====================================================================
CREATE TABLE specialties (
    id    SERIAL PRIMARY KEY,
    slug  TEXT UNIQUE NOT NULL,      -- "droit-du-travail"
    label TEXT NOT NULL              -- "Droit du travail"
);

CREATE TABLE lawyer_specialties (
    lawyer_id    UUID NOT NULL REFERENCES lawyers(id) ON DELETE CASCADE,
    specialty_id INT  NOT NULL REFERENCES specialties(id) ON DELETE CASCADE,
    PRIMARY KEY (lawyer_id, specialty_id)
);
CREATE INDEX idx_lawyer_specialties_specialty ON lawyer_specialties(specialty_id);

-- =====================================================================
-- AVAILABILITIES — créneaux de l'avocat
-- =====================================================================
CREATE TABLE availabilities (
    id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    lawyer_id   UUID NOT NULL REFERENCES lawyers(id) ON DELETE CASCADE,
    starts_at   TIMESTAMPTZ NOT NULL,
    ends_at     TIMESTAMPTZ NOT NULL,
    is_booked   BOOLEAN NOT NULL DEFAULT FALSE,
    meeting_type meeting_type NOT NULL DEFAULT 'video',
    created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    CHECK (ends_at > starts_at),
    -- Empêche deux créneaux qui se chevauchent pour un même avocat
    EXCLUDE USING gist (
        lawyer_id WITH =,
        tstzrange(starts_at, ends_at, '[)') WITH &&
    )
);
CREATE INDEX idx_avail_lawyer_date ON availabilities(lawyer_id, starts_at);
CREATE INDEX idx_avail_free ON availabilities(lawyer_id, starts_at) WHERE is_booked = FALSE;

-- Note : l'EXCLUDE USING gist nécessite btree_gist
CREATE EXTENSION IF NOT EXISTS btree_gist;

-- =====================================================================
-- APPOINTMENTS — rendez-vous réservé
-- =====================================================================
CREATE TABLE appointments (
    id               UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    client_id        UUID NOT NULL REFERENCES users(id) ON DELETE RESTRICT,
    lawyer_id        UUID NOT NULL REFERENCES lawyers(id) ON DELETE RESTRICT,
    availability_id  UUID UNIQUE REFERENCES availabilities(id) ON DELETE SET NULL,
    starts_at        TIMESTAMPTZ NOT NULL,
    ends_at          TIMESTAMPTZ NOT NULL,
    status           appointment_status NOT NULL DEFAULT 'pending',
    meeting_type     meeting_type NOT NULL DEFAULT 'video',
    meeting_url      TEXT,                               -- Zoom / Daily / WebRTC
    notes            TEXT,                               -- note du client à l'avocat
    cancellation_reason TEXT,
    price_charged    NUMERIC(8,2) NOT NULL CHECK (price_charged >= 0),
    currency         TEXT NOT NULL DEFAULT 'EUR',
    created_at       TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at       TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    CHECK (ends_at > starts_at)
);
CREATE INDEX idx_appts_client ON appointments(client_id, starts_at DESC);
CREATE INDEX idx_appts_lawyer ON appointments(lawyer_id, starts_at DESC);
CREATE INDEX idx_appts_status ON appointments(status);

-- =====================================================================
-- PAYMENTS — transactions Stripe
-- =====================================================================
CREATE TABLE payments (
    id                  UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    appointment_id      UUID NOT NULL REFERENCES appointments(id) ON DELETE RESTRICT,
    amount              NUMERIC(8,2) NOT NULL CHECK (amount >= 0),
    currency            TEXT NOT NULL DEFAULT 'EUR',
    status              payment_status NOT NULL DEFAULT 'pending',
    stripe_payment_intent TEXT UNIQUE,
    stripe_charge_id    TEXT,
    platform_fee        NUMERIC(8,2) DEFAULT 0,       -- commission Jurilib
    payment_method      TEXT,                         -- card, sepa, etc.
    refunded_amount     NUMERIC(8,2) DEFAULT 0,
    receipt_url         TEXT,
    created_at          TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at          TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
CREATE INDEX idx_payments_appointment ON payments(appointment_id);
CREATE INDEX idx_payments_status ON payments(status);

-- =====================================================================
-- REVIEWS — avis client après RDV
-- =====================================================================
CREATE TABLE reviews (
    id             UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    client_id      UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    lawyer_id      UUID NOT NULL REFERENCES lawyers(id) ON DELETE CASCADE,
    appointment_id UUID UNIQUE REFERENCES appointments(id) ON DELETE SET NULL,
    rating         INT NOT NULL CHECK (rating BETWEEN 1 AND 5),
    comment        TEXT,
    is_published   BOOLEAN NOT NULL DEFAULT TRUE,
    lawyer_reply   TEXT,
    created_at     TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    UNIQUE (client_id, appointment_id)
);
CREATE INDEX idx_reviews_lawyer ON reviews(lawyer_id, created_at DESC);

-- Trigger : recalcule rating_avg et rating_count
CREATE OR REPLACE FUNCTION recompute_lawyer_rating()
RETURNS TRIGGER AS $$
BEGIN
    UPDATE lawyers
    SET rating_avg = COALESCE((SELECT AVG(rating) FROM reviews WHERE lawyer_id = NEW.lawyer_id AND is_published), 0),
        rating_count = (SELECT COUNT(*) FROM reviews WHERE lawyer_id = NEW.lawyer_id AND is_published)
    WHERE id = NEW.lawyer_id;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_reviews_rating
AFTER INSERT OR UPDATE OR DELETE ON reviews
FOR EACH ROW EXECUTE FUNCTION recompute_lawyer_rating();

-- =====================================================================
-- MESSAGES — messagerie client <-> avocat
-- =====================================================================
CREATE TABLE message_threads (
    id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    client_id   UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    lawyer_id   UUID NOT NULL REFERENCES lawyers(id) ON DELETE CASCADE,
    created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    UNIQUE (client_id, lawyer_id)
);

CREATE TABLE messages (
    id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    thread_id     UUID NOT NULL REFERENCES message_threads(id) ON DELETE CASCADE,
    sender_id     UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    content       TEXT NOT NULL,
    read_at       TIMESTAMPTZ,
    created_at    TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
CREATE INDEX idx_messages_thread ON messages(thread_id, created_at DESC);

-- =====================================================================
-- CASES — suivi de dossier (bonus MVP)
-- =====================================================================
CREATE TABLE cases (
    id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    client_id   UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    lawyer_id   UUID NOT NULL REFERENCES lawyers(id) ON DELETE CASCADE,
    title       TEXT NOT NULL,
    description TEXT,
    status      TEXT NOT NULL DEFAULT 'open',       -- open, in_progress, closed
    created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE case_documents (
    id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    case_id     UUID NOT NULL REFERENCES cases(id) ON DELETE CASCADE,
    uploaded_by UUID NOT NULL REFERENCES users(id),
    file_name   TEXT NOT NULL,
    file_url    TEXT NOT NULL,
    file_size   INT,
    mime_type   TEXT,
    created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- =====================================================================
-- NOTIFICATIONS
-- =====================================================================
CREATE TABLE notifications (
    id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id     UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    type        TEXT NOT NULL,                 -- appointment_confirmed, payment_succeeded…
    title       TEXT NOT NULL,
    body        TEXT,
    data        JSONB,
    read_at     TIMESTAMPTZ,
    created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
CREATE INDEX idx_notif_user_unread ON notifications(user_id) WHERE read_at IS NULL;

-- =====================================================================
-- SEED de base : spécialités
-- =====================================================================
INSERT INTO specialties (slug, label) VALUES
  ('droit-du-travail',     'Droit du travail'),
  ('droit-penal',          'Droit pénal'),
  ('droit-de-la-famille',  'Droit de la famille'),
  ('droit-des-affaires',   'Droit des affaires'),
  ('droit-immobilier',     'Droit immobilier'),
  ('droit-fiscal',         'Droit fiscal'),
  ('droit-des-etrangers',  'Droit des étrangers'),
  ('droit-de-la-consommation','Droit de la consommation'),
  ('propriete-intellectuelle','Propriété intellectuelle'),
  ('droit-des-societes',   'Droit des sociétés')
ON CONFLICT (slug) DO NOTHING;

-- =====================================================================
-- Fonction trigger : updated_at auto
-- =====================================================================
CREATE OR REPLACE FUNCTION touch_updated_at()
RETURNS TRIGGER AS $$
BEGIN NEW.updated_at = NOW(); RETURN NEW; END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_users_updated BEFORE UPDATE ON users
  FOR EACH ROW EXECUTE FUNCTION touch_updated_at();
CREATE TRIGGER trg_lawyers_updated BEFORE UPDATE ON lawyers
  FOR EACH ROW EXECUTE FUNCTION touch_updated_at();
CREATE TRIGGER trg_appointments_updated BEFORE UPDATE ON appointments
  FOR EACH ROW EXECUTE FUNCTION touch_updated_at();
CREATE TRIGGER trg_payments_updated BEFORE UPDATE ON payments
  FOR EACH ROW EXECUTE FUNCTION touch_updated_at();
