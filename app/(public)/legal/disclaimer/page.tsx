import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Disclaimer',
  description: 'ScamAlertDB Disclaimer — important information about the nature of content on our platform.',
}

export default function DisclaimerPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
      <h1 className="text-3xl font-bold text-foreground mb-2">Disclaimer</h1>
      <p className="text-sm text-muted-foreground mb-8">Last updated: March 2025</p>
      <div className="prose prose-slate max-w-none space-y-6 text-muted-foreground">
        <h2 className="text-lg font-semibold text-foreground">User-Submitted Content</h2>
        <p>All reports published on ScamAlertDB are submitted by members of the public. ScamAlertDB does not create, author, or endorse the content of any report. Reports represent the alleged experiences and opinions of the individuals who submitted them and should not be treated as verified facts, legal findings, or determinations of guilt or wrongdoing.</p>

        <h2 className="text-lg font-semibold text-foreground">No Legal Advice</h2>
        <p>Nothing on ScamAlertDB constitutes legal advice. If you are involved in a dispute, a potential fraud matter, or legal proceedings, please consult a qualified attorney.</p>

        <h2 className="text-lg font-semibold text-foreground">No Verification Guarantee</h2>
        <p>While our moderation team reviews submissions before publication, we do not independently investigate or verify every claim. Moderation is focused on policy compliance, not factual verification. A report passing moderation does not mean the claims it contains are proven.</p>

        <h2 className="text-lg font-semibold text-foreground">Section 230 Notice</h2>
        <p>ScamAlertDB operates as an interactive computer service under 47 U.S.C. § 230 of the Communications Decency Act. As a platform that hosts third-party content, ScamAlertDB is not treated as the publisher or speaker of user-submitted content and is not liable for that content to the extent provided by applicable law.</p>

        <h2 className="text-lg font-semibold text-foreground">External Links</h2>
        <p>Any external links referenced in reports or on this site are provided for informational purposes only. ScamAlertDB does not control or endorse external websites and is not responsible for their content.</p>

        <h2 className="text-lg font-semibold text-foreground">Accuracy of Information</h2>
        <p>Information on this platform, including published reports, may be incomplete, outdated, or inaccurate. ScamAlertDB makes no representations as to the accuracy or completeness of any information on the site.</p>

        <h2 className="text-lg font-semibold text-foreground">Dispute Rights</h2>
        <p>Individuals or businesses who believe they have been incorrectly or unfairly named in a report have the right to submit a dispute or removal request. See our <a href="/legal/dispute-policy" className="text-blue-600 underline">Dispute & Removal Policy</a>.</p>
      </div>
    </div>
  )
}
