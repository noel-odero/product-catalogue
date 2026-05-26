import { useLocation } from 'react-router-dom'

const pageTitles: Record<string, string> = {
  '/': 'Dashboard',
  '/products': 'Products',
  '/products/new': 'New product',
  '/assets': 'Asset library',
  '/review': 'Review queue',
}

export default function Topbar() {
  const { pathname } = useLocation()

  const title = pageTitles[pathname] ?? 'Product Catalogue'

  return (
    <header className="h-13 border-b border-border flex items-center px-6 gap-4 bg-base">
      <span className="flex-1 text-sm font-medium text-content-primary">{title}</span>
      <div className="flex items-center gap-2 bg-elevated border border-border rounded-md px-3 py-1.5">
        <i className="ti ti-search text-muted text-sm" aria-hidden="true" />
        <span className="text-xs text-muted">Search...</span>
      </div>
      <button className="w-7 h-7 bg-elevated border border-border rounded-md flex items-center justify-center">
        <i className="ti ti-bell text-muted text-sm" aria-hidden="true" />
      </button>
    </header>
  )
}