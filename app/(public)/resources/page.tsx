import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, BookOpen } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Resources & Guides — Payment Scam Education',
  description: 'Free guides and educational articles about common payment scams, how to spot marketplace fraud, and what to do if you were targeted.',
}

const resources = [
  { title: 'Common Zelle Scams', href: '/resources/zelle-scams', desc: 'Learn why Zelle is frequently targeted, what the most common scam patterns look like, and how to protect yourself.' },
  { title: 'How to Spot Marketplace Fraud', href: '/resources/marketplace-fraud', desc: 'Warning signs to look for in online marketplace listings on Facebook, Instagram, Craigslist, and similar platforms.' },
  { title: 'What To Do If You Were Scammed', href: '/resources/what-to-do', desc: 'A step-by-step guide: who to contact, how to document your case, and how to report to authorities.' },
  { title: 'How to Verify a Seller Before Paying', href: '/resources/verify-seller', desc: 'Simple due-diligence checks you can do before sending money to an unfamiliar person or business online.' },
]

export default function ResourcesPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6">
      <div className="mb-10 text-center">
        <div className="inline-flex items-center justify-center h-12 w-12 rounded-2xl bg-blue-100 mb-4">
          <BookOpen className="h-6 w-6 text-blue-600" />
        </div>
        <h1 className="text-3xl font-bold text-foreground mb-3">Resources & Guides</h1>
        <p className="text-muted-foreground max-w-xl mx-auto">
          Educational articles about payment scams, marketplace fraud, and how to protect yourself online.
          Free, practical information from ScamAlertDB.
        </p>
      </div>
      <div className="grid gap-5 sm:grid-cols-2">
        {resources.map(r => (
          <Link key={r.href} href={r.href} className="group rounded-xl border border-border bg-card p-6 hover:shadow-md transition-shadow">
            <h2 className="font-semibold text-foreground mb-2 group-hover:text-blue-600 transition-colors">{r.title}</h2>
            <p className="text-sm text-muted-foreground leading-relaxed mb-4">{r.desc}</p>
            <span className="inline-flex items-center text-sm font-medium text-blue-600">
              Read guide <ArrowRight className="ml-1 h-3.5 w-3.5" />
            </span>
          </Link>
        ))}
      </div>
    </div>
  )
}
