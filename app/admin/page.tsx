import { getDashboardStats } from '@/lib/actions/admin'
import { FileText, Clock, AlertTriangle, Mail, CheckCircle, TrendingUp } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import Link from 'next/link'

export default async function AdminDashboard() {
  const stats = await getDashboardStats()

  const statCards = [
    { label: 'Total Reports', value: stats.totalReports, icon: FileText, color: 'text-blue-600', bg: 'bg-blue-50', href: '/admin/reports' },
    { label: 'Pending Review', value: stats.pendingReports, icon: Clock, color: 'text-amber-600', bg: 'bg-amber-50', href: '/admin/queue' },
    { label: 'Published', value: stats.publishedReports, icon: CheckCircle, color: 'text-green-600', bg: 'bg-green-50', href: '/admin/reports?status=published' },
    { label: 'Open Disputes', value: stats.openDisputes, icon: AlertTriangle, color: 'text-orange-600', bg: 'bg-orange-50', href: '/admin/disputes' },
    { label: 'Unread Messages', value: stats.unreadMessages, icon: Mail, color: 'text-purple-600', bg: 'bg-purple-50', href: '/admin/messages' },
  ]

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-900">Dashboard</h1>
        <p className="text-slate-500 text-sm mt-1">ScamAlertDB moderation overview</p>
      </div>

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5 mb-8">
        {statCards.map(card => (
          <Link key={card.label} href={card.href}>
            <Card className="hover:shadow-md transition-shadow cursor-pointer">
              <CardContent className="p-5">
                <div className={`inline-flex h-10 w-10 items-center justify-center rounded-lg ${card.bg} mb-3`}>
                  <card.icon className={`h-5 w-5 ${card.color}`} />
                </div>
                <div className="text-2xl font-bold text-slate-900">{card.value.toLocaleString()}</div>
                <div className="text-sm text-slate-500 mt-0.5">{card.label}</div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      {/* Quick actions */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {[
          { title: 'Review Pending Queue', desc: `${stats.pendingReports} reports awaiting review`, href: '/admin/queue', color: 'border-amber-200 bg-amber-50' },
          { title: 'Review Open Disputes', desc: `${stats.openDisputes} disputes require attention`, href: '/admin/disputes', color: 'border-orange-200 bg-orange-50' },
          { title: 'Read Unread Messages', desc: `${stats.unreadMessages} new contact messages`, href: '/admin/messages', color: 'border-purple-200 bg-purple-50' },
        ].map(item => (
          <Link key={item.title} href={item.href}>
            <Card className={`border hover:shadow-md transition-shadow cursor-pointer ${item.color}`}>
              <CardContent className="p-5">
                <h3 className="font-semibold text-slate-900 mb-1">{item.title}</h3>
                <p className="text-sm text-slate-600">{item.desc}</p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  )
}
