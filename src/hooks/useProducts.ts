import { useState, useEffect, useCallback } from 'react'
import type { Product, CreateProductDTO, UpdateProductDTO } from '../types'
import { productService } from '../services'

interface UseProductsState {
  products: Product[]
  loading: boolean
  error: string | null
}

interface UseProductsReturn extends UseProductsState {
  refetch: () => Promise<void>
  createProduct: (dto: CreateProductDTO) => Promise<Product>
  updateProduct: (id: string, dto: UpdateProductDTO) => Promise<Product>
  submitForReview: (id: string) => Promise<Product>
  publish: (id: string) => Promise<Product>
  archive: (id: string) => Promise<Product>
}

export const useProducts = (): UseProductsReturn => {
  const [productState, setProductState] = useState<UseProductsState>({
    products: [],
    loading: false,
    error: null,
  })

  const fetchProducts = useCallback(async (): Promise<void> => {
    setProductState(prev => ({ ...prev, loading: true, error: null }))
    try {
      const products = await productService.find()
      setProductState(prev => ({ ...prev, products, loading: false }))
    } catch (e) {
      const message = e instanceof Error ? e.message : 'Failed to fetch products'
      setProductState(prev => ({ ...prev, error: message, loading: false }))
    }
  }, [])

  useEffect(() => {
    fetchProducts()
  }, [fetchProducts])

  const createProduct = useCallback(async (dto: CreateProductDTO): Promise<Product> => {
    const newProduct = await productService.create(dto)
    setProductState(prev => ({ ...prev, products: [...prev.products, newProduct] }))
    return newProduct
  }, [])

  const updateProduct = useCallback(async (id: string, dto: UpdateProductDTO): Promise<Product> => {
    const updated = await productService.update(id, dto)
    setProductState(prev => ({
      ...prev,
      products: prev.products.map(p => p.id === id ? updated : p),
    }))
    return updated
  }, [])

  const submitForReview = useCallback(async (id: string): Promise<Product> => {
    const updated = await productService.submitForReview(id)
    setProductState(prev => ({
      ...prev,
      products: prev.products.map(p => p.id === id ? updated : p),
    }))
    return updated
  }, [])

  const publish = useCallback(async (id: string): Promise<Product> => {
    const updated = await productService.publish(id)
    setProductState(prev => ({
      ...prev,
      products: prev.products.map(p => p.id === id ? updated : p),
    }))
    return updated
  }, [])

  const archive = useCallback(async (id: string): Promise<Product> => {
    const updated = await productService.archive(id)
    setProductState(prev => ({
      ...prev,
      products: prev.products.map(p => p.id === id ? updated : p),
    }))
    return updated
  }, [])

  return {
    ...productState,
    refetch: fetchProducts,
    createProduct,
    updateProduct,
    submitForReview,
    publish,
    archive,
  }
}