// app/components/CatalogCategoriesSettings.tsx
// Admin-only sector-preset picker for Catalog's taxonomy -- see
// lib/catalog.ts and INVENTORY_MODEL.md. Each checkbox is a real,
// independent toggle: turning one on seeds that sector's category (and
// subcategories, if any) into this org's own catalog_categories rows;
// turning it off removes exactly those rows again. No sector selected is
// a perfectly fine state -- Catalog still works, everything just files
// under "Other."
'use client'

import { useEffect, useState } from 'react'
import {
  SECTOR_PRESETS,
  listCatalogCategories,
  enabledSectorKeys,
  enableSectorPreset,
  disableSectorPreset,
} from '@/lib/catalog'

export default function CatalogCategoriesSettings({ orgId }: { orgId: string }) {
  const [enabled, setEnabled] = useState<Set<string>>(new Set())
  const [loading, setLoading] = useState(true)
  const [busyKey, setBusyKey] = useState<string | null>(null)
  const [error, setError] = useState('')

  const load = async () => {
    try {
      const categories = await listCatalogCategories(orgId)
      setEnabled(enabledSectorKeys(categories))
    } catch (err: any) {
      setError(err.message || 'Failed to load categories')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    load()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [orgId])

  const toggle = async (sectorKey: string) => {
    const sector = SECTOR_PRESETS.find((s) => s.key === sectorKey)
    if (!sector) return

    setError('')
    setBusyKey(sectorKey)
    try {
      if (enabled.has(sectorKey)) {
        await disableSectorPreset(orgId, sectorKey)
      } else {
        await enableSectorPreset(orgId, sector)
      }
      await load()
    } catch (err: any) {
      setError(err.message || 'Failed to update categories')
    } finally {
      setBusyKey(null)
    }
  }

  if (loading) return <p>Loading categories...</p>

  return (
    <div>
      {error && <div style={{ color: 'red', marginBottom: '1rem' }}>{error}</div>}
      <p style={{ margin: '0 0 1rem', color: '#666' }}>
        <small>
          A coherent taxonomy is what makes &quot;how much clothing did we distribute this
          quarter&quot; answerable. Pick whatever fits how your group actually sorts things --
          nothing selected is fine too, items just file under &quot;Other.&quot;
        </small>
      </p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
        {SECTOR_PRESETS.map((sector) => (
          <label key={sector.key} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.6rem' }}>
            <input
              type="checkbox"
              checked={enabled.has(sector.key)}
              disabled={busyKey === sector.key}
              onChange={() => toggle(sector.key)}
              style={{ marginTop: '0.2rem' }}
            />
            <span>
              <strong>{sector.label}</strong>
              {sector.description && (
                <>
                  {' '}
                  &mdash; <small style={{ color: '#666' }}>{sector.description}</small>
                </>
              )}
            </span>
          </label>
        ))}
      </div>
    </div>
  )
}
