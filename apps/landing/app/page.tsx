import Image from 'next/image'
import { Leaf, Target, Zap } from 'lucide-react'

export default function Home() {
  const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? 'http://localhost:5173'

  return (
    <main className="page-shell">
      <div className="container">
        <header className="topbar">
          <div className="brand">
            <Image
              src="/logoAfroverse.png"
              alt="AlwaysAfro"
              width={236}
              height={72}
              priority
              className="brand-logo"
            />
          </div>
          <nav className="topbar-nav">
            <a href="#plan" className="topbar-link">Comment ca marche</a>
            <a href="/packs" className="topbar-link">Nos packs</a>
            <a href={appUrl} className="btn btn-primary">Demarrer mon diagnostic</a>
          </nav>
        </header>

        <div className="hero-wrap">
        <section className="hero-grid">
          <div>
            <p className="eyebrow">✨ Diagnostic cosmetique personnalise</p>
            <h1 className="hero-title">
              Ta beaute afro merite
              <span className="hero-title-gradient">une routine qui te ressemble vraiment.</span>
            </h1>
            <p className="lead">
              Arrete de chercher. AlwaysAfro analyse ta texture, ta porosite et ta peau afro
              pour te donner exactement ce dont tu as besoin - en 2 minutes.
            </p>
            <div className="actions">
              <a href={appUrl} className="btn btn-primary">Demarrer mon diagnostic gratuit -&gt;</a>
              <a href="#plan" className="btn btn-ghost">Voir comment ca marche</a>
            </div>
          </div>
        </section>
        <div className="hero-badge">
          <div className="hero-badge-seal">✦</div>
          <div className="hero-badge-text">
            <span className="hero-badge-title">Concu pour les peaux</span>
            <span className="hero-badge-sub">&amp; cheveux afro</span>
          </div>
        </div>
        </div>

        <section className="section">
          <h2 className="section-title">Tu merites mieux que des conseils qui ne te ressemblent pas.</h2>
          <div className="grid-3">
            {[
              {
                icon: '💸',
                title: 'Des produits qui ne marchent pas',
                desc: 'Tu as depense des centaines d\'euros. Tes cheveux restent secs, cassants. Ta peau, terne. Parce que les conseils n\'etaient pas faits pour toi.'
              },
              {
                icon: '😤',
                title: 'Des routines copiees-collees d\'internet',
                desc: 'Les tutoriels ne tiennent pas compte de ta texture reelle, de ta porosite, de ta carnation. Tu t\'adaptes a eux - pas l\'inverse.'
              },
              {
                icon: '🔍',
                title: 'Une cosmetique afro mal connue, mal distribuee',
                desc: 'Les bonnes marques existent. Les bons produits aussi. Mais sans guide, tu navigues a l\'aveugle.'
              }
            ].map((item) => (
              <article key={item.title} className="problem-card">
                <p className="problem-icon">{item.icon}</p>
                <h3 className="feature-title">{item.title}</h3>
                <p className="feature-desc">{item.desc}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="section guide-section">
          <h2 className="section-title">AlwaysAfro &mdash; ta r&eacute;f&eacute;rence cosm&eacute;tique afro</h2>
          <p className="section-lead">
            On sait ce que c\'est - passer des heures a chercher, essayer, decevoir. La cosmetique afro est riche,
            diverse, puissante. Mais elle demande une approche sur mesure. AlwaysAfro transforme ton profil unique
            en un plan beaute clair, actionnable et vraiment adapte a toi.
          </p>
          <div className="proof-grid">
            <article className="proof-card">
              <Leaf size={20} aria-hidden="true" />
              <h3>6 crit&egrave;res de matching</h3>
              <p>Porosit&eacute;, texture, densit&eacute;, &eacute;lasticit&eacute;, objectifs, probl&egrave;mes</p>
            </article>
            <article className="proof-card">
              <Target size={20} aria-hidden="true" />
              <h3>15 profils capillaires</h3>
              <p>De 3A &agrave; 4C avec sous-types — chaque texture reconnue</p>
            </article>
            <article className="proof-card">
              <Zap size={20} aria-hidden="true" />
              <h3>Donn&eacute;es first-party</h3>
              <p>Aucun algo tiers, tout calcul&eacute; sur ton profil r&eacute;el</p>
            </article>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginTop: '1.5rem', padding: '1rem', background: 'var(--color-surface-2)', borderRadius: '12px', border: '1px solid var(--color-border)' }}>
            <Image src="/logoAfroverse.png" alt="AlwaysAfro" width={120} height={36} style={{ objectFit: 'contain' }} />
            <p style={{ color: 'var(--color-text-muted)', fontSize: '0.92rem', fontWeight: 700 }}>
              Con&ccedil;u par des passionn&eacute;s de beaut&eacute; afro
            </p>
          </div>
        </section>

        <section className="section profile-preview-section">
          <div className="profile-preview-grid">
            <aside className="panel profile-preview-panel">
              <p className="panel-label">Exemple de profil genere</p>
              <div className="stack-sm">
                {[
                  { k: 'Texture', v: '4A - 4C' },
                  { k: 'Porosite', v: 'Haute' },
                  { k: 'Peau', v: 'Teint unifiant' },
                  { k: 'Objectif', v: 'Hydratation + eclat' },
                  { k: 'Plan', v: 'Routine complete + produits compatibles' }
                ].map((item) => (
                  <div key={item.k} className="mini-card">
                    <p className="mini-card-k">{item.k}</p>
                    <p className="mini-card-v">{item.v}</p>
                  </div>
                ))}
              </div>
            </aside>
            <div className="profile-preview-photo-wrap">
              <img
                src="/profilegenere.png"
                alt="Ton profil beaute AlwaysAfro"
                className="profile-preview-photo"
              />
              <div className="profile-preview-badge">
                <span className="profile-preview-badge-icon">✦</span>
                <div>
                  <p className="profile-preview-badge-title">Ton plan beaute 100% personnalise</p>
                  <p className="profile-preview-badge-sub">Adapte a tes cheveux, ta peau et tes objectifs</p>
                </div>
              </div>
            </div>
          </div>
          <div className="profile-preview-cta">
            <a href={appUrl} className="btn btn-primary">Decouvrir mon profil &rarr;</a>
          </div>
        </section>

        <section id="plan" className="section">
          <h2 className="section-title">C&apos;est plus simple que tu ne le penses.</h2>
          <p className="section-lead">3 etapes. Aucune expertise requise. Resultats immediats.</p>
          <div className="grid-3">
            {[
              {
                step: '01',
                title: 'Ton diagnostic',
                desc: 'Tu reponds a 5 questions sur ta texture, ta porosite et tes objectifs beaute. Pas de jargon. Juste des questions simples.'
              },
              {
                step: '02',
                title: 'Ton profil unique',
                desc: 'On genere ton profil cosmetique afro : type de cheveux, porosite, type de peau, priorites de soin. Tout ca en 2 minutes.'
              },
              {
                step: '03',
                title: 'Ta routine sur mesure',
                desc: 'Tu recois un plan beaute concret : les bons produits, dans le bon ordre, adaptes a ta texture ET ta peau.'
              }
            ].map((item) => (
              <article key={item.step} className="feature-card">
                <p className="feature-step">{item.step}</p>
                <h3 className="feature-title">{item.title}</h3>
                <p className="feature-desc">{item.desc}</p>
              </article>
            ))}
          </div>
          <div className="section-cta-center">
            <a href={appUrl} className="btn btn-primary">Je veux mon profil -&gt;</a>
          </div>
        </section>

        <section className="section fail-section">
          <h2 className="section-title">Sans routine adapt&eacute;e, rien ne change.</h2>
          <p className="section-lead" style={{ marginBottom: '1.5rem' }}>
            Chaque mois sans plan personnalise, c&apos;est encore de l&apos;argent gaspille sur des produits qui ne conviennent pas.
          </p>
          <div style={{ display: 'grid', gap: '0.875rem' }}>
            {[
              { emoji: '💸', text: 'Des centaines d\'euros gaspill\u00e9s en produits inad\u00e9quats' },
              { emoji: '⏳', text: 'Des ann\u00e9es \u00e0 chercher sans trouver ce qui marche vraiment' },
              { emoji: '😓', text: 'Une routine copi\u00e9e d\'internet qui ab\u00eeme plus qu\'elle ne r\u00e9pare' },
            ].map((item) => (
              <div
                key={item.emoji}
                style={{
                  borderLeft: '3px solid var(--color-primary)',
                  background: 'var(--color-surface)',
                  borderRadius: '0 12px 12px 0',
                  padding: '1rem 1.25rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                }}
              >
                <span style={{ fontSize: '1.4rem', flexShrink: 0 }}>{item.emoji}</span>
                <p style={{ color: 'var(--color-text)', fontWeight: 600, lineHeight: 1.5 }}>{item.text}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="section success-section">
          <h2 className="section-title">Avec AlwaysAfro, tu&hellip;</h2>
          <p className="section-lead">Imagine te regarder dans le miroir et te reconnaître. C&apos;est possible.</p>
          <div className="grid-3">
            {[
              { icon: '✅', text: 'Re\u00e7ois un plan sur-mesure bas\u00e9 sur ta texture r\u00e9elle' },
              { icon: '✅', text: 'Arr\u00eates de gaspiller — chaque produit recommand\u00e9 est compatible' },
              { icon: '✅', text: 'Suis ton \u00e9volution mois apr\u00e8s mois avec des photos et des scores' },
            ].map((item) => (
              <article key={item.icon + item.text} className="result-card" style={{ display: 'flex', alignItems: 'flex-start', gap: '0.6rem' }}>
                <span style={{ color: 'var(--color-secondary)', fontSize: '1.15rem', flexShrink: 0 }}>{item.icon}</span>
                <p>{item.text}</p>
              </article>
            ))}
          </div>
          <blockquote className="testimonial">
            <p>
              "Depuis mon diagnostic AlwaysAfro, j&apos;ai arrete de tatonner.
              Je sais exactement ce que mes cheveux et ma peau ont besoin."
            </p>
            <footer>- Amara K., Brussels</footer>
          </blockquote>
        </section>

        <div className="stats-box">
          {[
            { value: '12 000+', label: 'Profils analysés' },
            { value: '6', label: 'Critères de matching' },
            { value: '2 min', label: 'Pour ton diagnostic complet' },
          ].map((s) => (
            <div key={s.label} className="stat-card">
              <p className="stat-value">{s.value}</p>
              <p className="stat-label">{s.label}</p>
            </div>
          ))}
        </div>

        <section className="cta-band">
          <h2 className="cta-title">Ton profil beaute afro t&apos;attend.</h2>
          <p className="cta-text">
            Gratuit. 2 minutes. Aucune inscription requise pour commencer.
          </p>
          <a href={appUrl} className="btn btn-light">Demarrer mon diagnostic -&gt;</a>
          <p className="cta-reassurance">🔒 Gratuit · ⚡ Resultats immediats · 🌿 Fait pour toi</p>
        </section>

        <footer className="footer">
          <div className="brand brand-footer">
            <Image
              src="/logoAfroverse.png"
              alt="AlwaysAfro"
              width={196}
              height={60}
              className="brand-logo brand-logo-footer"
            />
          </div>
          <div className="footer-links">
            <a href="/partenaires">Partenaires marques</a>
            <a href="#">Mentions legales</a>
            <a href="#">Contact</a>
          </div>
          <p className="footer-tagline">La plateforme cosmetique afro qui te connait vraiment.</p>
        </footer>
      </div>
    </main>
  )
}
