import type { Porosite } from '@alwaysafro/types'
import { useDiagnosticStore } from '../../store/diagnosticStore'

const porosites: { value: Porosite; label: string; desc: string }[] = [
  { value: 'faible', label: 'Faible', desc: 'Tes cheveux mettent longtemps à absorber l\'eau' },
  { value: 'normale', label: 'Normale', desc: 'Tes cheveux absorbent et retiennent bien l\'humidité' },
  { value: 'haute', label: 'Haute', desc: 'Tes cheveux absorbent vite mais perdent vite l\'humidité' },
]

export default function StepPorosite() {
  const { data, setData, nextStep, prevStep } = useDiagnosticStore()

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold text-white">Quelle est la porosité de tes cheveux ?</h2>
      <div className="space-y-3">
        {porosites.map(({ value, label, desc }) => (
          <button
            key={value}
            onClick={() => { setData({ porosite: value }); nextStep() }}
            className={`w-full p-4 rounded-xl border text-left transition-colors ${
              data.porosite === value
                ? 'border-[#1D9E75] bg-[#1D9E75]/10 text-white'
                : 'border-white/20 hover:border-[#1D9E75]/60 text-gray-300'
            }`}
          >
            <div className="font-semibold text-[#1D9E75]">{label}</div>
            <div className="text-sm mt-1">{desc}</div>
          </button>
        ))}
      </div>
      <button onClick={prevStep} className="text-gray-500 hover:text-gray-300 text-sm transition-colors">
        ← Retour
      </button>
    </div>
  )
}
