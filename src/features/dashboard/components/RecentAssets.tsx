import { useNavigate } from 'react-router-dom'
import type { Asset } from '../../../types'
import { truncate } from '../../../lib/utils'
import { cn } from '../../../lib/utils'

interface RecentAssetsProps {
  assets: Asset[]
}

const assetTypeIcon: Record<string, string> = {
  IMAGE: 'ti-photo',
  VIDEO: 'ti-video',
  DOCUMENT: 'ti-file-description',
  OTHER: 'ti-file',
}

const assetStatusColor: Record<string, string> = {
  APPROVED: 'text-status-published-text',
  PENDING_REVIEW: 'text-status-review-text',
  REJECTED: 'text-status-rejected-text',
}

export default function RecentAssets({ assets }: RecentAssetsProps) {
  const navigate = useNavigate()

  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-sm font-medium text-content-primary">Recently uploaded assets</h2>
        <button
          onClick={() => navigate('/assets')}
          className="text-xs text-content-tertiary hover:text-content-secondary transition-colors"
        >
          View library →
        </button>
      </div>

      <div className="grid grid-cols-6 gap-3">
        {assets.map(asset => (
          <div
            key={asset.id}
            onClick={() => navigate(`/assets/${asset.id}`)}
            className="bg-surface border border-border rounded-lg p-3 cursor-pointer hover:bg-elevated transition-colors"
          >
            {asset.assetType === 'IMAGE' ? (
              <img
                src={asset.fileUrl}
                alt={asset.title}
                className="w-full aspect-square object-cover rounded-md mb-2 bg-elevated"
              />
            ) : (
              <div className="w-full aspect-square bg-elevated rounded-md mb-2 flex items-center justify-center">
                <i
                  className={cn('ti', assetTypeIcon[asset.assetType], 'text-2xl text-muted')}
                  aria-hidden="true"
                />
              </div>
            )}
            <p className="text-xs text-content-secondary truncate">{truncate(asset.title, 20)}</p>
            <p className={cn('text-xs mt-0.5', assetStatusColor[asset.status])}>
              {asset.status.replace('_', ' ').toLowerCase()}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}