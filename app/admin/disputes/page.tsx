import { getDisputesQueue, updateDisputeStatus } from '@/lib/actions/admin'
import { formatDate } from '@/lib/utils'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { AlertTriangle, CheckCircle, X } from 'lucide-react'
import { revalidatePath } from 'next/cache'

async function resolveDispute(formData: FormData) {
  'use server'
  await updateDisputeStatus(formData.get('id') as string, 'resolved', 'Resolved by admin')
  revalidatePath('/admin/disputes')
}

async function dismissDispute(formData: FormData) {
  'use server'
  await updateDisputeStatus(formData.get('id') as string, 'dismissed', 'Dismissed by admin')
  revalidatePath('/admin/disputes')
}

async function markUnderReview(formData: FormData) {
  'use server'
  await updateDisputeStatus(formData.get('id') as string, 'under_review', 'Under review')
  revalidatePath('/admin/disputes')
}

export default async function DisputesPage() {
  const disputes = await getDisputesQueue()

  const STATUS_COLORS: Record<string, string> = {
    open: 'bg-amber-100 text-amber-800 border-amber-200',
    under_review: 'bg-blue-100 text-blue-800 border-blue-200',
    resolved: 'bg-green-100 text-green-800 border-green-200',
    dismissed: 'bg-gray-100 text-gray-700 border-gray-200',
  }

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-900">Disputes</h1>
        <p className="text-slate-500 text-sm">{disputes.length} dispute record{disputes.length !== 1 ? 's' : ''}</p>
      </div>

      {disputes.length === 0 ? (
        <Card>
          <CardContent className="p-12 text-center">
            <CheckCircle className="h-10 w-10 text-green-500 mx-auto mb-3" />
            <h3 className="font-semibold text-slate-900 mb-1">No disputes</h3>
            <p className="text-slate-500 text-sm">No dispute requests have been submitted.</p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {disputes.map((d) => (
            <Card key={d.id}>
              <CardContent className="p-5">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="h-5 w-5 text-orange-500 mt-0.5 shrink-0" />
                  <div className="flex-1">
                    <div className="flex items-start justify-between gap-4 mb-2">
                      <div>
                        <p className="font-semibold text-slate-900">{d.requester_name}</p>
                        <p className="text-xs text-slate-500">{d.requester_email}</p>
                      </div>
                      <span className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium ${STATUS_COLORS[d.status] ?? ''}`}>
                        {d.status.replace('_', ' ')}
                      </span>
                    </div>

                    <div className="grid gap-2 text-sm mb-3">
                      <p><span className="font-medium text-slate-700">Relationship:</span> <span className="text-slate-600">{d.relationship_to_report}</span></p>
                      <p><span className="font-medium text-slate-700">Reason:</span> <span className="text-slate-600">{d.reason}</span></p>
                      <p><span className="font-medium text-slate-700">Submitted:</span> <span className="text-slate-600">{formatDate(d.created_at)}</span></p>
                    </div>

                    <div className="rounded-md bg-slate-50 border border-slate-200 p-3 mb-4">
                      <p className="text-xs font-medium text-slate-500 mb-1">Explanation</p>
                      <p className="text-sm text-slate-700 leading-relaxed">{d.explanation}</p>
                    </div>

                    {d.status === 'open' && (
                      <div className="flex gap-2">
                        <form action={markUnderReview}>
                          <input type="hidden" name="id" value={d.id} />
                          <Button type="submit" size="sm" className="bg-blue-600 hover:bg-blue-700 text-white">Mark Under Review</Button>
                        </form>
                        <form action={resolveDispute}>
                          <input type="hidden" name="id" value={d.id} />
                          <Button type="submit" size="sm" className="bg-green-600 hover:bg-green-700 text-white gap-1">
                            <CheckCircle className="h-3.5 w-3.5" /> Resolve
                          </Button>
                        </form>
                        <form action={dismissDispute}>
                          <input type="hidden" name="id" value={d.id} />
                          <Button type="submit" size="sm" variant="outline" className="border-red-200 text-red-600 hover:bg-red-50 gap-1">
                            <X className="h-3.5 w-3.5" /> Dismiss
                          </Button>
                        </form>
                      </div>
                    )}
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
