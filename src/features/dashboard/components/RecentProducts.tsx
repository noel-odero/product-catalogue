import { useNavigate } from 'react-router-dom'
import type { Product } from '../../../types'
import ProductTable from '../../products/components/productTable'

interface RecentProductsProps {
  products: Product[]
}

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
      <ProductTable products={products} />
    </div>
  )
}