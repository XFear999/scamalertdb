import type { Metadata } from 'next'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Search } from 'lucide-react'

export const metadata: Metadata = {
  title: 'How to Verify a Seller Before Paying Online',
  description: 'Practical due-diligence steps to verify a seller or buyer before sending money online. Reduce your risk of marketplace fraud.',
}

export default function VerifySellerPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
      <div className="mb-2 text-sm text-muted-foreground">
        <Link href="/resources" className="hover:text-foreground">Resources</Link> &rsaquo; Verify a Seller
      </div>
      <h1 className="text-3xl font-bold text-foreground mb-4">How to Verify a Seller Before Paying</h1>
      <p className="text-muted-foreground text-lg leading-relaxed mb-8">
        A few minutes of due diligence before you send money can save you from losing it entirely.
        Here are practical steps anyone can follow before transacting with an unknown party online.
      </p>

      <div className="prose prose-slate max-w-none space-y-8">
        <section>
          <h2 className="text-xl font-bold text-foreground mb-3">Search Their Phone Number or Username</h2>
          <p className="text-muted-foreground leading-relaxed">
            Before sending money, search the seller's phone number, name, or username on ScamAlertDB. If they
            have been reported by previous victims, you'll find it here. Also try a general web search with
            the phone number plus the word "scam" or "fraud."
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-foreground mb-3">Reverse Image Search Their Photos</h2>
          <p className="text-muted-foreground leading-relaxed">
            Right-click any photos they've sent or posted and search for them using Google Images or TinEye.
            If the photos appear on stock image sites, other sellers' listings, or unrelated websites, the
            identity may be fabricated. This is especially common in romance scams and fake item listings.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-foreground mb-3">Check Their Account Age and Activity</h2>
          <p className="text-muted-foreground leading-relaxed">
            On Facebook, check when the account was created and how many friends they have. On Instagram, look
            at when the account was created and whether the follower count seems genuine. A new account with
            no history, few followers, and polished product photos should raise questions.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-foreground mb-3">Ask for a Live Video Call</h2>
          <p className="text-muted-foreground leading-relaxed">
            For higher-value items, request a live video call showing the item in real time. A legitimate
            seller of a real item will generally be willing to do this. A scammer using stolen photos will not.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-foreground mb-3">Meet in Person When Possible</h2>
          <p className="text-muted-foreground leading-relaxed">
            For local transactions, always meet in a public place during daylight hours. Many police stations
            offer their parking lots as designated safe meeting spots for online purchases. Never agree to
            pay before inspecting the item in person.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-foreground mb-3">Use Payment Methods With Buyer Protection</h2>
          <p className="text-muted-foreground leading-relaxed">
            Credit cards and PayPal Goods &amp; Services offer dispute and chargeback mechanisms.
            Zelle, Venmo (Friends &amp; Family), Cash App, and bank transfers generally do not.
            If a seller insists on a payment method that offers no buyer protection, treat that as a significant red flag.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-foreground mb-3">Trust Your Instincts</h2>
          <p className="text-muted-foreground leading-relaxed">
            If something feels off — pressure to decide quickly, reluctance to answer direct questions,
            prices that seem too good — walk away. A good deal is not worth the risk of losing real money
            to a scammer.
          </p>
        </section>
      </div>

      <div className="mt-12 flex flex-wrap gap-3">
        <Button asChild className="bg-blue-600 hover:bg-blue-700 text-white">
          <Link href="/search">
            <Search className="mr-1.5 h-4 w-4" /> Search ScamAlertDB
          </Link>
        </Button>
        <Button asChild variant="outline">
          <Link href="/resources">All Resources</Link>
        </Button>
      </div>
    </div>
  )
}
