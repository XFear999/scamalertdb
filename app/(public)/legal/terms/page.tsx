import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Terms of Use',
  description: 'ScamAlertDB Terms of Use — the rules and conditions governing use of our platform.',
}

export default function TermsPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
      <h1 className="text-3xl font-bold text-foreground mb-2">Terms of Use</h1>
      <p className="text-sm text-muted-foreground mb-8">Last updated: March 2025</p>
      <div className="prose prose-slate max-w-none space-y-6 text-muted-foreground">
        <p>By accessing or using ScamAlertDB ("<strong>the Site</strong>"), you agree to be bound by these Terms of Use. If you do not agree, please do not use the Site.</p>

        <h2 className="text-lg font-semibold text-foreground">1. Nature of Content</h2>
        <p>All reports published on ScamAlertDB are user-submitted allegations. They represent the views and claimed experiences of the individuals who submitted them. ScamAlertDB does not independently verify every claim and does not guarantee the accuracy, completeness, or reliability of any report. Nothing on this Site constitutes a finding of guilt, legal liability, or wrongdoing.</p>

        <h2 className="text-lg font-semibold text-foreground">2. User Submissions</h2>
        <p>By submitting a report, you represent that: (a) the information you provide is truthful to the best of your knowledge; (b) you have not included content that is defamatory, harassing, or unlawfully obtained; (c) you have not included private identifying information such as government IDs, bank account numbers, or home addresses; and (d) you agree to our Content Policy.</p>
        <p>We reserve the right to reject, edit, or remove any submission at our sole discretion. Submitting false or malicious reports may result in your submissions being removed and may expose you to legal liability.</p>

        <h2 className="text-lg font-semibold text-foreground">3. Section 230 Notice</h2>
        <p>ScamAlertDB is an interactive computer service as defined under 47 U.S.C. § 230. We are not the publisher or speaker of user-submitted content. We are not liable for content submitted by third parties. Reports reflect the opinions and experiences of submitters, not the views of ScamAlertDB.</p>

        <h2 className="text-lg font-semibold text="foreground">4. Prohibited Uses</h2>
        <p>You may not use the Site to: post false or fabricated reports; harass, threaten, or target individuals; upload content that infringes on intellectual property rights; attempt to circumvent our security systems; or use automated tools to scrape or interfere with the Site.</p>

        <h2 className="text-lg font-semibold text-foreground">5. Disclaimers</h2>
        <p>THE SITE IS PROVIDED "AS IS" WITHOUT WARRANTIES OF ANY KIND. SCAMALERTDB DISCLAIMS ALL WARRANTIES, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND NON-INFRINGEMENT. WE DO NOT WARRANT THAT THE SITE WILL BE UNINTERRUPTED, ERROR-FREE, OR FREE OF VIRUSES.</p>

        <h2 className="text-lg font-semibold text-foreground">6. Limitation of Liability</h2>
        <p>TO THE FULLEST EXTENT PERMITTED BY LAW, SCAMALERTDB SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES ARISING FROM YOUR USE OF THE SITE OR ANY CONTENT PUBLISHED ON IT.</p>

        <h2 className="text-lg font-semibold text-foreground">7. Dispute Resolution</h2>
        <p>Any disputes arising under these Terms shall be governed by the laws of the applicable jurisdiction. You agree to first contact us to seek resolution before initiating any formal legal proceedings.</p>

        <h2 className="text-lg font-semibold text-foreground">8. Changes to These Terms</h2>
        <p>We may update these Terms at any time. Continued use of the Site after changes are posted constitutes your acceptance of the revised Terms.</p>

        <h2 className="text-lg font-semibold text-foreground">9. Contact</h2>
        <p>For questions about these Terms, please use our <a href="/contact" className="text-blue-600 underline">Contact page</a>.</p>
      </div>
    </div>
  )
}
