import { Info } from 'lucide-react'

interface DisclaimerBannerProps {
  variant?: 'default' | 'compact'
}

export function DisclaimerBanner({ variant = 'default' }: DisclaimerBannerProps) {
  if (variant === 'compact') {
    return (
      <div className="flex items-start gap-2 rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800">
        <Info className="mt-0.5 h-4 w-4 shrink-0" />
        <p>
          <strong>Notice:</strong> All reports are user-submitted allegations and have not been independently verified. Reports require admin review before publication.{' '}
          <a href="/legal/disclaimer" className="underline hover:no-underline">Full disclaimer</a>
        </p>
      </div>
    )
  }

  return (
    <div className="rounded-xl border border-amber-200 bg-amber-50 p-5">
      <div className="flex gap-3">
        <Info className="mt-0.5 h-5 w-5 shrink-0 text-amber-600" />
        <div className="text-sm text-amber-900">
          <p className="font-semibold mb-1">Important Notice</p>
          <p className="leading-relaxed">
            All reports published on ScamAlertDB are <strong>user-submitted allegations</strong> and reflect the experiences and opinions of the individuals who submitted them. ScamAlertDB does not independently verify every claim and makes no representation as to the truth or accuracy of any report. Reports are reviewed by our moderation team before publication, but this review is not a determination of guilt or wrongdoing. If you believe a report is inaccurate or unjust, you may{' '}
            <a href="/dispute" className="font-medium underline hover:no-underline text-amber-800">
              submit a dispute or removal request
            </a>
            .
          </p>
        </div>
      </div>
    </div>
  )
}
