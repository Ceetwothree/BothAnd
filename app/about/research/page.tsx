// app/about/research/page.tsx
'use client'

import Link from 'next/link'
import { SiteHeader, SiteFooter, SiteStyles } from '../../components/SiteChrome'
import { RESEARCH_PAPER_HTML } from './paper-content'

const TOC = [
  { id: 'rp-index', label: 'Introduction' },
  { id: 'rp-overview', label: 'Scope & Scale' },
  { id: 'rp-system', label: 'Phases of the Process' },
  { id: 'rp-agencies', label: 'Agencies & NGOs' },
  { id: 'rp-tools', label: 'Tools & Systems' },
  { id: 'rp-money', label: 'Where It Comes From, Where It Goes' },
  { id: 'rp-effectiveness', label: "What Works, What Doesn't" },
  { id: 'rp-breaks', label: 'Where & Why It Breaks' },
  { id: 'rp-solutions', label: 'Solutions Tried' },
  { id: 'rp-findings', label: 'Findings Log' },
  { id: 'rp-sources', label: 'Sources & Methodology' },
]

export default function ResearchPage() {
  return (
    <div className="lp-root">
      <SiteHeader
        right={
          <>
            <Link href="/about" className="lp-nav-link">
              About
            </Link>
            <Link href="/" className="lp-nav-link">
              Home
            </Link>
            <Link href="/login" className="lp-nav-link">
              Log in
            </Link>
          </>
        }
      />

      <section className="lp-hero lp-hero-compact">
        <div className="lp-wrap">
          <div className="lp-hero-inner">
            <p className="lp-eyebrow">Research</p>
            <h1 className="lp-hero-small">
              Homelessness in LA: following the <span className="lp-and">money</span> and the
              system.
            </h1>
            <p className="lp-lead">
              An independent, research-led investigation into homelessness in Los Angeles -- the
              phases someone actually moves through, where the money comes from and where it
              goes, who runs each part of the system, and what the evidence says actually works.
              Not affiliated with LAHSA, the City, or the County. This is the same research this
              project has been doing behind the scenes -- published here as one document instead
              of a separate site.
            </p>
          </div>
        </div>
      </section>

      <section className="rp-toc">
        <div className="lp-wrap">
          <p className="lp-eyebrow">Contents</p>
          <div className="rp-toc-list">
            {TOC.map((item) => (
              <a href={`#${item.id}`} key={item.id}>
                {item.label}
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="rp-content">
        <div className="lp-wrap">
          <div
            className="rp-content-inner"
            dangerouslySetInnerHTML={{ __html: RESEARCH_PAPER_HTML }}
          />
        </div>
      </section>

      <SiteFooter />
      <SiteStyles />
    </div>
  )
}
