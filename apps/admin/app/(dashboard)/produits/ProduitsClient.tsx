'use client'

import { useState } from 'react'
import Link from 'next/link'
import type { Produit } from '@/lib/types'
import { TYPES_CHEVEUX, POROSITES, CATEGORIES_PRODUIT } from '@/lib/constants'

export default function ProduitsClient({ produits }: { produits: Produit[] }) {
  const [search, setSearch] = useState('')
  const [filterCat, setFilterCat] = useState('')
  const [filterType, setFilterType] = useState('')
  const [filterPorosite, setFilterPorosite] = useState('')

  const filtered = produits.filter((p) => {
    if (search && !p.nom.toLowerCase().includes(search.toLowerCase()) && !(p.marque ?? '').toLowerCase().includes(search.toLowerCase())) return false
    if (filterCat && !(p.categories ?? []).includes(filterCat)) return false
    if (filterType && !(p.types_compatibles ?? []).includes(filterType)) return false
    if (filterPorosite && !(p.porosites_compatibles ?? []).includes(filterPorosite)) return false
    return true
  })

  return (
    <>
      <div className="flex flex-wrap gap-3 mb-4">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Rechercher nom / marque…"
          className="bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-orange-500 transition-colors w-56"
        />
        <select value={filterCat} onChange={(e) => setFilterCat(e.target.value)} className="bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-sm text-slate-300 focus:outline-none focus:border-orange-500 transition-colors">
          <option value="">Toutes catégories</option>
          {CATEGORIES_PRODUIT.map((c) => <option key={c} value={c}>{c}</option>)}
        </select>
        <select value={filterType} onChange={(e) => setFilterType(e.target.value)} className="bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-sm text-slate-300 focus:outline-none focus:border-orange-500 transition-colors">
          <option value="">Tous types</option>
          {TYPES_CHEVEUX.map((t) => <option key={t} value={t}>{t}</option>)}
        </select>
        <select value={filterPorosite} onChange={(e) => setFilterPorosite(e.target.value)} className="bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-sm text-slate-300 focus:outline-none focus:border-orange-500 transition-colors">
          <option value="">Toutes porosités</option>
          {POROSITES.map((p) => <option key={p} value={p}>{p}</option>)}
        </select>
        {(search || filterCat || filterType || filterPorosite) && (
          <button onClick={() => { setSearch(''); setFilterCat(''); setFilterType(''); setFilterPorosite('') }} className="text-sm text-slate-400 hover:text-slate-200 transition-colors">
            ✕ Effacer
          </button>
        )}
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-slate-500 text-xs uppercase tracking-wider border-b border-slate-800">
              <th className="text-left px-5 py-3">Nom</th>
              <th className="text-left px-5 py-3">Marque</th>
              <th className="text-center px-5 py-3">Photos</th>
              <th className="text-left px-5 py-3">Catégorie</th>
              <th className="text-left px-5 py-3">Types</th>
              <th className="text-left px-5 py-3">Porosités</th>
              <th className="text-right px-5 py-3">Prix</th>
              <th className="text-right px-5 py-3"></th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 && (
              <tr><td colSpan={8} className="px-5 py-8 text-center text-slate-500">Aucun produit trouvé</td></tr>
            )}
            {filtered.map((p) => (
              <tr key={p.id} className="border-b border-slate-800/50 hover:bg-slate-800/30 transition-colors">
                <td className="px-5 py-3 text-slate-200 font-medium">{p.nom}</td>
                <td className="px-5 py-3 text-slate-400">{p.marque ?? '—'}</td>
                <td className="px-5 py-3 text-center">
                  <span className="text-xs bg-slate-800 text-slate-300 px-2 py-0.5 rounded-full">{p.photo_urls?.length ?? 0}</span>
                </td>
                <td className="px-5 py-3">
                  <div className="flex flex-wrap gap-1">
                    {(p.categories ?? []).map((c) => (
                      <span key={c} className="text-xs bg-slate-800 text-slate-300 px-2 py-0.5 rounded-full">{c}</span>
                    ))}
                  </div>
                </td>
                <td className="px-5 py-3">
                  <div className="flex flex-wrap gap-1">
                    {(p.types_compatibles ?? []).map((t) => (
                      <span key={t} className="text-xs bg-orange-500/20 text-orange-300 px-1.5 py-0.5 rounded">{t}</span>
                    ))}
                  </div>
                </td>
                <td className="px-5 py-3">
                  <div className="flex flex-wrap gap-1">
                    {(p.porosites_compatibles ?? []).map((por) => (
                      <span key={por} className="text-xs bg-sky-500/20 text-sky-300 px-1.5 py-0.5 rounded">{por}</span>
                    ))}
                  </div>
                </td>
                <td className="px-5 py-3 text-right text-slate-400 font-mono text-xs">
                  {p.prix != null ? `${p.prix.toFixed(2)} €` : '—'}
                </td>
                <td className="px-5 py-3 text-right">
                  <Link href={`/produits/${p.id}`} className="text-xs text-orange-400 hover:text-orange-300 transition-colors">
                    Éditer →
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  )
}
