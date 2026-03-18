'use server'

import { createAdminClient } from '@/lib/supabase/admin'

export async function submitDispute(formData: {
  requester_name: string
  requester_email: string
  requester_phone?: string
  report_id_or_url: string
  relationship_to_report: string
  reason: string
  explanation: string
}) {
  const admin = createAdminClient()

  // Resolve report ID from URL or direct ID
  let reportId = formData.report_id_or_url.trim()

  // If it looks like a URL or slug, try to find the report
  if (reportId.includes('/') || !reportId.match(/^[0-9a-f-]{36}$/i)) {
    const slug = reportId.split('/').pop() ?? reportId
    const { data: report } = await admin
      .from('reports')
      .select('id')
      .eq('slug', slug)
      .single()
    if (report) reportId = report.id
  }

  const { error } = await admin.from('disputes').insert({
    report_id: reportId,
    requester_name: formData.requester_name,
    requester_email: formData.requester_email,
    requester_phone: formData.requester_phone || null,
    relationship_to_report: formData.relationship_to_report,
    reason: formData.reason,
    explanation: formData.explanation,
    status: 'open',
  })

  if (error) return { success: false, error: error.message }
  return { success: true }
}
