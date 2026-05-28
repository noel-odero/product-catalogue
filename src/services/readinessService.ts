import type { ProductReadiness } from '../types'
import { mockReadiness } from '../data'

const delay = (ms: number) => new Promise(res => setTimeout(res, ms))

let readiness: ProductReadiness[] = [...mockReadiness]

export const readinessService = {
  async findByProductId(productId: string): Promise<ProductReadiness> {
    await delay(300)
    const productReadiness = readiness.find(r => r.productId === productId)
    if (!productReadiness) throw new Error(`Readiness for product ${productId} not found`)
    return productReadiness
  },

  async find(): Promise<ProductReadiness[]> {
    await delay(300)
    return readiness
  },
}