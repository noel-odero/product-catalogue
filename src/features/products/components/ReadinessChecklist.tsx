import type { ProductReadiness } from '../../../types'
import { cn } from '../../../lib/utils'

interface ReadinessChecklistProps {
  readiness: ProductReadiness | null
}

export default function ReadinessChecklist({ readiness }: ReadinessChecklistProps) {
  if (!readiness) {
    return (
      <div className="bg-surface border border-border rounded-lg p-4">
        <p className="text-xs text-content-tertiary">Readiness data unavailable</p>
      </div>
    )
  }

  return (
    <div className="bg-surface border border-border rounded-lg p-4 space-y-3">
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-medium text-content-primary">Readiness</h2>
        <span className="text-xs text-content-tertiary">
          {readiness.passedCount} / {readiness.totalCount}
        </span>
      </div>

      <div className="w-full bg-elevated rounded-full h-1">
        <div
          className={cn(
            'h-1 rounded-full transition-all',
            readiness.canPublish
              ? 'bg-status-published-text'
              : 'bg-status-review-text',
          )}
          style={{
            width: `${Math.round((readiness.passedCount / readiness.totalCount) * 100)}%`,
          }}
        />
      </div>

      <div className="space-y-2">
        {readiness.checks.map(check => (
          <div
            key={check.id}
            className="flex items-center gap-3"
          >
            <div className={cn(
              'w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0',
              check.passed
                ? 'bg-status-published-bg border border-status-published-text'
                : 'bg-elevated border border-border',
            )}>
              {check.passed ? (
                <i
                  className="ti ti-check text-status-published-text"
                  style={{ fontSize: '10px' }}
                  aria-hidden="true"
                />
              ) : (
                <i
                  className="ti ti-minus text-content-disabled"
                  style={{ fontSize: '10px' }}
                  aria-hidden="true"
                />
              )}
            </div>
            <span className={cn(
              'text-xs',
              check.passed
                ? 'text-content-secondary'
                : 'text-content-tertiary',
            )}>
              {check.label}
            </span>
          </div>
        ))}
      </div>

      <div className={cn(
        'flex items-center gap-2 pt-3 border-t border-border',
      )}>
        <div className={cn(
          'w-2 h-2 rounded-full',
          readiness.canPublish
            ? 'bg-status-published-text'
            : 'bg-status-review-text',
        )} />
        <span className={cn(
          'text-xs font-medium',
          readiness.canPublish
            ? 'text-status-published-text'
            : 'text-status-review-text',
        )}>
          {readiness.canPublish
            ? 'Ready to publish'
            : 'Not ready to publish'}
        </span>
      </div>
    </div>
  )
}