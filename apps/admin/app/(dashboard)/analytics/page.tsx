import { supabase } from '@/lib/supabase'
import type { CompatibiliteProduit } from '@/lib/types'

export default async function AnalyticsPage() {
  // Tentative de fetch de la vue si elle existe, sinon calcul manual
  let rows: CompatibiliteProduit[] = []

  const { data: viewData, error } = await supabase
    .from('compatibilite_produits')
    .select('*')
    .order('nb_profils_compatibles', { ascending: false })

  if (!error && viewData) {
    rows = viewData as CompatibiliteProduit[]
  } else {
    // Fallback : liste produits sans analytics
    const { data: produits } = await supabase
      .from('produits')
      .select('id, nom, marque, categories')
      .order('created_at', { ascending: false })
      .limit(50)
    rows = (produits ?? []).map((p) => ({
      ...p,
      categorie: (p.categories ?? []).join(', ') || null,
      nb_profils_compatibles: 0,
      pct_base_totale: 0,
      porosite_cible_principale: null,
    }))
  }

  const maxCompat = Math.max(...rows.map((r) => r.nb_profils_compatibles), 1)

  return (
    <div>
      <h1 className="text-xl font-semibold text-slate-100 mb-2">Analytics — Compatibilité produits</h1>
      <p className="text-slate-500 text-sm mb-6">Produits triés par nombre de profils utilisateurs compatibles.</p>

      <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-slate-500 text-xs uppercase tracking-wider border-b border-slate-800">
              <th className="text-left px-5 py-3">Produit</th>
              <th className="text-left px-5 py-3">Marque</th>
              <th className="text-left px-5 py-3">Catégorie</th>
              <th className="text-left px-5 py-3 w-48">Compatibilité</th>
              <th className="text-right px-5 py-3">% base</th>
              <th className="text-left px-5 py-3">Porosité principale</th>
            </tr>
          </thead>
          <tbody>
            {rows.length === 0 && (
              <tr><td colSpan={6} className="px-5 py-8 text-center text-slate-500">Aucune donnée</td></tr>
            )}
            {rows.map((r) => (
              <tr key={r.id} className="border-b border-slate-800/50 hover:bg-slate-800/30 transition-colors">
                <td className="px-5 py-3 text-slate-200 font-medium">{r.nom}</td>
                <td className="px-5 py-3 text-slate-400">{r.marque ?? '—'}</td>
                <td className="px-5 py-3">
                  {r.categorie && <span className="text-xs bg-slate-800 text-slate-300 px-2 py-0.5 rounded-full">{r.categorie}</span>}
                </td>
                <td className="px-5 py-3">
                  <div className="flex items-center gap-2">
                    <div className="flex-1 bg-slate-800 rounded-full h-1.5 overflow-hidden">
                      <div
                        className="h-full bg-orange-500 rounded-full transition-all"
                        style={{ width: `${(r.nb_profils_compatibles / maxCompat) * 100}%` }}
                      />
                    </div>
                    <span className="text-xs text-slate-400 w-6 text-right">{r.nb_profils_compatibles}</span>
                  </div>
                </td>
                <td className="px-5 py-3 text-right text-slate-400 font-mono text-xs">
                  {r.pct_base_totale > 0 ? `${r.pct_base_totale.toFixed(1)}%` : '—'}
                </td>
                <td className="px-5 py-3">
                  {r.porosite_cible_principale ? (
                    <span className="text-xs bg-sky-500/20 text-sky-300 px-2 py-0.5 rounded-full">{r.porosite_cible_principale}</span>
                  ) : <span className="text-slate-600">—</span>}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
