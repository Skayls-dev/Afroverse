import type { Elasticite } from '@afroverse/types'
import { useDiagnosticStore } from '../../store/diagnosticStore'

const options: { value: Elasticite; label: string; hint: string }[] = [
  { value: 'haute', label: "Il s'étire bien puis reprend sa forme", hint: 'Bonne élasticité' },
  { value: 'normale', label: "Il s'étire un peu puis casse", hint: 'Élasticité moyenne' },
  { value: 'faible', label: 'Il casse immédiatement', hint: 'Élasticité faible — fragile' },
]

export default function StepElasticite() {
  const { data, setData, nextStep, prevStep } = useDiagnosticStore()

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold text-white">
        Quand tu étires un cheveu mouillé, que se passe-t-il ?
      </h2>
      <div className="space-y-3">
        {options.map(({ value, label, hint }) => (
          <button
            key={value}
            onClick={() => { setData({ elasticite: value }); nextStep() }}
            className={`w-full p-4 rounded-xl border text-left transition-colors ${
              data.elasticite === value
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
