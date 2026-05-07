import { useState, useEffect } from 'react'
import Navbar from '../components/shared/Navbar'
import DiagnosticStepper from '../components/diagnostic/DiagnosticStepper'
import DiagnosticResultComponent from '../components/diagnostic/DiagnosticResult'
import DiagnosticIA from '../components/diagnostic/DiagnosticIA'
import ShareCard from '../components/diagnostic/ShareCard'
import { useDiagnosticStore } from '../store/diagnosticStore'
import { useAuth } from '../hooks/useAuth'
import { supabase } from '../lib/supabase'
import { useNavigate } from 'react-router-dom'
import { computeDiagnosticResult, type DiagnosticResult } from '../lib/scoring'

export default function Diagnostic() {
  const { data, step, reset } = useDiagnosticStore()
  const { user } = useAuth()
  const navigate = useNavigate()
  const TOTAL_STEPS = 6
  const [result, setResult] = useState<DiagnosticResult | null>(null)
  const [shareOpen, setShareOpen] = useState(false)
  const [mode, setMode] = useState<'select' | 'questionnaire' | 'ia'>('select')

  useEffect(() => {
    if (step >= TOTAL_STEPS && data.type_cheveux) {
      setResult(computeDiagnosticResult(data))
    }
  }, [step, data])

  const handleSubmit = async () => {
    if (!user || !result) return
    const { error } = await supabase.from('profils').upsert({
      id: user.id,
      email: user.email,
      ...data,
      porosite_calculee: data.porosite,
      priorite_absolue: result.prioriteAbsolue,
      updated_at: new Date().toISOString(),
    })
    if (!error) {
      reset()
      navigate('/recommandations')
    }
  }

  return (
    <div className="app-shell pb-20 md:pt-16">
      <div className="max-w-lg mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold text-[var(--color-text)] mb-6">Ton diagnostic capillaire</h1>
        {mode === 'select' ? (
          <div className="grid gap-3">
            <button
              type="button"
              onClick={() => setMode('questionnaire')}
              className="app-card w-full rounded-2xl p-4 text-left transition-colors hover:border-[var(--color-primary)]"
            >
              <p className="text-base font-semibold text-[var(--color-text)]">🧬 Diagnostic par questionnaire</p>
              <p className="mt-1 text-sm app-muted">15 questions · 5 minutes · Scoring expert</p>
            </button>
            <button
              type="button"
              onClick={() => setMode('ia')}
              className="app-card w-full rounded-2xl p-4 text-left transition-colors hover:border-[var(--color-primary)]"
            >
              <p className="text-base font-semibold text-[var(--color-text)]">📸 Diagnostic par photo + IA</p>
              <p className="mt-1 text-sm app-muted">Photo + 6 questions · 30 secondes · Analysé par Claude</p>
            </button>
          </div>
        ) : mode === 'questionnaire' && step < TOTAL_STEPS ? (
          <>
            <button
              type="button"
              onClick={() => setMode('select')}
              className="mb-3 text-sm app-muted hover:text-[var(--color-text)]"
            >
              ← Retour
            </button>
            <div className="rounded-2xl p-4 border border-[var(--color-border)] bg-[#1a1a1a]">
              <DiagnosticStepper />
            </div>
          </>
        ) : mode === 'questionnaire' && result ? (
          <DiagnosticResultComponent
            result={result}
            onShare={() => setShareOpen(true)}
            onViewRecommendations={handleSubmit}
          />
        ) : mode === 'ia' ? (
          <>
            <button
              type="button"
              onClick={() => setMode('select')}
              className="mb-3 text-sm app-muted hover:text-[var(--color-text)]"
            >
              ← Retour
            </button>
            <DiagnosticIA onComplete={() => navigate('/recommandations')} />
          </>
        ) : null}
      </div>
      <Navbar />
      {result && (
        <ShareCard
          result={result}
          isOpen={shareOpen}
          onClose={() => setShareOpen(false)}
        />
      )}
    </div>
  )
}
