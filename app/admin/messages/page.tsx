import { getContactMessages, markContactMessageRead } from '@/lib/actions/admin'
import { formatDate } from '@/lib/utils'
import { Card, CardContent } from '@/components/ui/card'
import { Mail, CheckCircle } from 'lucide-react'
import { revalidatePath } from 'next/cache'

async function markRead(formData: FormData) {
  'use server'
  await markContactMessageRead(formData.get('id') as string)
  revalidatePath('/admin/messages')
}

const CATEGORY_LABELS: Record<string, string> = {
  general: 'General Inquiry',
  report_abuse: 'Report Abuse',
  legal_notice: 'Legal Notice',
  media: 'Media/Press',
  technical: 'Technical Issue',
  other: 'Other',
}

const STATUS_COLORS: Record<string, string> = {
  unread: 'bg-blue-100 text-blue-800 border-blue-200',
  read: 'bg-slate-100 text-slate-600 border-slate-200',
  replied: 'bg-green-100 text-green-800 border-green-200',
  archived: 'bg-gray-100 text-gray-600 border-gray-200',
}

export default async function MessagesPage() {
  const messages = await getContactMessages()
  const unreadCount = messages.filter(m => m.status === 'unread').length

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-900">Contact Messages</h1>
        <p className="text-slate-500 text-sm">{unreadCount} unread · {messages.length} total</p>
      </div>

      {messages.length === 0 ? (
        <Card>
          <CardContent className="p-12 text-center">
            <CheckCircle className="h-10 w-10 text-green-500 mx-auto mb-3" />
            <h3 className="font-semibold text-slate-900 mb-1">No messages</h3>
            <p className="text-slate-500 text-sm">No contact messages have been submitted.</p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-3">
          {messages.map(m => (
            <Card key={m.id} className={m.status === 'unread' ? 'border-blue-200 bg-blue-50/20' : ''}>
              <CardContent className="p-5">
                <div className="flex items-start gap-3">
                  <Mail className={`h-5 w-5 mt-0.5 shrink-0 ${m.status === 'unread' ? 'text-blue-500' : 'text-slate-400'}`} />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-4 mb-2">
                      <div>
                        <p className="font-semibold text-slate-900">{m.name} <span className="font-normal text-slate-500 text-sm">— {m.email}</span></p>
                        <p className="text-sm font-medium text-slate-800 mt-0.5">{m.subject}</p>
                      </div>
                      <div className="flex items-center gap-2 shrink-0">
                        <span className="text-xs text-slate-400">{formatDate(m.created_at)}</span>
                        <span className={`inline-flex items-center rounded-full border px-2 py-0.5 text-xs font-medium ${STATUS_COLORS[m.status] ?? ''}`}>
                          {m.status}
                        </span>
                        {m.status !== 'unread' ? null : (
                          <span className="inline-flex items-center rounded-full bg-blue-600 px-2 py-0.5 text-xs font-medium text-white">new</span>
                        )}
                      </div>
                    </div>
                    <p className="text-xs text-slate-400 mb-2">Category: {CATEGORY_LABELS[m.category] ?? m.category}</p>
                    <div className="rounded-md bg-white border border-slate-200 p-3">
                      <p className="text-sm text-slate-700 leading-relaxed whitespace-pre-line">{m.message}</p>
                    </div>
                    {m.status === 'unread' && (
                      <form action={markRead} className="mt-3">
                        <input type="hidden" name="id" value={m.id} />
                        <button type="submit" className="text-xs text-blue-600 hover:text-blue-800 underline">
                          Mark as read
                        </button>
                      </form>
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
