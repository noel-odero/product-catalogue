export type ProductStatus = 
  | 'DRAFT' 
  | 'IN_REVIEW' 
  | 'READY_TO_PUBLISH'
  | 'PUBLISHED' 
  | 'ARCHIVED'

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

export type CreateProductDTO = Omit<Product, 'id' | 'status' | 'readiness' | 'thumbnailUrl' | 'createdAt' | 'updatedAt'>


export interface UpdateProductDTO extends Partial<CreateProductDTO> {
  status?: ProductStatus
}