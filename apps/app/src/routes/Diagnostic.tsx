import Navbar from '../components/shared/Navbar'
import DiagnosticStepper from '../components/diagnostic/DiagnosticStepper'
import { useDiagnosticStore } from '../store/diagnosticStore'
import { useAuth } from '../hooks/useAuth'
import { supabase } from '../lib/supabase'
import { useNavigate } from 'react-router-dom'

export default function Diagnostic() {
  const { data, step, reset } = useDiagnosticStore()
  const { user } = useAuth()
  const navigate = useNavigate()
  const TOTAL_STEPS = 3 // TODO: augmenter à 6 une fois tous les steps implémentés

  const handleSubmit = async () => {
    if (!user) return
    const { error } = await supabase.from('profils').upsert({
      id: user.id,
      email: user.email,
      ...data,
      updated_at: new Date().toISOString(),
    })
    if (!error) {
      reset()
      navigate('/recommandations')
    }
    // TODO: gérer l'erreur UI
  }

  return (
    <div className="min-h-screen bg-[#0f0f0f] pb-20 md:pt-16">
      <div className="max-w-lg mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold text-white mb-6">Ton diagnostic capillaire</h1>
        {step < TOTAL_STEPS ? (
          <DiagnosticStepper />
        ) : (
          <div className="text-center space-y-4">
            <p className="text-[#1D9E75] text-xl font-semibold">Diagnostic complété ! ✓</p>
            <button
              onClick={handleSubmit}
              className="bg-[#1D9E75] hover:bg-[#178864] text-white font-semibold py-3 px-8 rounded-full transition-colors"
            >
              Voir mes recommandations
            </button>
          </div>
        )}
      </div>
      <Navbar />
    </div>
  )
}
