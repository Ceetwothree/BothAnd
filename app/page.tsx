// app/page.tsx
'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import Link from 'next/link'
import { useUserOrgs, UserOrgMembership } from '@/lib/orgs'
import { SiteHeader, SiteFooter, SiteStyles } from './components/SiteChrome'

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

  // signOut() clears the Supabase session but doesn't touch this
  // component's own `user` state -- without a hard reload, the page kept
  // showing the logged-in header and "Your organizations" until a manual
  // refresh, even though the session was actually gone.
  const handleLogOut = async () => {
    await supabase.auth.signOut()
    window.location.href = '/'
  }

  // "/" is the one stable home -- clicking the BothAnd wordmark from
  // anywhere always lands here, logged in or not. No auto-redirect into an
  // org: that used to strand signed-in visitors with no way back to this
  // page at all. Signed-in visitors get a "Your organizations" section up
  // top instead, one click from their org, with the rest of the page (the
  // pitch, the workflow diagram, the About link) still reachable below it.
  return (
    <div className="lp-root">
      <SiteHeader
        right={
          checkingUser ? null : user ? (
            <>
              <Link href="/about" className="lp-nav-link">
                About
              </Link>
              <Link href="/browse" className="lp-nav-link">
                Browse
              </Link>
              <Link href="/orgs/new" className="lp-nav-link">
                Create org
              </Link>
              <button onClick={handleLogOut} className="lp-btn lp-btn-ghost">
                Log out
              </button>
            </>
          ) : (
            <>
              <Link href="/about" className="lp-nav-link">
                About
              </Link>
              <Link href="/login" className="lp-nav-link">
                Log in
              </Link>
            </>
          )
        }
      />

      {!checkingUser && user && <YourOrgsSection orgs={orgs} loading={loadingOrgs} />}

      <section className="lp-hero lp-hero-compact">
        <div className="lp-wrap">
          <div className="lp-hero-inner">
            <p className="lp-eyebrow lp-fade-up lp-d1">Free tools for community groups</p>
            <h1 className="lp-hero-small lp-fade-up lp-d2">
              A site for your group. <span className="lp-and">And</span> everything it needs.
            </h1>
            <div className="lp-cta-row lp-fade-up lp-d3">
              <Link href="/signup" className="lp-btn lp-btn-primary">
                Create your organization
              </Link>
              <Link href="/browse" className="lp-btn lp-btn-ghost">
                See who&apos;s already here
              </Link>
            </div>
          </div>
        </div>
      </section>

      <HowItWorks />

      <section className="lp-closing">
        <div className="lp-wrap">
          <h2>
            Bring your organization. <span className="lp-and">And</span> see how it fits.
          </h2>
          <div className="lp-cta-row lp-cta-row-center">
            <Link href="/signup" className="lp-btn lp-btn-primary">
              Create your organization
            </Link>
            <Link href="/browse" className="lp-btn lp-btn-ghost">
              Browse public organizations
            </Link>
          </div>
        </div>
      </section>

      <SiteFooter />
      <SiteStyles />
    </div>
  )
}

function YourOrgsSection({ orgs, loading }: { orgs: UserOrgMembership[]; loading: boolean }) {
  return (
    <section className="lp-yourorgs">
      <div className="lp-wrap">
        <p className="lp-eyebrow">Welcome back</p>
        {loading ? (
          <p style={{ color: 'var(--site-ink-muted)', margin: 0 }}>Loading your organizations...</p>
        ) : orgs.length === 0 ? (
          <p style={{ color: 'var(--site-ink-muted)', margin: 0 }}>
            You&apos;re not part of any organization yet -- browse public ones or create your own
            below.
          </p>
        ) : (
          <div className="lp-yourorgs-grid">
            {orgs.map(({ org, role }) => (
              <Link key={org.id} href={`/org/${org.slug}`} className="lp-yourorgs-item">
                <strong>{org.name}</strong>
                <small>{role}</small>
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}

function IconCircle({ children }: { children: React.ReactNode }) {
  return <div className="lp-how-icon">{children}</div>
}

const SiteIcon = (
  <svg viewBox="0 0 48 48" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="6" y="8" width="36" height="32" rx="3" />
    <line x1="6" y1="18" x2="42" y2="18" />
    <circle cx="13" cy="13" r="1.4" fill="currentColor" stroke="none" />
    <circle cx="18" cy="13" r="1.4" fill="currentColor" stroke="none" />
  </svg>
)

const CalendarIcon = (
  <svg viewBox="0 0 48 48" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="6" y="10" width="36" height="30" rx="3" />
    <line x1="6" y1="19" x2="42" y2="19" />
    <rect x="14" y="4" width="3" height="8" rx="1.5" fill="currentColor" stroke="none" />
    <rect x="31" y="4" width="3" height="8" rx="1.5" fill="currentColor" stroke="none" />
  </svg>
)

const BoxIcon = (
  <svg viewBox="0 0 48 48" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="2">
    <polyline points="8,16 16,6 32,6 40,16" />
    <rect x="8" y="16" width="32" height="24" rx="2" />
    <line x1="24" y1="16" x2="24" y2="40" />
  </svg>
)

const ChatIcon = (
  <svg viewBox="0 0 48 48" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M8 10 h32 a4 4 0 0 1 4 4 v14 a4 4 0 0 1 -4 4 H20 l-8 8 v-8 H8 a4 4 0 0 1 -4 -4 v-14 a4 4 0 0 1 4 -4 z" />
    <line x1="13" y1="18" x2="35" y2="18" />
    <line x1="13" y1="24" x2="29" y2="24" />
  </svg>
)

const ACTIONS = [
  { icon: CalendarIcon, label: 'Plan events & volunteer shifts' },
  { icon: BoxIcon, label: 'Track inventory, and give it away when it’s needed' },
  { icon: ChatIcon, label: 'Post updates and keep your group in the loop' },
]

// The casual, concrete version of the pitch -- what you actually do with
// it, not the feature names (those still exist per-workflow once you're in
// an org). Plain geometric SVG icons, not hand-authored illustration.
function HowItWorks() {
  return (
    <section className="lp-how">
      <div className="lp-wrap">
        <p className="lp-eyebrow">How it works</p>
        <h2 className="lp-how-heading">
          Create a site for your group. <span className="lp-and">And</span> do the things you
          actually need to do.
        </h2>

        <div className="lp-how-flow">
          <div className="lp-how-step lp-how-step-main">
            <IconCircle>{SiteIcon}</IconCircle>
            <p>Create a site for your community group</p>
          </div>
          <div className="lp-how-arrow" aria-hidden="true">
            &rarr;
          </div>
          <div className="lp-how-actions">
            {ACTIONS.map((a) => (
              <div className="lp-how-step" key={a.label}>
                <IconCircle>{a.icon}</IconCircle>
                <p>{a.label}</p>
              </div>
            ))}
          </div>
        </div>

        <p className="lp-how-next">
          <strong>Eventually:</strong> trade surplus between groups working toward similar goals,
          so donations end up where they&apos;re actually needed -- not just where they first
          landed.
        </p>

        <p className="lp-how-cta-line">Sign up and start planning, tracking, and posting.</p>
        <div className="lp-cta-row">
          <Link href="/signup" className="lp-btn lp-btn-primary">
            Create your organization
          </Link>
        </div>
      </div>
    </section>
  )
}
