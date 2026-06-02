import type { ReactNode } from 'react'

interface FilterBarProps {
  children: ReactNode
  hasActiveFilters: boolean
  onReset: () => void
}

export default function FilterBar({ children, hasActiveFilters, onReset }: FilterBarProps) {
  return (
    <div className="bg-surface border border-border rounded-lg p-4">
      <div className="grid grid-cols-5 gap-3">
        {children}
      </div>
      {hasActiveFilters && (
        <div className="mt-3 flex justify-end">
          <button
            onClick={onReset}
            className="text-xs text-content-tertiary hover:text-content-secondary transition-colors flex items-center gap-1"
          >
            <i className="ti ti-x text-xs" aria-hidden="true" />
            Clear filters
          </button>
        </div>
      )}
    </div>
  )
}