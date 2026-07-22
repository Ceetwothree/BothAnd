// app/org/[slug]/page.tsx
'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { supabase } from '@/lib/supabase'
import Banner from '../../components/Banner'
import { useOrg } from './OrgContext'
import { canManageOrgSettings, canManageMembers, canPost } from '@/lib/permissions'
import { joinPublicOrg } from '@/lib/orgs'

export default function OrgHomePage() {
  const { org, role } = useOrg()
  const [user, setUser] = useState<any>(null)
  const [containerId, setContainerId] = useState('')
  const [posts, setPosts] = useState<any[]>([])
  const [loadingPosts, setLoadingPosts] = useState(true)
  const [title, setTitle] = useState('')
  const [body, setBody] = useState('')
  const [posting, setPosting] = useState(false)
  const [error, setError] = useState('')
  const [joining, setJoining] = useState(false)

  const [editingId, setEditingId] = useState<string | null>(null)
  const [editTitle, setEditTitle] = useState('')
  const [editBody, setEditBody] = useState('')
  const [savingEdit, setSavingEdit] = useState(false)
  const [deletingId, setDeletingId] = useState<string | null>(null)
  const [commentDrafts, setCommentDrafts] = useState<Record<string, string>>({})
  const [commentingId, setCommentingId] = useState<string | null>(null)

  const isMember = canPost(role)

  const fetchPosts = async (cId: string) => {
    const { data, error } = await supabase
      .from('records')
      .select(
        `
        id,
        title,
        body,
        created_at,
        owner_id,
        users!owner_id(email),
        responses(id, kind, body, created_at, user_id, users!user_id(email))
        `
      )
      .eq('container_id', cId)
      .eq('kind', 'post')
      .order('created_at', { ascending: false })

    if (!error && data) {
      setPosts(
        data.map((post: any) => ({
          ...post,
          comments: (post.responses ?? [])
            .filter((r: any) => r.kind === 'comment')
            .sort((a: any, b: any) => a.created_at.localeCompare(b.created_at)),
        }))
      )
    }
  }

  useEffect(() => {
    const load = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser()
      setUser(user)

      const { data: container } = await supabase
        .from('containers')
        .select('id')
        .eq('org_id', org.id)
        .eq('kind', 'board')
        .single()

      if (container) {
        setContainerId(container.id)
        await fetchPosts(container.id)
      }

      setLoadingPosts(false)
    }

    load()
  }, [org.id])

  const handleCreatePost = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (!title || !body) {
      setError('Title and body are required')
      return
    }

    setPosting(true)
    try {
      const { error: createError } = await supabase
        .from('records')
        .insert({
          container_id: containerId,
          kind: 'post',
          owner_id: user.id,
          title,
          body,
          state: 'open',
        })
        .select()

      if (createError) throw createError

      setTitle('')
      setBody('')
      await fetchPosts(containerId)
    } catch (err: any) {
      setError(err.message || 'Failed to create post')
    } finally {
      setPosting(false)
    }
  }

  const startEdit = (post: any) => {
    setEditingId(post.id)
    setEditTitle(post.title)
    setEditBody(post.body)
  }

  const cancelEdit = () => {
    setEditingId(null)
    setEditTitle('')
    setEditBody('')
  }

  const handleSaveEdit = async (postId: string) => {
    setSavingEdit(true)
    setError('')
    try {
      const { error: updateError } = await supabase
        .from('records')
        .update({ title: editTitle, body: editBody })
        .eq('id', postId)

      if (updateError) throw updateError
      cancelEdit()
      await fetchPosts(containerId)
    } catch (err: any) {
      setError(err.message || 'Failed to save changes')
    } finally {
      setSavingEdit(false)
    }
  }

  const handleDeletePost = async (postId: string) => {
    if (!window.confirm('Delete this post? This cannot be undone.')) return
    setDeletingId(postId)
    setError('')
    try {
      const { error: deleteError } = await supabase.from('records').delete().eq('id', postId)
      if (deleteError) throw deleteError
      await fetchPosts(containerId)
    } catch (err: any) {
      setError(err.message || 'Failed to delete post')
    } finally {
      setDeletingId(null)
    }
  }

  const handleAddComment = async (postId: string) => {
    const draft = (commentDrafts[postId] ?? '').trim()
    if (!draft || !user) return

    setCommentingId(postId)
    setError('')
    try {
      const { error: commentError } = await supabase.from('responses').insert({
        record_id: postId,
        user_id: user.id,
        kind: 'comment',
        body: draft,
      })

      if (commentError) throw commentError
      setCommentDrafts((prev) => ({ ...prev, [postId]: '' }))
      await fetchPosts(containerId)
    } catch (err: any) {
      setError(err.message || 'Failed to add comment')
    } finally {
      setCommentingId(null)
    }
  }

  const handleJoin = async () => {
    setJoining(true)
    setError('')
    try {
      await joinPublicOrg(org.id)
      window.location.reload()
    } catch (err: any) {
      setError(err.message || 'Failed to join')
    } finally {
      setJoining(false)
    }
  }

  return (
    <div>
      <header style={{ marginBottom: '2rem' }}>
        <Banner org={org} />
        {org.mission_statement && (
          <p
            style={{
              marginTop: '1rem',
              fontSize: '1.1rem',
              fontStyle: 'italic',
              color: '#475569',
            }}
          >
            {org.mission_statement}
          </p>
        )}
        {(canManageOrgSettings(role) || canManageMembers(role)) && (
          <nav style={{ marginTop: '0.75rem', display: 'flex', gap: '1rem' }}>
            {canManageMembers(role) && <Link href={`/org/${org.slug}/members`}>Members</Link>}
            {canManageOrgSettings(role) && <Link href={`/org/${org.slug}/settings`}>Settings</Link>}
          </nav>
        )}
      </header>

      <main>
        {!user && (
          <p>
            <a href="/login">Log in</a> or <a href="/signup">sign up</a> to join {org.name}.
          </p>
        )}

        {user && !isMember && org.is_public && (
          <div style={{ marginBottom: '1.5rem' }}>
            {error && <div style={{ color: 'red', marginBottom: '1rem' }}>{error}</div>}
            <p>You&apos;re not a member of {org.name} yet.</p>
            <button onClick={handleJoin} disabled={joining}>
              {joining ? 'Joining...' : `Join ${org.name}`}
            </button>
          </div>
        )}

        {isMember && (
          <section style={{ marginBottom: '2rem' }}>
            <h2>Create a Post</h2>
            {error && <div style={{ color: 'red', marginBottom: '1rem' }}>{error}</div>}
            <form onSubmit={handleCreatePost}>
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
                <label htmlFor="body">Message:</label>
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
                disabled={posting}
                style={{
                  padding: '0.75rem 1.5rem',
                  backgroundColor: '#0070f3',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: posting ? 'not-allowed' : 'pointer',
                }}
              >
                {posting ? 'Posting...' : 'Post'}
              </button>
            </form>
          </section>
        )}

        <section>
          <h2>Forum</h2>
          {loadingPosts ? (
            <p>Loading posts...</p>
          ) : posts.length === 0 ? (
            <p>No posts yet.</p>
          ) : (
            <div>
              {posts.map((post: any) => (
                <article
                  key={post.id}
                  style={{
                    marginBottom: '1.5rem',
                    padding: '1rem',
                    border: '1px solid #eee',
                    borderRadius: '4px',
                  }}
                >
                  {editingId === post.id ? (
                    <div style={{ marginBottom: '1rem' }}>
                      <input
                        type="text"
                        value={editTitle}
                        onChange={(e) => setEditTitle(e.target.value)}
                        style={{ width: '100%', padding: '0.5rem', marginBottom: '0.5rem' }}
                      />
                      <textarea
                        value={editBody}
                        onChange={(e) => setEditBody(e.target.value)}
                        rows={4}
                        style={{ width: '100%', padding: '0.5rem', marginBottom: '0.5rem' }}
                      />
                      <button onClick={() => handleSaveEdit(post.id)} disabled={savingEdit}>
                        {savingEdit ? 'Saving...' : 'Save'}
                      </button>{' '}
                      <button type="button" onClick={cancelEdit} disabled={savingEdit}>
                        Cancel
                      </button>
                    </div>
                  ) : (
                    <>
                      <h3>{post.title}</h3>
                      <p>{post.body}</p>
                    </>
                  )}
                  <small>
                    Posted by {post.users?.email || 'Unknown'} on{' '}
                    {new Date(post.created_at).toLocaleDateString()}
                  </small>
                  {user && post.owner_id === user.id && editingId !== post.id && (
                    <div style={{ marginTop: '0.5rem' }}>
                      <button type="button" onClick={() => startEdit(post)}>
                        Edit
                      </button>{' '}
                      <button
                        type="button"
                        onClick={() => handleDeletePost(post.id)}
                        disabled={deletingId === post.id}
                      >
                        {deletingId === post.id ? 'Deleting...' : 'Delete'}
                      </button>
                    </div>
                  )}

                  <div style={{ marginTop: '1rem', paddingTop: '0.75rem', borderTop: '1px solid #f0f0f0' }}>
                    {(post.comments ?? []).map((comment: any) => (
                      <div key={comment.id} style={{ marginBottom: '0.5rem' }}>
                        <p style={{ margin: 0 }}>{comment.body}</p>
                        <small>
                          {comment.users?.email || 'Unknown'} on{' '}
                          {new Date(comment.created_at).toLocaleDateString()}
                        </small>
                      </div>
                    ))}

                    {isMember && (
                      <div style={{ marginTop: '0.5rem', display: 'flex', gap: '0.5rem' }}>
                        <input
                          type="text"
                          placeholder="Add a comment..."
                          value={commentDrafts[post.id] ?? ''}
                          onChange={(e) =>
                            setCommentDrafts((prev) => ({ ...prev, [post.id]: e.target.value }))
                          }
                          style={{ flex: 1, padding: '0.5rem' }}
                        />
                        <button
                          type="button"
                          onClick={() => handleAddComment(post.id)}
                          disabled={commentingId === post.id || !(commentDrafts[post.id] ?? '').trim()}
                        >
                          {commentingId === post.id ? 'Posting...' : 'Comment'}
                        </button>
                      </div>
                    )}
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  )
}
