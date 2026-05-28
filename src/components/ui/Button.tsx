import type { ButtonHTMLAttributes } from 'react'
import { cn } from '../../lib/utils'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'ghost' | 'danger'
  size?: 'sm' | 'md' | 'lg'
  loading?: boolean
  fullWidth?: boolean
}

export default function Button({
  variant = 'primary',
  size = 'md',
  loading = false,
  fullWidth = false,
  disabled,
  children,
  className,
  ...props
}: ButtonProps) {
  const variantClasses = {
    primary: 'bg-white text-base hover:bg-gray-100',
    ghost: 'bg-transparent border border-border text-content-secondary hover:bg-elevated hover:text-content-primary',
    danger: 'bg-transparent border border-status-rejected-text text-status-rejected-text hover:bg-status-rejected-bg',
  }

  const sizeClasses = {
    sm: 'text-xs px-3 py-1.5',
    md: 'text-xs px-4 py-2',
    lg: 'text-sm px-5 py-2.5',
  }

  return (
    <button
      disabled={disabled || loading}
      className={cn(
        'rounded-md font-medium transition-colors inline-flex items-center justify-center gap-2',
        variantClasses[variant],
        sizeClasses[size],
        (disabled || loading) && 'opacity-50 cursor-not-allowed',
        fullWidth && 'w-full',
        className,
      )}
      {...props}
    >
      {loading && (
        <span className="s-3 border border-current border-t-transparent rounded-full animate-spin" />
      )}
      {children}
    </button>
  )
}