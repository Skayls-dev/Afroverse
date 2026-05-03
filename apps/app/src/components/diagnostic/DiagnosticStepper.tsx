import { useDiagnosticStore } from '../../store/diagnosticStore'
import StepTypeCheveux from './StepTypeCheveux'
import StepPorosite from './StepPorosite'
import StepObjectifs from './StepObjectifs'
import StepElasticite from './StepElasticite'
import StepDensite from './StepDensite'
import StepProblemes from './StepProblemes'

const STEPS = ['Type', 'Porosité', 'Élasticité', 'Densité', 'Objectifs', 'Problèmes']

export default function DiagnosticStepper() {
  const { step } = useDiagnosticStore()

  return (
    <div className="w-full max-w-lg mx-auto">
      {/* Progress dots */}
      <div className="mb-6">
        <div className="flex justify-center gap-2 mb-2">
          {STEPS.map((_, i) => (
            <div
              key={i}
              className={`w-2 h-2 rounded-full transition-all ${
                i < step ? 'bg-[#1D9E75]' : i === step ? 'bg-[#1D9E75] scale-125' : 'bg-white/20'
              }`}
            />
          ))}
        </div>
        <p className="text-center text-xs text-gray-500">Étape {step + 1} / {STEPS.length}</p>
        <div className="mt-2 h-1 bg-white/10 rounded-full">
          <div
            className="h-1 bg-[#1D9E75] rounded-full transition-all"
            style={{ width: `${((step + 1) / STEPS.length) * 100}%` }}
          />
        </div>
      </div>

      {/* Steps */}
      {step === 0 && <StepTypeCheveux />}
      {step === 1 && <StepPorosite />}
      {step === 2 && <StepElasticite />}
      {step === 3 && <StepDensite />}
      {step === 4 && <StepObjectifs />}
      {step === 5 && <StepProblemes />}
    </div>
  )
}
