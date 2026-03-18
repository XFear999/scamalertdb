import { getAdminReports } from '@/lib/actions/admin'
import { formatDateShort, formatPlatformLabel, formatScamTypeLabel, getStatusBadgeClasses } from '@/lib/utils'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { ExternalLink, Eye } from 'lucide-react'

interface Props {
  searchParams: Promise<{ status?: string; platform?: string; page?: string }>
}

export default async function AdminReportsPage({ searchParams }: Props) {
  const params = await searchParams
  const page = Math.max(1, parseInt(params.page ?? '1', 10))
  const { data: reports, total } = await getAdminReports(
    { status: params.status, platform: params.platform },
    page,
    25,
  )

  const totalPages = Math.ceil(total / 25)

  const STATUS_OPTIONS = ['', 'pending', 'published', 'disputed', 'resolved', 'removed', 'rejected']

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">All Reports</h1>
          <p className="text-slate-500 text-sm">{total.toLocaleString()} total reports</p>
        </div>
        <div className="flex gap-2">
          <select
            className="rounded-md border border-slate-200 bg-white px-3 py-1.5 text-sm"
            defaultValue={params.status ?? ''}
            onChange={e => {
              const url = new URL(window.location.href)
              if (e.target.value) url.searchParams.set('status', e.target.value)
              else url.searchParams.delete('status')
              window.location.href = url.toString()
            }}
          >
            <option value="">All Statuses</option>
            {STATUS_OPTIONS.filter(Boolean).map(s => (
              <option key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1)}</option>
            ))}
          </select>
        </div>
      </div>

      <Card>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50">
                <th className="px-4 py-3 text-left font-medium text-slate-600">Title</th>
                <th className="px-4 py-3 text-left font-medium text-slate-600">Platform</th>
                <th className="px-4 py-3 text-left font-medium text-slate-600">Status</th>
                <th className="px-4 py-3 text-left font-medium text-slate-600">Submitted</th>
                <th className="px-4 py-3 text-left font-medium text-slate-600">Views</th>
                <th className="px-4 py-3 text-right font-medium text-slate-600">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {reports.map(r => (
                <tr key={r.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-4 py-3 max-w-xs">
                    <p className="font-medium text-slate-900 truncate">{r.title}</p>
                    {r.alleged_name && <p className="text-xs text-slate-400 truncate">{r.alleged_name}</p>}
                  </td>
                  <td className="px-4 py-3 text-slate-600">{formatPlatformLabel(r.platform)}</td>
                  <td className="px-4 py-3">
                    <span className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium ${getStatusBadgeClasses(r.report_status)}`}>
                      {r.report_status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-slate-500 text-xs">{formatDateShort(r.submitted_at)}</td>
                  <td className="px-4 py-3 text-slate-500">
                    <span className="flex items-center gap-1"><Eye className="h-3 w-3" />{r.view_count ?? 0}</span>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Link
                        href={`/admin/reports/${r.id}`}
                        className="inline-flex items-center gap-1 text-xs text-blue-600 hover:text-blue-800"
                      >
                        Review <ExternalLink className="h-3 w-3" />
                      </Link>
                      {r.report_status === 'published' && (
                        <Link
                          href={`/report/${r.slug}`}
                          target="_blank"
                          className="text-xs text-slate-400 hover:text-slate-700"
                        >
                          View live
                        </Link>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between mt-4">
          <p className="text-sm text-slate-500">Page {page} of {totalPages}</p>
          <div className="flex gap-2">
            {page > 1 && (
              <Button asChild variant="outline" size="sm">
                <Link href={`/admin/reports?page=${page - 1}${params.status ? `&status=${params.status}` : ''}`}>Previous</Link>
              </Button>
            )}
            {page < totalPages && (
              <Button asChild variant="outline" size="sm">
                <Link href={`/admin/reports?page=${page + 1}${params.status ? `&status=${params.status}` : ''}`}>Next</Link>
              </Button>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
