// app/components/SiteChrome.tsx
// Shared header/footer/styles for BothAnd's own marketing pages ("/" and
// "/about") -- kept separate from org-facing pages, which have their own
// nav (OrgSwitcher, WorkflowNav) and don't use these tokens/classes.
import Link from 'next/link'

export function SiteHeader({ right }: { right: React.ReactNode }) {
  return (
    <header className="lp-header">
      <div className="lp-wrap lp-header-inner">
        <Link href="/" className="lp-wordmark">
          Both<span className="lp-and">And</span>
        </Link>
        <nav className="lp-nav">{right}</nav>
      </div>
    </header>
  )
}

export function SiteFooter() {
  return (
    <footer className="lp-footer">
      <div className="lp-wrap lp-footer-inner">
        <Link href="/" className="lp-wordmark">
          Both<span className="lp-and">And</span>
        </Link>
        <nav className="lp-footer-nav">
          <Link href="/about" className="lp-nav-link">
            About
          </Link>
        </nav>
        <span className="lp-footer-tag">
          Coordination infrastructure for organizations that can&apos;t afford software.
        </span>
      </div>
    </footer>
  )
}

// Plain (unscoped) <style> tag -- deliberately not styled-jsx, so it doesn't
// depend on any compiler config. Classes are all `lp-`-prefixed so they
// can't collide with other pages' styles; safe to render more than once
// (duplicate <style> tags with identical rules are harmless).
// A literal-string child of <style> gets HTML-escaped by React's server
// renderer (quotes become &quot;) but set literally client-side once
// hydrated -- since <style> is a raw-text element, browsers don't decode
// those entities back, so the two disagree and React flags a hydration
// mismatch. dangerouslySetInnerHTML bypasses that text-child serialization
// entirely; safe here since this string is static and developer-authored,
// never derived from user input.
const SITE_CSS = `
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

      .lp-header-inner {
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

      .lp-yourorgs { padding: 0.5rem 0 2rem; }
      .lp-yourorgs-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 0.75rem; margin-top: 1rem; }
      .lp-yourorgs-item {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 1rem 1.25rem;
        border: 1px solid var(--site-paper-line);
        border-radius: 6px;
        background: var(--site-paper-raised);
        text-decoration: none;
        color: var(--site-ink);
        transition: border-color 0.15s ease;
      }
      .lp-yourorgs-item:hover { border-color: var(--site-ink-muted); }
      .lp-yourorgs-item small { color: var(--site-ink-muted); }
      .lp-btn-primary { background: var(--site-teal); color: var(--site-teal-ink); }
      .lp-btn-primary:hover { transform: translateY(-1px); box-shadow: 0 8px 24px rgba(0,0,0,0.12); }
      .lp-btn-ghost { background: transparent; color: var(--site-ink); border-color: var(--site-paper-line); }
      .lp-btn-ghost:hover { border-color: var(--site-ink-muted); }

      .lp-hero { padding: clamp(2.5rem, 7vw, 5.5rem) 0 clamp(3rem, 8vw, 6rem); }
      .lp-hero-inner { max-width: 840px; }
      .lp-hero h1 { font-size: clamp(2.3rem, 5.2vw, 3.7rem); line-height: 1.12; }
      .lp-lead { margin: 1.75rem 0 0; max-width: 62ch; font-size: 1.2rem; line-height: 1.6; color: var(--site-ink-soft); }

      /* Compact hero -- smaller and quieter than the full pitch version,
         so a signed-in visitor landing here for the 50th time isn't
         re-shouted at by a huge headline every time. */
      .lp-hero-compact { padding: clamp(1.5rem, 4vw, 2.5rem) 0 clamp(1.75rem, 4vw, 2.75rem); }
      .lp-hero-small { font-size: clamp(1.4rem, 2.6vw, 1.9rem); line-height: 1.3; }
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
      .lp-heading-lead { margin: 1rem 0 0; font-size: 1.05rem; color: var(--site-ink-soft); max-width: 60ch; }
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

      .lp-how { padding: clamp(2rem, 6vw, 3.5rem) 0 clamp(2.5rem, 6vw, 4rem); background: var(--site-paper-raised); border-top: 1px solid var(--site-paper-line); border-bottom: 1px solid var(--site-paper-line); }
      .lp-how-heading { max-width: 640px; font-size: clamp(1.4rem, 2.6vw, 1.8rem); line-height: 1.3; margin-top: 0; }

      .lp-how-flow { display: flex; align-items: center; flex-wrap: wrap; gap: 1.5rem; margin: 2rem 0 1.75rem; }
      .lp-how-step { display: flex; flex-direction: column; align-items: flex-start; gap: 0.6rem; max-width: 220px; }
      .lp-how-step p { margin: 0; font-size: 0.95rem; color: var(--site-ink-soft); line-height: 1.4; }
      .lp-how-step-main p { font-weight: 600; color: var(--site-ink); }
      .lp-how-arrow { font-size: 1.5rem; color: var(--site-gold); flex-shrink: 0; }
      @media (max-width: 700px) {
        .lp-how-arrow { display: none; }
      }
      .lp-how-actions { display: flex; flex-wrap: wrap; gap: 1.75rem; }
      .lp-how-icon {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 48px;
        height: 48px;
        border-radius: 50%;
        background: var(--site-gold-soft);
        color: var(--site-gold);
        flex-shrink: 0;
      }
      .lp-how-cta-line { font-size: 1.05rem; color: var(--site-ink); font-weight: 600; margin: 0 0 1rem; }

      .lp-closing { padding: clamp(2.5rem, 6vw, 4rem) 0 clamp(3rem, 7vw, 5rem); text-align: center; }
      .lp-closing h2 { font-size: clamp(1.6rem, 3.4vw, 2.3rem); max-width: 620px; margin: 0 auto; }

      .lp-footer { padding: 2rem 0 3rem; border-top: 1px solid var(--site-paper-line); }
      .lp-footer-inner { display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 1rem 2rem; }
      .lp-footer-nav { flex: 1; }
      .lp-footer-tag { font-size: 0.85rem; color: var(--site-ink-muted); }

      .lp-bio { padding: clamp(2.5rem, 6vw, 4rem) 0; }
      .lp-bio .lp-prose { max-width: 62ch; }

      .lp-advisors { padding: clamp(2.5rem, 6vw, 4rem) 0 clamp(3rem, 7vw, 5rem); background: var(--site-paper-raised); border-top: 1px solid var(--site-paper-line); border-bottom: 1px solid var(--site-paper-line); }
      .lp-advisor-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 2rem; margin-top: 2.25rem; }
      .lp-advisor { display: flex; gap: 1rem; align-items: flex-start; }
      .lp-advisor-avatar {
        flex-shrink: 0;
        width: 56px;
        height: 56px;
        border-radius: 50%;
        background: var(--site-gold-soft);
        color: var(--site-gold);
        display: flex;
        align-items: center;
        justify-content: center;
        font-family: "Iowan Old Style", Georgia, serif;
        font-weight: 600;
        font-size: 1.05rem;
      }
      .lp-advisor-name { font-weight: 600; color: var(--site-ink); margin: 0 0 0.15rem; }
      .lp-advisor-role { font-size: 0.9rem; color: var(--site-ink-muted); margin: 0; }
`

export function SiteStyles() {
  return <style dangerouslySetInnerHTML={{ __html: SITE_CSS }} />
}
