'use client'

import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'

const NAV = [
  { href: '/', label: 'Vue d\'ensemble', icon: '◈' },
  { href: '/produits', label: 'Produits', icon: '◉' },
  { href: '/etapes', label: 'Étapes routine', icon: '◎' },
  { href: '/marques', label: 'Marques B2B', icon: '◇' },
  { href: '/analytics', label: 'Analytics', icon: '◈' },
]

export default function Sidebar() {
  const pathname = usePathname()

  return (
    <aside className="fixed top-0 left-0 h-screen w-52 bg-slate-900 border-r border-slate-800 flex flex-col z-10">
      <div className="px-4 py-5 border-b border-slate-800">
        <Image src="/logo.png" alt="AfroVerse" width={120} height={32} className="mix-blend-screen" priority />
        <p className="text-slate-500 text-xs mt-1">Admin</p>
      </div>

      <nav className="flex-1 py-4 overflow-y-auto">
        {NAV.map(({ href, label, icon }) => {
          const isActive = href === '/' ? pathname === '/' : pathname.startsWith(href)
          return (
            <Link
              key={href}
              href={href}
              className={`flex items-center gap-2.5 px-4 py-2.5 text-sm transition-colors ${
                isActive
                  ? 'bg-slate-800 text-orange-400 font-medium'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
              }`}
            >
              <span className="text-base">{icon}</span>
              {label}
            </Link>
          )
        })}
      </nav>

      <div className="px-4 py-4 border-t border-slate-800">
        <form action="/api/logout" method="POST">
          <button
            type="submit"
            className="w-full text-left text-sm text-slate-500 hover:text-red-400 transition-colors"
          >
            ⎋ Déconnexion
          </button>
        </form>
      </div>
    </aside>
  )
}
