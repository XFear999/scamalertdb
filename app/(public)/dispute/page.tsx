'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Loader2, CheckCircle, AlertTriangle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Checkbox } from '@/components/ui/checkbox'
import { Card, CardContent } from '@/components/ui/card'
import { disputeFormSchema, type DisputeFormInput } from '@/lib/validations'
import { RELATIONSHIP_OPTIONS, DISPUTE_REASONS } from '@/lib/constants'
import { submitDispute } from '@/lib/actions/disputes'

export default function DisputePage() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [result, setResult] = useState<{ success: boolean; error?: string } | null>(null)

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<DisputeFormInput>({
    resolver: zodResolver(disputeFormSchema),
    defaultValues: { good_faith_confirmed: false },
  })

  async function onSubmit(data: DisputeFormInput) {
    setIsSubmitting(true)
    try {
      const res = await submitDispute({
        requester_name: data.requester_name,
        requester_email: data.requester_email,
        requester_phone: data.requester_phone,
        report_id_or_url: data.report_id_or_url,
        relationship_to_report: data.relationship_to_report,
        reason: data.reason,
        explanation: data.explanation,
      })
      setResult(res)
    } catch {
      setResult({ success: false, error: 'An unexpected error occurred. Please try again.' })
    } finally {
      setIsSubmitting(false)
    }
  }

  if (result?.success) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-20 text-center sm:px-6">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-100 mx-auto mb-6">
          <CheckCircle className="h-8 w-8 text-green-600" />
        </div>
        <h1 className="text-2xl font-bold text-foreground mb-3">Request Received</h1>
        <p className="text-muted-foreground mb-6 max-w-md mx-auto">
          Your dispute or removal request has been submitted. Our team will review it and
          respond within 5–7 business days. If additional information is needed, we will
          contact you at the email address you provided.
        </p>
        <Button asChild variant="outline"><a href="/">Return Home</a></Button>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-foreground mb-2">Dispute or Removal Request</h1>
        <p className="text-muted-foreground leading-relaxed">
          If you believe a report published on ScamAlertDB is false, inaccurate, or violates our
          Content Policy, you have the right to submit a dispute or removal request.
          We take all requests seriously and review each one individually.
        </p>
      </div>

      <Card className="border-blue-200 bg-blue-50 mb-8">
        <CardContent className="p-5 text-sm text-blue-900">
          <p className="font-semibold mb-2">What happens after you submit?</p>
          <ol className="list-decimal list-inside space-y-1 text-blue-800">
            <li>Your request is logged and assigned for review</li>
            <li>Our moderation team reviews the report and your dispute</li>
            <li>If warranted, the report may be updated, marked as disputed, or removed</li>
            <li>We may contact you at your email address for additional information</li>
          </ol>
        </CardContent>
      </Card>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        {/* Your info */}
        <fieldset className="space-y-4">
          <legend className="text-base font-semibold text-foreground pb-2 border-b border-border w-full">Your Contact Information</legend>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-1.5">
              <Label htmlFor="requester_name">Full Name <span className="text-red-500">*</span></Label>
              <Input id="requester_name" {...register('requester_name')} />
              {errors.requester_name && <p className="text-xs text-red-500">{errors.requester_name.message}</p>}
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="requester_email">Email Address <span className="text-red-500">*</span></Label>
              <Input id="requester_email" type="email" {...register('requester_email')} />
              {errors.requester_email && <p className="text-xs text-red-500">{errors.requester_email.message}</p>}
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="requester_phone">Phone Number (optional)</Label>
              <Input id="requester_phone" {...register('requester_phone')} placeholder="+1 (555) 000-0000" />
            </div>
          </div>
        </fieldset>

        {/* Report reference */}
        <fieldset className="space-y-4">
          <legend className="text-base font-semibold text-foreground pb-2 border-b border-border w-full">Report Reference</legend>
          <div className="space-y-1.5">
            <Label htmlFor="report_id_or_url">Report URL or Report ID <span className="text-red-500">*</span></Label>
            <Input
              id="report_id_or_url"
              {...register('report_id_or_url')}
              placeholder="https://scamalertdb.com/report/slug-here or the report slug"
            />
            <p className="text-xs text-muted-foreground">Copy the full URL from your browser's address bar, or enter the report ID from the report page.</p>
            {errors.report_id_or_url && <p className="text-xs text-red-500">{errors.report_id_or_url.message}</p>}
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-1.5">
              <Label>Your Relationship to This Report <span className="text-red-500">*</span></Label>
              <Select onValueChange={v => setValue('relationship_to_report', v)}>
                <SelectTrigger><SelectValue placeholder="Select one" /></SelectTrigger>
                <SelectContent>
                  {RELATIONSHIP_OPTIONS.map(r => (
                    <SelectItem key={r.value} value={r.value}>{r.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.relationship_to_report && <p className="text-xs text-red-500">{errors.relationship_to_report.message}</p>}
            </div>
            <div className="space-y-1.5">
              <Label>Reason for Dispute <span className="text-red-500">*</span></Label>
              <Select onValueChange={v => setValue('reason', v)}>
                <SelectTrigger><SelectValue placeholder="Select a reason" /></SelectTrigger>
                <SelectContent>
                  {DISPUTE_REASONS.map(r => (
                    <SelectItem key={r.value} value={r.value}>{r.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.reason && <p className="text-xs text-red-500">{errors.reason.message}</p>}
            </div>
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="explanation">Explanation <span className="text-red-500">*</span></Label>
            <Textarea
              id="explanation"
              {...register('explanation')}
              rows={6}
              placeholder="Explain in detail why you believe this report should be disputed or removed. Include any factual corrections, clarifications, or evidence that supports your request. Minimum 50 characters."
            />
            {errors.explanation && <p className="text-xs text-red-500">{errors.explanation.message}</p>}
          </div>
        </fieldset>

        {/* Good faith confirmation */}
        <div className="flex items-start gap-3">
          <Checkbox id="good_faith_confirmed" onCheckedChange={v => setValue('good_faith_confirmed', v === true)} />
          <Label htmlFor="good_faith_confirmed" className="text-sm leading-relaxed font-normal cursor-pointer">
            <span className="font-semibold">I confirm</span> that I am submitting this dispute or removal request in good faith, that the information I have provided is accurate to the best of my knowledge, and that I understand submitting false or misleading disputes may result in my request being dismissed.
          </Label>
        </div>
        {errors.good_faith_confirmed && <p className="text-xs text-red-500">{errors.good_faith_confirmed.message}</p>}

        {result?.error && (
          <div className="rounded-md border border-red-200 bg-red-50 p-3 text-sm text-red-800">{result.error}</div>
        )}

        <Button type="submit" disabled={isSubmitting} size="lg" className="w-full bg-orange-600 hover:bg-orange-700 text-white">
          {isSubmitting ? <><Loader2 className="h-4 w-4 animate-spin mr-2" />Submitting…</> : 'Submit Dispute / Removal Request'}
        </Button>

        <p className="text-center text-xs text-muted-foreground">
          By submitting, you agree to our{' '}
          <a href="/legal/dispute-policy" className="underline">Dispute & Removal Policy</a>.
        </p>
      </form>
    </div>
  )
}
