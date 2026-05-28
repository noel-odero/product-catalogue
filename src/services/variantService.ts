import type { Variant, CreateVariantDTO, UpdateVariantDTO } from '../types'
import { mockVariants } from '../data'

const delay = (ms: number) => new Promise(res => setTimeout(res, ms))

let variants: Variant[] = [...mockVariants]

export const variantService = {
  async findByProductId(productId: string): Promise<Variant[]> {
    await delay(300)
    return variants.filter(v => v.productId === productId)
  },

  async findById(id: string): Promise<Variant> {
    await delay(300)
    const variant = variants.find(v => v.id === id)
    if (!variant) throw new Error(`Variant with id ${id} not found`)
    return variant
  },

  async create(dto: CreateVariantDTO): Promise<Variant> {
    await delay(500)
    const newVariant: Variant = {
      ...dto,
      id: `var-${String(variants.length + 1).padStart(3, '0')}`,
      createdAt: new Date().toISOString(),
    }
    variants = [...variants, newVariant]
    return newVariant
  },

  async update(id: string, dto: UpdateVariantDTO): Promise<Variant> {
    await delay(500)
    const index = variants.findIndex(v => v.id === id)
    if (index === -1) throw new Error(`Variant with id ${id} not found`)
    const updated: Variant = {
      ...variants[index],
      ...dto,
    }
    variants = variants.map(v => v.id === id ? updated : v)
    return updated
  },

  async delete(id: string): Promise<void> {
    await delay(400)
    const exists = variants.some(v => v.id === id)
    if (!exists) throw new Error(`Variant with id ${id} not found`)
    variants = variants.filter(v => v.id !== id)
  },
}