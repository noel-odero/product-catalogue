export type ProductStatus = 'DRAFT' | 'IN_REVIEW' | 'PUBLISHED' | 'ARCHIVED'

export type ReadinessStatus = 'INCOMPLETE' | 'PARTIAL' | 'READY'

export interface Product {
  id: string
  name: string
  productCode: string
  description: string
  brand: string
  category: string
  targetMarket: string
  season: string
  status: ProductStatus
  readiness: ReadinessStatus
  thumbnailUrl: string
  createdAt: string
  updatedAt: string
}

export interface CreateProductDTO {
  name: string
  productCode: string
  description: string
  brand: string
  category: string
  targetMarket: string
  season: string
}

export interface UpdateProductDTO extends Partial<CreateProductDTO> {
  status?: ProductStatus
}