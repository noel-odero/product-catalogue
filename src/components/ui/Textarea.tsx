import type { TextareaHTMLAttributes } from 'react'
import { cn } from '../../lib/utils'

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string
  error?: string
}

export default function Textarea({ label, error, className, ...props }: TextareaProps) {
  return (
    <div className="flex flex-col gap-1">
      {label && (
        <label className="text-xs text-content-secondary">{label}</label>
      )}
      <textarea
        className={cn(
          'w-full bg-surface border border-border rounded-md text-sm text-content-primary placeholder:text-muted',
          'px-3 py-2 outline-none transition-colors resize-none',
          'hover:border-content-disabled focus:border-content-secondary',
          error && 'border-status-rejected-text focus:border-status-rejected-text',
          className,
        )}
        {...props}
      />
      {error && (
        <p className="text-xs text-status-rejected-text">{error}</p>
      )}
    </div>
  )
}