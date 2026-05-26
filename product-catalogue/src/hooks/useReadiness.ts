import { useState, useEffect, useCallback } from 'react'
import type { ProductReadiness } from '../types'
import { readinessService } from '../services'

interface UseReadinessState {
  readiness: ProductReadiness | null
  loading: boolean
  error: string | null
}

interface UseReadinessReturn extends UseReadinessState {
  refetch: () => Promise<void>
}

export const useReadiness = (productId: string): UseReadinessReturn => {
  const [state, setState] = useState<UseReadinessState>({
    readiness: null,
    loading: false,
    error: null,
  })

  const fetchReadiness = useCallback(async (): Promise<void> => {
    setState(prev => ({ ...prev, loading: true, error: null }))
    try {
      const readiness = await readinessService.findByProductId(productId)
      setState(prev => ({ ...prev, readiness, loading: false }))
    } catch (e) {
      const message = e instanceof Error ? e.message : 'Failed to fetch readiness'
      setState(prev => ({ ...prev, error: message, loading: false }))
    }
  }, [productId])

  useEffect(() => {
    fetchReadiness()
  }, [fetchReadiness])

  return {
    ...state,
    refetch: fetchReadiness,
  }
}