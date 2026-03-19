import { NextRequest, NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase/admin'
import { normalizePhoneNumber, maskPhoneNumber, generateSlug } from '@/lib/utils'
import type { Platform, ScamType, ReportStatus } from '@/types/database'

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData()
    const admin = createAdminClient()

    const phone = (formData.get('phone_number') as string) || ''
    const normalized = normalizePhoneNumber(phone)
    const masked = phone ? maskPhoneNumber(phone) : null
    const title = formData.get('title') as string
    const slug = generateSlug(`${title}-${Date.now()}`)
    const description = formData.get('description') as string

    // Insert report
    const { data: report, error } = await admin
      .from('reports')
      .insert({
        slug,
        title: title.trim(),
        summary: description.slice(0, 300),
        description,
        platform: formData.get('platform') as Platform,
        scam_type: formData.get('scam_type') as ScamType,
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
        report_status: 'pending' as ReportStatus,
        created_by_submitter_email: formData.get('submitter_email') as string,
      })
      .select('id,slug')
      .single()

    if (error) return NextResponse.json({ success: false, error: error.message }, { status: 400 })

    // Handle file uploads
    const files = formData.getAll('files') as File[]
    for (const file of files.slice(0, 5)) {
      if (!file.size) continue
      const ext = file.name.split('.').pop()
      const path = `reports/${report.id}/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`
      const { data: upload } = await admin.storage.from('evidence').upload(path, file, {
        contentType: file.type,
        upsert: false,
      })
      if (upload) {
        const { data: publicUrl } = admin.storage.from('evidence').getPublicUrl(path)
        await admin.from('report_evidence').insert({
          report_id: report.id,
          file_url: publicUrl.publicUrl,
          file_path: path,
          mime_type: file.type,
          is_redacted: false,
          is_public: true,
        })
      }
    }

    return NextResponse.json({ success: true, slug: report.slug })
  } catch (err) {
    console.error('Submit error:', err)
    return NextResponse.json({ success: false, error: 'Server error. Please try again.' }, { status: 500 })
  }
}
