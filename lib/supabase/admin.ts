import 'server-only'
import { createClient } from '@supabase/supabase-js'
import type { Database } from '@/types/database'

let _adminClient: ReturnType<typeof createClient<Database>> | null = null

export function createAdminClient() {
  if (_adminClient) return _adminClient

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY

  if (!url) throw new Error('Missing NEXT_PUBLIC_SUPABASE_URL')
  if (!key) throw new Error('Missing SUPABASE_SERVICE_ROLE_KEY')

  _adminClient = createClient<Database>(url, key, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  })

  return _adminClient
}
