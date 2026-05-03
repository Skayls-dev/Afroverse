import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'
import type { Profil } from '@alwaysafro/types'

export function useProfil(userId: string | undefined) {
  const [profil, setProfil] = useState<Profil | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!userId) { setLoading(false); return }
    supabase
      .from('profils')
      .select('*')
      .eq('id', userId)
      .single()
      .then(({ data }) => {
        setProfil(data)
        setLoading(false)
      })
  }, [userId])

  return { profil, loading }
}
