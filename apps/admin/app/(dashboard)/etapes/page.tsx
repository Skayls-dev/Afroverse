export const dynamic = 'force-dynamic'

import Link from 'next/link'
import { supabase } from '@/lib/supabase'
import type { EtapeRoutine } from '@/lib/types'

export default async function EtapesPage() {
  const { data } = await supabase
    .from('etapes_routines')
    .select('*')
    .order('ordre_defaut', { ascending: true })

  const etapes: EtapeRoutine[] = data ?? []

  return (
    <div>
      <h1 className="text-xl font-semibold text-slate-100 mb-6">Étapes de routine <span className="text-slate-500 font-normal text-base ml-1">({etapes.length})</span></h1>

      <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-slate-500 text-xs uppercase tracking-wider border-b border-slate-800">
              <th className="text-left px-5 py-3 w-8">#</th>
              <th className="text-left px-5 py-3">Étape</th>
              <th className="text-left px-5 py-3">Fréquence</th>
              <th className="text-left px-5 py-3">Types</th>
              <th className="text-center px-5 py-3">Universelle</th>
              <th className="text-center px-5 py-3">Premium</th>
              <th className="text-right px-5 py-3"></th>
            </tr>
          </thead>
          <tbody>
            {etapes.map((e) => (
              <tr key={e.id} className="border-b border-slate-800/50 hover:bg-slate-800/30 transition-colors">
                <td className="px-5 py-3 text-slate-500 font-mono text-xs">{e.ordre_defaut}</td>
                <td className="px-5 py-3">
                  <div className="flex items-center gap-2">
                    <span className="text-lg">{e.emoji}</span>
                    <div>
                      <p className="text-slate-200 font-medium">{e.titre}</p>
                      <p className="text-slate-500 text-xs font-mono">{e.slug}</p>
                    </div>
                  </div>
                </td>
                <td className="px-5 py-3 text-slate-400 text-xs max-w-32 truncate">{e.frequence}</td>
                <td className="px-5 py-3">
                  <div className="flex flex-wrap gap-1">
                    {(e.types_compatibles ?? []).map((t) => (
                      <span key={t} className="text-xs bg-orange-500/20 text-orange-300 px-1.5 py-0.5 rounded">{t}</span>
                    ))}
                  </div>
                </td>
                <td className="px-5 py-3 text-center">
                  {e.universelle
                    ? <span className="text-xs bg-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded-full">Oui</span>
                    : <span className="text-xs bg-slate-800 text-slate-500 px-2 py-0.5 rounded-full">Non</span>}
                </td>
                <td className="px-5 py-3 text-center">
                  {e.premium
                    ? <span className="text-xs bg-violet-500/20 text-violet-400 px-2 py-0.5 rounded-full">Premium</span>
                    : <span className="text-slate-600 text-xs">—</span>}
                </td>
                <td className="px-5 py-3 text-right">
                  <Link href={`/etapes/${e.id}`} className="text-xs text-orange-400 hover:text-orange-300 transition-colors">
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
