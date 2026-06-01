import { useQuery } from '@tanstack/react-query'
import type { ProductReadiness } from '../types'
import { readinessService } from '../services'

interface UseReadinessOptions {
  productId: string
  fetch?: boolean
}

export function useReadiness({ productId, fetch = true }: UseReadinessOptions) {
  const readinessKey = ['readiness', productId] as const

  const { data: readiness = null, isLoading: loading, error } = useQuery<ProductReadiness | null>({
    queryKey: readinessKey,
    queryFn: () => readinessService.findByProductId(productId),
    enabled: fetch && !!productId,
  })

  return {
    readiness,
    loading,
    error: error instanceof Error ? error.message : null,
  }
}