'use client'

import { useState } from 'react'
import type { EtapeRoutine, TypeCheveux } from '@alwaysafro/types'

const TYPES: TypeCheveux[] = ['3A', '3B', '3C', '4A', '4B', '4C']

export default function RoutinesTabs({
  etapesParType,
}: {
  etapesParType: Record<TypeCheveux, EtapeRoutine[]>
}) {
  const [activeType, setActiveType] = useState<TypeCheveux>('3A')
  const etapes = etapesParType[activeType]

  return (
    <>
      <div className="routines-tabs-bar">
        {TYPES.map((type) => (
          <button
            key={type}
            type="button"
            onClick={() => setActiveType(type)}
            className={`routines-tab-btn ${activeType === type ? 'routines-tab-btn--active' : ''}`}
          >
            {type}
            <span className="routines-tab-count">{etapesParType[type].length}</span>
          </button>
        ))}
      </div>

      <div className="routine-tab-panel">
        {etapes.length === 0 ? (
          <p className="routine-empty">Aucune etape disponible pour le type {activeType} pour le moment.</p>
        ) : (
          <div className="routine-steps-grid">
            {etapes.map((etape) => (
              <article key={etape.id} className="routine-etape-card">
                <div className="routine-etape-head">
                  <span className="routine-etape-emoji">{etape.emoji}</span>
                  <div className="routine-etape-meta-row">
                    <span className="routine-frequence-chip">{etape.frequence}</span>
                    {etape.duree_minutes && (
                      <span className="routine-duree">~{etape.duree_minutes} min</span>
                    )}
                  </div>
                </div>
                <h3 className="routine-step-title">{etape.titre}</h3>
                <p className="routine-step-desc">{etape.description}</p>
                {etape.quand && (
                  <p className="routine-etape-quand">
                    <span className="routine-etape-quand-label">Quand : </span>{etape.quand}
                  </p>
                )}
              </article>
            ))}
          </div>
        )}
      </div>
    </>
  )
}
