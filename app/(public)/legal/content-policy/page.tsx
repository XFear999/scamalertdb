import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Content Policy & Submission Guidelines',
  description: 'ScamAlertDB Content Policy — what types of submissions are accepted and what is prohibited.',
}

export default function ContentPolicyPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
      <h1 className="text-3xl font-bold text-foreground mb-2">Content Policy & Submission Guidelines</h1>
      <p className="text-sm text-muted-foreground mb-8">Last updated: March 2025</p>
      <div className="prose prose-slate max-w-none space-y-6 text-muted-foreground">
        <p>ScamAlertDB is a moderated platform. Every report submitted is reviewed before publication. These guidelines define what is and is not acceptable content.</p>

        <h2 className="text-lg font-semibold text-foreground">What We Accept</h2>
        <ul className="list-disc list-inside space-y-1">
          <li>First-hand accounts of alleged scam incidents involving payment platforms or online marketplaces</li>
          <li>Reports that provide specific, factual details such as dates, platforms used, amounts involved, and identifiers</li>
          <li>Evidence that is directly relevant to the alleged incident (redacted screenshots, receipts, chat logs)</li>
          <li>Reports submitted in good faith by individuals who believe they were targeted by fraudulent activity</li>
        </ul>

        <h2 className="text-lg font-semibold text-foreground">What We Do Not Accept</h2>
        <ul className="list-disc list-inside space-y-1">
          <li>Reports that are knowingly false, fabricated, or intended to harass a specific individual</li>
          <li>Reports targeting minors</li>
          <li>Content that includes full unmasked financial account numbers, government ID numbers, or full home addresses</li>
          <li>Unrelated private content or intimate images of any kind</li>
          <li>Submissions motivated by personal vendettas unrelated to any financial fraud</li>
          <li>Content that violates applicable law</li>
        </ul>

        <h2 className="text-lg font-semibold text-foreground">Moderation Process</h2>
        <p>All submissions enter a pending moderation queue. Our team reviews each report for compliance with this policy before publication. We may: approve and publish, reject, request additional information, or publish with redactions. We do not share the outcome of moderation decisions with submitters.</p>

        <h2 className="text-lg font-semibold text-foreground">Evidence Guidelines</h2>
        <p>Before uploading screenshots or documents, please remove or blur: bank account or routing numbers, government-issued ID numbers and photos, full home or work addresses, photos of minors, and any content that is not directly relevant to the alleged incident.</p>

        <h2 className="text-lg font-semibold text-foreground">Language Standards</h2>
        <p>Reports should describe events factually and in clear language. Avoid inflammatory, threatening, or defamatory language. State what happened — not conclusions about a person's character.</p>

        <h2 className="text-lg font-semibold text-foreground">Consequences of Policy Violations</h2>
        <p>Submissions that violate this policy will be rejected or removed. Repeated or egregious violations may be referred to appropriate authorities.</p>
      </div>
    </div>
  )
}
