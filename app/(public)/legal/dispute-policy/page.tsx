import type { Metadata } from 'next'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

export const metadata: Metadata = {
  title: 'Dispute & Removal Policy',
  description: 'ScamAlertDB Dispute & Removal Policy — how to request correction or removal of a report you believe is inaccurate.',
}

export default function DisputePolicyPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
      <h1 className="text-3xl font-bold text-foreground mb-2">Dispute & Removal Policy</h1>
      <p className="text-sm text-muted-foreground mb-8">Last updated: March 2025</p>
      <div className="prose prose-slate max-w-none space-y-6 text-muted-foreground">
        <p>ScamAlertDB takes the rights of individuals named in reports seriously. If you believe a report about you or your business is inaccurate, false, or violates our Content Policy, you have the right to dispute it.</p>

        <h2 className="text-lg font-semibold text-foreground">Who Can Submit a Dispute</h2>
        <ul className="list-disc list-inside space-y-1">
          <li>The individual named in the report</li>
          <li>A legal representative acting on behalf of the named individual</li>
          <li>A business owner or authorized representative of a business named in the report</li>
          <li>A third party with direct knowledge of the inaccuracy</li>
        </ul>

        <h2 className="text-lg font-semibold text-foreground">Grounds for Dispute or Removal</h2>
        <ul className="list-disc list-inside space-y-1">
          <li>The report contains factually false information</li>
          <li>You are not the person described (mistaken identity)</li>
          <li>The matter described has been resolved</li>
          <li>The report contains private or sensitive information that should not be public</li>
          <li>The report violates our Content Policy</li>
          <li>The report is a duplicate</li>
        </ul>

        <h2 className="text-lg font-semibold text-foreground">How to Submit a Dispute</h2>
        <p>Use our <a href="/dispute" className="text-blue-600 underline">Dispute / Removal Request form</a>. Provide the report URL or ID, your relationship to the report, the reason for your dispute, and a clear explanation. Supporting documentation is helpful but not required.</p>

        <h2 className="text-lg font-semibold text-foreground">Our Review Process</h2>
        <ol className="list-decimal list-inside space-y-1">
          <li>Your request is logged and assigned for review within 2 business days</li>
          <li>Our moderation team reviews the original report and your dispute</li>
          <li>We may contact you for additional information</li>
          <li>Based on review, the report may be: left unchanged, updated with corrections, marked as disputed, or removed</li>
          <li>We aim to complete dispute reviews within 5–7 business days</li>
        </ol>

        <h2 className="text-lg font-semibold text-foreground">Outcomes</h2>
        <p><strong>Mark as Disputed:</strong> The report remains visible but is clearly labeled as subject to an active dispute. This is used when there is a genuine factual disagreement that we cannot independently resolve.</p>
        <p><strong>Mark as Resolved:</strong> Used when the matter described has been settled or resolved between parties.</p>
        <p><strong>Removal:</strong> The report is taken down if it violates our Content Policy, contains false information we can verify, or the dispute is otherwise upheld.</p>

        <h2 className="text-lg font-semibold text-foreground">Legal Requests</h2>
        <p>For formal legal notices including DMCA takedown requests and court orders, please use the Legal Notice category in our <a href="/contact" className="text-blue-600 underline">Contact form</a>.</p>
      </div>

      <div className="mt-10">
        <Button asChild className="bg-orange-600 hover:bg-orange-700 text-white">
          <Link href="/dispute">Submit a Dispute or Removal Request</Link>
        </Button>
      </div>
    </div>
  )
}
