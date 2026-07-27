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

Reorganized from a flat priority list into dependency-ordered tiers —
several items quietly depended on other items that weren't themselves
scheduled anywhere. Tiers are ordered by what actually blocks what, not
just by size; within a tier, cheapest/most independent first.

### Tier 0 — ship first, zero dependencies

1. **Cross-org trade, Stage 1** (the cross-org-membership nudge from
   `INVENTORY_MODEL.md`'s staged plan) — genuinely the cheapest thing in
   the entire plan: zero schema change, zero new RLS, a line of copy on
   the `browse` page (*"if another group makes items available to
   members, you can join and request them"*). Worth doing first
   specifically because it tests real demand for cross-org access before
   any of the harder, riskier stages get built.
2. **"Ways to give" on org Settings** — `donate_url` (clickable link,
   rendered as a Give button) + `donate_info` (freeform text: Zelle,
   mailing address, cash at events) on `orgs`. Helper text should
   surface the Venmo-Charity-Profile-vs-Zelle-ToS distinction and the
   informal-group commingling advice, not just "paste a link here."
   See `COMPETITIVE_RESEARCH.md`'s Category 6 for the full design and
   exact copy drafted for this.
3. **Catalog claim → message thread** — replaces the current
   visible-email-on-claim approach with an actual thread scoped to that
   claim, matching Olio's model.
4. **Volunteer recognition + grant-report export** for Events — both
   build on attendance/hours data that already exists; a small UI
   surface on top, not new data modeling.
5. **Board comment threading** — one nullable `parent_response_id`
   self-reference, matches Discourse's actual model.
6. **Course gating, base mechanic** — `containers.requires_course_container_id`
   + a locked-container UI state, reusing the existing lesson-submission
   progress definition. Independent of the waiver-signature specifics in
   Tier 1 below — real value on its own (any "complete this training
   first" case, not just liability waivers). See `COURSE_GATING.md`.

### Tier 1 — still independent, each needs its own short design pass

7. **Web push notifications** (Push API + service worker + VAPID keys)
   — the one item here that's real infrastructure, not just a schema
   change. Closes gaps on both Board (new post/reply) and Catalog ("tell
   me when X appears") at once, so it's worth building generically
   rather than once per workflow.
8. **Course gating, waiver refinement** — frozen snapshot of what was
   agreed to, typed name + explicit consent + audit trail (grounded in
   ESIGN Act/UETA requirements), self-serve-vs-staff-reviewed toggle.
   Builds on Tier 0 item 6. See `COURSE_GATING.md`.
9. **Events shift swap** — the one genuine policy-layer gap found in
   the whole research pass. A real state machine (propose →
   counter-accept → admin-approve), needs its own short design pass,
   not a bolt-on.
10. **Events skills/availability matching** — a real, larger feature
    (tag members and events, filter or auto-suggest by fit). Also needs
    its own design pass.

### Tier 2 — the big initiative, build as one sequenced project

11. **Inventory Model** (`INVENTORY_MODEL.md`) — this is the prerequisite
    that was implicit but never itself a scheduled step: sites →
    taxonomy (sector presets → "Other" → optional custom editor) →
    migrate the existing flat hardcoded `category` column onto it →
    gift-in-kind receipt / value-visibility toggle → barcode-assisted
    intake → QR scan-in/scan-out for share boxes, in that internal
    order. Once this exists, two previously-listed items become cheap
    follow-ons rather than needing their own design work:
    - **Catalog Borrow/lend listing type** — one column alongside the
      new taxonomy, not just give-away vs. gone.
    - **Inter-site trade (same org)** — trading inventory between two
      sites *within* one org (e.g. two of Birchwood's own share boxes)
      is almost free once sites exist: entirely inside that org's
      existing RLS boundary, just a request/claim scoped across sites
      instead of within one.

### Tier 3 — deliberately last, hardest new RLS surface

12. **Cross-org trade, Stages 2–4** — visibility tiers (public/member/
    staff-only) → admin-to-admin category-delegation coalitions →
    optional surplus bulletin board. Sequenced after the Inventory Model
    (reasoning about what's shareable needs the taxonomy to exist) and
    after Stage 1 has actually shown whether people want this. Each
    stage is its own design-and-verify pass — see `INVENTORY_MODEL.md`.

Lower-priority items not in this sequence, still open, revisit if they
become relevant: Journal polish (rich text/photos/tags/search) and
Course rich lesson content (no competitive pressure driving either);
Board categories/tags/search/admin pinning; database-level role gating
(`records_write`/`containers_admin_write` RLS currently let any active
member write regardless of role — today's role gates are UI-level
checks only); Freecycle-style hotword moderation (only relevant if
BothAnd opens up to larger/public orgs).

## Gaps found in a review pass (not yet scheduled)

A deliberate "what's missing that we haven't thought of" pass, prompted
directly by the question. Not yet prioritized into the tiers above —
that's a judgment call worth making separately, not something to bury
inside a reordering.

**Worth real weight** — these aren't cosmetic:

- **No RLS regression testing.** The one real security incident this
  project has had (the tenant-isolation drift) was caught by hand, once,
  via manual `SET LOCAL ROLE` simulation — a real, repeatable method, but
  not automated. Nothing currently stops a future schema change from
  silently reintroducing that exact class of bug. Arguably deserves
  higher priority than several Tier 1 items, precisely because it's the
  project's own hard-won lesson.
- **No data-export / continuity story.** A single-maintainer, free
  project has no "export your org's data" path today. Any org that comes
  to depend on it has no way to get their own data back if it stops
  being maintained — a real trust question, not a hypothetical one,
  given tomorrow's meeting.
- **No account/data deletion path.** Leave-org is self-service; full
  account deletion isn't. Pairs directly with the donation-intake
  design's already-open question (how much donor identity the
  gift-in-kind receipt carries) — PII handling and deletion belong in
  the same design pass, not separate ones.
- **No Terms of Service / Privacy Policy for BothAnd itself.** Notable
  given Course Gating is literally about collecting legally-binding
  e-signatures — the platform collecting them probably needs its own
  baseline legal pages.
- **No first-run/onboarding flow for a brand-new org.** The competitive
  research's own headline finding was "polish over features" — the
  single biggest polish gap is a new admin's first ten minutes, which
  today is an empty Settings page.
- **Background-check integration is named but never scheduled.**
  `COMPETITIVE_RESEARCH.md` already flagged this as the one genuine
  exception to "none of this is hard" (always a third-party API
  integration, never built in-house, by any tool researched) — but it
  doesn't appear anywhere in the actual build order above.

**Worth naming, lower priority:**

- Spam/abuse prevention on public join/invite flows (no captcha or rate
  limiting today)
- Admin activity/audit log (role changes, invite-code regeneration, etc.)
- Accessibility pass (screen reader, keyboard nav, contrast — especially
  relevant given the populations some orgs serve)
- Basic product analytics for the maintainer (which workflows are
  actually used, useful before investing further in a workflow like
  Course)

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
