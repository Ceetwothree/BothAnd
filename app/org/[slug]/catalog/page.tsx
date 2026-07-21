// app/org/[slug]/catalog/page.tsx
//
// Known limitations (see PR description for the full list):
// - No quantity/stock tracking -- each listing is a single claimable item.
//   A real "movements" table for stock counts is a separate future migration.
// - records_update_owner RLS only lets the *owner* of a record change its
//   state, so a claim can't flip the item to "claimed" directly -- claiming
//   inserts a `claim` response (a request), and the owner decides and marks
//   the item claimed/fulfilled themselves. Admin override would need a new
//   RLS policy, not built tonight.
'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { useOrg } from '../OrgContext'
import { useContainer, ensureContainer } from '@/lib/containers'
import { canManageContainers, canPost } from '@/lib/permissions'

interface Claim {
  id: string
  user_id: string
  users: { email: string } | null
}

interface ItemRecord {
  id: string
  title: string | null
  body: string | null
  state: string
  created_at: string
  owner_id: string
  users: { email: string } | null
  claims: Claim[]
}

export default function CatalogPage() {
  const { org, role } = useOrg()
  const { container, loading: loadingContainer, setContainer } = useContainer(org.id, 'catalog')
  const [user, setUser] = useState<any>(null)
  const [items, setItems] = useState<ItemRecord[]>([])
  const [loadingItems, setLoadingItems] = useState(true)

  const [settingUp, setSettingUp] = useState(false)
  const [title, setTitle] = useState('')
  const [body, setBody] = useState('')
  const [creating, setCreating] = useState(false)
  const [busyId, setBusyId] = useState<string | null>(null)
  const [error, setError] = useState('')

  const canSetUp = canManageContainers(role)
  const canList = canPost(role)

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => setUser(data.user))
  }, [])

  const fetchItems = async (containerId: string) => {
    setLoadingItems(true)

    const { data, error: fetchError } = await supabase
      .from('records')
      .select(
        `
        id, title, body, state, created_at, owner_id,
        users!owner_id(email),
        responses(id, kind, user_id, users!user_id(email))
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

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!container || !user) return
    setError('')

    if (!title || !body) {
      setError('Title and description are required')
      return
    }

    setCreating(true)
    try {
      const { error: createError } = await supabase.from('records').insert({
        container_id: container.id,
        kind: 'item',
        owner_id: user.id,
        title,
        body,
        state: 'open',
      })

      if (createError) throw createError

      setTitle('')
      setBody('')
      await fetchItems(container.id)
    } catch (err: any) {
      setError(err.message || 'Failed to create listing')
    } finally {
      setCreating(false)
    }
  }

  const handleClaim = async (itemId: string) => {
    if (!user) return
    setBusyId(itemId)
    setError('')
    try {
      const { error: claimError } = await supabase.from('responses').insert({
        record_id: itemId,
        user_id: user.id,
        kind: 'claim',
      })

      if (claimError) throw claimError
      if (container) await fetchItems(container.id)
    } catch (err: any) {
      setError(err.message || 'Failed to claim')
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
        {loadingItems ? (
          <p>Loading items...</p>
        ) : items.length === 0 ? (
          <p>No items yet.</p>
        ) : (
          items.map((item) => {
            const isOwner = user && item.owner_id === user.id
            const alreadyClaimed = user && item.claims.some((c) => c.user_id === user.id)

            return (
              <article
                key={item.id}
                style={{
                  marginBottom: '1.5rem',
                  padding: '1rem',
                  border: '1px solid #eee',
                  borderRadius: '4px',
                }}
              >
                <h3>
                  {item.title} <small>({item.state})</small>
                </h3>
                <p>{item.body}</p>
                <small>
                  Posted by {item.users?.email || 'Unknown'} on{' '}
                  {new Date(item.created_at).toLocaleDateString()}
                </small>

                {!isOwner && canList && item.state === 'open' && (
                  <div style={{ marginTop: '0.75rem' }}>
                    {alreadyClaimed ? (
                      <span>You&apos;ve requested this item</span>
                    ) : (
                      <button onClick={() => handleClaim(item.id)} disabled={busyId === item.id}>
                        {busyId === item.id ? 'Requesting...' : 'I want this'}
                      </button>
                    )}
                  </div>
                )}

                {isOwner && (
                  <div style={{ marginTop: '0.75rem' }}>
                    {item.claims.length > 0 && (
                      <p>
                        <strong>Requested by:</strong>{' '}
                        {item.claims.map((c) => c.users?.email || 'Unknown').join(', ')}
                      </p>
                    )}
                    {item.state === 'open' && (
                      <button onClick={() => handleSetState(item.id, 'claimed')} disabled={busyId === item.id}>
                        Mark claimed
                      </button>
                    )}
                    {item.state === 'claimed' && (
                      <button onClick={() => handleSetState(item.id, 'fulfilled')} disabled={busyId === item.id}>
                        Mark fulfilled
                      </button>
                    )}
                  </div>
                )}
              </article>
            )
          })
        )}
      </section>
    </div>
  )
}
