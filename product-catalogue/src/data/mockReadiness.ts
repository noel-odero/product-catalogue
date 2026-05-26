import type { ProductReadiness } from '../types'

export const mockReadiness: ProductReadiness[] = [
  {
    productId: 'prod-001',
    checks: [
      { id: 'check-1', label: 'Product info complete', passed: true },
      { id: 'check-2', label: 'At least one variant added', passed: true },
      { id: 'check-3', label: 'Hero image approved', passed: true },
      { id: 'check-4', label: 'All variants have assets', passed: true },
      { id: 'check-5', label: 'No rejected assets pending', passed: true },
    ],
    passedCount: 5,
    totalCount: 5,
    canPublish: true,
  },
  {
    productId: 'prod-002',
    checks: [
      { id: 'check-1', label: 'Product info complete', passed: true },
      { id: 'check-2', label: 'At least one variant added', passed: true },
      { id: 'check-3', label: 'Hero image approved', passed: false },
      { id: 'check-4', label: 'All variants have assets', passed: false },
      { id: 'check-5', label: 'No rejected assets pending', passed: false },
    ],
    passedCount: 2,
    totalCount: 5,
    canPublish: false,
  },
  {
    productId: 'prod-003',
    checks: [
      { id: 'check-1', label: 'Product info complete', passed: true },
      { id: 'check-2', label: 'At least one variant added', passed: true },
      { id: 'check-3', label: 'Hero image approved', passed: false },
      { id: 'check-4', label: 'All variants have assets', passed: false },
      { id: 'check-5', label: 'No rejected assets pending', passed: true },
    ],
    passedCount: 3,
    totalCount: 5,
    canPublish: false,
  },
  {
    productId: 'prod-004',
    checks: [
      { id: 'check-1', label: 'Product info complete', passed: true },
      { id: 'check-2', label: 'At least one variant added', passed: true },
      { id: 'check-3', label: 'Hero image approved', passed: true },
      { id: 'check-4', label: 'All variants have assets', passed: true },
      { id: 'check-5', label: 'No rejected assets pending', passed: true },
    ],
    passedCount: 5,
    totalCount: 5,
    canPublish: true,
  },
  {
    productId: 'prod-005',
    checks: [
      { id: 'check-1', label: 'Product info complete', passed: true },
      { id: 'check-2', label: 'At least one variant added', passed: false },
      { id: 'check-3', label: 'Hero image approved', passed: false },
      { id: 'check-4', label: 'All variants have assets', passed: false },
      { id: 'check-5', label: 'No rejected assets pending', passed: true },
    ],
    passedCount: 2,
    totalCount: 5,
    canPublish: false,
  },
  {
    productId: 'prod-006',
    checks: [
      { id: 'check-1', label: 'Product info complete', passed: true },
      { id: 'check-2', label: 'At least one variant added', passed: true },
      { id: 'check-3', label: 'Hero image approved', passed: false },
      { id: 'check-4', label: 'All variants have assets', passed: false },
      { id: 'check-5', label: 'No rejected assets pending', passed: false },
    ],
    passedCount: 2,
    totalCount: 5,
    canPublish: false,
  },
]