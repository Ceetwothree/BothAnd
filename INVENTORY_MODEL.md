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

## Value: separate the public listing from the reporting receipt

PATH explicitly does not want a dollar value shown on the public item
detail page — this isn't a shop, it's dignity-centered distribution —
but does need a value on a **gift-in-kind receipt** used for donation
reporting and reconciliation (e.g., against DonorPerfect). Whether
that's a universal rule or PATH-specific wasn't fully resolved either way.

This isn't just a hidden column. It implies a genuinely separate concept:
a **donation-intake record** (donor, date received, item(s), estimated
value) — the digitized version of the paper gift-in-kind form — distinct
from the public catalog listing, which strips value (and possibly donor
identity) out entirely. Default to hiding value publicly (dignity-first),
allow an org to override it if they genuinely want a visible price.

Open question: how much donor identity (name, contact) does the receipt
need to carry, and what that implies for privacy/data handling, wasn't
worked out yet.

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

## Status

Design only. Not scheduled against `ROADMAP.md`'s Polish iteration plan
yet — this supersedes that plan's Catalog-category assumptions once it's
scoped for real, and is large enough to warrant its own build sequence
when the time comes, not a single PR.
