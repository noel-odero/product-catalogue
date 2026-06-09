import { useState } from 'react'
import { useAssets } from '../../../hooks'
import { LoadingSpinner, Button, EmptyState } from '../../../components/ui'
import { StatusBadge } from '../../../components/shared'
import { cn, formatDateTime, truncate } from '../../../lib/utils'
import type { Asset } from '../../../types'

export default function ReviewQueuePage() {
  const { assets, loading, error, approveAsset, rejectAsset } = useAssets()
  const [selectedAsset, setSelectedAsset] = useState<Asset | null>(null)
  const [rejectionReason, setRejectionReason] = useState('')
  const [showRejectInput, setShowRejectInput] = useState(false)
  const [actionLoading, setActionLoading] = useState(false)
  const [reasonError, setReasonError] = useState('')

  const pendingAssets = assets.filter(a => a.status === 'PENDING_REVIEW')

  const handleSelect = (asset: Asset) => {
    setSelectedAsset(asset)
    setShowRejectInput(false)
    setRejectionReason('')
    setReasonError('')
  }

  const handleApprove = async () => {
    if (!selectedAsset) return
    setActionLoading(true)
    try {
      await approveAsset(selectedAsset.id)
      setSelectedAsset(null)
    } catch (e) {
      console.error(e)
    } finally {
      setActionLoading(false)
    }
  }

  const handleReject = async () => {
    if (!selectedAsset) return
    if (!rejectionReason.trim()) {
      setReasonError('Please provide a reason for rejection')
      return
    }
    setActionLoading(true)
    try {
      await rejectAsset(selectedAsset.id, rejectionReason)
      setSelectedAsset(null)
      setRejectionReason('')
      setShowRejectInput(false)
    } catch (e) {
      console.error(e)
    } finally {
      setActionLoading(false)
    }
  }

  if (loading) return <LoadingSpinner fullPage />

  if (error) {
    return (
      <div className="flex items-center justify-center p-8">
        <p className="text-sm text-status-rejected-text">{error}</p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-base font-medium text-content-primary">Review queue</h1>
        <p className="text-xs text-content-tertiary mt-0.5">
          {pendingAssets.length} asset{pendingAssets.length !== 1 ? 's' : ''} pending review
        </p>
      </div>

      {pendingAssets.length === 0 ? (
        <div className="bg-surface border border-border rounded-lg">
          <EmptyState
            icon="ti-circle-check"
            title="All caught up"
            description="There are no assets pending review right now."
          />
        </div>
      ) : (
        <div className="grid grid-cols-3 gap-6">
          <div className="col-span-1 space-y-2">
            {pendingAssets.map(asset => (
              <div
                key={asset.id}
                onClick={() => handleSelect(asset)}
                className={cn(
                  'bg-surface border rounded-lg p-3 cursor-pointer transition-colors',
                  selectedAsset?.id === asset.id
                    ? 'border-content-secondary'
                    : 'border-border hover:bg-elevated',
                )}
              >
                <div className="flex items-center gap-3">
                  {asset.assetType === 'MAIN_IMAGE' ||
                    asset.assetType === 'VARIANT_IMAGE' ||
                    asset.assetType === 'LIFESTYLE_IMAGE' ? (
                    <img
                      src={asset.fileUrl}
                      alt={asset.title}
                      className="w-10 h-10 rounded-md object-cover bg-elevated flex-shrink-0"
                    />
                  ) : (
                    <div className="w-10 h-10 rounded-md bg-elevated flex items-center justify-center flex-shrink-0">
                      <i className="ti ti-file text-muted text-sm" aria-hidden="true" />
                    </div>
                  )}
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-content-primary font-medium truncate">
                      {truncate(asset.title, 24)}
                    </p>
                    <p className="text-xs text-content-tertiary truncate">
                      {asset.fileName}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="col-span-2">
            {!selectedAsset ? (
              <div className="bg-surface border border-border rounded-lg h-full">
                <EmptyState
                  icon="ti-hand-pointer"
                  title="Select an asset"
                  description="Click an asset from the list to review it."
                />
              </div>
            ) : (
              <div className="bg-surface border border-border rounded-lg overflow-hidden">
                <div className="p-4 border-b border-border flex items-center justify-between">
                  <div>
                    <h2 className="text-sm font-medium text-content-primary">
                      {selectedAsset.title}
                    </h2>
                    <p className="text-xs text-content-tertiary mt-0.5">
                      {selectedAsset.fileName}
                    </p>
                  </div>
                  <StatusBadge status={selectedAsset.status as never} />
                </div>

                <div className="p-4 space-y-4">
                  {selectedAsset.assetType === 'MAIN_IMAGE' ||
                  selectedAsset.assetType === 'VARIANT_IMAGE' ||
                  selectedAsset.assetType === 'LIFESTYLE_IMAGE' ? (
                    <img
                      src={selectedAsset.fileUrl}
                      alt={selectedAsset.title}
                      className="w-full max-h-80 object-contain rounded-lg bg-elevated"
                    />
                  ) : (
                    <div className="w-full h-48 bg-elevated rounded-lg flex items-center justify-center">
                      <div className="flex flex-col items-center gap-2">
                        <i className="ti ti-file-description text-3xl text-muted" aria-hidden="true" />
                        <p className="text-xs text-content-tertiary">
                          {selectedAsset.fileName}
                        </p>
                      </div>
                    </div>
                  )}

                  <div className="grid grid-cols-2 gap-3">
                    {[
                      { label: 'Type', value: selectedAsset.assetType },
                      { label: 'Uploaded', value: formatDateTime(selectedAsset.uploadedAt) },
                      { label: 'Description', value: selectedAsset.description || '—' },
                      { label: 'Tags', value: selectedAsset.tags.join(', ') || '—' },
                    ].map(({ label, value }) => (
                      <div key={label}>
                        <p className="text-xs text-muted mb-0.5">{label}</p>
                        <p className="text-xs text-content-primary">{value}</p>
                      </div>
                    ))}
                  </div>

                  {showRejectInput && (
                    <div className="space-y-2">
                      <textarea
                        placeholder="Provide a reason for rejection..."
                        value={rejectionReason}
                        onChange={e => {
                          setRejectionReason(e.target.value)
                          if (reasonError) setReasonError('')
                        }}
                        rows={3}
                        className={cn(
                          'w-full bg-elevated border rounded-md text-sm text-content-primary placeholder:text-muted',
                          'px-3 py-2 outline-none transition-colors resize-none',
                          'hover:border-content-disabled focus:border-content-secondary',
                          reasonError
                            ? 'border-status-rejected-text'
                            : 'border-border',
                        )}
                      />
                      {reasonError && (
                        <p className="text-xs text-status-rejected-text">{reasonError}</p>
                      )}
                    </div>
                  )}

                  <div className="flex items-center gap-3 pt-2 border-t border-border">
                    <Button
                      loading={actionLoading}
                      onClick={handleApprove}
                    >
                      <i className="ti ti-check" aria-hidden="true" />
                      Approve
                    </Button>

                    {showRejectInput ? (
                      <Button
                        variant="danger"
                        loading={actionLoading}
                        onClick={handleReject}
                      >
                        <i className="ti ti-x" aria-hidden="true" />
                        Confirm rejection
                      </Button>
                    ) : (
                      <Button
                        variant="danger"
                        onClick={() => setShowRejectInput(true)}
                      >
                        <i className="ti ti-x" aria-hidden="true" />
                        Reject
                      </Button>
                    )}

                    <button
                      onClick={() => {
                        setShowRejectInput(false)
                        setRejectionReason('')
                        setReasonError('')
                      }}
                      className="text-xs text-content-tertiary hover:text-content-secondary transition-colors ml-auto"
                    >
                      Clear
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}