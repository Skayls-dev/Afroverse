import PartenairesForm from './PartenairesForm'

export default function PartenairesPage() {
  return (
    <div className="page-shell">
      {/* Topbar */}
      <header className="topbar">
        <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <a href="/" style={{ fontWeight: 800, fontSize: '1.1rem', color: 'var(--color-primary)', textDecoration: 'none' }}>
            AlwaysAfro
          </a>
          <a href="/" className="btn btn-ghost" style={{ fontSize: '0.875rem' }}>
            ← Retour
          </a>
        </div>
      </header>

      {/* Hero B2B */}
      <section className="section" style={{ textAlign: 'center', paddingTop: '4rem', paddingBottom: '3rem' }}>
        <div className="container">
          <p className="eyebrow">Partenaires Marques</p>
          <h1 className="section-title" style={{ maxWidth: '720px', margin: '0 auto 1.25rem' }}>
            Atteignez vos clientes afro avec une précision inégalée
          </h1>
          <p className="section-lead" style={{ maxWidth: '560px', margin: '0 auto 2.5rem' }}>
            AlwaysAfro est la première plateforme de profils capillaires afro déclaratifs en France.
            Vos produits, matchés aux bons profils — sans approximation.
          </p>

          {/* Stats inline */}
          <div style={{ display: 'flex', gap: '2.5rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            {[
              { value: '12 000+', label: 'profils analysés' },
              { value: '15', label: 'types capillaires distincts' },
              { value: '100 %', label: 'données first-party' },
            ].map((s) => (
              <div key={s.label} style={{ textAlign: 'center' }}>
                <p style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--color-primary)', lineHeight: 1 }}>{s.value}</p>
                <p style={{ color: 'var(--color-text-muted)', fontSize: '0.875rem', marginTop: '0.25rem' }}>{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Plans */}
      <section className="section" style={{ background: 'var(--color-surface)', paddingTop: '3.5rem', paddingBottom: '3.5rem' }}>
        <div className="container">
          <h2 className="section-title" style={{ textAlign: 'center', marginBottom: '2.5rem' }}>Choisissez votre plan</h2>
          <div className="grid-3">
            {/* Basic */}
            <div className="feature-card">
              <p style={{ fontWeight: 700, fontSize: '1.1rem', marginBottom: '0.25rem' }}>Basic</p>
              <p style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--color-text)', marginBottom: '1.5rem' }}>Gratuit</p>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.6rem', flex: 1 }}>
                {['Accès dashboard anonymisé', '1 rapport mensuel', 'Données agrégées par type', 'Support email'].map((f) => (
                  <li key={f} style={{ fontSize: '0.9rem', color: 'var(--color-text-muted)', display: 'flex', gap: '0.5rem' }}>
                    <span style={{ color: 'var(--color-secondary)', flexShrink: 0 }}>✓</span>{f}
                  </li>
                ))}
              </ul>
            </div>

            {/* Pro */}
            <div className="feature-card" style={{ border: '2px solid var(--color-primary)', position: 'relative' }}>
              <span style={{ position: 'absolute', top: '-0.875rem', left: '50%', transform: 'translateX(-50%)', background: 'var(--color-primary)', color: '#fff', fontSize: '0.75rem', fontWeight: 700, padding: '0.2rem 0.8rem', borderRadius: '999px' }}>
                Populaire
              </span>
              <p style={{ fontWeight: 700, fontSize: '1.1rem', marginBottom: '0.25rem' }}>Pro</p>
              <p style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--color-primary)', marginBottom: '1.5rem' }}>199 €<span style={{ fontSize: '1rem', fontWeight: 400 }}>/mois</span></p>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.6rem', flex: 1 }}>
                {['Tout Basic inclus', 'Filtres avancés type / porosité', 'Export CSV illimité', '2 campagnes produit / mois', 'Rapport hebdomadaire'].map((f) => (
                  <li key={f} style={{ fontSize: '0.9rem', color: 'var(--color-text-muted)', display: 'flex', gap: '0.5rem' }}>
                    <span style={{ color: 'var(--color-secondary)', flexShrink: 0 }}>✓</span>{f}
                  </li>
                ))}
              </ul>
            </div>

            {/* Enterprise */}
            <div className="feature-card">
              <p style={{ fontWeight: 700, fontSize: '1.1rem', marginBottom: '0.25rem' }}>Enterprise</p>
              <p style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--color-text)', marginBottom: '1.5rem' }}>Sur devis</p>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.6rem', flex: 1 }}>
                {['Tout Pro inclus', 'Accès API données brutes', 'Co-branding AlwaysAfro', 'Étude capillaire custom', 'Account manager dédié'].map((f) => (
                  <li key={f} style={{ fontSize: '0.9rem', color: 'var(--color-text-muted)', display: 'flex', gap: '0.5rem' }}>
                    <span style={{ color: 'var(--color-secondary)', flexShrink: 0 }}>✓</span>{f}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Formulaire de contact */}
      <section className="section" style={{ paddingTop: '3.5rem', paddingBottom: '3.5rem' }}>
        <div className="container" style={{ maxWidth: '640px' }}>
          <h2 className="section-title" style={{ textAlign: 'center', marginBottom: '0.75rem' }}>Parlons-en</h2>
          <p className="section-lead" style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
            Notre équipe vous répond sous 48 h.
          </p>
          <PartenairesForm />
        </div>
      </section>

      {/* Pourquoi AlwaysAfro data */}
      <section className="section" style={{ background: 'var(--color-surface)', paddingTop: '3.5rem', paddingBottom: '3.5rem' }}>
        <div className="container">
          <h2 className="section-title" style={{ textAlign: 'center', marginBottom: '2.5rem' }}>Pourquoi AlwaysAfro data ?</h2>
          <div className="grid-3">
            <div className="feature-card">
              <p style={{ fontSize: '1.5rem', marginBottom: '0.75rem' }}>📋</p>
              <p style={{ fontWeight: 700, marginBottom: '0.5rem' }}>Données déclaratives</p>
              <p style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem' }}>
                Chaque profil est rempli par l'utilisatrice elle-même — pas d'inférence, pas d'algorithme tiers. La donnée est exacte.
              </p>
            </div>
            <div className="feature-card">
              <p style={{ fontSize: '1.5rem', marginBottom: '0.75rem' }}>📈</p>
              <p style={{ fontWeight: 700, marginBottom: '0.5rem' }}>Suivi longitudinal</p>
              <p style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem' }}>
                Les utilisatrices enregistrent leur routine et leur évolution dans le temps — vous observez l'impact réel des produits.
              </p>
            </div>
            <div className="feature-card">
              <p style={{ fontSize: '1.5rem', marginBottom: '0.75rem' }}>🌍</p>
              <p style={{ fontWeight: 700, marginBottom: '0.5rem' }}>Communauté engagée</p>
              <p style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem' }}>
                Des femmes qui cherchent activement à améliorer leur routine — votre audience la plus qualifiée.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <p style={{ fontWeight: 700, marginBottom: '0.5rem' }}>AlwaysAfro</p>
          <p style={{ color: 'var(--color-text-muted)', fontSize: '0.875rem' }}>
            © {new Date().getFullYear()} AlwaysAfro — Tous droits réservés
          </p>
        </div>
      </footer>
    </div>
  )
}
