import Link from 'next/link'
import { supabase } from '@/lib/supabase'
import type { Produit } from '@/lib/types'
import ProduitsClient from './ProduitsClient'

export default async function ProduitsPage() {
  const { data } = await supabase
    .from('produits')
    .select('*')
    .order('created_at', { ascending: false })

  const produits: Produit[] = data ?? []

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-xl font-semibold text-slate-100">Produits <span className="text-slate-500 font-normal text-base ml-1">({produits.length})</span></h1>
        <div className="flex gap-2">
          <Link href="/produits/import" className="px-3 py-2 text-sm border border-slate-700 rounded-lg text-slate-300 hover:border-slate-600 transition-colors">
            ↑ Importer CSV
          </Link>
          <Link href="/produits/nouveau" className="px-3 py-2 text-sm bg-orange-500 hover:bg-orange-600 text-white rounded-lg transition-colors">
            + Nouveau produit
          </Link>
        </div>
      </div>

      <ProduitsClient produits={produits} />
    </div>
  )
}
