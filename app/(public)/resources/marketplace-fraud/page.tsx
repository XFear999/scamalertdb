import type { Metadata } from 'next'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ArrowRight } from 'lucide-react'

export const metadata: Metadata = {
  title: 'How to Spot Marketplace Fraud — Facebook, Instagram & More',
  description: 'Learn the red flags of online marketplace fraud on Facebook Marketplace, Instagram, and similar platforms before you send any money.',
}

export default function MarketplaceFraudPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
      <div className="mb-2 text-sm text-muted-foreground">
        <Link href="/resources" className="hover:text-foreground">Resources</Link> &rsaquo; Marketplace Fraud
      </div>
      <h1 className="text-3xl font-bold text-foreground mb-4">How to Spot Marketplace Fraud</h1>
      <p className="text-muted-foreground text-lg leading-relaxed mb-8">
        Online marketplaces like Facebook Marketplace, Instagram shops, Craigslist, and OfferUp connect
        millions of buyers and sellers — and unfortunately attract a significant number of fraudulent listings.
        Knowing the warning signs can save you from losing money to a scammer.
      </p>

      <div className="prose prose-slate max-w-none space-y-8">
        <section>
          <h2 className="text-xl font-bold text-foreground mb-3">Common Red Flags</h2>
          <ul className="list-disc list-inside space-y-2 text-muted-foreground">
            <li><strong>Price is significantly below market value</strong> — If it looks too good to be true, it often is.</li>
            <li><strong>Seller refuses in-person meetup or inspection</strong> — Legitimate sellers of high-value items typically allow inspection before payment.</li>
            <li><strong>Only accepts Zelle, Venmo, Cash App, or cryptocurrency</strong> — These methods offer little to no buyer protection.</li>
            <li><strong>New or empty profile</strong> — Account created recently, few friends, no history, stock photos.</li>
            <li><strong>Seller claims to be "out of town" or "overseas"</strong> — A classic setup for not meeting in person.</li>
            <li><strong>Pressures you to decide quickly</strong> — "I have three other buyers interested" is a common manipulation tactic.</li>
            <li><strong>Asks you to pay via shipping/escrow link</strong> — Fake escrow or shipping services are commonly used in vehicle and equipment scams.</li>
            <li><strong>Listing photos look like stock images or are watermarked by another site</strong> — Reverse image search the photos to check.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-bold text-foreground mb-3">Instagram & Social Media Shop Scams</h2>
          <p className="text-muted-foreground leading-relaxed">
            Instagram shops and DM-based sellers have become a common fraud vector. Scammers create
            convincing-looking shop pages with reposted product photos, collect payment via Venmo or Cash App,
            and either send counterfeit goods or nothing at all. Accounts may disappear or go private
            after collecting funds.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-foreground mb-3">Before You Pay Anything</h2>
          <ul className="list-disc list-inside space-y-2 text-muted-foreground">
            <li>Search the seller's phone number, name, or username on ScamAlertDB</li>
            <li>Reverse image search the listing photos using Google Images or TinEye</li>
            <li>Ask for a live video call showing the item</li>
            <li>Meet in person in a safe, public place for in-person transactions</li>
            <li>If possible, use a payment method with buyer protection (e.g., PayPal Goods &amp; Services)</li>
            <li>Never pay a deposit before seeing and verifying the item exists</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-bold text-foreground mb-3">What To Do If a Listing Seems Suspicious</h2>
          <p className="text-muted-foreground leading-relaxed">
            Don't engage further. Report the listing to the platform (Facebook, Instagram, etc.) and move on.
            If you've already sent money, report it to your bank, the payment platform, and local law enforcement.
            You may also submit a report on ScamAlertDB to help warn others.
          </p>
        </section>
      </div>

      <div className="mt-12 flex flex-wrap gap-3">
        <Button asChild className="bg-blue-600 hover:bg-blue-700 text-white">
          <Link href="/search?platform=facebook_marketplace">Browse Marketplace Reports <ArrowRight className="ml-1.5 h-4 w-4" /></Link>
        </Button>
        <Button asChild variant="outline">
          <Link href="/submit">Submit a Report</Link>
        </Button>
      </div>
    </div>
  )
}
