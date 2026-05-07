import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import { getProductPhotoFiles, uploadProductPhotos, validateProductPhotoCount } from '@/lib/productPhotos'
import ProduitForm from '../ProduitForm'

async function createProduit(formData: FormData) {
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
  const photoFiles = getProductPhotoFiles(formData)

  validateProductPhotoCount([], photoFiles)

  const produitId = crypto.randomUUID()
  const photo_urls = await uploadProductPhotos(photoFiles, produitId)

  await supabase.from('produits').insert({
    id: produitId,
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
  })

  revalidatePath('/produits')
  redirect('/produits')
}

export default function NouveauProduitPage() {
  return (
    <div>
      <h1 className="text-xl font-semibold text-slate-100 mb-6">Nouveau produit</h1>
      <ProduitForm action={createProduit} />
    </div>
  )
}
