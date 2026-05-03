import { useState } from 'react'
import { useDiagnosticStore } from '../../store/diagnosticStore'

const problemesDisponibles = [
  { value: 'secheresse', label: 'Sécheresse persistante' },
  { value: 'casse', label: 'Casse et fragilité' },
  { value: 'chute', label: 'Chute de cheveux' },
  { value: 'pousse_lente', label: 'Pousse lente' },
  { value: 'demangeaisons', label: 'Démangeaisons du cuir chevelu' },
  { value: 'definition', label: 'Manque de définition des boucles' },
]

export default function StepProblemes() {
  const { setData, nextStep, prevStep } = useDiagnosticStore()
  const [selected, setSelected] = useState<string[]>([])

  const toggle = (value: string) => {
    setSelected((prev) =>
      prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]
    )
  }

  const handleValidate = () => {
    setData({ problemes: selected })
    nextStep()
  }

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold text-white">
        Quels problèmes ressens-tu le plus ?
      </h2>
      <p className="text-gray-400 text-sm">Plusieurs choix possibles</p>
      <div className="space-y-3">
        {problemesDisponibles.map(({ value, label }) => {
          const isSelected = selected.includes(value)
          return (
            <button
              key={value}
              onClick={() => toggle(value)}
              className={`w-full p-4 rounded-xl border text-left transition-all cursor-pointer ${
                isSelected
                  ? 'border-[#1D9E75] bg-[#1D9E75]/10 text-[#1D9E75]'
                  : 'border-white/10 text-white/80 hover:border-[#1D9E75]/60'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className={`w-5 h-5 rounded border-2 flex items-center justify-center flex-shrink-0 ${
                  isSelected ? 'border-[#1D9E75] bg-[#1D9E75]' : 'border-white/30'
                }`}>
                  {isSelected && (
                    <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                </div>
                <span className="font-medium">{label}</span>
              </div>
            </button>
          )
        })}
      </div>
      <button
        onClick={handleValidate}
        disabled={selected.length === 0}
        className="w-full bg-[#1D9E75] hover:bg-[#178864] disabled:opacity-40 disabled:cursor-not-allowed text-white font-semibold py-3 px-8 rounded-full transition-colors"
      >
        Valider mes problèmes →
      </button>
      <button onClick={prevStep} className="text-gray-500 hover:text-gray-300 text-sm transition-colors">
        ← Retour
      </button>
    </div>
  )
}
