import { useParams, useNavigate } from 'react-router-dom'
import { useProducts, useVariants, useAssets, useReadiness } from '../../../hooks'
import { LoadingSpinner } from '../../../components/ui'
import {
  ProductInfo,
  ProductActions,
  VariantsTable,
  AssetUploadModal,
  ReadinessChecklist,
} from '../components'
import { useState } from 'react'
import { AssetGrid } from '../../assets/components'

export default function ProductDetailPage() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const [showUploadModal, setShowUploadModal] = useState(false)

  const { products, loading: productsLoading, submitForReview, publish, archive } = useProducts()
  const { variants, loading: variantsLoading, createVariant, updateVariant, deleteVariant } = useVariants({ productId: id! })
  const { assets, loading: assetsLoading, uploadAsset } = useAssets({ productId: id })
  const { readiness, loading: readinessLoading } = useReadiness({ productId: id! })

  const product = products.find(p => p.id === id)

  const loading = productsLoading || variantsLoading || assetsLoading || readinessLoading

  if (loading) return <LoadingSpinner fullPage />

  if (!product) {
    return (
      <div className="flex items-center justify-center p-8">
        <p className="text-sm text-status-rejected-text">Product not found</p>
      </div>
    )
  }

  const productAssets = assets.filter(a => !a.variantId)
  const variantAssets = assets.filter(a => !!a.variantId)

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 mb-2">
        <button
          onClick={() => navigate('/products')}
          className="text-xs text-content-tertiary hover:text-content-secondary transition-colors flex items-center gap-1"
        >
          <i className="ti ti-arrow-left text-xs" aria-hidden="true" />
          Products
        </button>
        <span className="text-content-disabled text-xs">/</span>
        <span className="text-xs text-content-secondary">{product.name}</span>
      </div>

      <div className="grid grid-cols-3 gap-6">
        <div className="col-span-2 space-y-6">
          <ProductInfo product={product} />

          <VariantsTable
            variants={variants}
            productId={product.id}
            onCreateVariant={createVariant}
            onUpdateVariant={updateVariant}
            onDeleteVariant={deleteVariant}
          />

          <div>
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-sm font-medium text-content-primary">Product assets</h2>
              <button
                onClick={() => setShowUploadModal(true)}
                className="text-xs text-content-tertiary hover:text-content-secondary transition-colors flex items-center gap-1"
              >
                <i className="ti ti-upload text-xs" aria-hidden="true" />
                Upload asset
              </button>
            </div>
            <AssetGrid assets={productAssets} />
          </div>

          {variantAssets.length > 0 && (
            <div>
              <h2 className="text-sm font-medium text-content-primary mb-3">Variant assets</h2>
              <AssetGrid assets={variantAssets} />
            </div>
          )}
        </div>

        <div className="space-y-6">
          <ProductActions
            product={product}
            readiness={readiness}
            onSubmitForReview={() => submitForReview(product.id)}
            onPublish={() => publish(product.id)}
            onArchive={() => archive(product.id)}
            onEdit={() => navigate(`/products/${product.id}/edit`)}
          />
          <ReadinessChecklist readiness={readiness} />
        </div>
      </div>

      {showUploadModal && (
        <AssetUploadModal
          productId={product.id}
          variants={variants}
          onUpload={uploadAsset}
          onClose={() => setShowUploadModal(false)}
        />
      )}
    </div>
  )
}