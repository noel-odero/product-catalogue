import type { AssetType, AssetStatus } from '../../../types'
import { Input, Select } from '../../../components/ui'
import { FilterBar } from '../../../components/shared'
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

  const hasActiveFilters = !!(search || productId || assetType || status || tags)

  return (
    <FilterBar hasActiveFilters={hasActiveFilters} onReset={onReset}>
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
    </FilterBar>
  )
}