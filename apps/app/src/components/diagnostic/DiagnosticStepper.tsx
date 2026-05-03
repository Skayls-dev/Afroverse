import { useDiagnosticStore } from '../../../store/diagnosticStore'
import StepTypeCheveux from './StepTypeCheveux'
import StepPorosite from './StepPorosite'
import StepObjectifs from './StepObjectifs'

const STEPS = ['Type de cheveux', 'Porosité', 'Objectifs']

// TODO: Ajouter StepElasticite, StepDensite, StepProblemes

export default function DiagnosticStepper() {
  const { step } = useDiagnosticStore()

  return (
    <div className="w-full max-w-lg mx-auto">
      {/* Progress bar */}
      <div className="mb-6">
        <div className="flex justify-between text-xs text-gray-500 mb-2">
          {STEPS.map((label, i) => (
            <span key={i} className={i <= step ? 'text-[#1D9E75]' : ''}>{label}</span>
          ))}
        </div>
        <div className="h-1 bg-white/10 rounded-full">
          <div
            className="h-1 bg-[#1D9E75] rounded-full transition-all"
            style={{ width: `${((step + 1) / STEPS.length) * 100}%` }}
          />
        </div>
      </div>

      {/* Steps */}
      {step === 0 && <StepTypeCheveux />}
      {step === 1 && <StepPorosite />}
      {step === 2 && <StepObjectifs />}
      {/* TODO: step 3 = StepElasticite, step 4 = StepDensite, step 5 = StepProblemes */}
    </div>
  )
}
