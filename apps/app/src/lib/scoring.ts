import type { DiagnosticFormData } from '@alwaysafro/types'

export interface ProblemeScore {
  id: string
  label: string
  score: number // 0-100
}

export interface RoutineItem {
  emoji: string
  title: string
  desc: string
  frequence: string
}

export interface DiagnosticResult {
  prioriteAbsolue: string
  scoreHydratation: number
  scoreProtection: number
  scoreCroissance: number
  top3Problemes: ProblemeScore[]
  routineDeBase: RoutineItem[]
  profilLabel: string
  shareText: string
}

const PROBLEME_LABELS: Record<string, string> = {
  secheresse: 'Sécheresse',
  casse: 'Casse & fragilité',
  chute: 'Chute',
  pousse_lente: 'Pousse lente',
  demangeaisons: 'Démangeaisons',
  definition: 'Définition des boucles',
}

function scoreHydratation(data: DiagnosticFormData): number {
  let score = 50
  if (data.porosite === 'haute') score += 30
  if (data.porosite === 'faible') score -= 10
  if (data.elasticite === 'faible') score += 20
  if (data.type_cheveux?.startsWith('4')) score += 10
  if (data.problemes.includes('secheresse')) score += 20
  return Math.min(100, Math.max(0, score))
}

function scoreProtection(data: DiagnosticFormData): number {
  let score = 50
  if (data.elasticite === 'faible') score += 30
  if (data.densite === 'fine') score += 20
  if (data.porosite === 'haute') score += 10
  if (data.problemes.includes('casse')) score += 20
  return Math.min(100, Math.max(0, score))
}

function scoreCroissance(data: DiagnosticFormData): number {
  let score = 40
  if (data.problemes.includes('pousse_lente')) score += 35
  if (data.problemes.includes('chute')) score += 25
  if (data.objectifs.some((o) => o.toLowerCase().includes('croissance'))) score += 20
  return Math.min(100, Math.max(0, score))
}

function computeTop3Problemes(data: DiagnosticFormData): ProblemeScore[] {
  const scores: Record<string, number> = {
    secheresse: 0,
    casse: 0,
    chute: 0,
    pousse_lente: 0,
    demangeaisons: 0,
    definition: 0,
  }

  // Boost via problèmes déclarés
  data.problemes.forEach((p) => {
    if (p in scores) scores[p] += 60
  })

  // Infer from profile
  if (data.porosite === 'haute') { scores.secheresse += 25; scores.casse += 15 }
  if (data.porosite === 'faible') { scores.definition += 20 }
  if (data.elasticite === 'faible') { scores.casse += 30 }
  if (data.densite === 'fine') { scores.casse += 15; scores.chute += 20 }
  if (data.type_cheveux?.startsWith('4')) { scores.secheresse += 20; scores.definition += 15 }

  return Object.entries(scores)
    .map(([id, score]) => ({ id, label: PROBLEME_LABELS[id] ?? id, score: Math.min(100, score) }))
    .sort((a, b) => b.score - a.score)
    .slice(0, 3)
}

function computeRoutine(data: DiagnosticFormData): RoutineItem[] {
  const routine: RoutineItem[] = []

  // Co-wash or shampoo depending on porosity
  if (data.porosite === 'haute') {
    routine.push({
      emoji: '💧',
      title: 'Co-wash doux',
      desc: 'Nettoyage sans sulfates pour préserver le liant naturel',
      frequence: '1x / semaine',
    })
  } else {
    routine.push({
      emoji: '🧴',
      title: 'Shampoing sans sulfates',
      desc: 'Nettoyage en douceur du cuir chevelu',
      frequence: '1x / semaine',
    })
  }

  // Deep conditioning
  routine.push({
    emoji: '🌿',
    title: 'Masque hydratant profond',
    desc: data.porosite === 'faible'
      ? 'Masque chauffant pour ouvrir les écailles et laisser entrer l\'humidité'
      : 'Masque protéiné pour refermer les écailles et réduire la casse',
    frequence: '1x / semaine',
  })

  // LOC or LCO method
  if (data.porosite === 'faible' || data.porosite === 'normale') {
    routine.push({
      emoji: '✨',
      title: 'Méthode LCO',
      desc: 'Leave-in → Crème → Huile pour sceller l\'humidité',
      frequence: 'Après chaque lavage',
    })
  } else {
    routine.push({
      emoji: '✨',
      title: 'Méthode LOC',
      desc: 'Leave-in → Huile → Crème pour une hydratation maximale',
      frequence: 'Après chaque lavage',
    })
  }

  // Protective styling
  if (data.elasticite === 'faible' || data.densite === 'fine') {
    routine.push({
      emoji: '🧡',
      title: 'Coiffures protectrices',
      desc: 'Réduis les manipulations pour limiter la casse',
      frequence: 'En rotation',
    })
  }

  return routine
}

function computePriorite(data: DiagnosticFormData): string {
  if (data.problemes.includes('casse') || data.elasticite === 'faible') {
    return 'Renforcement & protection contre la casse'
  }
  if (data.problemes.includes('secheresse') || data.porosite === 'haute') {
    return 'Hydratation profonde et rétention de l\'humidité'
  }
  if (data.problemes.includes('pousse_lente') || data.problemes.includes('chute')) {
    return 'Stimulation de la croissance et santé du cuir chevelu'
  }
  return 'Hydratation et définition des boucles'
}

function computeProfilLabel(data: DiagnosticFormData): string {
  const type = data.type_cheveux ?? '?'
  const porLabel = data.porosite === 'haute' ? 'haute porosité' : data.porosite === 'faible' ? 'faible porosité' : 'porosité normale'
  return `Cheveux ${type} · ${porLabel}`
}

export function computeDiagnosticResult(data: DiagnosticFormData): DiagnosticResult {
  const top3 = computeTop3Problemes(data)
  const hydratation = scoreHydratation(data)
  const protection = scoreProtection(data)
  const croissance = scoreCroissance(data)
  const priorite = computePriorite(data)
  const profil = computeProfilLabel(data)

  const shareText = `🌿 Mon profil AlwaysAfro : ${profil}\nPriorité : ${priorite}\nDécouvre ta routine sur alwaysafro.app`

  return {
    prioriteAbsolue: priorite,
    scoreHydratation: hydratation,
    scoreProtection: protection,
    scoreCroissance: croissance,
    top3Problemes: top3,
    routineDeBase: computeRoutine(data),
    profilLabel: profil,
    shareText,
  }
}
