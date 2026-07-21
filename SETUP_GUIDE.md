# BothAnd MVP — Setup & Deployment Guide

## Overview

This is the forum MVP for BothAnd. Public-facing forum with member dashboard for creating posts. The full schema is in place, but only forum workflows are surfaced in the UI.

## What's Included

- **Frontend:** Next.js 14 (React) with public forum view and member dashboard
- **Backend:** Next.js API routes
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
- All 6 tables (users, orgs, containers, records, responses, etc.)
- Row-Level Security policies on every table
- The default "themission" org
- A public forum container

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

### Create Invite Code (Manual for MVP)

Since you don't have an invite system yet, advisors can:
1. Go to `/signup`
2. Sign up with their email
3. They're automatically added to "themission" org as members

### Test the Flow

1. **Public view** (anyone):
   - Visit home page → see public forum posts

2. **Member view** (logged in):
   - Login → go to `/dashboard`
   - Create a post → it appears on public forum

3. **Admin view** (you only, for now):
   - In Supabase console, manually update your membership role to `admin`
   - Future: implement admin controls in UI

## Schema Mapping (For Your Reference)

| Feature | Tables | Notes |
|---------|--------|-------|
| Forum posts | records (kind=post) | Anyone can read public; members can post |
| Comments | responses (kind=comment) | Same visibility as parent post |
| User identity | users, memberships | Global users, org-level roles |
| Permissions | RLS policies + org_id | Row-Level Security handles isolation |

## What's Ready for Later

These workflows are structurally in the database but no UI yet:
- **Inventory** (kind=inventory, movements)
- **Events** (kind=event, capacity tracking)
- **Journal** (kind=journal, owner-only)
- **Requests** (kind=item, open/fulfilled flow)
- **Lessons** (kind=lesson, progression tracking)

To add them: create new container types and record types, build UI components, wire to existing API.

## Security Notes

1. **RLS is the enforcement layer** — all data isolation happens at the database, not just the app
2. **Never expose the service role key** — only use the anon key (already in env template)
3. **Test tenancy before adding real data** — if you add another org later, verify RLS blocks cross-org reads
4. **Email is soft-verified** — Supabase Auth requires clicking a confirmation link. For MVP, you can disable this in Supabase settings (Auth → Providers → Email).

## Troubleshooting

### "401 Unauthorized" errors
- Check that `NEXT_PUBLIC_SUPABASE_ANON_KEY` is set and correct
- Make sure user is logged in (check browser console)

### Posts not appearing
- Verify container exists and is public (check Supabase `containers` table)
- Check RLS policies allow read access to that container

### Can't login after signup
- Verify user was created in `users` table
- Check `memberships` table — user should be linked to org

### Deployment fails
- Check Vercel build logs for errors
- Ensure all env vars are set in Vercel project settings
- Make sure schema.sql was fully executed in Supabase

## Next Steps

1. **Get feedback from advisors** — can they sign up, see posts, create posts?
2. **Iterate on forum UI** — does the look/feel match what you want?
3. **Add invite codes** — implement actual invite link generation (not just open signup)
4. **Add admin moderation** — ability to pin/approve posts
5. **Start on Inventory** — once forum feels solid, add the marketplace

## Questions?

Refer back to the spec docs for architecture decisions. The schema is the source of truth — everything else (UI, API routes) is just a surface over those tables.

Good luck!
