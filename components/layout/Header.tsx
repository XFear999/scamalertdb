'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Menu, X, Shield, Search } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

const navLinks = [
  { label: 'Search Reports', href: '/search' },
  { label: 'Submit a Report', href: '/submit' },
  { label: 'Resources', href: '/resources' },
  { label: 'Dispute / Removal', href: '/dispute' },
]

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-slate-900/95 backdrop-blur-sm">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 text-white hover:opacity-90 transition-opacity">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600">
              <Shield className="h-5 w-5 text-white" />
            </div>
            <span className="text-lg font-bold tracking-tight">
              ScamAlert<span className="text-blue-400">DB</span>
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map(link => (
              <Link
                key={link.href}
                href={link.href}
                className="px-3 py-2 text-sm font-medium text-slate-300 rounded-md hover:bg-white/10 hover:text-white transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Desktop actions */}
          <div className="hidden md:flex items-center gap-2">
            <Button asChild size="sm" variant="ghost" className="text-slate-300 hover:text-white hover:bg-white/10">
              <Link href="/search">
                <Search className="h-4 w-4 mr-1.5" />
                Search
              </Link>
            </Button>
            <Button asChild size="sm" className="bg-blue-600 hover:bg-blue-700 text-white">
              <Link href="/submit">Report a Scam</Link>
            </Button>
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2 text-slate-300 hover:text-white"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={cn(
        'md:hidden border-t border-slate-700 bg-slate-900 overflow-hidden transition-all duration-200',
        menuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
      )}>
        <div className="px-4 py-3 space-y-1">
          {navLinks.map(link => (
            <Link
              key={link.href}
              href={link.href}
              className="block px-3 py-2 text-sm font-medium text-slate-300 rounded-md hover:bg-white/10 hover:text-white"
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <div className="pt-2 border-t border-slate-700">
            <Link
              href="/submit"
              className="block w-full text-center bg-blue-600 text-white px-4 py-2.5 rounded-md text-sm font-medium hover:bg-blue-700"
              onClick={() => setMenuOpen(false)}
            >
              Report a Scam
            </Link>
          </div>
        </div>
      </div>
    </header>
  )
}
