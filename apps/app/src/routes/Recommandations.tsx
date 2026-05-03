import { useEffect, useState } from 'react'
import Navbar from '../components/shared/Navbar'
import { useAuth } from '../hooks/useAuth'
import { supabase } from '../lib/supabase'
import type { Recommandation } from '@afroverse/types'

export default function Recommandations() {
  const { user } = useAuth()
  const [recs, setRecs] = useState<Recommandation[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!user) return
    supabase
      .from('recommandations')
      .select('*, produit:produits(*)')
      .eq('user_id', user.id)
      .order('score_match', { ascending: false })
      .then(({ data }) => {
        setRecs((data as Recommandation[]) ?? [])
        setLoading(false)
      })
  }, [user])

  return (
    <div className="min-h-screen bg-[#0f0f0f] pb-20 md:pt-16">
      <div className="max-w-lg mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold text-white mb-6">Mes recommandations</h1>
        {loading ? (
          <p className="text-gray-400">Chargement…</p>
        ) : recs.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-400">Complète ton diagnostic pour obtenir des recommandations personnalisées.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {recs.map((r) => (
              <div key={r.id} className="bg-white/5 rounded-xl p-4 border border-white/10">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-semibold text-white">{r.produit.nom}</h3>
                  <span className="text-[#1D9E75] font-bold text-sm">{r.score_match}% match</span>
                </div>
                <p className="text-gray-400 text-sm mb-2">{r.produit.marque} · {r.produit.categorie}</p>
                <p className="text-gray-500 text-xs">{r.raison}</p>
                <p className="text-white font-semibold mt-2">{r.produit.prix.toFixed(2)} €</p>
              </div>
            ))}
          </div>
        )}
        {/* TODO: Ajouter filtres par catégorie */}
      </div>
      <Navbar />
    </div>
  )
}
