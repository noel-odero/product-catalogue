import { useParams } from 'react-router-dom'
import { useProducts } from '../../../hooks'
import LoadingSpinner from '../../../components/ui/LoadingSpinner'
import ProductForm from '../components/productForm'

export default function EditProductPage() {
  const { id } = useParams<{ id: string }>()
  const { products, loading } = useProducts()

  const product = products.find(p => p.id === id)

  if (loading) return <LoadingSpinner fullPage />

  if (!product) {
    return (
      <div className="flex items-center justify-center p-8">
        <p className="text-sm text-status-rejected-text">Product not found</p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-base font-medium text-content-primary">Edit product</h1>
        <p className="text-xs text-content-tertiary mt-0.5">
          Editing — {product.name}
        </p>
      </div>
      <ProductForm product={product} />
    </div>
  )
}