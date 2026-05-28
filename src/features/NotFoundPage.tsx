import { useNavigate } from 'react-router-dom'
import Button from '../components/ui/Button'

export default function NotFoundPage() {
  const navigate = useNavigate()

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-base gap-4">
      <div className="w-12 h-12 bg-surface border border-border rounded-xl flex items-center justify-center mb-2">
        <i className="ti ti-error-404 text-xl text-muted" aria-hidden="true" />
      </div>
      <h1 className="text-base font-medium text-content-primary">Page not found</h1>
      <p className="text-xs text-content-tertiary">
        The page you are looking for does not exist.
      </p>
      <div className="flex items-center gap-3">
        <Button variant="ghost" onClick={() => navigate(-1)}>
          Go back
        </Button>
        <Button onClick={() => navigate('/')}>
          Dashboard
        </Button>
      </div>
    </div>
  )
}