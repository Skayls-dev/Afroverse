'use client'

import { useState } from 'react'
import type { EtapeRoutine, TypeCheveux } from '@alwaysafro/types'

const TYPES: TypeCheveux[] = ['3A', '3B', '3C', '4A', '4B', '4C']

const TYPE_INFO: Record<TypeCheveux, { label: string; description: string }> = {
  '3A': {
    label: 'Boucles larges et légères',
    description: 'Boucles en S bien définies, souples et légères. Le cuir chevelu produit suffisamment de sébum pour hydrater les longueurs. La priorité : préserver la définition des boucles sans alourdir.',
  },
  '3B': {
    label: 'Boucles serrées et rebondies',
    description: 'Boucles en ressort denses et rebondies, plus sèches que le 3A. Les cheveux ont besoin d\'humidité régulière pour éviter les frisottis et conserver leur élasticité.',
  },
  '3C': {
    label: 'Boucles très serrées',
    description: 'Boucles très serrées, presque des coils. La fibre capillaire est plus fragile et sujette à la sécheresse. Un apport en hydratation profonde et en protection est indispensable.',
  },
  '4A': {
    label: 'Coils fins et définis',
    description: 'Coils en S ou en O bien définis, naturellement secs. Les cheveux 4A ont besoin d\'hydratation intensive et de soins nourrissants réguliers pour limiter la casse.',
  },
  '4B': {
    label: 'Zigzag dense',
    description: 'Pattern en Z ou zigzag, très dense et volumineux. Le sébum peine à descendre le long de la tige. Un régime de soins riche en humidité et en nourriture est essentiel.',
  },
  '4C': {
    label: 'Coils ultra-serrés',
    description: 'Texture la plus serrée et la plus fragile. Très peu ou pas de pattern visible sans hydratation. Les cheveux 4C nécessitent les soins les plus intenses : bains d\'huile, masques réguliers et manipulations douces.',
  },
}

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
        <div className="routine-type-description">
          <span className="routine-type-badge">{activeType}</span>
          <div>
            <p className="routine-type-label">{TYPE_INFO[activeType].label}</p>
            <p className="routine-type-desc">{TYPE_INFO[activeType].description}</p>
          </div>
        </div>
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
