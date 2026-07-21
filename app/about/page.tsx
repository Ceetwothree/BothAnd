// app/about/page.tsx
'use client'

import Link from 'next/link'
import { SiteHeader, SiteFooter, SiteStyles } from '../components/SiteChrome'

const ADVISORS = [
  { initials: 'BB', name: 'Burn Barrow', role: 'Public policy expert' },
  { initials: 'JK', name: 'Joyce Kaiser', role: 'Public policy expert' },
  { initials: 'YH', name: 'Yong Huang', role: 'Senior technical leadership' },
  { initials: 'GV', name: 'Ganesh Veeraraghavan', role: 'Senior technical leadership' },
]

export default function AboutPage() {
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

      <section className="lp-hero">
        <div className="lp-wrap">
          <div className="lp-hero-inner">
            <p className="lp-eyebrow">About</p>
            <h1>
              One founder. <span className="lp-and">And</span> a few advisors who&apos;ve pushed
              back on it.
            </h1>
            <p className="lp-lead">
              BothAnd isn&apos;t a company with a floor of engineers -- it&apos;s one person&apos;s
              read on a pattern, sharpened by a small group of people who know things that
              person doesn&apos;t.
            </p>
          </div>
        </div>
      </section>

      <section className="lp-bio">
        <div className="lp-wrap">
          <div className="lp-heading lp-heading-wide">
            <p className="lp-eyebrow">Who&apos;s behind this</p>
          </div>
          <div className="lp-prose">
            <p>
              I&apos;ve spent thirty years in big tech -- fifteen of them in operations, the other
              fifteen in leadership. Somewhere in there I picked up a real passion for Deming and
              process improvement, and I&apos;ve spent enough of my career actually building
              software to know the difference between a tool that looks finished and one that
              holds up under real use. BothAnd is where those three things met.
            </p>
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

      <section className="lp-advisors">
        <div className="lp-wrap">
          <div className="lp-heading">
            <p className="lp-eyebrow">Advisors</p>
            <h2>
              Sharpened from <span className="lp-and">both</span> sides — technology and public
              policy.
            </h2>
            <p className="lp-heading-lead">
              Four people who&apos;ve agreed to help push on this, no photos yet -- just their
              names and what they bring.
            </p>
          </div>
          <div className="lp-advisor-grid">
            {ADVISORS.map((a) => (
              <div className="lp-advisor" key={a.name}>
                <div className="lp-advisor-avatar" aria-hidden="true">
                  {a.initials}
                </div>
                <div>
                  <p className="lp-advisor-name">{a.name}</p>
                  <p className="lp-advisor-role">{a.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <SiteFooter />
      <SiteStyles />
    </div>
  )
}
