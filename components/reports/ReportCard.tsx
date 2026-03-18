import Link from 'next/link'
import { Eye, Calendar, DollarSign } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import {
  formatDateShort, formatRelativeDate, truncateText,
  getPlatformBadgeClasses, getStatusBadgeClasses,
  formatPlatformLabel, formatScamTypeLabel, formatAmountRange,
} from '@/lib/utils'
import type { ReportStatus } from '@/types'

interface ReportCardProps {
  id: string
  slug: string
  title: string
  summary: string | null
  platform: string
  scam_type: string
  alleged_name?: string | null
  business_name?: string | null
  phone_masked_public?: string | null
  username_handle?: string | null
  amount_range?: string | null
  published_at?: string | null
  report_status: ReportStatus
  view_count?: number
}

export function ReportCard({
  slug, title, summary, platform, scam_type,
  alleged_name, business_name, phone_masked_public,
  username_handle, amount_range, published_at,
  report_status, view_count,
}: ReportCardProps) {
  const statusMap: Record<ReportStatus, string> = {
    pending: 'pending',
    published: 'published',
    disputed: 'disputed',
    resolved: 'resolved',
    removed: 'removed',
    rejected: 'rejected',
  }

  return (
    <Link href={`/report/${slug}`} className="block group">
      <Card className="h-full hover:shadow-md transition-shadow border-border">
        <CardContent className="p-5">
          {/* Header badges */}
          <div className="flex flex-wrap items-center gap-2 mb-3">
            <span className={`inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5 text-xs font-medium ${getPlatformBadgeClasses(platform)}`}>
              {formatPlatformLabel(platform)}
            </span>
            <span className="inline-flex items-center gap-1 rounded-full border border-slate-200 bg-slate-100 px-2.5 py-0.5 text-xs font-medium text-slate-700">
              {formatScamTypeLabel(scam_type)}
            </span>
            {report_status !== 'published' && (
              <span className={`inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5 text-xs font-medium ${getStatusBadgeClasses(report_status)}`}>
                {statusMap[report_status]}
              </span>
            )}
            {report_status === 'disputed' && (
              <span className="inline-flex items-center gap-1 rounded-full border border-orange-200 bg-orange-100 px-2.5 py-0.5 text-xs font-medium text-orange-800">
                Disputed
              </span>
            )}
          </div>

          {/* Title */}
          <h3 className="text-base font-semibold text-foreground leading-snug mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">
            {title}
          </h3>

          {/* Summary */}
          {summary && (
            <p className="text-sm text-muted-foreground mb-3 line-clamp-2 leading-relaxed">
              {truncateText(summary, 150)}
            </p>
          )}

          {/* Identifiers */}
          <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted-foreground mb-3">
            {alleged_name && <span><span className="font-medium">Name:</span> {alleged_name}</span>}
            {business_name && <span><span className="font-medium">Business:</span> {business_name}</span>}
            {username_handle && <span><span className="font-medium">Handle:</span> {username_handle}</span>}
            {phone_masked_public && <span><span className="font-medium">Phone:</span> {phone_masked_public}</span>}
          </div>

          {/* Footer meta */}
          <div className="flex items-center justify-between pt-3 border-t border-border text-xs text-muted-foreground">
            <div className="flex items-center gap-3">
              {published_at && (
                <span className="flex items-center gap-1">
                  <Calendar className="h-3 w-3" />
                  {formatDateShort(published_at)}
                </span>
              )}
              {amount_range && (
                <span className="flex items-center gap-1">
                  <DollarSign className="h-3 w-3" />
                  {formatAmountRange(amount_range)}
                </span>
              )}
            </div>
            {view_count !== undefined && view_count > 0 && (
              <span className="flex items-center gap-1">
                <Eye className="h-3 w-3" />
                {view_count.toLocaleString()}
              </span>
            )}
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}
