'use client'

import { useTransition } from 'react'
import { createCheckoutSession } from './actions'

export default function CheckoutButton({
  packId,
  label,
  primary = false,
}: {
  packId: string
  label: string
  primary?: boolean
}) {
  const [pending, startTransition] = useTransition()

  function handleClick() {
    startTransition(async () => {
      await createCheckoutSession(packId)
    })
  }

  return (
    <button
      onClick={handleClick}
      disabled={pending}
      className={`btn ${primary ? 'btn-primary' : 'btn-ghost'}`}
      style={{ width: '100%', marginTop: '1rem', opacity: pending ? 0.6 : 1 }}
    >
      {pending ? 'Chargement…' : label}
    </button>
  )
}
