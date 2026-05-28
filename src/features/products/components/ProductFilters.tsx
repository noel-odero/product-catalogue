import type { ProductStatus, ReadinessStatus } from '../../../types'
import Input from '../../../components/ui/Input'
import Select from '../../../components/ui/Select'

interface ProductFiltersProps {
  search: string
  brand: string
  category: string
  status: ProductStatus | ''
  readiness: ReadinessStatus | ''
  onSearchChange: (value: string) => void
  onBrandChange: (value: string) => void
  onCategoryChange: (value: string) => void
  onStatusChange: (value: ProductStatus | '') => void
  onReadinessChange: (value: ReadinessStatus | '') => void
  onReset: () => void
}

const statusOptions = [
  { value: 'DRAFT', label: 'Draft' },
  { value: 'IN_REVIEW', label: 'In review' },
  { value: 'PUBLISHED', label: 'Published' },
  { value: 'ARCHIVED', label: 'Archived' },
]

const readinessOptions = [
  { value: 'INCOMPLETE', label: 'Incomplete' },
  { value: 'PARTIAL', label: 'Partial' },
  { value: 'READY', label: 'Ready' },
]

const brandOptions = [
  { value: 'Heritage', label: 'Heritage' },
  { value: 'Essentials', label: 'Essentials' },
  { value: 'Accessories', label: 'Accessories' },
  { value: 'Footwear', label: 'Footwear' },
]

const categoryOptions = [
  { value: 'Outerwear', label: 'Outerwear' },
  { value: 'Tops', label: 'Tops' },
  { value: 'Bottoms', label: 'Bottoms' },
  { value: 'Bags', label: 'Bags' },
  { value: 'Shoes', label: 'Shoes' },
]

export default function ProductFilters({
  search,
  brand,
  category,
  status,
  readiness,
  onSearchChange,
  onBrandChange,
  onCategoryChange,
  onStatusChange,
  onReadinessChange,
  onReset,
}: ProductFiltersProps) {
  const hasActiveFilters = search || brand || category || status || readiness

  return (
    <div className="bg-surface border border-border rounded-lg p-4">
      <div className="grid grid-cols-5 gap-3">
        <Input
          icon="ti-search"
          placeholder="Search products..."
          value={search}
          onChange={e => onSearchChange(e.target.value)}
        />
        <Select
          placeholder="All brands"
          options={brandOptions}
          value={brand}
          onChange={e => onBrandChange(e.target.value)}
        />
        <Select
          placeholder="All categories"
          options={categoryOptions}
          value={category}
          onChange={e => onCategoryChange(e.target.value)}
        />
        <Select
          placeholder="All statuses"
          options={statusOptions}
          value={status}
          onChange={e => onStatusChange(e.target.value as ProductStatus | '')}
        />
        <Select
          placeholder="All readiness"
          options={readinessOptions}
          value={readiness}
          onChange={e => onReadinessChange(e.target.value as ReadinessStatus | '')}
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