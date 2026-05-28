import { cn } from '../../lib/utils'

interface EmptyStateProps {
  icon?: string
  title: string
  description?: string
  action?: {
    label: string
    onClick: () => void
  }
}

export default function EmptyState({ icon = 'ti-inbox', title, description, action }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-8">
      <div className="w-12 h-12 bg-elevated border border-border rounded-xl flex items-center justify-center mb-4">
        <i className={cn('ti', icon, 'text-xl text-muted')} aria-hidden="true" />
      </div>
      <h3 className="text-sm font-medium text-content-primary mb-1">{title}</h3>
      {description && (
        <p className="text-xs text-content-tertiary text-center max-w-xs mb-4">{description}</p>
      )}
      {action && (
        <button
          onClick={action.onClick}
          className="text-xs bg-white text-base px-4 py-2 rounded-md font-medium hover:bg-gray-100 transition-colors"
        >
          {action.label}
        </button>
      )}
    </div>
  )
}