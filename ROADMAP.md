# BothAnd — Feature Roadmap

## Thesis

The long-run bet: an organization running BothAnd shouldn't have a real reason
to also pay for a premium volunteer-scheduling tool, a marketplace/classifieds
app, or a blog CMS, once each workflow here reaches parity with what those
tools consider table stakes. This doc tracks that comparison per workflow —
what the paid/premium version of each category typically includes, what
BothAnd has today, and the concrete gap between them — plus a running list of
smaller UX holes found along the way. It's a living document: update it as
gaps close or new ones surface, don't let it go stale the way README/SETUP_GUIDE
did before the July 2026 documentation pass.

Research basis: web search of current (2026) volunteer-scheduling, marketplace/
classifieds, and blog-CMS tools, plus direct reading of BothAnd's own code.
Not exhaustive — a snapshot to work from, not a permanent ranking.

## Board — competes with blog/CMS tools (Ghost, WordPress, Substack) + lightweight forums

| Typical feature | BothAnd today | Gap |
|---|---|---|
| Rich text / markdown, images | Plain text title + body | Yes |
| Threaded comments | **Backend already exists** (`app/api/forum/comments/route.ts`, full GET/POST, RLS-aware) but no UI calls it | Wire up the UI — cheapest, highest-leverage gap on this whole list |
| Edit/delete your own post | Not possible once posted | Yes |
| Categories/tags, search | None | Yes |
| Notifications (new post/reply) | None | Yes |
| Pinning by admin | None | Yes |

## Events — competes with SignUpGenius, VolunteerHub, Vome, food-bank/church schedulers

| Typical feature | BothAnd today | Gap |
|---|---|---|
| Recurring/templated shift generation (bulk-create a season) | One-off events only, created individually | Yes — the widest gap on this list |
| Dedicated date/time field | Folded into free-text description | Yes |
| Min/max capacity + waitlist when full | Capacity is a plain client-side count, no waitlist | Partial |
| RSVP / cancel | Insert/delete a `rsvp` response | Have it |
| Automated reminders | None | Yes |
| Attendance/check-in + hours logged (grant reporting) | None | Yes |
| Group sign-up | None | Yes |
| Calendar view, save-as-template | None | Yes |

This is where the "why would I pay for a premium tool" case is weakest today.
The motivating example (PATH's Cooks program: 4 shifts × 365 days/year) is
exactly the "generate a season from a template" pattern every volunteer-
scheduling tool treats as table stakes — today, matching it would mean
creating roughly 1,460 individual events a year by hand.

## Catalog — competes with Freecycle / Buy Nothing Project, not payment marketplaces

| Typical feature | BothAnd today | Gap |
|---|---|---|
| First-come-first-served claiming | Claim/withdraw a `claim` response | Have it |
| Photos per listing | Text-only | Yes |
| Search/filter by category, keyword, location | None | Yes |
| Gallery/grid view | Plain list | Yes |
| In-app messaging (poster ↔ claimant) | Only via visible email on claim | Yes |
| Favorites / saved items | None | Yes |
| Notifications ("tell me when X appears") | None | Yes — also the mechanism cross-org trade would eventually need |
| Quantity/stock tracking | Single claimable item per listing | Yes |

Confirms the earlier call: Catalog needs a real rework (gallery/search/detail,
not a text list), and it's structurally the same gap that stands between here
and the aspirational cross-org trade feature.

## Journal & Course — lower competitive pressure

Journal is an internal utility (no real external "premium alternative"
pressure); Course competes loosely with free-tier Google Classroom.

- **Journal**: missing rich text/photos, tags, search. Not urgent.
- **Course**: missing progress tracking (flagged as a known gap when it
  shipped), grading/feedback on submissions, rich lesson content.

## Small UX holes (found opportunistically, not from competitor research)

- ~~Logout doesn't update the UI after signing out~~ — fixed.
- **No "forgot password" flow** — `app/login/page.tsx` has no reset link at
  all; Supabase Auth supports it, nothing in the UI calls it.
- **No self-service "leave an org"** — a member can't remove themselves;
  only an admin can deactivate them via Members.
- **No edit/delete on your own Board post** once it's posted (same fix as
  the Board gap above, effectively).

## Suggested order

1. **Quick, high-leverage fixes**: forgot-password flow, wire up Board
   comments (backend exists), self-service leave-org, edit/delete own post.
2. **Events rework**: recurring/templated shifts, real date/time field,
   waitlist, attendance/hours tracking — the biggest lift, closest to the
   actual motivating use case.
3. **Catalog rework**: photos, search/filter, gallery view, quantity
   tracking — sets up the cross-org trade feature too.
4. **Cross-org trade** (the aspirational feature) — once Catalog itself is
   solid, since it's built on the same data model.
5. Journal/Course polish, as time allows — lower urgency.
