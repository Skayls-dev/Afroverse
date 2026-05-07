import { create } from 'zustand'
import type { DiagnosticFormData } from '@alwaysafro/types'
import type { DiagnosticIAInput, DiagnosticIAResult } from '../hooks/useAnthropicDiagnostic'

interface DiagnosticStore {
  step: number
  data: DiagnosticFormData
  iaPhotoBase64: string | null
  iaPhotoFile: File | null
  iaQuestionnaire: DiagnosticIAInput | null
  iaResult: DiagnosticIAResult | null
  nextStep: () => void
  prevStep: () => void
  setData: (partial: Partial<DiagnosticFormData>) => void
  setIaPhoto: (base64: string, file: File) => void
  setIaQuestionnaire: (q: DiagnosticIAInput) => void
  setIaResult: (result: DiagnosticIAResult) => void
  resetIa: () => void
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
  iaPhotoBase64: null,
  iaPhotoFile: null,
  iaQuestionnaire: null,
  iaResult: null,
  nextStep: () => set((s) => ({ step: s.step + 1 })),
  prevStep: () => set((s) => ({ step: Math.max(0, s.step - 1) })),
  setData: (partial) => set((s) => ({ data: { ...s.data, ...partial } })),
  setIaPhoto: (base64, file) => set({ iaPhotoBase64: base64, iaPhotoFile: file }),
  setIaQuestionnaire: (q) => set({ iaQuestionnaire: q }),
  setIaResult: (result) => set({ iaResult: result }),
  resetIa: () => set({ iaPhotoBase64: null, iaPhotoFile: null, iaQuestionnaire: null, iaResult: null }),
  reset: () => set({
    step: 0,
    data: initialData,
    iaPhotoBase64: null,
    iaPhotoFile: null,
    iaQuestionnaire: null,
    iaResult: null,
  })
}))
