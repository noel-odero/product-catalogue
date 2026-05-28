import { useState, useEffect, useCallback } from 'react'
import type { Asset, CreateAssetDTO } from '../types'
import { assetService } from '../services'

// state interface
interface UseAssetsState {
  assets: Asset[]
  loading: boolean
  error: string | null
}

// return interface
interface UseAssetsReturn extends UseAssetsState {
  refetch: () => Promise<void>
  uploadAsset: (dto: CreateAssetDTO) => Promise<Asset>
  approveAsset: (id: string) => Promise<Asset>
  rejectAsset: (id: string, reason: string) => Promise<Asset>
}

export const useAssets = (productId?: string): UseAssetsReturn => {
  const [asset, setAsset] = useState<UseAssetsState>({
    assets: [],
    loading: false,
    error: null,
  })

  // fetch assets
  const fetchAssets = useCallback(async (): Promise<void> => {
    setAsset(prev => ({ ...prev, loading: true, error: null }))
    try {
      const assets = productId
        ? await assetService.findByProductId(productId)
        : await assetService.find()
      setAsset(prev => ({ ...prev, assets, loading: false }))
    } catch (e) {
      const message = e instanceof Error ? e.message : 'Failed to fetch assets'
      setAsset(prev => ({ ...prev, error: message, loading: false }))
    }
  }, [productId])

  useEffect(() => {
    fetchAssets()
  }, [fetchAssets])

  const uploadAsset = useCallback(async (dto: CreateAssetDTO): Promise<Asset> => {
    const newAsset = await assetService.upload(dto)
    setAsset(prev => ({ ...prev, assets: [...prev.assets, newAsset] }))
    return newAsset
  }, [])

  const approveAsset = useCallback(async (id: string): Promise<Asset> => {
    const updated = await assetService.approve(id)
    setAsset(prev => ({
      ...prev,
      assets: prev.assets.map(a => a.id === id ? updated : a),
    }))
    return updated
  }, [])

  const rejectAsset = useCallback(async (id: string, reason: string): Promise<Asset> => {
    const updated = await assetService.reject(id, reason)
    setAsset(prev => ({
      ...prev,
      assets: prev.assets.map(a => a.id === id ? updated : a),
    }))
    return updated
  }, [])

  return {
    ...asset,
    refetch: fetchAssets,
    uploadAsset,
    approveAsset,
    rejectAsset,
  }
}