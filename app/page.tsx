// app/page.tsx
'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import Link from 'next/link'

export default function Home() {
  const [posts, setPosts] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState<any>(null)

  useEffect(() => {
    // Check if user is logged in
    const checkUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser()
      setUser(user)
    }
    checkUser()

    // Fetch forum posts from default org
    const fetchPosts = async () => {
      try {
        // Get default org
        const { data: org } = await supabase
          .from('orgs')
          .select('id')
          .eq('slug', process.env.NEXT_PUBLIC_DEFAULT_ORG_SLUG)
          .single()

        if (org) {
          // Get forum container
          const { data: container } = await supabase
            .from('containers')
            .select('id')
            .eq('org_id', org.id)
            .eq('kind', 'board')
            .eq('visibility', 'public')
            .single()

          if (container) {
            // Get posts
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
              .eq('container_id', container.id)
              .eq('kind', 'post')
              .order('created_at', { ascending: false })

            if (!error && data) {
              setPosts(data)
            }
          }
        }
      } catch (error) {
        console.error('Error fetching posts:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchPosts()
  }, [])

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '2rem' }}>
      <header style={{ marginBottom: '2rem', borderBottom: '1px solid #ddd', paddingBottom: '1rem' }}>
        <h1>The Mission</h1>
        <p>Coordination infrastructure for organizations that can't afford software.</p>
        <nav>
          {user ? (
            <>
              <Link href="/dashboard" style={{ marginRight: '1rem' }}>
                Dashboard
              </Link>
              <button onClick={() => supabase.auth.signOut()}>Logout</button>
            </>
          ) : (
            <>
              <Link href="/login" style={{ marginRight: '1rem' }}>
                Login
              </Link>
              <Link href="/signup">Sign Up</Link>
            </>
          )}
        </nav>
      </header>

      <main>
        <section>
          <h2>Forum</h2>
          {loading ? (
            <p>Loading posts...</p>
          ) : posts.length === 0 ? (
            <p>No posts yet. {user && <Link href="/dashboard">Create one</Link>}</p>
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
