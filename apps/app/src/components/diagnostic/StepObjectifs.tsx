import { useDiagnosticStore } from '../../store/diagnosticStore'

const objectifsDisponibles = [
  'Hydrater mes cheveux',
  'Réduire la casse',
  'Définir mes boucles',
  'Favoriser la croissance',
  'Réduire les frisottis',
  'Nourrir en profondeur',
  'Allonger ma routine',
  'Simplifier ma routine',
]

export default function StepObjectifs() {
  const { data, setData, nextStep, prevStep } = useDiagnosticStore()

  const toggle = (obj: string) => {
    const current = data.objectifs
    const updated = current.includes(obj)
      ? current.filter((o) => o !== obj)
      : [...current, obj]
    setData({ objectifs: updated })
  }

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold text-white">Quels sont tes objectifs ?</h2>
      <p className="text-gray-400 text-sm">Sélectionne jusqu&apos;à 3 objectifs</p>
      <div className="grid grid-cols-2 gap-2">
        {objectifsDisponibles.map((obj) => {
          const selected = data.objectifs.includes(obj)
          const maxReached = data.objectifs.length >= 3 && !selected
          return (
            <button
              key={obj}
              onClick={() => !maxReached && toggle(obj)}
              disabled={maxReached}
              className={`p-3 rounded-xl border text-sm text-left transition-colors ${
                selected
                  ? 'border-[#534AB7] bg-[#534AB7]/20 text-white'
                  : maxReached
                  ? 'border-white/10 text-gray-600 cursor-not-allowed'
                  : 'border-white/20 hover:border-[#534AB7]/60 text-gray-300'
              }`}
            >
              {obj}
            </button>
          )
        })}
      </div>
      <div className="flex gap-3 pt-2">
        <button onClick={prevStep} className="text-gray-500 hover:text-gray-300 text-sm transition-colors">
          ← Retour
        </button>
        <button
          onClick={nextStep}
          disabled={data.objectifs.length === 0}
          className="ml-auto bg-[#534AB7] hover:bg-[#4338ca] disabled:opacity-40 text-white font-semibold py-2 px-6 rounded-full transition-colors"
        >
          Suivant →
        </button>
      </div>
    </div>
  )
}
