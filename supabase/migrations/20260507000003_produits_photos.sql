ALTER TABLE produits
  ADD COLUMN IF NOT EXISTS photo_urls TEXT[] DEFAULT ARRAY[]::TEXT[];

INSERT INTO storage.buckets (id, name, public)
SELECT 'produits-photos', 'produits-photos', true
WHERE NOT EXISTS (
  SELECT 1 FROM storage.buckets WHERE id = 'produits-photos'
);
