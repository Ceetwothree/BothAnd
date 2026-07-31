# BothAnd — Course Gating (design only, not yet built)

Design, not implementation — same status as `INVENTORY_MODEL.md`. Nothing
here has a migration or code behind it yet.

## Why this exists

Course is currently the least-fleshed-out workflow: lesson + submission +
feedback + a simple progress count, and nothing connects it to anything
else in the app. The real case that exposes the gap: PATH requires a
signed liability waiver before a volunteer can see the volunteering
schedule at all. Today that's entirely manual — a paper or PDF waiver,
signed, then emailed to an admin, who has to remember who's cleared and
who isn't, outside any system. It's a genuine "go complete this, then
you get access" pattern, and it's not specific to PATH or to waivers —
the same shape covers any "read this policy / watch this orientation
video, then you can see X" requirement an org might want.

## The mechanic: a container can require a course

Reuse what's already built rather than invent new machinery. Course
progress is already tracked as "N of M lessons submitted" — that
definition is the gate condition, unchanged. A container (Events, most
concretely, but not specific to it) gets one nullable field —
`containers.requires_course_container_id`, pointing at another container
of kind `course` in the same org. If set: a member must have
submitted every lesson in that course before any record in the gated
container becomes visible to them.

This is deliberately container-level, not record-level (gate the whole
Events schedule, not individual events one at a time) — that's PATH's
actual case, and finer-grained gating isn't a known need yet. A
single-lesson "course" is just the degenerate case of this — a one-page
waiver is a course with one lesson in it, no separate concept required.

## Waivers are a refinement of "submission," not a new kind

A plain lesson submission today is a freeform `body` — fine for
"describe what you learned," not fine for something that needs to hold
up as an actual liability waiver. Two things a real e-signature needs
that a generic submission doesn't have yet, both narrowly scoped
additions to the existing `responses` row for a submission:

- **A frozen copy of exactly what was agreed to.** A lesson's `body` can
  be edited later by an admin; a waiver can't retroactively change what
  someone already signed. The submission needs to snapshot the lesson's
  text at the moment of signing, not just point at the live lesson row.
- **An audit trail: typed legal name, an explicit "I have read and
  agree" affirmative action (not just submitting counts — the ESIGN Act
  and UETA require an intentional act of assent, which is why every real
  e-signature tool pairs a text field with a checkbox, not just a
  textbox), and a timestamp** (already have `created_at`) **plus, if
  this is meant to survive a real dispute, an IP address at signing
  time** — none of which the schema captures today. Typed name + a
  deliberate consent action, with those three retained, is genuinely
  sufficient under ESIGN/UETA — a proper signature pad isn't legally
  required. What actually gets waivers thrown out in practice isn't the
  typed-name method, it's a missing audit trail.

A lesson gets one new flag, `records.requires_signature` (meaningful
only for kind='lesson'), telling the submission UI to collect the
typed-name/checkbox/snapshot instead of a plain text box. Same table,
same kind-specific-nullable-column pattern used everywhere else in this
schema — not a new record or response kind.

## Self-serve vs. staff-reviewed: the same toggle shape as share-box scan-out

This is the same design fork already resolved once, for a different
workflow, in `INVENTORY_MODEL.md`'s QR scan-out design: does completing
the requirement unlock access immediately (self-serve, open), or does a
staff/admin still have to manually clear the person before access opens
(reviewed, gated)? Same answer shape applies here: one boolean, default
self-serve. A validly captured e-signature is a complete legal artifact
on its own — there's nothing left to review in the common case, unlike
scan-out's honor-system risk. An org that wants to also verify something
a signature alone can't attest to (insurance paperwork, a background
check result, in-person orientation attendance) can flip the toggle to
require a staff sign-off after submission, at which point the member
sees a "pending review" state instead of immediate access.

Open, not yet resolved: whether that pending/approved state needs its
own column on `responses` (an `approved_by`/`approved_at` pair,
meaningful only under staff-review mode) or can piggyback on the
existing `feedback` field. Leaning toward a real column — using
`feedback` to also mean "approved" conflates two different things an
admin might want to say.

## RLS: same-org, lower risk than cross-org trade, still needs verifying

This is a new visibility rule — "can this member see records in this
gated container" now depends on their state in a different container
entirely — which is a genuinely new condition on the `records`/
`containers` read policies. Worth being explicit about what kind of new
surface this is, since the project just went through exactly this
exercise for cross-org trade: this one stays entirely inside a single
org's existing tenancy boundary — no data becomes visible across orgs,
only conditionally hidden within one. Meaningfully lower risk than
cross-org visibility work, but "lower risk" isn't "no risk" — any new
read-policy condition gets the same `SET LOCAL ROLE` simulation
treatment as everything else, not a pass because it's same-org.

## Open questions

- **Re-signing / expiry.** Does a waiver need an annual re-sign (common
  in real liability-waiver practice), and if so, is that a property of
  the lesson (an org-set expiry period) or left entirely manual for now?
  Not resolved.
- **What the member sees before completing the gate.** Blocked
  entirely (can't see the container exists), or visible-but-locked with
  a clear "complete X to unlock" message? The latter is almost certainly
  right — an invisible container is confusing, not protective — but
  worth stating as a decision, not an assumption.

## Competitive framing

Two adjacent, better-researched markets, neither of which BothAnd is
trying to become, but both worth naming as precedent:

- **Standalone volunteer-waiver SaaS** (Smartwaiver, WaiverSign,
  VolunteerHub's waiver feature, Galaxy Digital, VolunteerMatters) — real
  products nonprofits pay for *specifically because* their
  volunteer-scheduling tool didn't have this built in. That's the actual
  gap: not that waiver-collection is hard, but that it's usually a
  bolt-on second subscription. Building it as a native extension of
  Course + Events (already free, already there) removes a whole
  category of tool a small org would otherwise need to separately find,
  trust, and pay for.
- **Corporate compliance-training LMS** (Traliant, EasyLlama,
  BizLibrary) — the "did you complete your anti-fraud/anti-harassment
  training" pattern the org described. These platforms' core mechanic —
  assign, track completion, gate role-based access, produce an audit
  trail — is structurally the same shape as this design, just at
  enterprise HR scale and price. Useful as a design precedent for the
  completion-gates-access mechanic; not a direct competitor, since the
  buyer and price point are entirely different from BothAnd's nonprofit/
  community-group audience.

## Status

Design only. Not scheduled against `ROADMAP.md`'s Polish iteration plan
yet as a specific PR-sized step — the gate mechanic itself
(`requires_course_container_id`, gated-container UI) is genuinely small;
the waiver/signature refinement (snapshot, audit trail, self-serve vs.
reviewed toggle) is the part that needs its own care. Worth sequencing
as two steps when it's actually picked up: the generic gate first, the
signature-specific refinement second.
