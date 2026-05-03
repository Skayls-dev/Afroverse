import type { TypeCheveux } from '@afroverse/types'
import { useDiagnosticStore } from '../../store/diagnosticStore'

const types: { value: TypeCheveux; label: string; desc: string }[] = [
  { value: '3A', label: '3A', desc: 'Boucles larges et définies' },
  { value: '3B', label: '3B', desc: 'Boucles serrées en spirale' },
  { value: '3C', label: '3C', desc: 'Boucles très serrées' },
  { value: '4A', label: '4A', desc: 'Coils définis en S' },
  { value: '4B', label: '4B', desc: 'Coils en Z, peu de courbe visible' },
  { value: '4C', label: '4C', desc: 'Coils très serrés, pas de courbe définie' },
]

export default function StepTypeCheveux() {
  const { data, setData, nextStep } = useDiagnosticStore()

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold text-white">Quel est ton type de cheveux ?</h2>
      <div className="grid grid-cols-2 gap-3">
        {types.map(({ value, label, desc }) => (
          <button
            key={value}
            onClick={() => { setData({ type_cheveux: value }); nextStep() }}
            className={`p-4 rounded-xl border text-left transition-colors ${
              data.type_cheveux === value
                ? 'border-[#1D9E75] bg-[#1D9E75]/10 text-white'
                : 'border-white/20 hover:border-[#1D9E75]/60 text-gray-300'
            }`}
          >
            <div className="text-xl font-bold text-[#1D9E75]">{label}</div>
            <div className="text-sm mt-1">{desc}</div>
          </button>
        ))}
      </div>
    </div>
  )
}
