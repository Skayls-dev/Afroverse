import Link from 'next/link'
import CsvImporter from '@/components/CsvImporter'

export default function ImportPage() {
  return (
    <div>
      <div className="flex items-center gap-3 mb-6">
        <Link href="/produits" className="text-slate-500 hover:text-slate-300 text-sm transition-colors">← Produits</Link>
        <h1 className="text-xl font-semibold text-slate-100">Importer des produits CSV</h1>
      </div>
      <div className="max-w-3xl">
        <CsvImporter />
      </div>
    </div>
  )
}
