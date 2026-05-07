-- Étapes universelles (tous types)
UPDATE etapes_routines SET types_compatibles = ARRAY['3A','3B','3C','4A','4B','4C']
WHERE slug IN ('lavage-doux', 'conditionnement-profond', 'demelage', 'hydratation', 'entretien-nocturne', 'taille-pointes');

-- Étapes plus spécifiques aux types crépus
UPDATE etapes_routines SET types_compatibles = ARRAY['4A','4B','4C']
WHERE slug IN ('traitement-avant-shampoing', 'coiffure-protectrice');

-- Scellage hydratation → tous types mais surtout faible porosité
UPDATE etapes_routines SET types_compatibles = ARRAY['3A','3B','3C','4A','4B','4C']
WHERE slug = 'scellage-hydratation';
