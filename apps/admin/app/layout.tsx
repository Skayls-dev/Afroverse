import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Admin — AlwaysAfro',
  robots: { index: false, follow: false },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body className="bg-slate-950 text-slate-100">
        {children}
      </body>
    </html>
  )
}
