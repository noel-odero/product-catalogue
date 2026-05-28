// server
export interface Variant {
  id: string
  productId: string
  name: string
  variantCode: string
  colour: string
  size: string
  material: string
  barcode?: string
  createdAt: string
}

// user
export type CreateVariantDTO = Omit<Variant, 'id' | 'createdAt'>


export interface UpdateVariantDTO extends Partial<CreateVariantDTO> {}