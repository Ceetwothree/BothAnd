// app/org/[slug]/journal/page.tsx
//
// Privacy note: the journal container is created with visibility='owner'.
// Per records_read RLS, that means each entry is visible to its own
// owner, to the container's creator (whoever ran "Set up Journal"), and to
// any org admin -- not strictly private-per-user. That's the existing
// schema's definition of "owner" visibility, not something new introduced
// here. No client-side filtering needed: the query below returns exactly
// what RLS allows, nothing more.
'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { useOrg } from '../OrgContext'
import { useContainer, ensureContainer } from '@/lib/containers'
import { canManageContainers, canPost } from '@/lib/permissions'

interface EntryRecord {
  id: string
  title: string | null
  body: string | null
  created_at: string
  owner_id: string
}

export default function JournalPage() {
  const { org, role } = useOrg()
  const { container, loading: loadingContainer, setContainer } = useContainer(org.id, 'journal')
  const [user, setUser] = useState<any>(null)
  const [entries, setEntries] = useState<EntryRecord[]>([])
  const [loadingEntries, setLoadingEntries] = useState(true)

  const [settingUp, setSettingUp] = useState(false)
  const [title, setTitle] = useState('')
  const [body, setBody] = useState('')
  const [creating, setCreating] = useState(false)
  const [error, setError] = useState('')

  const canSetUp = canManageContainers(role)
  const canWrite = canPost(role)

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => setUser(data.user))
  }, [])

  const fetchEntries = async (containerId: string) => {
    setLoadingEntries(true)

    const { data, error: fetchError } = await supabase
      .from('records')
      .select('id, title, body, created_at, owner_id')
      .eq('container_id', containerId)
      .eq('kind', 'entry')
      .order('created_at', { ascending: false })

    if (!fetchError && data) setEntries(data as EntryRecord[])
    setLoadingEntries(false)
  }

  useEffect(() => {
    if (container) fetchEntries(container.id)
    else setLoadingEntries(false)
  }, [container])

  const handleSetUp = async () => {
    setSettingUp(true)
    setError('')
    try {
      const c = await ensureContainer(org.id, 'journal', 'Journal', 'owner')
      setContainer(c)
    } catch (err: any) {
      setError(err.message || 'Failed to set up Journal')
    } finally {
      setSettingUp(false)
    }
  }

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!container || !user) return
    setError('')

    if (!body) {
      setError('Entry text is required')
      return
    }

    setCreating(true)
    try {
      const { error: createError } = await supabase.from('records').insert({
        container_id: container.id,
        kind: 'entry',
        owner_id: user.id,
        title: title || null,
        body,
        state: 'open',
      })

      if (createError) throw createError

      setTitle('')
      setBody('')
      await fetchEntries(container.id)
    } catch (err: any) {
      setError(err.message || 'Failed to save entry')
    } finally {
      setCreating(false)
    }
  }

  if (loadingContainer) return <p>Loading...</p>

  if (!container) {
    return (
      <div>
        <h2>Journal</h2>
        {canSetUp ? (
          <>
            <p>Journal isn&apos;t set up for {org.name} yet.</p>
            {error && <div style={{ color: 'red', marginBottom: '1rem' }}>{error}</div>}
            <button onClick={handleSetUp} disabled={settingUp}>
              {settingUp ? 'Setting up...' : 'Set up Journal'}
            </button>
          </>
        ) : (
          <p>Journal isn&apos;t set up for {org.name} yet.</p>
        )}
      </div>
    )
  }

  return (
    <div>
      <h2>Journal</h2>
      {error && <div style={{ color: 'red', marginBottom: '1rem' }}>{error}</div>}

      {canWrite && (
        <section style={{ marginBottom: '2rem' }}>
          <h3>New entry</h3>
          <form onSubmit={handleCreate}>
            <div style={{ marginBottom: '1rem' }}>
              <label htmlFor="title">Title (optional):</label>
              <input
                id="title"
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                style={{ width: '100%', padding: '0.5rem', marginTop: '0.5rem' }}
              />
            </div>
            <div style={{ marginBottom: '1rem' }}>
              <label htmlFor="body">Entry:</label>
              <textarea
                id="body"
                value={body}
                onChange={(e) => setBody(e.target.value)}
                required
                rows={5}
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
              {creating ? 'Saving...' : 'Save entry'}
            </button>
          </form>
        </section>
      )}

      <section>
        {loadingEntries ? (
          <p>Loading entries...</p>
        ) : entries.length === 0 ? (
          <p>No entries yet.</p>
        ) : (
          entries.map((entry) => (
            <article
              key={entry.id}
              style={{
                marginBottom: '1.5rem',
                padding: '1rem',
                border: '1px solid #eee',
                borderRadius: '4px',
              }}
            >
              {entry.title && <h3>{entry.title}</h3>}
              <p style={{ whiteSpace: 'pre-wrap' }}>{entry.body}</p>
              <small>{new Date(entry.created_at).toLocaleDateString()}</small>
            </article>
          ))
        )}
      </section>
    </div>
  )
}
