# BothAnd

Free-tier coordination infrastructure for organizations that can't afford software.

## What this is

A multi-org platform: one BothAnd account, many organizations. Create an org (you become its admin automatically), or join one — public orgs are browsable and self-joinable, private orgs are invite-link only. Each org gets its own branding (logo, layout, accent color), its own mission statement/about page/social links, and its own set of workflows.

BothAnd's own marketing site (the landing page and its About page) is deliberately a separate design system from an org's own pages — see [Two design systems](#two-design-systems) below.

## What's Here

```
├── schema.sql                    # PostgreSQL schema + RLS + RPC functions (run in Supabase)
├── SETUP_GUIDE.md                # Step-by-step deployment guide
├── package.json                  # Dependencies
├── .env.example                  # Environment variables template
├── next.config.js                # Next.js config
├── lib/
│   ├── supabase.ts                # Supabase client
│   ├── orgs.ts                    # Org data/RPC helpers (useUserOrgs, useOrgBySlug, createOrg, member management, ...)
│   ├── containers.ts              # Per-workflow container helpers (useContainer, ensureContainer)
│   ├── permissions.ts             # Centralized role checks (admin > staff > member)
│   └── branding.ts                # Banner template + accent color constants (per-org)
│
├── app/
│   ├── globals.css                # BothAnd's own site theme tokens (--site-*), separate from per-org branding
│   ├── page.tsx                   # BothAnd's marketing homepage -- always reachable, logged in or out
│   ├── about/page.tsx             # BothAnd's own About page (founder, origin story, tradeoffs, advisors)
│   ├── browse/page.tsx            # Public org directory
│   ├── orgs/new/page.tsx          # Create an organization
│   ├── join/[code]/page.tsx       # Private-org invite link flow (shows the org's mission statement)
│   ├── login/page.tsx, signup/page.tsx
│   ├── components/
│   │   ├── SiteChrome.tsx         # Shared header/footer/styles for BothAnd's own pages ("/" and "/about")
│   │   ├── Banner.tsx             # Org branding banner (3 layouts x 6 accent colors)
│   │   └── OrgSwitcher.tsx        # Header org switcher (org-scoped pages)
│   └── org/[slug]/
│       ├── layout.tsx             # Resolves org by slug, provides OrgContext, workflow nav
│       ├── page.tsx               # Board (forum) + mission statement
│       ├── about/page.tsx         # Org's own About page (about text + social/contact links)
│       ├── events/page.tsx        # Events + RSVP
│       ├── catalog/page.tsx       # Catalog/marketplace (claim-based, no quantity tracking yet)
│       ├── journal/page.tsx       # Private-ish per-user entries
│       ├── course/page.tsx        # Lessons + submissions
│       ├── members/page.tsx       # Admin: view members, change roles, deactivate/reactivate
│       └── settings/page.tsx      # Branding, mission/about text, social links, public/private toggle, invite link
```

## Quick Start

1. **Create a Supabase project** → note your URL and anon key
2. **Run `schema.sql`** in the Supabase SQL editor
3. **Create `.env.local`** with your Supabase credentials
4. **Deploy to Vercel** → connect GitHub + add env vars
5. **Visit your site** → sign up, create an org, invite people

See `SETUP_GUIDE.md` for detailed steps.

## Two design systems

BothAnd deliberately keeps two separate visual identities, and they're not meant to converge:

- **The site itself** (`/`, `/about`) uses its own fixed theme — color tokens in `app/globals.css` (`--site-*`), header/footer/styles in `app/components/SiteChrome.tsx`. This is BothAnd's own brand, not configurable per-org.
- **Each org's own pages** (`/org/[slug]/*`) use that org's branding from `lib/branding.ts` — a curated accent-color palette (pine/indigo/plum/ochre/clay/ink) plus a banner layout and logo, editable from that org's Settings page. A shared serif heading typeface (set globally in `app/globals.css`) ties the two together visually without making an org's page look like BothAnd's own marketing site.

## Architecture Decisions

- **Next.js + Postgres + Supabase** → managed services, minimal custom code
- **One global identity, many orgs** → `orgs`/`memberships`/`containers`/`records`/`responses` is the whole data model; every workflow is a `kind` value, not a new table
- **Row-Level Security everywhere** → tenancy enforced at the database layer, not in application code
- **SECURITY DEFINER functions for anything that needs to bypass RLS safely** → org creation and invite-code joins are atomic and can't be reached by a raw insert (see `create_org_with_admin`, `join_org_by_invite_code` in `schema.sql`)
- **Centralized permission checks** (`lib/permissions.ts`) → one small file to update as new role distinctions are needed, not scattered `role === 'admin'` checks
- **No seed data** → a raw `INSERT` into `orgs` bypasses `create_org_with_admin()`, the only path that also creates an admin membership. An earlier seeded org learned this the hard way (orphaned, no admin, had to be deleted) -- create any demo org through the normal signup flow instead.

## Workflows

All five container kinds have a UI, plus org-level identity (mission statement, about page, social/contact links) and member management. Known caveats, worth knowing before relying on them:

- **Role gating is UI-level only in places** — `records_write` RLS currently allows any active member to create a record regardless of role, so "staff can create events" etc. isn't enforced at the database layer yet.
- **Catalog has no quantity/stock tracking** — each listing is a single claimable item, not "N in stock." A real gallery/search/detail UI and quantity tracking are a planned rework, not built yet.
- **No trading between organizations yet** — the vision (see the About page's origin story) includes letting orgs trade surplus with each other; today, Catalog/inventory is entirely per-org.

## Key Files to Know

- **schema.sql** — Source of truth for data model, RLS, and RPC functions
- **SETUP_GUIDE.md** — Deployment instructions
- **lib/permissions.ts** — Where role logic lives; extend here, not inline
- **lib/branding.ts** — Per-org accent colors/banner templates (distinct from `app/globals.css`'s site-wide tokens)
- **app/components/SiteChrome.tsx** — Shared chrome for BothAnd's own marketing pages
- **app/org/[slug]/layout.tsx** — Where org resolution + context + nav live for every org-scoped page

## Security

RLS enforces tenancy at the database layer:
- A user can't read data outside their org's memberships, unless it's explicitly public
- A user can't write into a container they're not an active member of
- Private orgs are indistinguishable from nonexistent orgs to non-members (RLS returns nothing either way)
- Org admins can read (not write) the profile of anyone who's a member of an org they administer — otherwise a member-management UI would show every member's email as null except the viewer's own
- All isolation rules live in `schema.sql`, not in application code

## Questions?

Refer to the pitch document for the vision, and the technical spec for the architecture. The schema is the implementation of both.
