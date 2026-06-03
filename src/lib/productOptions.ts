interface SelectOption {
  value: string
  label: string
}

export const brandOptions: SelectOption[] = [
  { value: 'Heritage', label: 'Heritage' },
  { value: 'Essentials', label: 'Essentials' },
  { value: 'Accessories', label: 'Accessories' },
  { value: 'Footwear', label: 'Footwear' },
]

export const categoryOptions: SelectOption[] = [
  { value: 'Outerwear', label: 'Outerwear' },
  { value: 'Tops', label: 'Tops' },
  { value: 'Bottoms', label: 'Bottoms' },
  { value: 'Bags', label: 'Bags' },
  { value: 'Shoes', label: 'Shoes' },
]

export const targetMarketOptions: SelectOption[] = [
  { value: 'Men', label: 'Men' },
  { value: 'Women', label: 'Women' },
  { value: 'Unisex', label: 'Unisex' },
  { value: 'Kids', label: 'Kids' },
]

export const seasonOptions: SelectOption[] = [
  { value: 'SS24', label: 'SS24' },
  { value: 'AW24', label: 'AW24' },
  { value: 'SS25', label: 'SS25' },
  { value: 'AW25', label: 'AW25' },
]

export const statusOptions: SelectOption[] = [
  { value: 'DRAFT', label: 'Draft' },
  { value: 'IN_REVIEW', label: 'In review' },
  { value: 'PUBLISHED', label: 'Published' },
  { value: 'ARCHIVED', label: 'Archived' },
]

export const readinessOptions: SelectOption[] = [
  { value: 'INCOMPLETE', label: 'Incomplete' },
  { value: 'PARTIAL', label: 'Partial' },
  { value: 'READY', label: 'Ready' },
]