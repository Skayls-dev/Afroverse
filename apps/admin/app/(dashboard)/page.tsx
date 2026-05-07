export const dynamic = 'force-dynamic'

import Link from 'next/link'
import { supabase } from '@/lib/supabase'

async function getStats() {
  const [produits, etapes, marques, profils] = await Promise.all([
    supabase.from('produits').select('id', { count: 'exact', head: true }),
    supabase.from('etapes_routines').select('id', { count: 'exact', head: true }),
    supabase.from('marques').select('id', { count: 'exact', head: true }).eq('actif', true),
    supabase.from('profils').select('id', { count: 'exact', head: true }),
  ])
  return {
    produits: produits.count ?? 0,
    etapes: etapes.count ?? 0,
    marques: marques.count ?? 0,
    profils: profils.count ?? 0,
  }
}

async function getLatestProduits() {
  const { data } = await supabase
    .from('produits')
    .select('id, nom, marque, categorie, created_at')
    .order('created_at', { ascending: false })
    .limit(5)
  return data ?? []
}

export default async function DashboardPage() {
  const [stats, latest] = await Promise.all([getStats(), getLatestProduits()])

  const CARDS = [
    { label: 'Produits', value: stats.produits, href: '/produits', color: 'text-orange-400' },
    { label: 'Étapes routine', value: stats.etapes, href: '/etapes', color: 'text-sky-400' },
    { label: 'Marques actives', value: stats.marques, href: '/marques', color: 'text-emerald-400' },
    { label: 'Utilisateurs', value: stats.profils, href: '#', color: 'text-violet-400' },
  ]

  return (
    <div>
      <h1 className="text-xl font-semibold text-slate-100 mb-6">Vue d'ensemble</h1>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
        {CARDS.map(({ label, value, href, color }) => (
          <Link
            key={label}
            href={href}
            className="bg-slate-900 border border-slate-800 rounded-xl p-5 hover:border-slate-700 transition-colors"
          >
            <p className="text-slate-500 text-xs uppercase tracking-wider mb-1">{label}</p>
            <p className={`text-3xl font-bold ${color}`}>{value}</p>
          </Link>
        ))}
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden">
        <div className="px-5 py-4 border-b border-slate-800 flex items-center justify-between">
          <h2 className="text-sm font-medium text-slate-300">Derniers produits ajoutés</h2>
          <Link href="/produits/nouveau" className="text-xs text-orange-400 hover:text-orange-300 transition-colors">
            + Nouveau
          </Link>
        </div>
        <table className="w-full text-sm">
          <thead>
            <tr className="text-slate-500 text-xs uppercase tracking-wider border-b border-slate-800">
              <th className="text-left px-5 py-3">Nom</th>
              <th className="text-left px-5 py-3">Marque</th>
              <th className="text-left px-5 py-3">Catégorie</th>
              <th className="text-right px-5 py-3">Ajouté le</th>
            </tr>
          </thead>
          <tbody>
            {latest.map((p) => (
              <tr key={p.id} className="border-b border-slate-800/50 hover:bg-slate-800/30 transition-colors">
                <td className="px-5 py-3 text-slate-200">
                  <Link href={`/produits/${p.id}`} className="hover:text-orange-400 transition-colors">
                    {p.nom}
                  </Link>
                </td>
                <td className="px-5 py-3 text-slate-400">{p.marque ?? '—'}</td>
                <td className="px-5 py-3">
                  {p.categorie && (
                    <span className="text-xs bg-slate-800 text-slate-300 px-2 py-0.5 rounded-full">{p.categorie}</span>
                  )}
                </td>
                <td className="px-5 py-3 text-right text-slate-500 font-mono text-xs">
                  {new Date(p.created_at).toLocaleDateString('fr-FR')}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
