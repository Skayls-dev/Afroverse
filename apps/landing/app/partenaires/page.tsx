import ContactForm from './ContactForm'

const PLANS = [
  {
    name: 'Basic',
    price: 'Gratuit',
    color: 'border-white/20',
    badge: null,
    features: [
      'Accès dashboard anonymisé',
      '1 rapport mensuel',
      'Données agrégées par type de cheveux',
      'Support email',
    ],
  },
  {
    name: 'Pro',
    price: '199 €/mois',
    color: 'border-[#1D9E75]',
    badge: 'Populaire',
    features: [
      'Tout Basic inclus',
      'Filtres avancés type / porosité',
      'Export CSV illimité',
      '2 campagnes produit / mois',
      'Rapport hebdomadaire',
    ],
  },
  {
    name: 'Enterprise',
    price: 'Sur devis',
    color: 'border-[#534AB7]',
    badge: null,
    features: [
      'Tout Pro inclus',
      'Accès API données brutes',
      'Co-branding AfroVerse',
      'Étude capillaire custom',
      'Account manager dédié',
    ],
  },
]

const STATS = [
  { value: '15', label: 'profils capillaires distincts' },
  { value: '6', label: 'critères de matching' },
  { value: '100%', label: 'données first-party' },
]

export default function PartenairesPage() {
  return (
    <main className="min-h-screen bg-[#0f0f0f] text-white">
      {/* Hero */}
      <section className="max-w-4xl mx-auto px-6 pt-20 pb-16 text-center">
        <span className="inline-block bg-[#1D9E75]/15 text-[#1D9E75] text-xs font-semibold uppercase tracking-widest rounded-full px-4 py-1 mb-5">
          Espace Partenaires
        </span>
        <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
          Devenez partenaire <span className="text-[#1D9E75]">AfroVerse</span>
        </h1>
        <p className="text-gray-400 text-lg max-w-2xl mx-auto">
          Accédez à la première base de données de profils capillaires afro en France.
          Matchez vos produits avec les bons profils, sans approximation.
        </p>
      </section>

      {/* Stats */}
      <section className="border-y border-white/10 py-10">
        <div className="max-w-4xl mx-auto px-6 grid grid-cols-3 gap-4 text-center">
          {STATS.map((s) => (
            <div key={s.label}>
              <p className="text-3xl font-bold text-[#1D9E75]">{s.value}</p>
              <p className="text-gray-400 text-sm mt-1">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Plans */}
      <section className="max-w-4xl mx-auto px-6 py-16">
        <h2 className="text-2xl font-bold text-center mb-10">Choisissez votre plan</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {PLANS.map((plan) => (
            <div
              key={plan.name}
              className={`relative bg-white/5 border-2 ${plan.color} rounded-2xl p-6 flex flex-col`}
            >
              {plan.badge && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#1D9E75] text-white text-xs font-bold px-3 py-0.5 rounded-full">
                  {plan.badge}
                </span>
              )}
              <h3 className="text-lg font-bold mb-1">{plan.name}</h3>
              <p className="text-2xl font-bold text-white mb-5">{plan.price}</p>
              <ul className="space-y-2 flex-1">
                {plan.features.map((f) => (
                  <li key={f} className="text-sm text-gray-300 flex items-start gap-2">
                    <span className="text-[#1D9E75] flex-shrink-0 mt-0.5">✓</span>
                    {f}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* Formulaire */}
      <section className="max-w-xl mx-auto px-6 pb-20">
        <h2 className="text-2xl font-bold text-center mb-2">Parlons-en</h2>
        <p className="text-gray-400 text-sm text-center mb-8">
          Remplissez ce formulaire, notre équipe vous répond sous 48 h.
        </p>
        <ContactForm />
      </section>
    </main>
  )
}
