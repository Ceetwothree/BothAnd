// app/org/[slug]/events/[eventId]/checkin/page.tsx
//
// The landing page for an event's check-in QR code (shown/printed from the
// Events page by staff). Self-check-in: any active member can mark
// themselves attended here -- no new RLS needed, since responses_write
// already permits inserting any response kind (including 'attended') for
// yourself as long as you're an active member of the event's org. Staff
// can still review, edit hours on, or remove any check-in (self- or
// staff-marked alike) from the existing Attendance section on the Events
// page, via the responses_attendance_* policies added for that feature --
// this page doesn't need its own review UI.
'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { supabase } from '@/lib/supabase'
import { useOrg } from '../../../OrgContext'
import { canPost } from '@/lib/permissions'

interface EventInfo {
  id: string
  title: string | null
  starts_at: string | null
  ends_at: string | null
}

export default function EventCheckinPage({ params }: { params: { slug: string; eventId: string } }) {
  const { org, role } = useOrg()
  const [user, setUser] = useState<any>(null)
  const [userLoaded, setUserLoaded] = useState(false)
  const [event, setEvent] = useState<EventInfo | null>(null)
  const [loadingEvent, setLoadingEvent] = useState(true)
  const [myResponseId, setMyResponseId] = useState<string | null>(null)
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState('')

  const canCheckIn = canPost(role)

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      setUser(data.user)
      setUserLoaded(true)
    })
  }, [])

  const fetchStatus = async (userId: string | null) => {
    const { data } = await supabase
      .from('records')
      .select('id, title, starts_at, ends_at')
      .eq('id', params.eventId)
      .eq('kind', 'event')
      .single()

    setEvent(data ?? null)

    if (data && userId) {
      const { data: existing } = await supabase
        .from('responses')
        .select('id')
        .eq('record_id', params.eventId)
        .eq('kind', 'attended')
        .eq('user_id', userId)
        .maybeSingle()

      setMyResponseId(existing?.id ?? null)
    }

    setLoadingEvent(false)
  }

  useEffect(() => {
    if (userLoaded) fetchStatus(user?.id ?? null)
  }, [userLoaded, user])

  const handleCheckIn = async () => {
    if (!user) return
    setBusy(true)
    setError('')
    try {
      const { data, error: insertError } = await supabase
        .from('responses')
        .insert({ record_id: params.eventId, user_id: user.id, kind: 'attended' })
        .select('id')
        .single()

      if (insertError) throw insertError
      setMyResponseId(data.id)
    } catch (err: any) {
      setError(err.message || 'Failed to check in')
    } finally {
      setBusy(false)
    }
  }

  const handleUndo = async () => {
    if (!myResponseId) return
    setBusy(true)
    setError('')
    try {
      const { error: deleteError } = await supabase.from('responses').delete().eq('id', myResponseId)
      if (deleteError) throw deleteError
      setMyResponseId(null)
    } catch (err: any) {
      setError(err.message || 'Failed to undo check-in')
    } finally {
      setBusy(false)
    }
  }

  if (!userLoaded || loadingEvent) {
    return (
      <div style={{ maxWidth: '400px', margin: '4rem auto', padding: '2rem' }}>
        <p>Loading...</p>
      </div>
    )
  }

  if (!event) {
    return (
      <div style={{ maxWidth: '400px', margin: '4rem auto', padding: '2rem' }}>
        <h1>Event not found</h1>
        <p>This event doesn&apos;t exist, or you don&apos;t have access to it.</p>
      </div>
    )
  }

  if (!user) {
    const redirect = `/org/${params.slug}/events/${params.eventId}/checkin`
    return (
      <div style={{ maxWidth: '400px', margin: '4rem auto', padding: '2rem' }}>
        <h1>{event.title}</h1>
        <p>Log in to check in for this event.</p>
        <Link href={`/login?redirect=${encodeURIComponent(redirect)}`}>Log in</Link>
      </div>
    )
  }

  if (!canCheckIn) {
    return (
      <div style={{ maxWidth: '400px', margin: '4rem auto', padding: '2rem' }}>
        <h1>{event.title}</h1>
        <p>You need to be a member of {org.name} to check in.</p>
      </div>
    )
  }

  return (
    <div style={{ maxWidth: '400px', margin: '4rem auto', padding: '2rem' }}>
      <h1>{event.title}</h1>
      {event.starts_at && (
        <p>
          {new Date(event.starts_at).toLocaleString()}
          {event.ends_at && <> &ndash; {new Date(event.ends_at).toLocaleString()}</>}
        </p>
      )}
      {error && <div style={{ color: 'red', marginBottom: '1rem' }}>{error}</div>}

      {myResponseId ? (
        <>
          <p style={{ fontWeight: 'bold' }}>You&apos;re checked in.</p>
          <button onClick={handleUndo} disabled={busy}>
            {busy ? 'Undoing...' : "Undo (I didn't mean to check in)"}
          </button>
        </>
      ) : (
        <button
          onClick={handleCheckIn}
          disabled={busy}
          style={{
            padding: '0.75rem 1.5rem',
            backgroundColor: '#0070f3',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: busy ? 'not-allowed' : 'pointer',
          }}
        >
          {busy ? 'Checking in...' : "I'm here -- check me in"}
        </button>
      )}
    </div>
  )
}
