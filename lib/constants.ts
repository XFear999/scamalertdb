import type { PlatformConfig, ScamTypeConfig, StatusConfig } from '@/types'

export const PLATFORMS: PlatformConfig[] = [
  {
    value: 'zelle',
    label: 'Zelle',
    color: '#6D1ED4',
    bgColor: 'bg-purple-100',
    textColor: 'text-purple-800',
    borderColor: 'border-purple-200',
    description: 'Bank-to-bank instant payment network',
  },
  {
    value: 'venmo',
    label: 'Venmo',
    color: '#3D95CE',
    bgColor: 'bg-blue-100',
    textColor: 'text-blue-800',
    borderColor: 'border-blue-200',
    description: 'Social mobile payment service by PayPal',
  },
  {
    value: 'cash_app',
    label: 'Cash App',
    color: '#00D632',
    bgColor: 'bg-green-100',
    textColor: 'text-green-800',
    borderColor: 'border-green-200',
    description: 'Mobile payment service by Block, Inc.',
  },
  {
    value: 'paypal',
    label: 'PayPal',
    color: '#003087',
    bgColor: 'bg-indigo-100',
    textColor: 'text-indigo-800',
    borderColor: 'border-indigo-200',
    description: 'Online payments and money transfers',
  },
  {
    value: 'facebook_marketplace',
    label: 'Facebook Marketplace',
    color: '#1877F2',
    bgColor: 'bg-blue-100',
    textColor: 'text-blue-900',
    borderColor: 'border-blue-300',
    description: 'Buy and sell marketplace on Facebook',
  },
  {
    value: 'instagram',
    label: 'Instagram',
    color: '#E1306C',
    bgColor: 'bg-pink-100',
    textColor: 'text-pink-800',
    borderColor: 'border-pink-200',
    description: 'Social media platform used for marketplace sales',
  },
  {
    value: 'whatsapp',
    label: 'WhatsApp',
    color: '#25D366',
    bgColor: 'bg-emerald-100',
    textColor: 'text-emerald-800',
    borderColor: 'border-emerald-200',
    description: 'Messaging app used to conduct payment transactions',
  },
  {
    value: 'telegram',
    label: 'Telegram',
    color: '#2CA5E0',
    bgColor: 'bg-sky-100',
    textColor: 'text-sky-800',
    borderColor: 'border-sky-200',
    description: 'Messaging platform frequently targeted by scammers',
  },
  {
    value: 'bank_transfer',
    label: 'Bank Transfer',
    color: '#374151',
    bgColor: 'bg-gray-100',
    textColor: 'text-gray-800',
    borderColor: 'border-gray-200',
    description: 'Direct bank account transfers (ACH/wire)',
  },
  {
    value: 'wire_transfer',
    label: 'Wire Transfer',
    color: '#92400E',
    bgColor: 'bg-amber-100',
    textColor: 'text-amber-800',
    borderColor: 'border-amber-200',
    description: 'Domestic or international wire transfers',
  },
  {
    value: 'other',
    label: 'Other',
    color: '#6B7280',
    bgColor: 'bg-neutral-100',
    textColor: 'text-neutral-700',
    borderColor: 'border-neutral-200',
    description: 'Other platforms not listed above',
  },
]

export const SCAM_TYPES: ScamTypeConfig[] = [
  { value: 'fake_item_listing', label: 'Fake Item Listing', description: 'Non-existent or misrepresented items posted for sale' },
  { value: 'advance_fee_fraud', label: 'Advance Fee Fraud', description: 'Upfront payment required before receiving goods, services, or winnings' },
  { value: 'deposit_scam', label: 'Deposit Scam', description: 'Fraudulent deposit requests for rentals, jobs, or services' },
  { value: 'seller_disappeared', label: 'Seller Disappeared After Payment', description: 'No contact after receiving payment' },
  { value: 'chargeback_scam', label: 'Chargeback Scam', description: 'Payment reversed or disputed after receiving goods' },
  { value: 'fake_business_impersonation', label: 'Fake Business Impersonation', description: 'Impersonating a legitimate brand or company' },
  { value: 'fake_customer_support', label: 'Fake Customer Support', description: 'Impersonating support staff to steal credentials or money' },
  { value: 'romance_trust_scam', label: 'Romance / Trust Scam', description: 'Building false trust over time before requesting money' },
  { value: 'rental_scam', label: 'Rental Scam', description: 'Fraudulent rental listings with false property claims' },
  { value: 'ticket_scam', label: 'Ticket Scam', description: 'Selling counterfeit or non-existent event tickets' },
  { value: 'refund_scam', label: 'Refund Scam', description: 'Falsely offering refunds or overpayment to extract money' },
  { value: 'investment_scam', label: 'Investment Scam', description: 'Fake investment opportunities or Ponzi schemes' },
  { value: 'donation_scam', label: 'Donation Scam', description: 'Fraudulent charity or crowdfunding requests' },
  { value: 'other', label: 'Other', description: 'Does not fit the categories above' },
]

export const REPORT_STATUSES: StatusConfig[] = [
  {
    value: 'pending',
    label: 'Pending Review',
    color: '#F59E0B',
    bgColor: 'bg-amber-100',
    textColor: 'text-amber-800',
    description: 'Submitted and awaiting moderator review',
  },
  {
    value: 'published',
    label: 'Published',
    color: '#3B82F6',
    bgColor: 'bg-blue-100',
    textColor: 'text-blue-800',
    description: 'Reviewed and visible to the public',
  },
  {
    value: 'disputed',
    label: 'Disputed',
    color: '#F97316',
    bgColor: 'bg-orange-100',
    textColor: 'text-orange-800',
    description: 'Subject to an active dispute or removal request',
  },
  {
    value: 'resolved',
    label: 'Resolved',
    color: '#22C55E',
    bgColor: 'bg-green-100',
    textColor: 'text-green-800',
    description: 'Matter has been resolved or verified as settled',
  },
  {
    value: 'removed',
    label: 'Removed',
    color: '#EF4444',
    bgColor: 'bg-red-100',
    textColor: 'text-red-800',
    description: 'Removed by admin following review',
  },
  {
    value: 'rejected',
    label: 'Rejected',
    color: '#6B7280',
    bgColor: 'bg-gray-100',
    textColor: 'text-gray-700',
    description: 'Did not meet submission guidelines',
  },
]

export const AMOUNT_RANGES = [
  { value: 'under_100', label: 'Under $100' },
  { value: '100_500', label: '$100 – $500' },
  { value: '500_1000', label: '$500 – $1,000' },
  { value: '1000_5000', label: '$1,000 – $5,000' },
  { value: '5000_10000', label: '$5,000 – $10,000' },
  { value: 'over_10000', label: 'Over $10,000' },
  { value: 'unknown', label: 'Unknown / Not disclosed' },
]

export const RELATIONSHIP_OPTIONS = [
  { value: 'subject_of_report', label: 'I am the person named in this report' },
  { value: 'representative', label: 'I am a legal representative of the person named' },
  { value: 'business_owner', label: 'I own or represent the business named' },
  { value: 'third_party', label: 'I am a concerned third party' },
  { value: 'other', label: 'Other' },
]

export const CONTACT_CATEGORIES = [
  { value: 'general', label: 'General Inquiry' },
  { value: 'report_abuse', label: 'Report Abuse / Misuse' },
  { value: 'legal_notice', label: 'Legal Notice' },
  { value: 'media', label: 'Media / Press Inquiry' },
  { value: 'technical', label: 'Technical Issue' },
  { value: 'other', label: 'Other' },
]

export const DISPUTE_REASONS = [
  { value: 'false_information', label: 'The report contains false information' },
  { value: 'mistaken_identity', label: 'I am not the person described in this report' },
  { value: 'resolved_matter', label: 'This matter has been resolved' },
  { value: 'duplicate', label: 'This is a duplicate or outdated report' },
  { value: 'privacy_violation', label: 'The report contains private information' },
  { value: 'other', label: 'Other reason' },
]

export const SITE_NAME = 'ScamAlertDB'
export const SITE_DESCRIPTION = 'A public platform for reporting and searching alleged scam incidents involving payment platforms and online marketplaces.'
export const SITE_URL = process.env.NEXT_PUBLIC_APP_URL || 'https://scamalertdb.com'

export const getPlatform = (value: string): PlatformConfig | undefined =>
  PLATFORMS.find(p => p.value === value)

export const getScamType = (value: string): ScamTypeConfig | undefined =>
  SCAM_TYPES.find(s => s.value === value)

export const getStatus = (value: string): StatusConfig | undefined =>
  REPORT_STATUSES.find(s => s.value === value)
