import { useState, useEffect } from 'react'
import { createClient } from '@afroverse/supabase/client'
import type { Profil } from '@afroverse/types'

export function useProfil(userId: string | undefined) {
  const [profil, setProfil] = useState<Profil | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!userId) { setLoading(false); return }
    const supabase = createClient()
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
