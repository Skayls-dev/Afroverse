-- Migration 005: Différencier les sous-types 3A/3B/3C et 4A/4B/4C
-- Avant : étapes universelles identiques sur tous les types du même groupe
-- Après : chaque sous-type a un set distinct d'étapes

-- ── 1. Restreindre les étapes existantes ────────────────────────────────────

-- Démêlage : inutile pour 3A (boucles larges et souples, peu de noeuds)
UPDATE etapes_routines SET types_compatibles = ARRAY['3B','3C','4A','4B','4C']
WHERE slug = 'demelage';

-- Conditionnement profond : 3A et 3B ont besoin d'un après-shampoing léger, pas d'un masque
UPDATE etapes_routines SET types_compatibles = ARRAY['3C','4A','4B','4C']
WHERE slug = 'conditionnement-profond';

-- Scellage hydratation : davantage utile pour les textures denses et sèches
UPDATE etapes_routines SET types_compatibles = ARRAY['3C','4A','4B','4C']
WHERE slug = 'scellage-hydratation';

-- ── 2. Ajouter des étapes différenciatrices par sous-type ───────────────────

INSERT INTO etapes_routines (
  slug, titre, description, emoji, frequence, duree_minutes,
  quand, produits_types, accessoires, ordre_defaut,
  universelle, types_compatibles, premium
)
VALUES
-- 3A / 3B uniquement : rafraîchir les boucles larges entre deux lavages
(
  'refresh-boucles',
  'Refresh boucles',
  'Vaporise de l''eau tiède ou une brume capillaire sur les longueurs et réactive tes boucles avec un peu de gel ou de mousse légère. Idéal les jours sans lavage pour retrouver de la définition sans alourdir.',
  '💦',
  '2 à 3 fois par semaine',
  5,
  'Matin des jours sans lavage',
  'Brume capillaire, gel léger, mousse',
  'Spray vaporisateur',
  6,
  false,
  ARRAY['3A','3B'],
  false
),

-- 3A / 3B / 3C : lait coiffant léger pour définir sans alourdir
(
  'lait-coiffant-leger',
  'Lait coiffant léger',
  'Applique section par section sur cheveux humides un lait coiffant formulé pour boucles. Donne de la définition sans résidu lourd et évite les frisottis sur les types 3.',
  '🥛',
  'Chaque lavage',
  10,
  'Après le leave-in, avant le séchage',
  'Lait coiffant boucles, crème légère de coiffage',
  'Diffuseur (optionnel)',
  7,
  false,
  ARRAY['3A','3B','3C'],
  false
),

-- 4A uniquement : spray définiteur pour coils bien dessinés
(
  'spray-definiteur-coils',
  'Spray définiteur coils',
  'Utilise un spray riche en aloe vera ou en glycérine pour raviver tes coils 4A entre les lavages. Applique sur cheveux légèrement humides section par section et laisse sécher naturellement pour retrouver la définition.',
  '🌿',
  '2 fois par semaine',
  8,
  'Jours de refresh entre lavages',
  'Spray définiteur coils, gel aloe vera',
  'Spray vaporisateur',
  7,
  false,
  ARRAY['4A'],
  false
),

-- 4B / 4C : beurre scellant pour textures très denses
(
  'beurre-scellant-intensif',
  'Beurre scellant intensif',
  'Scelle l''hydratation avec un beurre nourrissant (karité, mangue) appliqué sur pointes et longueurs après ton leave-in. Essentiel pour retenir l''eau dans les textures très denses de type 4B et 4C.',
  '🧈',
  'Après chaque session d''hydratation',
  8,
  'Après le leave-in ou la crème de jour',
  'Beurre de karité, beurre de mangue, beurre de cacao',
  null,
  8,
  false,
  ARRAY['4B','4C'],
  false
),

-- 4C uniquement : bain d'huile pré-shampoing intensif
(
  'bain-huile-intensif',
  'Bain d''huile pré-shampoing intensif',
  'La veille ou 30 min avant le shampoing, applique généreusement une huile nourrissante (coco, olive, ricin) sur cheveux secs section par section. Pour les textures 4C très denses, c''est l''étape clé pour assouplir, démêler facilement et limiter la casse au lavage.',
  '🫙',
  'Chaque semaine',
  30,
  'Veille ou matin avant le lavage',
  'Huile de coco, huile d''olive, huile de ricin',
  'Bonnet chauffant (optionnel), clips sectionnement',
  2,
  false,
  ARRAY['4C'],
  false
)
ON CONFLICT (slug) DO NOTHING;
