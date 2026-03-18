import Link from 'next/link'
import { Shield } from 'lucide-react'
import { Separator } from '@/components/ui/separator'

const footerLinks = {
  Platform: [
    { label: 'Search Reports', href: '/search' },
    { label: 'Submit a Report', href: '/submit' },
    { label: 'Dispute / Removal', href: '/dispute' },
    { label: 'Contact Us', href: '/contact' },
  ],
  Resources: [
    { label: 'Common Zelle Scams', href: '/resources/zelle-scams' },
    { label: 'Marketplace Fraud', href: '/resources/marketplace-fraud' },
    { label: 'What To Do If Scammed', href: '/resources/what-to-do' },
    { label: 'Verify a Seller', href: '/resources/verify-seller' },
  ],
  Legal: [
    { label: 'Terms of Use', href: '/legal/terms' },
    { label: 'Privacy Policy', href: '/legal/privacy' },
    { label: 'Content Policy', href: '/legal/content-policy' },
    { label: 'Dispute & Removal Policy', href: '/legal/dispute-policy' },
    { label: 'Disclaimer', href: '/legal/disclaimer' },
  ],
}

export function Footer() {
  return (
    <footer className="border-t border-border bg-slate-950 text-slate-400">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        {/* Main grid */}
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4 lg:gap-12">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="flex items-center gap-2 text-white mb-4">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600">
                <Shield className="h-5 w-5 text-white" />
              </div>
              <span className="text-lg font-bold">ScamAlert<span className="text-blue-400">DB</span></span>
            </Link>
            <p className="text-sm leading-relaxed text-slate-400 max-w-xs">
              A public platform for searching and reporting alleged scam incidents involving payment platforms and online marketplaces.
            </p>
            <p className="mt-4 text-xs text-slate-500">
              All reports are user-submitted allegations and do not constitute verified facts. Reports require admin review before publication.
            </p>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h3 className="mb-4 text-sm font-semibold text-slate-200">{category}</h3>
              <ul className="space-y-2">
                {links.map(link => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-slate-400 hover:text-slate-200 transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <Separator className="my-8 bg-slate-800" />

        {/* Bottom bar */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-slate-500">
            &copy; {new Date().getFullYear()} ScamAlertDB. All rights reserved.
          </p>
          <div className="flex flex-wrap gap-4 text-xs text-slate-500">
            <span>Reports are user-submitted allegations</span>
            <span>&bull;</span>
            <span>Not independently verified</span>
            <span>&bull;</span>
            <Link href="/legal/disclaimer" className="hover:text-slate-300 transition-colors">Full Disclaimer</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
