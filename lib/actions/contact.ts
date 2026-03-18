'use server'

import { createAdminClient } from '@/lib/supabase/admin'

export async function submitContact(data: {
  name: string
  email: string
  subject: string
  category: string
  message: string
}) {
  const admin = createAdminClient()
  const { error } = await admin.from('contact_messages').insert({
    name: data.name,
    email: data.email,
    subject: data.subject,
    category: data.category,
    message: data.message,
    status: 'unread',
  })
  if (error) return { success: false, error: error.message }
  return { success: true }
}
