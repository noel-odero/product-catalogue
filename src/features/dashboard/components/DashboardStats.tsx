import { cn } from '../../../lib/utils'

interface Stat {
  label: string
  value: number
  sub: string
  alert?: boolean
}

interface DashboardStatsProps {
  stats: {
    total: number
    readyToPublish: number
    published: number
    pendingReview: number
    rejected: number
  }
}

export default function DashboardStats({ stats }: DashboardStatsProps) {
  const items: Stat[] = [
    { label: 'Total products', value: stats.total, sub: 'in catalogue' },
    { label: 'Ready to publish', value: stats.readyToPublish, sub: `${Math.round((stats.readyToPublish / stats.total) * 100)}% of total` },
    { label: 'Published', value: stats.published, sub: 'live products' },
    { label: 'Pending review', value: stats.pendingReview, sub: 'assets awaiting', alert: stats.pendingReview > 0 },
    { label: 'Rejected assets', value: stats.rejected, sub: 'needs attention', alert: stats.rejected > 0 },
  ]

  return (
    <div className="grid grid-cols-5 gap-3">
      {items.map(item => (
        <div
          key={item.label}
          className="bg-surface border border-border rounded-lg p-4"
        >
          <p className="text-xs text-muted mb-2 tracking-wide">{item.label}</p>
          <p className={cn(
            'text-2xl font-medium mb-1',
            item.alert ? 'text-status-review-text' : 'text-content-primary',
          )}>
            {item.value}
          </p>
          <p className="text-xs text-content-disabled">{item.sub}</p>
        </div>
      ))}
    </div>
  )
}