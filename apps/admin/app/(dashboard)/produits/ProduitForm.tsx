'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import MultiCheckbox from '@/components/MultiCheckbox'
import ArrayInput from '@/components/ArrayInput'
import { TYPES_CHEVEUX, POROSITES, ELASTICITES, DENSITES, PROBLEMES, OBJECTIFS, CATEGORIES_PRODUIT } from '@/lib/constants'
import type { Produit } from '@/lib/types'
import { MAX_PRODUCT_PHOTOS } from '@/lib/productPhotos'

interface ProduitFormProps {
  action: (formData: FormData) => Promise<void>
  produit?: Produit
  deleteAction?: () => Promise<void>
}

export default function ProduitForm({ action, produit, deleteAction }: ProduitFormProps) {
  const [photoUrls, setPhotoUrls] = useState<string[]>(produit?.photo_urls ?? [])
  const [categories, setCategories] = useState<string[]>(produit?.categories ?? [])
  const [types, setTypes] = useState<string[]>(produit?.types_compatibles ?? [])
  const [porosites, setPorosites] = useState<string[]>(produit?.porosites_compatibles ?? [])
  const [elasticites, setElasticites] = useState<string[]>(produit?.elasticites_compatibles ?? [])
  const [densites, setDensites] = useState<string[]>(produit?.densites_compatibles ?? [])
  const [problemes, setProblemes] = useState<string[]>(produit?.problemes_cibles ?? [])
  const [objectifs, setObjectifs] = useState<string[]>(produit?.objectifs_cibles ?? [])
  const [ingredients, setIngredients] = useState<string[]>(produit?.ingredients ?? [])

  const input = 'w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2.5 text-sm text-slate-100 focus:outline-none focus:border-orange-500 transition-colors'

  function removePhoto(urlToRemove: string) {
    setPhotoUrls(photoUrls.filter((url) => url !== urlToRemove))
  }

  return (
    <div className="max-w-2xl">
      <form action={action} className="space-y-5" encType="multipart/form-data">
        <input type="hidden" name="photo_urls" value={JSON.stringify(photoUrls)} />

        {/* Infos générales */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 space-y-4">
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-widest">Infos générales</p>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs text-slate-400 uppercase tracking-wider mb-1.5">Nom *</label>
              <input name="nom" defaultValue={produit?.nom} required className={input} />
            </div>
            <div>
              <label className="block text-xs text-slate-400 uppercase tracking-wider mb-1.5">Marque</label>
              <input name="marque" defaultValue={produit?.marque ?? ''} className={input} />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs text-slate-400 uppercase tracking-wider mb-1.5">Prix (€)</label>
              <input name="prix" type="number" step="0.01" min="0" defaultValue={produit?.prix ?? ''} className={input} />
            </div>
          </div>
          <MultiCheckbox name="categories" options={CATEGORIES_PRODUIT} value={categories} onChange={setCategories} label="Catégories" />
          <div>
            <label className="block text-xs text-slate-400 uppercase tracking-wider mb-1.5">Description</label>
            <textarea name="description" defaultValue={produit?.description ?? ''} rows={3} className={`${input} resize-none`} />
          </div>
          <div>
            <label className="block text-xs text-slate-400 uppercase tracking-wider mb-1.5">Lien d&apos;achat</label>
            <input name="lien_achat" type="url" defaultValue={produit?.lien_achat ?? ''} placeholder="https://…" className={input} />
          </div>
          <div>
            <label className="block text-xs text-slate-400 uppercase tracking-wider mb-1.5">Photos produit</label>
            <p className="text-xs text-slate-500 mb-3">Jusqu&apos;à {MAX_PRODUCT_PHOTOS} photos. Les nouvelles images s&apos;ajoutent aux photos conservées ci-dessous.</p>
            {photoUrls.length > 0 && (
              <div className="grid grid-cols-3 gap-3 mb-4">
                {photoUrls.map((photoUrl) => (
                  <div key={photoUrl} className="relative rounded-lg overflow-hidden border border-slate-700 bg-slate-800">
                    <div className="aspect-square relative">
                      <Image src={photoUrl} alt="Photo produit" fill className="object-cover" sizes="160px" unoptimized />
                    </div>
                    <button
                      type="button"
                      onClick={() => removePhoto(photoUrl)}
                      className="absolute top-2 right-2 bg-slate-950/80 text-white text-xs rounded px-2 py-1 hover:bg-red-600 transition-colors"
                    >
                      Retirer
                    </button>
                  </div>
                ))}
              </div>
            )}
            <input
              name="photos"
              type="file"
              accept="image/*"
              multiple
              className={`${input} file:mr-3 file:border-0 file:bg-orange-500 file:px-3 file:py-2 file:text-white file:rounded-md file:text-xs file:font-medium`}
            />
          </div>
        </div>

        {/* Ciblage diagnostic */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 space-y-4">
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-widest">Ciblage diagnostic</p>
          <p className="text-xs text-slate-500">Ces critères déterminent à quels profils ce produit sera recommandé. Laisser vide = compatible avec tous.</p>
          <MultiCheckbox name="types_compatibles" options={TYPES_CHEVEUX} value={types} onChange={setTypes} label="Types de cheveux" />
          <MultiCheckbox name="porosites_compatibles" options={POROSITES} value={porosites} onChange={setPorosites} label="Porosités compatibles" />
          <MultiCheckbox name="elasticites_compatibles" options={ELASTICITES} value={elasticites} onChange={setElasticites} label="Élasticités compatibles" />
          <MultiCheckbox name="densites_compatibles" options={DENSITES} value={densites} onChange={setDensites} label="Densités compatibles" />
          <MultiCheckbox name="problemes_cibles" options={PROBLEMES} value={problemes} onChange={setProblemes} label="Problèmes ciblés" />
          <MultiCheckbox name="objectifs_cibles" options={OBJECTIFS} value={objectifs} onChange={setObjectifs} label="Objectifs ciblés" />
        </div>

        {/* Composition */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-widest mb-4">Composition</p>
          <ArrayInput name="ingredients" value={ingredients} onChange={setIngredients} label="Ingrédients" placeholder="ex: huile de coco, beurre de karité…" />
        </div>

        <div className="flex items-center justify-between">
          <div className="flex gap-3">
            <button type="submit" className="px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white text-sm font-medium rounded-lg transition-colors">
              {produit ? 'Enregistrer' : 'Créer'}
            </button>
            <Link href="/produits" className="px-4 py-2 border border-slate-700 text-slate-300 text-sm rounded-lg hover:border-slate-600 transition-colors">
              Annuler
            </Link>
          </div>
          {deleteAction && (
            <form action={deleteAction}>
              <button type="submit" className="px-4 py-2 border border-red-900 text-red-400 text-sm rounded-lg hover:bg-red-900/20 transition-colors" onClick={(e) => { if (!confirm('Supprimer ce produit ?')) e.preventDefault() }}>
                Supprimer
              </button>
            </form>
          )}
        </div>
      </form>
    </div>
  )
}

