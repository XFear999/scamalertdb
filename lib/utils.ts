import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { format, formatDistanceToNow, parseISO } from 'date-fns'
import slugify from 'slugify'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function maskPhoneNumber(phone: string): string {
  const digits = phone.replace(/\D/g, '')
  if (digits.length < 4) return '***-***-****'
  const last4 = digits.slice(-4)
  return `***-***-${last4}`
}

export function normalizePhoneNumber(phone: string): string {
  return phone.replace(/\D/g, '')
}

export function formatDate(date: string | Date): string {
  try {
    const d = typeof date === 'string' ? parseISO(date) : date
    return format(d, 'MMMM d, yyyy')
  } catch {
    return 'Unknown date'
  }
}

export function formatDateShort(date: string | Date): string {
  try {
    const d = typeof date === 'string' ? parseISO(date) : date
    return format(d, 'MMM d, yyyy')
  } catch {
    return ''
  }
}

export function formatRelativeDate(date: string | Date): string {
  try {
    const d = typeof date === 'string' ? parseISO(date) : date
    return formatDistanceToNow(d, { addSuffix: true })
  } catch {
    return ''
  }
}

export function generateSlug(text: string): string {
  return slugify(text, {
    lower: true,
    strict: true,
    trim: true,
  })
}

export function truncateText(text: string, length: number): string {
  if (text.length <= length) return text
  return text.slice(0, length).trimEnd() + '…'
}

export function formatAmountRange(range: string): string {
  const map: Record<string, string> = {
    under_100: 'Under $100',
    '100_500': '$100 – $500',
    '500_1000': '$500 – $1,000',
    '1000_5000': '$1,000 – $5,000',
    '5000_10000': '$5,000 – $10,000',
    over_10000: 'Over $10,000',
    unknown: 'Unknown',
  }
  return map[range] ?? range
}

export function getStatusBadgeClasses(status: string): string {
  const map: Record<string, string> = {
    pending: 'bg-amber-100 text-amber-800 border-amber-200',
    published: 'bg-blue-100 text-blue-800 border-blue-200',
    disputed: 'bg-orange-100 text-orange-800 border-orange-200',
    resolved: 'bg-green-100 text-green-800 border-green-200',
    removed: 'bg-red-100 text-red-800 border-red-200',
    rejected: 'bg-gray-100 text-gray-700 border-gray-200',
  }
  return map[status] ?? 'bg-gray-100 text-gray-700 border-gray-200'
}

export function getPlatformBadgeClasses(platform: string): string {
  const map: Record<string, string> = {
    zelle: 'bg-purple-100 text-purple-800 border-purple-200',
    venmo: 'bg-blue-100 text-blue-800 border-blue-200',
    cash_app: 'bg-green-100 text-green-800 border-green-200',
    paypal: 'bg-indigo-100 text-indigo-800 border-indigo-200',
    facebook_marketplace: 'bg-blue-100 text-blue-900 border-blue-300',
    instagram: 'bg-pink-100 text-pink-800 border-pink-200',
    whatsapp: 'bg-emerald-100 text-emerald-800 border-emerald-200',
    telegram: 'bg-sky-100 text-sky-800 border-sky-200',
    bank_transfer: 'bg-gray-100 text-gray-800 border-gray-200',
    wire_transfer: 'bg-amber-100 text-amber-800 border-amber-200',
    other: 'bg-neutral-100 text-neutral-700 border-neutral-200',
  }
  return map[platform] ?? 'bg-neutral-100 text-neutral-700 border-neutral-200'
}

export function formatPlatformLabel(platform: string): string {
  const map: Record<string, string> = {
    zelle: 'Zelle',
    venmo: 'Venmo',
    cash_app: 'Cash App',
    paypal: 'PayPal',
    facebook_marketplace: 'Facebook Marketplace',
    instagram: 'Instagram',
    whatsapp: 'WhatsApp',
    telegram: 'Telegram',
    bank_transfer: 'Bank Transfer',
    wire_transfer: 'Wire Transfer',
    other: 'Other',
  }
  return map[platform] ?? platform
}

export function formatScamTypeLabel(type: string): string {
  const map: Record<string, string> = {
    fake_item_listing: 'Fake Item Listing',
    advance_fee_fraud: 'Advance Fee Fraud',
    deposit_scam: 'Deposit Scam',
    seller_disappeared: 'Seller Disappeared',
    chargeback_scam: 'Chargeback Scam',
    fake_business_impersonation: 'Fake Business',
    fake_customer_support: 'Fake Support',
    romance_trust_scam: 'Romance Scam',
    rental_scam: 'Rental Scam',
    ticket_scam: 'Ticket Scam',
    refund_scam: 'Refund Scam',
    investment_scam: 'Investment Scam',
    donation_scam: 'Donation Scam',
    other: 'Other',
  }
  return map[type] ?? type
}

export function buildSearchUrl(params: Record<string, string | undefined>): string {
  const url = new URLSearchParams()
  for (const [key, val] of Object.entries(params)) {
    if (val && val.trim()) url.set(key, val.trim())
  }
  const str = url.toString()
  return str ? `/search?${str}` : '/search'
}

export function absoluteUrl(path: string): string {
  const base = process.env.NEXT_PUBLIC_APP_URL || 'https://scamalertdb.com'
  return `${base}${path}`
}
