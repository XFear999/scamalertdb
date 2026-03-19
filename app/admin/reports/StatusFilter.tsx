'use client'

const STATUS_OPTIONS = ['pending', 'published', 'disputed', 'resolved', 'removed', 'rejected']

export function StatusFilter({ current }: { current?: string }) {
  return (
    <select
      className="rounded-md border border-slate-200 bg-white px-3 py-1.5 text-sm"
      defaultValue={current ?? ''}
      onChange={e => {
        const url = new URL(window.location.href)
        if (e.target.value) url.searchParams.set('status', e.target.value)
        else url.searchParams.delete('status')
        url.searchParams.delete('page')
        window.location.href = url.toString()
      }}
    >
      <option value="">All Statuses</option>
      {STATUS_OPTIONS.map(s => (
        <option key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1)}</option>
      ))}
    </select>
  )
}
