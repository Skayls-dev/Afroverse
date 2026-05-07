'use client'

import { useState, useRef } from 'react'
import { createClient } from '@supabase/supabase-js'

const CSV_HEADERS = ['nom', 'marque', 'categorie', 'types_compatibles', 'porosites_compatibles', 'ingredients', 'prix']

function parseCSV(text: string) {
  const lines = text.trim().split('\n')
  if (lines.length < 2) return []
  const headers = lines[0].split(',').map((h) => h.trim().replace(/^"|"$/g, ''))

  return lines.slice(1).map((line) => {
    const cols = line.split(',').map((c) => c.trim().replace(/^"|"$/g, ''))
    const row: Record<string, unknown> = {}
    headers.forEach((h, i) => {
      const val = cols[i] ?? ''
      if (['types_compatibles', 'porosites_compatibles', 'ingredients'].includes(h)) {
        row[h] = val ? val.split('|').map((v) => v.trim()).filter(Boolean) : []
      } else if (h === 'prix') {
        row[h] = val ? parseFloat(val) : null
      } else {
        row[h] = val || null
      }
    })
    return row
  })
}

const CSV_TEMPLATE = `nom,marque,categorie,types_compatibles,porosites_compatibles,ingredients,prix
Shampoing doux example,MaBrand,shampoing,3A|3B|4A,faible|normale,eau|huile de coco,12.90`

export default function CsvImporter() {
  const [rows, setRows] = useState<Record<string, unknown>[]>([])
  const [result, setResult] = useState<{ imported: number; errors: number } | null>(null)
  const [loading, setLoading] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = (ev) => {
      const text = ev.target?.result as string
      setRows(parseCSV(text))
      setResult(null)
    }
    reader.readAsText(file)
  }

  async function handleImport() {
    if (!rows.length) return
    setLoading(true)

    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    )

    let imported = 0
    let errors = 0
    for (const row of rows) {
      const { error } = await supabase.from('produits').insert(row)
      if (error) errors++
      else imported++
    }

    setResult({ imported, errors })
    setLoading(false)
    setRows([])
    if (inputRef.current) inputRef.current.value = ''
  }

  function downloadTemplate() {
    const blob = new Blob([CSV_TEMPLATE], { type: 'text/csv' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'template_produits.csv'
    a.click()
    URL.revokeObjectURL(url)
  }

  const preview = rows.slice(0, 5)

  return (
    <div className="space-y-5">
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-sm font-medium text-slate-300">Fichier CSV</h2>
          <button onClick={downloadTemplate} className="text-xs text-orange-400 hover:text-orange-300 transition-colors">
            ↓ Télécharger le template
          </button>
        </div>

        <p className="text-xs text-slate-500 mb-3">
          Colonnes attendues (séparées par virgule) :<br />
          <code className="text-slate-400">{CSV_HEADERS.join(', ')}</code><br />
          Les colonnes array (<code className="text-slate-400">types_compatibles</code>, <code className="text-slate-400">porosites_compatibles</code>, <code className="text-slate-400">ingredients</code>) utilisent <code className="text-slate-400">|</code> comme séparateur.
        </p>

        <input
          ref={inputRef}
          type="file"
          accept=".csv"
          onChange={handleFile}
          className="block text-sm text-slate-400 file:mr-3 file:py-2 file:px-3 file:rounded-lg file:border-0 file:text-xs file:bg-slate-800 file:text-slate-300 hover:file:bg-slate-700 file:cursor-pointer"
        />
      </div>

      {preview.length > 0 && (
        <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden">
          <div className="px-5 py-3 border-b border-slate-800 flex items-center justify-between">
            <p className="text-sm text-slate-300">Aperçu — {rows.length} ligne(s) détectée(s)</p>
            <button
              onClick={handleImport}
              disabled={loading}
              className="px-4 py-1.5 bg-orange-500 hover:bg-orange-600 disabled:opacity-50 text-white text-sm rounded-lg transition-colors"
            >
              {loading ? 'Import en cours…' : `Importer ${rows.length} produits`}
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="border-b border-slate-800 text-slate-500 uppercase tracking-wider">
                  {CSV_HEADERS.map((h) => <th key={h} className="text-left px-4 py-2">{h}</th>)}
                </tr>
              </thead>
              <tbody>
                {preview.map((row, i) => (
                  <tr key={i} className="border-b border-slate-800/50">
                    {CSV_HEADERS.map((h) => (
                      <td key={h} className="px-4 py-2 text-slate-400 max-w-32 truncate">
                        {Array.isArray(row[h]) ? (row[h] as string[]).join(', ') : String(row[h] ?? '')}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {rows.length > 5 && (
            <p className="px-5 py-2 text-xs text-slate-600">… et {rows.length - 5} autre(s) ligne(s)</p>
          )}
        </div>
      )}

      {result && (
        <div className={`p-4 rounded-xl border text-sm ${result.errors === 0 ? 'bg-emerald-900/20 border-emerald-800 text-emerald-300' : 'bg-amber-900/20 border-amber-800 text-amber-300'}`}>
          ✓ {result.imported} produit(s) importé(s){result.errors > 0 && ` — ${result.errors} erreur(s)`}
        </div>
      )}
    </div>
  )
}
