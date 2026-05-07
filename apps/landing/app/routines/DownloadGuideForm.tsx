'use client'

import { useState } from 'react'
import { createClient } from '@supabase/supabase-js'

function getSupabase() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
}

export default function DownloadGuideForm() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [errorMsg, setErrorMsg] = useState('')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setStatus('loading')
    const supabase = getSupabase()
    const { error } = await supabase.from('guide_leads').insert({ email })

    if (error) {
      if (error.code === '23505') {
        // email déjà enregistré — on considère ça comme un succès
        setStatus('success')
      } else {
        setErrorMsg('Une erreur est survenue. Réessaie dans quelques instants.')
        setStatus('error')
      }
    } else {
      setStatus('success')
    }
  }

  return (
    <section className="guide-download-section">
      <div className="guide-download-inner">
        <span className="guide-download-icon">📥</span>
        <div className="guide-download-content">
          <h2 className="guide-download-title">Télécharge notre guide de routine</h2>
          <p className="guide-download-desc">
            Reçois un PDF complet avec les étapes, les produits conseillés et les astuces pour ton type de cheveux. Gratuit, sans engagement.
          </p>

          {status === 'success' ? (
            <div className="guide-download-success">
              <span>✅</span>
              <p>Le guide est en route ! Vérifie ta boîte mail (et tes spams 😉).</p>
            </div>
          ) : (
            <form className="guide-download-form" onSubmit={handleSubmit}>
              <input
                type="email"
                className="guide-email-input"
                placeholder="ton@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={status === 'loading'}
              />
              <button
                type="submit"
                className="btn btn-primary guide-download-btn"
                disabled={status === 'loading'}
              >
                {status === 'loading' ? 'Envoi…' : 'Recevoir le guide'}
              </button>
            </form>
          )}

          {status === 'error' && (
            <p className="guide-download-error">{errorMsg}</p>
          )}

          <p className="guide-download-privacy">Aucun spam. Ton email n'est jamais partagé.</p>
        </div>
      </div>
    </section>
  )
}
