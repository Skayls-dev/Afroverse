import { Routes, Route } from 'react-router-dom'
import Login from './Login'
import Register from './Register'
import Diagnostic from './Diagnostic'
import Suivi from './Suivi'
import Recommandations from './Recommandations'
import Profil from './Profil'
import ProtectedRoute from '../components/shared/ProtectedRoute'

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route element={<ProtectedRoute />}>
        <Route path="/" element={<Diagnostic />} />
        <Route path="/diagnostic" element={<Diagnostic />} />
        <Route path="/suivi" element={<Suivi />} />
        <Route path="/recommandations" element={<Recommandations />} />
        <Route path="/profil" element={<Profil />} />
      </Route>
    </Routes>
  )
}
