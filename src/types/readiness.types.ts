export interface ReadinessCheck {
  id: string
  label: string
  passed: boolean
}

export interface ProductReadiness {
  productId: string
  checks: ReadinessCheck[]
  passedCount: number
  totalCount: number
  canPublish: boolean
}