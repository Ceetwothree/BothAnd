// app/org/[slug]/course/page.tsx
//
// "Editing" a submission is delete-then-resubmit rather than an inline
// edit form -- simpler, and reuses the same insert flow.
//
// Progress tracking is just "N of M lessons submitted" -- no per-lesson
// completion state beyond having submitted, matching the workflow's
// original minimal scope.
//
// Feedback: the course author isn't the submission's own user_id, so
// responses_update_own (self-scoped) doesn't cover setting it --
// responses_submission_feedback (staff/admin, same shape as the
// responses_attendance_* policies) does. Reads need no RLS change: any
// active member can already read any other member's responses in an
// org-visibility container (course containers are always 'org'), so the
// author view below just queries every submission per lesson instead of
// filtering to the viewer's own, same data, wider client-side query.
'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { useOrg } from '../OrgContext'
import { useContainer, ensureContainer } from '@/lib/containers'
import { canManageContainers, canManageCourse, canPost } from '@/lib/permissions'

interface Submission {
  id: string
  user_id: string
  body: string
  feedback: string | null
  users: { email: string } | null
}

interface LessonRecord {
  id: string
  title: string | null
  body: string | null
  created_at: string
  submissions: Submission[]
  mySubmission: Submission | null
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
  const [feedbackDrafts, setFeedbackDrafts] = useState<Record<string, string>>({})
  const [savingFeedbackId, setSavingFeedbackId] = useState<string | null>(null)
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
        responses(id, kind, user_id, body, feedback, users!user_id(email))
        `
      )
      .eq('container_id', containerId)
      .eq('kind', 'lesson')
      .order('created_at', { ascending: true })

    if (!fetchError && data) {
      const rows = (data as any[]).map((r) => {
        const submissions = (r.responses ?? []).filter((resp: any) => resp.kind === 'submission')
        const mine = submissions.find((resp: any) => resp.user_id === user?.id)
        return { ...r, submissions, mySubmission: mine ?? null }
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

  const handleDeleteSubmission = async (lessonId: string, submissionId: string) => {
    setSubmittingId(lessonId)
    setError('')
    try {
      const { error: deleteError } = await supabase.from('responses').delete().eq('id', submissionId)
      if (deleteError) throw deleteError
      if (container) await fetchLessons(container.id)
    } catch (err: any) {
      setError(err.message || 'Failed to delete submission')
    } finally {
      setSubmittingId(null)
    }
  }

  const handleSaveFeedback = async (submissionId: string, feedback: string) => {
    setSavingFeedbackId(submissionId)
    setError('')
    try {
      const { error: updateError } = await supabase
        .from('responses')
        .update({ feedback: feedback || null })
        .eq('id', submissionId)
      if (updateError) throw updateError
      if (container) await fetchLessons(container.id)
    } catch (err: any) {
      setError(err.message || 'Failed to save feedback')
    } finally {
      setSavingFeedbackId(null)
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
        {!loadingLessons && canSubmit && lessons.length > 0 && (
          <p>
            <strong>Your progress:</strong>{' '}
            {lessons.filter((l) => l.mySubmission).length} of {lessons.length} lessons submitted
          </p>
        )}

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
                    <>
                      <p>
                        <strong>Your submission:</strong> {lesson.mySubmission.body}
                      </p>
                      {lesson.mySubmission.feedback && (
                        <p>
                          <strong>Feedback:</strong> {lesson.mySubmission.feedback}
                        </p>
                      )}
                      <button
                        onClick={() => handleDeleteSubmission(lesson.id, lesson.mySubmission!.id)}
                        disabled={submittingId === lesson.id}
                      >
                        {submittingId === lesson.id ? 'Deleting...' : 'Delete and resubmit'}
                      </button>
                    </>
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

              {canAuthor && lesson.submissions.length > 0 && (
                <div style={{ marginTop: '1rem', paddingTop: '0.75rem', borderTop: '1px solid #f0f0f0' }}>
                  <strong>Submissions ({lesson.submissions.length})</strong>
                  {lesson.submissions.map((sub) => {
                    const draft = feedbackDrafts[sub.id] ?? sub.feedback ?? ''

                    return (
                      <div key={sub.id} style={{ marginTop: '0.5rem' }}>
                        <p style={{ margin: 0 }}>
                          <strong>{sub.users?.email || 'Unknown'}:</strong> {sub.body}
                        </p>
                        <textarea
                          placeholder="Feedback"
                          value={draft}
                          onChange={(e) =>
                            setFeedbackDrafts((prev) => ({ ...prev, [sub.id]: e.target.value }))
                          }
                          rows={2}
                          style={{ width: '100%', padding: '0.5rem', marginTop: '0.25rem' }}
                        />
                        <button
                          onClick={() => handleSaveFeedback(sub.id, draft)}
                          disabled={savingFeedbackId === sub.id}
                        >
                          {savingFeedbackId === sub.id ? 'Saving...' : 'Save feedback'}
                        </button>
                      </div>
                    )
                  })}
                </div>
              )}
            </article>
          ))
        )}
      </section>
    </div>
  )
}
