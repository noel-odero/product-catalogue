import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import type { Asset, CreateAssetDTO } from '../types'
import { assetService } from '../services'

interface UseAssetsOptions {
  productId?: string
  fetch?: boolean
}

export function useAssets({ productId, fetch = true }: UseAssetsOptions = {}) {
  const queryClient = useQueryClient()
  const assetsKey = productId ? ['assets', productId] : ['assets']

  const { data: assets = [], isLoading: loading, error } = useQuery({
    queryKey: assetsKey,
    queryFn: () => productId
      ? assetService.findByProductId(productId)
      : assetService.find(),
    enabled: fetch,
  })

  const updateCache = (updated: Asset) => {
    queryClient.setQueryData<Asset[]>(assetsKey, prev =>
      prev ? prev.map(a => a.id === updated.id ? updated : a) : [updated]
    )
  }

  const { mutateAsync: uploadAsset } = useMutation({
    mutationFn: (dto: CreateAssetDTO) => assetService.upload(dto),
    onSuccess: (newAsset) => {
      queryClient.setQueryData<Asset[]>(assetsKey, prev =>
        prev ? [...prev, newAsset] : [newAsset]
      )
    },
  })

  const { mutateAsync: approveAsset } = useMutation({
    mutationFn: (id: string) => assetService.approve(id),
    onSuccess: updateCache,
  })

  const { mutateAsync: rejectAsset } = useMutation({
    mutationFn: ({ id, reason }: { id: string; reason: string }) =>
      assetService.reject(id, reason),
    onSuccess: updateCache,
  })

  return {
    assets,
    loading,
    error: error instanceof Error ? error.message : null,
    refetch: () => queryClient.invalidateQueries({ queryKey: assetsKey }),
    uploadAsset,
    approveAsset,
    rejectAsset: (id: string, reason: string) => rejectAsset({ id, reason }),
  }
}