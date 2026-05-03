import Image from 'next/image'
import { Leaf, Target, Zap } from 'lucide-react'

export default function Home() {
  const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? 'http://localhost:5173'

  return (
    <main className="page-shell">
      <div className="container">
        <header className="topbar">
          <a href="/" className="brand" aria-label="AfroVerse">
            <Image
              src="/logoAfroverse.png"
              alt="AfroVerse"
              width={236}
              height={72}
              priority
              className="brand-logo"
            />
          </a>
          <nav className="topbar-nav">
            <a href="#plan" className="topbar-link">Comment ca marche</a>
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
              Arrete de chercher. AfroVerse analyse ta texture, ta porosite et ta peau afro
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
          <h2 className="section-title">AfroVerse a ete cree pour ca.</h2>
          <p className="section-lead">
            On sait ce que c\'est - passer des heures a chercher, essayer, decevoir. La cosmetique afro est riche,
            diverse, puissante. Mais elle demande une approche sur mesure. AfroVerse transforme ton profil unique
            en un plan beaute clair, actionnable et vraiment adapte a toi.
          </p>
          <div className="proof-grid">
            <article className="proof-card">
              <Leaf size={20} aria-hidden="true" />
              <h3>Base sur des donnees reelles</h3>
              <p>12 000+ profils analyses</p>
            </article>
            <article className="proof-card">
              <Target size={20} aria-hidden="true" />
              <h3>Cheveux ET peau</h3>
              <p>Une approche beaute complete, pas juste capillaire</p>
            </article>
            <article className="proof-card">
              <Zap size={20} aria-hidden="true" />
              <h3>2 minutes chrono</h3>
              <p>Resultats immediats, sans jargon</p>
            </article>
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
                alt="Ton profil beaute AfroVerse"
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
          <h2 className="section-title">Sans routine adaptee, rien ne change.</h2>
          <p className="section-lead">
            Chaque mois sans plan personnalise, c&apos;est encore de l&apos;argent gaspille sur des produits qui ne conviennent pas.
            C&apos;est encore des cheveux qui cassent, une peau qui terne, une confiance qui s&apos;effrite. AfroVerse t&apos;aide a arreter ce cycle.
          </p>
        </section>

        <section className="section success-section">
          <h2 className="section-title">Imagine te regarder dans le miroir et te reconnaitre.</h2>
          <div className="grid-3">
            {[
              '✨ Des cheveux hydrates, definis, en pleine sante',
              '🌟 Une peau qui rayonne, enfin dans le bon programme',
              '💪 Une routine que tu maitrises - sans te tromper de produit'
            ].map((item) => (
              <article key={item} className="result-card">
                <p>{item}</p>
              </article>
            ))}
          </div>
          <blockquote className="testimonial">
            <p>
              "Depuis mon diagnostic AfroVerse, j&apos;ai arrete de tatonner.
              Je sais exactement ce que mes cheveux et ma peau ont besoin."
            </p>
            <footer>- Amara K., Brussels</footer>
          </blockquote>
        </section>

        <section className="cta-band">
          <h2 className="cta-title">Ton profil beaute afro t&apos;attend.</h2>
          <p className="cta-text">
            Gratuit. 2 minutes. Aucune inscription requise pour commencer.
          </p>
          <a href={appUrl} className="btn btn-light">Demarrer mon diagnostic -&gt;</a>
          <p className="cta-reassurance">🔒 Gratuit · ⚡ Resultats immediats · 🌿 Fait pour toi</p>
        </section>

        <footer className="footer">
          <a href="/" className="brand brand-footer" aria-label="AfroVerse">
            <Image
              src="/logoAfroverse.png"
              alt="AfroVerse"
              width={196}
              height={60}
              className="brand-logo brand-logo-footer"
            />
          </a>
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
