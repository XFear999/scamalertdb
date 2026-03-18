'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { useTransition } from 'react'
import { Filter, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { PLATFORMS, SCAM_TYPES } from '@/lib/constants'

export function SearchFilters() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [isPending, startTransition] = useTransition()

  const platform = searchParams.get('platform') ?? ''
  const scamType = searchParams.get('scam_type') ?? ''
  const sort = searchParams.get('sort') ?? 'recent'

  const hasFilters = !!(platform || scamType || (sort && sort !== 'recent'))

  function updateFilter(key: string, value: string) {
    startTransition(() => {
      const params = new URLSearchParams(searchParams.toString())
      if (value && value !== 'all') {
        params.set(key, value)
      } else {
        params.delete(key)
      }
      params.delete('page')
      router.push(`/search?${params.toString()}`)
    })
  }

  function clearFilters() {
    startTransition(() => {
      const q = searchParams.get('q')
      router.push(q ? `/search?q=${encodeURIComponent(q)}` : '/search')
    })
  }

  return (
    <div className="flex flex-wrap items-center gap-3">
      <div className="flex items-center gap-1.5 text-sm font-medium text-muted-foreground">
        <Filter className="h-4 w-4" />
        <span>Filter:</span>
      </div>

      {/* Platform */}
      <Select value={platform || 'all'} onValueChange={v => updateFilter('platform', v)}>
        <SelectTrigger className="w-[170px] h-8 text-sm">
          <SelectValue placeholder="All Platforms" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Platforms</SelectItem>
          {PLATFORMS.map(p => (
            <SelectItem key={p.value} value={p.value}>{p.label}</SelectItem>
          ))}
        </SelectContent>
      </Select>

      {/* Scam Type */}
      <Select value={scamType || 'all'} onValueChange={v => updateFilter('scam_type', v)}>
        <SelectTrigger className="w-[190px] h-8 text-sm">
          <SelectValue placeholder="All Scam Types" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Scam Types</SelectItem>
          {SCAM_TYPES.map(s => (
            <SelectItem key={s.value} value={s.value}>{s.label}</SelectItem>
          ))}
        </SelectContent>
      </Select>

      {/* Sort */}
      <Select value={sort} onValueChange={v => updateFilter('sort', v)}>
        <SelectTrigger className="w-[140px] h-8 text-sm">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="recent">Most Recent</SelectItem>
          <SelectItem value="views">Most Viewed</SelectItem>
        </SelectContent>
      </Select>

      {hasFilters && (
        <Button
          variant="ghost"
          size="sm"
          onClick={clearFilters}
          disabled={isPending}
          className="h-8 gap-1 text-muted-foreground hover:text-foreground"
        >
          <X className="h-3.5 w-3.5" />
          Clear
        </Button>
      )}
    </div>
  )
}
