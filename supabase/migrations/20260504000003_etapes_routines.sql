-- Migration 003: Table etapes_routines
-- Routine steps from the ST Cosmetics booklet, filterable by profile

-- Auto-update trigger function (manual, no moddatetime extension assumed)
CREATE OR REPLACE FUNCTION set_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TABLE etapes_routines (
  -- Core columns (Option 2)
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug            TEXT NOT NULL UNIQUE,
  titre           TEXT NOT NULL,
  description     TEXT NOT NULL,
  emoji           TEXT NOT NULL,
  frequence       TEXT NOT NULL,
  duree_minutes   INT,
  quand           TEXT,
  produits_types  TEXT,
  accessoires     TEXT,
  ordre_defaut    INT NOT NULL,
  universelle     BOOLEAN NOT NULL DEFAULT false,
  types_compatibles   TEXT[],
  porosites_cibles    TEXT[],
  problemes_cibles    TEXT[],

  -- Future columns (Option 3 — nullable now)
  nom_routine     TEXT,
  photo_url       TEXT,
  video_url       TEXT,
  premium         BOOLEAN NOT NULL DEFAULT false,

  -- Timestamps
  created_at      TIMESTAMPTZ DEFAULT NOW(),
  updated_at      TIMESTAMPTZ DEFAULT NOW(),

  -- Constraints
  CONSTRAINT ordre_defaut_range CHECK (ordre_defaut BETWEEN 1 AND 9),
  CONSTRAINT valid_porosites CHECK (
    porosites_cibles IS NULL OR
    porosites_cibles <@ ARRAY['faible','normale','haute']::TEXT[]
  )
);

-- Indexes for array filtering
CREATE INDEX ON etapes_routines USING GIN (porosites_cibles);
CREATE INDEX ON etapes_routines USING GIN (problemes_cibles);

-- Auto-update trigger
CREATE TRIGGER etapes_routines_updated_at
  BEFORE UPDATE ON etapes_routines
  FOR EACH ROW EXECUTE FUNCTION set_updated_at();

-- RLS
ALTER TABLE etapes_routines ENABLE ROW LEVEL SECURITY;

-- Public read: all users (authenticated + anon) can read routine steps
CREATE POLICY "public_read_etapes"
  ON etapes_routines
  FOR SELECT
  TO authenticated, anon
  USING (true);
