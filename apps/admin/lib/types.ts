export interface Produit {
  id: string
  nom: string
  marque: string | null
  categories: string[] | null
  photo_urls: string[] | null
  description: string | null
  types_compatibles: string[] | null
  porosites_compatibles: string[] | null
  elasticites_compatibles: string[] | null
  densites_compatibles: string[] | null
  problemes_cibles: string[] | null
  objectifs_cibles: string[] | null
  ingredients: string[] | null
  prix: number | null
  lien_achat: string | null
  created_at: string
}

export interface EtapeRoutine {
  id: string
  slug: string
  titre: string
  description: string
  emoji: string
  frequence: string
  duree_minutes: number | null
  quand: string | null
  produits_types: string | null
  accessoires: string | null
  ordre_defaut: number
  universelle: boolean
  types_compatibles: string[] | null
  porosites_cibles: string[] | null
  problemes_cibles: string[] | null
  nom_routine: string | null
  photo_url: string | null
  video_url: string | null
  premium: boolean
  created_at: string
  updated_at: string
}

export interface MarqueB2B {
  id: string
  nom: string
  email_contact: string | null
  plan: 'basic' | 'pro' | 'enterprise' | null
  stripe_customer_id: string | null
  actif: boolean
  message: string | null
  created_at: string
}

export interface CompatibiliteProduit {
  id: string
  nom: string
  marque: string | null
  categorie: string | null
  nb_profils_compatibles: number
  pct_base_totale: number
  porosite_cible_principale: string | null
}
