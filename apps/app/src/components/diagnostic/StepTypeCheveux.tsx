import type { TypeCheveux } from '@alwaysafro/types'
import { useDiagnosticStore } from '../../store/diagnosticStore'

const types: { value: TypeCheveux; label: string; desc: string; image?: string }[] = [
  { value: '3A', label: '3A', desc: 'Boucles larges et définies', image: '/hair3a.png' },
  { value: '3B', label: '3B', desc: 'Boucles serrées en spirale', image: '/hair3b.png' },
  { value: '3C', label: '3C', desc: 'Boucles très serrées', image: '/hair3c.png' },
  { value: '4A', label: '4A', desc: 'Coils définis en S', image: '/hair4a.png' },
  { value: '4B', label: '4B', desc: 'Coils en Z, peu de courbe visible', image: '/hair4b.png' },
  { value: '4C', label: '4C', desc: 'Coils très serrés, pas de courbe définie', image: '/hair4c.png' },
]

export default function StepTypeCheveux() {
  const { data, setData, nextStep } = useDiagnosticStore()

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold text-white">Quel est ton type de cheveux ?</h2>
      <div className="grid grid-cols-2 gap-3">
        {types.map(({ value, label, desc, image }) => (
          <button
            key={value}
            onClick={() => { setData({ type_cheveux: value }); nextStep() }}
            className={`p-4 rounded-xl border text-left transition-colors ${
              data.type_cheveux === value
                ? 'border-[#1D9E75] bg-[#1D9E75]/10 text-white'
                : 'border-white/20 hover:border-[#1D9E75]/60 text-gray-300'
            }`}
          >
            {image && (
              <img
                src={image}
                alt={`Exemple cheveux ${label}`}
                className="mb-3 h-32 w-full rounded-lg object-cover object-center"
                loading="lazy"
              />
            )}
            <div className="text-xl font-bold text-[#1D9E75]">{label}</div>
            <div className="text-sm mt-1">{desc}</div>
          </button>
        ))}
      </div>
    </div>
  )
}
