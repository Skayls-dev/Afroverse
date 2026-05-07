import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from '../components/shared/Navbar'
import { useAuth } from '../hooks/useAuth'
import { useProfil } from '../hooks/useProfil'
import { useRoutinesByType } from '../hooks/useRoutinesByType'
import type { EtapeRoutine, TypeCheveux } from '@alwaysafro/types'

const TYPES_CHEVEUX: TypeCheveux[] = ['3A', '3B', '3C', '4A', '4B', '4C']

function EtapeCard({ etape, expanded, onToggle }: {
  etape: EtapeRoutine
  expanded: boolean
  onToggle: () => void
}) {
  return (
    <div
      className="app-card p-4 mb-3 cursor-pointer"
      onClick={onToggle}
    >
      <div className="flex items-start gap-3">
        <span className="text-2xl flex-shrink-0">{etape.emoji}</span>
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-2 flex-wrap">
            <p className="text-[var(--color-text)] font-semibold text-sm">{etape.titre}</p>
            <span className="text-[10px] bg-[var(--color-secondary)]/15 text-[var(--color-secondary)] rounded-full px-2 py-0.5 flex-shrink-0">
              {etape.frequence}
            </span>
          </div>
          <p className={`app-muted text-xs leading-relaxed mt-2 ${expanded ? '' : 'line-clamp-2'}`}>
            {etape.description}
          </p>
          <div className="flex items-center gap-3 mt-2 flex-wrap">
            {etape.quand && (
              <p className="text-xs">
                <span className="text-[var(--color-text)]/60">Quand : </span>
                <span className="app-muted">{etape.quand}</span>
              </p>
            )}
            {etape.duree_minutes && (
              <span className="text-[10px] text-[var(--color-text)]/55">~{etape.duree_minutes} min</span>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default function RoutinesGuide() {
  const navigate = useNavigate()
  const { user } = useAuth()
  const { profil } = useProfil(user?.id)
  const [typeSelectionne, setTypeSelectionne] = useState<TypeCheveux>('3A')
  const [expandedId, setExpandedId] = useState<string | null>(null)
  const { etapes, loading, error } = useRoutinesByType(typeSelectionne)

  useEffect(() => {
    if (profil?.type_cheveux) {
      setTypeSelectionne(profil.type_cheveux)
    }
  }, [profil?.type_cheveux])

  useEffect(() => {
    setExpandedId(null)
  }, [typeSelectionne])

  return (
    <div className="app-shell pb-20 md:pt-16">
      <div className="max-w-lg mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold text-[var(--color-text)] mb-2">Routines par type de cheveux</h1>
        <p className="app-muted text-sm mb-6">
          Explore une base de routines générales adaptées à chaque type de cheveux texturés.
        </p>

        <div className="overflow-x-auto pb-2 mb-4">
          <div className="flex gap-2 min-w-max">
            {TYPES_CHEVEUX.map((type) => {
              const isActive = typeSelectionne === type
              return (
                <button
                  key={type}
                  type="button"
                  onClick={() => setTypeSelectionne(type)}
                  className={`px-3 py-1.5 rounded-full text-sm border transition-colors ${
                    isActive
                      ? 'bg-[var(--color-secondary)]/15 border-[var(--color-secondary)] text-[var(--color-secondary)] font-semibold'
                      : 'bg-[var(--color-surface)] border-[var(--color-border)] text-[var(--color-text-muted)] hover:text-[var(--color-secondary)]'
                  }`}
                >
                  {type}
                </button>
              )
            })}
          </div>
        </div>

        {loading && (
          <div className="space-y-3 mt-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-24 rounded-xl bg-[var(--color-surface)] animate-pulse border border-[var(--color-border)]" />
            ))}
          </div>
        )}

        {!loading && error && (
          <div className="app-card p-4 text-sm text-[var(--color-text-muted)] border border-[var(--color-border)]">
            {error}
          </div>
        )}

        {!loading && !error && etapes.length === 0 && (
          <div className="app-card p-5 text-center">
            <p className="text-[var(--color-text)] font-medium text-sm">Aucune étape trouvée pour le type {typeSelectionne}.</p>
            <p className="app-muted text-xs mt-1">Essaie un autre type de cheveux dans les onglets.</p>
          </div>
        )}

        {!loading && !error && etapes.length > 0 && (
          <div>
            {etapes.map((etape) => (
              <EtapeCard
                key={etape.id}
                etape={etape}
                expanded={expandedId === etape.id}
                onToggle={() => setExpandedId(expandedId === etape.id ? null : etape.id)}
              />
            ))}
          </div>
        )}

        {profil && (
          <button
            type="button"
            onClick={() => navigate('/recommandations')}
            className="w-full app-btn-primary font-semibold py-3 px-5 rounded-xl mt-4"
          >
            Voir ma routine personnalisée →
          </button>
        )}
      </div>
      <Navbar />
    </div>
  )
}
