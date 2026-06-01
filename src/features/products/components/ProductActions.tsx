import type { Product, ProductReadiness } from '../../../types'
import { Button } from '../../../components/ui'
import { useState } from 'react'

interface ProductActionsProps {
  product: Product
  readiness: ProductReadiness | null
  onSubmitForReview: () => Promise<Product>
  onPublish: () => Promise<Product>
  onArchive: () => Promise<Product>
  onEdit: () => void
}

type ActionState = 'idle' | 'loading' | 'success' | 'error'

export default function ProductActions({
  product,
  readiness,
  onSubmitForReview,
  onPublish,
  onArchive,
  onEdit,
}: ProductActionsProps) {
  const [actionState, setActionState] = useState<ActionState>('idle')

  const handleAction = async (action: () => Promise<Product>) => {
    setActionState('loading')
    try {
      await action()
      setActionState('success')
    } catch {
      setActionState('error')
    } finally {
      setTimeout(() => setActionState('idle'), 2000)
    }
  }

  const canPublish = readiness?.canPublish ?? false
  const isLoading = actionState === 'loading'

  return (
    <div className="bg-surface border border-border rounded-lg p-4 space-y-3">
      <h2 className="text-sm font-medium text-content-primary">Actions</h2>

      <div className="space-y-2">
        <Button
          fullWidth
          variant="ghost"
          onClick={onEdit}
        >
          <i className="ti ti-edit" aria-hidden="true" />
          Edit product
        </Button>

        {product.status === 'DRAFT' && (
          <Button
            fullWidth
            loading={isLoading}
            onClick={() => handleAction(onSubmitForReview)}
          >
            <i className="ti ti-send" aria-hidden="true" />
            Submit for review
          </Button>
        )}

        {product.status === 'IN_REVIEW' && (
          <Button
            fullWidth
            loading={isLoading}
            disabled={!canPublish}
            onClick={() => handleAction(onPublish)}
          >
            <i className="ti ti-world-upload" aria-hidden="true" />
            {canPublish ? 'Publish product' : 'Not ready to publish'}
          </Button>
        )}

        {product.status !== 'ARCHIVED' && (
          <Button
            fullWidth
            variant="danger"
            loading={isLoading}
            onClick={() => handleAction(onArchive)}
          >
            <i className="ti ti-archive" aria-hidden="true" />
            Archive product
          </Button>
        )}
      </div>

      {actionState === 'success' && (
        <p className="text-xs text-status-published-text flex items-center gap-1">
          <i className="ti ti-check" aria-hidden="true" />
          Action completed successfully
        </p>
      )}

      {actionState === 'error' && (
        <p className="text-xs text-status-rejected-text flex items-center gap-1">
          <i className="ti ti-x" aria-hidden="true" />
          Something went wrong. Please try again.
        </p>
      )}

      <div className="pt-2 border-t border-border">
        <p className="text-xs text-muted">Status</p>
        <p className="text-xs text-content-secondary mt-1 capitalize">
          {product.status.replace('_', ' ').toLowerCase()}
        </p>
      </div>
    </div>
  )
}