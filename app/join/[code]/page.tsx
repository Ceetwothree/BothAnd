// app/join/[code]/page.tsx
'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { supabase } from '@/lib/supabase'
import { getOrgPreviewByInviteCode, joinOrgByInviteCode, OrgInvitePreview } from '@/lib/orgs'

export default function JoinByInvitePage({ params }: { params: { code: string } }) {
  const router = useRouter()
  const [checking, setChecking] = useState(true)
  const [preview, setPreview] = useState<OrgInvitePreview | null>(null)
  const [notFound, setNotFound] = useState(false)
  const [joining, setJoining] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    const load = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser()

      if (!user) {
        router.push(`/login?redirect=/join/${params.code}`)
        return
      }

      try {
        const result = await getOrgPreviewByInviteCode(params.code)
        if (!result) {
          setNotFound(true)
        } else {
          setPreview(result)
        }
      } catch (err: any) {
        setNotFound(true)
      } finally {
        setChecking(false)
      }
    }

    load()
  }, [params.code, router])

  const handleJoin = async () => {
    setJoining(true)
    setError('')
    try {
      await joinOrgByInviteCode(params.code)
      router.push(`/org/${preview?.slug}`)
    } catch (err: any) {
      setError(err.message || 'Failed to join')
      setJoining(false)
    }
  }

  if (checking) {
    return (
      <div style={{ maxWidth: '500px', margin: '4rem auto', padding: '2rem' }}>
        <p>Loading...</p>
      </div>
    )
  }

  if (notFound || !preview) {
    return (
      <div style={{ maxWidth: '500px', margin: '4rem auto', padding: '2rem' }}>
        <h1>Invalid invite</h1>
        <p>This invite link is invalid or has expired.</p>
        <Link href="/">Back home</Link>
      </div>
    )
  }

  return (
    <div style={{ maxWidth: '500px', margin: '4rem auto', padding: '2rem', textAlign: 'center' }}>
      {preview.logo_url && (
        <img
          src={preview.logo_url}
          alt={`${preview.name} logo`}
          style={{ height: '64px', width: '64px', objectFit: 'contain', marginBottom: '1rem' }}
        />
      )}
      <h1>You&apos;re invited to join {preview.name}</h1>
      {error && <div style={{ color: 'red', marginTop: '1rem' }}>{error}</div>}
      <button
        onClick={handleJoin}
        disabled={joining}
        style={{
          marginTop: '1.5rem',
          padding: '0.75rem 1.5rem',
          backgroundColor: '#0070f3',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: joining ? 'not-allowed' : 'pointer',
        }}
      >
        {joining ? 'Joining...' : `Join ${preview.name}`}
      </button>
    </div>
  )
}
