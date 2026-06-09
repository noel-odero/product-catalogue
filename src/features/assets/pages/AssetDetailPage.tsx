import { useParams, useNavigate } from 'react-router-dom'
import { useAssets } from '../../../hooks'
import { useProducts } from '../../../hooks'
import { LoadingSpinner, EmptyState } from '../../../components/ui'
import { StatusBadge } from '../../../components/shared'
import { cn, formatDateTime, truncate } from '../../../lib/utils'

const assetTypeIcon: Record<string, string> = {
  MAIN_IMAGE: 'ti-photo',
  VARIANT_IMAGE: 'ti-photo',
  LIFESTYLE_IMAGE: 'ti-photo',
  MARKETING_BANNER: 'ti-layout',
  SIZE_GUIDE: 'ti-ruler',
  TECHNICAL_DOCUMENT: 'ti-file-description',
}
export default function AssetDetailPage() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const { assets, loading: assetsLoading } = useAssets()
  const { products, loading: productsLoading } = useProducts()

  const asset = assets.find(a => a.id === id)
  const product = products.find(p => p.id === asset?.productId)

  const loading = assetsLoading || productsLoading

  if (loading) return <LoadingSpinner fullPage />

  if (!asset) {
    return (
      <div className="bg-surface border border-border rounded-lg">
        <EmptyState
          icon="ti-photo-off"
          title="Asset not found"
          description="This asset may have been removed or does not exist."
          action={{ label: '← Back to library', onClick: () => navigate('/assets') }}
        />
      </div>
    )
  }


  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <button
          onClick={() => navigate('/assets')}
          className="text-xs text-content-tertiary hover:text-content-secondary transition-colors flex items-center gap-1"
        >
          <i className="ti ti-arrow-left text-xs" aria-hidden="true" />
          Asset library
        </button>
        <span className="text-content-disabled text-xs">/</span>
        <span className="text-xs text-content-secondary">
          {truncate(asset.title, 40)}
        </span>
      </div>

      <div className="grid grid-cols-3 gap-6">
        <div className="col-span-2 space-y-4">
          <div className="bg-surface border border-border rounded-lg overflow-hidden">
            {asset.assetType === 'MAIN_IMAGE' ||
            asset.assetType === 'VARIANT_IMAGE' ||
            asset.assetType === 'LIFESTYLE_IMAGE' ? (
              <img
                src={asset.fileUrl}
                alt={asset.title}
                className="w-full object-contain max-h-96 bg-elevated"
              />
            ) : (
              <div className="w-full h-64 bg-elevated flex items-center justify-center">
                <div className="flex flex-col items-center gap-3">
                  <i
                    className={cn(
                      'ti',
                      assetTypeIcon[asset.assetType],
                      'text-4xl text-muted',
                    )}
                    aria-hidden="true"
                  />
                  <p className="text-xs text-content-tertiary">{asset.fileName}</p>
                </div>
              </div>
            )}
          </div>

          <div className="bg-surface border border-border rounded-lg p-4 space-y-3">
            <h2 className="text-sm font-medium text-content-primary">Status history</h2>
            <div className="space-y-2">
              {asset.statusHistory.map((event, index) => (
                <div
                  key={index}
                  className="flex items-start gap-3"
                >
                  <div className="flex flex-col items-center">
                    <div className={cn(
                      'w-2 h-2 rounded-full mt-1 flex-shrink-0',
                      event.status === 'APPROVED' && 'bg-status-published-text',
                      event.status === 'PENDING_REVIEW' && 'bg-status-review-text',
                      event.status === 'REJECTED' && 'bg-status-rejected-text',
                    )} />
                    {index !== asset.statusHistory.length - 1 && (
                      <div className="w-px h-6 bg-border mt-1" />
                    )}
                  </div>
                  <div className="flex-1 pb-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-content-primary font-medium capitalize">
                        {event.status.replace('_', ' ').toLowerCase()}
                      </span>
                      <span className="text-xs text-content-tertiary">
                        {formatDateTime(event.changedAt)}
                      </span>
                    </div>
                    {event.reason && (
                      <p className="text-xs text-status-rejected-text mt-0.5">
                        {event.reason}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="bg-surface border border-border rounded-lg p-4 space-y-3">
            <h2 className="text-sm font-medium text-content-primary">Asset details</h2>

            <div className="space-y-2">
              {[
                { label: 'Title', value: asset.title },
                { label: 'File name', value: asset.fileName },
                { label: 'Type', value: asset.assetType },
                { label: 'Uploaded', value: formatDateTime(asset.uploadedAt) },
              ].map(({ label, value }) => (
                <div key={label} className="flex flex-col gap-0.5">
                  <p className="text-xs text-muted">{label}</p>
                  <p className="text-xs text-content-primary">{value}</p>
                </div>
              ))}
            </div>

            <div className="pt-2 border-t border-border">
              <p className="text-xs text-muted mb-1">Status</p>
              <StatusBadge status={asset.status} />
            </div>

            {asset.rejectionReason && (
              <div className="pt-2 border-t border-border">
                <p className="text-xs text-muted mb-1">Rejection reason</p>
                <p className="text-xs text-status-rejected-text">
                  {asset.rejectionReason}
                </p>
              </div>
            )}

            {asset.tags.length > 0 && (
              <div className="pt-2 border-t border-border">
                <p className="text-xs text-muted mb-2">Tags</p>
                <div className="flex flex-wrap gap-1">
                  {asset.tags.map(tag => (
                    <span
                      key={tag}
                      className="text-xs bg-elevated border border-border px-2 py-0.5 rounded-full text-content-secondary"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {product && (
            <div className="bg-surface border border-border rounded-lg p-4 space-y-3">
              <h2 className="text-sm font-medium text-content-primary">Product</h2>
              <div
                onClick={() => navigate(`/products/${product.id}`)}
                className="flex items-center gap-3 cursor-pointer hover:bg-elevated rounded-lg p-2 -m-2 transition-colors"
              >
                <img
                  src={product.thumbnailUrl}
                  alt={product.name}
                  className="w-10 h-10 rounded-md object-cover bg-elevated"
                />
                <div>
                  <p className="text-xs text-content-primary font-medium">
                    {product.name}
                  </p>
                  <p className="text-xs text-content-tertiary">
                    {product.productCode}
                  </p>
                </div>
              </div>
            </div>
          )}

          <div className="bg-surface border border-border rounded-lg p-4">
            <h2 className="text-sm font-medium text-content-primary mb-3">Description</h2>
            <p className="text-xs text-content-secondary leading-relaxed">
              {asset.description || 'No description provided.'}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}