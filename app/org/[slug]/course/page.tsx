// app/org/[slug]/course/page.tsx
//
// Kept deliberately minimal, per tonight's roadmap notes: no progression
// tracking beyond "have I submitted for this lesson yet" -- lowest-demand
// workflow of the four, not worth over-building sight unseen.
//
// Same responses-have-no-DELETE/UPDATE-policy gap as Events' RSVPs: once
// submitted, a submission can't be edited or resubmitted until a future
// migration adds that policy.
'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { useOrg } from '../OrgContext'
import { useContainer, ensureContainer } from '@/lib/containers'
import { canManageContainers, canManageCourse, canPost } from '@/lib/permissions'

interface LessonRecord {
  id: string
  title: string | null
  body: string | null
  created_at: string
  mySubmission: string | null
}

export default function CoursePage() {
  const { org, role } = useOrg()
  const { container, loading: loadingContainer, setContainer } = useContainer(org.id, 'course')
  const [user, setUser] = useState<any>(null)
  const [lessons, setLessons] = useState<LessonRecord[]>([])
  const [loadingLessons, setLoadingLessons] = useState(true)

  const [settingUp, setSettingUp] = useState(false)
  const [title, setTitle] = useState('')
  const [body, setBody] = useState('')
  const [creating, setCreating] = useState(false)
  const [submissionDrafts, setSubmissionDrafts] = useState<Record<string, string>>({})
  const [submittingId, setSubmittingId] = useState<string | null>(null)
  const [error, setError] = useState('')

  const canSetUp = canManageContainers(role)
  const canAuthor = canManageCourse(role)
  const canSubmit = canPost(role)

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => setUser(data.user))
  }, [])

  const fetchLessons = async (containerId: string) => {
    setLoadingLessons(true)

    const { data, error: fetchError } = await supabase
      .from('records')
      .select(
        `
        id, title, body, created_at,
        responses(id, kind, user_id, body)
        `
      )
      .eq('container_id', containerId)
      .eq('kind', 'lesson')
      .order('created_at', { ascending: true })

    if (!fetchError && data) {
      const rows = (data as any[]).map((r) => {
        const mine = (r.responses ?? []).find(
          (resp: any) => resp.kind === 'submission' && resp.user_id === user?.id
        )
        return { ...r, mySubmission: mine?.body ?? null }
      })
      setLessons(rows)
    }

    setLoadingLessons(false)
  }

  useEffect(() => {
    if (container) fetchLessons(container.id)
    else setLoadingLessons(false)
  }, [container, user])

  const handleSetUp = async () => {
    setSettingUp(true)
    setError('')
    try {
      const c = await ensureContainer(org.id, 'course', 'Course', 'org')
      setContainer(c)
    } catch (err: any) {
      setError(err.message || 'Failed to set up Course')
    } finally {
      setSettingUp(false)
    }
  }

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!container || !user) return
    setError('')

    if (!title || !body) {
      setError('Title and content are required')
      return
    }

    setCreating(true)
    try {
      const { error: createError } = await supabase.from('records').insert({
        container_id: container.id,
        kind: 'lesson',
        owner_id: user.id,
        title,
        body,
        state: 'open',
      })

      if (createError) throw createError

      setTitle('')
      setBody('')
      await fetchLessons(container.id)
    } catch (err: any) {
      setError(err.message || 'Failed to create lesson')
    } finally {
      setCreating(false)
    }
  }

  const handleSubmit = async (lessonId: string) => {
    if (!user) return
    const text = submissionDrafts[lessonId]
    if (!text) return

    setSubmittingId(lessonId)
    setError('')
    try {
      const { error: submitError } = await supabase.from('responses').insert({
        record_id: lessonId,
        user_id: user.id,
        kind: 'submission',
        body: text,
      })

      if (submitError) throw submitError
      if (container) await fetchLessons(container.id)
    } catch (err: any) {
      setError(err.message || 'Failed to submit')
    } finally {
      setSubmittingId(null)
    }
  }

  if (loadingContainer) return <p>Loading...</p>

  if (!container) {
    return (
      <div>
        <h2>Course</h2>
        {canSetUp ? (
          <>
            <p>Course isn&apos;t set up for {org.name} yet.</p>
            {error && <div style={{ color: 'red', marginBottom: '1rem' }}>{error}</div>}
            <button onClick={handleSetUp} disabled={settingUp}>
              {settingUp ? 'Setting up...' : 'Set up Course'}
            </button>
          </>
        ) : (
          <p>Course isn&apos;t set up for {org.name} yet.</p>
        )}
      </div>
    )
  }

  return (
    <div>
      <h2>Course</h2>
      {error && <div style={{ color: 'red', marginBottom: '1rem' }}>{error}</div>}

      {canAuthor && (
        <section style={{ marginBottom: '2rem' }}>
          <h3>Add a lesson</h3>
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
              <label htmlFor="body">Content:</label>
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
              {creating ? 'Adding...' : 'Add lesson'}
            </button>
          </form>
        </section>
      )}

      <section>
        {loadingLessons ? (
          <p>Loading lessons...</p>
        ) : lessons.length === 0 ? (
          <p>No lessons yet.</p>
        ) : (
          lessons.map((lesson) => (
            <article
              key={lesson.id}
              style={{
                marginBottom: '1.5rem',
                padding: '1rem',
                border: '1px solid #eee',
                borderRadius: '4px',
              }}
            >
              <h3>{lesson.title}</h3>
              <p style={{ whiteSpace: 'pre-wrap' }}>{lesson.body}</p>

              {canSubmit && (
                <div style={{ marginTop: '0.75rem' }}>
                  {lesson.mySubmission ? (
                    <p>
                      <strong>Your submission:</strong> {lesson.mySubmission}
                    </p>
                  ) : (
                    <>
                      <textarea
                        placeholder="Your submission"
                        value={submissionDrafts[lesson.id] ?? ''}
                        onChange={(e) =>
                          setSubmissionDrafts((prev) => ({ ...prev, [lesson.id]: e.target.value }))
                        }
                        rows={3}
                        style={{ width: '100%', padding: '0.5rem', marginBottom: '0.5rem' }}
                      />
                      <button
                        onClick={() => handleSubmit(lesson.id)}
                        disabled={submittingId === lesson.id || !submissionDrafts[lesson.id]}
                      >
                        {submittingId === lesson.id ? 'Submitting...' : 'Submit'}
                      </button>
                    </>
                  )}
                </div>
              )}
            </article>
          ))
        )}
      </section>
    </div>
  )
}
