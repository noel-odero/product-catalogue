import { useEffect, type ReactNode } from 'react'
import { cn } from '../../lib/utils'

interface ModalProps {
  onClose: () => void
  children: ReactNode
  maxWidth?: string
  title?: string
}

export default function Modal({ onClose, children, maxWidth = 'max-w-md', title }: ModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [onClose])

  return (
    <div
      className="fixed inset-0 bg-black/60 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div
        className={cn(
          'bg-surface border border-border rounded-xl w-full p-6 space-y-4',
          maxWidth,
        )}
        onClick={e => e.stopPropagation()}
      >
        {title && (
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-medium text-content-primary">{title}</h2>
            <button
              onClick={onClose}
              className="text-content-tertiary hover:text-content-secondary transition-colors"
            >
              <i className="ti ti-x text-base" aria-hidden="true" />
            </button>
          </div>
        )}
        {children}
      </div>
    </div>
  )
}