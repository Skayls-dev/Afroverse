import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { supabase } from '../lib/supabase'

export default function Register() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [prenom, setPrenom] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setLoading(true)
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { prenom } }
    })
    if (error) {
      setError(error.message)
    } else {
      navigate('/diagnostic')
    }
    setLoading(false)
  }

  return (
    <div className="app-shell flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <a href={import.meta.env.VITE_LANDING_URL ?? 'http://localhost:3000'}>
          <img
            src="/logoAfroverse.png"
            alt="AlwaysAfro"
            className="mx-auto mb-3 w-44 sm:w-48 h-auto cursor-pointer"
          />
        </a>
        <p className="app-muted text-center mb-8">Crée ton compte gratuit</p>
        <form onSubmit={handleSubmit} className="space-y-4 app-card p-4 sm:p-5">
          <input
            type="text"
            value={prenom}
            onChange={(e) => setPrenom(e.target.value)}
            placeholder="Prénom"
            required
            autoComplete="given-name"
            className="w-full bg-[var(--color-bg)] border border-[var(--color-border)] rounded-xl px-4 py-3 text-[var(--color-text)] placeholder-[var(--color-text-muted)] focus:outline-none focus:border-[var(--color-secondary)]"
          />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            required
            autoComplete="email"
            className="w-full bg-[var(--color-bg)] border border-[var(--color-border)] rounded-xl px-4 py-3 text-[var(--color-text)] placeholder-[var(--color-text-muted)] focus:outline-none focus:border-[var(--color-secondary)]"
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Mot de passe (min. 8 caractères)"
            required
            minLength={8}
            autoComplete="new-password"
            className="w-full bg-[var(--color-bg)] border border-[var(--color-border)] rounded-xl px-4 py-3 text-[var(--color-text)] placeholder-[var(--color-text-muted)] focus:outline-none focus:border-[var(--color-secondary)]"
          />
          {error && <p className="text-red-400 text-sm">{error}</p>}
          <button
            type="submit"
            disabled={loading}
            className="w-full app-btn-primary disabled:opacity-50 font-semibold py-3 rounded-xl transition-colors"
          >
            {loading ? 'Création…' : 'Créer mon compte'}
          </button>
        </form>
        <p className="app-muted text-sm text-center mt-6">
          Déjà un compte ?{' '}
          <Link to="/login" className="text-[var(--color-accent)] hover:underline">Se connecter</Link>
        </p>
      </div>
    </div>
  )
}
