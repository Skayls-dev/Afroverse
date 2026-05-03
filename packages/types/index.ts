export type TypeCheveux = '3A' | '3B' | '3C' | '4A' | '4B' | '4C'
export type Porosite = 'faible' | 'normale' | 'haute'
export type Elasticite = 'faible' | 'normale' | 'haute'
export type Densite = 'fine' | 'moyenne' | 'epaisse'

export interface Profil {
  id: string
  prenom: string
  email: string
  type_cheveux: TypeCheveux
  porosite: Porosite
  elasticite: Elasticite
  densite: Densite
  objectifs: string[]
  problemes: string[]
  created_at: string
  updated_at: string
}

export interface Suivi {
  id: string
  user_id: string
  mois: string
  photo_url?: string
  score_hydratation: number
  score_brillance: number
  score_casse: number
  notes?: string
  created_at: string
}

export interface Produit {
  id: string
  nom: string
  marque: string
  categorie: string
  types_compatibles: TypeCheveux[]
  porosites_compatibles: Porosite[]
  ingredients: string[]
  prix: number
}

export interface Recommandation {
  id: string
  user_id: string
  produit: Produit
  score_match: number
  raison: string
  created_at: string
}

export interface DiagnosticFormData {
  type_cheveux: TypeCheveux | null
  porosite: Porosite | null
  elasticite: Elasticite | null
  densite: Densite | null
  objectifs: string[]
  problemes: string[]
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
}

export interface MarqueB2B {
  id: string
  nom: string
  email_contact: string
  plan: 'basic' | 'pro' | 'enterprise'
  stripe_customer_id?: string
  actif: boolean
  created_at: string
}
