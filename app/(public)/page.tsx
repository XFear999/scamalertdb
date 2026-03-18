import type { Metadata } from 'next'
import Link from 'next/link'
import { Suspense } from 'react'
import {
  Shield, Search, FileText, AlertTriangle, CheckCircle,
  TrendingUp, Users, Eye, ArrowRight, ChevronRight,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { ReportCard } from '@/components/reports/ReportCard'
import { SearchBar } from '@/components/search/SearchBar'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { Skeleton } from '@/components/ui/skeleton'
import { getRecentReports } from '@/lib/actions/reports'
import { PLATFORMS } from '@/lib/constants'

export const metadata: Metadata = {
  title: 'ScamAlertDB — Search & Report Alleged Payment Scams',
  description:
    'Search alleged scam reports by phone number, name, username, or business. Report suspected fraud on Zelle, Venmo, Cash App, PayPal, Facebook Marketplace, and more.',
  openGraph: {
    title: 'ScamAlertDB — Search & Report Alleged Payment Scams',
    description:
      'A public moderation platform for searching and submitting alleged scam reports across payment apps and online marketplaces.',
  },
}

const HOW_IT_WORKS = [
  {
    step: '01',
    icon: Search,
    title: 'Search First',
    description:
      'Enter a phone number, name, username, or business name to check our database for any matching user-submitted reports.',
  },
  {
    step: '02',
    icon: FileText,
    title: 'Submit a Report',
    description:
      'If you encountered suspected fraud, submit a detailed report. Every submission goes through admin review before it becomes public.',
  },
  {
    step: '03',
    icon: AlertTriangle,
    title: 'Dispute a Report',
    description:
      'If you believe a report about you is incorrect, submit a dispute or removal request. We take all requests seriously.',
  },
]

const TRUST_STATS = [
  { label: 'Reports Reviewed', value: '2,400+', icon: FileText },
  { label: 'Platforms Covered', value: '10+', icon: Shield },
  { label: 'Monthly Searches', value: '18,000+', icon: Search },
  { label: 'Disputes Resolved', value: '340+', icon: CheckCircle },
]

const SCAM_TYPES_FEATURED = [
  {
    title: 'Zelle & Venmo Scams',
    desc: 'Instant payment apps are frequently targeted. Scammers exploit the irreversible nature of these transfers.',
    href: '/search?platform=zelle',
    color: 'bg-purple-50 border-purple-200',
  },
  {
    title: 'Fake Marketplace Listings',
    desc: 'Items listed for sale that don\'t exist or are misrepresented — common on Facebook Marketplace and Instagram.',
    href: '/search?scam_type=fake_item_listing',
    color: 'bg-blue-50 border-blue-200',
  },
  {
    title: 'Deposit & Rental Scams',
    desc: 'Fake landlords collect security deposits for properties they don\'t own or have no rights to rent.',
    href: '/search?scam_type=deposit_scam',
    color: 'bg-amber-50 border-amber-200',
  },
  {
    title: 'Romance & Trust Scams',
    desc: 'Long-term emotional manipulation that eventually leads to requests for money transfers.',
    href: '/search?scam_type=romance_trust_scam',
    color: 'bg-pink-50 border-pink-200',
  },
]

const FAQ_ITEMS = [
  {
    q: 'Are all reports verified as true?',
    a: 'No. All reports are user-submitted allegations and are not independently verified as fact. Our moderation team reviews submissions before publication, but this review does not constitute a finding of guilt or wrongdoing. Always conduct your own due diligence.',
  },
  {
    q: 'What information do you show publicly about a reported person?',
    a: 'We only display masked phone numbers (e.g., ***-***-1234), usernames or handles, and general descriptions. Full phone numbers, home addresses, and financial account details are never displayed publicly.',
  },
  {
    q: 'Can I request removal of a report about me?',
    a: 'Yes. If you believe a report is inaccurate, false, or violates our content policy, you can submit a dispute or removal request through our Dispute page. We review all requests promptly.',
  },
  {
    q: 'How long does it take for a submitted report to appear?',
    a: 'Reports go into a pending moderation queue immediately after submission. Our team typically reviews new submissions within 2–5 business days. You will not receive a public notification, but approved reports become searchable on the site.',
  },
  {
    q: 'What should I do if I was scammed?',
    a: 'First, contact your bank or payment platform to report the transaction. File a report with the FTC at ReportFraud.ftc.gov, your local police department, and the FBI\'s IC3 at ic3.gov. You may also submit a report here so others can be informed.',
  },
]

async function RecentReports() {
  const reports = await getRecentReports(6)
  if (!reports.length) {
    return (
      <div className="col-span-full text-center py-12 text-muted-foreground">
        <p>No published reports yet. Be the first to submit one.</p>
      </div>
    )
  }
  return (
    <>
      {reports.map(r => (
        <ReportCard key={r.id} {...r} />
      ))}
    </>
  )
}

function RecentReportsSkeleton() {
  return (
    <>
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i} className="rounded-xl border p-5 space-y-3">
          <Skeleton className="h-4 w-32" />
          <Skeleton className="h-5 w-full" />
          <Skeleton className="h-4 w-3/4" />
          <Skeleton className="h-3 w-1/2" />
        </div>
      ))}
    </>
  )
}

export default function HomePage() {
  return (
    <>
      {/* ── Hero ─────────────────────────────────── */}
      <section className="relative overflow-hidden bg-slate-900 py-20 sm:py-28">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-900/40 via-slate-900 to-slate-900" />
        <div className="relative mx-auto max-w-4xl px-4 text-center sm:px-6">
          <div className="inline-flex items-center gap-2 rounded-full border border-blue-500/30 bg-blue-500/10 px-4 py-1.5 text-sm text-blue-300 mb-6">
            <Shield className="h-3.5 w-3.5" />
            Public Safety Reporting Platform
          </div>
          <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl mb-6">
            Search & Report{' '}
            <span className="text-blue-400">Alleged Scam Incidents</span>
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-slate-300 mb-10 leading-relaxed">
            ScamAlertDB is a public database of user-submitted alleged scam reports involving
            payment platforms like Zelle, Venmo, Cash App, and PayPal — and marketplaces
            like Facebook and Instagram. Search before you pay. Report if you were targeted.
          </p>

          {/* Search bar */}
          <div className="mx-auto max-w-2xl mb-6">
            <Suspense>
              <SearchBar
                size="lg"
                placeholder="Search by name, phone number, @handle, or business…"
              />
            </Suspense>
          </div>

          <p className="text-xs text-slate-500 mb-8">
            Try: "Zelle deposit scam" · "John Doe (Demo)" · "***-***-1234" · "@cashuser_demo"
          </p>

          <div className="flex flex-wrap justify-center gap-3">
            <Button asChild size="lg" className="bg-blue-600 hover:bg-blue-700 text-white">
              <Link href="/submit">
                <FileText className="h-4 w-4 mr-2" />
                Submit a Report
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-slate-600 text-slate-200 hover:bg-slate-800">
              <Link href="/dispute">
                Request Review / Removal
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* ── Trust stats ─────────────────────────── */}
      <section className="border-b border-border bg-slate-50">
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
          <div className="grid grid-cols-2 gap-6 sm:grid-cols-4">
            {TRUST_STATS.map(stat => (
              <div key={stat.label} className="text-center">
                <stat.icon className="mx-auto mb-2 h-5 w-5 text-blue-600" />
                <div className="text-2xl font-bold text-slate-900">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Mission strip ───────────────────────── */}
      <section className="mx-auto max-w-4xl px-4 py-16 sm:px-6 text-center">
        <h2 className="text-2xl font-bold text-foreground mb-4">
          Transparency Without Sensationalism
        </h2>
        <p className="text-muted-foreground leading-relaxed max-w-2xl mx-auto">
          ScamAlertDB is built on a clear principle: every report is a <strong>user-submitted allegation</strong>, not a verdict.
          Our moderation team reviews every submission. Individuals named in reports can dispute or request removal
          at any time. We exist to help people make more informed decisions — not to harm reputations.
        </p>
      </section>

      {/* ── Platforms ───────────────────────────── */}
      <section className="border-y border-border bg-slate-50 py-14">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <h2 className="text-center text-xl font-semibold text-foreground mb-8">
            Platforms Covered
          </h2>
          <div className="flex flex-wrap justify-center gap-3">
            {PLATFORMS.filter(p => p.value !== 'other').map(platform => (
              <Link
                key={platform.value}
                href={`/search?platform=${platform.value}`}
                className={`inline-flex items-center rounded-full border px-4 py-2 text-sm font-medium transition-shadow hover:shadow-md ${platform.bgColor} ${platform.textColor} ${platform.borderColor}`}
              >
                {platform.label}
                <ChevronRight className="ml-1 h-3.5 w-3.5 opacity-60" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── How it works ────────────────────────── */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
        <h2 className="text-center text-2xl font-bold text-foreground mb-12">
          How ScamAlertDB Works
        </h2>
        <div className="grid gap-8 sm:grid-cols-3">
          {HOW_IT_WORKS.map(item => (
            <div key={item.step} className="text-center">
              <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-600 text-white shadow-md">
                <item.icon className="h-6 w-6" />
              </div>
              <div className="text-xs font-mono text-blue-600 font-semibold mb-1">{item.step}</div>
              <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{item.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Recent reports ───────────────────────── */}
      <section className="border-t border-border bg-slate-50 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl font-bold text-foreground">Recent Reports</h2>
              <p className="text-sm text-muted-foreground mt-1">
                User-submitted allegations reviewed and published by our moderation team
              </p>
            </div>
            <Button asChild variant="outline" size="sm">
              <Link href="/search">
                View All <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
              </Link>
            </Button>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <Suspense fallback={<RecentReportsSkeleton />}>
              <RecentReports />
            </Suspense>
          </div>
        </div>
      </section>

      {/* ── Common scam types ────────────────────── */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
        <h2 className="text-center text-2xl font-bold text-foreground mb-3">Common Scam Categories</h2>
        <p className="text-center text-muted-foreground mb-10 text-sm">
          Browse reports by the type of alleged fraud involved
        </p>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {SCAM_TYPES_FEATURED.map(item => (
            <Link
              key={item.href}
              href={item.href}
              className={`group rounded-xl border p-5 transition-shadow hover:shadow-md ${item.color}`}
            >
              <h3 className="font-semibold text-foreground mb-2 group-hover:text-blue-700 transition-colors">
                {item.title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
              <div className="mt-3 flex items-center text-xs font-medium text-blue-600">
                Browse reports <ArrowRight className="ml-1 h-3 w-3" />
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ── Educational resources ────────────────── */}
      <section className="border-t border-border bg-slate-50 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <h2 className="text-2xl font-bold text-foreground mb-2">Resources & Guides</h2>
          <p className="text-muted-foreground mb-8 text-sm">
            Learn how to recognize and protect yourself from common payment scams
          </p>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { title: 'Common Zelle Scams', href: '/resources/zelle-scams', desc: 'Why Zelle is frequently targeted and what red flags to look for.' },
              { title: 'How to Spot Marketplace Fraud', href: '/resources/marketplace-fraud', desc: 'Warning signs in online marketplace listings before you pay.' },
              { title: 'What To Do If You Were Scammed', href: '/resources/what-to-do', desc: 'Step-by-step guide: who to contact and how to document your case.' },
              { title: 'How to Verify a Seller', href: '/resources/verify-seller', desc: 'Simple checks to reduce the risk of transacting with an unknown party.' },
            ].map(article => (
              <Link
                key={article.href}
                href={article.href}
                className="group rounded-xl border border-border bg-card p-5 transition-shadow hover:shadow-md"
              >
                <h3 className="font-semibold text-foreground mb-2 group-hover:text-blue-600 transition-colors">
                  {article.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{article.desc}</p>
                <div className="mt-3 text-xs font-medium text-blue-600 flex items-center">
                  Read guide <ArrowRight className="ml-1 h-3 w-3" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ─────────────────────────────────── */}
      <section className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
        <h2 className="text-2xl font-bold text-foreground mb-8 text-center">Frequently Asked Questions</h2>
        <Accordion type="single" collapsible className="w-full">
          {FAQ_ITEMS.map((item, i) => (
            <AccordionItem key={i} value={`faq-${i}`}>
              <AccordionTrigger className="text-left font-medium">{item.q}</AccordionTrigger>
              <AccordionContent className="text-muted-foreground leading-relaxed">{item.a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </section>

      {/* ── CTA strip ───────────────────────────── */}
      <section className="bg-slate-900 py-14">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6">
          <h2 className="text-2xl font-bold text-white mb-3">Ready to Search or Submit?</h2>
          <p className="text-slate-400 mb-8 max-w-xl mx-auto">
            Protect yourself and help others by searching existing reports or submitting a new one.
            Every report is reviewed before it goes public.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Button asChild size="lg" className="bg-blue-600 hover:bg-blue-700 text-white">
              <Link href="/search">
                <Search className="h-4 w-4 mr-2" /> Search Reports
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-slate-600 text-slate-200 hover:bg-slate-800">
              <Link href="/submit">
                <FileText className="h-4 w-4 mr-2" /> Submit a Report
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-slate-600 text-slate-200 hover:bg-slate-800">
              <Link href="/dispute">
                Request Removal
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  )
}
