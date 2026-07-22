// app/org/[slug]/events/page.tsx
//
// Known limitations (see PR description for the full list):
// - "staff can create events" is a UI-level guard only; the underlying
//   records_write RLS policy allows any active member, same gap the forum
//   already has today.
// - Waitlisting is derived, not stored: the first `capacity` RSVPs by
//   created_at are "confirmed," the rest are "waitlisted." Cancelling a
//   confirmed spot promotes the next-oldest waitlisted RSVP automatically,
//   since it's just a recompute -- no promotion bookkeeping needed.
'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { useOrg } from '../OrgContext'
import { useContainer, ensureContainer } from '@/lib/containers'
import { canManageContainers, canManageEvents, canPost } from '@/lib/permissions'

interface RsvpResponse {
  id: string
  kind: string
  user_id: string
  created_at: string
}

interface EventRecord {
  id: string
  title: string | null
  body: string | null
  capacity: number | null
  starts_at: string | null
  ends_at: string | null
  created_at: string
  owner_id: string
  users: { email: string } | null
  rsvps: RsvpResponse[]
}

function rsvpStatus(ev: EventRecord, userId: string | undefined) {
  const ordered = [...ev.rsvps].sort((a, b) => a.created_at.localeCompare(b.created_at))
  const confirmed = ev.capacity != null ? ordered.slice(0, ev.capacity) : ordered
  const waitlisted = ev.capacity != null ? ordered.slice(ev.capacity) : []

  const mine = ordered.find((r) => r.user_id === userId)
  const mineStatus = !mine ? null : confirmed.includes(mine) ? 'confirmed' : 'waitlisted'

  return {
    confirmedCount: confirmed.length,
    waitlistedCount: waitlisted.length,
    full: ev.capacity != null && confirmed.length >= ev.capacity,
    myResponseId: mine?.id ?? null,
    myStatus: mineStatus as 'confirmed' | 'waitlisted' | null,
  }
}

// datetime-local gives a value with no timezone offset, which the Date
// constructor treats as local time per the ES spec -- toISOString() then
// converts that to the UTC instant actually stored.
function localInputToIso(value: string): string | null {
  if (!value) return null
  const d = new Date(value)
  return isNaN(d.getTime()) ? null : d.toISOString()
}

export default function EventsPage() {
  const { org, role } = useOrg()
  const { container, loading: loadingContainer, setContainer } = useContainer(org.id, 'events')
  const [user, setUser] = useState<any>(null)
  const [events, setEvents] = useState<EventRecord[]>([])
  const [loadingEvents, setLoadingEvents] = useState(true)

  const [settingUp, setSettingUp] = useState(false)
  const [title, setTitle] = useState('')
  const [body, setBody] = useState('')
  const [startsAt, setStartsAt] = useState('')
  const [endsAt, setEndsAt] = useState('')
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
        id, title, body, capacity, starts_at, ends_at, created_at, owner_id,
        users!owner_id(email),
        responses(id, kind, user_id, created_at)
        `
      )
      .eq('container_id', containerId)
      .eq('kind', 'event')

    if (!fetchError && data) {
      const rows = (data as any[]).map((r) => ({
        ...r,
        rsvps: (r.responses ?? []).filter((resp: any) => resp.kind === 'rsvp'),
      }))
      // Soonest upcoming first; events with no date (shouldn't happen for
      // new ones, but legacy rows are possible) sort to the end.
      rows.sort((a, b) => {
        if (!a.starts_at && !b.starts_at) return 0
        if (!a.starts_at) return 1
        if (!b.starts_at) return -1
        return a.starts_at.localeCompare(b.starts_at)
      })
      setEvents(rows)
    }

    setLoadingEvents(false)
  }

  useEffect(() => {
    if (container) fetchEvents(container.id)
    else setLoadingEvents(false)
  }, [container])

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

    const startsAtIso = localInputToIso(startsAt)
    if (!title || !body || !startsAtIso) {
      setError('Title, description, and start time are required')
      return
    }

    const endsAtIso = localInputToIso(endsAt)
    if (endsAtIso && endsAtIso <= startsAtIso) {
      setError('End time must be after the start time')
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
        starts_at: startsAtIso,
        ends_at: endsAtIso,
      })

      if (createError) throw createError

      setTitle('')
      setBody('')
      setStartsAt('')
      setEndsAt('')
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

  const handleUnRsvp = async (eventId: string, responseId: string) => {
    setRsvpingId(eventId)
    setError('')
    try {
      const { error: deleteError } = await supabase.from('responses').delete().eq('id', responseId)
      if (deleteError) throw deleteError
      if (container) await fetchEvents(container.id)
    } catch (err: any) {
      setError(err.message || 'Failed to cancel RSVP')
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
              <label htmlFor="body">Description (include location):</label>
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
                <label htmlFor="starts_at">Starts:</label>
                <input
                  id="starts_at"
                  type="datetime-local"
                  value={startsAt}
                  onChange={(e) => setStartsAt(e.target.value)}
                  required
                  style={{ width: '100%', padding: '0.5rem', marginTop: '0.5rem' }}
                />
              </div>
              <div style={{ flex: 1 }}>
                <label htmlFor="ends_at">Ends (optional):</label>
                <input
                  id="ends_at"
                  type="datetime-local"
                  value={endsAt}
                  onChange={(e) => setEndsAt(e.target.value)}
                  style={{ width: '100%', padding: '0.5rem', marginTop: '0.5rem' }}
                />
              </div>
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
            const { confirmedCount, waitlistedCount, full, myResponseId, myStatus } = rsvpStatus(
              ev,
              user?.id
            )

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
                {ev.starts_at && (
                  <p style={{ fontWeight: 'bold', margin: '0 0 0.5rem' }}>
                    {new Date(ev.starts_at).toLocaleString()}
                    {ev.ends_at && <> &ndash; {new Date(ev.ends_at).toLocaleString()}</>}
                  </p>
                )}
                <p style={{ whiteSpace: 'pre-wrap' }}>{ev.body}</p>
                <small>
                  Posted by {ev.users?.email || 'Unknown'} on{' '}
                  {new Date(ev.created_at).toLocaleDateString()}
                  {ev.capacity != null && (
                    <>
                      {' '}
                      &middot; {confirmedCount}/{ev.capacity} confirmed
                      {waitlistedCount > 0 && <> &middot; {waitlistedCount} waitlisted</>}
                    </>
                  )}
                </small>
                <div style={{ marginTop: '0.75rem' }}>
                  {!canRsvp ? null : myResponseId ? (
                    <>
                      <span style={{ marginRight: '0.75rem' }}>
                        {myStatus === 'waitlisted' ? "You're on the waitlist" : "You're confirmed"}
                      </span>
                      <button
                        onClick={() => handleUnRsvp(ev.id, myResponseId)}
                        disabled={rsvpingId === ev.id}
                      >
                        {rsvpingId === ev.id ? 'Cancelling...' : 'Cancel RSVP'}
                      </button>
                    </>
                  ) : (
                    <button onClick={() => handleRsvp(ev.id)} disabled={rsvpingId === ev.id}>
                      {rsvpingId === ev.id ? 'RSVPing...' : full ? 'Join waitlist' : 'RSVP'}
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
