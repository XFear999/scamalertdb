import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import {
  Calendar, DollarSign, MapPin, Phone, User, Building2,
  AtSign, ExternalLink, Eye, AlertTriangle, ArrowLeft, Clock,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { StatusBadge, PlatformBadge, ScamTypeBadge } from '@/components/reports/StatusBadge'
import { DisclaimerBanner } from '@/components/common/DisclaimerBanner'
import { ReportCard } from '@/components/reports/ReportCard'
import { getReportBySlug, getRelatedReports } from '@/lib/actions/reports'
import { formatDate, formatRelativeDate, formatAmountRange } from '@/lib/utils'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const report = await getReportBySlug(slug)
  if (!report) return { title: 'Report Not Found' }

  const title = `${report.title} | ScamAlertDB`
  const description = report.summary ?? `User-submitted alleged scam report on ${report.platform}. Review the details and submit a dispute if this report is inaccurate.`

  return {
    title,
    description,
    openGraph: { title, description, type: 'article' },
    twitter: { card: 'summary', title, description },
  }
}

export default async function ReportDetailPage({ params }: Props) {
  const { slug } = await params
  const report = await getReportBySlug(slug)
  if (!report) notFound()

  const related = await getRelatedReports(
    report.id,
    report.platform,
    report.phone_masked_public,
    4,
  )

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: report.title,
    description: report.summary,
    datePublished: report.published_at,
    dateModified: report.updated_at,
    publisher: { '@type': 'Organization', name: 'ScamAlertDB' },
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6">
        {/* Back */}
        <Link
          href="/search"
          className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground mb-6 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to search
        </Link>

        {/* Disclaimer */}
        <div className="mb-6">
          <DisclaimerBanner />
        </div>

        {/* Main card */}
        <Card className="mb-8">
          <CardContent className="p-6 sm:p-8">
            {/* Status + badges */}
            <div className="flex flex-wrap gap-2 mb-4">
              <StatusBadge status={report.report_status} />
              <PlatformBadge platform={report.platform} />
              <ScamTypeBadge scamType={report.scam_type} />
            </div>

            {/* Title */}
            <h1 className="text-2xl font-bold text-foreground mb-2 leading-tight">
              {report.title}
            </h1>

            {/* Meta row */}
            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-muted-foreground mb-6">
              {report.published_at && (
                <span className="flex items-center gap-1">
                  <Clock className="h-3.5 w-3.5" />
                  Published {formatDate(report.published_at)}
                </span>
              )}
              {report.updated_at && report.updated_at !== report.published_at && (
                <span className="flex items-center gap-1">
                  Updated {formatRelativeDate(report.updated_at)}
                </span>
              )}
            </div>

            {/* Alleged identifiers */}
            <div className="rounded-lg border border-border bg-slate-50 p-4 mb-6">
              <h2 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
                Alleged Identifiers (User-Submitted)
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                {report.alleged_name && (
                  <div className="flex items-center gap-2">
                    <User className="h-4 w-4 text-muted-foreground shrink-0" />
                    <span className="text-muted-foreground">Name:</span>
                    <span className="font-medium">{report.alleged_name}</span>
                  </div>
                )}
                {report.business_name && (
                  <div className="flex items-center gap-2">
                    <Building2 className="h-4 w-4 text-muted-foreground shrink-0" />
                    <span className="text-muted-foreground">Business:</span>
                    <span className="font-medium">{report.business_name}</span>
                  </div>
                )}
                {report.phone_masked_public && (
                  <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4 text-muted-foreground shrink-0" />
                    <span className="text-muted-foreground">Phone:</span>
                    <span className="font-mono font-medium">{report.phone_masked_public}</span>
                  </div>
                )}
                {report.username_handle && (
                  <div className="flex items-center gap-2">
                    <AtSign className="h-4 w-4 text-muted-foreground shrink-0" />
                    <span className="text-muted-foreground">Handle:</span>
                    <span className="font-medium">{report.username_handle}</span>
                  </div>
                )}
              </div>
              <p className="text-xs text-muted-foreground mt-3">
                Phone numbers are partially masked. Full numbers are not displayed publicly.
              </p>
            </div>

            {/* Incident details */}
            {(report.incident_date || report.amount_range || report.location_general) && (
              <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm mb-6">
                {report.incident_date && (
                  <span className="flex items-center gap-2 text-muted-foreground">
                    <Calendar className="h-4 w-4" />
                    Incident date: <span className="text-foreground font-medium">{formatDate(report.incident_date)}</span>
                  </span>
                )}
                {report.amount_range && (
                  <span className="flex items-center gap-2 text-muted-foreground">
                    <DollarSign className="h-4 w-4" />
                    Alleged amount: <span className="text-foreground font-medium">{formatAmountRange(report.amount_range)}</span>
                  </span>
                )}
                {report.location_general && (
                  <span className="flex items-center gap-2 text-muted-foreground">
                    <MapPin className="h-4 w-4" />
                    Location: <span className="text-foreground font-medium">{report.location_general}</span>
                  </span>
                )}
              </div>
            )}

            {/* Narrative */}
            <div className="mb-6">
              <h2 className="text-base font-semibold text-foreground mb-3">Incident Description</h2>
              <div className="prose prose-sm max-w-none text-muted-foreground leading-relaxed whitespace-pre-line">
                {report.description}
              </div>
            </div>

            {/* Evidence */}
            {report.evidence && report.evidence.length > 0 && (
              <div className="mb-6">
                <h2 className="text-base font-semibold text-foreground mb-3">Submitted Evidence</h2>
                <p className="text-xs text-muted-foreground mb-3">
                  Evidence files may be redacted or partially hidden at the discretion of our moderation team.
                </p>
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                  {report.evidence.map((ev: { id: string; file_url: string; mime_type?: string | null; is_redacted: boolean }) => (
                    <div key={ev.id} className="relative rounded-lg border border-border overflow-hidden bg-slate-50 aspect-video flex items-center justify-center">
                      {ev.is_redacted ? (
                        <div className="text-center p-3">
                          <Eye className="h-5 w-5 text-muted-foreground mx-auto mb-1" />
                          <p className="text-xs text-muted-foreground">Redacted by admin</p>
                        </div>
                      ) : ev.mime_type?.startsWith('image/') ? (
                        <Image
                          src={ev.file_url}
                          alt="Evidence"
                          fill
                          className="object-cover"
                          sizes="(max-width: 768px) 50vw, 33vw"
                        />
                      ) : (
                        <a
                          href={ev.file_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex flex-col items-center gap-1 p-3 text-center text-xs text-blue-600 hover:text-blue-800"
                        >
                          <ExternalLink className="h-5 w-5" />
                          View file
                        </a>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Legal notice */}
            <div className="rounded-lg border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900">
              <div className="flex items-start gap-2">
                <AlertTriangle className="h-4 w-4 mt-0.5 shrink-0 text-amber-600" />
                <p>
                  This is a <strong>user-submitted report</strong> and reflects the submitter's allegations only.
                  ScamAlertDB has not independently verified the claims contained in this report.
                  This report is not a determination of guilt, wrongdoing, or legal liability.
                  If you believe this report is inaccurate, you have the right to dispute it.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Dispute CTA */}
        <Card className="mb-10 border-orange-200 bg-orange-50">
          <CardContent className="p-6">
            <h2 className="font-semibold text-foreground mb-2">
              Is this report about you or your business?
            </h2>
            <p className="text-sm text-muted-foreground mb-4">
              If you believe this report is inaccurate, mistaken, or contains false information,
              you have the right to submit a dispute or removal request. All requests are reviewed promptly.
            </p>
            <Button asChild className="bg-orange-600 hover:bg-orange-700 text-white">
              <Link href={`/dispute?report=${report.slug}`}>
                Submit a Dispute or Removal Request
              </Link>
            </Button>
          </CardContent>
        </Card>

        {/* Related reports */}
        {related.length > 0 && (
          <div>
            <h2 className="text-lg font-semibold text-foreground mb-4">Related Reports</h2>
            <div className="grid gap-4 sm:grid-cols-2">
              {related.map((r: typeof related[number]) => (
                <ReportCard key={r.id} {...r} />
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  )
}
