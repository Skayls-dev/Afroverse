import './globals.css'
import type { Metadata } from 'next'
import { Manrope, Space_Grotesk } from 'next/font/google'

const headingFont = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-heading',
  display: 'swap'
})

const bodyFont = Manrope({
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap'
})

export const metadata: Metadata = {
  title: 'AfroVerse — Le diagnostic capillaire pour cheveux afro-texturés',
  description: 'Découvrez votre profil capillaire unique. Recommandations produits personnalisées pour cheveux 3A à 4C.',
  keywords: ['cheveux afro', 'diagnostic capillaire', 'produits naturels', 'porosité cheveux'],
  openGraph: {
    title: 'AfroVerse',
    description: 'La plateforme de référence pour cheveux afro-européens',
    url: 'https://afroverse.com',
    siteName: 'AfroVerse',
  }
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body className={`${headingFont.variable} ${bodyFont.variable}`}>{children}</body>
    </html>
  )
}
