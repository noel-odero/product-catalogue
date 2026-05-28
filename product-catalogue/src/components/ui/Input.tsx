import type { InputHTMLAttributes } from 'react'
import { cn } from '../../lib/utils'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  icon?: string
}

export default function Input({ label, error, icon, className, ...props }: InputProps) {
  return (
    <div className="flex flex-col gap-1">
      {label && (
        <label className="text-xs text-content-secondary">
          {label}
        </label>
      )}
      <div className="relative">
        {icon && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2">
            <i className={cn('ti', icon, 'text-muted text-sm')} aria-hidden="true" />
          </div>
        )}
        <input
          className={cn(
            'w-full bg-surface border border-border rounded-md text-sm text-content-primary placeholder:text-muted',
            'px-3 py-2 outline-none transition-colors',
            'hover:border-content-disabled focus:border-content-secondary',
            icon && 'pl-9',
            error && 'border-status-rejected-text focus:border-status-rejected-text',
            className,
          )}
          {...props}
        />
      </div>
      {error && (
        <p className="text-xs text-status-rejected-text">{error}</p>
      )}
    </div>
  )
}