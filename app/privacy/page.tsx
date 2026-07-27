// app/privacy/page.tsx
// Stub Privacy Policy -- real substance, not lorem, but explicitly a first
// pass: language is expected to iterate. See ROADMAP.md's Tier 0.
'use client'

import Link from 'next/link'
import { SiteHeader, SiteFooter, SiteStyles } from '../components/SiteChrome'

export default function PrivacyPage() {
  return (
    <div className="lp-root">
      <SiteHeader
        right={
          <>
            <Link href="/" className="lp-nav-link">
              Home
            </Link>
            <Link href="/login" className="lp-nav-link">
              Log in
            </Link>
          </>
        }
      />

      <section className="lp-bio">
        <div className="lp-wrap">
          <div className="lp-heading lp-heading-wide">
            <p className="lp-eyebrow">Privacy Policy</p>
            <h1>What&apos;s collected, and what isn&apos;t done with it.</h1>
          </div>
          <div className="lp-prose">
            <p>
              <strong>What&apos;s collected:</strong> your email address (for login and account
              recovery), and whatever you choose to enter while using an organization&apos;s
              workflows -- board posts and comments, event RSVPs and attendance, catalog listings
              and claims, journal entries, and course submissions. If an organization enables a
              background-check status field for its members, that status is visible to that
              org&apos;s admins only.
            </p>
            <p>
              <strong>What it&apos;s used for:</strong> running the app you signed up to use.
              Your content is shown to the organizations you&apos;re a member of, according to
              each org&apos;s own public/private setting -- nothing more. There&apos;s no ad
              targeting, and your data is never sold.
            </p>
            <p>
              <strong>Where it lives:</strong> a Postgres database (via Supabase) with row-level
              security enforced at the database layer -- an organization&apos;s data is only
              readable by that organization&apos;s own members, or by no one, if the org is
              private. The app itself is hosted on Vercel. Those are the only two infrastructure
              providers involved.
            </p>
            <p>
              <strong>Your control over it:</strong> you can leave any organization yourself, at
              any time, from that org&apos;s settings. You can request an export of an
              organization&apos;s data if you&apos;re that org&apos;s admin. You can delete your
              own account, which deactivates your memberships and removes your personal
              information from your profile -- see your account settings for both.
            </p>
            <p>
              <strong>Not intended for children under 13.</strong> If you believe a child&apos;s
              information has been collected, contact whoever administers the relevant
              organization so it can be removed.
            </p>
            <p>
              This is a first pass, written to be honest rather than exhaustive -- it will get
              more detailed as the service does. Questions can be directed to whoever administers
              your organization, or through this project&apos;s public repository.
            </p>
            <p style={{ color: 'var(--site-ink-muted)', fontSize: '0.9rem' }}>
              Last updated: July 2026.
            </p>
          </div>
        </div>
      </section>

      <SiteFooter />
      <SiteStyles />
    </div>
  )
}
