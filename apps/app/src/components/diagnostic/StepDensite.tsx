import type { Densite } from '@alwaysafro/types'
import { useDiagnosticStore } from '../../store/diagnosticStore'

const options: { value: Densite; label: string; hint: string }[] = [
  { value: 'epaisse', label: 'Épais — bien visible entre mes doigts', hint: 'Cheveu dense' },
  { value: 'moyenne', label: 'Moyen — perceptible mais fin', hint: 'Densité normale' },
  { value: 'fine', label: 'Fin — à peine perceptible', hint: 'Cheveu très fin' },
]

export default function StepDensite() {
  const { data, setData, nextStep, prevStep } = useDiagnosticStore()

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold text-white">
        Quelle est l&apos;épaisseur de chacun de tes cheveux ?
      </h2>
      <div className="space-y-3">
        {options.map(({ value, label, hint }) => (
          <button
            key={value}
            onClick={() => { setData({ densite: value }); nextStep() }}
            className={`w-full p-4 rounded-xl border text-left transition-colors ${
              data.densite === value
                ? 'border-[#1D9E75] bg-[#1D9E75]/10 text-white'
                : 'border-white/20 hover:border-[#1D9E75]/60 text-gray-300'
            }`}
          >
            <div className="font-semibold text-white">{label}</div>
            <div className="text-sm mt-1 text-[#1D9E75]">{hint}</div>
          </button>
        ))}
      </div>
      <button onClick={prevStep} className="text-gray-500 hover:text-gray-300 text-sm transition-colors">
        ← Retour
      </button>
    </div>
  )
}
