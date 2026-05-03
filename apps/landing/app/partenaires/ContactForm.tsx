'use client'

import { useState } from 'react'

const PLANS = [
  { value: 'basic', label: 'Basic (gratuit)' },
  { value: 'pro', label: 'Pro (199 €/mois)' },
  { value: 'enterprise', label: 'Enterprise (sur devis)' },
]

export default function ContactForm() {
  const [form, setForm] = useState({
    marque: '',
    email: '',
    plan: 'basic',
    message: '',
  })
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle')

  function set(field: string, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setStatus('sending')
    try {
      const res = await fetch('/api/partenaires', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      if (!res.ok) throw new Error()
      setStatus('success')
    } catch {
      setStatus('error')
    }
  }

  if (status === 'success') {
    return (
      <div className="bg-[#1D9E75]/10 border border-[#1D9E75]/30 rounded-2xl p-8 text-center">
        <div className="text-4xl mb-3">🌿</div>
        <p className="text-white font-bold text-lg mb-1">Demande reçue !</p>
        <p className="text-gray-400 text-sm">
          Notre équipe vous contactera sous 48 h à l&apos;adresse <strong className="text-white">{form.email}</strong>.
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm text-gray-300 mb-1">Nom de la marque *</label>
        <input
          required
          value={form.marque}
          onChange={(e) => set('marque', e.target.value)}
          placeholder="ex : Cantu, SheaMoisture…"
          className="w-full bg-white/5 border border-white/10 focus:border-[#1D9E75] rounded-xl px-4 py-3 text-white text-sm outline-none transition-colors"
        />
      </div>
      <div>
        <label className="block text-sm text-gray-300 mb-1">Email *</label>
        <input
          required
          type="email"
          value={form.email}
          onChange={(e) => set('email', e.target.value)}
          placeholder="contact@votremarque.com"
          className="w-full bg-white/5 border border-white/10 focus:border-[#1D9E75] rounded-xl px-4 py-3 text-white text-sm outline-none transition-colors"
        />
      </div>
      <div>
        <label className="block text-sm text-gray-300 mb-1">Plan souhaité</label>
        <select
          value={form.plan}
          onChange={(e) => set('plan', e.target.value)}
          className="w-full bg-[#181818] border border-white/10 focus:border-[#1D9E75] rounded-xl px-4 py-3 text-white text-sm outline-none transition-colors"
        >
          {PLANS.map((p) => (
            <option key={p.value} value={p.value}>{p.label}</option>
          ))}
        </select>
      </div>
      <div>
        <label className="block text-sm text-gray-300 mb-1">Message</label>
        <textarea
          rows={4}
          value={form.message}
          onChange={(e) => set('message', e.target.value)}
          placeholder="Présentez votre marque et vos objectifs…"
          className="w-full bg-white/5 border border-white/10 focus:border-[#1D9E75] rounded-xl px-4 py-3 text-white text-sm outline-none transition-colors resize-none"
        />
      </div>
      {status === 'error' && (
        <p className="text-red-400 text-sm">Une erreur est survenue, réessayez.</p>
      )}
      <button
        type="submit"
        disabled={status === 'sending'}
        className="w-full bg-[#1D9E75] hover:bg-[#178864] disabled:opacity-50 text-white font-semibold py-3 rounded-xl transition-colors"
      >
        {status === 'sending' ? 'Envoi…' : 'Envoyer ma demande →'}
      </button>
    </form>
  )
}
