export const dynamic = 'force-dynamic'

import { notFound, redirect } from 'next/navigation'
import { revalidatePath } from 'next/cache'
import { supabase } from '@/lib/supabase'
import { getProductPhotoFiles, getProductPhotoUrls, uploadProductPhotos, validateProductPhotoCount } from '@/lib/productPhotos'
import ProduitForm from '../ProduitForm'

export default async function EditProduitPage({ params }: { params: { id: string } }) {
  const { data: produit } = await supabase.from('produits').select('*').eq('id', params.id).single()
  if (!produit) notFound()

  async function updateProduit(formData: FormData) {
    'use server'
    const nom = formData.get('nom') as string
    const marque = formData.get('marque') as string
    const prix = formData.get('prix') ? parseFloat(formData.get('prix') as string) : null
    const description = (formData.get('description') as string) || null
    const lien_achat = (formData.get('lien_achat') as string) || null
    const categories = JSON.parse(formData.get('categories') as string ?? '[]')
    const types_compatibles = JSON.parse(formData.get('types_compatibles') as string ?? '[]')
    const porosites_compatibles = JSON.parse(formData.get('porosites_compatibles') as string ?? '[]')
    const elasticites_compatibles = JSON.parse(formData.get('elasticites_compatibles') as string ?? '[]')
    const densites_compatibles = JSON.parse(formData.get('densites_compatibles') as string ?? '[]')
    const problemes_cibles = JSON.parse(formData.get('problemes_cibles') as string ?? '[]')
    const objectifs_cibles = JSON.parse(formData.get('objectifs_cibles') as string ?? '[]')
    const ingredients = JSON.parse(formData.get('ingredients') as string ?? '[]')
    const existingPhotoUrls = getProductPhotoUrls(formData)
    const photoFiles = getProductPhotoFiles(formData)

    validateProductPhotoCount(existingPhotoUrls, photoFiles)

    const newPhotoUrls = await uploadProductPhotos(photoFiles, params.id)
    const photo_urls = [...existingPhotoUrls, ...newPhotoUrls]

    await supabase.from('produits').update({
      nom,
      marque: marque || null,
      categories,
      photo_urls,
      prix,
      description,
      lien_achat,
      types_compatibles,
      porosites_compatibles,
      elasticites_compatibles,
      densites_compatibles,
      problemes_cibles,
      objectifs_cibles,
      ingredients,
    }).eq('id', params.id)

    revalidatePath('/produits')
    redirect('/produits')
  }

  async function deleteProduit() {
    'use server'
    await supabase.from('produits').delete().eq('id', params.id)
    revalidatePath('/produits')
    redirect('/produits')
  }

  return (
    <div>
      <h1 className="text-xl font-semibold text-slate-100 mb-6">Éditer produit</h1>
      <ProduitForm action={updateProduit} produit={produit} deleteAction={deleteProduit} />
    </div>
  )
}
