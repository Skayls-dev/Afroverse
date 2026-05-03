import Navbar from '../components/shared/Navbar'
import { useAuth } from '../hooks/useAuth'
import { useSuivi } from '../hooks/useSuivi'
// TODO: implémenter le formulaire d'ajout de suivi mensuel

export default function Suivi() {
  const { user } = useAuth()
  const { suivis, loading } = useSuivi(user?.id)

  return (
    <div className="min-h-screen bg-[#0f0f0f] pb-20 md:pt-16">
      <div className="max-w-lg mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold text-white mb-6">Suivi mensuel</h1>
        {loading ? (
          <p className="text-gray-400">Chargement…</p>
        ) : suivis.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-400 mb-4">Aucun suivi enregistré pour l&apos;instant.</p>
            {/* TODO: Ajouter bouton "Ajouter mon premier suivi" */}
          </div>
        ) : (
          <div className="space-y-4">
            {suivis.map((s) => (
              <div key={s.id} className="bg-white/5 rounded-xl p-4 border border-white/10">
                <div className="text-sm text-gray-400 mb-2">{new Date(s.mois).toLocaleDateString('fr-FR', { month: 'long', year: 'numeric' })}</div>
                <div className="grid grid-cols-3 gap-2 text-center">
                  <div>
                    <div className="text-2xl font-bold text-[#1D9E75]">{s.score_hydratation}/10</div>
                    <div className="text-xs text-gray-500">Hydratation</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-[#534AB7]">{s.score_brillance}/10</div>
                    <div className="text-xs text-gray-500">Brillance</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-yellow-400">{s.score_casse}/10</div>
                    <div className="text-xs text-gray-500">Casse</div>
                  </div>
                </div>
                {s.notes && <p className="text-gray-400 text-sm mt-2">{s.notes}</p>}
              </div>
            ))}
          </div>
        )}
        {/* TODO: Ajouter formulaire de nouveau suivi */}
      </div>
      <Navbar />
    </div>
  )
}
