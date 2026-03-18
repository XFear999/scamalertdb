import type { Metadata } from 'next'
import Link from 'next/link'
import { AlertTriangle, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'

export const metadata: Metadata = {
  title: 'Common Zelle Scams — What to Know & How to Stay Safe',
  description: 'Learn about the most common Zelle scam patterns, why Zelle payments are difficult to reverse, and how to protect yourself before sending money.',
}

export default function ZelleScamsPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
      <div className="mb-2 text-sm text-muted-foreground">
        <Link href="/resources" className="hover:text-foreground">Resources</Link> &rsaquo; Zelle Scams
      </div>
      <h1 className="text-3xl font-bold text-foreground mb-4">Common Zelle Scams</h1>
      <p className="text-muted-foreground text-lg leading-relaxed mb-8">
        Zelle is a legitimate and widely-used bank-to-bank payment network. However, because Zelle transactions
        are instant and typically <strong>irreversible</strong>, scammers actively target it. Understanding how
        these scams work is the first line of defense.
      </p>

      <div className="rounded-xl border border-amber-200 bg-amber-50 p-5 mb-8">
        <div className="flex gap-3">
          <AlertTriangle className="h-5 w-5 text-amber-600 mt-0.5 shrink-0" />
          <p className="text-sm text-amber-900">
            <strong>Key fact:</strong> Unlike credit card payments, Zelle payments sent to scammers are rarely
            recovered. Banks are generally not obligated to refund Zelle transactions that you authorized —
            even if you were deceived into authorizing them.
          </p>
        </div>
      </div>

      <div className="prose prose-slate max-w-none space-y-8">
        <section>
          <h2 className="text-xl font-bold text-foreground mb-3">1. Fake Item Listings</h2>
          <p className="text-muted-foreground leading-relaxed">
            One of the most common Zelle scams involves fake marketplace listings — a puppy, concert tickets,
            electronics, a car, or rental property that doesn't exist. The scammer insists on Zelle as the
            only accepted payment method and often claims it's "safer than cash." Once payment is sent, they
            disappear. The listing is removed, and the phone number becomes unreachable.
          </p>
          <p className="text-muted-foreground leading-relaxed mt-2">
            <strong>Red flags:</strong> Price is suspiciously low. Seller refuses in-person inspection.
            Zelle or another peer-to-peer payment is the only option. Seller is "out of town."
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-foreground mb-3">2. Fake Bank Impersonation ("Bank Fraud" Scam)</h2>
          <p className="text-muted-foreground leading-relaxed">
            A caller claims to be from your bank's fraud department and says your account has been compromised.
            To "secure" your money, they ask you to send a Zelle payment to yourself — but the account they
            provide is actually controlled by the scammer. Banks have confirmed this is one of the most
            financially damaging scams currently active.
          </p>
          <p className="text-muted-foreground leading-relaxed mt-2">
            <strong>Red flags:</strong> Unsolicited call claiming to be your bank. Urgency to act immediately.
            Request to send a Zelle payment to any number. Never give OTP codes to callers.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-foreground mb-3">3. Rental Deposit Scams</h2>
          <p className="text-muted-foreground leading-relaxed">
            Scammers copy legitimate rental listings and post them at below-market prices. They correspond
            by email or text, claim to be out of town, and ask for a Zelle deposit to "hold" the unit.
            The property either doesn't exist or is not theirs to rent.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-foreground mb-3">4. Overpayment / Chargeback Scams</h2>
          <p className="text-muted-foreground leading-relaxed">
            A "buyer" sends you too much money and asks you to Zelle the difference back. The original payment
            is either fraudulent or comes from a stolen account, and is later reversed — leaving you out the
            money you sent back. Zelle does not offer buyer or seller protection like PayPal does.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-foreground mb-3">How to Protect Yourself</h2>
          <ul className="list-disc list-inside space-y-2 text-muted-foreground">
            <li>Only Zelle money to people you know and trust personally</li>
            <li>Never send Zelle to a stranger as part of a marketplace transaction</li>
            <li>Verify the recipient's identity before sending — once sent, money is usually gone</li>
            <li>Your real bank will never call and ask you to send a Zelle payment</li>
            <li>Be skeptical of anyone who insists on Zelle exclusively</li>
            <li>Search for any phone number or name on ScamAlertDB before transacting</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-bold text-foreground mb-3">If You Were Scammed via Zelle</h2>
          <ol className="list-decimal list-inside space-y-2 text-muted-foreground">
            <li>Contact your bank immediately and report the fraud</li>
            <li>File a complaint with the FTC at <strong>ReportFraud.ftc.gov</strong></li>
            <li>File an IC3 complaint at <strong>ic3.gov</strong> (FBI's Internet Crime Complaint Center)</li>
            <li>Report the incident to Zelle's support team</li>
            <li>Consider submitting a report on ScamAlertDB to help others</li>
          </ol>
        </section>
      </div>

      <div className="mt-12 flex flex-wrap gap-3">
        <Button asChild className="bg-blue-600 hover:bg-blue-700 text-white">
          <Link href="/search?platform=zelle">Browse Zelle Reports <ArrowRight className="ml-1.5 h-4 w-4" /></Link>
        </Button>
        <Button asChild variant="outline">
          <Link href="/submit">Submit a Report</Link>
        </Button>
      </div>
    </div>
  )
}
