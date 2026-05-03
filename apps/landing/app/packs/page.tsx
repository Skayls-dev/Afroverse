import Image from 'next/image'
import CheckoutButton from './CheckoutButton'

const PACKS = [
  {
    id: 'bronze',
    name: 'Pack Bronze',
    subtitle: 'La Check-List de l\'idée au Marché',
    price: '299 €',
    priceSub: null,
    valeur: null,
    badge: null,
    features: [
      'Playbook digital complet',
      'Toutes les étapes de l\'idée à la mise sur le marché',
      'Accès immédiat après paiement',
    ],
    cta: 'Obtenir la Check-List',
    primary: false,
  },
  {
    id: 'argent_membre',
    name: 'Pack Argent',
    subtitle: 'J\'avance doucement et sûrement',
    price: '1 839 €',
    priceSub: '310 € / mois (membre) · 2 299 € / 390 € / mois (non-membre)',
    valeur: 'Valeur réelle : 3 749 €',
    badge: null,
    features: [
      'Playbook complet inclus',
      'Suivi projet avec Program Manager dédié',
      'Accès fournisseurs sélectionnés SuccessTeam + tarifs privilégiés',
      'Packaging, création société, sélection labo, branding',
      'Viabilité financière, logistique, communication',
      'Modélisation packaging (mockups)',
      '🎁 Bonus : shooting 10 photos produits, 2h studio',
    ],
    cta: 'Démarrer le Pack Argent',
    primary: false,
  },
  {
    id: 'or_membre',
    name: 'Pack Or',
    subtitle: 'Je suis prêt et j\'accélère',
    price: '3 244 €',
    priceSub: '549 € / mois (membre) · 3 893 € / 659 € / mois (non-membre)',
    valeur: 'Valeur réelle : 6 643 €',
    badge: 'Recommandé',
    features: [
      'Tout le Pack Argent inclus',
      'Suivi développement produit + admin (50 €/mois non-membre)',
      'Pack présence digitale 6 mois',
      'Stratégie marketing RS + messages marketing',
      'Shooting 4h + vidéo promotionnelle 4h de tournage',
      'Landing page (1 produit) + lead magnet',
      'Contenu RS : 3 posts + 3 reels + 3 stories (Instagram & Facebook)',
      '🎁 Bonus : 50% SPIN, 50% formation vente, 1 podcast, 1 NL SuccessTeam',
    ],
    cta: 'Démarrer le Pack Or',
    primary: true,
  },
]

const FAQ = [
  {
    q: 'Quelle est la différence entre les packs ?',
    a: 'Le Pack Bronze est un guide autonome (playbook). Le Pack Argent ajoute un suivi personnalisé avec un Program Manager et l\'accès à notre réseau fournisseurs. Le Pack Or inclut tout ça plus un accompagnement marketing et digital complet sur 1 an.',
  },
  {
    q: 'Le paiement mensuel est-il possible ?',
    a: 'Oui, les Packs Argent et Or sont disponibles en paiement mensuel échelonné (310 €/mois pour Argent membre, 549 €/mois pour Or membre). Contactez-nous pour mettre en place un plan.',
  },
  {
    q: 'L\'accompagnement est-il en présentiel ou à distance ?',
    a: 'L\'accompagnement se fait principalement à distance (visioconférence, outils collaboratifs). Des sessions en présentiel peuvent être organisées selon votre localisation.',
  },
]

export default function PacksPage() {
  return (
    <main className="page-shell">
      <div className="container">
        {/* Topbar */}
        <header className="topbar">
          <a href="/" className="brand" aria-label="AlwaysAfro">
            <Image src="/logoAfroverse.png" alt="AlwaysAfro" width={196} height={60} priority className="brand-logo" />
          </a>
          <nav className="topbar-nav">
            <a href="/" className="topbar-link">← Retour</a>
          </nav>
        </header>

        {/* Hero */}
        <section className="section" style={{ textAlign: 'center', paddingTop: '1rem' }}>
          <p className="eyebrow">🚀 Accompagnement cosmétique</p>
          <h1 className="hero-title" style={{ marginBottom: '1rem' }}>
            Lancez votre marque
            <span className="hero-title-gradient">cosmétique afro</span>
          </h1>
          <p className="lead" style={{ margin: '0 auto 2rem' }}>
            De l'idée à la mise sur le marché : choisissez le niveau d'accompagnement qui correspond à votre projet.
          </p>
        </section>

        {/* Grille packs */}
        <section className="section">
          <div className="grid-3">
            {PACKS.map((pack) => (
              <article
                key={pack.id}
                className="feature-card"
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  position: 'relative',
                  borderColor: pack.badge ? 'var(--color-primary)' : undefined,
                  borderWidth: pack.badge ? '2px' : undefined,
                }}
              >
                {pack.badge && (
                  <span
                    style={{
                      position: 'absolute',
                      top: '-0.75rem',
                      left: '50%',
                      transform: 'translateX(-50%)',
                      background: 'var(--color-primary)',
                      color: '#fff',
                      fontSize: '0.72rem',
                      fontWeight: 800,
                      letterSpacing: '0.06em',
                      borderRadius: '999px',
                      padding: '0.2rem 0.75rem',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {pack.badge}
                  </span>
                )}

                <p className="eyebrow" style={{ marginBottom: '0.5rem' }}>{pack.name}</p>
                <h2 className="feature-title" style={{ fontSize: '1.15rem', marginBottom: '0.25rem' }}>{pack.subtitle}</h2>

                <p style={{ fontSize: '2rem', fontWeight: 900, color: 'var(--color-primary)', margin: '0.75rem 0 0.25rem' }}>
                  {pack.price}
                </p>
                {pack.priceSub && (
                  <p style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', marginBottom: '0.25rem' }}>{pack.priceSub}</p>
                )}
                {pack.valeur && (
                  <p style={{ fontSize: '0.72rem', color: 'var(--color-secondary)', fontWeight: 700, marginBottom: '0.75rem' }}>
                    ✦ {pack.valeur}
                  </p>
                )}

                <ul style={{ flex: 1, listStyle: 'none', marginBottom: '0.5rem' }}>
                  {pack.features.map((f) => (
                    <li key={f} style={{ display: 'flex', gap: '0.5rem', alignItems: 'flex-start', marginBottom: '0.5rem', fontSize: '0.88rem', color: 'var(--color-text-muted)' }}>
                      <span style={{ color: 'var(--color-secondary)', flexShrink: 0 }}>✓</span>
                      {f}
                    </li>
                  ))}
                </ul>

                <CheckoutButton packId={pack.id} label={pack.cta} primary={pack.primary} />
              </article>
            ))}
          </div>
        </section>

        {/* FAQ */}
        <section className="section guide-section">
          <h2 className="section-title">Questions fréquentes</h2>
          <div style={{ display: 'grid', gap: '1rem', marginTop: '1.5rem' }}>
            {FAQ.map((item) => (
              <div key={item.q} className="proof-card" style={{ padding: '1.25rem' }}>
                <h3 style={{ marginBottom: '0.5rem', fontWeight: 800, fontSize: '1rem' }}>{item.q}</h3>
                <p style={{ color: 'var(--color-text-muted)', fontSize: '0.92rem', lineHeight: 1.65 }}>{item.a}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA finale */}
        <section className="cta-band">
          <h2 className="cta-title">Pas encore sûr(e) ?</h2>
          <p className="cta-text">Discutons de votre projet. Notre équipe vous répond sous 48 h.</p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <a href="/partenaires" className="btn btn-light">Parler à un conseiller</a>
            <a href="mailto:contact@alwaysafro.app" className="btn btn-ghost">contact@alwaysafro.app</a>
          </div>
        </section>

        <footer className="footer">
          <a href="/" className="brand brand-footer" aria-label="AlwaysAfro">
            <Image src="/logoAfroverse.png" alt="AlwaysAfro" width={168} height={52} className="brand-logo brand-logo-footer" />
          </a>
          <div className="footer-links">
            <a href="/">Accueil</a>
            <a href="/partenaires">Partenaires marques</a>
            <a href="#">Mentions légales</a>
          </div>
          <p className="footer-tagline">La plateforme cosmétique afro qui te connaît vraiment.</p>
        </footer>
      </div>
    </main>
  )
}
