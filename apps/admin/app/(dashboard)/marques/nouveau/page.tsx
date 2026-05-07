import { redirect } from 'next/navigation'
import { revalidatePath } from 'next/cache'
import { supabase } from '@/lib/supabase'

async function createMarque(formData: FormData) {
  'use server'
  const payload = {
    nom: formData.get('nom') as string,
    email_contact: (formData.get('email_contact') as string) || null,
    plan: (formData.get('plan') as string) || null,
    actif: formData.get('actif') === 'on',
    message: (formData.get('message') as string) || null,
  }
  await supabase.from('marques').insert(payload)
  revalidatePath('/marques')
  redirect('/marques')
}

const input = 'w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2.5 text-sm text-slate-100 focus:outline-none focus:border-orange-500 transition-colors'

import Link from 'next/link'

export default function NouvelleMarquePage() {
  return (
    <div>
      <h1 className="text-xl font-semibold text-slate-100 mb-6">Nouveau partenaire</h1>
      <div className="max-w-lg">
        <form action={createMarque} className="space-y-5">
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 space-y-4">
            <div>
              <label className="block text-xs text-slate-400 uppercase tracking-wider mb-1.5">Nom *</label>
              <input name="nom" required className={input} />
            </div>
            <div>
              <label className="block text-xs text-slate-400 uppercase tracking-wider mb-1.5">Email contact</label>
              <input name="email_contact" type="email" className={input} />
            </div>
            <div>
              <label className="block text-xs text-slate-400 uppercase tracking-wider mb-1.5">Plan</label>
              <select name="plan" defaultValue="" className={input}>
                <option value="">— Choisir —</option>
                <option value="basic">Basic</option>
                <option value="pro">Pro</option>
                <option value="enterprise">Enterprise</option>
              </select>
            </div>
            <div>
              <label className="block text-xs text-slate-400 uppercase tracking-wider mb-1.5">Message / Notes</label>
              <textarea name="message" rows={3} className={`${input} resize-none`} />
            </div>
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" name="actif" defaultChecked className="w-4 h-4 accent-orange-500" />
              <span className="text-sm text-slate-300">Partenaire actif</span>
            </label>
          </div>
          <div className="flex gap-3">
            <button type="submit" className="px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white text-sm font-medium rounded-lg transition-colors">
              Créer
            </button>
            <Link href="/marques" className="px-4 py-2 border border-slate-700 text-slate-300 text-sm rounded-lg hover:border-slate-600 transition-colors">
              Annuler
            </Link>
          </div>
        </form>
      </div>
    </div>
  )
}
