'use server'

import { createClient } from '@supabase/supabase-js'

function getSupabase() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY ?? process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
}

export async function insertContact(formData: FormData) {
  const nom = formData.get('nom') as string
  const email = formData.get('email') as string
  const plan = formData.get('plan') as string
  const message = formData.get('message') as string

  if (!nom || !email || !plan || !message) {
    return { error: 'Tous les champs sont requis.' }
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(email)) {
    return { error: 'Adresse e-mail invalide.' }
  }

  const supabase = getSupabase()
  const { error } = await supabase
    .from('marques')
    .insert({ nom, email_contact: email, plan, message, actif: false })

  if (error) {
    return { error: 'Une erreur est survenue. Réessayez plus tard.' }
  }

  return { success: true }
}
