import type { Metadata } from 'next'
import { Suspense } from 'react'
import { SearchBar } from '@/components/search/SearchBar'
import { SearchFilters } from '@/components/search/SearchFilters'
import { ReportCard } from '@/components/reports/ReportCard'
import { Skeleton } from '@/components/ui/skeleton'
import { DisclaimerBanner } from '@/components/common/DisclaimerBanner'
import { searchReports } from '@/lib/actions/reports'
import { Search } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

export const metadata: Metadata = {
  title: 'Search Alleged Scam Reports',
  description:
    'Search ScamAlertDB for alleged scam reports by phone number, name, username, business name, or keyword. Filter by platform and scam type.',
}

interface SearchPageProps {
  searchParams: Promise<{
    q?: string
    platform?: string
    scam_type?: string
    sort?: string
    page?: string
  }>
}

async function SearchResults({
  query, platform, scam_type, sort, page,
}: {
  query?: string; platform?: string; scam_type?: string; sort?: string; page: number
}) {
  const results = await searchReports(
    { query, platform: platform as never, scam_type: scam_type as never, sort: (sort as 'recent' | 'views') ?? 'recent' },
    page,
    12,
  )

  const { data: reports, meta } = results

  if (!reports.length) {
    return (
      <div className="col-span-full flex flex-col items-center justify-center py-20 text-center">
        <Search className="h-12 w-12 text-muted-foreground mb-4 opacity-40" />
        <h3 className="text-lg font-semibold text-foreground mb-2">No reports found</h3>
        <p className="text-muted-foreground text-sm max-w-md mb-6">
          {query
            ? `No published reports match "${query}". Try different keywords, or check your spelling.`
            : 'No reports match your current filters. Try removing some filters.'}
        </p>
        <div className="flex gap-3">
          <Button asChild variant="outline" size="sm">
            <Link href="/search">Clear Search</Link>
          </Button>
          <Button asChild size="sm" className="bg-blue-600 hover:bg-blue-700 text-white">
            <Link href="/submit">Submit a Report</Link>
          </Button>
        </div>
      </div>
    )
  }

  return (
    <>
      {reports.map(r => (
        <ReportCard key={r.id} {...r} />
      ))}

      {/* Pagination */}
      {meta.total_pages > 1 && (
        <div className="col-span-full flex items-center justify-between pt-6 border-t border-border mt-4">
          <p className="text-sm text-muted-foreground">
            Showing {((page - 1) * meta.per_page) + 1}–{Math.min(page * meta.per_page, meta.total)} of {meta.total} reports
          </p>
          <div className="flex gap-2">
            {page > 1 && (
              <Button asChild variant="outline" size="sm">
                <Link href={`/search?${buildPageUrl({ query, platform, scam_type, sort, page: page - 1 })}`}>
                  Previous
                </Link>
              </Button>
            )}
            {page < meta.total_pages && (
              <Button asChild variant="outline" size="sm">
                <Link href={`/search?${buildPageUrl({ query, platform, scam_type, sort, page: page + 1 })}`}>
                  Next
                </Link>
              </Button>
            )}
          </div>
        </div>
      )}
    </>
  )
}

function buildPageUrl(params: Record<string, string | number | undefined>) {
  const p = new URLSearchParams()
  for (const [k, v] of Object.entries(params)) {
    if (v !== undefined && v !== '') p.set(k, String(v))
  }
  return p.toString()
}

function ResultsSkeleton() {
  return (
    <>
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i} className="rounded-xl border p-5 space-y-3">
          <div className="flex gap-2">
            <Skeleton className="h-5 w-20 rounded-full" />
            <Skeleton className="h-5 w-28 rounded-full" />
          </div>
          <Skeleton className="h-5 w-full" />
          <Skeleton className="h-4 w-3/4" />
          <Skeleton className="h-3 w-1/2" />
        </div>
      ))}
    </>
  )
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const params = await searchParams
  const query = params.q
  const platform = params.platform
  const scam_type = params.scam_type
  const sort = params.sort
  const page = Math.max(1, parseInt(params.page ?? '1', 10))

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-foreground mb-1">
          {query ? `Search results for "${query}"` : 'Browse All Reports'}
        </h1>
        <p className="text-muted-foreground text-sm">
          All reports are user-submitted allegations reviewed by our moderation team before publication.
        </p>
      </div>

      {/* Search bar */}
      <div className="mb-6">
        <Suspense>
          <SearchBar defaultValue={query ?? ''} />
        </Suspense>
      </div>

      {/* Disclaimer */}
      <div className="mb-6">
        <DisclaimerBanner variant="compact" />
      </div>

      {/* Filters */}
      <div className="mb-6">
        <Suspense>
          <SearchFilters />
        </Suspense>
      </div>

      {/* Results grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <Suspense fallback={<ResultsSkeleton />}>
          <SearchResults
            query={query}
            platform={platform}
            scam_type={scam_type}
            sort={sort}
            page={page}
          />
        </Suspense>
      </div>
    </div>
  )
}
