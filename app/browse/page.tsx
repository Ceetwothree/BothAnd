// app/browse/page.tsx
'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import { listPublicOrgs, joinPublicOrg, Org } from '@/lib/orgs'

export default function BrowsePage() {
  const router = useRouter()
  const [orgs, setOrgs] = useState<Org[]>([])
  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState<any>(null)
  const [joiningId, setJoiningId] = useState<string | null>(null)
  const [error, setError] = useState('')

  useEffect(() => {
    const load = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser()
      setUser(user)

      try {
        const data = await listPublicOrgs()
        setOrgs(data)
      } catch (err: any) {
        setError(err.message || 'Failed to load organizations')
      } finally {
        setLoading(false)
      }
    }

    load()
  }, [])

  const handleJoin = async (org: Org) => {
    if (!user) {
      router.push('/login?redirect=/browse')
      return
    }

    setJoiningId(org.id)
    setError('')
    try {
      await joinPublicOrg(org.id)
      router.push(`/org/${org.slug}`)
    } catch (err: any) {
      setError(err.message || 'Failed to join')
      setJoiningId(null)
    }
  }

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '2rem' }}>
      <header style={{ marginBottom: '2rem', borderBottom: '1px solid #ddd', paddingBottom: '1rem' }}>
        <h1>Browse organizations</h1>
        <nav>
          <Link href="/">Home</Link>
        </nav>
      </header>

      <main>
        {error && <div style={{ color: 'red', marginBottom: '1rem' }}>{error}</div>}
        {loading ? (
          <p>Loading...</p>
        ) : orgs.length === 0 ? (
          <p>No public organizations yet.</p>
        ) : (
          <div>
            {orgs.map((org) => (
              <div
                key={org.id}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginBottom: '0.75rem',
                  padding: '1rem',
                  border: '1px solid #eee',
                  borderRadius: '4px',
                }}
              >
                <Link href={`/org/${org.slug}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                  <strong>{org.name}</strong>
                </Link>
                <button onClick={() => handleJoin(org)} disabled={joiningId === org.id}>
                  {joiningId === org.id ? 'Joining...' : 'Join'}
                </button>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  )
}
