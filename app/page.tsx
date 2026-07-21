// app/page.tsx
'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import Link from 'next/link'
import { useUserOrgs, UserOrgMembership } from '@/lib/orgs'

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
        <p style={{ color: 'var(--site-ink-muted)' }}>Loading...</p>
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
    <header className="lp-header">
      <Link href="/" className="lp-wordmark">
        Both<span className="lp-and">And</span>
      </Link>
      <nav className="lp-nav">{right}</nav>
      <LandingStyles />
    </header>
  )
}

function SignedInHub({ orgs }: { orgs: UserOrgMembership[] }) {
  return (
    <div style={{ maxWidth: '960px', margin: '0 auto', padding: '0 2rem 4rem' }}>
      <SiteHeader
        right={
          <>
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
        }
      />

      <section style={{ marginTop: '2rem' }}>
        <h1 style={{ fontSize: '1.5rem', color: 'var(--site-ink)', marginBottom: '1rem' }}>
          Your organizations
        </h1>
        {orgs.length === 0 ? (
          <div
            style={{
              border: '1px solid var(--site-paper-line)',
              borderRadius: '8px',
              padding: '2rem',
              color: 'var(--site-ink-muted)',
            }}
          >
            <p style={{ marginTop: 0 }}>You&apos;re not part of any organization yet.</p>
            <p style={{ marginBottom: 0 }}>
              <Link href="/browse" style={{ color: 'var(--site-teal)' }}>
                Browse public organizations
              </Link>{' '}
              or{' '}
              <Link href="/orgs/new" style={{ color: 'var(--site-teal)' }}>
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
                  border: '1px solid var(--site-paper-line)',
                  borderRadius: '8px',
                  textDecoration: 'none',
                  color: 'inherit',
                }}
              >
                <strong style={{ color: 'var(--site-ink)' }}>{org.name}</strong>
                <small style={{ color: 'var(--site-ink-muted)' }}>{role}</small>
              </Link>
            ))}
          </div>
        )}
      </section>
    </div>
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

function MarketingHome() {
  return (
    <div className="lp-root">
      <div className="lp-wrap">
        <SiteHeader
          right={
            <>
              <Link href="/login" className="lp-nav-link">
                Log in
              </Link>
              <Link href="/signup" className="lp-btn lp-btn-primary">
                Create an organization
              </Link>
            </>
          }
        />
      </div>

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

      <section className="lp-origin">
        <div className="lp-wrap">
          <div className="lp-heading lp-heading-wide">
            <p className="lp-eyebrow">Where this started</p>
            <h2>
              Either/or thinking makes false choices feel necessary.
              <br />
              <span className="lp-and">Both/and</span> is usually where the real solutions come
              from.
            </h2>
          </div>
          <div className="lp-prose">
            <p>
              That pattern showed up first in the private sector. A team would build a tool to
              get one piece of content approved and passed to the next team in a pipeline --
              solving its own problem well, with no real concept of the pipeline around it, let
              alone the enterprise it sat inside. Multiply that by every team solving its own
              version of the same problem, and you get a lot of tools that don&apos;t talk to
              each other and a lot of duplicated cost.
            </p>
            <p>
              The nonprofit and community-group world has the same pattern, only sharper. SaaS
              platforms for volunteer management, for meetups, for inventory and donation
              tracking -- they already exist. They&apos;re just priced for organizations that can
              budget for software, and most NGOs and community groups don&apos;t have an IT team
              standing by to build something custom instead. What&apos;s left is a lot of
              spreadsheets, a lot of Facebook groups doing a database&apos;s job, and a lot of
              cumulative inefficiency across the whole sector -- without any single organization
              having done anything wrong.
            </p>
            <p>
              That pattern turned concrete while building a tool for one NGO alongside PATH and
              Blueprint LA, in partnership with UCLA. Looking back across five years and
              seventeen of Blueprint LA&apos;s projects, the same handful of needs kept
              resurfacing under different names: a branded page for the organization, a way to
              sign up volunteers and members, scheduling for meetups and shifts, taking donations
              of cash or goods, asking for the donations actually needed, distributing them, and
              tracking enough of the flow to know whether a program is working.
            </p>
            <p>
              BothAnd is what that analysis turned into -- one shared foundation, with each piece
              switched on only if an organization actually needs it. A group that just wants a
              forum and a meetup calendar can ignore the rest completely. If donation tracking
              becomes useful six months later, it&apos;s already there to turn on -- not a
              migration to a different, more expensive tool.
            </p>
          </div>
        </div>
      </section>

      <section className="lp-workflows">
        <div className="lp-wrap">
          <p className="lp-eyebrow">What&apos;s inside, once you&apos;re in an organization</p>
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

      <footer className="lp-footer">
        <div className="lp-wrap lp-footer-inner">
          <Link href="/" className="lp-wordmark">
            Both<span className="lp-and">And</span>
          </Link>
          <span className="lp-footer-tag">
            Coordination infrastructure for organizations that can&apos;t afford software.
          </span>
        </div>
      </footer>
    </div>
  )
}

// Shared, plain (unscoped) <style> tag -- deliberately not styled-jsx, so it
// doesn't depend on any compiler config. Classes are all `lp-`-prefixed so
// they can't collide with other pages' styles; safe to render from both
// SiteHeader and MarketingHome since duplicate <style> tags with identical
// rules are harmless.
function LandingStyles() {
  return (
    <style>{`
      .lp-root { background: var(--site-paper); color: var(--site-ink); }
      .lp-wrap { width: 100%; max-width: 1120px; margin: 0 auto; padding: 0 clamp(1.25rem, 4vw, 3rem); }

      .lp-root h1, .lp-root h2, .lp-root h3 {
        font-family: "Iowan Old Style", "Palatino Linotype", Palatino, Georgia, "Times New Roman", serif;
        font-weight: 500;
        text-wrap: balance;
        margin: 0;
        color: var(--site-ink);
      }

      .lp-and { font-style: italic; color: var(--site-gold); }

      .lp-eyebrow {
        font-size: 0.75rem;
        font-weight: 600;
        letter-spacing: 0.14em;
        text-transform: uppercase;
        color: var(--site-ink-muted);
        margin: 0 0 0.9rem;
      }

      .lp-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 1.5rem;
        padding: 1.75rem 0 1.25rem;
      }

      .lp-wordmark {
        font-family: "Iowan Old Style", "Palatino Linotype", Palatino, Georgia, serif;
        font-size: 1.25rem;
        font-weight: 600;
        letter-spacing: 0.01em;
        text-decoration: none;
        color: var(--site-ink);
      }

      .lp-nav { display: flex; align-items: center; gap: 1.75rem; font-size: 0.95rem; }
      .lp-nav-link { text-decoration: none; color: var(--site-ink-soft); }
      .lp-nav-link:hover { color: var(--site-ink); }

      .lp-btn {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        border-radius: 3px;
        padding: 0.7rem 1.35rem;
        font-size: 0.95rem;
        font-weight: 600;
        text-decoration: none;
        border: 1px solid transparent;
        cursor: pointer;
        transition: transform 0.15s ease, box-shadow 0.15s ease, border-color 0.15s ease;
      }
      .lp-btn:focus-visible { outline: 2px solid var(--site-teal); outline-offset: 2px; }
      .lp-btn-primary { background: var(--site-teal); color: var(--site-teal-ink); }
      .lp-btn-primary:hover { transform: translateY(-1px); box-shadow: 0 8px 24px rgba(0,0,0,0.12); }
      .lp-btn-ghost { background: transparent; color: var(--site-ink); border-color: var(--site-paper-line); }
      .lp-btn-ghost:hover { border-color: var(--site-ink-muted); }

      .lp-hero { padding: clamp(2.5rem, 7vw, 5.5rem) 0 clamp(3rem, 8vw, 6rem); }
      .lp-hero-inner { max-width: 840px; }
      .lp-hero h1 { font-size: clamp(2.3rem, 5.2vw, 3.7rem); line-height: 1.12; }
      .lp-lead { margin: 1.75rem 0 0; max-width: 62ch; font-size: 1.2rem; line-height: 1.6; color: var(--site-ink-soft); }
      .lp-cta-row { display: flex; flex-wrap: wrap; gap: 1rem; margin-top: 2.25rem; }
      .lp-cta-row-center { justify-content: center; }

      .lp-fade-up { opacity: 0; transform: translateY(10px); animation: lpFadeUp 0.7s ease forwards; }
      .lp-d1 { animation-delay: 0.05s; }
      .lp-d2 { animation-delay: 0.18s; }
      .lp-d3 { animation-delay: 0.31s; }
      @keyframes lpFadeUp { to { opacity: 1; transform: translateY(0); } }
      @media (prefers-reduced-motion: reduce) {
        .lp-fade-up { animation: none; opacity: 1; transform: none; }
      }

      .lp-pairs { padding: clamp(2rem, 6vw, 4rem) 0 clamp(2.5rem, 6vw, 4.5rem); }
      .lp-heading { max-width: 640px; margin-bottom: 2.5rem; }
      .lp-heading-wide { max-width: 760px; }
      .lp-heading h2 { font-size: clamp(1.6rem, 3vw, 2.1rem); line-height: 1.25; }
      .lp-pair-list { display: flex; flex-direction: column; }
      .lp-pair { display: grid; grid-template-columns: minmax(0, 1fr); gap: 0.6rem; padding: 2rem 0; border-top: 1px solid var(--site-paper-line); }
      .lp-pair:last-child { border-bottom: 1px solid var(--site-paper-line); }
      @media (min-width: 780px) {
        .lp-pair { grid-template-columns: minmax(0, 0.85fr) minmax(0, 1fr); gap: 2.5rem; align-items: start; }
      }
      .lp-pair h3 { font-size: clamp(1.25rem, 2.2vw, 1.55rem); line-height: 1.3; }
      .lp-pair p { margin: 0; color: var(--site-ink-soft); max-width: 48ch; }

      .lp-origin { padding: clamp(3rem, 7vw, 5rem) 0 clamp(3.5rem, 7vw, 5.5rem); border-top: 1px solid var(--site-paper-line); }
      .lp-origin h2 { font-size: clamp(1.75rem, 3.6vw, 2.4rem); line-height: 1.28; }
      .lp-prose { max-width: 62ch; display: flex; flex-direction: column; gap: 1.35rem; }
      .lp-prose p { font-size: 1.07rem; color: var(--site-ink-soft); margin: 0; }

      .lp-workflows { padding: clamp(2.5rem, 6vw, 4rem) 0; background: var(--site-paper-raised); border-top: 1px solid var(--site-paper-line); border-bottom: 1px solid var(--site-paper-line); }
      .lp-workflow-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap: 2.25rem; margin-top: 2rem; }
      .lp-workflow-item { border-left: 2px solid var(--site-gold-soft); padding-left: 1rem; }
      .lp-workflow-item h4 { font-family: "Iowan Old Style", Georgia, serif; font-weight: 600; font-size: 1.05rem; margin: 0 0 0.4rem; color: var(--site-ink); }
      .lp-workflow-item p { margin: 0; font-size: 0.92rem; color: var(--site-ink-muted); line-height: 1.55; }

      .lp-closing { padding: clamp(2.5rem, 6vw, 4rem) 0 clamp(3rem, 7vw, 5rem); text-align: center; }
      .lp-closing h2 { font-size: clamp(1.6rem, 3.4vw, 2.3rem); max-width: 620px; margin: 0 auto; }

      .lp-footer { padding: 2rem 0 3rem; border-top: 1px solid var(--site-paper-line); }
      .lp-footer-inner { display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 1rem; }
      .lp-footer-tag { font-size: 0.85rem; color: var(--site-ink-muted); }
    `}</style>
  )
}
