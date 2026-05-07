import { supabase } from './supabase'

const PRODUCT_PHOTOS_BUCKET = 'produits-photos'
const MAX_PRODUCT_PHOTOS = 3

function sanitizeFileName(fileName: string) {
  return fileName
    .toLowerCase()
    .replace(/[^a-z0-9.-]+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')
}

export function getProductPhotoUrls(formData: FormData) {
  const raw = formData.get('photo_urls')
  if (typeof raw !== 'string' || !raw) return []

  try {
    const parsed = JSON.parse(raw)
    return Array.isArray(parsed) ? parsed.filter((value): value is string => typeof value === 'string' && value.length > 0) : []
  } catch {
    return []
  }
}

export function getProductPhotoFiles(formData: FormData) {
  return formData
    .getAll('photos')
    .filter((value): value is File => value instanceof File && value.size > 0)
}

export async function uploadProductPhotos(files: File[], productId: string) {
  const photoUrls: string[] = []

  for (const file of files) {
    const extension = file.name.includes('.') ? file.name.split('.').pop() : 'jpg'
    const fileName = sanitizeFileName(file.name.replace(/\.[^.]+$/, '')) || 'photo'
    const objectPath = `${productId}/${Date.now()}-${crypto.randomUUID()}-${fileName}.${extension}`
    const arrayBuffer = await file.arrayBuffer()

    const { error } = await supabase.storage
      .from(PRODUCT_PHOTOS_BUCKET)
      .upload(objectPath, arrayBuffer, {
        contentType: file.type || 'image/jpeg',
        upsert: false,
      })

    if (error) {
      throw new Error(`Upload photo impossible: ${error.message}`)
    }

    const { data } = supabase.storage.from(PRODUCT_PHOTOS_BUCKET).getPublicUrl(objectPath)
    photoUrls.push(data.publicUrl)
  }

  return photoUrls
}

export function validateProductPhotoCount(existingPhotoUrls: string[], newFiles: File[]) {
  if (existingPhotoUrls.length + newFiles.length > MAX_PRODUCT_PHOTOS) {
    throw new Error(`Un produit ne peut pas avoir plus de ${MAX_PRODUCT_PHOTOS} photos.`)
  }
}

export { MAX_PRODUCT_PHOTOS }
