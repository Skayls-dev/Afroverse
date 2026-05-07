import { createClient } from '@supabase/supabase-js'
import type { EtapeRoutine, TypeCheveux } from '@alwaysafro/types'

export const dynamic = 'force-dynamic'

const TYPES: TypeCheveux[] = ['3A', '3B', '3C', '4A', '4B', '4C']

function getSupabase() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
}

async function fetchEtapesParType(): Promise<Record<TypeCheveux, EtapeRoutine[]>> {
  const supabase = getSupabase()
  const { data } = await supabase
    .from('etapes_routines')
    .select('*')
    .order('ordre_defaut', { ascending: true })

  const rows: EtapeRoutine[] = data ?? []

  const grouped = Object.fromEntries(TYPES.map((t) => [t, [] as EtapeRoutine[]])) as Record<TypeCheveux, EtapeRoutine[]>
  for (const etape of rows) {
    if (!etape.types_compatibles) continue
    for (const type of TYPES) {
      if (etape.types_compatibles.includes(type)) {
        grouped[type].push(etape)
      }
    }
  }
  return grouped
}

export default async function RoutinesPage() {
  const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? 'http://localhost:5173'
  const etapesParType = await fetchEtapesParType()

  return (
    <main className="page-shell routines-shell">
      <div className="container">
        <header className="topbar">
          <a href="/" className="brand-link">
            <span className="topbar-link">← Retour accueil</span>
          </a>
          <nav className="topbar-nav">
            <a href="/packs" className="topbar-link">Nos packs</a>
            <a href={appUrl} className="btn btn-primary">Demarrer mon diagnostic</a>
          </nav>
        </header>

        <section className="section routines-hero">
          <p className="eyebrow">Guide visuel routines</p>
          <h1 className="section-title">Les bonnes bases pour chaque type de cheveux</h1>
          <p className="section-lead">
            Toutes les etapes issues de notre base, organisees par type. Choisis le tien pour voir les gestes essentiels.
            Passe ensuite au diagnostic pour obtenir une routine taillee a ta porosite et tes objectifs.
          </p>
        </section>

        <div className="routine-type-sections">
          {TYPES.map((type) => {
            const etapes = etapesParType[type]
            return (
              <section key={type} className="routine-type-section">
                <div className="routine-type-header">
                  <span className="routine-chip routine-chip-lg">{type}</span>
                  <div>
                    <h2 className="routine-type-title">Type {type}</h2>
                    <p className="routine-type-count">{etapes.length} etape{etapes.length !== 1 ? 's' : ''}</p>
                  </div>
                </div>

                {etapes.length === 0 ? (
                  <p className="routine-empty">Aucune etape disponible pour ce type pour le moment.</p>
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
              </section>
            )
          })}
        </div>

        <section className="cta-band routines-cta-band">
          <h2 className="cta-title">Passe du general au sur-mesure</h2>
          <p className="cta-text">
            Ces etapes sont une base solide. Ton diagnostic ajoute les details qui changent tout : porosite, objectifs, habitudes et priorites.
          </p>
          <a href={appUrl} className="btn btn-light">Voir ma routine personnalisee &rarr;</a>
        </section>
      </div>
    </main>
  )
}
