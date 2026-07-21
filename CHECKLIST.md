# BothAnd MVP — Deployment Checklist

## Pre-Deployment (30 mins)

- [ ] Create Supabase project (free tier)
- [ ] Get Supabase URL and Anon Key
- [ ] Push code to GitHub repo
- [ ] Create Vercel account, connect GitHub

## Deployment (15 mins)

### 1. Database Setup
- [ ] Open Supabase SQL Editor
- [ ] Copy schema.sql (all ~400 lines)
- [ ] Run in SQL editor
- [ ] Verify tables created:
  - [ ] `users`
  - [ ] `orgs`
  - [ ] `memberships`
  - [ ] `containers`
  - [ ] `records`
  - [ ] `responses`
- [ ] Verify "themission" org exists
- [ ] Verify "Forum" container exists in themission org

### 2. Vercel Setup
- [ ] Go to https://vercel.com/new
- [ ] Import GitHub repo
- [ ] Add environment variables:
  - [ ] `NEXT_PUBLIC_SUPABASE_URL` = your Supabase URL
  - [ ] `NEXT_PUBLIC_SUPABASE_ANON_KEY` = your Supabase anon key
- [ ] Deploy
- [ ] Wait for deployment to complete (~1-2 mins)
- [ ] Visit your Vercel URL

### 3. Test the Deployment
- [ ] Visit public home page → see "The Mission" forum
- [ ] Visit `/signup` → test signup flow
- [ ] Create an account (use test email)
- [ ] Verify you're logged in
- [ ] Visit `/dashboard` → create a test post
- [ ] Go back to home → verify post appears publicly
- [ ] Logout → verify public forum still visible
- [ ] Create another account → test two-user scenario

## Post-Deployment (Optional)

- [ ] Add custom domain (optional, see SETUP_GUIDE.md)
- [ ] Invite advisors (send signup link)
- [ ] Monitor logs in Vercel dashboard
- [ ] Keep schema.sql as backup for reference

## Emergency Fixes

**If deployment fails:**
1. Check Vercel build logs (red X next to deploy)
2. Verify all env vars are set
3. Verify schema.sql ran without errors
4. Check PostgreSQL Row-Level Security policies are enabled

**If login doesn't work:**
1. Verify user exists in Supabase `users` table
2. Verify membership exists in `memberships` table
3. Check browser console for auth errors

**If posts don't appear:**
1. Verify container exists (Supabase → `containers` table)
2. Verify visibility = 'public'
3. Check RLS policies in schema

## File Structure Reminder

After you clone/download:

```
bothand/
├── schema.sql              # Run this in Supabase first
├── SETUP_GUIDE.md          # Full deployment instructions
├── README.md               # Project overview
├── package.json            # npm install this
├── next.config.js          # Next.js config
├── tsconfig.json           # TypeScript config
├── .env.example            # Copy to .env.local locally
├── .gitignore
├── vercel.json
├── lib/
│   └── supabase.ts         # Supabase client
├── app/
│   ├── layout.tsx          # Root layout
│   ├── page.tsx            # Home + public forum
│   ├── login/page.tsx      # Login
│   ├── signup/page.tsx     # Signup
│   ├── dashboard/page.tsx  # Member dashboard
│   └── api/
│       ├── auth/...        # Auth routes
│       └── forum/...       # Forum routes
```

## Advisor Signup Link

Once deployed, give advisors this link:
```
https://your-vercel-url/signup
```

They sign up → automatically added to "themission" org → can see public forum → can create posts from dashboard.

## Timeline

- 5 mins: Supabase setup
- 10 mins: Vercel deploy
- 5 mins: Testing
- Total: 20 minutes to live

No servers to manage, no Docker, no build process to learn. Push to GitHub → Vercel auto-deploys.

Good luck! 🚀
