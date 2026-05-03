-- Migration 002: champs scoring + vue analytique
-- Ajoute porosite_calculee et priorite_absolue à la table profils

ALTER TABLE profils
  ADD COLUMN IF NOT EXISTS porosite_calculee TEXT,
  ADD COLUMN IF NOT EXISTS priorite_absolue TEXT;

-- Vue analytique : distribution des priorités par type de cheveu
CREATE OR REPLACE VIEW analytics_priorites AS
SELECT
  type_cheveux,
  priorite_absolue,
  COUNT(*) AS nb_profils,
  ROUND(AVG(
    CASE
      WHEN porosite = 'haute' THEN 1
      WHEN porosite = 'normale' THEN 2
      ELSE 3
    END
  ), 2) AS porosite_index_moyen
FROM profils
WHERE priorite_absolue IS NOT NULL
  AND type_cheveux IS NOT NULL
GROUP BY type_cheveux, priorite_absolue
ORDER BY type_cheveux, nb_profils DESC;
