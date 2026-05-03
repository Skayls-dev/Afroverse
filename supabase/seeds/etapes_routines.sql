-- Seed: 9 étapes de routine capillaire
-- Source: ST Cosmetics — "Votre Guide de Routine Capillaire"
-- Idempotent via ON CONFLICT (slug) DO NOTHING

INSERT INTO etapes_routines (
  slug, titre, description, emoji, frequence,
  duree_minutes, quand, produits_types, accessoires,
  ordre_defaut, universelle, types_compatibles, porosites_cibles, problemes_cibles
) VALUES

(
  'traitement-avant-shampoing',
  'Traitement avant-shampoing',
  'Appliquez une huile nourrissante (comme l''huile de coco ou d''olive) ou un conditionneur sur les racines des cheveux secs. Laisser agir au moins 30 minutes. Cela aide à réduire les cassures, démêler les cheveux et à les protéger durant le lavage.',
  '🫙',
  '1x/semaine (avant chaque shampoing)',
  35,
  'Avant chaque shampoing',
  'Huiles naturelles (coco, olive, jojoba), conditionneurs sans rinçage',
  'Bonnet en plastique ou serviette chaude, casque chauffant',
  1,
  false,
  NULL,
  ARRAY['haute','normale']::TEXT[],
  ARRAY['secheresse','casse']::TEXT[]
),

(
  'lavage-doux',
  'Lavage doux',
  'Nettoyez le cuir chevelu et les cheveux avec un shampoing doux sans sulfate. Les sulfates peuvent dessécher les cheveux afro qui ont besoin de conserver leur hydratation naturelle.',
  '🚿',
  '1x/semaine',
  15,
  'Après le traitement avant-shampoing',
  'Shampoing doux sans sulfate',
  NULL,
  2,
  true,
  NULL,
  NULL,
  NULL
),

(
  'conditionnement-profond',
  'Conditionnement profond',
  'Après le shampoing, appliquez un conditionneur profond. Couvrez vos cheveux avec un bonnet en plastique et laissez agir sous une source de chaleur douce pendant 15-30 minutes. Nourrit et hydrate en profondeur.',
  '🌿',
  'À chaque lavage',
  25,
  'Immédiatement après le shampoing',
  'Conditionneur profond hydratant, masques capillaires',
  'Bonnet chauffant, bonnet en plastique, serviette chaude',
  3,
  true,
  NULL,
  NULL,
  ARRAY['secheresse','casse']::TEXT[]
),

(
  'demelage',
  'Démêlage',
  'Démêlez vos cheveux en douceur avec un peigne à dents larges ou une brosse démêlante, en commençant par les pointes et en remontant vers les racines pour éviter la casse.',
  '🪮',
  'À chaque lavage, et selon les besoins entre les lavages',
  15,
  'Après le conditionnement profond, avant de rincer',
  'Après-shampoing avec de bons agents démêlants',
  'Peigne à dents larges ou brosse démêlante',
  4,
  true,
  NULL,
  NULL,
  ARRAY['casse','definition']::TEXT[]
),

(
  'hydratation',
  'Hydratation',
  'Hydratez vos cheveux avec un lait capillaire ou une crème hydratante. Assurez-vous que le produit pénètre bien dans les mèches. L''application doit être minutieuse.',
  '💧',
  'À chaque lavage, et au besoin répétez entre les lavages (tous les 2-3 jours)',
  10,
  'Après le démêlage',
  'Lait capillaire, crème hydratante, sprays hydratants',
  'Vaporisateur si vous utilisez un spray',
  5,
  true,
  NULL,
  NULL,
  ARRAY['secheresse']::TEXT[]
),

(
  'scellage-hydratation',
  'Scellage de l''hydratation',
  'Utilisez une huile ou un beurre (comme le beurre de karité) pour sceller l''hydratation dans vos cheveux. Application simple de 5 minutes sur les cheveux hydratés.',
  '✨',
  'À chaque fois que vous hydratez vos cheveux',
  5,
  'Juste après l''hydratation',
  'Huiles naturelles (ricin, jojoba), beurres (karité, mangue)',
  NULL,
  6,
  false,
  NULL,
  ARRAY['haute','normale']::TEXT[],
  ARRAY['secheresse']::TEXT[]
),

(
  'coiffure-protectrice',
  'Coiffure protectrice',
  'Optez pour des coiffures qui protègent les pointes de vos cheveux et réduisent la manipulation, comme les tresses ou les twists. Changez de coiffure toutes les 2 à 4 semaines pour éviter la tension sur les mêmes zones.',
  '🧡',
  'Selon vos préférences, changement toutes les 2-4 semaines',
  NULL,
  'Après avoir complété les étapes de soin',
  'Produits de styling selon la coiffure choisie',
  'Élastiques, pinces, foulards, bonnets de soie',
  7,
  false,
  NULL,
  NULL,
  ARRAY['casse','pousse_lente']::TEXT[]
),

(
  'entretien-nocturne',
  'Entretien nocturne',
  'Protégez vos cheveux la nuit avec un bonnet en satin ou une taie d''oreiller en soie pour réduire la casse et maintenir l''hydratation. Tous les soirs, moins de 5 minutes.',
  '🌙',
  'Tous les soirs',
  3,
  'Chaque nuit',
  NULL,
  'Bonnet en satin ou taie d''oreiller en soie',
  8,
  true,
  NULL,
  NULL,
  NULL
),

(
  'taille-pointes',
  'Taille régulière des pointes',
  'Coupez régulièrement les pointes abîmées pour favoriser une croissance saine des cheveux. L''accent est mis sur l''élimination des fourches pour maintenir des cheveux sains et forts.',
  '✂️',
  'Tous les 3 à 4 mois, ou dès que vous remarquez des fourches',
  12,
  'Selon le besoin',
  NULL,
  'Ciseaux de coiffure pour une coupe précise',
  9,
  true,
  NULL,
  NULL,
  ARRAY['casse','pousse_lente']::TEXT[]
)

ON CONFLICT (slug) DO NOTHING;
