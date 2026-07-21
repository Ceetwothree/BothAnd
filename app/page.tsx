// app/page.tsx
'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import Link from 'next/link'
import { useUserOrgs } from '@/lib/orgs'

export default function Home() {
  const [user, setUser] = useState<any>(null)
  const [checkingUser, setCheckingUser] = useState(true)
  const { orgs, loading: loadingOrgs } = useUserOrgs()

  useEffect(() => {
    const checkUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser()
      setUser(user)
      setCheckingUser(false)
    }
    checkUser()
  }, [])

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '2rem' }}>
      <header style={{ marginBottom: '2rem', borderBottom: '1px solid #ddd', paddingBottom: '1rem' }}>
        <h1>BothAnd</h1>
        <p>Coordination infrastructure for organizations that can&apos;t afford software.</p>
        <nav>
          {user ? (
            <button onClick={() => supabase.auth.signOut()}>Logout</button>
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
        {checkingUser ? (
          <p>Loading...</p>
        ) : user ? (
          <>
            <section style={{ marginBottom: '2rem' }}>
              <h2>Your organizations</h2>
              {loadingOrgs ? (
                <p>Loading...</p>
              ) : orgs.length === 0 ? (
                <p>You&apos;re not part of any organization yet.</p>
              ) : (
                <div>
                  {orgs.map(({ org, role }) => (
                    <Link
                      key={org.id}
                      href={`/org/${org.slug}`}
                      style={{
                        display: 'block',
                        marginBottom: '0.75rem',
                        padding: '1rem',
                        border: '1px solid #eee',
                        borderRadius: '4px',
                        textDecoration: 'none',
                        color: 'inherit',
                      }}
                    >
                      <strong>{org.name}</strong> <small>({role})</small>
                    </Link>
                  ))}
                </div>
              )}
            </section>

            <section>
              <Link href="/browse" style={{ marginRight: '1rem' }}>
                Browse public organizations
              </Link>
              <Link href="/orgs/new">Create an organization</Link>
            </section>
          </>
        ) : (
          <section>
            <p>
              BothAnd is free-tier coordination infrastructure for organizations that can&apos;t afford
              software. One account, many organizations -- join one, or start your own.
            </p>
            <p>
              <Link href="/browse">Browse public organizations</Link> or{' '}
              <Link href="/signup">sign up</Link> to create your own.
            </p>
          </section>
        )}
      </main>
    </div>
  )
}
