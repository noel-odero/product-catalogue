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

export interface CreateVariantDTO {
  productId: string
  name: string
  variantCode: string
  colour: string
  size: string
  material: string
  barcode?: string
}

export interface UpdateVariantDTO extends Partial<CreateVariantDTO> {}