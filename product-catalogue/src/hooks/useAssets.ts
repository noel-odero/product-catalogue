import { useState, useEffect, useCallback } from 'react'
import type { Asset, CreateAssetDTO } from '../types'
import { assetService } from '../services'

interface UseAssetsState {
  assets: Asset[]
  loading: boolean
  error: string | null
}

interface UseAssetsReturn extends UseAssetsState {
  refetch: () => Promise<void>
  uploadAsset: (dto: CreateAssetDTO) => Promise<Asset>
  approveAsset: (id: string) => Promise<Asset>
  rejectAsset: (id: string, reason: string) => Promise<Asset>
}

export const useAssets = (productId?: string): UseAssetsReturn => {
  const [state, setState] = useState<UseAssetsState>({
    assets: [],
    loading: false,
    error: null,
  })

  const fetchAssets = useCallback(async (): Promise<void> => {
    setState(prev => ({ ...prev, loading: true, error: null }))
    try {
      const assets = productId
        ? await assetService.findByProductId(productId)
        : await assetService.find()
      setState(prev => ({ ...prev, assets, loading: false }))
    } catch (e) {
      const message = e instanceof Error ? e.message : 'Failed to fetch assets'
      setState(prev => ({ ...prev, error: message, loading: false }))
    }
  }, [productId])

  useEffect(() => {
    fetchAssets()
  }, [fetchAssets])

  const uploadAsset = useCallback(async (dto: CreateAssetDTO): Promise<Asset> => {
    const newAsset = await assetService.upload(dto)
    setState(prev => ({ ...prev, assets: [...prev.assets, newAsset] }))
    return newAsset
  }, [])

  const approveAsset = useCallback(async (id: string): Promise<Asset> => {
    const updated = await assetService.approve(id)
    setState(prev => ({
      ...prev,
      assets: prev.assets.map(a => a.id === id ? updated : a),
    }))
    return updated
  }, [])

  const rejectAsset = useCallback(async (id: string, reason: string): Promise<Asset> => {
    const updated = await assetService.reject(id, reason)
    setState(prev => ({
      ...prev,
      assets: prev.assets.map(a => a.id === id ? updated : a),
    }))
    return updated
  }, [])

  return {
    ...state,
    refetch: fetchAssets,
    uploadAsset,
    approveAsset,
    rejectAsset,
  }
}