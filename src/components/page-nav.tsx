'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ThemeToggle } from './theme-toggle'

export function PageNav() {
  const pathname = usePathname()

  const navItems = [
    { href: '/', label: 'About' },
    { href: '/currently', label: 'Currently' },
    { href: '/blog', label: 'Blog' },
    { href: '/contact', label: 'Contact' },
  ]

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/'
    return pathname.startsWith(href)
  }

  return (
    <nav className="flex items-center mb-12">
      <div className="flex space-x-8 items-center">
        {navItems.map(({ href, label }) => (
          <Link
            key={href}
            href={href}
            className={`text-base transition-colors ${
              isActive(href)
                ? 'text-[var(--nav-active)]'
                : 'text-[var(--text-primary)] hover:text-[var(--accent-hover)]'
            }`}
          >
            {label}
          </Link>
        ))}
        <ThemeToggle />
      </div>
    </nav>
  )
}
