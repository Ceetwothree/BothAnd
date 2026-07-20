# BothAnd — Forum MVP

Free-tier coordination infrastructure for organizations that can't afford software.

## This Deployment

A public forum that anyone can read, members can post to. Scaffolded for future workflows (inventory, events, journal, marketplace).

## What's Here

```
├── schema.sql                 # PostgreSQL schema + RLS (run in Supabase)
├── SETUP_GUIDE.md            # Step-by-step deployment guide
├── package.json              # Dependencies
├── .env.example              # Environment variables template
├── next.config.js            # Next.js config
├── lib_supabase.ts           # Supabase client utility
│
├── app/
│   ├── layout.tsx            # Root layout
│   ├── page.tsx              # Public home + forum view
│   ├── login/page.tsx        # Login page
│   ├── signup/page.tsx       # Signup page
│   ├── dashboard/page.tsx    # Member dashboard (post creation)
│   └── api/
│       ├── auth/             # Auth routes (signup, login, logout)
│       └── forum/            # Forum routes (posts, comments)
```

## Quick Start

1. **Create Supabase project** → note your URL and anon key
2. **Run schema.sql** in Supabase SQL editor
3. **Create .env.local** with your Supabase credentials
4. **Deploy to Vercel** → connect GitHub + add env vars
5. **Visit your site** → public forum live, test signup/post flow

See `SETUP_GUIDE.md` for detailed steps.

## Architecture Decisions

- **Next.js + Postgres + Supabase** → managed services, minimal custom code
- **Naming configurable, behavior not** → no custom fields yet
- **Row-Level Security** → tenancy enforced at database layer
- **One org (themission) for MVP** → schema supports multi-org, but UI is single-org
- **Public forum + member dashboard** → simplest state machine to validate

## What's Ready for Next

These tables exist but no UI:
- **Inventory** (movements table for stock tracking)
- **Events** (capacity management via movements)
- **Journal** (owner-only entries)
- **Requests** (open→claimed→fulfilled workflow)

Adding them means:
1. Create new container types in UI
2. Build form + display components
3. Wire to existing API routes (polymorphic on `kind` field)

## Key Files to Know

- **schema.sql** — Source of truth for data model and permissions
- **SETUP_GUIDE.md** — Deployment instructions
- **.env.example** — Required environment variables
- **app/page.tsx** — Public view (what visitors see)
- **app/dashboard/page.tsx** — Member view (what logged-in users see)

## Security

RLS (Row-Level Security) enforces tenancy at the database layer:
- No user can read data outside their org (unless public)
- No user can create records in a container they're not a member of
- All isolation rules are in `schema.sql`, not in application code

## Questions?

Refer to the pitch document for the vision, and the technical spec for the architecture. The schema is the implementation of both.
