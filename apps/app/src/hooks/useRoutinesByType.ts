import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'
import type { EtapeRoutine, TypeCheveux } from '@alwaysafro/types'

export function useRoutinesByType(typeCheveux: TypeCheveux | null): {
  etapes: EtapeRoutine[]
  loading: boolean
  error: string | null
} {
  const [etapes, setEtapes] = useState<EtapeRoutine[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!typeCheveux) {
      setEtapes([])
      setLoading(false)
      setError(null)
      return
    }

    setLoading(true)
    setError(null)

    supabase
      .from('etapes_routines')
      .select('*')
      .contains('types_compatibles', [typeCheveux])
      .order('ordre_defaut', { ascending: true })
      .then(({ data, error: sbError }) => {
        if (sbError) {
          setError('Impossible de charger les routines pour ce type. Réessaie dans quelques instants.')
          setEtapes([])
        } else {
          setEtapes((data as EtapeRoutine[]) ?? [])
        }
        setLoading(false)
      })
  }, [typeCheveux])

  return { etapes, loading, error }
}
