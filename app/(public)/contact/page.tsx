'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Loader2, CheckCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { contactFormSchema, type ContactFormInput } from '@/lib/validations'
import { CONTACT_CATEGORIES } from '@/lib/constants'
import { submitContact } from '@/lib/actions/contact'

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [result, setResult] = useState<{ success: boolean; error?: string } | null>(null)

  const { register, handleSubmit, setValue, formState: { errors } } = useForm<ContactFormInput>({
    resolver: zodResolver(contactFormSchema),
  })

  async function onSubmit(data: ContactFormInput) {
    setIsSubmitting(true)
    try {
      const res = await submitContact(data)
      setResult(res)
    } catch {
      setResult({ success: false, error: 'An unexpected error occurred. Please try again.' })
    } finally {
      setIsSubmitting(false)
    }
  }

  if (result?.success) {
    return (
      <div className="mx-auto max-w-lg px-4 py-20 text-center sm:px-6">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-100 mx-auto mb-6">
          <CheckCircle className="h-8 w-8 text-green-600" />
        </div>
        <h1 className="text-2xl font-bold mb-3">Message Sent</h1>
        <p className="text-muted-foreground mb-6">
          Thank you for reaching out. We typically respond within 2–3 business days.
          For urgent legal matters, please note your inquiry category in your subject line.
        </p>
        <Button asChild variant="outline"><a href="/">Return Home</a></Button>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-2xl px-4 py-10 sm:px-6">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-foreground mb-2">Contact Us</h1>
        <p className="text-muted-foreground">
          For general inquiries, technical issues, media requests, or legal notices.
          For dispute or removal requests, please use our{' '}
          <a href="/dispute" className="text-blue-600 underline hover:no-underline">dedicated dispute form</a>.
        </p>
      </div>

      <div className="grid gap-8 sm:grid-cols-3 mb-10">
        {[
          { title: 'General Inquiries', desc: 'Questions about the platform, how it works, or our policies.' },
          { title: 'Legal Notices', desc: 'DMCA takedowns, legal correspondence, and formal notices.' },
          { title: 'Media & Press', desc: 'Press inquiries, interview requests, and media partnerships.' },
        ].map(item => (
          <div key={item.title} className="rounded-lg border border-border p-4">
            <h3 className="font-semibold text-foreground text-sm mb-1">{item.title}</h3>
            <p className="text-xs text-muted-foreground">{item.desc}</p>
          </div>
        ))}
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-1.5">
            <Label htmlFor="name">Full Name <span className="text-red-500">*</span></Label>
            <Input id="name" {...register('name')} />
            {errors.name && <p className="text-xs text-red-500">{errors.name.message}</p>}
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="email">Email Address <span className="text-red-500">*</span></Label>
            <Input id="email" type="email" {...register('email')} />
            {errors.email && <p className="text-xs text-red-500">{errors.email.message}</p>}
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-1.5">
            <Label>Category <span className="text-red-500">*</span></Label>
            <Select onValueChange={v => setValue('category', v)}>
              <SelectTrigger><SelectValue placeholder="Select a category" /></SelectTrigger>
              <SelectContent>
                {CONTACT_CATEGORIES.map(c => (
                  <SelectItem key={c.value} value={c.value}>{c.label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.category && <p className="text-xs text-red-500">{errors.category.message}</p>}
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="subject">Subject <span className="text-red-500">*</span></Label>
            <Input id="subject" {...register('subject')} placeholder="Brief subject line" />
            {errors.subject && <p className="text-xs text-red-500">{errors.subject.message}</p>}
          </div>
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="message">Message <span className="text-red-500">*</span></Label>
          <Textarea id="message" {...register('message')} rows={6} placeholder="Write your message here…" />
          {errors.message && <p className="text-xs text-red-500">{errors.message.message}</p>}
        </div>

        {result?.error && (
          <div className="rounded-md border border-red-200 bg-red-50 p-3 text-sm text-red-800">{result.error}</div>
        )}

        <Button type="submit" disabled={isSubmitting} className="w-full bg-slate-900 hover:bg-slate-800 text-white">
          {isSubmitting ? <><Loader2 className="h-4 w-4 animate-spin mr-2" />Sending…</> : 'Send Message'}
        </Button>
      </form>
    </div>
  )
}
