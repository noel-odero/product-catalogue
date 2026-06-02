import { Component, type ReactNode } from 'react'

interface ErrorBoundaryProps {
  children: ReactNode
  fallback?: ReactNode
}

interface ErrorBoundaryState {
  hasError: boolean
  error: Error | null
}

//an error boundary is a react component that catches rendering errors in its child tree and replaces that subtree with a fallback UI

export default class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props)
    this.state = { hasError: false, error: null }
  }

//   info about an error that happens in your component - pure function
  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error }
  }

//   info about error and error stack - perfom side effects 
  componentDidCatch(error: Error, info: React.ErrorInfo) {
    console.error('Error:', error.message);
    console.error("Component Stack:", info.componentStack);
  }

  render() {
    if (this.state.hasError) {
        // fallback - customise the error message
      return this.props.fallback ?? (
        <div className="flex flex-col items-center justify-center h-screen bg-base gap-4">
          <div className="w-12 h-12 bg-surface border border-border rounded-xl flex items-center justify-center mb-2">
            <i className="ti ti-alert-triangle text-xl text-status-rejected-text" aria-hidden="true" />
          </div>
          <h1 className="text-sm font-medium text-content-primary">
            Something went wrong
          </h1>
          <p className="text-xs text-content-tertiary text-center max-w-xs">
            {this.state.error?.message ?? 'An unexpected error occurred'}
          </p>
          <div className="flex items-center gap-3">
            <button
              onClick={() => this.setState({ hasError: false, error: null })}
              className="text-xs border border-border text-content-secondary px-4 py-2 rounded-md hover:bg-elevated transition-colors"
            >
              Try again
            </button>
            <button
              onClick={() => window.location.href = '/'} //hard navigate to dashboard. no hooks
              className="text-xs bg-white text-base px-4 py-2 rounded-md hover:bg-gray-100 transition-colors"
            >
              Go to dashboard
            </button>
          </div>
        </div>
      )
    }
    return this.props.children
  }
}