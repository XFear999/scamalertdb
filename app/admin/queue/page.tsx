import { getPendingQueue, updateReportStatus } from '@/lib/actions/admin'
import { formatDate, formatPlatformLabel, formatScamTypeLabel } from '@/lib/utils'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Clock, CheckCircle, X, ExternalLink } from 'lucide-react'
import Link from 'next/link'
import { revalidatePath } from 'next/cache'

async function approveReport(formData: FormData) {
  'use server'
  const id = formData.get('id') as string
  await updateReportStatus(id, 'published', 'Approved by admin')
  revalidatePath('/admin/queue')
  revalidatePath('/admin')
}

async function rejectReport(formData: FormData) {
  'use server'
  const id = formData.get('id') as string
  await updateReportStatus(id, 'rejected', 'Rejected by admin')
  revalidatePath('/admin/queue')
  revalidatePath('/admin')
}

export default async function PendingQueuePage() {
  const reports = await getPendingQueue()

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Pending Queue</h1>
          <p className="text-slate-500 text-sm">{reports.length} report{reports.length !== 1 ? 's' : ''} awaiting review</p>
        </div>
      </div>

      {reports.length === 0 ? (
        <Card>
          <CardContent className="p-12 text-center">
            <CheckCircle className="h-10 w-10 text-green-500 mx-auto mb-3" />
            <h3 className="font-semibold text-slate-900 mb-1">Queue is clear</h3>
            <p className="text-slate-500 text-sm">No reports are currently awaiting review.</p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {reports.map((r) => (
            <Card key={r.id} className="border-amber-100 bg-amber-50/30">
              <CardContent className="p-5">
                <div className="flex items-start gap-4">
                  <Clock className="h-5 w-5 text-amber-500 mt-0.5 shrink-0" />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-4">
                      <div className="min-w-0">
                        <h3 className="font-semibold text-slate-900 truncate">{r.title}</h3>
                        <div className="flex flex-wrap gap-x-4 gap-y-0.5 mt-1 text-xs text-slate-500">
                          <span>{formatPlatformLabel(r.platform)}</span>
                          <span>{formatScamTypeLabel(r.scam_type)}</span>
                          {r.alleged_name && <span>Name: {r.alleged_name}</span>}
                          {r.phone_masked_public && <span>Phone: {r.phone_masked_public}</span>}
                          <span>Submitted: {formatDate(r.submitted_at)}</span>
                        </div>
                        {r.summary && (
                          <p className="mt-2 text-sm text-slate-600 line-clamp-2">{r.summary}</p>
                        )}
                        {r.created_by_submitter_email && (
                          <p className="mt-1 text-xs text-slate-400">From: {r.created_by_submitter_email}</p>
                        )}
                      </div>
                      <div className="flex flex-col gap-2 shrink-0">
                        <Link
                          href={`/admin/reports/${r.id}`}
                          className="inline-flex items-center gap-1 text-xs text-blue-600 hover:text-blue-800"
                        >
                          <ExternalLink className="h-3 w-3" />
                          Full review
                        </Link>
                      </div>
                    </div>
                    {/* Actions */}
                    <div className="mt-4 flex gap-2">
                      <form action={approveReport}>
                        <input type="hidden" name="id" value={r.id} />
                        <Button type="submit" size="sm" className="bg-green-600 hover:bg-green-700 text-white gap-1">
                          <CheckCircle className="h-3.5 w-3.5" /> Approve & Publish
                        </Button>
                      </form>
                      <form action={rejectReport}>
                        <input type="hidden" name="id" value={r.id} />
                        <Button type="submit" size="sm" variant="outline" className="border-red-200 text-red-600 hover:bg-red-50 gap-1">
                          <X className="h-3.5 w-3.5" /> Reject
                        </Button>
                      </form>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
