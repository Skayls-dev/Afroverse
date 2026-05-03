'use server'

import { redirect } from 'next/navigation'
import Stripe from 'stripe'

const PRICE_IDS: Record<string, string> = {
  bronze: 'price_bronze_299',
  argent_membre: 'price_argent_membre',
  or_membre: 'price_or_membre',
}

export async function createCheckoutSession(packId: string) {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: '2026-04-22.dahlia',
  })

  const priceId = PRICE_IDS[packId]
  if (!priceId) throw new Error(`Pack inconnu : ${packId}`)

  const session = await stripe.checkout.sessions.create({
    mode: 'payment',
    line_items: [{ price: priceId, quantity: 1 }],
    success_url: `${process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000'}/packs?success=1`,
    cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000'}/packs`,
  })

  redirect(session.url!)
}
