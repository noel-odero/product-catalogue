import { useNavigate } from 'react-router-dom'
import type { Asset } from '../../../types'
import { cn, truncate } from '../../../lib/utils'
import { EmptyState } from '../../../components/ui'

interface AssetGridProps {
  assets: Asset[]
  emptyMessage?: string
}

const assetTypeIcon: Record<string, string> = {
  MAIN_IMAGE: 'ti-photo',
  VARIANT_IMAGE: 'ti-photo',
  LIFESTYLE_IMAGE: 'ti-photo',
  MARKETING_BANNER: 'ti-layout',
  SIZE_GUIDE: 'ti-ruler',
  TECHNICAL_DOCUMENT: 'ti-file-description',
}

const assetStatusColor: Record<string, string> = {
  UPLOADED: 'text-content-tertiary',
  APPROVED: 'text-status-published-text',
  PENDING_REVIEW: 'text-status-review-text',
  REJECTED: 'text-status-rejected-text',
  ARCHIVED: 'text-content-disabled',
}

export default function AssetGrid({
  assets,
  emptyMessage = 'No assets uploaded yet',
}: AssetGridProps) {
  const navigate = useNavigate()

  if (assets.length === 0) {
    return (
      <div className="bg-surface border border-border rounded-lg">
        <EmptyState
          icon="ti-photo"
          title={emptyMessage}
          description="Upload assets to attach them to this product."
        />
      </div>
    )
  }

  return (
    <div className="grid grid-cols-4 gap-3">
      {assets.map(asset => (
        <div
          key={asset.id}
          onClick={() => navigate(`/assets/${asset.id}`)}
          className="bg-surface border border-border rounded-lg p-3 cursor-pointer hover:bg-elevated transition-colors group"
        >
          {asset.assetType === 'MAIN_IMAGE' ||
          asset.assetType === 'VARIANT_IMAGE' ||
          asset.assetType === 'LIFESTYLE_IMAGE' ?(
            <img
              src={asset.fileUrl}
              alt={asset.title}
              className="w-full aspect-square object-cover rounded-md mb-2 bg-elevated"
            />
          ) : (
            <div className="w-full aspect-square bg-elevated rounded-md mb-2 flex items-center justify-center">
              <i
                className={cn(
                  'ti',
                  assetTypeIcon[asset.assetType],
                  'text-2xl text-muted group-hover:text-content-secondary transition-colors',
                )}
                aria-hidden="true"
              />
            </div>
          )}

          <p className="text-xs text-content-secondary font-medium truncate mb-1">
            {truncate(asset.title, 24)}
          </p>

          <div className="flex items-center justify-between">
            <span className={cn('text-xs', assetStatusColor[asset.status])}>
              {asset.status.replace('_', ' ').toLowerCase()}
            </span>
            <span className="text-xs text-content-disabled uppercase">
              {asset.assetType === 'MAIN_IMAGE' ? 'img'
                : asset.assetType === 'VARIANT_IMAGE' ? 'img'
                : asset.assetType === 'LIFESTYLE_IMAGE' ? 'img'
                : asset.assetType === 'MARKETING_BANNER' ? 'img'
                : asset.assetType === 'SIZE_GUIDE' ? 'doc'
                : asset.assetType === 'TECHNICAL_DOCUMENT' ? 'doc'
                : 'file'}
            </span>
          </div>
        </div>
      ))}
    </div>
  )
}