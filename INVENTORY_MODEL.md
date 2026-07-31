# BothAnd — Inventory & Sites Model (design only, not yet built)

This document is design, not implementation. Nothing here has a migration,
a schema change, or any code behind it yet — it's captured so the shape
is settled before any of it gets built. It's a significant rework of
Catalog's data model (multiple physical sites, a real hierarchical
taxonomy, donation-intake/reporting), not just an extension of what's
live today, so it's tracked as its own initiative here rather than folded
into `ROADMAP.md`'s smaller "Polish iteration plan" items.

## Why this exists

PATH's actual inventory process, before any of this: an item-request
Google Sheet, and paper gift-in-kind donation forms that went
**serially unreported** and had to be manually re-keyed into DonorPerfect
later. Solving this — a genuinely simple ERP problem — was beyond the
scope of PATH's tools or IT capacity at the time. It was Google Sheets
and a pile of paper receipts. Improving exactly this is described as the
actual essence of the Blueprint LA spec and the inciting idea behind
BothAnd itself — not a nice-to-have feature, the reason the project
exists.

Real examples grounding the model: **Birchwood** runs several "share
boxes" and deals essentially only in food. **Ropa** deals essentially
only in clothing. **OATH** has 15+ sites. These aren't edge cases to
special-case — the design has to work for an org with exactly one
narrow category and one location, and for an org with many sites and a
deep multi-category taxonomy, without forking into two different systems.

**Domain finding worth remembering:** PATH's real, hard-won categories —
perishable food, non-perishable food, hygiene products, cleaning
products, clothing, housewares, kitchenware, bedding, kits — all map to
the *lower* rungs of Maslow's hierarchy (physiological and safety needs).
Notably absent: electronics, books, toys — categories that show up in
general reuse/Buy Nothing contexts but apparently never came up at real
volume in a homeless-services intake context. This is evidence that
BothAnd's Catalog serves (at least) two meaningfully different use
profiles — essential-needs distribution vs. general community
reuse — and shouldn't assume one taxonomy fits both.

**Kits** (welcome-home kits, outreach kits, care kits) are named bundles
with contents that were never fully standardized — sometimes a kit
includes socks, sometimes fingernail clippers. Modeled as a category with
a freeform description, not a rigid manifest: the variability itself is
evidence *against* building a structured kit-contents system, not a gap
to fill.

## Sites

An org can have multiple physical storage locations. `sites`: org-scoped,
a name, optionally an address/notes. Catalog items get a structured
`site_id` (filterable, a real dropdown) alongside the existing freeform
`location` text, which stays for sub-site detail ("bin 4," "top shelf").
Needs its own light management surface — add/rename/list — closer in
shape to the Members page than to a settings field, since it's a real
managed entity, not a nullable attribute.

This is what makes "good search and browse across many sites" (the
original ask) actually work: a real dropdown of an org's own sites, not
text-matching against however someone happened to type a location.

## Taxonomy: org-defined, hierarchical, layered for adoption

**Not a global fixed list.** Orgs vary too much — Birchwood only ever
needs "Food," Ropa only ever needs "Clothing," a general reuse group
needs neither. Baking in even PATH's proven list as *the* list would
just trade one bad one-size-fits-all for a better one-size-fits-all.

**Real proven depth, from PATH:** category → subcategory → item.

**Structure:** an org-scoped, self-referencing `catalog_categories` table
(a `parent_id` column pointing at another row in the same table) replaces
the flat, hardcoded `category` value + `CHECK` constraint shipped in the
earlier Catalog search/filter PR. That earlier design was reasonable
given what was known at the time, but it's the wrong shape now — it'll
need reworking, not just extending, once this gets built.

**Layered adoption path, resolving the simple-vs-deep tension:**
1. **Sector presets at setup** — Food / Hygiene / Cleaning / Clothing /
   etc., multi-select checkboxes. Each checked preset seeds a small
   pre-built category + subcategory tree into that org's own table.
2. **"Other"** — a minimal flat catch-all for an org that doesn't want to
   think about taxonomy at all, so nobody is blocked from just starting.
   This is close to what Catalog already does today.
3. **Full custom taxonomy editor** (add/rename/reparent categories
   directly) — not required for a first version, and not yet decided
   whether it's needed at all. The key point: presets and a future full
   editor are the same feature at two different UI depths, not two
   different systems — a preset just writes rows into the same table a
   custom editor would let someone edit directly. The schema should
   support this from day one; whether the *UI* for full customization
   ships now or later is a separate, deferrable decision, not a schema
   decision.

**Helper text principle** (same pattern as the payments field): explain
*why*, not just *how*. Something like *"A coherent taxonomy is what makes
'how much clothing did we distribute this quarter' answerable. Two
levels is usually enough — a broad category, then a subcategory if you
need it."*

**Clothing was PATH's hardest, deepest category to normalize.** When that
preset actually gets built, pull the real subcategory breakdown from
PATH's own experience — don't guess it the way the original 9-category
placeholder list was guessed.

**Open, not yet resolved:** do categories carry their own custom
attribute fields (perishable food wants an expiration date, clothing
wants a size), or does BothAnd stick to one small universal fixed set of
optional fields regardless of category? A fully dynamic per-category
field system is real EAV-style complexity — a much bigger lift than
anything else in this document. Leaning toward a small fixed set to
avoid that, but this wasn't settled.

**Flagged, deliberately out of scope for now: AI-assisted taxonomy
bootstrapping.** An org's messy historical spreadsheet (the same kind of
serially-inconsistent Google Sheet PATH actually ran on) could in
principle be fed to a model that proposes a normalized category/
subcategory tree from it — automating the same normalization work done
by hand for PATH. Genuinely useful, but explicitly a "fancy idea,
probably out of scope" per the org's own framing, not the preset/Other/
custom-editor layering above. Worth remembering as a possible future
onboarding accelerator, not something to design against yet.

### How big would a preset superset actually need to be?

The open worry was that covering "a majority of NGOs and community
groups doing intake/distribution" with presets could balloon into a
large, unmanageable library. Looking across food banks, diaper banks,
clothing closets, hygiene-kit programs, disaster-relief supply drives,
and general thrift/donation-center sorting — on top of PATH's own
9-category list — the same top-level categories keep recurring almost
everywhere, regardless of org type:

1. Food (perishable / non-perishable, sometimes further split into
   fresh / pantry / frozen / beverages by storage type)
2. Clothing (near-universally the deepest category — split further by
   demographic and season)
3. Hygiene products
4. Cleaning / household products
5. Housewares / kitchenware
6. Bedding / linens
7. Baby / diaper-specific items (diapers, wipes, formula — distinct
   enough from general hygiene that it shows up as its own category at
   diaper banks specifically)
8. School supplies
9. First aid / medical supplies
10. Kits (bundled, freeform contents — same modeling as above)

General-reuse contexts (Buy Nothing groups, general thrift) add a
second cluster essentially absent from essential-needs/homeless-services
intake: furniture, electronics, toys, books. This corroborates the
"two use profiles" finding above rather than contradicting it — it's not
that the superset is bigger than expected, it's that it cleanly splits
into an essential-needs cluster (~9-10 categories) and a general-reuse
cluster (~4 more), and few real orgs need both at once.

**So: not daunting.** A dozen or so top-level presets, organized into a
couple of named packs (e.g. "Essential needs / homeless services,"
"Food bank/pantry," "Clothing closet," "General community reuse"),
covers the large majority of the cross-section researched. This is a
one-time research/content task, not an open-ended taxonomy problem —
consistent with the earlier finding that none of the actual business
logic here is particularly hard, the effort is in getting the presets'
content right, not in the mechanism that stores them.

One considered and explicitly ruled-out source: the AIRS/211 Taxonomy of
Human Services, a large (9,000+ term), accredited national standard.
It's built to classify *services and programs* an agency offers ("what
does this agency do"), not to categorize *physical stock-keeping units*
at the granularity an org needs to answer "how much clothing did we
distribute this quarter" — the wrong shape for this specific need, not
a source to draw the preset packs from.

## Donation intake & gift-in-kind reporting

PATH explicitly does not want a dollar value shown on the public item
detail page — this isn't a shop, it's dignity-centered distribution —
but does need a value on a **gift-in-kind receipt** used for donation
reporting and reconciliation (e.g., against DonorPerfect).

This isn't just a hidden column. It implies a genuinely separate
concept: a **donation-intake record** — the digitized version of the
paper gift-in-kind form — distinct from the public catalog listing.

**Value is hidden on the public catalog/search/browse by default; the
donation-intake / gift-in-kind receipt always carries it, regardless of
that toggle.** The dignity-first default (no price next to an item in a
distribution listing) applies out of the box; an org can opt in to
*show* value publicly if they genuinely want a shop-like listing (a
general community group, a garden swap). Either way, the internal
donation-intake record's value field is unaffected — it's always
present, since it exists for reporting/reconciliation, not for the
public page.

**Standard reporting fields, checked against both IRS Form 8283
(non-cash charitable contributions) and typical donor-CRM gift-in-kind
entry patterns (DonorPerfect-style):**

- **Donor** — name/organization, and contact (email and/or phone)
- **Item description** — free text, plus the taxonomy category/subcategory
- **Quantity**
- **Weight** — optional, primarily used for food (matches the org's own
  recollection: "how food is usually done")
- **Estimated value** — the field that fills both DonorPerfect's
  amount/sale-value field and Form 8283's fair market value field
- **Date received**
- **Recipient org** — implicit, it's the org's own record; Form 8283
  additionally wants the recipient org's name/address for the donor's
  own tax filing, which an org could optionally surface as a print/export
  field rather than a stored one
- Optionally: **donor address** (Form 8283 wants this for the donor's own
  filing; not needed for BothAnd's own bookkeeping) and a **status**
  field (committed / received / picked up), borrowed from DonorView's
  gift-in-kind pattern — a nice-to-have, not core

This closely matches the org's own recollection working backwards from
DonorPerfect's required fields, confirming it: email, phone,
organization, quantity, weight, description, and value are indeed close
to a standard set, not a PATH-specific guess. The "few I don't recall"
turn out to be date received and (for formal 8283 purposes only) the
donor's address — both easy additions, neither changing the shape of
the record.

Open question, still not worked out: how much donor identity the
receipt needs to carry by default versus behind an org-level privacy
setting, wasn't resolved either way.

## Photo — already shipped

Camera-capture photo upload exists from the earlier Catalog PR. This
requirement is already met, not a gap.

## Barcode scanning — an intake accelerator, not a requirement

Useful "sometimes but not always," per the org's own framing — when a
box of donated goods happens to have commercial barcodes. In-browser
barcode decoding via the phone camera, optionally paired with a public
UPC/product lookup to prefill title/category. Must degrade gracefully:
manual entry always works when there's no barcode or no match. Never a
blocking dependency for intake.

## QR scan-in/scan-out for share boxes — an enabled honor system

This reuses the exact QR-to-mobile-action-page pattern already built for
Events self-check-in — now proven useful in two different domains
(attendance, box inventory), worth treating as a general, reusable
BothAnd pattern rather than a one-off.

A QR code lives on the physical share box, linking to a page scoped to
that site. Scanning it shows what's believed to be at that site (a
site-filtered Catalog view) and lets the person select what they're
taking — which **is** a claim, the same `claim` response Catalog already
has today. No new state machine is needed.

The one new piece: a site-level (or org-level) toggle for whether a claim
filed this way auto-fulfills immediately — the open, trusting
honor-system mode, no staff review — or sits pending for staff review
like a normal claim, for an org that wants to keep that gate. One
boolean, not new machinery.

## The core tension, and where it actually lives

Simple enough that Birchwood can set up "Food" and start immediately, but
genuinely usable by an org with PATH's real, multi-year, two-source,
category/subcategory complexity. The taxonomy is where this tension
actually lives — site-scoped browsing, gift-in-kind receipts, and QR
checkout are all *consumers* of whatever category structure an org has
built, not independent sources of complexity themselves. Get the
taxonomy layering right (presets → "Other" → optional full
customization, all backed by one schema) and the state machine
underneath the rest of this stays human-comprehensible.

## Cross-org trade: staged, security-first

Everything above this point — sites, taxonomy, value, gift-in-kind
receipts, QR scan-in/out — is scoped entirely to *one* org's own data.
That's exactly why it was safe to design without touching RLS in any new
way: every read/write in this document so far is still gated by the same
"active member of this org" rule the whole schema already enforces.

Cross-org trade is different in kind, not just in scope: it's the first
feature that asks some inventory *content* (not just an org's public
identity — name, mission text, whether it's joinable — which `browse`
and invite-preview already expose) to be readable by someone who isn't a
member of that org. That's a genuinely new class of RLS policy, and it
deserves the same rigor that caught the tenant-isolation drift bug —
simulated as a real non-member request, not just read off the policy
text, before anything here ships.

**Two distinct asks, not one.** Re-reading the actual requirement: it's
not just "let another org see more," it's a full visibility *range* —
staff also want the ability to make a specific item invisible to
ordinary members or the public (something reserved, something tied to a
specific client case), same mechanism running in the opposite direction.
So visibility is a tier, not a boolean:

1. **Staff-only** — invisible to ordinary members entirely (narrower
   than what exists today, where any active member sees the whole
   catalog)
2. **Org members** — today's default and the implicit case for
   everything designed above
3. **Cross-org / public** — the new, wider case this section is about

**Granularity reuses a pattern already established for taxonomy:** a
bulk default at the category level, with a per-item override — the same
"set it once, override individually when needed" shape as presets vs.
custom taxonomy editing. A category's visibility tier is its items'
default; an item can be flagged differently on its own. One column
(`visibility`) on the same taxonomy-and-item structures, not a second
system.

**Staged rollout, cheapest and lowest-risk first:**

**Stage 1 — cross-org membership as the MVP.** An individual just joins
both orgs and interacts as an ordinary member of each. This is
essentially zero new code: no new visibility tier, no new RLS policy,
nothing that widens what any single membership already permits — the
"cross-org" behavior is entirely a property of the human, not the
system. Ship this first as a `browse`-page nudge — *"did you know: if
another group makes items available to members, you can join and
request them"* — because it validates whether people actually want
cross-org access before any new tenancy surface gets built at all. Feels
weak precisely because it's not automated (a staffer at Org A doesn't see
Org B's surplus without personally joining Org B) — that weakness is a
feature for a first cut, not a bug: it caps the blast radius of getting
the security model wrong to a single well-understood policy.

**Stage 2 — the visibility tier itself.** Build the `visibility` column
described above, extend the relevant `records`/`containers` SELECT
policies so `public`-tier rows are readable outside org membership (and
`staff-only`-tier rows are *not* readable by ordinary members of the
*same* org — the narrowing direction matters equally and is easy to
forget when focused on the widening direction). This is the real new
security surface; verify it the same way the tenant-isolation bug was
caught — `SET LOCAL ROLE authenticated` as a genuine non-member, in a
transaction, before trusting it.

**Stage 3 — coalitions: admin-to-admin, category-scoped delegation.**
The deeper idea in this message — nudging PATH to let Ropa run all of
PATH's clothing rather than PATH doing it poorly alongside everything
else — is bigger than visibility. It's operational delegation: Ropa's
members should be able to *request and receive* clothing that
physically lives in PATH's own sites (or PATH hands the stock to Ropa
outright and stops stocking clothing itself), as a standing
relationship, not a one-off. Model as an explicit `org_partnerships`
table — admin-approved on both sides, scoped to specific categories
and/or sites — granting the partner org's members read+claim rights into
that scoped slice, without making them full members of the host org.
This is the hardest RLS in this document: a three-hop policy (user's own
membership → an active partnership row → that partnership's category/
site grant) rather than the simple one-hop "is a member" check
everything else relies on. Exactly the kind of custom business-logic
policy `get_advisors` won't catch — budget a dedicated design pass and a
real verification pass for this stage specifically, don't fold it into
Stage 2's work.

**Stage 4 (optional, UI only, sits on top of Stage 2) — a surplus
bulletin board.** The concrete trigger case — boxes of men's clothing at
a women's center, kids' toys at a veteran's center, stock a site will
provably never use — mapped directly onto the `public`-tier visibility
from Stage 2: a cross-org aggregated view of everything any org has
tagged public, framed as *"help us clear this out"* rather than a
storefront. Explicitly uncertain whether this earns a place in primary
navigation or should stay one level deep to avoid becoming clutter —
lean toward buried/secondary until there's real usage signal that it's
wanted, not designed prominently by default. The map/radius idea ("show
me stuff within 5–50 miles") is a genuinely separate feature bolted onto
this one, not a natural extension of it: it needs structured geocoded
location on `sites` (today `sites` only has freeform address/notes),
which means either manual lat/lng entry or a geocoding API — a real new
dependency and cost, not a checkbox. Worth remembering, not worth
building until Stage 4 itself has proven wanted.

## A related but separate thread: metrics and demand planning

Not cross-org trade, but the same conversation surfaced it and it's
worth capturing rather than losing. Once there's a real taxonomy and
real transactions against it (claims, fulfillments, intake), that data
supports three distinct roles that today all get the same flat
experience:

- **Members** get what they need (already served — browse, claim).
- **Staff** manage the transactions and keep inventory accurate (mostly
  already served — the claim/fulfill state machine, intake).
- **Leadership/admin** run the operation using metrics — consumption
  rate by category, what's chronically short vs. chronically
  overstocked, seasonal patterns. **Not served at all today** — there's
  no metrics surface of any kind yet.

The concrete feature this points to: **storehouse demand thresholds and
alarms** — "we need at least X of category Y at site Z," and an alert
(in-app, maybe email/push later) when on-hand quantity crosses below
that line. This is straightforwardly buildable once taxonomy + sites +
quantity exist (all modeled above) — it's a threshold check on data
that's already there, not a new data source.

Worth naming the connection back to Stage 3 explicitly: the
Ropa-handles-all-clothing coalition idea is currently a hunch based on
operational experience ("PATH deals with clothing very poorly, I suspect
specialization would help"). Metrics are what would turn that hunch into
a measurable decision — an org (or BothAnd itself, looking across orgs
that opt into shared benchmarking later) could actually see the
consumption/fulfillment-rate gap between a specialist and a generalist
handling the same category. Demand planning doesn't block Stage 3, but
it's the thing that would let a coalition decision be evidence-based
rather than anecdotal. Deliberately not scoped further than this here —
its own design pass when it's actually next in line.

## The core tension, and where it actually lives

Simple enough that Birchwood can set up "Food" and start immediately, but
genuinely usable by an org with PATH's real, multi-year, two-source,
category/subcategory complexity. The taxonomy is where this tension
actually lives — site-scoped browsing, gift-in-kind receipts, and QR
checkout are all *consumers* of whatever category structure an org has
built, not independent sources of complexity themselves. Get the
taxonomy layering right (presets → "Other" → optional full
customization, all backed by one schema) and the state machine
underneath the rest of this stays human-comprehensible.

## Status

Design only. Not scheduled against `ROADMAP.md`'s Polish iteration plan
yet — this supersedes that plan's Catalog-category assumptions once it's
scoped for real, and is large enough to warrant its own build sequence
when the time comes, not a single PR.

The three open questions this design needed resolved before touching
cross-org trade are now resolved: the preset superset is sized (a dozen
or so top-level categories, not an open-ended problem), the gift-in-kind
reporting field set is grounded against IRS Form 8283 and DonorPerfect-
style conventions (not just PATH's own memory of it), and the "hide
value publicly" toggle's default is corrected to off (shown by default).
Same-org inter-site trade (sites, taxonomy, value, receipts, QR
scan-in/out) is modeled above. Cross-org trade is now staged (above):
Stage 1 (cross-org membership nudge) ships with essentially no new
security surface; Stages 2–4 (visibility tiers, coalitions, bulletin
board/map) each add real new RLS surface in increasing order of
difficulty and are each their own future design-and-verify pass, not a
single PR. Metrics/demand-planning is captured as a related, independent
future thread, not scheduled.
