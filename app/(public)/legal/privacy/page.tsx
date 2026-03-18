import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'ScamAlertDB Privacy Policy — how we collect, use, and protect your information.',
}

export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
      <h1 className="text-3xl font-bold text-foreground mb-2">Privacy Policy</h1>
      <p className="text-sm text-muted-foreground mb-8">Last updated: March 2025</p>
      <div className="prose prose-slate max-w-none space-y-6 text-muted-foreground">
        <p>This Privacy Policy explains how ScamAlertDB collects, uses, and protects information submitted through our platform.</p>

        <h2 className="text-lg font-semibold text-foreground">1. Information We Collect</h2>
        <p><strong>Report submissions:</strong> When you submit a report, we collect your name, email address, and the details you provide in the form (identifiers, incident description, evidence files). Your name and email are kept private and are never published.</p>
        <p><strong>Dispute and contact forms:</strong> When you submit a dispute or contact message, we collect your name, email, and message content. This is used only for processing your request.</p>
        <p><strong>Usage data:</strong> We may collect anonymized usage data such as page views, search queries (not linked to individuals), and error logs for platform improvement purposes.</p>

        <h2 className="text-lg font-semibold text-foreground">2. How We Use Your Information</h2>
        <ul className="list-disc list-inside space-y-1">
          <li>To process and moderate report submissions</li>
          <li>To respond to disputes and contact inquiries</li>
          <li>To maintain platform integrity and prevent abuse</li>
          <li>To comply with legal obligations</li>
        </ul>

        <h2 className="text-lg font-semibold text-foreground">3. What We Publish Publicly</h2>
        <p>We never publish your name, email, or full phone number. Reports display only masked phone numbers (e.g., ***-***-1234). Submitted evidence may be partially or fully redacted at admin discretion before publication.</p>

        <h2 className="text-lg font-semibold text-foreground">4. Data Retention</h2>
        <p>We retain submitted report data for as long as the report is active on the platform. Reports that are removed or rejected may be retained in our systems for a period of time for abuse prevention purposes.</p>

        <h2 className="text-lg font-semibold text-foreground">5. Third-Party Services</h2>
        <p>We use Supabase for database and storage services, and Vercel for hosting. These services have their own privacy policies. We do not sell your data to third parties.</p>

        <h2 className="text-lg font-semibold text-foreground">6. Your Rights</h2>
        <p>If you submitted information to this platform and would like it reviewed, corrected, or removed, please contact us via the <a href="/contact" className="text-blue-600 underline">Contact page</a> or submit a <a href="/dispute" className="text-blue-600 underline">Dispute Request</a>.</p>

        <h2 className="text-lg font-semibold text-foreground">7. Cookies</h2>
        <p>We use session cookies required for authentication. We do not use advertising cookies or cross-site tracking.</p>

        <h2 className="text-lg font-semibold text-foreground">8. Contact</h2>
        <p>For privacy-related inquiries, please use our <a href="/contact" className="text-blue-600 underline">Contact page</a>.</p>
      </div>
    </div>
  )
}
