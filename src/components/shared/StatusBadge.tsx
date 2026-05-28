import type { ProductStatus, ReadinessStatus } from '../../types'
import { cn } from '../../lib/utils'

type BadgeStatus = ProductStatus | ReadinessStatus

interface StatusBadgeProps {
  status: BadgeStatus
}

const statusConfig: Record<BadgeStatus, { label: string; classes: string }> = {
  DRAFT: { label: 'Draft', classes: 'bg-status-draft-bg text-status-draft-text border-status-draft-bg' },
  IN_REVIEW: { label: 'In review', classes: 'bg-status-review-bg text-status-review-text border-status-review-bg' },
  PUBLISHED: { label: 'Published', classes: 'bg-status-published-bg text-status-published-text border-status-published-bg' },
  ARCHIVED: { label: 'Archived', classes: 'bg-status-draft-bg text-status-draft-text border-status-draft-bg' },
  INCOMPLETE: { label: 'Incomplete', classes: 'bg-status-draft-bg text-status-draft-text border-status-draft-bg' },
  PARTIAL: { label: 'Partial', classes: 'bg-status-review-bg text-status-review-text border-status-review-bg' },
  READY: { label: 'Ready', classes: 'bg-status-ready-bg text-status-ready-text border-status-ready-bg' },
}

export default function StatusBadge({ status }: StatusBadgeProps) {
  const config = statusConfig[status]

  return (
    <span className={cn(
      'inline-flex items-center gap-1.5 text-xs px-2 py-0.5 rounded-full border',
      config.classes,
    )}>
      <span className="w-1.5 h-1.5 rounded-full bg-current" />
      {config.label}
    </span>
  )
}