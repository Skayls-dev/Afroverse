import Navbar from '../components/shared/Navbar'
import { useAuth } from '../hooks/useAuth'
import { useProfil } from '../hooks/useProfil'

export default function Profil() {
  const { user, signOut } = useAuth()
  const { profil, loading } = useProfil(user?.id)

  return (
    <div className="min-h-screen bg-[#0f0f0f] pb-20 md:pt-16">
      <div className="max-w-lg mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold text-white mb-6">Mon profil</h1>
        {loading ? (
          <p className="text-gray-400">Chargement…</p>
        ) : (
          <div className="space-y-4">
            <div className="bg-white/5 rounded-xl p-4 border border-white/10">
              <p className="text-gray-400 text-sm">Email</p>
              <p className="text-white">{user?.email}</p>
            </div>
            {profil && (
              <>
                <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                  <p className="text-gray-400 text-sm mb-1">Type de cheveux</p>
                  <span className="bg-[#1D9E75]/20 text-[#1D9E75] font-bold px-3 py-1 rounded-full text-sm">{profil.type_cheveux}</span>
                </div>
                <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                  <p className="text-gray-400 text-sm mb-2">Caractéristiques</p>
                  <div className="flex gap-2 flex-wrap">
                    <span className="bg-white/10 text-gray-300 px-2 py-1 rounded-full text-xs">Porosité {profil.porosite}</span>
                    <span className="bg-white/10 text-gray-300 px-2 py-1 rounded-full text-xs">Élasticité {profil.elasticite}</span>
                    <span className="bg-white/10 text-gray-300 px-2 py-1 rounded-full text-xs">Densité {profil.densite}</span>
                  </div>
                </div>
                {profil.objectifs.length > 0 && (
                  <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                    <p className="text-gray-400 text-sm mb-2">Objectifs</p>
                    <div className="flex gap-2 flex-wrap">
                      {profil.objectifs.map((o) => (
                        <span key={o} className="bg-[#534AB7]/20 text-[#534AB7] px-2 py-1 rounded-full text-xs">{o}</span>
                      ))}
                    </div>
                  </div>
                )}
              </>
            )}
            <button
              onClick={() => signOut()}
              className="w-full border border-red-400/40 hover:border-red-400 text-red-400 font-semibold py-3 rounded-xl transition-colors"
            >
              Se déconnecter
            </button>
            {/* TODO: Ajouter édition du profil */}
          </div>
        )}
      </div>
      <Navbar />
    </div>
  )
}
