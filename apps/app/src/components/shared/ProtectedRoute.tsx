import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'

export default function ProtectedRoute() {
  const { user, loading } = useAuth()

  if (loading) {
    return (
      <div className="app-shell flex items-center justify-center">
        <div className="text-[var(--color-secondary)] text-xl">Chargement…</div>
      </div>
    )
  }

  return user ? <Outlet /> : <Navigate to="/login" replace />
}
