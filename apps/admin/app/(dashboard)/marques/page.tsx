import Link from 'next/link'
import { supabase } from '@/lib/supabase'
import type { MarqueB2B } from '@/lib/types'

const PLAN_COLORS: Record<string, string> = {
  basic: 'bg-slate-700 text-slate-300',
  pro: 'bg-sky-500/20 text-sky-300',
  enterprise: 'bg-violet-500/20 text-violet-300',
}

export default async function MarquesPage() {
  const { data } = await supabase
    .from('marques')
    .select('*')
    .order('created_at', { ascending: false })

  const marques: MarqueB2B[] = data ?? []

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-xl font-semibold text-slate-100">Marques B2B <span className="text-slate-500 font-normal text-base ml-1">({marques.length})</span></h1>
        <Link href="/marques/nouveau" className="px-3 py-2 text-sm bg-orange-500 hover:bg-orange-600 text-white rounded-lg transition-colors">
          + Nouveau partenaire
        </Link>
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-slate-500 text-xs uppercase tracking-wider border-b border-slate-800">
              <th className="text-left px-5 py-3">Nom</th>
              <th className="text-left px-5 py-3">Email</th>
              <th className="text-left px-5 py-3">Plan</th>
              <th className="text-center px-5 py-3">Actif</th>
              <th className="text-right px-5 py-3"></th>
            </tr>
          </thead>
          <tbody>
            {marques.length === 0 && (
              <tr><td colSpan={5} className="px-5 py-8 text-center text-slate-500">Aucune marque enregistrée</td></tr>
            )}
            {marques.map((m) => (
              <tr key={m.id} className="border-b border-slate-800/50 hover:bg-slate-800/30 transition-colors">
                <td className="px-5 py-3 text-slate-200 font-medium">{m.nom}</td>
                <td className="px-5 py-3 text-slate-400 font-mono text-xs">{m.email_contact ?? '—'}</td>
                <td className="px-5 py-3">
                  {m.plan ? (
                    <span className={`text-xs px-2 py-0.5 rounded-full ${PLAN_COLORS[m.plan] ?? 'bg-slate-800 text-slate-400'}`}>
                      {m.plan}
                    </span>
                  ) : <span className="text-slate-600">—</span>}
                </td>
                <td className="px-5 py-3 text-center">
                  {m.actif
                    ? <span className="text-xs bg-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded-full">Actif</span>
                    : <span className="text-xs bg-slate-800 text-slate-500 px-2 py-0.5 rounded-full">Inactif</span>}
                </td>
                <td className="px-5 py-3 text-right">
                  <Link href={`/marques/${m.id}`} className="text-xs text-orange-400 hover:text-orange-300 transition-colors">
                    Éditer →
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
