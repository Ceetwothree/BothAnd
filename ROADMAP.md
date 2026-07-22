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
| Comments (flat, not threaded) | ~~Have it~~ — wired up directly against Supabase, not the old dead `app/api/forum` routes | Threading still missing |
| Edit/delete your own post | ~~Have it~~ | No |
| Categories/tags, search | None | Yes |
| Notifications (new post/reply) | None | Yes |
| Pinning by admin | None | Yes |

## Events — competes with SignUpGenius, VolunteerHub, Vome, food-bank/church schedulers

| Typical feature | BothAnd today | Gap |
|---|---|---|
| Recurring/templated shift generation (bulk-create a season) | ~~Have it~~ — pick weekdays (or Every day / Weekly quick-picks) + a repeat-until date, capped at 366 occurrences, bulk-inserted as independent event records (no series/template concept, no schema change) | No |
| Dedicated date/time field | ~~Have it~~ — `starts_at`/`ends_at` columns, sorted soonest-first | No |
| Waitlist when full | ~~Have it~~ — derived from RSVP order vs. capacity, no schema needed; confirmed spots auto-promote from the waitlist on cancellation | No |
| RSVP / cancel | Insert/delete a `rsvp` response | Have it |
| Automated reminders | None | Yes |
| Attendance/check-in + hours logged (grant reporting) | ~~Have it~~ — staff/admin marks confirmed RSVPs attended with hours (a new `attended` response kind, hours in the pre-existing unused `qty` column); per-event total shown. No walk-in/add-attendee flow yet for someone who didn't RSVP | Partial |
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
| Photos per listing | ~~Have it~~ — one photo per listing, uploaded to a new `catalog-photos` storage bucket, member-scoped (not admin-only, unlike org branding) | No |
| Search/filter by category, keyword, location | None | Yes |
| Gallery/grid view | ~~Have it~~ — CSS grid of photo cards, replacing the plain list | No |
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
- ~~No "forgot password" flow~~ — fixed (`/forgot-password` + `/reset-password`).
- ~~No self-service "leave an org"~~ — fixed (`leave_org()` RPC + a
  "Leave organization" control on the org's Settings page, for both admins
  and regular members; blocks the sole remaining admin from leaving).
- ~~No edit/delete on your own Board post~~ — fixed, along with wiring up
  Board comments (the old `app/api/forum/*` routes turned out to be dead
  and broken — `createServerClient()` never carried the caller's session,
  so the POST route always 401'd. Comments now go through the same direct
  Supabase-client pattern already used everywhere else, not that API).
- ~~Catalog photo upload didn't go straight to the camera on a phone~~ —
  fixed with the `capture="environment"` attribute on the file input, so
  someone doing inventory on an iPhone gets the camera immediately instead
  of an intermediate "Take Photo or Library" sheet.
- ~~No QR code for the org invite link~~ — fixed: Settings now renders one
  (`qrcode.react`) next to the invite URL, for printing/displaying so
  people can scan to join instead of typing a link.
- ~~No QR check-in for events~~ — fixed: staff can reveal a per-event QR
  code on the Events page linking to `/org/[slug]/events/[id]/checkin`;
  any active member who scans it can self-check-in, no staff bottleneck.
  Chosen model is self-check-in (self-reported, not staff-verified) --
  needed no new RLS at all, since `responses_write` already permitted
  inserting your own response of any kind, `attended` included. A
  self-check-in from someone who never RSVPed now shows up in the
  existing staff-facing Attendance list flagged "(walk-in, no RSVP)", so
  staff can still edit hours on or remove any entry, self-checked-in or
  not, via the `responses_attendance_*` policies already in place.

## Suggested order

1. ~~Quick, high-leverage fixes~~ — done: forgot-password flow, Board
   comments wired up, self-service leave-org, edit/delete own post.
2. ~~Events rework~~ — done: real date/time field, waitlist,
   recurring/templated shift generation, attendance/hours logged. Only
   walk-in attendance (someone who didn't RSVP) and automated
   reminders/calendar view remain, and are low-priority.
3. **Catalog rework**: photos, search/filter, gallery view, quantity
   tracking — sets up the cross-org trade feature too.
4. **Cross-org trade** (the aspirational feature) — once Catalog itself is
   solid, since it's built on the same data model.
5. Journal/Course polish, as time allows — lower urgency.
