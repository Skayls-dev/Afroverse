export const dynamic = 'force-dynamic'

import { notFound, redirect } from 'next/navigation'
import { revalidatePath } from 'next/cache'
import { supabase } from '@/lib/supabase'
import EtapeForm from '../EtapeForm'

export default async function EditEtapePage({ params }: { params: { id: string } }) {
  const { data: etape } = await supabase
    .from('etapes_routines')
    .select('*')
    .eq('id', params.id)
    .single()

  if (!etape) notFound()

  async function updateEtape(formData: FormData) {
    'use server'
    const types_compatibles = JSON.parse(formData.get('types_compatibles') as string ?? '[]')
    const porosites_cibles = JSON.parse(formData.get('porosites_cibles') as string ?? '[]')
    const problemes_cibles = JSON.parse(formData.get('problemes_cibles') as string ?? '[]')

    await supabase.from('etapes_routines').update({
      titre: formData.get('titre') as string,
      slug: formData.get('slug') as string,
      description: formData.get('description') as string,
      emoji: formData.get('emoji') as string,
      frequence: formData.get('frequence') as string,
      duree_minutes: formData.get('duree_minutes') ? parseInt(formData.get('duree_minutes') as string) : null,
      quand: (formData.get('quand') as string) || null,
      produits_types: (formData.get('produits_types') as string) || null,
      accessoires: (formData.get('accessoires') as string) || null,
      ordre_defaut: parseInt(formData.get('ordre_defaut') as string),
      universelle: formData.get('universelle') === 'on',
      premium: formData.get('premium') === 'on',
      nom_routine: (formData.get('nom_routine') as string) || null,
      photo_url: (formData.get('photo_url') as string) || null,
      video_url: (formData.get('video_url') as string) || null,
      types_compatibles,
      porosites_cibles,
      problemes_cibles,
      updated_at: new Date().toISOString(),
    }).eq('id', params.id)

    revalidatePath('/etapes')
    redirect('/etapes')
  }

  return (
    <div>
      <h1 className="text-xl font-semibold text-slate-100 mb-6">Éditer étape</h1>
      <EtapeForm action={updateEtape} etape={etape} />
    </div>
  )
}
