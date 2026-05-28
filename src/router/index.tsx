import { createBrowserRouter } from 'react-router-dom'
import AppShell from '../components/layout/AppShell'
import DashboardPage from '../features/dashboard/DashboardPage'
import ProductListPage from '../features/products/pages/ProductListPage'
import ProductDetailPage from '../features/products/pages/ProductDetailPage'
import CreateProductPage from '../features/products/pages/CreateProductPage'
import EditProductPage from '../features/products/pages/EditProductPage'
import AssetLibraryPage from '../features/assets/pages/AssetLibraryPage'
import AssetDetailPage from '../features/assets/pages/AssetDetailPage'
import ReviewQueuePage from '../features/assets/pages/ReviewQueuePage'
import NotFoundPage from '../features/NotFoundPage'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <AppShell />,
    children: [
      { index: true, element: <DashboardPage /> },
      { path: 'products', element: <ProductListPage /> },
      { path: 'products/new', element: <CreateProductPage /> },
      { path: 'products/:id', element: <ProductDetailPage /> },
      { path: 'products/:id/edit', element: <EditProductPage /> },
      { path: 'assets', element: <AssetLibraryPage /> },
      { path: 'assets/:id', element: <AssetDetailPage /> },
      { path: 'review', element: <ReviewQueuePage /> },
    ],
  },
  {
    path: "*",
    element: <NotFoundPage/>,
  }
])