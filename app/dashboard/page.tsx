// app/dashboard/page.tsx
'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import Link from 'next/link'

export default function DashboardPage() {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)
  const [posts, setPosts] = useState([])
  const [title, setTitle] = useState('')
  const [body, setBody] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [containerId, setContainerId] = useState('')

  useEffect(() => {
    const checkAuth = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser()

      if (!user) {
        router.push('/login')
        return
      }

      setUser(user)

      // Get forum container
      const { data: org } = await supabase
        .from('orgs')
        .select('id')
        .eq('slug', process.env.NEXT_PUBLIC_DEFAULT_ORG_SLUG)
        .single()

      if (org) {
        const { data: container } = await supabase
          .from('containers')
          .select('id')
          .eq('org_id', org.id)
          .eq('kind', 'board')
          .single()

        if (container) {
          setContainerId(container.id)
          fetchPosts(container.id)
        }
      }
    }

    checkAuth()
  }, [router])

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

    if (!error && data) {
      setPosts(data)
    }
  }

  const handleCreatePost = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      if (!title || !body) {
        setError('Title and body are required')
        return
      }

      const { data, error: createError } = await supabase
        .from('records')
        .insert({
          container_id: containerId,
          kind: 'post',
          owner_id: user?.id,
          title,
          body,
          state: 'open',
        })
        .select()

      if (createError) throw createError

      setTitle('')
      setBody('')
      fetchPosts(containerId)
    } catch (err: any) {
      setError(err.message || 'Failed to create post')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '2rem' }}>
      <header style={{ marginBottom: '2rem', borderBottom: '1px solid #ddd', paddingBottom: '1rem' }}>
        <h1>Dashboard</h1>
        <p>Welcome, {user?.email}</p>
        <nav>
          <Link href="/" style={{ marginRight: '1rem' }}>
            Home
          </Link>
          <button onClick={() => supabase.auth.signOut()}>Logout</button>
        </nav>
      </header>

      <main>
        <section>
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
              disabled={loading}
              style={{
                padding: '0.75rem 1.5rem',
                backgroundColor: '#0070f3',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: loading ? 'not-allowed' : 'pointer',
              }}
            >
              {loading ? 'Posting...' : 'Post'}
            </button>
          </form>
        </section>

        <section style={{ marginTop: '2rem' }}>
          <h2>Your Posts</h2>
          {posts.filter((p: any) => p.owner_id === user?.id).length === 0 ? (
            <p>No posts yet.</p>
          ) : (
            <div>
              {posts
                .filter((p: any) => p.owner_id === user?.id)
                .map((post: any) => (
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
                    <small>{new Date(post.created_at).toLocaleDateString()}</small>
                  </article>
                ))}
            </div>
          )}
        </section>
      </main>
    </div>
  )
}
