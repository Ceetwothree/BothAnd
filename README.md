# BothAnd

Free-tier coordination infrastructure for organizations that can't afford software.

## What this is

A multi-org platform: one BothAnd account, many organizations. Create an org (you become its admin automatically), or join one — public orgs are browsable and self-joinable, private orgs are invite-link only. Each org gets its own branding (logo, layout, accent color) and its own set of workflows.

## What's Here

```
├── schema.sql                 # PostgreSQL schema + RLS + RPC functions (run in Supabase)
├── SETUP_GUIDE.md             # Step-by-step deployment guide
├── package.json                # Dependencies
├── .env.example                # Environment variables template
├── next.config.js              # Next.js config
├── lib/
│   ├── supabase.ts             # Supabase client
│   ├── orgs.ts                 # Org data/RPC helpers (useUserOrgs, useOrgBySlug, createOrg, ...)
│   ├── containers.ts           # Per-workflow container helpers (useContainer, ensureContainer)
│   ├── permissions.ts          # Centralized role checks (admin > staff > member)
│   └── branding.ts             # Banner template + accent color constants
│
├── app/
│   ├── page.tsx                 # Top-level hub: your orgs, browse, create
│   ├── browse/page.tsx          # Public org directory
│   ├── orgs/new/page.tsx        # Create an organization
│   ├── join/[code]/page.tsx     # Private-org invite link flow
│   ├── login/page.tsx, signup/page.tsx
│   ├── components/
│   │   ├── Banner.tsx           # Org branding banner (3 layouts x 6 accent colors)
│   │   └── OrgSwitcher.tsx      # Header org switcher
│   └── org/[slug]/
│       ├── layout.tsx           # Resolves org by slug, provides OrgContext, workflow nav
│       ├── page.tsx             # Board (forum)
│       ├── events/page.tsx      # Events + RSVP
│       ├── catalog/page.tsx     # Catalog/marketplace (claim-based, no quantity tracking yet)
│       ├── journal/page.tsx     # Private-ish per-user entries
│       ├── course/page.tsx      # Lessons + submissions
│       └── settings/page.tsx    # Branding, public/private toggle, invite link
```

## Quick Start

1. **Create a Supabase project** → note your URL and anon key
2. **Run `schema.sql`** in the Supabase SQL editor
3. **Create `.env.local`** with your Supabase credentials
4. **Deploy to Vercel** → connect GitHub + add env vars
5. **Visit your site** → sign up, create an org, invite people

See `SETUP_GUIDE.md` for detailed steps.

## Architecture Decisions

- **Next.js + Postgres + Supabase** → managed services, minimal custom code
- **One global identity, many orgs** → `orgs`/`memberships`/`containers`/`records`/`responses` is the whole data model; every workflow is a `kind` value, not a new table
- **Row-Level Security everywhere** → tenancy enforced at the database layer, not in application code
- **SECURITY DEFINER functions for anything that needs to bypass RLS safely** → org creation and invite-code joins are atomic and can't be reached by a raw insert (see `create_org_with_admin`, `join_org_by_invite_code` in `schema.sql`)
- **Centralized permission checks** (`lib/permissions.ts`) → one small file to update as new role distinctions are needed, not scattered `role === 'admin'` checks

## Workflows

All five container kinds now have a UI. Two important caveats, worth knowing before relying on them:

- **Role gating is UI-level only in places** — `records_write` RLS currently allows any active member to create a record regardless of role, so "staff can create events" etc. isn't enforced at the database layer yet.
- **`responses` has no DELETE/UPDATE policy** — RSVPs and course submissions are add-only for now (no un-RSVP, no resubmitting) until a future migration adds one.
- **Catalog has no quantity/stock tracking** — each listing is a single claimable item, not "N in stock." A `movements` table for real inventory counts is a known future migration.

## Key Files to Know

- **schema.sql** — Source of truth for data model, RLS, and RPC functions
- **SETUP_GUIDE.md** — Deployment instructions
- **lib/permissions.ts** — Where role logic lives; extend here, not inline
- **app/org/[slug]/layout.tsx** — Where org resolution + context + nav live for every org-scoped page

## Security

RLS enforces tenancy at the database layer:
- A user can't read data outside their org's memberships, unless it's explicitly public
- A user can't write into a container they're not an active member of
- Private orgs are indistinguishable from nonexistent orgs to non-members (RLS returns nothing either way)
- All isolation rules live in `schema.sql`, not in application code

## Questions?

Refer to the pitch document for the vision, and the technical spec for the architecture. The schema is the implementation of both.
