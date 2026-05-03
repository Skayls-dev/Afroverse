import { create } from 'zustand'
import type { DiagnosticFormData } from '@afroverse/types'

interface DiagnosticStore {
  step: number
  data: DiagnosticFormData
  nextStep: () => void
  prevStep: () => void
  setData: (partial: Partial<DiagnosticFormData>) => void
  reset: () => void
}

const initialData: DiagnosticFormData = {
  type_cheveux: null,
  porosite: null,
  elasticite: null,
  densite: null,
  objectifs: [],
  problemes: []
}

export const useDiagnosticStore = create<DiagnosticStore>((set) => ({
  step: 0,
  data: initialData,
  nextStep: () => set((s) => ({ step: s.step + 1 })),
  prevStep: () => set((s) => ({ step: Math.max(0, s.step - 1) })),
  setData: (partial) => set((s) => ({ data: { ...s.data, ...partial } })),
  reset: () => set({ step: 0, data: initialData })
}))
