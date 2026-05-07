import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

async function login(formData: FormData) {
  'use server'
  const password = formData.get('password') as string
  if (password === process.env.ADMIN_PASSWORD) {
    const cookieStore = cookies()
    cookieStore.set('admin-auth', password, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 86400 * 7,
      path: '/',
      sameSite: 'lax',
    })
    redirect('/')
  }
}

export default function LoginPage({
  searchParams,
}: {
  searchParams: { error?: string }
}) {
  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <span className="text-orange-500 font-bold text-2xl tracking-widest uppercase">AlwaysAfro</span>
          <p className="text-slate-500 text-sm mt-1">Interface d'administration</p>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-xl p-8">
          <form action={login} className="space-y-4">
            <div>
              <label htmlFor="password" className="block text-sm text-slate-400 mb-1.5">
                Mot de passe
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                autoFocus
                className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2.5 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-orange-500 transition-colors"
                placeholder="••••••••"
              />
            </div>

            {searchParams.error && (
              <p className="text-red-400 text-sm">Mot de passe incorrect.</p>
            )}

            <button
              type="submit"
              className="w-full bg-orange-500 hover:bg-orange-600 text-white font-medium py-2.5 rounded-lg text-sm transition-colors"
            >
              Connexion
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
