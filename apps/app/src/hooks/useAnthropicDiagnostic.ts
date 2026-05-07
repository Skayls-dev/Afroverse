import { useState } from 'react'
import { supabase } from '../lib/supabase'

export interface DiagnosticIAInput {
  forme: string
  epaisseur: string
  eau: string
  casse: string
  secheresse: string
  routine: string
  objectif?: string
}

export interface DiagnosticIAResult {
  profil: string
  observations_photo: string
  problemes: string[]
  priorite: string
  routine_lavage: string
  routine_hydratation: string
  routine_protection: string
  conseil_cle: string
}

interface AnthropicTextBlock {
  type: 'text'
  text: string
}

interface AnthropicResponse {
  content?: AnthropicTextBlock[]
  error?: { message?: string }
}

const SYSTEM_PROMPT =
  "Tu es un expert capillaire specialise dans les cheveux textures afro (boucles, frises, crepus). Analyse la photo ET le questionnaire pour generer un diagnostic structure. Reponds UNIQUEMENT en JSON valide sans balises markdown."

function toText(value: unknown): string {
  if (value == null) return ''
  if (typeof value === 'string') return value.trim()
  if (typeof value === 'number' || typeof value === 'boolean') return String(value)

  if (Array.isArray(value)) {
    return value.map((item) => toText(item)).filter(Boolean).join(', ')
  }

  if (typeof value === 'object') {
    return Object.entries(value as Record<string, unknown>)
      .map(([key, val]) => `${key}: ${toText(val)}`)
      .filter((line) => !line.endsWith(': '))
      .join(' | ')
  }

  return ''
}

function toStringArray(value: unknown): string[] {
  if (Array.isArray(value)) {
    return value.map((item) => toText(item)).filter(Boolean)
  }

  const one = toText(value)
  return one ? [one] : []
}

function pickText(source: Record<string, unknown>, keys: string[], fallback = ''): string {
  for (const key of keys) {
    const value = toText(source[key])
    if (value) {
      return value
    }
  }
  return fallback
}

function pickStringArray(source: Record<string, unknown>, keys: string[]): string[] {
  for (const key of keys) {
    const values = toStringArray(source[key])
    if (values.length > 0) {
      return values
    }
  }
  return []
}

function normalizeDiagnosticIAResult(raw: unknown): DiagnosticIAResult {
  const source = (raw && typeof raw === 'object') ? (raw as Record<string, unknown>) : {}

  return {
    profil: pickText(source, ['profil', 'type_profil'], 'Profil en cours d\'analyse'),
    observations_photo: pickText(source, ['observations_photo', 'observations', 'analyse_photo']),
    problemes: pickStringArray(source, ['problemes', 'problemes_identifies', 'points_attention']),
    priorite: pickText(source, ['priorite', 'priorite_absolue', 'urgence']),
    routine_lavage: pickText(source, ['routine_lavage', 'lavage']),
    routine_hydratation: pickText(source, ['routine_hydratation', 'hydratation']),
    routine_protection: pickText(source, ['routine_protection', 'protection']),
    conseil_cle: pickText(source, ['conseil_cle', 'conseil', 'conseil_principal']),
  }
}

function toFriendlyAnalyzeError(err: unknown): string {
  const raw = err instanceof Error ? err.message : String(err ?? '')
  const message = raw.toLowerCase()

  if (message.includes('session utilisateur introuvable') || message.includes('jwt') || message.includes('unauthorized')) {
    return 'Ta session a expire. Reconnecte-toi puis relance l\'analyse.'
  }

  if (message.includes('reponse ia vide') || message.includes('json')) {
    return 'La reponse IA est invalide. Reessaie dans quelques secondes.'
  }

  if (message.includes('anthropic') || message.includes('api')) {
    return 'Le service IA est temporairement indisponible. Reessaie un peu plus tard.'
  }

  return 'Impossible de lancer l\'analyse pour le moment. Merci de reessayer.'
}

function parseAnthropicJson(text: string): unknown {
  const raw = text.trim()

  try {
    return JSON.parse(raw)
  } catch {
    // Continue with fallback extraction.
  }

  const withoutFence = raw
    .replace(/^```json\s*/i, '')
    .replace(/^```\s*/i, '')
    .replace(/```$/i, '')
    .trim()

  try {
    return JSON.parse(withoutFence)
  } catch {
    // Continue with object range extraction.
  }

  const firstBrace = withoutFence.indexOf('{')
  const lastBrace = withoutFence.lastIndexOf('}')

  if (firstBrace >= 0 && lastBrace > firstBrace) {
    const jsonSlice = withoutFence.slice(firstBrace, lastBrace + 1)
    return JSON.parse(jsonSlice)
  }

  throw new Error('Reponse IA vide')
}

export function useAnthropicDiagnostic() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [result, setResult] = useState<DiagnosticIAResult | null>(null)

  async function analyze(imageBase64: string, questionnaire: DiagnosticIAInput): Promise<DiagnosticIAResult> {
    setLoading(true)
    setError(null)

    try {
      const { data: sessionData } = await supabase.auth.getSession()
      const accessToken = sessionData.session?.access_token

      if (!accessToken) {
        throw new Error('Session utilisateur introuvable')
      }

      const response = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/anthropic-proxy`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
          model: 'claude-sonnet-4-20250514',
          max_tokens: 1200,
          system: SYSTEM_PROMPT,
          messages: [
            {
              role: 'user',
              content: [
                {
                  type: 'image',
                  source: {
                    type: 'base64',
                    media_type: 'image/jpeg',
                    data: imageBase64,
                  },
                },
                {
                  type: 'text',
                  text: `Questionnaire utilisateur (JSON): ${JSON.stringify(questionnaire)}\n\nRetourne strictement un JSON valide avec les cles suivantes: profil, observations_photo, problemes (tableau), priorite, routine_lavage, routine_hydratation, routine_protection, conseil_cle.`,
                },
              ],
            },
          ],
        }),
      })

      const data = (await response.json()) as AnthropicResponse

      if (!response.ok) {
        throw new Error(data.error?.message || 'Erreur API Anthropic')
      }

      const text = data.content?.find((c) => c.type === 'text')?.text
      if (!text) {
        throw new Error('Reponse IA vide')
      }

      const parsed = parseAnthropicJson(text)
      const normalized = normalizeDiagnosticIAResult(parsed)
      setResult(normalized)
      return normalized
    } catch (err) {
      const message = toFriendlyAnalyzeError(err)
      setError(message)
      throw err
    } finally {
      setLoading(false)
    }
  }

  return { analyze, loading, error, result }
}
