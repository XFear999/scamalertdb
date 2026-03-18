'use server'

import { createAdminClient } from '@/lib/supabase/admin'
import { createClient } from '@/lib/supabase/server'

async function getAdminUser() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error('Unauthorized')
  return user
}

async function logAudit(actorId: string, actionType: string, targetType: string, targetId: string, details?: object) {
  const admin = createAdminClient()
  await admin.from('audit_logs').insert({
    actor_id: actorId,
    action_type: actionType,
    target_type: targetType,
    target_id: targetId,
    details_json: details ?? null,
  })
}

export async function getAdminReports(filters?: { status?: string; platform?: string }, page = 1, perPage = 20) {
  await getAdminUser()
  const admin = createAdminClient()

  let query = admin
    .from('reports')
    .select('*', { count: 'exact' })
    .order('submitted_at', { ascending: false })

  if (filters?.status) query = query.eq('report_status', filters.status)
  if (filters?.platform) query = query.eq('platform', filters.platform)

  const from = (page - 1) * perPage
  query = query.range(from, from + perPage - 1)

  const { data, count, error } = await query
  if (error) throw new Error(error.message)
  return { data: data ?? [], total: count ?? 0 }
}

export async function getPendingQueue() {
  await getAdminUser()
  const admin = createAdminClient()
  const { data, error } = await admin
    .from('reports')
    .select('*')
    .eq('report_status', 'pending')
    .order('submitted_at', { ascending: true })
  if (error) throw new Error(error.message)
  return data ?? []
}

export async function updateReportStatus(
  reportId: string,
  status: string,
  notes?: string
) {
  const user = await getAdminUser()
  const admin = createAdminClient()

  const update: Record<string, unknown> = {
    report_status: status,
    updated_at: new Date().toISOString(),
  }
  if (notes !== undefined) update.moderation_notes = notes
  if (status === 'published') update.published_at = new Date().toISOString()

  const { error } = await admin.from('reports').update(update).eq('id', reportId)
  if (error) return { success: false, error: error.message }

  await logAudit(user.id, 'update_report_status', 'report', reportId, { status, notes })
  return { success: true }
}

export async function getDisputesQueue(status?: string) {
  await getAdminUser()
  const admin = createAdminClient()
  let query = admin
    .from('disputes')
    .select('*, reports(slug, title, platform)')
    .order('created_at', { ascending: true })
  if (status) query = query.eq('status', status)
  const { data, error } = await query
  if (error) throw new Error(error.message)
  return data ?? []
}

export async function updateDisputeStatus(disputeId: string, status: string, notes?: string) {
  const user = await getAdminUser()
  const admin = createAdminClient()
  const { error } = await admin
    .from('disputes')
    .update({ status, admin_notes: notes, updated_at: new Date().toISOString() })
    .eq('id', disputeId)
  if (error) return { success: false, error: error.message }
  await logAudit(user.id, 'update_dispute_status', 'dispute', disputeId, { status })
  return { success: true }
}

export async function getContactMessages(status?: string) {
  await getAdminUser()
  const admin = createAdminClient()
  let query = admin.from('contact_messages').select('*').order('created_at', { ascending: false })
  if (status) query = query.eq('status', status)
  const { data, error } = await query
  if (error) throw new Error(error.message)
  return data ?? []
}

export async function getDashboardStats() {
  await getAdminUser()
  const admin = createAdminClient()

  const [
    { count: totalReports },
    { count: pendingReports },
    { count: publishedReports },
    { count: openDisputes },
    { count: unreadMessages },
  ] = await Promise.all([
    admin.from('reports').select('*', { count: 'exact', head: true }),
    admin.from('reports').select('*', { count: 'exact', head: true }).eq('report_status', 'pending'),
    admin.from('reports').select('*', { count: 'exact', head: true }).eq('report_status', 'published'),
    admin.from('disputes').select('*', { count: 'exact', head: true }).eq('status', 'open'),
    admin.from('contact_messages').select('*', { count: 'exact', head: true }).eq('status', 'unread'),
  ])

  return {
    totalReports: totalReports ?? 0,
    pendingReports: pendingReports ?? 0,
    publishedReports: publishedReports ?? 0,
    openDisputes: openDisputes ?? 0,
    unreadMessages: unreadMessages ?? 0,
  }
}

export async function getAuditLogs(limit = 50) {
  await getAdminUser()
  const admin = createAdminClient()
  const { data, error } = await admin
    .from('audit_logs')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(limit)
  if (error) throw new Error(error.message)
  return data ?? []
}
