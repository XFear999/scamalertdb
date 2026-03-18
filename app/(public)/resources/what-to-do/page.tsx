import type { Metadata } from 'next'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { CheckCircle } from 'lucide-react'

export const metadata: Metadata = {
  title: 'What To Do If You Were Scammed Online',
  description: 'Step-by-step guide on what to do if you were scammed via Zelle, Venmo, Cash App, PayPal, or an online marketplace. Who to contact, how to document your case.',
}

const steps = [
  {
    n: '1',
    title: 'Stop all contact with the scammer',
    body: 'Do not send any more money, regardless of what the scammer says. Block them on all platforms. Preserve — but do not respond to — any remaining messages.',
  },
  {
    n: '2',
    title: 'Document everything immediately',
    body: 'Take screenshots of all conversations, listings, payment receipts, and profiles before they can be deleted. Note dates, times, amounts, usernames, phone numbers, and email addresses.',
  },
  {
    n: '3',
    title: 'Contact your bank or payment platform',
    body: 'Report the transaction immediately. While reversal is not guaranteed for peer-to-peer payments like Zelle, some banks may investigate. For credit card transactions, initiate a dispute. Do this as quickly as possible.',
  },
  {
    n: '4',
    title: 'File a report with the FTC',
    body: 'Visit ReportFraud.ftc.gov to file a complaint with the Federal Trade Commission. Your report helps the FTC identify patterns and take action against scam operations.',
  },
  {
    n: '5',
    title: 'File a complaint with the FBI\'s IC3',
    body: 'Go to ic3.gov to file an Internet Crime Complaint. The FBI\'s Internet Crime Complaint Center tracks and investigates online fraud. Include all documentation.',
  },
  {
    n: '6',
    title: 'Report to your local police',
    body: 'File a police report. Even if local law enforcement cannot immediately investigate, a police report number is often required for insurance claims and further legal action.',
  },
  {
    n: '7',
    title: 'Report to the platform where the scam occurred',
    body: 'Report the scammer\'s account on Facebook, Instagram, WhatsApp, Cash App, etc. This helps get the account removed and protects future victims.',
  },
  {
    n: '8',
    title: 'Submit a report on ScamAlertDB',
    body: 'Help warn others by submitting a report here. Our moderation team will review it before publication. Include as much relevant detail as possible — phone numbers, usernames, and platform details help others identify the same actor.',
  },
]

export default function WhatToDoPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
      <div className="mb-2 text-sm text-muted-foreground">
        <Link href="/resources" className="hover:text-foreground">Resources</Link> &rsaquo; What To Do
      </div>
      <h1 className="text-3xl font-bold text-foreground mb-4">What To Do If You Were Scammed</h1>
      <p className="text-muted-foreground text-lg leading-relaxed mb-10">
        Being scammed is a stressful and often embarrassing experience. You're not alone — millions of people
        are defrauded online every year. Here's a clear, practical guide to follow immediately after you realize
        something has gone wrong.
      </p>

      <div className="space-y-6">
        {steps.map(step => (
          <div key={step.n} className="flex gap-4">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-blue-600 text-white text-sm font-bold">
              {step.n}
            </div>
            <div>
              <h2 className="font-semibold text-foreground mb-1">{step.title}</h2>
              <p className="text-sm text-muted-foreground leading-relaxed">{step.body}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-10 rounded-xl border border-green-200 bg-green-50 p-5">
        <div className="flex gap-3">
          <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 shrink-0" />
          <div className="text-sm text-green-900">
            <p className="font-semibold mb-1">A note on recovery</p>
            <p>
              Recovery of funds from peer-to-peer payment scams (Zelle, Venmo, Cash App) is not guaranteed
              and often not possible. However, documenting and reporting your case is still important — it
              protects others, helps law enforcement build cases, and creates a record in the event legal
              proceedings arise.
            </p>
          </div>
        </div>
      </div>

      <div className="mt-10 flex flex-wrap gap-3">
        <Button asChild className="bg-blue-600 hover:bg-blue-700 text-white">
          <Link href="/submit">Submit a Report on ScamAlertDB</Link>
        </Button>
        <Button asChild variant="outline">
          <Link href="/search">Search Existing Reports</Link>
        </Button>
      </div>
    </div>
  )
}
