import { useMutation, useQueryClient } from '@tanstack/react-query'
import type { Product, ProductReadiness } from '../../../types'
import { Button } from '../../../components/ui'
import { productService } from '../../../services'

interface ProductActionsProps {
  product: Product
  readiness: ProductReadiness | null
  onEdit: () => void
}

const PRODUCTS_KEY = ['products'] as const

export default function ProductActions({
  product,
  readiness,
  onEdit,
}: ProductActionsProps) {
  const queryClient = useQueryClient()

  const updateCache = (updated: Product) => {
    queryClient.setQueryData<Product[]>(PRODUCTS_KEY, prev =>
      prev ? prev.map(p => p.id === updated.id ? updated : p) : [updated]
    )
  }

  const { mutateAsync: submitForReview, isPending: submitting, isSuccess: submitSuccess, isError: submitError } = useMutation({
    mutationFn: () => productService.submitForReview(product.id),
    onSuccess: updateCache,
  })

  const { mutateAsync: publish, isPending: publishing, isSuccess: publishSuccess, isError: publishError } = useMutation({
    mutationFn: () => productService.publish(product.id),
    onSuccess: updateCache,
  })

  const { mutateAsync: archive, isPending: archiving, isSuccess: archiveSuccess, isError: archiveError } = useMutation({
    mutationFn: () => productService.archive(product.id),
    onSuccess: updateCache,
  })

  const isSuccess = submitSuccess || publishSuccess || archiveSuccess
  const isError = submitError || publishError || archiveError
  const canPublish = readiness?.canPublish ?? false

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
            loading={submitting}
            onClick={() => submitForReview()}
          >
            <i className="ti ti-send" aria-hidden="true" />
            Submit for review
          </Button>
        )}

        {product.status === 'IN_REVIEW' && (
          <Button
            fullWidth
            loading={publishing}
            disabled={!canPublish}
            onClick={() => publish()}
          >
            <i className="ti ti-world-upload" aria-hidden="true" />
            {canPublish ? 'Publish product' : 'Not ready to publish'}
          </Button>
        )}

        {product.status !== 'ARCHIVED' && (
          <Button
            fullWidth
            variant="danger"
            loading={archiving}
            onClick={() => archive()}
          >
            <i className="ti ti-archive" aria-hidden="true" />
            Archive product
          </Button>
        )}
      </div>

      {isSuccess && (
        <p className="text-xs text-status-published-text flex items-center gap-1">
          <i className="ti ti-check" aria-hidden="true" />
          Action completed successfully
        </p>
      )}

      {isError && (
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