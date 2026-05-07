-- Migration: categorie TEXT → categories TEXT[]

-- 1. Recréer la vue sans dépendance sur categorie
DROP VIEW IF EXISTS compatibilite_produits;

-- 2. Ajouter la nouvelle colonne tableau
ALTER TABLE produits
  ADD COLUMN IF NOT EXISTS categories TEXT[];

-- 3. Copier les valeurs existantes
UPDATE produits
  SET categories = ARRAY[categorie]
  WHERE categorie IS NOT NULL AND categories IS NULL;

-- 4. Supprimer l'ancienne colonne
ALTER TABLE produits DROP COLUMN IF EXISTS categorie;

-- 5. Recréer la vue avec categories
CREATE OR REPLACE VIEW compatibilite_produits AS
WITH compat AS (
  SELECT
    pr.id AS produit_id,
    COUNT(DISTINCT p.id) AS nb_profils_compatibles,
    MODE() WITHIN GROUP (ORDER BY p.porosite) AS porosite_cible_principale
  FROM produits pr
  LEFT JOIN profils p
    ON p.type_cheveux = ANY(pr.types_compatibles)
    AND p.porosite = ANY(pr.porosites_compatibles)
  GROUP BY pr.id
),
total_profils AS (
  SELECT COUNT(*) AS total FROM profils
)
SELECT
  c.produit_id,
  pr.nom,
  pr.marque,
  pr.categories,
  c.nb_profils_compatibles,
  ROUND(
    100.0 * c.nb_profils_compatibles / NULLIF(tp.total, 0), 2
  ) AS pct_base_totale,
  c.porosite_cible_principale
FROM compat c
JOIN produits pr ON pr.id = c.produit_id
CROSS JOIN total_profils tp
ORDER BY c.nb_profils_compatibles DESC;

GRANT SELECT ON compatibilite_produits TO brand_analyst;
