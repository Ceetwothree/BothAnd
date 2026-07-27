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

## What users actually want (the demand side)

The category-by-category research above is about what tools *do*. This
is about what their own users say is missing — checked against review
sites (G2, Capterra), app store reviews, and community/support forums,
since vendor marketing pages don't say what's wrong with their product.
The pattern held consistently across every category researched:

**It's overwhelmingly polish and reliability, not missing capability.**

- **SignUpGenius** complaints are almost entirely UX friction: can't
  easily edit or delete a signed-up person, cluttered free templates,
  on-page ads, "most outdated and clunky design." Nobody in these
  reviews is asking for a big new capability — they want the CRUD to
  stop being annoying. BothAnd already doesn't have any of these
  problems (no ads, clean edit/delete flows already built).
- **VolunteerHub**: "the platform has stopped investing in development,"
  and its Salesforce integration creates duplicate records users have to
  manually clean up. That's a genuine incumbent-stagnation signal, not a
  feature gap — a real opening for a tool that's still actively iterating.
- **BuyNothing app**: broadly described as buggy (login failures, wrong
  location detection), plus real backlash over a recently-added
  paywall/subscription prompt. The sharpest critique found — a long
  community essay asking why nobody's built a "killer app" for this
  space — makes a deeper point: the actual hard problem isn't the
  software, it's that **cooperating with strangers is inherently
  frustrating** — no-shows, no returns, scammers, last-second haggling.
  That's a trust problem, not a feature problem, and it's largely
  unsolvable at the software layer for an open, public marketplace.
  BothAnd sidesteps this almost for free simply by being
  membership-scoped rather than open to the general public — worth
  saying out loud as a real structural advantage, not an incidental one.
- **Industry-wide** (a 2026 nonprofit tech survey, 800+ respondents):
  what separates "good" from "mediocre" in nonprofits' own words is
  grant-reporting depth, integration with donor/CRM data, and volunteer
  recognition/retention features — not exotic scheduling logic.

**Two cheap, high-signal additions this surfaced that weren't on the
list before:**
- **Volunteer hours recognition** — a certificate, badge, or simple
  "thank you" surfaced once someone crosses an hours milestone.
  BothAnd already tracks the hours data (Events attendance); this is
  a small UI addition on top of data that already exists, and directly
  answers a named retention driver.
- **A grant-reporting export** — a CSV/PDF of attendance + hours for a
  date range. Same story: the data already exists, there's just no
  export button yet.

**One thing worth explicitly not chasing:** donor-CRM integration
(Salesforce, etc.). It's the one place "bigger" is a trap — it pulls
BothAnd toward being an enterprise CRM-adjacent product instead of the
free, simple alternative it's trying to be.

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

**Why food specifically, and not general goods?** Three structural
reasons, worth understanding before designing anything cross-org:

1. **Perishability creates urgency that only real-time cross-org
   visibility can solve.** A couch doesn't spoil; food does. Routing
   surplus between orgs only pays for itself when the alternative is
   throwing product away.
2. **The Bill Emerson Good Samaritan Food Donation Act is food-specific**
   — it gives donors and distributing nonprofits federal liability
   protection *for food donations only*. Nothing equivalent exists for
   general used goods, so formalizing a donor↔network relationship for
   "stuff" doesn't have the same legal cover.
   [Good Samaritan Act overview](https://www.feedingamerica.org/ways-to-give/corporate-and-foundations/product-partner/bill-emerson)
3. **Feeding America is a pre-existing national umbrella of ~200
   affiliated food banks that already had to standardize reporting.**
   Link2Feed-style software is really an extension of an organizational
   hierarchy that existed for other reasons, not something invented from
   scratch for a marketplace. General reuse has no equivalent umbrella —
   and Buy Nothing Project is explicitly *anti-scale by philosophy*
   (neighbor-to-neighbor relationship-building, not logistics
   efficiency), so it never had a forcing function pushing it toward
   cross-group software the way food banks did.
   [Feeding America network structure](https://www.feedingamerica.org/our-work/food-bank-network)

This matters for scoping cross-org trade later: BothAnd's version won't
have Feeding America's forcing function (no existing umbrella
organization mandating it) or food's urgency/liability profile. Any
design pass should be honest that the "why now" case is weaker than it
was for food banks — real, per Link2Feed/FoodCopia's existence, but not
as urgently forced.

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

## Category 6: Donation payment methods

Prompted by a direct question worth its own section: most of BothAnd's
target orgs run on donations. Is taking payments a hard feature? The
short answer is: **it depends entirely on whether BothAnd tries to be a
middleman or not** — and the decision made here is not to be one.

### The standard set

PayPal is the default (nonprofit-discounted ~2.2% + $0.30, guest checkout,
no PayPal account needed for the donor). Stripe is the default for custom
checkout flows. A layer of donation-specific platforms — Donorbox,
Givebutter, Classy, GiveForms — sit on top of Stripe/PayPal adding
embeddable forms, recurring-gift management, and receipts, usually with an
extra stacked platform fee (Donorbox ~5.15% all-in). **Zeffy** is worth
calling out specifically: 100%-free to the nonprofit, funded entirely by
an optional donor tip at checkout, built on Stripe underneath — the
closest thing found in this whole research pass to BothAnd's own "free,
funded differently" thesis, just applied to payments instead of software.
[Zeffy vs. Stripe](https://www.zeffy.com/compare/zeffy-vs-stripe) ·
[Guide to nonprofit fundraising platforms](https://stripe.com/resources/more/nonprofit-fundraising-platforms)

### Why BothAnd isn't going to process payments itself

Taking payments *as a platform* — collecting from donors and forwarding
to many different orgs — is one of the few genuine complexity spikes
found anywhere in this research, and not because checkout UI is hard:

- **Money movement across many orgs risks looking like money
  transmission**, a real, state-by-state licensing problem. The standard
  fix is **Stripe Connect**: Stripe holds the license and does identity
  verification (KYC) on each connected org so the platform itself never
  becomes a money transmitter — but each org still has to complete
  Stripe's own onboarding, which is real friction, not a free lunch.
  [Stripe Connect overview](https://stripe.com/connect)
- **Tax receipts are the org's legal responsibility, not the
  processor's** — the IRS requires a written acknowledgment for any gift
  over $250, and every processor above auto-generates this today. Taking
  that on directly means inheriting an obligation BothAnd doesn't
  currently have any reason to inherit.
  [IRS written acknowledgment rules](https://www.irs.gov/charities-non-profits/charitable-contributions-written-acknowledgments)

**The alternative — linking out to whatever the org already has — is
nearly free, and it's already the universal designed-for pattern, not a
workaround.** Every processor above generates a plain link or an
embeddable snippet specifically so it can be dropped into a third-party
site the org doesn't otherwise control. BothAnd doing the same is a
same-day feature: a `donate_url` column on `orgs`, identical in shape to
the existing `website_url`/`facebook_url` fields, rendered as a "Give"
button. Zero new payment surface, zero compliance inherited, and the org
keeps the exact processor (and donor history, and tax-receipt flow) it
already has. [Embeddable donate buttons are the norm](https://www.jimdo.com/blog/donate-button-to-your-website/)

### Not every "typical" method is equally safe to recommend

- **Venmo has an official Charity Profile** for verified 501(c)(3)s,
  linked through PayPal — zero fees for the donor, a low fee for the org
  (1.9% + $0.10), and it auto-sends the tax receipt. As legitimate as
  PayPal itself. [Venmo charity profiles](https://help.venmo.com/cs/articles/receiving-donations-faq-vhel180)
- **Zelle is explicitly personal-use-only in its own terms** — "you
  agree that you will not use the Service to send or receive payments in
  connection with your business or commercial enterprise" — and it only
  works for org use if the org's *specific bank* separately offers
  "Zelle for Business," which not all do. Recommending it flatly, with
  no caveat, would be steering orgs toward something that can violate
  their own bank agreement. [Zelle personal-use terms](https://legalclarity.org/can-businesses-use-zelle-setup-limits-and-tax-rules/)

### The informal-group case (not just registered 501(c)(3)s)

BothAnd's actual target includes plenty of groups that aren't a
registered nonprofit at all — a community garden, a book club, a mutual
aid pod. This changes the payments question in a way none of the
commercial tools above have to think about, since they're all built
assuming a verified charity on the other end.

- **Tax reporting risk is smaller than it sounds.** The 1099-K threshold
  reverted for 2026 to $20,000 and 200 transactions — a small informal
  group collecting dues or plot fees is very unlikely to cross that.
  [2026 1099-K threshold](https://www.ehm-tech.com/tax-calculator-us/blog/1099-k-threshold-2026-venmo-paypal/)
- **The real risk is categorization and commingling, not taxes.** A
  garden-plot fee is arguably payment *for something*, not a "friends and
  family" gift — platforms distinguish the two, and using one person's
  personal account for group funds makes it hard later to prove which
  money was whose, especially if that person steps back from the role.
  This is an extremely common, tolerated practice, not a crisis — but a
  naive version of this feature would say nothing about it at all, and
  BothAnd can, for free.

### The design

Two nullable `TEXT` columns on `orgs`, same pattern as every other
kind-specific field already in the schema, in a new "Ways to give"
settings section:

- **`donate_url`** — one clickable link (PayPal.me, Venmo Charity
  Profile, Donorbox, Zeffy, GoFundMe Charity, etc.), rendered as a "Give"
  button. Helper text: *"Link to your existing donation page — we'll
  show it as a Give button. BothAnd never touches this money — donors go
  straight to whatever you already use."*
- **`donate_info`** — freeform multi-line text for anything that isn't a
  clickable link (Zelle instructions, a mailing address, cash at
  events), with helper text that surfaces the Venmo-Charity-Profile vs.
  Zelle-ToS distinction and the informal-group commingling advice above,
  rather than presenting all "typical methods" as equally simple.

If BothAnd itself ever wants to accept donations (separately, and not a
near-term plan): the LLC-vs-501(c)(3) distinction actually matters here
in a way it doesn't for the orgs on the platform — an LLC doesn't make a
contribution tax-deductible for the donor. The standard fast/cheap path
before committing to a full 501(c)(3) filing is **fiscal sponsorship** —
an existing 501(c)(3) accepts funds under their exempt status for a small
cut. Either way, same principle as everywhere else in this section: a
dedicated account, never commingled with personal funds.

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

1. **"Ways to give" on org settings** (`donate_url` + `donate_info`) —
   the cheapest item on this whole list, no new payment surface, and
   directly serves the core reason most of these orgs exist.
2. **Claim → message thread** for Catalog (Olio's model) — cheap, closes
   a real gap, better than the current visible-email approach.
3. **Volunteer hours recognition** and **grant-reporting export** for
   Events — both cheap, both build on attendance/hours data that
   already exists, both directly named as retention/reporting drivers.
4. **Push notifications** (Web Push API) — closes gaps on both Board and
   Catalog with no new infra, using a now-mature, fully-supported
   browser standard.
5. **Comment threading** on Board — one nullable self-referencing
   column, matches Discourse's actual model.
6. **A Borrow/lend listing type** for Catalog (Olio's model) — one
   column alongside `category`, not just give-away.
7. **Shift swap** for Events — the one genuine policy-layer gap found in
   the scheduling category; real state machine, worth scoping properly
   rather than bolting on.
8. **Skills/availability matching** for Events — a real, larger feature;
   worth a design pass, not a quick add.
9. **Cross-org trade** — confirmed as a real, established category
   (Link2Feed/FoodCopia) worth building, not speculative, though weaker
   than food's case (no umbrella-org forcing function, no perishability
   urgency, no food-specific liability law) — still needs the RLS design
   conversation flagged in `ROADMAP.md` before any code, now doubly so
   given those platforms are built cross-tenant from day one and
   BothAnd's schema currently isn't.

Full detail and PR-sized breakdown of items 1–8 is in `ROADMAP.md`'s
"Polish iteration plan" — this list is the research's own priority call;
that one is the actual execution sequence.
