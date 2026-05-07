-- Ensure diagnostics bucket exists and is public for public URLs.
INSERT INTO storage.buckets (id, name, public)
SELECT 'diagnostics-photos', 'diagnostics-photos', true
WHERE NOT EXISTS (
  SELECT 1 FROM storage.buckets WHERE id = 'diagnostics-photos'
);

UPDATE storage.buckets
SET public = true
WHERE id = 'diagnostics-photos';

-- Existing policy from init migration has no WITH CHECK and blocks INSERT/UPSERT.
DROP POLICY IF EXISTS "user_own_profil" ON profils;
CREATE POLICY "user_own_profil" ON profils
FOR ALL
TO authenticated
USING (auth.uid() = id)
WITH CHECK (auth.uid() = id);

-- Allow authenticated users to manage only their own diagnostic photos.
DROP POLICY IF EXISTS "diag_photos_insert_own" ON storage.objects;
CREATE POLICY "diag_photos_insert_own" ON storage.objects
FOR INSERT
TO authenticated
WITH CHECK (
  bucket_id = 'diagnostics-photos'
  AND (storage.foldername(name))[1] = auth.uid()::text
);

DROP POLICY IF EXISTS "diag_photos_update_own" ON storage.objects;
CREATE POLICY "diag_photos_update_own" ON storage.objects
FOR UPDATE
TO authenticated
USING (
  bucket_id = 'diagnostics-photos'
  AND (storage.foldername(name))[1] = auth.uid()::text
)
WITH CHECK (
  bucket_id = 'diagnostics-photos'
  AND (storage.foldername(name))[1] = auth.uid()::text
);

DROP POLICY IF EXISTS "diag_photos_delete_own" ON storage.objects;
CREATE POLICY "diag_photos_delete_own" ON storage.objects
FOR DELETE
TO authenticated
USING (
  bucket_id = 'diagnostics-photos'
  AND (storage.foldername(name))[1] = auth.uid()::text
);

-- Allow reading diagnostics images from public URLs.
DROP POLICY IF EXISTS "diag_photos_select_public" ON storage.objects;
CREATE POLICY "diag_photos_select_public" ON storage.objects
FOR SELECT
TO anon, authenticated
USING (bucket_id = 'diagnostics-photos');