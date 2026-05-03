import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'
import type { Profil, EtapeRoutine } from '@alwaysafro/types'

export function useRoutines(profil: Profil | null): { etapes: EtapeRoutine[]; loading: boolean; error: string | null } {
  const [etapes, setEtapes] = useState<EtapeRoutine[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!profil) { setLoading(false); return }

    const hasProblemes = profil.problemes && profil.problemes.length > 0
    const filter = hasProblemes
      ? `universelle.eq.true,porosites_cibles.cs.{${profil.porosite}},problemes_cibles.ov.{${profil.problemes.join(',')}}`
      : `universelle.eq.true,porosites_cibles.cs.{${profil.porosite}}`

    supabase
      .from('etapes_routines')
      .select('*')
      .or(filter)
      .order('ordre_defaut', { ascending: true })
      .then(({ data, error: sbError }) => {
        if (sbError) {
          setError('Impossible de charger ta routine. Réessaie dans quelques instants.')
        } else {
          setEtapes((data as EtapeRoutine[]) ?? [])
        }
        setLoading(false)
      })
  }, [profil?.id, profil?.porosite])

  return { etapes, loading, error }
}
