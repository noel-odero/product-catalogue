import type { Product, CreateProductDTO, UpdateProductDTO } from '../types'
import { mockProducts } from '../data'

const delay = (ms: number) => new Promise(res => setTimeout(res, ms))

let products: Product[] = [...mockProducts]

export const productService = {
  async find(): Promise<Product[]> {
    await delay(500)
    return products
  },

  async findById(id: string): Promise<Product> {
    await delay(300)
    const product = products.find(p => p.id === id)
    if (!product) throw new Error(`Product with id ${id} not found`)
    return product
  },

  async create(dto: CreateProductDTO): Promise<Product> {
    await delay(600)
    const newProduct: Product = {
      ...dto,
      id: `prod-${String(products.length + 1).padStart(3, '0')}`,
      status: 'DRAFT',
      readiness: 'INCOMPLETE',
      thumbnailUrl: 'https://images.unsplash.com/photo-1523381294911-8d3cead13475?w=400&q=80',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }
    products = [...products, newProduct]
    return newProduct
  },

  async update(id: string, dto: UpdateProductDTO): Promise<Product> {
    await delay(500)
    const index = products.findIndex(p => p.id === id)
    if (index === -1) throw new Error(`Product with id ${id} not found`)
    const updated: Product = {
      ...products[index],
      ...dto,
      updatedAt: new Date().toISOString(),
    }
    products = products.map(p => p.id === id ? updated : p)
    return updated
  },

  async submitForReview(id: string): Promise<Product> {
    await delay(400)
    return productService.update(id, { status: 'IN_REVIEW' })
  },

  async publish(id: string): Promise<Product> {
    await delay(400)
    return productService.update(id, { status: 'PUBLISHED' })
  },

  async archive(id: string): Promise<Product> {
    await delay(400)
    return productService.update(id, { status: 'ARCHIVED' })
  },
}