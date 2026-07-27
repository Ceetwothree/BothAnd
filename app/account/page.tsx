// app/account/page.tsx
// Global (not org-scoped) account settings -- currently just self-service
// deletion. Deliberately its own page rather than folded into an org's
// Settings, since an account can belong to zero, one, or many orgs.
'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { supabase } from '@/lib/supabase'
import { deleteOwnAccount } from '@/lib/orgs'

export default function AccountPage() {
  const [email, setEmail] = useState<string | null>(null)
  const [checking, setChecking] = useState(true)
  const [deleting, setDeleting] = useState(false)
  const [error, setError] = useState('')
  const router = useRouter()

  useEffect(() => {
    let cancelled = false
    supabase.auth.getUser().then(({ data: { user } }) => {
      if (cancelled) return
      if (!user) {
        router.push('/login?redirect=/account')
        return
      }
      setEmail(user.email ?? null)
      setChecking(false)
    })
    return () => {
      cancelled = true
    }
  }, [router])

  const handleDelete = async () => {
    if (
      !window.confirm(
        'Delete your account? This deactivates your membership in every organization and removes your email from your profile. This cannot be undone from here.'
      )
    )
      return

    setError('')
    setDeleting(true)
    try {
      await deleteOwnAccount()
      await supabase.auth.signOut()
      window.location.href = '/'
    } catch (err: any) {
      setError(err.message || 'Failed to delete account')
      setDeleting(false)
    }
  }

  if (checking) {
    return <div style={{ maxWidth: '500px', margin: '4rem auto', padding: '2rem' }}>Loading...</div>
  }

  return (
    <div style={{ maxWidth: '500px', margin: '4rem auto', padding: '2rem' }}>
      <h1>Account</h1>
      <p>
        Signed in as <strong>{email}</strong>.
      </p>
      <p>
        <Link href="/">Back home</Link>
      </p>

      <section style={{ marginTop: '2.5rem', paddingTop: '1.5rem', borderTop: '1px solid #ddd' }}>
        <h2>Danger zone</h2>
        {error && <div style={{ color: 'red', marginBottom: '1rem' }}>{error}</div>}
        <p>
          Deletes your profile info and deactivates your membership everywhere. If you&apos;re
          the sole admin of an organization, promote someone else there first -- this will tell
          you which ones.
        </p>
        <p style={{ fontSize: '0.85rem', color: '#666' }}>
          This is a first-pass version: your login itself isn&apos;t fully removed yet, just
          deactivated and disconnected from any organization. A full removal is planned as a
          follow-up.
        </p>
        <button type="button" onClick={handleDelete} disabled={deleting}>
          {deleting ? 'Deleting...' : 'Delete my account'}
        </button>
      </section>
    </div>
  )
}
