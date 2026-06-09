import { useState } from 'react'
import type { AssetType, AssetStatus } from '../../../types'
import { useAssets } from '../../../hooks'
import { LoadingSpinner } from '../../../components/ui'
import { AssetFilters, AssetGrid } from '../components'

interface AssetLibraryFilters {
  search: string
  productId: string
  assetType: AssetType | ''
  status: AssetStatus | ''
  tags: string
}

const initialFilters: AssetLibraryFilters = {
  search: '',
  productId: '',
  assetType: '',
  status: '',
  tags: '',
}

export default function AssetLibraryPage() {
  const { assets, loading, error } = useAssets()
  const [filters, setFilters] = useState<AssetLibraryFilters>(initialFilters)

  const filtered = assets.filter(a => {
    const matchesSearch =
      !filters.search ||
      a.fileName.toLowerCase().includes(filters.search.toLowerCase()) ||
      a.title.toLowerCase().includes(filters.search.toLowerCase())

    const matchesProduct =
      !filters.productId || a.productId === filters.productId

    const matchesType =
      !filters.assetType || a.assetType === filters.assetType

    const matchesStatus =
      !filters.status || a.status === filters.status

    const matchesTags =
      !filters.tags ||
      a.tags.some(tag =>
        tag.toLowerCase().includes(filters.tags.toLowerCase()),
      )

    return matchesSearch && matchesProduct && matchesType && matchesStatus && matchesTags
  })

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
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-base font-medium text-content-primary">Asset library</h1>
          <p className="text-xs text-content-tertiary mt-0.5">
            {filtered.length} of {assets.length} assets
          </p>
        </div>
      </div>

      <AssetFilters
        search={filters.search}
        productId={filters.productId}
        assetType={filters.assetType}
        status={filters.status}
        tags={filters.tags}
        onSearchChange={value => setFilters(prev => ({ ...prev, search: value }))}
        onProductChange={value => setFilters(prev => ({ ...prev, productId: value }))}
        onAssetTypeChange={value => setFilters(prev => ({ ...prev, assetType: value }))}
        onStatusChange={value => setFilters(prev => ({ ...prev, status: value }))}
        onTagsChange={value => setFilters(prev => ({ ...prev, tags: value }))}
        onReset={() => setFilters(initialFilters)}
      />

      <AssetGrid
        assets={filtered}
        emptyMessage="No assets match your filters"
      />
    </div>
  )
}