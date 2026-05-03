import { useState, useEffect } from 'react'
import { createClient } from '@afroverse/supabase/client'
import type { Suivi } from '@afroverse/types'

export function useSuivi(userId: string | undefined) {
  const [suivis, setSuivis] = useState<Suivi[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!userId) { setLoading(false); return }
    const supabase = createClient()
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

  return { suivis, loading }
}
