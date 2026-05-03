'use client'

import { useRef, useState } from 'react'
import { insertContact } from './actions'

export default function PartenairesForm() {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [errorMsg, setErrorMsg] = useState('')
  const formRef = useRef<HTMLFormElement>(null)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setStatus('loading')
    setErrorMsg('')

    const data = new FormData(e.currentTarget)
    const result = await insertContact(data)

    if (result.error) {
      setErrorMsg(result.error)
      setStatus('error')
    } else {
      setStatus('success')
      formRef.current?.reset()
    }
  }

  if (status === 'success') {
    return (
      <div style={{ textAlign: 'center', padding: '2.5rem', border: '1px solid var(--color-border)', borderRadius: '1rem', background: 'var(--color-surface)' }}>
        <p style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>✓</p>
        <p style={{ fontWeight: 700, color: 'var(--color-secondary)' }}>Demande envoyée ✓</p>
        <p style={{ color: 'var(--color-text-muted)', marginTop: '0.5rem' }}>Nous vous répondons sous 48h.</p>
      </div>
    )
  }

  return (
    <form ref={formRef} onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
      <div>
        <label style={{ display: 'block', fontWeight: 600, marginBottom: '0.4rem', color: 'var(--color-text)' }}>
          Nom de la marque
        </label>
        <input
          name="nom"
          type="text"
          required
          placeholder="Ex. NaturalLab"
          style={{
            width: '100%',
            padding: '0.75rem 1rem',
            border: '1px solid var(--color-border)',
            borderRadius: '0.5rem',
            background: 'var(--color-surface)',
            color: 'var(--color-text)',
            fontSize: '1rem',
            boxSizing: 'border-box',
          }}
        />
      </div>

      <div>
        <label style={{ display: 'block', fontWeight: 600, marginBottom: '0.4rem', color: 'var(--color-text)' }}>
          E-mail de contact
        </label>
        <input
          name="email"
          type="email"
          required
          placeholder="hello@votrem arque.com"
          style={{
            width: '100%',
            padding: '0.75rem 1rem',
            border: '1px solid var(--color-border)',
            borderRadius: '0.5rem',
            background: 'var(--color-surface)',
            color: 'var(--color-text)',
            fontSize: '1rem',
            boxSizing: 'border-box',
          }}
        />
      </div>

      <div>
        <label style={{ display: 'block', fontWeight: 600, marginBottom: '0.4rem', color: 'var(--color-text)' }}>
          Plan souhaité
        </label>
        <select
          name="plan"
          required
          defaultValue=""
          style={{
            width: '100%',
            padding: '0.75rem 1rem',
            border: '1px solid var(--color-border)',
            borderRadius: '0.5rem',
            background: 'var(--color-surface)',
            color: 'var(--color-text)',
            fontSize: '1rem',
            boxSizing: 'border-box',
          }}
        >
          <option value="" disabled>Sélectionner un plan</option>
          <option value="basic">Basic — Gratuit</option>
          <option value="pro">Pro — 199 €/mois</option>
          <option value="enterprise">Enterprise — Sur devis</option>
        </select>
      </div>

      <div>
        <label style={{ display: 'block', fontWeight: 600, marginBottom: '0.4rem', color: 'var(--color-text)' }}>
          Message
        </label>
        <textarea
          name="message"
          required
          rows={4}
          placeholder="Décrivez votre marque et vos objectifs de partenariat..."
          style={{
            width: '100%',
            padding: '0.75rem 1rem',
            border: '1px solid var(--color-border)',
            borderRadius: '0.5rem',
            background: 'var(--color-surface)',
            color: 'var(--color-text)',
            fontSize: '1rem',
            resize: 'vertical',
            boxSizing: 'border-box',
          }}
        />
      </div>

      {status === 'error' && (
        <p style={{ color: '#dc2626', fontSize: '0.875rem' }}>{errorMsg}</p>
      )}

      <button
        type="submit"
        disabled={status === 'loading'}
        className="btn btn-primary"
        style={{ alignSelf: 'flex-start', opacity: status === 'loading' ? 0.7 : 1, cursor: status === 'loading' ? 'not-allowed' : 'pointer' }}
      >
        {status === 'loading' ? 'Envoi en cours…' : 'Envoyer ma demande'}
      </button>
    </form>
  )
}
