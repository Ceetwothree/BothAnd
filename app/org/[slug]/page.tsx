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
        users!owner_id(email)
        `
      )
      .eq('container_id', cId)
      .eq('kind', 'post')
      .order('created_at', { ascending: false })

    if (!error && data) setPosts(data)
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
                  <h3>{post.title}</h3>
                  <p>{post.body}</p>
                  <small>
                    Posted by {post.users?.email || 'Unknown'} on{' '}
                    {new Date(post.created_at).toLocaleDateString()}
                  </small>
                </article>
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  )
}
