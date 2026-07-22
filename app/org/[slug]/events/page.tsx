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
// - Attendance (for grant reporting) only covers confirmed RSVPs -- no
//   walk-in/add-attendee flow for someone who shows up without RSVPing.
//   It's a staff/admin action on someone else's behalf, backed by the
//   responses_attendance_* RLS policies (self-scoped responses_write etc.
//   don't apply since the marker isn't the response's own user_id). Hours
//   are stored in the pre-existing, previously-unused `responses.qty`.
'use client'

import { useEffect, useState } from 'react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { supabase } from '@/lib/supabase'
import { useOrg } from '../OrgContext'
import { useContainer, ensureContainer } from '@/lib/containers'
import { canManageContainers, canManageEvents, canPost } from '@/lib/permissions'

interface RsvpResponse {
  id: string
  kind: string
  user_id: string
  qty: number | null
  created_at: string
  users: { email: string } | null
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
  attendance: RsvpResponse[]
}

const WEEKDAY_LABELS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
const MAX_OCCURRENCES = 366

// Walks day-by-day from firstStart through repeatUntil (inclusive),
// keeping firstStart's time-of-day on every occurrence, and keeps only the
// days whose weekday is in `weekdays`. No series/template is stored --
// each occurrence just becomes its own independent event record.
function generateOccurrenceDates(firstStart: Date, repeatUntil: Date, weekdays: number[]): Date[] {
  const dates: Date[] = []
  const cursor = new Date(firstStart)
  while (cursor <= repeatUntil) {
    if (weekdays.includes(cursor.getDay())) {
      dates.push(new Date(cursor))
    }
    cursor.setDate(cursor.getDate() + 1)
  }
  return dates
}

function rsvpStatus(ev: EventRecord, userId: string | undefined) {
  const ordered = [...ev.rsvps].sort((a, b) => a.created_at.localeCompare(b.created_at))
  const confirmed = ev.capacity != null ? ordered.slice(0, ev.capacity) : ordered
  const waitlisted = ev.capacity != null ? ordered.slice(ev.capacity) : []

  const mine = ordered.find((r) => r.user_id === userId)
  const mineStatus = !mine ? null : confirmed.includes(mine) ? 'confirmed' : 'waitlisted'

  return {
    confirmed,
    confirmedCount: confirmed.length,
    waitlistedCount: waitlisted.length,
    full: ev.capacity != null && confirmed.length >= ev.capacity,
    myResponseId: mine?.id ?? null,
    myStatus: mineStatus as 'confirmed' | 'waitlisted' | null,
  }
}

// Prefills the hours field when marking someone attended: the event's own
// duration if it has one, otherwise blank for manual entry.
function defaultHours(ev: EventRecord): string {
  if (!ev.starts_at || !ev.ends_at) return ''
  const hours = (new Date(ev.ends_at).getTime() - new Date(ev.starts_at).getTime()) / (1000 * 60 * 60)
  return hours > 0 ? String(Math.round(hours * 10) / 10) : ''
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
  const [startsAt, setStartsAt] = useState<Date | null>(null)
  const [endsAt, setEndsAt] = useState<Date | null>(null)
  const [capacity, setCapacity] = useState('')
  const [creating, setCreating] = useState(false)
  const [rsvpingId, setRsvpingId] = useState<string | null>(null)
  const [error, setError] = useState('')

  // Keyed by `${eventId}:${userId}` -- tracks which attendance row is
  // mid-request, and the current hours-input draft for each.
  const [attendanceSaving, setAttendanceSaving] = useState<string | null>(null)
  const [hoursDrafts, setHoursDrafts] = useState<Record<string, string>>({})

  const [repeating, setRepeating] = useState(false)
  const [repeatWeekdays, setRepeatWeekdays] = useState<number[]>([])
  const [repeatUntil, setRepeatUntil] = useState<Date | null>(null)

  const occurrences =
    repeating && startsAt && repeatUntil && repeatWeekdays.length > 0
      ? generateOccurrenceDates(startsAt, repeatUntil, repeatWeekdays)
      : []
  const tooManyOccurrences = occurrences.length > MAX_OCCURRENCES

  const toggleWeekday = (day: number) => {
    setRepeatWeekdays((prev) => (prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day]))
  }

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
        responses(id, kind, user_id, qty, created_at, users!user_id(email))
        `
      )
      .eq('container_id', containerId)
      .eq('kind', 'event')

    if (!fetchError && data) {
      const rows = (data as any[]).map((r) => ({
        ...r,
        rsvps: (r.responses ?? []).filter((resp: any) => resp.kind === 'rsvp'),
        attendance: (r.responses ?? []).filter((resp: any) => resp.kind === 'attended'),
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

    if (!title || !body || !startsAt) {
      setError('Title, description, and start time are required')
      return
    }

    if (endsAt && endsAt <= startsAt) {
      setError('End time must be after the start time')
      return
    }

    if (repeating) {
      if (!repeatUntil || repeatWeekdays.length === 0) {
        setError('Pick at least one day of the week and a repeat-until date')
        return
      }
      if (occurrences.length === 0) {
        setError('No occurrences fall in that range -- check the repeat-until date')
        return
      }
      if (tooManyOccurrences) {
        setError(
          `That would create ${occurrences.length} events -- narrow the date range to ${MAX_OCCURRENCES} or fewer`
        )
        return
      }
    }

    const durationMs = endsAt ? endsAt.getTime() - startsAt.getTime() : null
    const dates = repeating ? occurrences : [startsAt]

    setCreating(true)
    try {
      const rows = dates.map((d) => ({
        container_id: container.id,
        kind: 'event',
        owner_id: user.id,
        title,
        body,
        state: 'open',
        capacity: capacity ? parseInt(capacity, 10) : null,
        starts_at: d.toISOString(),
        ends_at: durationMs != null ? new Date(d.getTime() + durationMs).toISOString() : null,
      }))

      const { error: createError } = await supabase.from('records').insert(rows)

      if (createError) throw createError

      setTitle('')
      setBody('')
      setStartsAt(null)
      setEndsAt(null)
      setCapacity('')
      setRepeating(false)
      setRepeatWeekdays([])
      setRepeatUntil(null)
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

  const handleMarkAttended = async (eventId: string, attendeeUserId: string, hours: string) => {
    const key = `${eventId}:${attendeeUserId}`
    setAttendanceSaving(key)
    setError('')
    try {
      const { error: attendError } = await supabase.from('responses').insert({
        record_id: eventId,
        user_id: attendeeUserId,
        kind: 'attended',
        qty: hours ? parseFloat(hours) : null,
      })
      if (attendError) throw attendError
      if (container) await fetchEvents(container.id)
    } catch (err: any) {
      setError(err.message || 'Failed to mark attendance')
    } finally {
      setAttendanceSaving(null)
    }
  }

  const handleUnmarkAttended = async (eventId: string, responseId: string) => {
    const key = `${eventId}:${responseId}`
    setAttendanceSaving(key)
    setError('')
    try {
      const { error: deleteError } = await supabase.from('responses').delete().eq('id', responseId)
      if (deleteError) throw deleteError
      if (container) await fetchEvents(container.id)
    } catch (err: any) {
      setError(err.message || 'Failed to unmark attendance')
    } finally {
      setAttendanceSaving(null)
    }
  }

  const handleSaveHours = async (eventId: string, responseId: string, hours: string) => {
    const key = `${eventId}:${responseId}`
    setAttendanceSaving(key)
    setError('')
    try {
      const { error: updateError } = await supabase
        .from('responses')
        .update({ qty: hours ? parseFloat(hours) : null })
        .eq('id', responseId)
      if (updateError) throw updateError
      if (container) await fetchEvents(container.id)
    } catch (err: any) {
      setError(err.message || 'Failed to save hours')
    } finally {
      setAttendanceSaving(null)
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
                <br />
                <DatePicker
                  id="starts_at"
                  selected={startsAt}
                  onChange={(date: Date | null) => setStartsAt(date)}
                  showTimeSelect
                  timeIntervals={15}
                  dateFormat="MMMM d, yyyy h:mm aa"
                  placeholderText="Pick a date and time"
                  wrapperClassName="bothand-datepicker"
                  required
                />
              </div>
              <div style={{ flex: 1 }}>
                <label htmlFor="ends_at">Ends (optional):</label>
                <br />
                <DatePicker
                  id="ends_at"
                  selected={endsAt}
                  onChange={(date: Date | null) => setEndsAt(date)}
                  showTimeSelect
                  timeIntervals={15}
                  dateFormat="MMMM d, yyyy h:mm aa"
                  placeholderText="Pick a date and time"
                  minDate={startsAt ?? undefined}
                  wrapperClassName="bothand-datepicker"
                  isClearable
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

            <div style={{ marginBottom: '1rem' }}>
              <label>
                <input
                  type="checkbox"
                  checked={repeating}
                  onChange={(e) => setRepeating(e.target.checked)}
                  style={{ marginRight: '0.5rem' }}
                />
                Repeat this event (generate a season of shifts)
              </label>
            </div>

            {repeating && (
              <div
                style={{
                  marginBottom: '1rem',
                  padding: '1rem',
                  border: '1px solid #eee',
                  borderRadius: '4px',
                }}
              >
                <div style={{ marginBottom: '0.75rem' }}>
                  <button type="button" onClick={() => setRepeatWeekdays([0, 1, 2, 3, 4, 5, 6])}>
                    Every day
                  </button>{' '}
                  <button
                    type="button"
                    onClick={() => setRepeatWeekdays(startsAt ? [startsAt.getDay()] : [])}
                    disabled={!startsAt}
                  >
                    Weekly (same day)
                  </button>
                </div>

                <div style={{ marginBottom: '0.75rem' }}>
                  {WEEKDAY_LABELS.map((label, day) => (
                    <label key={day} style={{ marginRight: '0.75rem' }}>
                      <input
                        type="checkbox"
                        checked={repeatWeekdays.includes(day)}
                        onChange={() => toggleWeekday(day)}
                        style={{ marginRight: '0.25rem' }}
                      />
                      {label}
                    </label>
                  ))}
                </div>

                <label htmlFor="repeat_until">Repeat until:</label>
                <br />
                <DatePicker
                  id="repeat_until"
                  selected={repeatUntil}
                  onChange={(date: Date | null) => setRepeatUntil(date)}
                  minDate={startsAt ?? undefined}
                  dateFormat="MMMM d, yyyy"
                  placeholderText="Pick an end date"
                  wrapperClassName="bothand-datepicker"
                />

                <p style={{ marginTop: '0.75rem' }}>
                  {occurrences.length === 0
                    ? 'Pick a start time, at least one day of the week, and a repeat-until date.'
                    : tooManyOccurrences
                      ? `That's ${occurrences.length} events -- narrow the range to ${MAX_OCCURRENCES} or fewer.`
                      : `This will create ${occurrences.length} event${occurrences.length === 1 ? '' : 's'}, one per matching day through ${repeatUntil?.toLocaleDateString()}.`}
                </p>
              </div>
            )}

            <button
              type="submit"
              disabled={creating || (repeating && (occurrences.length === 0 || tooManyOccurrences))}
              style={{
                padding: '0.75rem 1.5rem',
                backgroundColor: '#0070f3',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: creating ? 'not-allowed' : 'pointer',
              }}
            >
              {creating
                ? 'Creating...'
                : repeating && occurrences.length > 0
                  ? `Create ${occurrences.length} event${occurrences.length === 1 ? '' : 's'}`
                  : 'Create event'}
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
            const { confirmed, confirmedCount, waitlistedCount, full, myResponseId, myStatus } =
              rsvpStatus(ev, user?.id)
            const attendanceByUser = new Map(ev.attendance.map((a) => [a.user_id, a]))
            const totalHours = ev.attendance.reduce((sum, a) => sum + (a.qty ?? 0), 0)

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

                {canCreate && confirmed.length > 0 && (
                  <div
                    style={{
                      marginTop: '1rem',
                      paddingTop: '0.75rem',
                      borderTop: '1px solid #f0f0f0',
                    }}
                  >
                    <strong>Attendance</strong>
                    {totalHours > 0 && <span> &middot; {totalHours} hour{totalHours === 1 ? '' : 's'} logged</span>}
                    {confirmed.map((rsvp) => {
                      const attended = attendanceByUser.get(rsvp.user_id)
                      const key = `${ev.id}:${attended ? attended.id : rsvp.user_id}`
                      const draft = hoursDrafts[key] ?? (attended ? String(attended.qty ?? '') : defaultHours(ev))

                      return (
                        <div
                          key={rsvp.user_id}
                          style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '0.5rem' }}
                        >
                          <label style={{ flex: 1 }}>
                            <input
                              type="checkbox"
                              checked={!!attended}
                              disabled={attendanceSaving === key}
                              onChange={(e) => {
                                if (e.target.checked) {
                                  handleMarkAttended(ev.id, rsvp.user_id, draft)
                                } else if (attended) {
                                  handleUnmarkAttended(ev.id, attended.id)
                                }
                              }}
                              style={{ marginRight: '0.5rem' }}
                            />
                            {rsvp.users?.email || 'Unknown'}
                          </label>
                          {attended && (
                            <>
                              <input
                                type="number"
                                min={0}
                                step={0.5}
                                value={draft}
                                onChange={(e) =>
                                  setHoursDrafts((prev) => ({ ...prev, [key]: e.target.value }))
                                }
                                onBlur={() => handleSaveHours(ev.id, attended.id, draft)}
                                disabled={attendanceSaving === key}
                                style={{ width: '5rem', padding: '0.25rem' }}
                              />
                              <span>hrs</span>
                            </>
                          )}
                        </div>
                      )
                    })}
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
