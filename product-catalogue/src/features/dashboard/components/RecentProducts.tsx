import { useNavigate } from 'react-router-dom'
import type { Product } from '../../../types'
import { cn, formatDate, truncate } from '../../../lib/utils'
import StatusBadge from '../../../components/shared/StatusBadge'

interface RecentProductsProps {
  products: Product[]
}

const thClass = 'text-left text-xs text-muted font-normal px-4 py-3'
const tdClass = 'px-4 py-3 text-xs text-content-secondary'
const columns = ['Product', 'Code', 'Brand', 'Status', 'Readiness', 'Updated']


export default function RecentProducts({ products }: RecentProductsProps) {
  const navigate = useNavigate()

  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-sm font-medium text-content-primary">Recent products</h2>
        <button
          onClick={() => navigate('/products')}
          className="text-xs text-content-tertiary hover:text-content-secondary transition-colors"
        >
          View all →
        </button>
      </div>

      <div className="bg-surface border border-border rounded-lg overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border">
              {columns.map(col => (<th key={col} className={thClass}>{col}</th>))}
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
                    <span className="text-sm text-content-primary font-medium">
                      {truncate(product.name, 30)}
                    </span>
                  </div>
                </td>
                <td className={tdClass}>{product.productCode}</td>
                <td className={tdClass}>{product.brand}</td>
                <td className="px-4 py-3">
                  <StatusBadge status={product.status} />
                </td>
                <td className="px-4 py-3">
                  <StatusBadge status={product.readiness} />
                </td>
                <td className={tdClass}>{formatDate(product.updatedAt)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}