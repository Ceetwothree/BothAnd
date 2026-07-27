// app/terms/page.tsx
// Stub Terms of Service -- real substance, not lorem, but explicitly a
// first pass: language is expected to iterate. See ROADMAP.md's Tier 0.
'use client'

import Link from 'next/link'
import { SiteHeader, SiteFooter, SiteStyles } from '../components/SiteChrome'

export default function TermsPage() {
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
            <p className="lp-eyebrow">Terms of Service</p>
            <h1>The plain-language version, first.</h1>
          </div>
          <div className="lp-prose">
            <p>
              BothAnd is run by one person, not a company with a support desk. It&apos;s provided
              free, as-is, with no uptime guarantee and no warranty of any kind. If it breaks, the
              best you&apos;ll get is a fix as soon as it&apos;s practical -- not a service level
              agreement.
            </p>
            <p>
              <strong>Your organization&apos;s content belongs to your organization.</strong> Board
              posts, event listings, catalog items, journal entries, and course submissions are
              yours -- BothAnd hosts them, and doesn&apos;t claim any ownership over them beyond
              what&apos;s needed to run the service (storing them, displaying them back to your
              own members).
            </p>
            <p>
              <strong>BothAnd never processes payments.</strong> If your organization adds a
              donation link, that link goes to a payment processor you already use and control
              (PayPal, Venmo, Zelle, or similar) -- BothAnd is never in that transaction, never
              holds funds, and isn&apos;t a party to it.
            </p>
            <p>
              <strong>Use it for what it&apos;s for.</strong> Coordinating a legitimate
              organization, group, or community effort. Don&apos;t use it for anything illegal,
              to harass anyone, or to misrepresent who you are or who your organization is. An
              org&apos;s admins decide whether that org is public or invite-only, and are
              responsible for who they let in.
            </p>
            <p>
              <strong>Accounts and organizations can be removed</strong> for abuse, illegal
              activity, or anything that puts other users or organizations at risk. You can also
              delete your own account and leave any organization at any time -- see your
              account settings.
            </p>
            <p>
              <strong>No liability beyond what the law requires.</strong> BothAnd, and the person
              who runs it, aren&apos;t liable for damages arising from your use of the service, to
              the fullest extent the law allows. That&apos;s a broad disclaimer because this is a
              free tool run by one person, not because anyone&apos;s trying to hide something.
            </p>
            <p>
              These terms may change as the service changes. This is a first pass, written to be
              honest rather than polished -- expect the wording to improve without the substance
              changing out from under you. Questions can be directed to whoever administers your
              organization, or through this project&apos;s public repository.
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
