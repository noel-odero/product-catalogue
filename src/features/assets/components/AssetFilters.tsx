import type { AssetType, AssetStatus } from '../../../types'
import { Input, Select } from '../../../components/ui'
import { useProducts } from '../../../hooks'

interface AssetFiltersProps {
  search: string
  productId: string
  assetType: AssetType | ''
  status: AssetStatus | ''
  tags: string
  onSearchChange: (value: string) => void
  onProductChange: (value: string) => void
  onAssetTypeChange: (value: AssetType | '') => void
  onStatusChange: (value: AssetStatus | '') => void
  onTagsChange: (value: string) => void
  onReset: () => void
}

const assetTypeOptions = [
  { value: 'IMAGE', label: 'Image' },
  { value: 'VIDEO', label: 'Video' },
  { value: 'DOCUMENT', label: 'Document' },
  { value: 'OTHER', label: 'Other' },
]

const statusOptions = [
  { value: 'PENDING_REVIEW', label: 'Pending review' },
  { value: 'APPROVED', label: 'Approved' },
  { value: 'REJECTED', label: 'Rejected' },
]

export default function AssetFilters({
  search,
  productId,
  assetType,
  status,
  tags,
  onSearchChange,
  onProductChange,
  onAssetTypeChange,
  onStatusChange,
  onTagsChange,
  onReset,
}: AssetFiltersProps) {
  const { products } = useProducts()

  const productOptions = products.map(p => ({
    value: p.id,
    label: p.name,
  }))

  const hasActiveFilters = search || productId || assetType || status || tags

  return (
    <div className="bg-surface border border-border rounded-lg p-4">
      <div className="grid grid-cols-5 gap-3">
        <Input
          icon="ti-search"
          placeholder="Search by filename..."
          value={search}
          onChange={e => onSearchChange(e.target.value)}
        />
        <Select
          placeholder="All products"
          options={productOptions}
          value={productId}
          onChange={e => onProductChange(e.target.value)}
        />
        <Select
          placeholder="All types"
          options={assetTypeOptions}
          value={assetType}
          onChange={e => onAssetTypeChange(e.target.value as AssetType | '')}
        />
        <Select
          placeholder="All statuses"
          options={statusOptions}
          value={status}
          onChange={e => onStatusChange(e.target.value as AssetStatus | '')}
        />
        <Input
          icon="ti-tag"
          placeholder="Filter by tag..."
          value={tags}
          onChange={e => onTagsChange(e.target.value)}
        />
      </div>
      {hasActiveFilters && (
        <div className="mt-3 flex justify-end">
          <button
            onClick={onReset}
            className="text-xs text-content-tertiary hover:text-content-secondary transition-colors flex items-center gap-1"
          >
            <i className="ti ti-x text-xs" aria-hidden="true" />
            Clear filters
          </button>
        </div>
      )}
    </div>
  )
}