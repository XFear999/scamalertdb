import { cn, getStatusBadgeClasses, getPlatformBadgeClasses, formatPlatformLabel, formatScamTypeLabel } from '@/lib/utils'

interface StatusBadgeProps {
  status: string
  className?: string
}

const STATUS_LABELS: Record<string, string> = {
  pending: 'Pending Review',
  published: 'Published',
  disputed: 'Disputed',
  resolved: 'Resolved',
  removed: 'Removed',
  rejected: 'Rejected',
}

export function StatusBadge({ status, className }: StatusBadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium',
        getStatusBadgeClasses(status),
        className
      )}
    >
      {STATUS_LABELS[status] ?? status}
    </span>
  )
}

interface PlatformBadgeProps {
  platform: string
  className?: string
}

export function PlatformBadge({ platform, className }: PlatformBadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium',
        getPlatformBadgeClasses(platform),
        className
      )}
    >
      {formatPlatformLabel(platform)}
    </span>
  )
}

interface ScamTypeBadgeProps {
  scamType: string
  className?: string
}

export function ScamTypeBadge({ scamType, className }: ScamTypeBadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full border border-slate-200 bg-slate-100 px-2.5 py-0.5 text-xs font-medium text-slate-700',
        className
      )}
    >
      {formatScamTypeLabel(scamType)}
    </span>
  )
}
