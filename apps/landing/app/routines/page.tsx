import { createClient } from '@supabase/supabase-js'
import Image from 'next/image'
import type { EtapeRoutine, TypeCheveux } from '@alwaysafro/types'
import RoutinesTabs from './RoutinesTabs'
import DownloadGuideForm from './DownloadGuideForm'

export const dynamic = 'force-dynamic'

const TYPES: TypeCheveux[] = ['3A', '3B', '3C', '4A', '4B', '4C']

function getSupabase() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      global: {
        fetch: (url, options) => fetch(url, { ...options, cache: 'no-store' }),
      },
    }
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
          <div className="brand">
            <Image
              src="/logoAfroverse.png"
              alt="AlwaysAfro"
              width={180}
              height={55}
              priority
              className="brand-logo"
            />
          </div>
          <nav className="topbar-nav">
            <a href="/" className="topbar-link">← Accueil</a>
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

        <RoutinesTabs etapesParType={etapesParType} />

        <DownloadGuideForm />

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
