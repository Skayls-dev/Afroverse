import { useMemo, useState } from 'react'
import { supabase } from '../../lib/supabase'
import { useAuth } from '../../hooks/useAuth'
import {
  useAnthropicDiagnostic,
  type DiagnosticIAInput,
  type DiagnosticIAResult,
} from '../../hooks/useAnthropicDiagnostic'
import { useDiagnosticStore } from '../../store/diagnosticStore'
import PhotoCapture from './PhotoCapture'
import DiagnosticIAResultView from './DiagnosticIAResult'

interface DiagnosticIAProps {
  onComplete?: (result: DiagnosticIAResult) => void
}

type Step = 1 | 2 | 3

type QAOption = {
  key: keyof DiagnosticIAInput
  label: string
  options: string[]
}

const QUESTIONS: QAOption[] = [
  { key: 'forme', label: 'Forme naturelle de tes cheveux', options: ['Boucles', 'Frises', 'Crepus', 'Je ne sais pas'] },
  { key: 'epaisseur', label: 'Epaisseur du cheveu', options: ['Fin', 'Normal', 'Epais'] },
  { key: 'eau', label: 'Quand tu mouilles tes cheveux, l\'eau...', options: ['Penetre tres vite', 'Met du temps', 'Reste en surface'] },
  { key: 'casse', label: 'Tes cheveux cassent-ils facilement ?', options: ['Oui beaucoup', 'Un peu', 'Rarement'] },
  { key: 'secheresse', label: 'Tes cheveux sont-ils souvent secs ?', options: ['Tres souvent', 'Parfois', 'Rarement'] },
  { key: 'routine', label: 'As-tu une routine capillaire reguliere ?', options: ['Oui reguliere', 'Pas toujours', 'Non'] },
]

function toFriendlySaveError(err: unknown): string {
  const raw = err instanceof Error ? err.message : String(err ?? '')
  const message = raw.toLowerCase()

  if (message.includes('row-level security') || message.includes('violates')) {
    return 'Tu n\'as pas les droits pour enregistrer cette analyse. Reconnecte-toi puis reessaie.'
  }

  if (message.includes('storage') || message.includes('diagnostics-photos') || message.includes('400')) {
    return 'La photo n\'a pas pu etre enregistree. Choisis une autre photo puis reessaie.'
  }

  if (message.includes('network') || message.includes('fetch')) {
    return 'Connexion instable. Verifie internet puis relance l\'analyse.'
  }

  return 'L\'analyse est calculee mais l\'enregistrement a echoue. Reessaie dans un instant.'
}

export default function DiagnosticIA({ onComplete }: DiagnosticIAProps) {
  const { user } = useAuth()
  const { analyze, loading, error, result } = useAnthropicDiagnostic()
  const { setIaPhoto, setIaQuestionnaire, setIaResult, resetIa } = useDiagnosticStore()

  const [step, setStep] = useState<Step>(1)
  const [imageBase64, setImageBase64] = useState<string | null>(null)
  const [photoFile, setPhotoFile] = useState<File | null>(null)
  const [photoUrl, setPhotoUrl] = useState<string | undefined>(undefined)
  const [saveError, setSaveError] = useState<string | null>(null)

  const [questionnaire, setQuestionnaire] = useState<DiagnosticIAInput>({
    forme: '',
    epaisseur: '',
    eau: '',
    casse: '',
    secheresse: '',
    routine: '',
    objectif: '',
  })

  const answeredCount = useMemo(() => {
    let count = 0
    if (questionnaire.forme) count += 1
    if (questionnaire.epaisseur) count += 1
    if (questionnaire.eau) count += 1
    if (questionnaire.casse) count += 1
    if (questionnaire.secheresse) count += 1
    if (questionnaire.routine) count += 1
    return count
  }, [questionnaire])

  const canAnalyze = Boolean(imageBase64) && answeredCount >= 4 && !loading

  async function uploadAndPersist(resultData: DiagnosticIAResult) {
    if (!user || !photoFile) return

    const path = `${user.id}/${Date.now()}.jpg`

    const { error: uploadError } = await supabase.storage
      .from('diagnostics-photos')
      .upload(path, photoFile, { upsert: true })

    if (uploadError) {
      throw uploadError
    }

    const { data: publicData } = supabase.storage
      .from('diagnostics-photos')
      .getPublicUrl(path)

    const publicUrl = publicData.publicUrl
    setPhotoUrl(publicUrl)

    const { error: updateError } = await supabase
      .from('profils')
      .upsert({
        id: user.id,
        email: user.email,
        photo_diagnostic_url: publicUrl,
        diagnostic_ia: resultData,
        diagnostic_ia_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      })

    if (updateError) {
      throw updateError
    }
  }

  async function handleAnalyze() {
    if (!imageBase64 || !canAnalyze) return

    setSaveError(null)
    let resultData: DiagnosticIAResult

    try {
      setIaQuestionnaire(questionnaire)
      resultData = await analyze(imageBase64, questionnaire)
      setIaResult(resultData)
    } catch (err) {
      // Analysis errors are already surfaced by useAnthropicDiagnostic via `error`.
      console.error('Analyse IA echouee:', err)
      return
    }

    try {
      await uploadAndPersist(resultData)
      setStep(3)
    } catch (err) {
      const message = toFriendlySaveError(err)
      setSaveError(message)
    }
  }

  return (
    <div className="space-y-4">
      <div className="app-card p-4">
        <div className="mb-2 flex items-center justify-between text-xs app-muted">
          <span>Etape {step} / 3</span>
          <span>{step === 1 ? 'Photo' : step === 2 ? 'Questionnaire' : 'Resultat'}</span>
        </div>
        <div className="grid grid-cols-3 gap-2">
          {[1, 2, 3].map((n) => (
            <div
              key={n}
              className={`h-1.5 rounded-full ${step >= n ? 'bg-[var(--color-primary)]' : 'bg-[var(--color-border)]'}`}
            />
          ))}
        </div>
      </div>

      {step === 1 ? (
        <div className="app-card space-y-4 p-4">
          <h2 className="text-lg font-semibold text-[var(--color-text)]">Ajoute une photo de tes cheveux</h2>
          <PhotoCapture
            onPhotoSelected={(base64, file) => {
              setImageBase64(base64)
              setPhotoFile(file)
              setIaPhoto(base64, file)
            }}
            onReset={() => {
              setImageBase64(null)
              setPhotoFile(null)
              resetIa()
            }}
          />
          <div className="flex justify-end">
            <button
              type="button"
              onClick={() => setStep(2)}
              disabled={!imageBase64}
              className="app-btn-primary rounded-xl px-4 py-2 text-sm font-semibold disabled:opacity-50"
            >
              Continuer →
            </button>
          </div>
        </div>
      ) : null}

      {step === 2 ? (
        <div className="app-card space-y-5 p-4">
          <h2 className="text-lg font-semibold text-[var(--color-text)]">Questionnaire rapide</h2>

          {QUESTIONS.map((q) => (
            <div key={q.key}>
              <p className="mb-2 text-sm font-medium text-[var(--color-text)]">{q.label}</p>
              <div className="flex flex-wrap gap-2">
                {q.options.map((opt) => {
                  const selected = questionnaire[q.key] === opt
                  return (
                    <button
                      key={opt}
                      type="button"
                      onClick={() => setQuestionnaire((s) => ({ ...s, [q.key]: opt }))}
                      className={`rounded-full border px-3 py-1.5 text-xs transition-colors ${
                        selected
                          ? 'border-[var(--color-primary)] bg-[var(--color-primary)]/15 text-[var(--color-primary)]'
                          : 'border-[var(--color-border)] text-[var(--color-text)] hover:border-[var(--color-primary)]/60'
                      }`}
                    >
                      {opt}
                    </button>
                  )
                })}
              </div>
            </div>
          ))}

          <div>
            <p className="mb-1 text-sm font-medium text-[var(--color-text)]">Objectif principal (optionnel)</p>
            <textarea
              rows={3}
              value={questionnaire.objectif || ''}
              onChange={(e) => setQuestionnaire((s) => ({ ...s, objectif: e.target.value }))}
              className="w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-bg)] px-3 py-2 text-sm text-[var(--color-text)] focus:outline-none focus:border-[var(--color-primary)]"
              placeholder="Ex: plus de definition et moins de casse"
            />
          </div>

          {loading ? <p className="text-sm text-[var(--color-secondary)]">L'IA examine tes cheveux...</p> : null}
          {error ? <p className="text-sm text-red-600">{error}</p> : null}
          {saveError ? <p className="text-sm text-red-600">{saveError}</p> : null}

          <div className="flex flex-wrap items-center justify-between gap-2">
            <button
              type="button"
              onClick={() => setStep(1)}
              className="rounded-xl border border-[var(--color-border)] px-3 py-2 text-sm text-[var(--color-text)]"
            >
              ← Retour photo
            </button>
            <button
              type="button"
              disabled={!canAnalyze}
              onClick={() => {
                void handleAnalyze()
              }}
              className="app-btn-primary rounded-xl px-4 py-2 text-sm font-semibold disabled:opacity-50"
            >
              Analyser maintenant
            </button>
          </div>
          <p className="text-xs app-muted">Photo requise + minimum 4 questions repondues.</p>
        </div>
      ) : null}

      {step === 3 && result ? (
        <DiagnosticIAResultView
          result={result}
          photoUrl={photoUrl}
          onViewRecommendations={() => onComplete?.(result)}
          onShare={() => {
            // Placeholder: partage natif a brancher plus tard
          }}
        />
      ) : null}
    </div>
  )
}
