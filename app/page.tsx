// app/page.tsx
'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import Link from 'next/link'
import { useUserOrgs, UserOrgMembership } from '@/lib/orgs'

// BothAnd's own accent -- the marketing site isn't an org, so it isn't
// governed by lib/branding.ts's per-org palette; this is fixed.
const ACCENT = '#2563eb'
const INK = '#0f172a'
const MUTED = '#64748b'

export default function Home() {
  const router = useRouter()
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

  // A signed-in visitor with exactly one org has nowhere else to go -- send
  // them straight there instead of making them click through a picker.
  useEffect(() => {
    if (!checkingUser && user && !loadingOrgs && orgs.length === 1) {
      router.replace(`/org/${orgs[0].org.slug}`)
    }
  }, [checkingUser, user, loadingOrgs, orgs, router])

  if (checkingUser || (user && loadingOrgs) || (user && orgs.length === 1)) {
    return (
      <div style={{ maxWidth: '960px', margin: '0 auto', padding: '4rem 2rem' }}>
        <p style={{ color: MUTED }}>Loading...</p>
      </div>
    )
  }

  if (user) {
    return <SignedInHub orgs={orgs} />
  }

  return <MarketingHome />
}

function SiteHeader({ right }: { right: React.ReactNode }) {
  return (
    <header
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '1.5rem 0',
      }}
    >
      <span style={{ fontSize: '1.25rem', fontWeight: 700, color: INK }}>BothAnd</span>
      <nav style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>{right}</nav>
    </header>
  )
}

function SignedInHub({ orgs }: { orgs: UserOrgMembership[] }) {
  return (
    <div style={{ maxWidth: '960px', margin: '0 auto', padding: '0 2rem 4rem' }}>
      <SiteHeader
        right={
          <>
            <Link href="/browse" style={{ color: MUTED, textDecoration: 'none' }}>
              Browse
            </Link>
            <Link href="/orgs/new" style={{ color: MUTED, textDecoration: 'none' }}>
              Create org
            </Link>
            <button
              onClick={() => supabase.auth.signOut()}
              style={{
                border: `1px solid #e2e8f0`,
                background: 'none',
                borderRadius: '6px',
                padding: '0.5rem 1rem',
                cursor: 'pointer',
                color: INK,
              }}
            >
              Log out
            </button>
          </>
        }
      />

      <section style={{ marginTop: '2rem' }}>
        <h1 style={{ fontSize: '1.5rem', color: INK, marginBottom: '1rem' }}>Your organizations</h1>
        {orgs.length === 0 ? (
          <div
            style={{
              border: '1px solid #e2e8f0',
              borderRadius: '8px',
              padding: '2rem',
              color: MUTED,
            }}
          >
            <p style={{ marginTop: 0 }}>You&apos;re not part of any organization yet.</p>
            <p style={{ marginBottom: 0 }}>
              <Link href="/browse" style={{ color: ACCENT }}>
                Browse public organizations
              </Link>{' '}
              or{' '}
              <Link href="/orgs/new" style={{ color: ACCENT }}>
                create your own
              </Link>
              .
            </p>
          </div>
        ) : (
          <div style={{ display: 'grid', gap: '0.75rem' }}>
            {orgs.map(({ org, role }) => (
              <Link
                key={org.id}
                href={`/org/${org.slug}`}
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '1rem 1.25rem',
                  border: '1px solid #e2e8f0',
                  borderRadius: '8px',
                  textDecoration: 'none',
                  color: 'inherit',
                }}
              >
                <strong style={{ color: INK }}>{org.name}</strong>
                <small style={{ color: MUTED }}>{role}</small>
              </Link>
            ))}
          </div>
        )}
      </section>
    </div>
  )
}

// Placeholder copy -- structure and framing are final, exact wording isn't.
// Swap in real language when it's ready; keep the section shapes below.
function MarketingHome() {
  return (
    <div style={{ maxWidth: '960px', margin: '0 auto', padding: '0 2rem' }}>
      <SiteHeader
        right={
          <>
            <Link href="/login" style={{ color: MUTED, textDecoration: 'none' }}>
              Log in
            </Link>
            <Link
              href="/signup"
              style={{
                background: ACCENT,
                color: 'white',
                textDecoration: 'none',
                borderRadius: '6px',
                padding: '0.5rem 1.1rem',
                fontWeight: 500,
              }}
            >
              Sign up
            </Link>
          </>
        }
      />

      <section style={{ padding: '4rem 0 3rem', textAlign: 'center' }}>
        <h1
          style={{
            fontSize: '2.5rem',
            lineHeight: 1.2,
            color: INK,
            margin: '0 0 1rem',
          }}
        >
          Coordination infrastructure for organizations that can&apos;t afford software.
        </h1>
        <p
          style={{
            fontSize: '1.15rem',
            color: MUTED,
            maxWidth: '640px',
            margin: '0 auto 2rem',
          }}
        >
          One free account, any number of organizations. BothAnd gives small nonprofits and
          community groups the coordination tools bigger organizations pay thousands for —
          without the invoice.
        </p>
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link
            href="/signup"
            style={{
              background: ACCENT,
              color: 'white',
              textDecoration: 'none',
              borderRadius: '6px',
              padding: '0.75rem 1.5rem',
              fontWeight: 500,
            }}
          >
            Sign up
          </Link>
          <Link
            href="/browse"
            style={{
              border: '1px solid #e2e8f0',
              color: INK,
              textDecoration: 'none',
              borderRadius: '6px',
              padding: '0.75rem 1.5rem',
              fontWeight: 500,
            }}
          >
            Browse public organizations
          </Link>
        </div>
      </section>

      <section
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          gap: '1.5rem',
          padding: '2rem 0 4rem',
          borderTop: '1px solid #e2e8f0',
        }}
      >
        {[
          {
            title: 'One account, many organizations',
            body: 'Join or create as many organizations as you’re part of and switch between them — no separate logins, no per-org signup.',
          },
          {
            title: 'Free-tier by design',
            body: 'Built to run on free hosting and database tiers, so the cost of running it never competes with your mission’s budget.',
          },
          {
            title: 'Real access control',
            body: 'Row-level security enforces who can see and do what at the database layer — public boards, private orgs, invite-only membership.',
          },
        ].map((f) => (
          <div key={f.title}>
            <h2 style={{ fontSize: '1.05rem', color: INK, margin: '0 0 0.5rem' }}>{f.title}</h2>
            <p style={{ color: MUTED, margin: 0, lineHeight: 1.5 }}>{f.body}</p>
          </div>
        ))}
      </section>

      <footer
        style={{
          borderTop: '1px solid #e2e8f0',
          padding: '2rem 0',
          color: MUTED,
          fontSize: '0.9rem',
          textAlign: 'center',
        }}
      >
        BothAnd
      </footer>
    </div>
  )
}
