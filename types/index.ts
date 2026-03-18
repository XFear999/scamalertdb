import type { Platform, ScamType, ReportStatus } from './database'

export type { Platform, ScamType, ReportStatus }

export interface SearchFilters {
  query?: string
  platform?: Platform | ''
  scam_type?: ScamType | ''
  status?: ReportStatus | ''
  sort?: 'recent' | 'views' | 'relevant'
}

export interface SearchParams extends SearchFilters {
  page?: number
  per_page?: number
}

export interface PaginationMeta {
  page: number
  per_page: number
  total: number
  total_pages: number
}

export interface SearchResult<T> {
  data: T[]
  meta: PaginationMeta
  error?: string
}

export interface ApiResponse<T = unknown> {
  data?: T
  error?: string
  message?: string
}

export interface ReportFormData {
  submitter_name: string
  submitter_email: string
  title: string
  platform: string
  scam_type: string
  alleged_name?: string
  business_name?: string
  phone_number?: string
  username_handle?: string
  alleged_email?: string
  incident_date?: string
  amount_range?: string
  location_general?: string
  description: string
  how_payment_requested?: string
  goods_services_delivered?: string
  link1?: string
  link2?: string
  truthfulness_confirmed: boolean
  sensitive_info_redacted: boolean
  turnstile_token?: string
  files?: File[]
}

export interface DisputeFormData {
  requester_name: string
  requester_email: string
  requester_phone?: string
  report_id_or_url: string
  relationship_to_report: string
  reason: string
  explanation: string
  good_faith_confirmed: boolean
  files?: File[]
}

export interface ContactFormData {
  name: string
  email: string
  subject: string
  category: string
  message: string
  turnstile_token?: string
}

export interface PlatformConfig {
  value: string
  label: string
  color: string
  bgColor: string
  textColor: string
  borderColor: string
  description: string
}

export interface ScamTypeConfig {
  value: string
  label: string
  description: string
}

export interface StatusConfig {
  value: ReportStatus
  label: string
  color: string
  bgColor: string
  textColor: string
  description: string
}

export interface BreadcrumbItem {
  label: string
  href?: string
}

export interface NavItem {
  label: string
  href: string
  icon?: string
  children?: NavItem[]
}
