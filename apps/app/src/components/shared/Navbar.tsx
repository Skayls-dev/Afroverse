import { Link } from 'react-router-dom'
import { User, BarChart2, Star, Scissors, BookOpen } from 'lucide-react'

export default function Navbar() {
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-[var(--color-surface)] border-t border-[var(--color-border)] px-4 py-2 flex justify-around items-center md:top-0 md:bottom-auto md:border-t-0 md:border-b">
      <Link to="/diagnostic" className="flex flex-col items-center text-xs text-[var(--color-text-muted)] hover:text-[var(--color-secondary)] transition-colors">
        <Scissors size={20} />
        <span>Diagnostic</span>
      </Link>
      <Link to="/suivi" className="flex flex-col items-center text-xs text-[var(--color-text-muted)] hover:text-[var(--color-secondary)] transition-colors">
        <BarChart2 size={20} />
        <span>Suivi</span>
      </Link>
      <Link to="/routines" className="flex flex-col items-center text-xs text-[var(--color-text-muted)] hover:text-[var(--color-secondary)] transition-colors">
        <BookOpen size={20} />
        <span>Routines</span>
      </Link>
      <Link to="/recommandations" className="flex flex-col items-center text-xs text-[var(--color-text-muted)] hover:text-[var(--color-secondary)] transition-colors">
        <Star size={20} />
        <span>Produits</span>
      </Link>
      <Link to="/profil" className="flex flex-col items-center text-xs text-[var(--color-text-muted)] hover:text-[var(--color-secondary)] transition-colors">
        <User size={20} />
        <span>Profil</span>
      </Link>
    </nav>
  )
}
