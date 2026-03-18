'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { useState, useTransition } from 'react'
import { Search, Loader2 } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

interface SearchBarProps {
  defaultValue?: string
  placeholder?: string
  size?: 'default' | 'lg'
  className?: string
}

export function SearchBar({
  defaultValue = '',
  placeholder = 'Search by name, phone number, username, or keyword…',
  size = 'default',
  className,
}: SearchBarProps) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [query, setQuery] = useState(defaultValue)
  const [isPending, startTransition] = useTransition()

  function handleSearch(e: React.FormEvent) {
    e.preventDefault()
    if (!query.trim()) return
    startTransition(() => {
      const params = new URLSearchParams(searchParams.toString())
      params.set('q', query.trim())
      params.delete('page')
      router.push(`/search?${params.toString()}`)
    })
  }

  const isLarge = size === 'lg'

  return (
    <form onSubmit={handleSearch} className={`flex w-full gap-2 ${className ?? ''}`}>
      <div className="relative flex-1">
        <Search className={`absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground ${isLarge ? 'h-5 w-5' : 'h-4 w-4'}`} />
        <Input
          type="search"
          value={query}
          onChange={e => setQuery(e.target.value)}
          placeholder={placeholder}
          className={`pl-10 ${isLarge ? 'h-12 text-base' : ''}`}
          aria-label="Search reports"
        />
      </div>
      <Button
        type="submit"
        disabled={isPending || !query.trim()}
        className={`bg-blue-600 hover:bg-blue-700 text-white shrink-0 ${isLarge ? 'h-12 px-6 text-base' : ''}`}
      >
        {isPending ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : (
          'Search'
        )}
      </Button>
    </form>
  )
}
