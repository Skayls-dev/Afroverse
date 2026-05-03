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
  title: 'AlwaysAfro — La routine beauté afro faite pour toi',
  description: 'Diagnostic beauté personnalisé pour cheveux et peau afro. Trouve enfin les produits et la routine qui te correspondent.',
  keywords: ['cosmétique afro', 'diagnostic beauté', 'cheveux afro', 'soins peau noire', 'routine beauté'],
  openGraph: {
    title: 'AlwaysAfro — La routine beauté afro faite pour toi',
    description: 'Diagnostic beauté personnalisé pour cheveux et peau afro. Trouve enfin les produits et la routine qui te correspondent.',
    url: 'https://alwaysafro.com',
    siteName: 'AlwaysAfro',
  }
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body className={`${headingFont.variable} ${bodyFont.variable}`}>{children}</body>
    </html>
  )
}
