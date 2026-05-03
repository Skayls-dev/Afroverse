import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'
import type { Suivi } from '@alwaysafro/types'

export function useSuivi(userId: string | undefined) {
  const [suivis, setSuivis] = useState<Suivi[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!userId) { setLoading(false); return }
    supabase
      .from('suivis')
      .select('*')
      .eq('user_id', userId)
      .order('mois', { ascending: false })
      .then(({ data }) => {
        setSuivis(data ?? [])
        setLoading(false)
      })
  }, [userId])

  return { suivis, setSuivis, loading }
}
