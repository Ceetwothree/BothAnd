# BothAnd — Setup & Deployment Guide

## Overview

BothAnd is a multi-org coordination platform: one account, any number of organizations. Each org gets its own branding, mission/about page, social links, and a set of workflows (Board, Events, Catalog, Journal, Course) that members opt into as needed.

## What's Included

- **Frontend:** Next.js 14 (React) — a BothAnd-branded marketing site (`/`, `/about`) plus per-org pages themed with that org's own accent color
- **Backend:** Next.js API routes + direct Supabase client calls
- **Database:** PostgreSQL via Supabase with Row-Level Security (RLS)
- **Auth:** Supabase Auth (email/password)
- **Deployment:** Vercel

## Prerequisites

1. **Supabase Project**
   - Create a free account at https://supabase.com
   - Create a new project (any region, free tier is fine for MVP)
   - Note your Project URL and Anon Key

2. **GitHub Repository**
   - Fork or create a repo with this codebase
   - You'll connect it to Vercel for auto-deployment

3. **Vercel Account**
   - Create free account at https://vercel.com
   - Link your GitHub account

4. **Local Setup** (optional, for development)
   - Node.js 18+ installed
   - npm or yarn

## Step 1: Set Up the Database

### 1.1 In Supabase Console

1. Go to your Supabase project dashboard
2. Click **SQL Editor** in the left sidebar
3. Click **New Query**
4. Copy the entire contents of `schema.sql` (provided)
5. Paste into the SQL editor and click **Run**

This creates:
- All 6 tables (users, orgs, containers, records, responses, memberships) plus RLS policies and RPC functions on every table
- No seed orgs — the first real signup creates its own org via `/orgs/new`, which is also the only path that gives an org an admin (a raw `INSERT` into `orgs` does not)

### 1.2 Enable Realtime (optional)

If you want live updates later:
- In Supabase, go **Replication** → enable on `records` and `responses` tables

## Step 2: Set Environment Variables

### 2.1 Get Supabase Credentials

In Supabase console:
1. Go **Settings** → **API**
2. Copy:
   - **Project URL** (the full URL)
   - **anon public key** (not the secret key)

### 2.2 Create `.env.local` File (for local development)

```bash
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 2.3 For Vercel Deployment

You'll add these same variables in Vercel's environment settings during deployment (see Step 3).

## Step 3: Deploy to Vercel

### 3.1 Connect GitHub Repo

1. Go to https://vercel.com/new
2. Import your GitHub repo
3. Vercel auto-detects Next.js — click **Deploy**

### 3.2 Add Environment Variables

1. In the deployment settings, paste your environment variables:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`

2. Click **Deploy**

Vercel will auto-deploy on every push to `main` branch.

### 3.3 Connect Your Domain (Optional)

In Vercel project settings:
1. **Domains** → Add your custom domain (e.g., `bothand.tech`)
2. Vercel generates DNS records to add to your domain registrar
3. Once DNS propagates, your site is live at your domain

## Step 4: Test Locally (Optional)

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Visit http://localhost:3000
```

## Step 5: Invite Your First Users

### Create an Organization

1. Go to `/signup` and create an account
2. Go to `/orgs/new` to create your organization — you become its admin automatically
3. In **Settings**, set a mission statement, about text, social/contact links, branding, and generate an invite link (for private orgs) or toggle the org public (browsable/self-joinable at `/browse`)

### Invite People

Share your org's invite link (from Settings) or, if the org is public, just point people at `/browse`. Either way they land on `/join/[code]` or the org's own page, sign up if needed, and join.

### Test the Flow

1. **Public view** (anyone, logged out): visit `/` → see the BothAnd marketing homepage; visit `/browse` → see public orgs
2. **Member view** (logged in): create a post on the org's Board, RSVP to an Event, claim a Catalog item
3. **Admin view**: visit `/org/[slug]/members` to change roles or deactivate a member; visit `/org/[slug]/settings` for branding/mission/social/invite-link management

## Schema Mapping (For Your Reference)

| Feature | Tables | Notes |
|---------|--------|-------|
| Orgs, branding, mission/about/social | orgs | `create_org_with_admin()` is the only way an org gets an admin |
| Membership & roles | memberships | admin > staff > member, plus active/inactive status |
| Board posts | records (kind=post) + responses (kind=comment) | Visibility follows the container |
| Events | records (kind=event) + responses (kind=rsvp) | RSVP is delete-able (un-RSVP) |
| Catalog | records (kind=item) + responses (kind=claim) | No quantity tracking yet — one listing, one claim |
| Journal | records (kind=entry), container visibility=owner | Per-user, plus the container's creator and org admins |
| Course | records (kind=lesson) + responses (kind=submission) | Submission is delete-able (resubmit) |
| Permissions | RLS policies + `lib/permissions.ts` | Row-Level Security handles isolation; the lib file centralizes role checks in the UI |

## What's Ready for Later

Known gaps, not yet built:
- **Catalog rework** — a real gallery/search/item-detail experience and quantity tracking, replacing today's plain claimable-item list
- **Cross-org trading** — letting orgs trade surplus donations with each other (see the About page's origin story for why this matters)
- **Database-level role gating** — `records_write` RLS currently lets any active member create a record regardless of role; today's "staff-only" actions are UI-level checks only
- **Real contact/social links on the marketing site itself** — the footer intentionally has none yet rather than shipping dead placeholder links

## Security Notes

1. **RLS is the enforcement layer** — all data isolation happens at the database, not just the app
2. **Never expose the service role key** — only use the anon key (already in env template)
3. **Test tenancy before adding real data** — verify RLS blocks cross-org reads before onboarding real orgs. Concretely: run the check as an actual non-member (a different user, or the `anon` role with no JWT), not just by reading the policy SQL. In July 2026, `schema.sql` documented tenant-scoped policies that the *live* project had quietly drifted away from — `orgs`, `containers`, `records`, and `responses` all had policies with no membership check at all (one `orgs` policy was `USING (true)`, making every org's `invite_code` world-readable with no login). Supabase's own advisor (`get_advisors`) never flagged it, since it only checks a fixed list of known misconfiguration patterns, not "does this policy's business logic actually isolate tenants." It was only caught by directly querying `pg_policies` and then simulating a real cross-org read/write attempt. Fixed via the `fix_tenant_isolation_rls_drift` migration — this file and the live project should now match; re-verify with the same direct-test method (not just the advisor) after any future RLS change.
4. **Email is soft-verified** — Supabase Auth requires clicking a confirmation link. You can disable this in Supabase settings (Auth → Providers → Email) if that's not the flow you want.
5. **Leaked password protection is off, and staying off for now** — it's a paid-tier Supabase feature, not available on the free plan this project is built to run on. Flagged by Supabase's own security advisor, but a deliberate no-go rather than an oversight -- revisit if/when the project outgrows the free tier and a paid plan is already justified for other reasons.

## Troubleshooting

### "401 Unauthorized" errors
- Check that `NEXT_PUBLIC_SUPABASE_ANON_KEY` is set and correct
- Make sure user is logged in (check browser console)

### Posts not appearing
- Verify the container exists and its visibility matches what you expect (check Supabase `containers` table)
- Check RLS policies allow read access to that container

### Can't log in after signup
- Verify user was created in `users` table
- Check `memberships` table — user should be linked to an org

### Deployment fails
- Check Vercel build logs for errors
- Ensure all env vars are set in Vercel project settings
- Make sure `schema.sql` was fully executed in Supabase

## Next Steps

1. **Get feedback from real users** — can they sign up, create/join an org, and use its workflows?
2. **Rework Catalog** — gallery/search/detail experience, quantity tracking
3. **Add real contact/social links** once you have actual accounts to point them at
4. **Revisit database-level role gating** for staff-only actions

## Questions?

Refer back to the spec docs for architecture decisions. The schema is the source of truth — everything else (UI, API routes) is just a surface over those tables.

Good luck!
