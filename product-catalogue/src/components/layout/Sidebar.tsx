import { NavLink, useNavigate } from 'react-router-dom'
import { cn } from '../../lib/utils'

interface NavItem {
  label: string
  path: string
  icon: string
  badge?: number
}

const navItems: NavItem[] = [
  { label: 'Dashboard', path: '/', icon: 'ti-layout-dashboard' },
  { label: 'Products', path: '/products', icon: 'ti-box' },
  { label: 'Asset library', path: '/assets', icon: 'ti-photo' },
  { label: 'Review queue', path: '/review', icon: 'ti-eye-check', badge: 7 },
]

export default function Sidebar() {
  const navigate = useNavigate()

  return (
    <aside className="w-56 min-w-56 h-screen bg-base border-r border-border flex flex-col py-5">
      <div className="px-4 pb-6 border-b border-border mb-4 flex items-center gap-2">
        <div className="w-7 h-7 bg-white rounded-md flex items-center justify-center">
          <span className="text-base text-xs font-medium">PC</span>
        </div>
        <span className="text-content-primary text-sm font-medium">Product Catalogue</span>
      </div>

      <nav className="flex-1 px-2">
        <p className="text-xs text-muted px-2 mb-2 tracking-wide uppercase">Menu</p>
        {navItems.map(item => (
          <NavLink
            key={item.path}
            to={item.path}
            end={item.path === '/'}
            className={({ isActive }) => cn(
              'flex items-center gap-2 px-3 py-2 rounded-md text-sm mb-1 transition-colors',
              isActive
                ? 'bg-elevated text-content-primary'
                : 'text-content-tertiary hover:text-content-secondary hover:bg-elevated',
            )}
          >
            <i className={`ti ${item.icon} text-base`} aria-hidden="true" />
            <span className="flex-1">{item.label}</span>
            {item.badge && (
              <span className="text-xs bg-elevated text-content-tertiary px-2 py-0.5 rounded-full border border-border">
                {item.badge}
              </span>
            )}
          </NavLink>
        ))}
      </nav>

      <div className="px-2 mt-auto border-t border-border pt-4">
        <button
          onClick={() => navigate('/products/new')}
          className="w-full bg-white text-base text-xs font-medium py-2 rounded-md hover:bg-gray-100 transition-colors"
        >
          + New product
        </button>
        <div className="flex items-center gap-2 px-3 py-2 mt-2">
          <div className="w-7 h-7 rounded-full bg-elevated border border-border flex items-center justify-center text-xs text-content-secondary">
            NO
          </div>
          <span className="text-xs text-content-tertiary">Noel O.</span>
        </div>
      </div>
    </aside>
  )
}