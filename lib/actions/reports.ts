'use server'

import { createClient } from '@/lib/supabase/server'
import { createAdminClient } from '@/lib/supabase/admin'
import { normalizePhoneNumber, maskPhoneNumber, generateSlug } from '@/lib/utils'
import type { SearchFilters } from '@/types'

export async function getRecentReports(limit = 6) {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('reports')
    .select('id,slug,title,summary,platform,scam_type,alleged_name,business_name,phone_masked_public,username_handle,amount_range,published_at,report_status,view_count')
    .eq('report_status', 'published')
    .order('published_at', { ascending: false })
    .limit(limit)

  if (error) throw new Error(error.message)
  return data ?? []
}

export async function getReportBySlug(slug: string) {
  const supabase = await createClient()

  const { data: report, error } = await supabase
    .from('reports')
    .select('id,slug,title,summary,description,platform,scam_type,alleged_name,business_name,phone_masked_public,username_handle,alleged_email,incident_date,amount_range,location_general,report_status,published_at,updated_at,submitted_at')
    .eq('slug', slug)
    .eq('report_status', 'published')
    .single()

  if (error || !report) return null

  // Fetch public evidence
  const { data: evidence } = await supabase
    .from('report_evidence')
    .select('id,file_url,mime_type,is_redacted')
    .eq('report_id', report.id)
    .eq('is_public', true)

  // Increment view count (fire and forget via admin client)
  try {
    const admin = createAdminClient()
    await admin
      .from('reports')
      .update({ view_count: supabase.rpc('increment_view_count', { report_slug: slug }) as unknown as number })
      .eq('slug', slug)
  } catch { /* non-critical */ }

  return { ...report, evidence: evidence ?? [] }
}

export async function searchReports(filters: SearchFilters, page = 1, perPage = 12) {
  const supabase = await createClient()

  let query = supabase
    .from('reports')
    .select('id,slug,title,summary,platform,scam_type,alleged_name,business_name,phone_masked_public,username_handle,amount_range,published_at,report_status,view_count', { count: 'exact' })
    .eq('report_status', 'published')

  if (filters.query) {
    const q = filters.query.trim()
    const normalized = normalizePhoneNumber(q)
    if (/^\d{7,}$/.test(normalized)) {
      query = query.eq('phone_search_normalized', normalized)
    } else {
      query = query.or(
        `title.ilike.%${q}%,summary.ilike.%${q}%,alleged_name.ilike.%${q}%,business_name.ilike.%${q}%,username_handle.ilike.%${q}%,description.ilike.%${q}%`
      )
    }
  }

  if (filters.platform) query = query.eq('platform', filters.platform)
  if (filters.scam_type) query = query.eq('scam_type', filters.scam_type)

  if (filters.sort === 'views') {
    query = query.order('view_count', { ascending: false })
  } else {
    query = query.order('published_at', { ascending: false })
  }

  const from = (page - 1) * perPage
  query = query.range(from, from + perPage - 1)

  const { data, count, error } = await query
  if (error) throw new Error(error.message)

  return {
    data: data ?? [],
    meta: {
      page,
      per_page: perPage,
      total: count ?? 0,
      total_pages: Math.ceil((count ?? 0) / perPage),
    },
  }
}

export async function getRelatedReports(reportId: string, platform: string, phone?: string | null, limit = 4) {
  const supabase = await createClient()

  let query = supabase
    .from('reports')
    .select('id,slug,title,summary,platform,scam_type,published_at,report_status')
    .eq('report_status', 'published')
    .neq('id', reportId)
    .limit(limit)

  if (phone) {
    const normalized = normalizePhoneNumber(phone)
    query = query.eq('phone_search_normalized', normalized)
  } else {
    query = query.eq('platform', platform)
  }

  const { data } = await query
  return data ?? []
}

export async function submitReport(formData: FormData) {
  const supabase = await createClient()
  const admin = createAdminClient()

  const title = formData.get('title') as string
  const slug = generateSlug(`${title}-${Date.now()}`)
  const phone = (formData.get('phone_number') as string) || ''
  const normalized = normalizePhoneNumber(phone)
  const masked = phone ? maskPhoneNumber(phone) : null

  const insert = {
    slug,
    title: title.trim(),
    summary: ((formData.get('description') as string) || '').slice(0, 300),
    description: formData.get('description') as string,
    platform: formData.get('platform') as string,
    scam_type: formData.get('scam_type') as string,
    alleged_name: (formData.get('alleged_name') as string) || null,
    business_name: (formData.get('business_name') as string) || null,
    phone_full_private: phone || null,
    phone_search_normalized: normalized || null,
    phone_masked_public: masked,
    username_handle: (formData.get('username_handle') as string) || null,
    alleged_email: (formData.get('alleged_email') as string) || null,
    incident_date: (formData.get('incident_date') as string) || null,
    amount_range: (formData.get('amount_range') as string) || null,
    location_general: (formData.get('location_general') as string) || null,
    report_status: 'pending' as const,
    created_by_submitter_email: formData.get('submitter_email') as string,
  }

  const { data, error } = await admin.from('reports').insert(insert).select('id,slug').single()

  if (error) return { success: false, error: error.message }
  return { success: true, slug: data.slug, id: data.id }
}
