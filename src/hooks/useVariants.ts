import { useState, useEffect, useCallback } from 'react'
import type { Variant, CreateVariantDTO, UpdateVariantDTO } from '../types'
import { variantService } from '../services'

interface UseVariantsState {
  variants: Variant[]
  loading: boolean
  error: string | null
}

interface UseVariantsReturn extends UseVariantsState {
  refetch: () => Promise<void>
  createVariant: (dto: CreateVariantDTO) => Promise<Variant>
  updateVariant: (id: string, dto: UpdateVariantDTO) => Promise<Variant>
  deleteVariant: (id: string) => Promise<void>
}

export const useVariants = (productId: string): UseVariantsReturn => {
  const [state, setState] = useState<UseVariantsState>({
    variants: [],
    loading: false,
    error: null,
  })

  const fetchVariants = useCallback(async (): Promise<void> => {
    setState(prev => ({ ...prev, loading: true, error: null }))
    try {
      const variants = await variantService.findByProductId(productId)
      setState(prev => ({ ...prev, variants, loading: false }))
    } catch (e) {
      const message = e instanceof Error ? e.message : 'Failed to fetch variants'
      setState(prev => ({ ...prev, error: message, loading: false }))
    }
  }, [productId])

  useEffect(() => {
    fetchVariants()
  }, [fetchVariants])

  const createVariant = useCallback(async (dto: CreateVariantDTO): Promise<Variant> => {
    const newVariant = await variantService.create(dto)
    setState(prev => ({ ...prev, variants: [...prev.variants, newVariant] }))
    return newVariant
  }, [])

  const updateVariant = useCallback(async (id: string, dto: UpdateVariantDTO): Promise<Variant> => {
    const updated = await variantService.update(id, dto)
    setState(prev => ({
      ...prev,
      variants: prev.variants.map(v => v.id === id ? updated : v),
    }))
    return updated
  }, [])

  const deleteVariant = useCallback(async (id: string): Promise<void> => {
    await variantService.delete(id)
    setState(prev => ({
      ...prev,
      variants: prev.variants.filter(v => v.id !== id),
    }))
  }, [])

  return {
    ...state,
    refetch: fetchVariants,
    createVariant,
    updateVariant,
    deleteVariant,
  }
}