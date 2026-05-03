// TODO: Implémenter sections StoryBrand complètes

export default function Home() {
  const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? 'http://localhost:5173'

  return (
    <main className="page-shell">
      <div className="container">
        <header className="topbar">
          <a href="/" className="brand">AfroVerse</a>
          <a
            href={appUrl}
            className="btn btn-ghost"
          >
            Ouvrir l&apos;app
          </a>
        </header>

        <section className="hero-grid">
          <div>
            <p className="eyebrow">
              Diagnostic capillaire intelligent
            </p>
            <h1 className="hero-title">
              Ton profil
              <span className="hero-title-gradient">
                cheveux afro en 2 minutes
              </span>
            </h1>
            <p className="lead">
              Découvre ce dont ta fibre a vraiment besoin. AfroVerse transforme 5 réponses simples
              en recommandations personnalisées pour les textures 3A à 4C.
            </p>
            <div className="actions">
              <a
                href={appUrl}
                className="btn btn-primary"
              >
                Démarrer mon diagnostic
              </a>
              <a
                href="#etapes"
                className="btn btn-ghost"
              >
                Voir comment ca marche
              </a>
            </div>
          </div>

          <aside className="panel">
            <p className="panel-label">Apercu du diagnostic</p>
            <div className="stack-sm">
              {[
                { k: 'Type', v: '4A - 4C' },
                { k: 'Porosite', v: 'Faible | Normale | Haute' },
                { k: 'Objectif', v: 'Hydratation, definition, croissance' },
                { k: 'Plan', v: 'Routine + produits compatibles' }
              ].map((item) => (
                <div key={item.k} className="mini-card">
                  <p className="mini-card-k">{item.k}</p>
                  <p className="mini-card-v">{item.v}</p>
                </div>
              ))}
            </div>
          </aside>
        </section>

        <section id="etapes" className="section">
          <h2 className="section-title">Comment ca marche</h2>
          <p className="section-lead">
            Une experience simple, rapide et vraiment utile pour passer du doute a une routine qui fonctionne.
          </p>
          <div className="grid-3">
            {[
              { step: '01', title: 'Diagnostic', desc: 'Tu reponds a 5 questions sur ta texture, porosite et objectifs.' },
              { step: '02', title: 'Profil', desc: 'On genere ton profil capillaire avec les priorites de soin.' },
              { step: '03', title: 'Routine', desc: 'Tu recois des recommandations produit actionnables.' }
            ].map(({ step, title, desc }) => (
              <article key={step} className="feature-card">
                <p className="feature-step">{step}</p>
                <h3 className="feature-title">{title}</h3>
                <p className="feature-desc">{desc}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="stats-box">
          {[
            { label: 'diagnostics completes', value: '12k+' },
            { label: 'temps moyen', value: '2 min' },
            { label: 'types couverts', value: '3A a 4C' }
          ].map((item) => (
            <div key={item.label} className="stat-card">
              <p className="stat-value">{item.value}</p>
              <p className="stat-label">{item.label}</p>
            </div>
          ))}
        </section>

        <section className="cta-band">
          <h2 className="cta-title">Prete a transformer ta routine ?</h2>
          <p className="cta-text">
            Obtiens un plan personnalise, facile a suivre et adapte a ton vrai besoin capillaire.
          </p>
          <a
            href={appUrl}
            className="btn btn-light"
          >
            Commencer maintenant
          </a>
        </section>
      </div>
    </main>
  )
}
