import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import type { ProductStatus, ReadinessStatus } from '../../../types'
import { useProducts } from '../../../hooks'
import LoadingSpinner from '../../../components/ui/LoadingSpinner'
import ProductFilters from '../components/ProductFilters'
import ProductTable from '../components/productTable'

interface Filters {
  search: string
  brand: string
  category: string
  status: ProductStatus | ''
  readiness: ReadinessStatus | ''
}

const initialFilters: Filters = {
  search: '',
  brand: '',
  category: '',
  status: '',
  readiness: '',
}

export default function ProductListPage() {
  const navigate = useNavigate()
  const { products, loading, error } = useProducts()
  const [filters, setFilters] = useState<Filters>(initialFilters)

  const filtered = products.filter(p => {
    const matchesSearch =
      !filters.search ||
      p.name.toLowerCase().includes(filters.search.toLowerCase()) ||
      p.productCode.toLowerCase().includes(filters.search.toLowerCase())
    const matchesBrand = !filters.brand || p.brand === filters.brand
    const matchesCategory = !filters.category || p.category === filters.category
    const matchesStatus = !filters.status || p.status === filters.status
    const matchesReadiness = !filters.readiness || p.readiness === filters.readiness

    return matchesSearch && matchesBrand && matchesCategory && matchesStatus && matchesReadiness
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
          <h1 className="text-base font-medium text-content-primary">Products</h1>
          <p className="text-xs text-content-tertiary mt-0.5">
            {filtered.length} of {products.length} products
          </p>
        </div>
        <button
          onClick={() => navigate('/products/new')}
          className="bg-white text-base text-xs font-medium px-4 py-2 rounded-md hover:bg-gray-100 transition-colors"
        >
          + New product
        </button>
      </div>

      <ProductFilters
        search={filters.search}
        brand={filters.brand}
        category={filters.category}
        status={filters.status}
        readiness={filters.readiness}
        onSearchChange={value => setFilters(prev => ({ ...prev, search: value }))}
        onBrandChange={value => setFilters(prev => ({ ...prev, brand: value }))}
        onCategoryChange={value => setFilters(prev => ({ ...prev, category: value }))}
        onStatusChange={value => setFilters(prev => ({ ...prev, status: value }))}
        onReadinessChange={value => setFilters(prev => ({ ...prev, readiness: value }))}
        onReset={() => setFilters(initialFilters)}
      />

      <ProductTable products={filtered} />
    </div>
  )
}