// lib/catalog.ts
//
// A fixed list, not free text -- category filtering only means something
// if listings actually share values, matching the CHECK constraint on
// records.category in schema.sql.
export const CATALOG_CATEGORIES = [
  'Furniture',
  'Clothing',
  'Electronics',
  'Household',
  'Food',
  'Tools',
  'Kids & Baby',
  'Books & Media',
  'Other',
] as const

export type CatalogCategory = (typeof CATALOG_CATEGORIES)[number]
