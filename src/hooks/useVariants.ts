import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import type { Variant, CreateVariantDTO, UpdateVariantDTO } from '../types'
import { variantService } from '../services'

interface UseVariantsOptions {
  productId: string
  fetch?: boolean
}

export function useVariants({ productId, fetch = true }: UseVariantsOptions) {
  const queryClient = useQueryClient()
  const variantsKey = ['variants', productId] as const

  const { data: variants = [], isLoading: loading, error } = useQuery<Variant[]>({
    queryKey: variantsKey,
    queryFn: () => variantService.findByProductId(productId),
    enabled: fetch && !!productId,
  })

  const updateCache = (updated: Variant) => {
    queryClient.setQueryData<Variant[]>(variantsKey, prev =>
      prev ? prev.map(v => v.id === updated.id ? updated : v) : [updated]
    )
  }

  const { mutateAsync: createVariant } = useMutation<Variant, Error, CreateVariantDTO>({
    mutationFn: (dto: CreateVariantDTO) => variantService.create(dto),
    onSuccess: (newVariant) => {
      queryClient.setQueryData<Variant[]>(variantsKey, prev =>
        prev ? [...prev, newVariant] : [newVariant]
      )
    },
  })

  const { mutateAsync: updateVariant } = useMutation<Variant, Error, { id: string; dto: UpdateVariantDTO }>({
    mutationFn: ({ id, dto }) => variantService.update(id, dto),
    onSuccess: updateCache,
  })

  const { mutateAsync: deleteVariant } = useMutation<void, Error, string>({
    mutationFn: (id: string) => variantService.delete(id),
    onSuccess: (_, id) => {
      queryClient.setQueryData<Variant[]>(variantsKey, prev =>
        prev ? prev.filter(v => v.id !== id) : []
      )
    },
  })

  return {
    variants,
    loading,
    error: error instanceof Error ? error.message : null,
    refetch: () => queryClient.invalidateQueries({ queryKey: variantsKey }),
    createVariant,
    updateVariant: (id: string, dto: UpdateVariantDTO) => updateVariant({ id, dto }),
    deleteVariant,
  }
}