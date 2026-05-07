-- Migration: ajouter les champs de ciblage diagnostic aux produits
ALTER TABLE produits
  ADD COLUMN IF NOT EXISTS description TEXT,
  ADD COLUMN IF NOT EXISTS problemes_cibles TEXT[],
  ADD COLUMN IF NOT EXISTS objectifs_cibles TEXT[],
  ADD COLUMN IF NOT EXISTS elasticites_compatibles TEXT[],
  ADD COLUMN IF NOT EXISTS densites_compatibles TEXT[],
  ADD COLUMN IF NOT EXISTS lien_achat TEXT;
