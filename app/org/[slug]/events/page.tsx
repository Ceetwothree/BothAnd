// app/org/[slug]/events/page.tsx
//
// Known limitations (see PR description for the full list):
// - records has no dedicated date/time column yet, so "when" lives in the
//   description text for now -- needs a proper `starts_at` column later.
// - responses has no DELETE policy yet, so RSVPs are add-only: no un-RSVP
//   until a migration adds one.
// - "staff can create events" is a UI-level guard only; the underlying
//   records_write RLS policy allows any active member, same gap the forum
//   already has today.
'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { useOrg } from '../OrgContext'
import { useContainer, ensureContainer } from '@/lib/containers'
import { canManageContainers, canManageEvents, canPost } from '@/lib/permissions'

interface EventRecord {
  id: string
  title: string | null
  body: string | null
  capacity: number | null
  created_at: string
  owner_id: string
  users: { email: string } | null
  rsvp_count: number
}

export default function EventsPage() {
  const { org, role } = useOrg()
  const { container, loading: loadingContainer, setContainer } = useContainer(org.id, 'events')
  const [user, setUser] = useState<any>(null)
  const [events, setEvents] = useState<EventRecord[]>([])
  const [loadingEvents, setLoadingEvents] = useState(true)
  const [rsvpedIds, setRsvpedIds] = useState<Set<string>>(new Set())

  const [settingUp, setSettingUp] = useState(false)
  const [title, setTitle] = useState('')
  const [body, setBody] = useState('')
  const [capacity, setCapacity] = useState('')
  const [creating, setCreating] = useState(false)
  const [rsvpingId, setRsvpingId] = useState<string | null>(null)
  const [error, setError] = useState('')

  const canSetUp = canManageContainers(role)
  const canCreate = canManageEvents(role)
  const canRsvp = canPost(role)

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => setUser(data.user))
  }, [])

  const fetchEvents = async (containerId: string) => {
    setLoadingEvents(true)

    const { data, error: fetchError } = await supabase
      .from('records')
      .select(
        `
        id, title, body, capacity, created_at, owner_id,
        users!owner_id(email),
        responses(id, kind, user_id)
        `
      )
      .eq('container_id', containerId)
      .eq('kind', 'event')
      .order('created_at', { ascending: false })

    if (!fetchError && data) {
      const rows = (data as any[]).map((r) => ({
        ...r,
        rsvp_count: (r.responses ?? []).filter((resp: any) => resp.kind === 'rsvp').length,
      }))
      setEvents(rows)

      if (user) {
        const mine = new Set<string>()
        for (const r of data as any[]) {
          if ((r.responses ?? []).some((resp: any) => resp.kind === 'rsvp' && resp.user_id === user.id)) {
            mine.add(r.id)
          }
        }
        setRsvpedIds(mine)
      }
    }

    setLoadingEvents(false)
  }

  useEffect(() => {
    if (container) fetchEvents(container.id)
    else setLoadingEvents(false)
  }, [container, user])

  const handleSetUp = async () => {
    setSettingUp(true)
    setError('')
    try {
      const c = await ensureContainer(org.id, 'events', 'Events', 'org')
      setContainer(c)
    } catch (err: any) {
      setError(err.message || 'Failed to set up Events')
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
        kind: 'event',
        owner_id: user.id,
        title,
        body,
        state: 'open',
        capacity: capacity ? parseInt(capacity, 10) : null,
      })

      if (createError) throw createError

      setTitle('')
      setBody('')
      setCapacity('')
      await fetchEvents(container.id)
    } catch (err: any) {
      setError(err.message || 'Failed to create event')
    } finally {
      setCreating(false)
    }
  }

  const handleRsvp = async (eventId: string) => {
    if (!user) return
    setRsvpingId(eventId)
    setError('')
    try {
      const { error: rsvpError } = await supabase.from('responses').insert({
        record_id: eventId,
        user_id: user.id,
        kind: 'rsvp',
      })

      if (rsvpError) throw rsvpError
      if (container) await fetchEvents(container.id)
    } catch (err: any) {
      setError(err.message || 'Failed to RSVP')
    } finally {
      setRsvpingId(null)
    }
  }

  if (loadingContainer) return <p>Loading...</p>

  if (!container) {
    return (
      <div>
        <h2>Events</h2>
        {canSetUp ? (
          <>
            <p>Events isn&apos;t set up for {org.name} yet.</p>
            {error && <div style={{ color: 'red', marginBottom: '1rem' }}>{error}</div>}
            <button onClick={handleSetUp} disabled={settingUp}>
              {settingUp ? 'Setting up...' : 'Set up Events'}
            </button>
          </>
        ) : (
          <p>Events isn&apos;t set up for {org.name} yet.</p>
        )}
      </div>
    )
  }

  return (
    <div>
      <h2>Events</h2>
      {error && <div style={{ color: 'red', marginBottom: '1rem' }}>{error}</div>}

      {canCreate && (
        <section style={{ marginBottom: '2rem' }}>
          <h3>Create an event</h3>
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
              <label htmlFor="body">Description (include date/time and location):</label>
              <textarea
                id="body"
                value={body}
                onChange={(e) => setBody(e.target.value)}
                required
                rows={4}
                style={{ width: '100%', padding: '0.5rem', marginTop: '0.5rem' }}
              />
            </div>
            <div style={{ marginBottom: '1rem' }}>
              <label htmlFor="capacity">Capacity (optional):</label>
              <input
                id="capacity"
                type="number"
                min={1}
                value={capacity}
                onChange={(e) => setCapacity(e.target.value)}
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
              {creating ? 'Creating...' : 'Create event'}
            </button>
          </form>
        </section>
      )}

      <section>
        {loadingEvents ? (
          <p>Loading events...</p>
        ) : events.length === 0 ? (
          <p>No events yet.</p>
        ) : (
          events.map((ev) => {
            const full = ev.capacity != null && ev.rsvp_count >= ev.capacity
            const alreadyRsvped = rsvpedIds.has(ev.id)

            return (
              <article
                key={ev.id}
                style={{
                  marginBottom: '1.5rem',
                  padding: '1rem',
                  border: '1px solid #eee',
                  borderRadius: '4px',
                }}
              >
                <h3>{ev.title}</h3>
                <p style={{ whiteSpace: 'pre-wrap' }}>{ev.body}</p>
                <small>
                  Posted by {ev.users?.email || 'Unknown'} on{' '}
                  {new Date(ev.created_at).toLocaleDateString()}
                  {ev.capacity != null && (
                    <>
                      {' '}
                      &middot; {ev.rsvp_count}/{ev.capacity} spots filled
                    </>
                  )}
                </small>
                <div style={{ marginTop: '0.75rem' }}>
                  {!canRsvp ? null : alreadyRsvped ? (
                    <span>You&apos;re RSVP&apos;d</span>
                  ) : full ? (
                    <button disabled>Event full</button>
                  ) : (
                    <button onClick={() => handleRsvp(ev.id)} disabled={rsvpingId === ev.id}>
                      {rsvpingId === ev.id ? 'RSVPing...' : 'RSVP'}
                    </button>
                  )}
                </div>
              </article>
            )
          })
        )}
      </section>
    </div>
  )
}
