import { AdminSidebar } from '@/components/layout/AdminSidebar'

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-slate-100">
      <AdminSidebar />
      <div className="pl-60">
        <main className="min-h-screen p-8">
          {children}
        </main>
      </div>
    </div>
  )
}
