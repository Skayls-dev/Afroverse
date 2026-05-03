import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'

export default function ProtectedRoute() {
  const { user, loading } = useAuth()

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0f0f0f]">
        <div className="text-[#1D9E75] text-xl">Chargement…</div>
      </div>
    )
  }

  return user ? <Outlet /> : <Navigate to="/login" replace />
}
