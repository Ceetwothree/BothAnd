// lib/catalog.ts
//
// Org-defined Catalog taxonomy -- replaces the old flat, hardcoded
// 9-value category list. See INVENTORY_MODEL.md for the full design.
//
// Layered adoption: an org picks from a handful of sector presets at
// setup (each seeds a real category -> subcategory tree into its own
// catalog_categories rows); a category with no subcategories (Kits,
// School supplies, First aid) is just the one-level case of the same
// structure. "Other" is deliberately not a real row -- a NULL
// category_id on a record already means "uncategorized," so an org that
// doesn't want to think about taxonomy at all is never blocked from
// just starting.
//
// This is real content, not a placeholder: names are generic ("Men's
// clothing," not a brand), drawn from the cross-section research in
// INVENTORY_MODEL.md (food banks, diaper banks, clothing closets,
// disaster relief, PATH's own hard-won list) -- a dozen or so top-level
// categories was the actual finding, not an open-ended taxonomy problem.
import { supabase } from './supabase'

export interface SectorPreset {
  key: string
  label: string
  description: string
  subcategories: string[]
}

export const SECTOR_PRESETS: SectorPreset[] = [
  {
    key: 'food',
    label: 'Food',
    description: 'Perishable, non-perishable, beverages',
    subcategories: ['Perishable', 'Non-perishable', 'Beverages'],
  },
  {
    key: 'clothing',
    label: 'Clothing',
    description: "Men's, women's, children's, and more -- PATH's own hardest category to normalize",
    subcategories: [
      "Men's clothing",
      "Women's clothing",
      "Children's clothing",
      'Outerwear',
      'Shoes',
      'Undergarments & socks',
    ],
  },
  {
    key: 'hygiene',
    label: 'Hygiene products',
    description: 'Personal care, menstrual hygiene, baby & diaper',
    subcategories: ['Personal care', 'Menstrual hygiene', 'Baby & diaper'],
  },
  {
    key: 'cleaning',
    label: 'Cleaning products',
    description: 'Laundry and household cleaners',
    subcategories: ['Laundry', 'Household cleaners'],
  },
  {
    key: 'housewares',
    label: 'Housewares & kitchenware',
    description: 'General household goods and kitchen items',
    subcategories: ['Housewares', 'Kitchenware'],
  },
  {
    key: 'bedding',
    label: 'Bedding & linens',
    description: 'Bedding, towels, and linens',
    subcategories: ['Bedding', 'Towels & linens'],
  },
  {
    key: 'school',
    label: 'School supplies',
    description: '',
    subcategories: [],
  },
  {
    key: 'first_aid',
    label: 'First aid & medical',
    description: '',
    subcategories: [],
  },
  {
    key: 'kits',
    label: 'Kits',
    description: 'Welcome-home, outreach, or care kits -- contents vary too much to standardize further',
    subcategories: [],
  },
  {
    key: 'general_reuse',
    label: 'General household & reuse',
    description: 'Furniture, electronics, toys, books & media -- for general community reuse, not essential-needs distribution',
    subcategories: ['Furniture', 'Electronics', 'Toys', 'Books & media'],
  },
]

export interface CatalogCategory {
  id: string
  org_id: string
  parent_id: string | null
  name: string
  sector_key: string | null
}

export async function listCatalogCategories(orgId: string): Promise<CatalogCategory[]> {
  const { data, error } = await supabase
    .from('catalog_categories')
    .select('id, org_id, parent_id, name, sector_key')
    .eq('org_id', orgId)
    .order('name')

  if (error) throw error
  return (data ?? []) as CatalogCategory[]
}

// Which sector presets are currently active for an org, derived from its
// own category rows rather than tracked separately -- a sector "is on"
// exactly when its rows exist, there's no other state to get out of sync.
export function enabledSectorKeys(categories: CatalogCategory[]): Set<string> {
  return new Set(categories.filter((c) => c.sector_key).map((c) => c.sector_key as string))
}

export async function enableSectorPreset(orgId: string, sector: SectorPreset): Promise<void> {
  const { data: parent, error: parentError } = await supabase
    .from('catalog_categories')
    .insert({ org_id: orgId, parent_id: null, name: sector.label, sector_key: sector.key })
    .select('id')
    .single()

  if (parentError) throw parentError

  if (sector.subcategories.length > 0) {
    const rows = sector.subcategories.map((name) => ({
      org_id: orgId,
      parent_id: parent.id,
      name,
      sector_key: sector.key,
    }))
    const { error: subError } = await supabase.from('catalog_categories').insert(rows)
    if (subError) throw subError
  }
}

// Deletes every row (category and its subcategories) this sector seeded.
// Any item already filed under one of those categories falls back to
// "Other" automatically (records.category_id ON DELETE SET NULL) rather
// than blocking the sector from being turned off.
export async function disableSectorPreset(orgId: string, sectorKey: string): Promise<void> {
  const { error } = await supabase
    .from('catalog_categories')
    .delete()
    .eq('org_id', orgId)
    .eq('sector_key', sectorKey)

  if (error) throw error
}
