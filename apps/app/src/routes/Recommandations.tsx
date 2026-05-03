import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from '../components/shared/Navbar'
import { useAuth } from '../hooks/useAuth'
import { useProfil } from '../hooks/useProfil'
import { useRoutines } from '../hooks/useRoutines'
import { supabase } from '../lib/supabase'
import type { EtapeRoutine, Produit } from '@afroverse/types'

function EtapeCard({ etape, expanded, onToggle }: {
  etape: EtapeRoutine
  expanded: boolean
  onToggle: () => void
}) {
  return (
    <div
      className="bg-white/5 border border-white/10 rounded-xl p-4 mb-3 cursor-pointer"
      onClick={onToggle}
    >
      <div className="flex items-start gap-3">
        <span className="text-2xl flex-shrink-0">{etape.emoji}</span>
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-2 flex-wrap">
            <p className="text-white font-semibold text-sm">{etape.titre}</p>
            <span className="text-[10px] bg-[#1D9E75]/15 text-[#1D9E75] rounded-full px-2 py-0.5 flex-shrink-0">
              {etape.frequence}
            </span>
          </div>
          <p className={`text-gray-400 text-xs leading-relaxed mt-2 ${expanded ? '' : 'line-clamp-2'}`}>
            {etape.description}
          </p>
          {expanded && (
            <div className="mt-2 space-y-1">
              {etape.accessoires && (
                <p className="text-gray-400 text-xs">
                  <span className="text-gray-500">Accessoires : </span>{etape.accessoires}
                </p>
              )}
              {etape.produits_types && (
                <p className="text-gray-400 text-xs">
                  <span className="text-gray-500">Produits : </span>{etape.produits_types}
                </p>
              )}
            </div>
          )}
          <div className="flex items-center gap-3 mt-2 flex-wrap">
            {etape.quand && (
              <p className="text-xs">
                <span className="text-gray-500">Quand : </span>
                <span className="text-gray-300">{etape.quand}</span>
              </p>
            )}
            {etape.duree_minutes && (
              <span className="text-[10px] text-gray-600">~{etape.duree_minutes} min</span>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default function Recommandations() {
  const navigate = useNavigate()
  const { user } = useAuth()
  const { profil, loading: profilLoading } = useProfil(user?.id)
  const { etapes, loading: etapesLoading, error } = useRoutines(profil)
  const loading = profilLoading || etapesLoading
  const [expandedId, setExpandedId] = useState<string | null>(null)

  const [produits, setProduits] = useState<Produit[]>([])
  const [produitsLoading, setProduitsLoading] = useState(false)

  useEffect(() => {
    if (!profil) return
    setProduitsLoading(true)
    supabase
      .from('produits')
      .select('*')
      .contains('types_compatibles', [profil.type_cheveux])
      .contains('porosites_compatibles', [profil.porosite])
      .then(({ data }) => {
        const raw: Produit[] = data ?? []
        const scored = raw
          .map((p) => {
            let score = 0
            if (p.types_compatibles?.includes(profil.type_cheveux)) score += 2
            if (p.porosites_compatibles?.includes(profil.porosite)) score += 2
            profil.objectifs.forEach((obj) => {
              if (p.categorie?.toLowerCase().includes(obj.toLowerCase())) score += 1
            })
            return { ...p, _score: score }
          })
          .sort((a, b) => b._score - a._score)
          .slice(0, 6)
        setProduits(scored)
        setProduitsLoading(false)
      })
  }, [profil?.id, profil?.porosite, profil?.type_cheveux])

  const universelles = etapes.filter((e) => e.universelle)
  const specifiques = etapes.filter((e) => !e.universelle)

  const porLabel = profil?.porosite === 'haute'
    ? 'Haute porosité'
    : profil?.porosite === 'faible'
    ? 'Faible porosité'
    : 'Porosité normale'

  return (
    <div className="min-h-screen bg-[#0f0f0f] pb-20 md:pt-16">
      <div className="max-w-lg mx-auto px-4 py-8">
        {/* Header */}
        <h1 className="text-2xl font-bold text-white mb-2">Ta routine personnalisée</h1>
        {profil && (
          <span className="inline-block bg-[#1D9E75]/20 border border-[#1D9E75]/40 text-[#1D9E75] text-xs font-medium rounded-full px-3 py-1 mb-6">
            {profil.type_cheveux} · {porLabel}
          </span>
        )}

        {/* Loading skeletons */}
        {loading && (
          <div className="space-y-3 mt-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-24 rounded-xl bg-white/5 animate-pulse" />
            ))}
          </div>
        )}

        {/* Error */}
        {!loading && error && (
          <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-4 text-red-400 text-sm">
            {error}
          </div>
        )}

        {/* Empty state */}
        {!loading && !error && !profil && (
          <div className="text-center py-12 space-y-4">
            <p className="text-gray-400">
              Complète ton diagnostic pour obtenir ta routine personnalisée
            </p>
            <button
              onClick={() => navigate('/diagnostic')}
              className="bg-[#1D9E75] hover:bg-[#178864] text-white font-semibold py-3 px-8 rounded-full transition-colors"
            >
              Faire mon diagnostic →
            </button>
          </div>
        )}

        {/* Etapes list */}
        {!loading && !error && profil && etapes.length > 0 && (
          <>
            {universelles.map((etape) => (
              <EtapeCard
                key={etape.id}
                etape={etape}
                expanded={expandedId === etape.id}
                onToggle={() => setExpandedId(expandedId === etape.id ? null : etape.id)}
              />
            ))}

            {specifiques.length > 0 && (
              <>
                <div className="text-xs text-gray-600 uppercase tracking-wider my-4">
                  Adaptées à ton profil
                </div>
                {specifiques.map((etape) => (
                  <EtapeCard
                    key={etape.id}
                    etape={etape}
                    expanded={expandedId === etape.id}
                    onToggle={() => setExpandedId(expandedId === etape.id ? null : etape.id)}
                  />
                ))}
              </>
            )}

            {/* Suivi CTA */}
            <div
              className="bg-[#534AB7]/10 border border-[#534AB7]/30 rounded-xl p-4 text-center mt-4 cursor-pointer"
              onClick={() => navigate('/suivi')}
            >
              <p className="text-white font-medium text-sm">
                Suis ton évolution mois après mois →
              </p>
            </div>
          </>
        )}

        {/* Produits recommandés */}
        {profil && !loading && (
          <div className="mt-8">
            <h2 className="text-lg font-bold text-white mb-4">Produits recommandés pour toi</h2>
            {produitsLoading ? (
              <div className="space-y-3">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="h-20 rounded-xl bg-white/5 animate-pulse" />
                ))}
              </div>
            ) : produits.length === 0 ? (
              <p className="text-gray-400 text-sm text-center py-6">Le catalogue arrive bientôt 🌿</p>
            ) : (
              <div className="space-y-3">
                {produits.map((p) => (
                  <div key={p.id} className="bg-white/5 border border-white/10 rounded-xl p-4">
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex-1 min-w-0">
                        <p className="text-white font-bold text-sm leading-tight">{p.nom}</p>
                        <p className="text-gray-400 text-xs mt-0.5">{p.marque}</p>
                        {p.ingredients && p.ingredients.length > 0 && (
                          <p className="text-gray-500 text-xs mt-1">
                            {p.ingredients.slice(0, 3).join(' · ')}
                          </p>
                        )}
                      </div>
                      <div className="flex flex-col items-end gap-1 flex-shrink-0">
                        <span className="text-white font-semibold text-sm">{p.prix} €</span>
                        <span className="bg-[#534AB7]/20 text-[#534AB7] text-[10px] rounded-full px-2 py-0.5">
                          {p.categorie}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
      <Navbar />
    </div>
  )
}

