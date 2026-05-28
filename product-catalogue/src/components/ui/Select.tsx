import type { SelectHTMLAttributes } from 'react'
import { cn } from '../../lib/utils'

interface SelectOption {
  value: string
  label: string
}

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string
  error?: string
  options: SelectOption[]
  placeholder?: string
}

export default function Select({ label, error, options, placeholder, className, ...props }: SelectProps) {
  return (
    <div className="flex flex-col gap-1">
      {label && (
        <label className="text-xs text-content-secondary">
          {label}
        </label>
      )}
      <div className="relative">
        <select
          className={cn(
            'w-full bg-surface border border-border rounded-md text-sm text-content-primary',
            'px-3 py-2 outline-none transition-colors appearance-none cursor-pointer',
            'hover:border-content-disabled focus:border-content-secondary',
            error && 'border-status-rejected-text',
            className,
          )}
          {...props}
        >
          {placeholder && (
            <option value="">{placeholder}</option>
          )}
          {options.map(opt => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
          <i className="ti ti-chevron-down text-muted text-sm" aria-hidden="true" />
        </div>
      </div>
      {error && (
        <p className="text-xs text-status-rejected-text">{error}</p>
      )}
    </div>
  )
}