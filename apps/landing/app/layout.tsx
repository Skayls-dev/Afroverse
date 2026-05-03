import type { Metadata } from 'next'

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
      <body>{children}</body>
    </html>
  )
}
