-- Profils
CREATE TABLE profils (
  id UUID PRIMARY KEY REFERENCES auth.users(id),
  prenom TEXT,
  email TEXT,
  type_cheveux TEXT CHECK (type_cheveux IN ('3A','3B','3C','4A','4B','4C')),
  porosite TEXT CHECK (porosite IN ('faible','normale','haute')),
  elasticite TEXT CHECK (elasticite IN ('faible','normale','haute')),
  densite TEXT CHECK (densite IN ('fine','moyenne','epaisse')),
  objectifs TEXT[],
  problemes TEXT[],
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Suivis mensuels
CREATE TABLE suivis (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES profils(id) ON DELETE CASCADE,
  mois DATE,
  photo_url TEXT,
  score_hydratation INT CHECK (score_hydratation BETWEEN 1 AND 10),
  score_brillance INT CHECK (score_brillance BETWEEN 1 AND 10),
  score_casse INT CHECK (score_casse BETWEEN 1 AND 10),
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Produits
CREATE TABLE produits (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  nom TEXT NOT NULL,
  marque TEXT,
  categorie TEXT,
  types_compatibles TEXT[],
  porosites_compatibles TEXT[],
  ingredients TEXT[],
  prix DECIMAL(10,2),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Recommandations
CREATE TABLE recommandations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES profils(id) ON DELETE CASCADE,
  produit_id UUID REFERENCES produits(id),
  score_match INT,
  raison TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Marques B2B
CREATE TABLE marques (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  nom TEXT NOT NULL,
  email_contact TEXT,
  plan TEXT CHECK (plan IN ('basic','pro','enterprise')),
  stripe_customer_id TEXT,
  actif BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- RLS
ALTER TABLE profils ENABLE ROW LEVEL SECURITY;
ALTER TABLE suivis ENABLE ROW LEVEL SECURITY;
ALTER TABLE recommandations ENABLE ROW LEVEL SECURITY;

CREATE POLICY "user_own_profil" ON profils FOR ALL USING (auth.uid() = id);
CREATE POLICY "user_own_suivis" ON suivis FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "user_own_recommandations" ON recommandations FOR SELECT USING (auth.uid() = user_id);
