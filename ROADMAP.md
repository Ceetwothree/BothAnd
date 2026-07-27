# BothAnd — Feature Roadmap

## Status as of July 2026 (project shelved here for now)

Shipped this pass: the entire "quick fixes" batch, the entire Events
rework, the entire Catalog rework, Course progress tracking + feedback,
camera capture for photo uploads, and QR codes for both org invites and
event self-check-in. Along the way, a real tenant-isolation bug was found
and fixed live (see `SETUP_GUIDE.md`'s Security Notes) — worth reading
before making further RLS changes, since it's also a reminder that
`get_advisors` alone isn't sufficient verification for this class of bug.

**Second pass (research-only, no code):** a deeper competitive dive —
see `COMPETITIVE_RESEARCH.md`. Headline finding: the "none of this
business logic is that hard" hypothesis mostly held up against real
product docs, with identity/compliance checks (background checks) as
the one genuine exception — and even those are always a third-party API
integration, never built in-house, by any tool researched. Confirmed a
few concrete, previously-fuzzy gaps are now well-scoped and cheap:
Catalog claim-to-message threads (Olio's model), Board comment
threading (one nullable self-referencing column), and web push
notifications (Push API + service worker, no third-party SaaS needed,
closes gaps on both Board and Catalog at once). Also surfaced a real
policy-layer gap not previously on the list: **shift swapping** for
Events (propose → counter-accept → admin-approve — a real state
machine, not a quick add). And found direct precedent for cross-org
trade in food-bank network software (Link2Feed, FoodCopia) — it's a
validated, non-speculative category, though a structurally weaker "why
now" case than food's (no umbrella-org forcing function, no
perishability urgency, no food-specific liability law) — raises the
priority but doesn't change the "design pass before code" plan below.

**Third pass (research-only, no code):** dug into what users of these
tools actually complain is missing (review sites, app store reviews,
industry surveys) — overwhelmingly polish/reliability, not missing
capability, which is itself the opportunity (see `COMPETITIVE_RESEARCH.md`'s
"What users actually want" section). Also modeled donation payments in
depth: decided BothAnd will not be a payment middleman — orgs link out
to whatever processor they already use (PayPal, Venmo Charity Profile,
Donorbox, Zeffy, etc.), which is the universal designed-for pattern for
every tool researched, not a workaround. Surfaced two more cheap wins
(volunteer recognition, grant-report export) and one real trap to avoid
(donor-CRM integration — out of scope, pulls toward being a different
kind of product). All of this is now consolidated into one execution
sequence below.

**Fourth pass (research-only, no code):** modeled a real rework of
Catalog's inventory model in depth, grounded in the user's own PATH
experience — see `INVENTORY_MODEL.md`. Multiple physical sites per org
(a real entity, not a text field), an org-defined hierarchical
taxonomy (category → subcategory, layered as sector presets → "Other" →
optional full customization, replacing the flat hardcoded category list
shipped in the search/filter PR), a gift-in-kind donation-intake/receipt
concept separate from the public listing (value hidden publicly, shown
on the receipt), barcode-assisted intake, and QR scan-in/scan-out for
unstaffed share boxes (reusing the Events check-in QR pattern — a claim
with a site-level auto-fulfill toggle, not a new state machine). Big
enough to be its own initiative, not a line in the polish plan below —
see that file for the full design and what's still genuinely
undecided (attribute fields, donor-identity handling on the receipt).

**Fifth pass (research-only, no code):** grounded the Inventory Model's
two open sizing questions and staged cross-org trade — see
`INVENTORY_MODEL.md`'s updated sections. The preset taxonomy superset
turns out small (a dozen or so top-level categories across food banks,
diaper banks, clothing closets, and disaster relief, not an open-ended
problem); gift-in-kind reporting fields are grounded against IRS Form
8283 and DonorPerfect convention; the "hide value publicly" toggle now
defaults to hiding value on the public listing, always kept on the
internal donation-intake receipt. Cross-org trade itself is now a
4-stage plan (cross-org membership MVP → visibility tiers → admin-to-
admin category-delegation coalitions → an optional surplus bulletin
board), in increasing order of new RLS surface — see `INVENTORY_MODEL.md`
for the full staging and why each stage is ordered where it is.

**Sixth pass (research-only, no code):** Course is the least developed
workflow today — lesson + submission + feedback, connected to nothing
else. PATH's real, currently fully manual case (a signed paper waiver
emailed to an admin before a volunteer can see the schedule) generalizes
into a real, narrow gap: a container can require a course be completed
first. See `COURSE_GATING.md` for the full design — a container-level
gate reusing the existing lesson-submission progress definition, plus a
signature-specific refinement (frozen snapshot of what was agreed to,
typed name + explicit consent + audit trail, grounded in actual ESIGN/
UETA requirements) for the waiver case specifically. Also see
`COMPETITIVE_RESEARCH.md`'s Category 4 for why this is worth building
despite the earlier "not Moodle-scale" verdict standing — it's a
narrower question (gating, not content depth) that verdict didn't cover.

## Polish iteration plan

Many small iterations, each roughly PR-sized (like everything shipped in
the second pass), rather than one big rework. Suggested order, cheapest
and most independent first:

1. **"Ways to give" on org Settings** — `donate_url` (clickable link,
   rendered as a Give button) + `donate_info` (freeform text: Zelle,
   mailing address, cash at events) on `orgs`. Helper text should
   surface the Venmo-Charity-Profile-vs-Zelle-ToS distinction and the
   informal-group commingling advice, not just "paste a link here."
   See `COMPETITIVE_RESEARCH.md`'s Category 6 for the full design and
   exact copy drafted for this.
2. **Catalog claim → message thread** — replaces the current
   visible-email-on-claim approach with an actual thread scoped to that
   claim, matching Olio's model.
3. **Volunteer recognition + grant-report export** for Events — both
   build on attendance/hours data that already exists; a small UI
   surface on top, not new data modeling.
4. **Web push notifications** (Push API + service worker + VAPID keys)
   — the one item here that's real infrastructure, not just a schema
   change. Closes gaps on both Board (new post/reply) and Catalog ("tell
   me when X appears") at once, so it's worth building generically
   rather than once per workflow.
5. **Board comment threading** — one nullable `parent_response_id`
   self-reference, matches Discourse's actual model.
6. **Catalog Borrow/lend listing type** — one column alongside
   `category`, not just give-away vs. gone. Note: `category` itself is
   about to be reworked from a flat hardcoded list into the org-defined
   hierarchical taxonomy in `INVENTORY_MODEL.md` — sequence this after
   that lands, or expect to touch it twice.
7. **Events shift swap** — the one genuine policy-layer gap found in
   the whole research pass. A real state machine (propose →
   counter-accept → admin-approve), needs its own short design pass,
   not a bolt-on.
8. **Events skills/availability matching** — a real, larger feature
   (tag members and events, filter or auto-suggest by fit). Also needs
   its own design pass.
9. **Inter-site trade (same org)** — once `INVENTORY_MODEL.md`'s sites
   exist, trading inventory between two sites *within one org* (e.g.
   two of Birchwood's own share boxes) is almost free: it's entirely
   inside that org's existing RLS boundary, just a request/claim scoped
   across sites instead of within one. Real value, low risk — worth
   building well before the cross-org version below.
10. **Cross-org trade** — the biggest item, and the one the whole
    project is ultimately oriented around (see the About page's origin
    story), described independently as the inciting idea behind
    Blueprint LA too. Not a single polish iteration — now staged into 4
    stages in `INVENTORY_MODEL.md` (cross-org membership MVP → visibility
    tiers → admin-to-admin coalitions → optional bulletin board), each
    its own design-and-verify pass, in increasing order of new RLS
    surface. Start with stage 1, which adds no new RLS at all.
11. **Course → Events gating** — PATH's real, fully manual case today (a
    signed waiver emailed to an admin before a volunteer sees the
    schedule), generalized into a real mechanic: a container can require
    a course be completed first. See `COURSE_GATING.md` — the gate
    itself is small (reuses the existing lesson-submission progress
    definition), the signature-specific refinement (frozen snapshot,
    typed name + consent + audit trail, self-serve-vs-staff-reviewed
    toggle) is the part that needs its own care. Sequence as two steps,
    not one.

Lower-priority items not in this sequence, still open, revisit if they
become relevant: Journal polish (rich text/photos/tags/search) and
Course rich lesson content (no competitive pressure driving either);
Board categories/tags/search/admin pinning; database-level role gating
(`records_write`/`containers_admin_write` RLS currently let any active
member write regardless of role — today's role gates are UI-level
checks only); Freecycle-style hotword moderation (only relevant if
BothAnd opens up to larger/public orgs).

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
Not exhaustive — a snapshot to work from, not a permanent ranking. See
`COMPETITIVE_RESEARCH.md` for a deeper architecture-level pass (pricing
gates, what's genuinely hard vs. just CRUD+workflow, open-source
alternatives' real data models) done after this table was first built.

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
| Search/filter by category, keyword, location | ~~Have it~~ — keyword search (title/body/location) + a fixed-category dropdown, filtered client-side over the already-fetched list | No |
| Gallery/grid view | ~~Have it~~ — CSS grid of photo cards, replacing the plain list | No |
| In-app messaging (poster ↔ claimant) | Only via visible email on claim | Yes |
| Favorites / saved items | None | Yes |
| Notifications ("tell me when X appears") | None | Yes — also the mechanism cross-org trade would eventually need |
| Quantity/stock tracking | ~~Have it~~ — a listing has a quantity (default 1, matching old single-item behavior); each claim requests a specific amount (reuses `responses.qty`, same column Events attendance hours use); a card shows "X of Y available" and disables claiming once fully spoken for | No |

Every gap on this list except in-app messaging, favorites, and
notifications is now closed. Those three (plus the mechanism they'd share)
are the natural next step, and also what the aspirational cross-org trade
feature would be built on.

## Journal & Course — lower competitive pressure

Journal is an internal utility (no real external "premium alternative"
pressure); Course competes loosely with free-tier Google Classroom.

- **Journal**: missing rich text/photos, tags, search. Not urgent.
- **Course**: ~~progress tracking~~ — done ("N of M lessons submitted");
  ~~grading/feedback on submissions~~ — done (course author leaves
  feedback per submission via a new `responses.feedback` column and
  `responses_submission_feedback` RLS policy, same staff/admin-acting-on-
  someone-else's-response shape as the Events attendance policies). Rich
  lesson content remains, not urgent.

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
   recurring/templated shift generation, attendance/hours logged
   (including walk-in self-check-in via QR).
3. ~~Catalog rework~~ — done: photos, gallery view, search/filter,
   quantity/stock tracking.

What comes after this (messaging, notifications, recognition, donation
links, shift swap, skills matching, cross-org trade, Journal/Course
polish) is now tracked as the "Polish iteration plan" near the top of
this file, not here — that supersedes this list.
