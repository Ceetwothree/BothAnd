// app/orgs/new/page.tsx
'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { supabase } from '@/lib/supabase'
import { createOrg } from '@/lib/orgs'

function slugify(input: string): string {
  return input
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

export default function NewOrgPage() {
  const router = useRouter()
  const [checkingAuth, setCheckingAuth] = useState(true)
  const [name, setName] = useState('')
  const [slug, setSlug] = useState('')
  const [slugEdited, setSlugEdited] = useState(false)
  const [isPublic, setIsPublic] = useState(false)
  const [creating, setCreating] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    const checkAuth = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser()

      if (!user) {
        router.push('/login?redirect=/orgs/new')
        return
      }

      setCheckingAuth(false)
    }

    checkAuth()
  }, [router])

  const handleNameChange = (value: string) => {
    setName(value)
    if (!slugEdited) setSlug(slugify(value))
  }

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (!name || !slug) {
      setError('Name and URL are required')
      return
    }

    setCreating(true)
    try {
      const org = await createOrg({ name, slug, isPublic })
      router.push(`/org/${org.slug}`)
    } catch (err: any) {
      setError(err.message || 'Failed to create organization')
      setCreating(false)
    }
  }

  if (checkingAuth) {
    return (
      <div style={{ maxWidth: '500px', margin: '4rem auto', padding: '2rem' }}>
        <p>Loading...</p>
      </div>
    )
  }

  return (
    <div style={{ maxWidth: '500px', margin: '0 auto', padding: '2rem' }}>
      <header style={{ marginBottom: '2rem', borderBottom: '1px solid #ddd', paddingBottom: '1rem' }}>
        <h1>Create an organization</h1>
        <nav>
          <Link href="/">Home</Link>
        </nav>
      </header>

      {error && <div style={{ color: 'red', marginBottom: '1rem' }}>{error}</div>}

      <form onSubmit={handleCreate}>
        <div style={{ marginBottom: '1rem' }}>
          <label htmlFor="name">Organization name:</label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => handleNameChange(e.target.value)}
            required
            style={{ width: '100%', padding: '0.5rem', marginTop: '0.5rem' }}
          />
        </div>

        <div style={{ marginBottom: '1rem' }}>
          <label htmlFor="slug">URL:</label>
          <div style={{ display: 'flex', alignItems: 'center', marginTop: '0.5rem' }}>
            <span style={{ marginRight: '0.25rem' }}>/org/</span>
            <input
              id="slug"
              type="text"
              value={slug}
              onChange={(e) => {
                setSlugEdited(true)
                setSlug(slugify(e.target.value))
              }}
              required
              style={{ flex: 1, padding: '0.5rem' }}
            />
          </div>
        </div>

        <div style={{ marginBottom: '1.5rem' }}>
          <label>
            <input
              type="checkbox"
              checked={isPublic}
              onChange={(e) => setIsPublic(e.target.checked)}
              style={{ marginRight: '0.5rem' }}
            />
            Public organization
          </label>
          <p>
            <small>
              {isPublic
                ? 'Anyone can find and join this org from /browse.'
                : "Invite-only -- you'll get a shareable invite link after creating it."}
            </small>
          </p>
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
          {creating ? 'Creating...' : 'Create organization'}
        </button>
      </form>
    </div>
  )
}
