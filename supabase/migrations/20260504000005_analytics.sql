-- ============================================================
-- AlwaysAfro — Vues analytiques B2B anonymisées
-- Usage : dashboard Brand Intelligence pour les partenaires marques
-- IMPORTANT : aucune donnée personnelle identifiable exposée
--   (pas d'id utilisateur, pas d'email, uniquement agrégats)
-- ============================================================

-- Rôle brand_analyst (lecture seule sur les vues uniquement)
DO $$ BEGIN
  IF NOT EXISTS (SELECT FROM pg_roles WHERE rolname = 'brand_analyst') THEN
    CREATE ROLE brand_analyst;
  END IF;
END $$;

-- Révoquer tout accès direct aux tables sous-jacentes
REVOKE ALL ON TABLE profils, suivis, produits FROM brand_analyst;

-- ============================================================
-- VUE 1 — segments_capillaires
-- Agrégation anonymisée par type_cheveux + porosite + densite
-- ============================================================
CREATE OR REPLACE VIEW segments_capillaires AS
WITH base AS (
  SELECT
    type_cheveux,
    porosite,
    densite,
    COUNT(*) AS nb_profils
  FROM profils
  WHERE type_cheveux IS NOT NULL AND porosite IS NOT NULL
  GROUP BY type_cheveux, porosite, densite
),
porosite_haute AS (
  SELECT
    type_cheveux,
    porosite,
    densite,
    COUNT(*) AS nb_haute
  FROM profils
  WHERE porosite = 'haute'
  GROUP BY type_cheveux, porosite, densite
),
probleme_mode AS (
  SELECT DISTINCT ON (type_cheveux, porosite, densite)
    type_cheveux,
    porosite,
    densite,
    unnested_pb AS probleme_dominant
  FROM (
    SELECT
      type_cheveux,
      porosite,
      densite,
      unnest(problemes) AS unnested_pb,
      COUNT(*) AS freq
    FROM profils
    WHERE problemes IS NOT NULL
    GROUP BY type_cheveux, porosite, densite, unnested_pb
    ORDER BY type_cheveux, porosite, densite, freq DESC
  ) t
),
objectif_mode AS (
  SELECT DISTINCT ON (type_cheveux, porosite, densite)
    type_cheveux,
    porosite,
    densite,
    unnested_obj AS objectif_dominant
  FROM (
    SELECT
      type_cheveux,
      porosite,
      densite,
      unnest(objectifs) AS unnested_obj,
      COUNT(*) AS freq
    FROM profils
    WHERE objectifs IS NOT NULL
    GROUP BY type_cheveux, porosite, densite, unnested_obj
    ORDER BY type_cheveux, porosite, densite, freq DESC
  ) t
)
SELECT
  b.type_cheveux,
  b.porosite,
  b.densite,
  b.nb_profils,
  ROUND(
    100.0 * COALESCE(ph.nb_haute, 0) / NULLIF(b.nb_profils, 0), 1
  ) AS pct_haute_porosite,
  pm.probleme_dominant,
  om.objectif_dominant
FROM base b
LEFT JOIN porosite_haute ph USING (type_cheveux, porosite, densite)
LEFT JOIN probleme_mode pm USING (type_cheveux, porosite, densite)
LEFT JOIN objectif_mode om USING (type_cheveux, porosite, densite)
WHERE b.nb_profils >= 5;

GRANT SELECT ON segments_capillaires TO brand_analyst;

-- ============================================================
-- VUE 2 — tendances_problemes
-- Distribution des problèmes déclarés (toute la base)
-- ============================================================
CREATE OR REPLACE VIEW tendances_problemes AS
WITH expanded AS (
  SELECT
    unnest(problemes) AS probleme,
    type_cheveux
  FROM profils
  WHERE problemes IS NOT NULL
),
counts AS (
  SELECT
    probleme,
    COUNT(*) AS nb_occurrences
  FROM expanded
  GROUP BY probleme
),
total AS (
  SELECT SUM(nb_occurrences) AS total FROM counts
),
top_types AS (
  SELECT
    probleme,
    array_agg(type_cheveux ORDER BY cnt DESC) FILTER (WHERE rn <= 3) AS types_les_plus_touches
  FROM (
    SELECT
      probleme,
      type_cheveux,
      COUNT(*) AS cnt,
      ROW_NUMBER() OVER (PARTITION BY probleme ORDER BY COUNT(*) DESC) AS rn
    FROM expanded
    GROUP BY probleme, type_cheveux
  ) ranked
  GROUP BY probleme
)
SELECT
  c.probleme,
  c.nb_occurrences,
  ROUND(100.0 * c.nb_occurrences / NULLIF(t.total, 0), 2) AS pct_total,
  tt.types_les_plus_touches
FROM counts c
CROSS JOIN total t
LEFT JOIN top_types tt USING (probleme)
ORDER BY c.nb_occurrences DESC;

GRANT SELECT ON tendances_problemes TO brand_analyst;

-- ============================================================
-- VUE 3 — compatibilite_produits
-- Performance catalogue produits × profils
-- ============================================================
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
  pr.categorie,
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

-- ============================================================
-- VUE 4 — evolution_mensuelle
-- Tendances des scores de suivi (anonymisé par mois)
-- ============================================================
CREATE OR REPLACE VIEW evolution_mensuelle AS
SELECT
  DATE_TRUNC('month', mois)::DATE AS mois,
  COUNT(*)                        AS nb_suivis,
  ROUND(AVG(score_hydratation), 2) AS avg_score_hydratation,
  ROUND(AVG(score_brillance), 2)   AS avg_score_brillance,
  ROUND(AVG(score_casse), 2)       AS avg_score_casse
FROM suivis
GROUP BY DATE_TRUNC('month', mois)
HAVING COUNT(*) >= 3
ORDER BY DATE_TRUNC('month', mois);

GRANT SELECT ON evolution_mensuelle TO brand_analyst;
