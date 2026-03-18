'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Loader2, CheckCircle, AlertTriangle, Upload, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Checkbox } from '@/components/ui/checkbox'
import { Card, CardContent } from '@/components/ui/card'
import { reportSubmissionSchema, type ReportSubmissionInput } from '@/lib/validations'
import { PLATFORMS, SCAM_TYPES, AMOUNT_RANGES } from '@/lib/constants'

const ACCEPTED_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'application/pdf']
const MAX_FILE_SIZE = 10 * 1024 * 1024 // 10 MB
const MAX_FILES = 5

export default function SubmitReportPage() {
  const [files, setFiles] = useState<File[]>([])
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitResult, setSubmitResult] = useState<{ success: boolean; slug?: string; error?: string } | null>(null)

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<ReportSubmissionInput>({
    resolver: zodResolver(reportSubmissionSchema),
    defaultValues: { truthfulness_confirmed: false, sensitive_info_redacted: false },
  })

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const selected = Array.from(e.target.files ?? [])
    const valid = selected.filter(f => ACCEPTED_TYPES.includes(f.type) && f.size <= MAX_FILE_SIZE)
    setFiles(prev => [...prev, ...valid].slice(0, MAX_FILES))
  }

  function removeFile(index: number) {
    setFiles(prev => prev.filter((_, i) => i !== index))
  }

  async function onSubmit(data: ReportSubmissionInput) {
    setIsSubmitting(true)
    try {
      const formData = new FormData()
      Object.entries(data).forEach(([k, v]) => {
        if (v !== undefined && v !== null) formData.append(k, String(v))
      })
      files.forEach(f => formData.append('files', f))

      const res = await fetch('/api/submit', { method: 'POST', body: formData })
      const result = await res.json()
      setSubmitResult(result)
    } catch {
      setSubmitResult({ success: false, error: 'An unexpected error occurred. Please try again.' })
    } finally {
      setIsSubmitting(false)
    }
  }

  if (submitResult?.success) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-20 text-center sm:px-6">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-100 mx-auto mb-6">
          <CheckCircle className="h-8 w-8 text-green-600" />
        </div>
        <h1 className="text-2xl font-bold text-foreground mb-3">Report Submitted Successfully</h1>
        <p className="text-muted-foreground mb-6 max-w-md mx-auto">
          Your report has been received and placed in our moderation queue. Our team will review it within
          2–5 business days. Approved reports will be published and become searchable on the site.
        </p>
        <p className="text-sm text-muted-foreground mb-8">
          <strong>What happens next:</strong> We review every submission for compliance with our Content Policy
          before making it publicly visible. You will not receive a public notification, but reports that
          meet our guidelines are typically published within a few business days.
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          <Button asChild variant="outline"><a href="/search">Search Reports</a></Button>
          <Button asChild className="bg-blue-600 hover:bg-blue-700 text-white"><a href="/submit">Submit Another Report</a></Button>
        </div>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-foreground mb-2">Submit a Report</h1>
        <p className="text-muted-foreground leading-relaxed">
          Use this form to report an alleged scam incident involving a payment platform or online marketplace.
          All submissions are reviewed by our moderation team before publication.
          Your contact information is kept private.
        </p>
      </div>

      {/* Important warnings */}
      <Card className="border-amber-200 bg-amber-50 mb-8">
        <CardContent className="p-5">
          <div className="flex items-start gap-3">
            <AlertTriangle className="h-5 w-5 text-amber-600 mt-0.5 shrink-0" />
            <div className="text-sm text-amber-900">
              <p className="font-semibold mb-2">Before you submit — important notice</p>
              <ul className="space-y-1 list-disc list-inside text-amber-800">
                <li>Submit only truthful information to the best of your knowledge</li>
                <li>Do <strong>not</strong> upload government-issued IDs</li>
                <li>Do <strong>not</strong> upload home addresses or physical locations</li>
                <li>Do <strong>not</strong> upload bank account or routing numbers</li>
                <li>Do <strong>not</strong> upload private photos unrelated to the alleged incident</li>
                <li>Redact sensitive personal details from screenshots before uploading</li>
              </ul>
              <p className="mt-2 text-xs">
                Submitting false, defamatory, or malicious reports may result in removal and potential legal consequences.
                By submitting, you agree to our <a href="/legal/content-policy" className="underline">Content Policy</a> and <a href="/legal/terms" className="underline">Terms of Use</a>.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        {/* Section: Your contact info */}
        <fieldset className="space-y-4">
          <legend className="text-base font-semibold text-foreground pb-2 border-b border-border w-full">
            Your Contact Information <span className="text-xs font-normal text-muted-foreground">(private, not published)</span>
          </legend>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-1.5">
              <Label htmlFor="submitter_name">Your Full Name <span className="text-red-500">*</span></Label>
              <Input id="submitter_name" {...register('submitter_name')} placeholder="Jane Smith" />
              {errors.submitter_name && <p className="text-xs text-red-500">{errors.submitter_name.message}</p>}
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="submitter_email">Your Email Address <span className="text-red-500">*</span></Label>
              <Input id="submitter_email" type="email" {...register('submitter_email')} placeholder="jane@example.com" />
              {errors.submitter_email && <p className="text-xs text-red-500">{errors.submitter_email.message}</p>}
            </div>
          </div>
        </fieldset>

        {/* Section: Report details */}
        <fieldset className="space-y-4">
          <legend className="text-base font-semibold text-foreground pb-2 border-b border-border w-full">Report Details</legend>
          <div className="space-y-1.5">
            <Label htmlFor="title">Report Title <span className="text-red-500">*</span></Label>
            <Input id="title" {...register('title')} placeholder="Brief description, e.g. 'Fake PS5 listing on Facebook Marketplace'" />
            {errors.title && <p className="text-xs text-red-500">{errors.title.message}</p>}
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-1.5">
              <Label>Platform <span className="text-red-500">*</span></Label>
              <Select onValueChange={v => setValue('platform', v)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a platform" />
                </SelectTrigger>
                <SelectContent>
                  {PLATFORMS.map(p => (
                    <SelectItem key={p.value} value={p.value}>{p.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.platform && <p className="text-xs text-red-500">{errors.platform.message}</p>}
            </div>
            <div className="space-y-1.5">
              <Label>Scam Type <span className="text-red-500">*</span></Label>
              <Select onValueChange={v => setValue('scam_type', v)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a scam type" />
                </SelectTrigger>
                <SelectContent>
                  {SCAM_TYPES.map(s => (
                    <SelectItem key={s.value} value={s.value}>{s.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.scam_type && <p className="text-xs text-red-500">{errors.scam_type.message}</p>}
            </div>
          </div>
        </fieldset>

        {/* Section: Alleged party identifiers */}
        <fieldset className="space-y-4">
          <legend className="text-base font-semibold text-foreground pb-2 border-b border-border w-full">
            Alleged Party Identifiers <span className="text-xs font-normal text-muted-foreground">(provide at least one)</span>
          </legend>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-1.5">
              <Label htmlFor="alleged_name">Alleged Person Name</Label>
              <Input id="alleged_name" {...register('alleged_name')} placeholder="Full name if known" />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="business_name">Business Name</Label>
              <Input id="business_name" {...register('business_name')} placeholder="Business or brand name if applicable" />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="phone_number">Phone Number</Label>
              <Input id="phone_number" {...register('phone_number')} placeholder="+1 (555) 000-0000" />
              <p className="text-xs text-muted-foreground">Will be masked publicly. Only last 4 digits shown.</p>
              {errors.phone_number && <p className="text-xs text-red-500">{errors.phone_number.message}</p>}
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="username_handle">Username / Handle</Label>
              <Input id="username_handle" {...register('username_handle')} placeholder="@username or payment handle" />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="alleged_email">Alleged Email Address</Label>
              <Input id="alleged_email" type="email" {...register('alleged_email')} placeholder="Email address if known (optional)" />
              {errors.alleged_email && <p className="text-xs text-red-500">{errors.alleged_email.message}</p>}
            </div>
          </div>
          {errors.alleged_name && (
            <p className="text-xs text-red-500">{errors.alleged_name.message}</p>
          )}
        </fieldset>

        {/* Section: Incident details */}
        <fieldset className="space-y-4">
          <legend className="text-base font-semibold text-foreground pb-2 border-b border-border w-full">Incident Details</legend>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-1.5">
              <Label htmlFor="incident_date">Incident Date</Label>
              <Input id="incident_date" type="date" {...register('incident_date')} />
            </div>
            <div className="space-y-1.5">
              <Label>Approximate Amount</Label>
              <Select onValueChange={v => setValue('amount_range', v)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select range (optional)" />
                </SelectTrigger>
                <SelectContent>
                  {AMOUNT_RANGES.map(a => (
                    <SelectItem key={a.value} value={a.value}>{a.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1.5 sm:col-span-2">
              <Label htmlFor="location_general">General Location (optional)</Label>
              <Input id="location_general" {...register('location_general')} placeholder="City, State — do not enter a full street address" />
            </div>
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="description">Incident Description <span className="text-red-500">*</span></Label>
            <Textarea
              id="description"
              {...register('description')}
              rows={7}
              placeholder="Describe what happened in detail. Include: how you were contacted, what was promised, how payment was requested, what (if anything) was received, and any other relevant details. Minimum 50 characters."
            />
            {errors.description && <p className="text-xs text-red-500">{errors.description.message}</p>}
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-1.5">
              <Label htmlFor="how_payment_requested">How Was Payment Requested?</Label>
              <Input id="how_payment_requested" {...register('how_payment_requested')} placeholder="e.g. via Zelle to phone number" />
            </div>
            <div className="space-y-1.5">
              <Label>Were goods/services delivered?</Label>
              <Select onValueChange={v => setValue('goods_services_delivered', v)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select (optional)" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="no">No — nothing was received</SelectItem>
                  <SelectItem value="partial">Partial — something was delivered but not as described</SelectItem>
                  <SelectItem value="yes">Yes — but there were other issues</SelectItem>
                  <SelectItem value="unknown">Unknown / unsure</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-1.5">
              <Label htmlFor="link1">Supporting Link 1 (optional)</Label>
              <Input id="link1" {...register('link1')} type="url" placeholder="https://example.com/listing" />
              {errors.link1 && <p className="text-xs text-red-500">{errors.link1.message}</p>}
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="link2">Supporting Link 2 (optional)</Label>
              <Input id="link2" {...register('link2')} type="url" placeholder="https://example.com/profile" />
              {errors.link2 && <p className="text-xs text-red-500">{errors.link2.message}</p>}
            </div>
          </div>
        </fieldset>

        {/* Section: Evidence uploads */}
        <fieldset className="space-y-4">
          <legend className="text-base font-semibold text-foreground pb-2 border-b border-border w-full">Evidence Uploads (optional)</legend>
          <div className="rounded-lg border-2 border-dashed border-border p-6 text-center">
            <Upload className="mx-auto h-8 w-8 text-muted-foreground mb-2" />
            <p className="text-sm text-muted-foreground mb-1">Upload screenshots or PDFs related to this incident</p>
            <p className="text-xs text-muted-foreground mb-3">JPG, PNG, WebP, GIF, PDF — max 10 MB per file — up to 5 files</p>
            <input
              type="file"
              multiple
              accept={ACCEPTED_TYPES.join(',')}
              onChange={handleFileChange}
              className="hidden"
              id="file-upload"
            />
            <label
              htmlFor="file-upload"
              className="cursor-pointer inline-flex items-center gap-2 rounded-md border border-border bg-background px-4 py-2 text-sm font-medium hover:bg-muted transition-colors"
            >
              Choose Files
            </label>
          </div>

          {/* Warning */}
          <div className="rounded-md border border-red-200 bg-red-50 p-3 text-xs text-red-800">
            <strong>Before uploading:</strong> Remove or blur any government ID numbers, bank account details, home addresses, photos of minors, or private information unrelated to this alleged incident. Uploads containing such information will be redacted or removed by our team.
          </div>

          {/* Preview */}
          {files.length > 0 && (
            <ul className="space-y-2">
              {files.map((file, i) => (
                <li key={i} className="flex items-center justify-between rounded-md border border-border px-3 py-2 text-sm">
                  <span className="truncate max-w-xs text-foreground">{file.name}</span>
                  <div className="flex items-center gap-3 shrink-0">
                    <span className="text-xs text-muted-foreground">{(file.size / 1024).toFixed(0)} KB</span>
                    <button type="button" onClick={() => removeFile(i)} className="text-muted-foreground hover:text-red-500">
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </fieldset>

        {/* Confirmations */}
        <fieldset className="space-y-4">
          <legend className="text-base font-semibold text-foreground pb-2 border-b border-border w-full">Confirmations</legend>
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <Checkbox
                id="truthfulness_confirmed"
                onCheckedChange={v => setValue('truthfulness_confirmed', v === true)}
              />
              <Label htmlFor="truthfulness_confirmed" className="text-sm leading-relaxed font-normal cursor-pointer">
                <span className="font-semibold">I confirm</span> that, to the best of my knowledge, the information I have provided is truthful, accurate, and based on my direct experience or first-hand knowledge of this alleged incident.
              </Label>
            </div>
            {errors.truthfulness_confirmed && <p className="text-xs text-red-500">{errors.truthfulness_confirmed.message}</p>}

            <div className="flex items-start gap-3">
              <Checkbox
                id="sensitive_info_redacted"
                onCheckedChange={v => setValue('sensitive_info_redacted', v === true)}
              />
              <Label htmlFor="sensitive_info_redacted" className="text-sm leading-relaxed font-normal cursor-pointer">
                <span className="font-semibold">I confirm</span> that I have reviewed all uploaded files and removed or obscured any sensitive personal information including ID numbers, bank account details, home addresses, and photos of minors.
              </Label>
            </div>
            {errors.sensitive_info_redacted && <p className="text-xs text-red-500">{errors.sensitive_info_redacted.message}</p>}
          </div>
        </fieldset>

        {/* Submit error */}
        {submitResult?.error && (
          <div className="rounded-md border border-red-200 bg-red-50 p-3 text-sm text-red-800">
            {submitResult.error}
          </div>
        )}

        <Button
          type="submit"
          disabled={isSubmitting}
          size="lg"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white"
        >
          {isSubmitting ? (
            <><Loader2 className="h-4 w-4 animate-spin mr-2" /> Submitting…</>
          ) : (
            'Submit Report for Review'
          )}
        </Button>

        <p className="text-center text-xs text-muted-foreground">
          By submitting, you agree to our{' '}
          <a href="/legal/terms" className="underline">Terms of Use</a>,{' '}
          <a href="/legal/content-policy" className="underline">Content Policy</a>, and{' '}
          <a href="/legal/privacy" className="underline">Privacy Policy</a>.
        </p>
      </form>
    </div>
  )
}
