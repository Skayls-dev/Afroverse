-- Ajout des champs de diagnostic IA au profil
ALTER TABLE profils
  ADD COLUMN IF NOT EXISTS photo_diagnostic_url TEXT,
  ADD COLUMN IF NOT EXISTS diagnostic_ia JSONB,
  ADD COLUMN IF NOT EXISTS diagnostic_ia_at TIMESTAMPTZ;

-- Bucket Storage pour les photos de diagnostic IA
INSERT INTO storage.buckets (id, name, public)
SELECT 'diagnostics-photos', 'diagnostics-photos', true
WHERE NOT EXISTS (
  SELECT 1 FROM storage.buckets WHERE id = 'diagnostics-photos'
);
