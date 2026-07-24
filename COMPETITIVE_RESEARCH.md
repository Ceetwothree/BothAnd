# BothAnd — Competitive Research Deep-Dive

Written July 2026, during a research-only pass (no code changes) while the
project is shelved. Goal: go past the surface feature-comparison tables in
`ROADMAP.md` and understand *how* commercial tools in each category are
actually built, what's genuinely hard vs. what's just CRUD + a workflow,
and where a free tool could be a real feature improvement, not just a free
clone.

Method: web search across each category's leading commercial products,
their public pricing/feature-gate pages, their support docs (which often
describe internals more precisely than marketing pages), and — where one
exists — an open-source alternative's actual repo, since that's the only
place competitors' real data models are visible rather than inferred.
Not exhaustive. Sources linked inline.

## Headline finding

The user's working hypothesis going in was: *none of the actual business
logic in these tools is particularly challenging.* This research mostly
confirms it, with one real exception and one important nuance:

- **The exception:** identity/compliance verification (background checks,
  address verification) is genuinely hard — legally, operationally, and
  in trust terms. But *every* tool in this space handles it the same
  way: they don't build it, they integrate a specialized third-party
  vendor via API (Sterling Volunteers, Verified Volunteers, First
  Advantage) and just store the pass/fail result and an expiry date.
  That's a strong signal for BothAnd: if this is ever needed, it's an
  API-integration afternoon, not a feature to build in-house.
- **The nuance:** the hard part these tools have actually solved isn't
  the CRUD, it's the *policy layer* on top of CRUD — shift-swap approval
  chains, skills/availability matching, recurring-template generation
  with per-occurrence overrides, multi-org inventory routing. BothAnd's
  existing "kind-specific nullable column on one shared table" pattern
  already handles the CRUD side as well as any of these tools do. The
  places where BothAnd is behind are specifically the policy layer —
  see the per-category notes below.

## Category 1: Volunteer / event scheduling

**Players researched:** SignUpGenius, VolunteerHub, Better Impact
(Volunteer Impact), Rosterfy, Golden, Vome, VolunteerMatters, Volgistics.

### Pricing and what's gated

| Tool | Entry price | What's paywalled |
|---|---|---|
| SignUpGenius | Free tier exists; paid $8.99–$59.99/mo (annual) | Custom branding, more signup slots per event, tabbed multi-slot signups, embeddable widgets, priority support. Free tier carries ads. |
| VolunteerHub | Plus $143/mo (1,000 volunteers) | Kiosk/QR check-in, OnSite app, background-check integration, analytics — these are Pro/Enterprise-gated |
| Better Impact | Custom, scales with formality (training/certs/compliance) | Everything — it's priced for programs that need the compliance layer |
| Bloomerang (Volunteer add-on) | $119/mo on top of $125/mo CRM | Volunteer module is a bolt-on to the donor CRM, not standalone |

[SignUpGenius pricing](https://www.signupgenius.com/resources/signupgenius-cost) ·
[VolunteerHub vs SignUpGenius](https://www.capterra.com/compare/79209-135392/VolunteerHub-vs-SignUpGenius) ·
[Better Impact vs Volgistics](https://blog.betterimpact.com/en/better-impact-vs-volgistics) ·
[Bloomerang pricing](https://neonone.com/resources/blog/crms-for-nonprofits/)

### What's actually built vs. what's genuinely a policy problem

- **Recurring shifts**: every tool frames this as "save a shift as a
  template, reuse it" — exactly the pattern BothAnd shipped
  (weekday-pick + repeat-until, bulk-insert independent rows). No tool
  claims anything cleverer than templating; this confirms it isn't a
  gap. [Golden](https://goldenvolunteer.com/platform/scheduling/) ·
  [Vome](https://www.vomevolunteer.com/volunteer-scheduling-software/)
- **Waitlist**: BothAnd's derived-from-order-vs-capacity approach with
  auto-promotion on cancellation is functionally identical to what these
  tools describe, just without a stored waitlist table. No loss there.
- **Check-in/attendance**: VolunteerHub's actual mechanism is a
  **day-specific QR code** printed once per day/event, scanned by the
  volunteer's own phone camera (not an in-app scanner), landing on a
  login-gated check-in page —
  [functionally identical to what BothAnd just shipped](https://support.volunteerhub.com/support/solutions/articles/60000610968-using-qr-codes-to-check-volunteers-into-events).
  One difference worth noting: VolunteerHub lets the org choose *when*
  hours get granted — at registration, check-in, or check-out. BothAnd
  currently only supports check-in-time (or after-the-fact staff entry).
  Minor, easy to add if ever wanted.
- **Shift swapping** (a real gap): this is the one scheduling feature
  BothAnd doesn't have at all. The actual workflow tools use: volunteer A
  requests a swap → volunteer B (matching role/skill level) agrees →
  a supervisor approves → both parties notified. That's a real,
  non-trivial state machine (proposal → counter-accept → admin approval),
  not just CRUD.
  [Rosterfy's swap policy writeup](https://www.rosterfy.com/resources-hub/blog/managing-shift-swapping-for-volunteers-how-to-develop-a-policy/) is the clearest description found.
- **Skills/availability matching** (a real gap, and a real feature
  improvement opportunity): Rosterfy auto-assigns volunteers to shifts
  based on tagged skills, availability windows, and interests, rather
  than volunteers browsing and self-selecting. This is a genuinely
  useful feature for larger orgs, and BothAnd's plain browse-and-RSVP
  model doesn't attempt it. It's buildable — tag `memberships` or a
  member profile with skills, tag events with required skills, filter/
  sort — but it's real product design work, not a schema afterthought.
  [Rosterfy](https://www.rosterfy.com/platform/advanced-scheduling/)
- **Background checks / compliance**: confirmed delegated to a vendor
  everywhere (Better Impact → Sterling Volunteers/Verified Volunteers).
  The org-side feature is just "store pass/fail + expiry, gate an
  Activity on it." [Better Impact background check guide](https://support.betterimpact.com/en/articles/8429304-comprehensive-guide-to-background-checks)

### Open-source reference point

[Coalesce](https://github.com/FederationOfTech/Coalesce) (Federation of
Humanitarian Technologists) is the closest open-source equivalent —
Django + DRF + Postgres backend, Vue frontend, Docker deployment. Its
public docs don't expose the actual shift/signup schema in enough detail
to compare directly (would need to clone and read the migrations), but
its feature list — browse opportunities, register, check in, report — is
narrower than what BothAnd already has. Not a threat, more a confirmation
that "volunteer sign-up" as a category doesn't require much more than
what's already built.

## Category 2: Marketplace / mutual aid / surplus-sharing

**Players researched:** Buy Nothing Project (app + Facebook groups),
Olio, Freecycle, Nextdoor's free/marketplace section.

### How they actually work

- **Buy Nothing Project**: notably, the *dominant* real-world
  implementation of this entire category runs on **Facebook Groups**,
  not custom software — "ISO" (in search of) and "give" posts, no
  purpose-built claim/dibs mechanism at all, just comments and DMs. The
  official Buy Nothing app is a from-scratch build specifically because
  Facebook's algorithm suppresses posts and buries content in "family
  drama." [Buy Nothing app vs Facebook writeup](https://www.honestlymodern.com/buy-nothing-groups-for-beginners/) ·
  [BNProject on the app/FB split](http://buynothingproject.org/tpost/9lf44o8cx1-do-we-have-to-choose-between-the-app-and)
  This is a genuinely useful data point: **BothAnd's Catalog, with real
  claim/quantity/category/search, is already more purpose-built than the
  actual dominant real-world tool in this exact category.**
- **Olio**: the most sophisticated of the bunch. Listings have a type
  (`Free`, `Sell`, `Borrow`, `Wanted`), a pickup radius (0.6–16 miles),
  photos, and a quantity/expiration for food items. Claiming opens an
  in-app chat thread with the lister. Notably, Olio's business model is
  business partnerships (Tesco, Pret A Manger pay to have surplus food
  redistributed through the app) — the consumer side is free, funded by
  the supply side. [Olio feature breakdown](https://medium.com/@vikas.agarwal/business-model-of-olio-food-sharing-app-5d7205cc5cf3) ·
  [How Olio listings work](https://olioapp.com/en/getting-started-on-olio/discover-the-olio-app/)
- **Freecycle**: 2003-era, Yahoo Groups → own web platform, entirely
  volunteer-moderated. The one real technical detail worth stealing:
  **hotword lists** — a per-group list of flagged words that routes a
  post into a moderation queue instead of blocking outright, so
  moderation effort scales with actual risk rather than blanket
  pre-approval. [Freecycle moderator manual](https://wiki.freecycle.org/Moderator_Manual:Common_Issues)

### Real feature-improvement opportunities

1. **Claim → message thread**, the way Olio does it (chat scoped to a
   specific claim), instead of BothAnd's current "claimant's email is
   visible to the owner" — closes the Catalog roadmap's "in-app
   messaging" gap and is a much better experience than raw email.
2. **A Borrow/lend category type**, not just give-away — Olio's data
   model treats "give it back" listings as a first-class type, not a
   special case. Cheap to add: a `listing_type` column alongside
   `category`.
3. **Hotword-style lightweight moderation** for Board and Catalog, if
   BothAnd ever opens up to larger/public orgs where a member could post
   something inappropriate — far cheaper to build than full pre-moderation
   and it's specifically what a 20-year-old volunteer-run project
   converged on as the right trade-off.

### Cross-org sharing precedent (directly relevant to the shelved
cross-org trade feature)

This turned out to be the most useful research thread for BothAnd's own
roadmap. **Networked inventory sharing between separate organizations is
a real, established category** — not something BothAnd would be
inventing from scratch:

- **Link2Feed**: food banks and their partner pantries share real-time
  inventory visibility across a *network* of otherwise-independent
  organizations, with demand forecasting to route surplus before it
  expires. [Link2Feed's networked model](https://www.link2feed.com/who-we-serve/nonprofits/)
- **FoodCopia**: explicitly framed as "share inventory and redistribute
  surplus... through real-time connections."

Both are enterprise/custom-priced, sold to networks of food banks
specifically (not general-purpose). This validates that BothAnd's
aspirational cross-org trade feature has real precedent and real demand
in exactly BothAnd's target market (nonprofits, mutual aid) — it's not
a speculative feature, it's a known gap even paid tools charge a premium
to fill. It also confirms the RLS design challenge is real: those
platforms are built *for* cross-org visibility from day one, whereas
BothAnd's schema and RLS model currently assume org boundaries are the
tenant boundary. That's exactly why this needs the design pass before
any code, as already flagged in `ROADMAP.md`.

## Category 3: Board — blog/CMS/forum

**Players researched:** Ghost, Discourse, (WordPress referenced via prior
research, not re-verified this pass).

- **Ghost**: RESTful JSON API (Content API + Admin API, separately
  authenticated), Nx monorepo, and — most relevant to BothAnd's own
  "rich text" gap — the editor (Koenig) was rebuilt from Ember +
  MobileDoc onto **React + Lexical** (Meta's rich-text framework). Ghost
  is literally cited as "the first company outside Meta to build a
  full-scale editor on Lexical." [Ghost architecture docs](https://docs.ghost.org/architecture) ·
  [Ghost's new editor writeup](https://ghost.org/changelog/new-editor/)
- **Discourse**: Rails + Ember + Postgres, categories → topics → posts,
  full nested-reply threading, tags, a plugin system, and a documented
  REST API. [Discourse open source page](https://www.discourse.org/open-source)

### Rich text editor choice (a concrete, low-risk decision for later)

Both Tiptap and Lexical are legitimate, current (2026), MIT-licensed
choices — this isn't a build-vs-buy problem, it's a five-minute library
pick when the time comes:

- **Tiptap**: headless wrapper around ProseMirror, excellent React
  hooks, Markdown-in/Markdown-out support (store as Markdown, edit
  rich). Free/open-source core; paid cloud tier ($149/mo) only for
  real-time collaboration, comments, and AI features BothAnd doesn't
  need. [Tiptap vs ProseMirror](https://medium.com/@support_56991/prosemirror-vs-tiptap-2026-whats-the-difference-6a7138bf7d8e)
- **Lexical**: what Ghost chose, Meta-backed, also free/open-source.

Either is a real option; Tiptap's Markdown round-trip probably fits
BothAnd's existing plain-`TEXT`-column storage model better with less
migration risk (store Markdown in the existing `body TEXT` column,
render it, no new column needed) than Lexical's JSON-tree document
format would.

### Threading and categories

Discourse's category → topic → post model is exactly what BothAnd's
`containers` → `records` → `responses` already is, just with an extra
nesting level for threaded replies (currently BothAnd's Board comments
are flat). Adding a nullable `parent_response_id` self-reference to
`responses` would get threading without a new table — same pattern as
everything else in this schema.

## Category 4: Course — LMS

**Players researched:** Moodle (open source, so real architecture is
visible), Google Classroom referenced but not re-verified this pass.

Moodle's actual data model is "Resources" (static content) and
"Activities" (interactive: assignments, quizzes, forums, wikis,
workshops) attached to a course, with a gradebook supporting rubrics,
weighting, and outcome-based aggregation. [Moodle architecture (Architecture of Open Source Applications)](https://aosabook.org/en/v2/moodle.html) ·
[Moodle features overview](https://moodle.com/us/products/lms/features/)

This is a much bigger surface area than BothAnd's Course workflow
attempts or needs to attempt — Moodle is built for accredited academic
programs with grading policy requirements. BothAnd's actual likely use
case (a nonprofit's volunteer training/onboarding modules) is closer to
what Course already does (lesson + submission + feedback) than to
Moodle's scope. **Not a gap worth closing** — this confirms the
project's own "not urgent" framing in `ROADMAP.md` was right, not just
an assumption.

## Category 5: Church/community-specific all-in-one tools

**Players researched:** Breeze ChMS, Planning Center.

Breeze: flat $72/mo, unlimited users, covers member directory + giving +
event scheduling + volunteer tracking + reporting in one system.
[Breeze pricing](https://www.g2.com/products/breeze/pricing) ·
[Breeze feature overview](https://theleadpastor.com/tools/breeze-church-management-review/)

This is the most direct commercial analog to BothAnd's actual pitch
(one flat price instead of separate premium tools per workflow) — worth
noting Breeze already proves that model works commercially at $72/mo
flat. BothAnd's free version of the same thesis is a genuine, defensible
differentiator, not a novel idea nobody's validated — Breeze validated
the *bundling* thesis, BothAnd is testing whether it can also be free
and open.

## Cross-cutting technical notes

- **Notifications**: the standard 2026 implementation for "notify me
  when X" across any of these categories is the **Push API + a service
  worker + VAPID keys**, no third-party push service required, and it's
  fully supported (Chrome/Firefox/Edge/Safari-as-installed-PWA) as of
  2026. This closes the "notifications" gap flagged for both Board and
  Catalog without needing an external SaaS dependency. [Push notification implementation guide](https://www.suprsend.com/post/browser-push-notifications)
- **Nonprofit software spend context** (for the "why pay for premium"
  pitch): industry guidance is 1–3% of annual fundraising revenue on
  software, and a realistic small-nonprofit stack (donor CRM + volunteer
  module alone, no events/catalog/course) already runs **~$3,400/year**
  before adding anything else. [Nonprofit CRM pricing guide](https://www.liveimpact.org/blog/nonprofit-crm-pricing) ·
  [Bloomerang bundle pricing](https://neonone.com/resources/blog/crms-for-nonprofits/)
  This is a good concrete number to have on hand for the pitch: BothAnd
  replacing even a fraction of that stack at $0 is the actual argument,
  not an abstract one.

## So: trim, or don't?

Nothing here suggests trimming what's built — every existing BothAnd
feature (recurring shifts, waitlist, QR check-in, gallery/search/
quantity Catalog, Course feedback) matches or is simpler-but-equivalent
to what paid tools do for the same job, confirmed against real product
docs rather than assumption. The gaps worth prioritizing next, in
rough order of leverage:

1. **Claim → message thread** for Catalog (Olio's model) — cheap, closes
   a real gap, better than the current visible-email approach.
2. **Push notifications** (Web Push API) — closes gaps on both Board and
   Catalog with no new infra, using a now-mature, fully-supported
   browser standard.
3. **Comment threading** on Board — one nullable self-referencing
   column, matches Discourse's actual model.
4. **Shift swap** for Events — the one genuine policy-layer gap found in
   the scheduling category; real state machine, worth scoping properly
   rather than bolting on.
5. **Skills/availability matching** for Events — a real, larger feature;
   worth a design pass, not a quick add.
6. **Cross-org trade** — confirmed as a real, established category
   (Link2Feed/FoodCopia) worth building, not speculative — but still
   needs the RLS design conversation flagged in `ROADMAP.md` before any
   code, now doubly so given those platforms are built cross-tenant from
   day one and BothAnd's schema currently isn't.
