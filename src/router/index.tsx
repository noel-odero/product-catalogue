import { lazy } from 'react'
import { createBrowserRouter, type RouteObject } from 'react-router-dom'
import { ErrorBoundary } from '../components/shared'

const AppShell = lazy(() => import('../components/layout/AppShell'))
const DashboardPage = lazy(() => import('../features/dashboard/DashboardPage'))
const ProductListPage = lazy(() => import('../features/products/pages/ProductListPage'))
const CreateProductPage = lazy(() => import('../features/products/pages/CreateProductPage'))
const ProductDetailPage = lazy(() => import('../features/products/pages/ProductDetailPage'))
const EditProductPage = lazy(() => import('../features/products/pages/EditProductPage'))
const AssetLibraryPage = lazy(() => import('../features/assets/pages/AssetLibraryPage'))
const AssetDetailPage = lazy(() => import('../features/assets/pages/AssetDetailPage'))
const ReviewQueuePage = lazy(() => import('../features/assets/pages/ReviewQueuePage'))
const NotFoundPage = lazy(() => import('../features/NotFoundPage'))

const withErrorBoundary = (element: React.ReactNode) => (
  <ErrorBoundary>{element}</ErrorBoundary>
)

const childRoutes: RouteObject[] = [
  { index: true, element: <DashboardPage /> },
  { path: 'products', element: <ProductListPage /> },
  { path: 'products/new', element: <CreateProductPage /> },
  { path: 'products/:id', element: <ProductDetailPage /> },
  { path: 'products/:id/edit', element: <EditProductPage /> },
  { path: 'assets', element: <AssetLibraryPage /> },
  { path: 'assets/:id', element: <AssetDetailPage /> },
  { path: 'review', element: <ReviewQueuePage /> },
]

const wrappedRoutes = childRoutes.map(route => ({
  ...route,
  element: withErrorBoundary(route.element),
}))

export const router = createBrowserRouter([
  {
    path: '/',
    element: withErrorBoundary(<AppShell />),
    children: wrappedRoutes,
  },
  {
    path: '*',
    element: <NotFoundPage />,
  },
])