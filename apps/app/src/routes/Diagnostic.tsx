import { useState, useEffect } from 'react'
import Navbar from '../components/shared/Navbar'
import DiagnosticStepper from '../components/diagnostic/DiagnosticStepper'
import DiagnosticResultComponent from '../components/diagnostic/DiagnosticResult'
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
    <div className="min-h-screen bg-[#0f0f0f] pb-20 md:pt-16">
      <div className="max-w-lg mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold text-white mb-6">Ton diagnostic capillaire</h1>
        {step < TOTAL_STEPS ? (
          <DiagnosticStepper />
        ) : result ? (
          <DiagnosticResultComponent
            result={result}
            onShare={() => setShareOpen(true)}
            onViewRecommendations={handleSubmit}
          />
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
