import { useNavigate } from 'react-router-dom'
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'
import Navbar from '../components/shared/Navbar'
import { useAuth } from '../hooks/useAuth'
import { useProfil } from '../hooks/useProfil'
import { useSuivi } from '../hooks/useSuivi'

export default function Profil() {
  const navigate = useNavigate()
  const { user, signOut } = useAuth()
  const { profil, loading } = useProfil(user?.id)
  const { suivis } = useSuivi(user?.id)

  const chartData = [...suivis]
    .reverse()
    .map((s) => ({
      mois: new Date(s.mois).toLocaleDateString('fr-FR', { month: 'short', year: '2-digit' }),
      hydratation: s.score_hydratation,
      brillance: s.score_brillance,
      casse: s.score_casse,
    }))

  return (
    <div className="app-shell pb-20 md:pt-16">
      <div className="max-w-lg mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold text-[var(--color-text)] mb-6">Mon profil</h1>
        {loading ? (
          <p className="app-muted">Chargement…</p>
        ) : (
          <div className="space-y-4">
            <div className="app-card p-4">
              <p className="app-muted text-sm">Email</p>
              <p className="text-[var(--color-text)]">{user?.email}</p>
            </div>
            {profil && (
              <>
                <div className="app-card p-4">
                  <p className="app-muted text-sm mb-1">Type de cheveux</p>
                  <span className="bg-[var(--color-secondary)]/15 text-[var(--color-secondary)] font-bold px-3 py-1 rounded-full text-sm">{profil.type_cheveux}</span>
                </div>
                <div className="app-card p-4">
                  <p className="app-muted text-sm mb-2">Caractéristiques</p>
                  <div className="flex gap-2 flex-wrap">
                    <span className="bg-[var(--color-surface-2)] text-[var(--color-text-muted)] px-2 py-1 rounded-full text-xs">Porosité {profil.porosite}</span>
                    <span className="bg-[var(--color-surface-2)] text-[var(--color-text-muted)] px-2 py-1 rounded-full text-xs">Élasticité {profil.elasticite}</span>
                    <span className="bg-[var(--color-surface-2)] text-[var(--color-text-muted)] px-2 py-1 rounded-full text-xs">Densité {profil.densite}</span>
                  </div>
                </div>
                {profil.objectifs.length > 0 && (
                  <div className="app-card p-4">
                    <p className="app-muted text-sm mb-2">Objectifs</p>
                    <div className="flex gap-2 flex-wrap">
                      {profil.objectifs.map((o) => (
                        <span key={o} className="bg-[var(--color-accent)]/15 text-[var(--color-accent)] px-2 py-1 rounded-full text-xs">{o}</span>
                      ))}
                    </div>
                  </div>
                )}
              </>
            )}

            {/* Évolution des scores */}
            <div className="app-card p-4">
              <p className="text-[var(--color-text)] font-semibold mb-4">Évolution de mes scores</p>
              {chartData.length < 2 ? (
                <p className="app-muted text-sm">
                  Ajoute ton premier suivi pour voir ton évolution →{' '}
                  <button
                    onClick={() => navigate('/suivi')}
                    className="text-[var(--color-secondary)] underline"
                  >
                    /suivi
                  </button>
                </p>
              ) : (
                <ResponsiveContainer width="100%" height={180}>
                  <LineChart data={chartData} margin={{ top: 4, right: 4, left: -28, bottom: 0 }}>
                    <XAxis dataKey="mois" tick={{ fill: '#6b7280', fontSize: 11 }} />
                    <YAxis domain={[0, 10]} tick={{ fill: '#6b7280', fontSize: 11 }} />
                    <Tooltip
                      contentStyle={{ background: '#FFF3E0', border: '1px solid #F0D9B5', borderRadius: 8 }}
                      labelStyle={{ color: '#6B5C4A', fontSize: 11 }}
                      itemStyle={{ fontSize: 12 }}
                    />
                    <Line type="monotone" dataKey="hydratation" stroke="#1D9E75" strokeWidth={2} dot={false} name="Hydratation" />
                    <Line type="monotone" dataKey="brillance" stroke="#534AB7" strokeWidth={2} dot={false} name="Brillance" />
                    <Line type="monotone" dataKey="casse" stroke="#EAB308" strokeWidth={2} dot={false} name="Casse" />
                  </LineChart>
                </ResponsiveContainer>
              )}
            </div>

            <button
              onClick={() => navigate('/diagnostic')}
              className="w-full bg-[var(--color-secondary)]/10 hover:bg-[var(--color-secondary)]/20 border border-[var(--color-secondary)]/30 text-[var(--color-secondary)] font-semibold py-3 rounded-xl transition-colors"
            >
              Refaire mon diagnostic
            </button>

            <button
              onClick={() => signOut()}
              className="w-full border border-red-400/40 hover:border-red-400 text-red-400 font-semibold py-3 rounded-xl transition-colors"
            >
              Se déconnecter
            </button>
          </div>
        )}
      </div>
      <Navbar />
    </div>
  )
}
