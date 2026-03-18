import { z } from 'zod'

export const reportSubmissionSchema = z.object({
  submitter_name: z.string().min(2, 'Full name is required').max(100),
  submitter_email: z.string().email('A valid email address is required'),
  title: z.string().min(10, 'Title must be at least 10 characters').max(200, 'Title is too long'),
  platform: z.string().min(1, 'Please select a platform'),
  scam_type: z.string().min(1, 'Please select a scam type'),
  alleged_name: z.string().max(200).optional(),
  business_name: z.string().max(200).optional(),
  phone_number: z
    .string()
    .max(20)
    .optional()
    .refine(val => !val || /^[\d\s\-()+.]+$/.test(val), 'Enter a valid phone number'),
  username_handle: z.string().max(100).optional(),
  alleged_email: z
    .string()
    .optional()
    .refine(val => !val || z.string().email().safeParse(val).success, 'Enter a valid email'),
  incident_date: z.string().optional(),
  amount_range: z.string().optional(),
  location_general: z.string().max(200).optional(),
  description: z.string().min(50, 'Please provide at least 50 characters describing the incident').max(10000),
  how_payment_requested: z.string().max(1000).optional(),
  goods_services_delivered: z.string().optional(),
  link1: z.string().url('Enter a valid URL').optional().or(z.literal('')),
  link2: z.string().url('Enter a valid URL').optional().or(z.literal('')),
  truthfulness_confirmed: z.boolean().refine(v => v === true, 'You must confirm the accuracy of your submission'),
  sensitive_info_redacted: z.boolean().refine(v => v === true, 'Please confirm you have redacted sensitive information'),
}).refine(
  data => !!(data.alleged_name || data.business_name || data.phone_number || data.username_handle),
  {
    message: 'Please provide at least one identifier: name, business name, phone number, or username',
    path: ['alleged_name'],
  }
)

export const disputeFormSchema = z.object({
  requester_name: z.string().min(2, 'Full name is required').max(200),
  requester_email: z.string().email('A valid email address is required'),
  requester_phone: z.string().max(20).optional(),
  report_id_or_url: z.string().min(1, 'Report ID or URL is required').max(500),
  relationship_to_report: z.string().min(1, 'Please select your relationship to this report'),
  reason: z.string().min(1, 'Please select a reason'),
  explanation: z
    .string()
    .min(50, 'Please provide at least 50 characters explaining your dispute')
    .max(5000),
  good_faith_confirmed: z
    .boolean()
    .refine(v => v === true, 'You must confirm you are submitting this request in good faith'),
})

export const contactFormSchema = z.object({
  name: z.string().min(2, 'Name is required').max(200),
  email: z.string().email('A valid email address is required'),
  subject: z.string().min(5, 'Subject must be at least 5 characters').max(300),
  category: z.string().min(1, 'Please select a category'),
  message: z.string().min(20, 'Message must be at least 20 characters').max(5000),
})

export const searchSchema = z.object({
  query: z.string().max(200).optional(),
  platform: z.string().optional(),
  scam_type: z.string().optional(),
  status: z.string().optional(),
  sort: z.enum(['recent', 'views', 'relevant']).optional(),
  page: z.coerce.number().int().min(1).optional().default(1),
})

export const adminReportUpdateSchema = z.object({
  report_status: z.enum(['pending', 'published', 'disputed', 'resolved', 'removed', 'rejected']),
  moderation_notes: z.string().max(2000).optional(),
})

export type ReportSubmissionInput = z.infer<typeof reportSubmissionSchema>
export type DisputeFormInput = z.infer<typeof disputeFormSchema>
export type ContactFormInput = z.infer<typeof contactFormSchema>
export type SearchInput = z.infer<typeof searchSchema>
export type AdminReportUpdateInput = z.infer<typeof adminReportUpdateSchema>
