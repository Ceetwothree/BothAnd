// app/org/[slug]/catalog/page.tsx
//
// Known limitations (see PR description for the full list):
// - Quantity tracking reuses responses.qty (already used for Events
//   attendance hours) to record how much of a listing's quantity a given
//   claim is for. "Claimed"/"fulfilled" is still an owner-driven, whole-
//   listing state (see the RLS note below) -- quantity only changes how
//   many separate claims a listing's stock can satisfy before it's shown
//   as fully claimed, not who marks the overall lifecycle.
// - Search/filter is client-side over the already-fetched list (matches
//   the app's existing "fetch everything, render" pattern -- no pagination
//   exists anywhere yet), not a server-side query.
// - records_update RLS only lets the *owner* of a record change its
//   state, so a claim can't flip the item to "claimed" directly -- claiming
//   inserts a `claim` response (a request), and the owner decides and marks
//   the item claimed/fulfilled themselves. Admin override would need a new
//   RLS policy, not built tonight.
// - One photo per listing, stored at "{org_id}/{filename}" in the
//   catalog-photos bucket -- upload is scoped to any active member
//   (catalog_photos_member_upload RLS), not just the listing's owner,
//   matching how records_write itself doesn't yet gate by role either.
'use client'

import { useEffect, useRef, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { useOrg } from '../OrgContext'
import { useContainer, ensureContainer } from '@/lib/containers'
import { canManageContainers, canPost } from '@/lib/permissions'
import { listCatalogCategories, CatalogCategory } from '@/lib/catalog'

interface Claim {
  id: string
  user_id: string
  qty: number | null
  users: { email: string } | null
}

interface ItemRecord {
  id: string
  title: string | null
  body: string | null
  state: string
  photo_url: string | null
  category_id: string | null
  location: string | null
  quantity: number
  created_at: string
  owner_id: string
  users: { email: string } | null
  claims: Claim[]
}

// A subcategory shows as "Parent > Child" everywhere it's displayed or
// offered as an option -- a flat top-level category is just its own name,
// the zero-subcategory case of the same lookup.
function categoryLabel(categories: CatalogCategory[], id: string | null): string | null {
  if (!id) return null
  const cat = categories.find((c) => c.id === id)
  if (!cat) return null
  if (!cat.parent_id) return cat.name
  const parent = categories.find((c) => c.id === cat.parent_id)
  return parent ? `${parent.name} > ${cat.name}` : cat.name
}

// Shared by both the add-item form's category select and the filter
// select -- a top-level category with subcategories groups them under an
// <optgroup>; one with none (Kits, School supplies, ...) is directly
// selectable, the flat, zero-subcategory case of the same structure.
function CategoryOptions({ categories }: { categories: CatalogCategory[] }) {
  const topLevel = categories.filter((c) => !c.parent_id)

  return (
    <>
      {topLevel.map((top) => {
        const children = categories.filter((c) => c.parent_id === top.id)
        if (children.length === 0) {
          return (
            <option key={top.id} value={top.id}>
              {top.name}
            </option>
          )
        }
        return (
          <optgroup key={top.id} label={top.name}>
            {children.map((child) => (
              <option key={child.id} value={child.id}>
                {child.name}
              </option>
            ))}
          </optgroup>
        )
      })}
    </>
  )
}

export default function CatalogPage() {
  const { org, role } = useOrg()
  const { container, loading: loadingContainer, setContainer } = useContainer(org.id, 'catalog')
  const [user, setUser] = useState<any>(null)
  const [items, setItems] = useState<ItemRecord[]>([])
  const [loadingItems, setLoadingItems] = useState(true)
  const [categories, setCategories] = useState<CatalogCategory[]>([])

  const [settingUp, setSettingUp] = useState(false)
  const [title, setTitle] = useState('')
  const [body, setBody] = useState('')
  const [category, setCategory] = useState('')
  const [location, setLocation] = useState('')
  const [quantity, setQuantity] = useState('1')
  const [photoFile, setPhotoFile] = useState<File | null>(null)
  const [barcode, setBarcode] = useState('')
  const [scanning, setScanning] = useState(false)
  const [scanError, setScanError] = useState('')
  const scanVideoRef = useRef<HTMLVideoElement>(null)
  const [creating, setCreating] = useState(false)
  const [busyId, setBusyId] = useState<string | null>(null)
  const [error, setError] = useState('')

  // Keyed by item id -- how many of a multi-quantity listing the viewer
  // wants to request, before they click "Request."
  const [claimQtyDrafts, setClaimQtyDrafts] = useState<Record<string, string>>({})

  const [searchQuery, setSearchQuery] = useState('')
  const [categoryFilter, setCategoryFilter] = useState('')

  const canSetUp = canManageContainers(role)
  const canList = canPost(role)

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => setUser(data.user))
  }, [])

  useEffect(() => {
    listCatalogCategories(org.id)
      .then(setCategories)
      .catch(() => {})
  }, [org.id])

  const fetchItems = async (containerId: string) => {
    setLoadingItems(true)

    const { data, error: fetchError } = await supabase
      .from('records')
      .select(
        `
        id, title, body, state, photo_url, category_id, location, quantity, created_at, owner_id,
        users!owner_id(email),
        responses(id, kind, user_id, qty, users!user_id(email))
        `
      )
      .eq('container_id', containerId)
      .eq('kind', 'item')
      .order('created_at', { ascending: false })

    if (!fetchError && data) {
      const rows = (data as any[]).map((r) => ({
        ...r,
        claims: (r.responses ?? []).filter((resp: any) => resp.kind === 'claim'),
      }))
      setItems(rows)
    }

    setLoadingItems(false)
  }

  useEffect(() => {
    if (container) fetchItems(container.id)
    else setLoadingItems(false)
  }, [container])

  const handleSetUp = async () => {
    setSettingUp(true)
    setError('')
    try {
      const c = await ensureContainer(org.id, 'catalog', 'Catalog', 'org')
      setContainer(c)
    } catch (err: any) {
      setError(err.message || 'Failed to set up Catalog')
    } finally {
      setSettingUp(false)
    }
  }

  // Capture-only: decodes a barcode from the camera into the `barcode`
  // field, nothing more. No product-lookup API behind this -- that would
  // be a real external dependency (rate limits, an API key to manage,
  // something that can go down) added without being asked for. Title,
  // category, etc. still get filled in by hand either way.
  //
  // @zxing/browser is a genuinely large dependency (~115kB) for a feature
  // most visits to this page won't use -- dynamically imported here so it
  // only loads for someone who actually taps "Scan," not on every Catalog
  // page load.
  const startScan = async () => {
    setScanError('')
    setScanning(true)
    const zxing = await import('@zxing/browser')
    try {
      const reader = new zxing.BrowserMultiFormatReader()
      const result = await reader.decodeOnceFromVideoDevice(undefined, scanVideoRef.current ?? undefined)
      setBarcode(result.getText())
    } catch (err: any) {
      setScanError('Could not read a barcode -- try again, or type it in below.')
    } finally {
      setScanning(false)
      zxing.BrowserCodeReader.releaseAllStreams()
    }
  }

  const cancelScan = async () => {
    setScanning(false)
    const { BrowserCodeReader } = await import('@zxing/browser')
    BrowserCodeReader.releaseAllStreams()
  }

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!container || !user) return
    setError('')

    if (!title || !body) {
      setError('Title and description are required')
      return
    }

    const quantityNum = parseInt(quantity, 10)
    if (!quantityNum || quantityNum < 1) {
      setError('Quantity must be at least 1')
      return
    }

    setCreating(true)
    try {
      let photoUrl: string | null = null

      if (photoFile) {
        const ext = photoFile.name.split('.').pop()
        const path = `${org.id}/${Date.now()}.${ext}`

        const { error: uploadError } = await supabase.storage
          .from('catalog-photos')
          .upload(path, photoFile)

        if (uploadError) throw uploadError

        const { data: publicUrl } = supabase.storage.from('catalog-photos').getPublicUrl(path)
        photoUrl = publicUrl.publicUrl
      }

      const { error: createError } = await supabase.from('records').insert({
        container_id: container.id,
        kind: 'item',
        owner_id: user.id,
        title,
        body,
        state: 'open',
        photo_url: photoUrl,
        category_id: category || null,
        location: location || null,
        quantity: quantityNum,
        barcode: barcode || null,
      })

      if (createError) throw createError

      setTitle('')
      setBody('')
      setCategory('')
      setLocation('')
      setQuantity('1')
      setPhotoFile(null)
      setBarcode('')
      await fetchItems(container.id)
    } catch (err: any) {
      setError(err.message || 'Failed to create listing')
    } finally {
      setCreating(false)
    }
  }

  const handleClaim = async (itemId: string, qty: number) => {
    if (!user) return
    setBusyId(itemId)
    setError('')
    try {
      const { error: claimError } = await supabase.from('responses').insert({
        record_id: itemId,
        user_id: user.id,
        kind: 'claim',
        qty,
      })

      if (claimError) throw claimError
      if (container) await fetchItems(container.id)
    } catch (err: any) {
      setError(err.message || 'Failed to claim')
    } finally {
      setBusyId(null)
    }
  }

  const handleWithdrawClaim = async (itemId: string, claimId: string) => {
    setBusyId(itemId)
    setError('')
    try {
      const { error: deleteError } = await supabase.from('responses').delete().eq('id', claimId)
      if (deleteError) throw deleteError
      if (container) await fetchItems(container.id)
    } catch (err: any) {
      setError(err.message || 'Failed to withdraw request')
    } finally {
      setBusyId(null)
    }
  }

  const handleSetState = async (itemId: string, state: string) => {
    setBusyId(itemId)
    setError('')
    try {
      const { error: updateError } = await supabase.from('records').update({ state }).eq('id', itemId)
      if (updateError) throw updateError
      if (container) await fetchItems(container.id)
    } catch (err: any) {
      setError(err.message || 'Failed to update item')
    } finally {
      setBusyId(null)
    }
  }

  const query = searchQuery.trim().toLowerCase()
  const filteredItems = items.filter((item) => {
    if (categoryFilter && item.category_id !== categoryFilter) return false
    if (!query) return true
    return [item.title, item.body, item.location].some((field) =>
      field?.toLowerCase().includes(query)
    )
  })

  if (loadingContainer) return <p>Loading...</p>

  if (!container) {
    return (
      <div>
        <h2>Catalog</h2>
        {canSetUp ? (
          <>
            <p>Catalog isn&apos;t set up for {org.name} yet.</p>
            {error && <div style={{ color: 'red', marginBottom: '1rem' }}>{error}</div>}
            <button onClick={handleSetUp} disabled={settingUp}>
              {settingUp ? 'Setting up...' : 'Set up Catalog'}
            </button>
          </>
        ) : (
          <p>Catalog isn&apos;t set up for {org.name} yet.</p>
        )}
      </div>
    )
  }

  return (
    <div>
      <h2>Catalog</h2>
      {error && <div style={{ color: 'red', marginBottom: '1rem' }}>{error}</div>}

      {canList && (
        <section style={{ marginBottom: '2rem' }}>
          <h3>List an item</h3>
          <form onSubmit={handleCreate}>
            <div style={{ marginBottom: '1rem' }}>
              <label htmlFor="title">Title:</label>
              <input
                id="title"
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                style={{ width: '100%', padding: '0.5rem', marginTop: '0.5rem' }}
              />
            </div>
            <div style={{ marginBottom: '1rem' }}>
              <label htmlFor="body">Description:</label>
              <textarea
                id="body"
                value={body}
                onChange={(e) => setBody(e.target.value)}
                required
                rows={4}
                style={{ width: '100%', padding: '0.5rem', marginTop: '0.5rem' }}
              />
            </div>
            <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
              <div style={{ flex: 1 }}>
                <label htmlFor="category">Category (optional):</label>
                <br />
                <select
                  id="category"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  style={{ width: '100%', padding: '0.5rem', marginTop: '0.5rem' }}
                >
                  <option value="">No category</option>
                  <CategoryOptions categories={categories} />
                </select>
                {categories.length === 0 && (
                  <p style={{ margin: '0.35rem 0 0' }}>
                    <small>
                      No categories set up yet -- an admin can turn on category presets that fit
                      this org in Settings.
                    </small>
                  </p>
                )}
              </div>
              <div style={{ flex: 1 }}>
                <label htmlFor="location">Location (optional):</label>
                <br />
                <input
                  id="location"
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="e.g. Back office, Warehouse B"
                  style={{ width: '100%', padding: '0.5rem', marginTop: '0.5rem' }}
                />
              </div>
              <div style={{ flex: 1 }}>
                <label htmlFor="quantity">Quantity:</label>
                <br />
                <input
                  id="quantity"
                  type="number"
                  min={1}
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                  required
                  style={{ width: '100%', padding: '0.5rem', marginTop: '0.5rem' }}
                />
              </div>
            </div>
            <div style={{ marginBottom: '1rem' }}>
              <label htmlFor="photo">Photo (optional):</label>
              <br />
              <input
                id="photo"
                type="file"
                accept="image/*"
                capture="environment"
                onChange={(e) => setPhotoFile(e.target.files?.[0] ?? null)}
                style={{ marginTop: '0.5rem' }}
              />
              <p style={{ margin: '0.35rem 0 0' }}>
                <small>On a phone, this opens the camera directly (rear-facing) for a quick inventory
                shot. Browsers without a camera fall back to a normal file picker.</small>
              </p>
            </div>
            <div style={{ marginBottom: '1rem' }}>
              <label htmlFor="barcode">Barcode (optional):</label>
              <br />
              <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.5rem' }}>
                <input
                  id="barcode"
                  type="text"
                  value={barcode}
                  onChange={(e) => setBarcode(e.target.value)}
                  placeholder="Scan, or type it in by hand"
                  style={{ flex: 1, padding: '0.5rem' }}
                />
                <button type="button" onClick={startScan} disabled={scanning}>
                  {scanning ? 'Scanning...' : 'Scan'}
                </button>
              </div>
              {scanError && <p style={{ color: 'red', margin: '0.35rem 0 0' }}>{scanError}</p>}
              {scanning && (
                <div style={{ marginTop: '0.5rem' }}>
                  <video
                    ref={scanVideoRef}
                    style={{ width: '100%', maxWidth: '360px', borderRadius: '4px' }}
                    muted
                    playsInline
                  />
                  <p style={{ margin: '0.35rem 0 0' }}>
                    <button type="button" onClick={cancelScan}>
                      Cancel
                    </button>
                  </p>
                </div>
              )}
              <p style={{ margin: '0.35rem 0 0' }}>
                <small>Useful when a box of donated goods happens to have commercial barcodes --
                not required, and there&apos;s no product lookup behind it, just a code saved for
                reference.</small>
              </p>
            </div>
            <button
              type="submit"
              disabled={creating}
              style={{
                padding: '0.75rem 1.5rem',
                backgroundColor: '#0070f3',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: creating ? 'not-allowed' : 'pointer',
              }}
            >
              {creating ? 'Listing...' : 'List item'}
            </button>
          </form>
        </section>
      )}

      <section>
        {items.length > 0 && (
          <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.25rem' }}>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search title, description, location..."
              style={{ flex: 2, padding: '0.5rem' }}
            />
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              style={{ flex: 1, padding: '0.5rem' }}
            >
              <option value="">All categories</option>
              <CategoryOptions categories={categories} />
            </select>
          </div>
        )}

        {loadingItems ? (
          <p>Loading items...</p>
        ) : items.length === 0 ? (
          <p style={{ color: '#666' }}>
            No items yet. Catalog is where donations and surplus get tracked and given away --
            add an item to get started.
          </p>
        ) : filteredItems.length === 0 ? (
          <p>No items match your search.</p>
        ) : (
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
              gap: '1.25rem',
            }}
          >
            {filteredItems.map((item) => {
              const isOwner = user && item.owner_id === user.id
              const myClaim = user ? item.claims.find((c) => c.user_id === user.id) : undefined
              const claimedQty = item.claims.reduce((sum, c) => sum + (c.qty ?? 1), 0)
              const remaining = item.quantity - claimedQty
              const claimDraft = claimQtyDrafts[item.id] ?? '1'

              return (
                <article
                  key={item.id}
                  style={{
                    border: '1px solid #eee',
                    borderRadius: '8px',
                    overflow: 'hidden',
                    display: 'flex',
                    flexDirection: 'column',
                  }}
                >
                  <div
                    style={{
                      aspectRatio: '4 / 3',
                      backgroundColor: '#f5f5f5',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    {item.photo_url ? (
                      <img
                        src={item.photo_url}
                        alt={item.title ?? ''}
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      />
                    ) : (
                      <span style={{ color: '#999', fontSize: '0.85rem' }}>No photo</span>
                    )}
                  </div>

                  <div style={{ padding: '1rem', display: 'flex', flexDirection: 'column', flex: 1 }}>
                    <h3 style={{ margin: '0 0 0.25rem' }}>
                      {item.title} <small>({item.state})</small>
                    </h3>
                    {(() => {
                      const catLabel = categoryLabel(categories, item.category_id)
                      return (
                        (catLabel || item.location) && (
                          <p style={{ margin: '0 0 0.5rem' }}>
                            {catLabel && <small>{catLabel}</small>}
                            {catLabel && item.location && <small> &middot; </small>}
                            {item.location && <small>{item.location}</small>}
                          </p>
                        )
                      )
                    })()}
                    <p style={{ flex: 1 }}>{item.body}</p>
                    <small>
                      Posted by {item.users?.email || 'Unknown'} on{' '}
                      {new Date(item.created_at).toLocaleDateString()}
                      {item.quantity > 1 && (
                        <>
                          {' '}
                          &middot; {Math.max(remaining, 0)} of {item.quantity} available
                        </>
                      )}
                    </small>

                    {!isOwner && canList && item.state === 'open' && (
                      <div style={{ marginTop: '0.75rem' }}>
                        {myClaim ? (
                          <>
                            <span style={{ marginRight: '0.75rem' }}>
                              You&apos;ve requested {item.quantity > 1 ? `${myClaim.qty ?? 1} of ` : ''}this item
                            </span>
                            <button
                              onClick={() => handleWithdrawClaim(item.id, myClaim.id)}
                              disabled={busyId === item.id}
                            >
                              {busyId === item.id ? 'Withdrawing...' : 'Withdraw'}
                            </button>
                          </>
                        ) : remaining <= 0 ? (
                          <span>Fully claimed</span>
                        ) : (
                          <>
                            {item.quantity > 1 && (
                              <input
                                type="number"
                                min={1}
                                max={remaining}
                                value={claimDraft}
                                onChange={(e) =>
                                  setClaimQtyDrafts((prev) => ({ ...prev, [item.id]: e.target.value }))
                                }
                                style={{ width: '4rem', padding: '0.25rem', marginRight: '0.5rem' }}
                              />
                            )}
                            <button
                              onClick={() => {
                                const qty = item.quantity > 1 ? parseInt(claimDraft, 10) || 1 : 1
                                handleClaim(item.id, Math.min(Math.max(qty, 1), remaining))
                              }}
                              disabled={busyId === item.id}
                            >
                              {busyId === item.id
                                ? 'Requesting...'
                                : item.quantity > 1
                                  ? 'Request'
                                  : 'I want this'}
                            </button>
                          </>
                        )}
                      </div>
                    )}

                    {isOwner && (
                      <div style={{ marginTop: '0.75rem' }}>
                        {item.claims.length > 0 && (
                          <p>
                            <strong>Requested by:</strong>{' '}
                            {item.claims
                              .map(
                                (c) =>
                                  `${c.users?.email || 'Unknown'}${item.quantity > 1 ? ` (${c.qty ?? 1})` : ''}`
                              )
                              .join(', ')}
                          </p>
                        )}
                        {item.state === 'open' && (
                          <button
                            onClick={() => handleSetState(item.id, 'claimed')}
                            disabled={busyId === item.id}
                          >
                            Mark claimed
                          </button>
                        )}
                        {item.state === 'claimed' && (
                          <button
                            onClick={() => handleSetState(item.id, 'fulfilled')}
                            disabled={busyId === item.id}
                          >
                            Mark fulfilled
                          </button>
                        )}
                      </div>
                    )}
                  </div>
                </article>
              )
            })}
          </div>
        )}
      </section>
    </div>
  )
}
