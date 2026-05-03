import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'
import { LogOut, User, BarChart2, Star, Scissors } from 'lucide-react'

export default function Navbar() {
  const { user, signOut } = useAuth()
  const navigate = useNavigate()

  const handleSignOut = async () => {
    await signOut()
    navigate('/login')
  }

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-[#0f0f0f] border-t border-white/10 px-4 py-2 flex justify-around items-center md:top-0 md:bottom-auto md:border-t-0 md:border-b">
      <Link to="/diagnostic" className="flex flex-col items-center text-xs text-gray-400 hover:text-[#1D9E75] transition-colors">
        <Scissors size={20} />
        <span>Diagnostic</span>
      </Link>
      <Link to="/suivi" className="flex flex-col items-center text-xs text-gray-400 hover:text-[#1D9E75] transition-colors">
        <BarChart2 size={20} />
        <span>Suivi</span>
      </Link>
      <Link to="/recommandations" className="flex flex-col items-center text-xs text-gray-400 hover:text-[#1D9E75] transition-colors">
        <Star size={20} />
        <span>Produits</span>
      </Link>
      <Link to="/profil" className="flex flex-col items-center text-xs text-gray-400 hover:text-[#1D9E75] transition-colors">
        <User size={20} />
        <span>Profil</span>
      </Link>
      {user && (
        <button onClick={handleSignOut} className="flex flex-col items-center text-xs text-gray-400 hover:text-red-400 transition-colors">
          <LogOut size={20} />
          <span>Sortir</span>
        </button>
      )}
    </nav>
  )
}
