import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import type { Product, CreateProductDTO, UpdateProductDTO } from '../types'
import { productService } from '../services'

const PRODUCTS_KEY = ['products'] as const

export function useProducts() {
  const queryClient = useQueryClient()

  const { data: products = [], isLoading: loading, error } = useQuery({
    queryKey: PRODUCTS_KEY,
    queryFn: () => productService.find(),
  })

  const updateCache = (updated: Product) => {
    queryClient.setQueryData<Product[]>(PRODUCTS_KEY, prev =>
      prev ? prev.map(p => p.id === updated.id ? updated : p) : [updated]
    )
  }

  const { mutateAsync: createProduct } = useMutation({
    mutationFn: (dto: CreateProductDTO) => productService.create(dto),
    onSuccess: (newProduct) => {
      queryClient.setQueryData<Product[]>(PRODUCTS_KEY, prev =>
        prev ? [...prev, newProduct] : [newProduct]
      )
    },
  })

  const { mutateAsync: updateProduct } = useMutation({
    mutationFn: ({ id, dto }: { id: string; dto: UpdateProductDTO }) =>
      productService.update(id, dto),
    onSuccess: updateCache,
  })

  const { mutateAsync: submitForReview } = useMutation({
    mutationFn: (id: string) => productService.submitForReview(id),
    onSuccess: updateCache,
  })

  const { mutateAsync: publish } = useMutation({
    mutationFn: (id: string) => productService.publish(id),
    onSuccess: updateCache,
  })

  const { mutateAsync: archive } = useMutation({
    mutationFn: (id: string) => productService.archive(id),
    onSuccess: updateCache,
  })

  return {
    products,
    loading,
    error: error instanceof Error ? error.message : null,
    refetch: () => queryClient.invalidateQueries({ queryKey: PRODUCTS_KEY }),
    createProduct,
    updateProduct: (id: string, dto: UpdateProductDTO) => updateProduct({ id, dto }),
    submitForReview,
    publish,
    archive,
  }
}
