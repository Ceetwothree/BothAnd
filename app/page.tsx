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
              <button onClick={() => supabase.auth.signOut()} className="lp-btn lp-btn-ghost">
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

      <section className="lp-hero">
        <div className="lp-wrap">
          <div className="lp-hero-inner">
            <p className="lp-eyebrow lp-fade-up lp-d1">Free-tier coordination infrastructure</p>
            <h1 className="lp-fade-up lp-d2">
              Run on a shoestring.
              <br />
              <span className="lp-and">And</span> still run well.
            </h1>
            <p className="lp-lead lp-fade-up lp-d3">
              BothAnd is free coordination software for organizations that can&apos;t afford
              software -- one account, as many organizations as you&apos;re part of, each with
              real access control and its own set of tools.
            </p>
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

      <section className="lp-pairs">
        <div className="lp-wrap">
          <div className="lp-heading">
            <p className="lp-eyebrow">You shouldn&apos;t have to choose</p>
            <h2>The tradeoffs everyone tells you to expect. We built around them instead.</h2>
            <p className="lp-heading-lead">
              Built for NGOs from small to large, community groups, mutual aid groups, and
              churches doing charity work -- the organizations usually told to expect these
              tradeoffs.
            </p>
          </div>
          <div className="lp-pair-list">
            <div className="lp-pair">
              <h3>
                A mission. <span className="lp-and">And</span> a budget.
              </h3>
              <p>
                Everything here runs free at small scale, so the cost of the software never has
                to compete with the budget your mission actually depends on.
              </p>
            </div>
            <div className="lp-pair">
              <h3>
                Simple to join. <span className="lp-and">And</span> genuinely secure.
              </h3>
              <p>
                Signing up takes a minute. Underneath, every read and write is checked against
                who you are and which organization you belong to -- enforced by the database
                itself, not bolted on in the app.
              </p>
            </div>
            <div className="lp-pair">
              <h3>
                Your organization. <span className="lp-and">And</span> everyone else&apos;s.
              </h3>
              <p>
                One account can belong to as many organizations as you&apos;re actually part of.
                Switch between them without logging out, without a second signup, without
                anyone&apos;s data mixing with anyone else&apos;s.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="lp-workflows">
        <div className="lp-wrap">
          <p className="lp-eyebrow">What&apos;s inside, once you&apos;re in an organization</p>
          <WorkflowDiagram />
          <div className="lp-workflow-grid">
            {WORKFLOWS.map((w) => (
              <div className="lp-workflow-item" key={w.name}>
                <h4>{w.name}</h4>
                <p>{w.copy}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

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

const WORKFLOWS = [
  {
    name: 'Board',
    copy: 'A public or members-only feed for updates, announcements, and discussion.',
  },
  {
    name: 'Events',
    copy: 'Post events, take RSVPs, and cap attendance when space is limited.',
  },
  {
    name: 'Catalog',
    copy: 'List items and supplies that members can claim.',
  },
  {
    name: 'Journal',
    copy: 'Private, per-person entries -- visible only to their author and your admins.',
  },
  {
    name: 'Course',
    copy: 'Lay out lessons and collect submissions for any training you run.',
  },
]

// A center hub ("your organization") with the five workflows as spokes --
// the same "one foundation, pieces you switch on" idea as the origin story,
// drawn instead of stated. Plain SVG shapes (circles/lines/text), not
// hand-authored path data, so it stays simple to read and maintain.
function WorkflowDiagram() {
  const nodes = [
    { label: 'Board', x: 280, y: 80 },
    { label: 'Events', x: 470, y: 218 },
    { label: 'Catalog', x: 398, y: 442 },
    { label: 'Journal', x: 162, y: 442 },
    { label: 'Course', x: 90, y: 218 },
  ]

  return (
    <div className="lp-diagram">
      <svg viewBox="0 0 560 560" role="img" aria-label="Your organization at the center, with Board, Events, Catalog, Journal, and Course as optional pieces around it">
        {nodes.map((n) => (
          <line
            key={`line-${n.label}`}
            x1={280}
            y1={280}
            x2={n.x}
            y2={n.y}
            stroke="var(--site-gold)"
            strokeOpacity={0.35}
            strokeWidth={2}
          />
        ))}
        {nodes.map((n) => (
          <g key={n.label}>
            <circle cx={n.x} cy={n.y} r={54} fill="var(--site-gold-soft)" stroke="var(--site-gold)" strokeWidth={1.5} />
            <text x={n.x} y={n.y} textAnchor="middle" dominantBaseline="middle" fontSize={16} fontWeight={600} fill="var(--site-ink)">
              {n.label}
            </text>
          </g>
        ))}
        <circle cx={280} cy={280} r={72} fill="var(--site-teal)" />
        <text x={280} y={272} textAnchor="middle" dominantBaseline="middle" fontSize={15} fontWeight={600} fill="var(--site-teal-ink)">
          Your
        </text>
        <text x={280} y={292} textAnchor="middle" dominantBaseline="middle" fontSize={15} fontWeight={600} fill="var(--site-teal-ink)">
          organization
        </text>
      </svg>
    </div>
  )
}
