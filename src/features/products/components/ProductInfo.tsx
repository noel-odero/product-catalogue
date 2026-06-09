import type { Product } from '../../../types'
import { formatDate } from '../../../lib/utils'
import { StatusBadge } from '../../../components/shared'

interface ProductInfoProps {
  product: Product
}

const fields = [
  { label: 'Product code', key: 'productCode' },
  { label: 'Brand', key: 'brand' },
  { label: 'Category', key: 'category' },
  { label: 'Target market', key: 'targetMarket' },
  { label: 'Season', key: 'season' },
] as const

export default function ProductInfo({ product }: ProductInfoProps) {
  return (
    <div className="bg-surface border border-border rounded-lg overflow-hidden">
      <div className="flex items-center gap-4 p-4 border-b border-border">
        <img
          src={product.thumbnailUrl}
          alt={product.name}
          className="w-16 h-16 rounded-lg object-cover bg-elevated"
        />
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <h1 className="text-base font-medium text-content-primary">{product.name}</h1>
            <StatusBadge status={product.status} />
            <StatusBadge status={product.readiness} />
          </div>
          <p className="text-xs text-content-tertiary">{product.description}</p>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-0">
        {fields.map(({ label, key }) => (
          <div key={key} className="p-4 border-b border-r border-border last:border-r-0">
            <p className="text-xs text-muted mb-1">{label}</p>
            <p className="text-sm text-content-primary">{product[key]}</p>
          </div>
        ))}
        <div className="p-4 border-b border-border">
          <p className="text-xs text-muted mb-1">Last updated</p>
          <p className="text-sm text-content-primary">{formatDate(product.updatedAt)}</p>
        </div>
        <div className="p-4 border-b border-border">
          <p className="text-xs text-muted mb-1">Created</p>
          <p className="text-sm text-content-primary">{formatDate(product.createdAt)}</p>
        </div>
      </div>
    </div>
  )
}