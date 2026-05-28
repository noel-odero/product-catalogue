import { useProducts } from '../../hooks'
import { useAssets } from '../../hooks'
import LoadingSpinner from '../../components/ui/LoadingSpinner'
import DashboardStats from './components/DashboardStats'
import RecentProducts from './components/RecentProducts'
import RecentAssets from './components/RecentAssets'

export default function DashboardPage() {
  const { products, loading: productsLoading } = useProducts()
  const { assets, loading: assetsLoading } = useAssets()

  const stats = {
    total: products.length,
    readyToPublish: products.filter(p => p.readiness === 'READY').length,
    published: products.filter(p => p.status === 'PUBLISHED').length,
    pendingReview: assets.filter(a => a.status === 'PENDING_REVIEW').length,
    rejected: assets.filter(a => a.status === 'REJECTED').length,
  }

  const recentProducts = [...products]
    .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())
    .slice(0, 5)

  const recentAssets = [...assets]
    .sort((a, b) => new Date(b.uploadedAt).getTime() - new Date(a.uploadedAt).getTime())
    .slice(0, 6)

  if (productsLoading || assetsLoading) {
    return <LoadingSpinner fullPage />
  }

  return (
    <div className="space-y-6">
      <DashboardStats stats={stats} />
      <RecentProducts products={recentProducts} />
      <RecentAssets assets={recentAssets} />
    </div>
  )
}