'use client'

import { useState } from 'react'
import Link from 'next/link'
import MultiCheckbox from '@/components/MultiCheckbox'
import { TYPES_CHEVEUX, POROSITES, PROBLEMES } from '@/lib/constants'
import type { EtapeRoutine } from '@/lib/types'

export default function EtapeForm({
  action,
  etape,
}: {
  action: (formData: FormData) => Promise<void>
  etape?: EtapeRoutine
}) {
  const [types, setTypes] = useState<string[]>(etape?.types_compatibles ?? [])
  const [porosites, setPorosites] = useState<string[]>(etape?.porosites_cibles ?? [])
  const [problemes, setProblemes] = useState<string[]>(etape?.problemes_cibles ?? [])

  const input = 'w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2.5 text-sm text-slate-100 focus:outline-none focus:border-orange-500 transition-colors'

  return (
    <div className="max-w-2xl">
      <form action={action} className="space-y-5">
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 space-y-5">
          <div className="grid grid-cols-4 gap-4">
            <div>
              <label className="block text-xs text-slate-400 uppercase tracking-wider mb-1.5">Emoji</label>
              <input name="emoji" defaultValue={etape?.emoji} required className={input} />
            </div>
            <div className="col-span-2">
              <label className="block text-xs text-slate-400 uppercase tracking-wider mb-1.5">Slug</label>
              <input name="slug" defaultValue={etape?.slug} required className={`${input} font-mono`} />
            </div>
            <div>
              <label className="block text-xs text-slate-400 uppercase tracking-wider mb-1.5">Ordre (1-20)</label>
              <input name="ordre_defaut" type="number" min="1" max="20" defaultValue={etape?.ordre_defaut} required className={input} />
            </div>
          </div>

          <div>
            <label className="block text-xs text-slate-400 uppercase tracking-wider mb-1.5">Titre *</label>
            <input name="titre" defaultValue={etape?.titre} required className={input} />
          </div>

          <div>
            <label className="block text-xs text-slate-400 uppercase tracking-wider mb-1.5">Description *</label>
            <textarea name="description" defaultValue={etape?.description} required rows={4} className={`${input} resize-none`} />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs text-slate-400 uppercase tracking-wider mb-1.5">Fréquence *</label>
              <input name="frequence" defaultValue={etape?.frequence} required className={input} />
            </div>
            <div>
              <label className="block text-xs text-slate-400 uppercase tracking-wider mb-1.5">Durée (min)</label>
              <input name="duree_minutes" type="number" min="1" defaultValue={etape?.duree_minutes ?? ''} className={input} />
            </div>
          </div>

          <div>
            <label className="block text-xs text-slate-400 uppercase tracking-wider mb-1.5">Quand ?</label>
            <input name="quand" defaultValue={etape?.quand ?? ''} className={input} />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs text-slate-400 uppercase tracking-wider mb-1.5">Types de produits</label>
              <input name="produits_types" defaultValue={etape?.produits_types ?? ''} className={input} />
            </div>
            <div>
              <label className="block text-xs text-slate-400 uppercase tracking-wider mb-1.5">Accessoires</label>
              <input name="accessoires" defaultValue={etape?.accessoires ?? ''} className={input} />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs text-slate-400 uppercase tracking-wider mb-1.5">Photo URL</label>
              <input name="photo_url" defaultValue={etape?.photo_url ?? ''} className={input} />
            </div>
            <div>
              <label className="block text-xs text-slate-400 uppercase tracking-wider mb-1.5">Vidéo URL</label>
              <input name="video_url" defaultValue={etape?.video_url ?? ''} className={input} />
            </div>
          </div>

          <div>
            <label className="block text-xs text-slate-400 uppercase tracking-wider mb-1.5">Nom routine</label>
            <input name="nom_routine" defaultValue={etape?.nom_routine ?? ''} className={input} />
          </div>

          <div className="flex gap-6">
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" name="universelle" defaultChecked={etape?.universelle} className="w-4 h-4 accent-orange-500" />
              <span className="text-sm text-slate-300">Universelle</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" name="premium" defaultChecked={etape?.premium} className="w-4 h-4 accent-orange-500" />
              <span className="text-sm text-slate-300">Premium</span>
            </label>
          </div>

          <MultiCheckbox name="types_compatibles" options={TYPES_CHEVEUX} value={types} onChange={setTypes} label="Types compatibles" />
          <MultiCheckbox name="porosites_cibles" options={POROSITES} value={porosites} onChange={setPorosites} label="Porosités cibles" />
          <MultiCheckbox name="problemes_cibles" options={PROBLEMES} value={problemes} onChange={setProblemes} label="Problèmes cibles" />
        </div>

        <div className="flex gap-3">
          <button type="submit" className="px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white text-sm font-medium rounded-lg transition-colors">
            Enregistrer
          </button>
          <Link href="/etapes" className="px-4 py-2 border border-slate-700 text-slate-300 text-sm rounded-lg hover:border-slate-600 transition-colors">
            Annuler
          </Link>
        </div>
      </form>
    </div>
  )
}
