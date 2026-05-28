import { useNavigate } from 'react-router-dom'
import type { Product } from '../../../types'
import { cn, formatDate, truncate } from '../../../lib/utils'
import StatusBadge from '../../../components/shared/StatusBadge'
import EmptyState from '../../../components/ui/EmptyState'

interface ProductTableProps {
  products: Product[]
}

const thClass = 'text-left text-xs text-muted font-normal px-4 py-3'
const tdClass = 'px-4 py-3 text-xs text-content-secondary'

const columns = ['Product', 'Code', 'Brand', 'Category', 'Status', 'Readiness', 'Updated', '']

export default function ProductTable({ products }: ProductTableProps) {
  const navigate = useNavigate()

  if (products.length === 0) {
    return (
      <div className="bg-surface border border-border rounded-lg">
        <EmptyState
          icon="ti-box"
          title="No products found"
          description="Try adjusting your filters or create a new product."
          action={{
            label: '+ New product',
            onClick: () => navigate('/products/new'),
          }}
        />
      </div>
    )
  }

  return (
    <div className="bg-surface border border-border rounded-lg overflow-hidden">
      <table className="w-full">
        <thead>
          <tr className="border-b border-border">
            {columns.map((col, index) => (
              <th key={index} className={thClass}>{col}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {products.map((product, index) => (
            <tr
              key={product.id}
              onClick={() => navigate(`/products/${product.id}`)}
              className={cn(
                'cursor-pointer hover:bg-elevated transition-colors',
                index !== products.length - 1 && 'border-b border-border-subtle',
              )}
            >
              <td className="px-4 py-3">
                <div className="flex items-center gap-3">
                  <img
                    src={product.thumbnailUrl}
                    alt={product.name}
                    className="w-8 h-8 rounded-md object-cover bg-elevated"
                  />
                  <div>
                    <p className="text-sm text-content-primary font-medium">
                      {truncate(product.name, 30)}
                    </p>
                    <p className="text-xs text-content-tertiary">{product.targetMarket}</p>
                  </div>
                </div>
              </td>
              <td className={tdClass}>{product.productCode}</td>
              <td className={tdClass}>{product.brand}</td>
              <td className={tdClass}>{product.category}</td>
              <td className="px-4 py-3">
                <StatusBadge status={product.status} />
              </td>
              <td className="px-4 py-3">
                <StatusBadge status={product.readiness} />
              </td>
              <td className={tdClass}>{formatDate(product.updatedAt)}</td>
              <td className="px-4 py-3">
                <button
                  onClick={e => {
                    e.stopPropagation()
                    navigate(`/products/${product.id}/edit`)
                  }}
                  className="text-xs text-content-tertiary hover:text-content-secondary transition-colors"
                >
                  <i className="ti ti-edit" aria-hidden="true" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}