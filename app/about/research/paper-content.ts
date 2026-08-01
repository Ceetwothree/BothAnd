// app/about/research/paper-content.ts
// Generated from research-site/content/*.md via marked (see research-site/build.mjs
// for the same conversion used by that standalone site). Internal cross-page links
// are rewritten to in-page anchors (#rp-<slug>) and heading levels are shifted down
// one so each page's own title stays the top of that section's hierarchy.
// To regenerate after editing research-site/content/*.md, re-run the generator
// script described in the project's working notes and paste the output back in.
export const RESEARCH_PAPER_HTML = `
<div class="rp-page" id="rp-index">
<h2>Introduction</h2>
<p class="rp-subtitle">Where does the money go, who does the work, and why does the system break where it does?</p>
<div class="rp-meta-row"><span class="rp-status rp-status-in-progress">In Progress</span><span>Last updated 2026-08-01</span></div>
<h3>What this is</h3>
<p>This site tracks an ongoing, independent research project on homelessness in Los Angeles — City and County. The starting questions:</p>
<ul>
<li>What are the actual <strong>phases</strong> someone moves through, from living unsheltered to permanent housing (and what happens when they don&#39;t)?</li>
<li>Where does the <strong>money</strong> come from, and where does it actually go?</li>
<li>Which <strong>agencies and NGOs</strong> are involved, what does each one actually do, and where do their mandates overlap or leave gaps?</li>
<li>What <strong>tools and systems</strong> (data systems, assessment tools, case management platforms) run underneath all of this?</li>
<li>What is <strong>most effective</strong>, what is <strong>least effective</strong>, and why?</li>
<li>Where does the process <strong>break</strong>, structurally — not &quot;who&#39;s to blame,&quot; but where the pipe actually leaks?</li>
<li>What <strong>solutions have been tried</strong> — which worked, which didn&#39;t, and why?</li>
</ul>
<h3>How this site is organized</h3>
<p>This is a research-led project, not a fixed report — the structure will evolve as findings warrant. Right now it&#39;s organized in five parts:</p>
<div class="card-grid">
<div class="card"><h5><a href="#rp-overview">Scope & Scale</a></h5>Who we're talking about: point-in-time counts, demographics, trends, and how "homeless" is even counted.</div>
<div class="card"><h5><a href="#rp-system">The System</a></h5>The phases of the process, the agencies and NGOs that run each phase, and the tools they use.</div>
<div class="card"><h5><a href="#rp-money">The Money</a></h5>Federal, state, county, city, and private dollars — where they originate and where they land.</div>
<div class="card"><h5><a href="#rp-effectiveness">What Happens</a></h5>What works, what doesn't, where the process breaks, and what's been tried.</div>
<div class="card"><h5><a href="#rp-findings">Research Process</a></h5>A running log of findings, open questions, and hypotheses, plus full sourcing and methodology.</div>
</div>

<h3>A note on framing</h3>
<p>&quot;Homelessness in LA&quot; is not one system — it&#39;s a patchwork of federal formulas, state grant programs, county departments, city departments, a court-mandated settlement (the <em>LA Alliance</em> agreement), a joint city-county authority (LAHSA), and hundreds of independent nonprofit service providers, each with their own funding streams, data systems, and incentives. Part of what this research is tracking is <em>why it&#39;s structured this way</em> and what that structure predicts about outcomes.</p>
<p>Every page on this site carries a status badge — <strong>Stub</strong>, <strong>In Progress</strong>, or <strong>Researched</strong> — so it&#39;s clear what&#39;s been verified against sources versus what&#39;s scaffolding waiting to be filled in. See <a href="#rp-sources">Sources &amp; Methodology</a> for how claims are sourced and how corrections are handled.</p>
<div class="callout callout-question">
<h5>Open right now</h5>
This project is in its early research phase. See the <a href="#rp-findings">Findings Log</a> for the current state of investigation and the questions actively being chased down.
</div>
</div>

<p class="rp-eyebrow rp-section-eyebrow">Scope & Scale</p>
<div class="rp-page" id="rp-overview">
<h2>Scope & Scale</h2>
<p class="rp-subtitle">How big is this, who is affected, and how much should we actually trust the count itself?</p>
<div class="rp-meta-row"><span class="rp-status rp-status-researched">Researched</span><span>Last updated 2026-08-01</span></div>
<div class="callout callout-finding">
<h5>Headline: the count just went back up</h5>
After two consecutive years of decline, the 2026 Greater LA Homeless Count found <strong>73,040</strong> people experiencing homelessness countywide (up 1.2%) and <strong>45,194</strong> in the City of LA (up 3.4%) — unsheltered homelessness specifically rose 3.3% countywide and 7.9% in the city. LAHSA characterized the increases as not statistically significant, but the reversal ends a widely publicized "trend." <a href="https://laist.com/news/housing-homelessness/la-homelessness-rose-in-2026-official-count-shows/">LAist</a>. See <a href="#rp-breaks">Where &amp; Why It Breaks</a> for the documented cause.
</div>

<h3>The last three counts</h3>
<table>
<thead>
<tr>
<th>Count year</th>
<th>Countywide</th>
<th>City of LA</th>
<th>YoY change (county)</th>
</tr>
</thead>
<tbody><tr>
<td>2024</td>
<td>75,312</td>
<td>45,252</td>
<td>-0.27% (first decline in 6 years)</td>
</tr>
<tr>
<td>2025 (finalized after HUD review)</td>
<td>72,195 (baseline used for 2026 comparison)</td>
<td>43,695</td>
<td>-4%</td>
</tr>
<tr>
<td>2026</td>
<td>73,040</td>
<td>45,194</td>
<td>+1.2%</td>
</tr>
</tbody></table>
<div class="callout callout-question">
<h5>Even the count's own numbers don't fully reconcile</h5>
Different outlets reported different 2025 totals at different points: initial reporting cited 72,308 countywide; after a HUD review found duplication and utilization errors (two Long Beach-area sites had been mistakenly folded into the LA Continuum of Care count; eight sites were removed for irregular utilization), LAHSA's <strong>finalized</strong> LA CoC total was <strong>67,777</strong> — a different geography than "LA County" (the LA CoC excludes Glendale, Long Beach, and Pasadena, which run their own Continuums of Care). Any single headline number needs its geography specified before it means anything.
</div>

<h3>Ten-year trend (2015–2026)</h3>
<p>LA&#39;s unhoused population roughly <strong>doubled</strong> from the mid-2010s to its 2020/2023 peak (66,433 in 2020; 75,518 in 2023), was roughly flat-to-declining in 2024–2025, and ticked back up in 2026. No count was conducted in 2021 (cancelled due to COVID-19 transmission risk) — a real gap in the trend line. The honest characterization: <strong>elevated and volatile around a high plateau</strong>, not a clean upward or downward line — and the accuracy concerns below suggest even this trend may understate the true trajectory in specific neighborhoods.</p>
<h3>How the count actually works</h3>
<p>HUD requires a biennial unsheltered count as a condition of Continuum of Care funding; LAHSA has done it <strong>annually</strong> since 2016 to track trends more granularly. It has three components: (1) a physical unsheltered tally — volunteers in teams of ~4 covering assigned census tracts across roughly 4,000 square miles over one to three nights in late January, counting people, tents, vehicles, and makeshift shelters (no interviews during the tally itself); (2) a separate demographic survey and youth count, extrapolated onto the raw tally; (3) HMIS administrative data for the sheltered population, counted by name/record.</p>
<h3>The count&#39;s accuracy is itself a live, documented dispute</h3>
<div class="callout callout-fails">
<h5>RAND: the official count may be missing a large and growing share of unsheltered people</h5>
A RAND study found the official tally captured only about <strong>68% of the unsheltered population</strong> across three key neighborhoods (Hollywood, Skid Row, Venice) when cross-checked against a more intensive independent count — <strong>Skid Row's official count captured only about 61%</strong> of RAND's estimate. RAND's proposed mechanism: as initiatives like Inside Safe cleared the largest, most visible encampments, the remaining unsheltered population has become structurally harder for volunteer counters to find — meaning the same methodology that worked reasonably well a few years ago may now be systematically less accurate, making genuine progress look larger than it actually is. <a href="https://www.rand.org/pubs/research_reports/RRA4438-1.html">RAND, "Growing Inaccuracies in Official Counts Jeopardize LA Homelessness Wins"</a>
</div>

<p>This isn&#39;t LA-specific in kind, if severe in degree: national literature suggests true homelessness scale could be <strong>2.5 to 10.2 times</strong> what a single-night PIT count captures, largely because the methodology structurally excludes people who are couch-surfing/doubled-up. The U.S. Department of Education counted <strong>more than 1.4 million</strong> homeless students in 2022–2023 under the broader McKinney-Vento definition — vastly more than any PIT count reflects, because that definition includes doubled-up families HUD&#39;s count does not count as homeless at all.</p>
<div class="callout callout-question">
<h5>A cautionary example: falling numbers that may not mean falling need</h5>
The 2025 count reported families living on the street down 27% (city) / 34% (county) — but LAHSA's own chief of staff attributed this <strong>not to genuine improvement</strong> but to declining shelter resources: with fewer family-specific shelter beds, families are increasingly turned away entirely (into doubled-up situations the PIT methodology doesn't count) rather than served. The 2026 count then showed a further 14% drop in family members counted. Read falling numbers with this caveat in mind. <a href="https://laist.com/news/education/early-childhood-education-pre-k/family-homelessness-is-officially-down-in-la-why-so-many-dont-believe-it/">LAist</a>
</div>

<h3>Chronic homelessness</h3>
<p>HUD defines chronic homelessness as a person with a disabling condition who has been continuously homeless for at least 12 months, or who&#39;s had at least four separate episodes in the last three years totaling 12+ months. LA County&#39;s chronic homelessness fell 6.8% in the 2024 count — but that split between a 9.4% drop among <em>unsheltered</em> chronically homeless people and a 7.5% <em>increase</em> among <em>sheltered</em> chronically homeless people, meaning more chronically homeless people were successfully in shelter, not necessarily fewer overall.</p>
<h3>Demographics (most recent available, largely 2024 data)</h3>
<ul>
<li><strong>Race/ethnicity</strong> (LA County, 2024): Latino/Hispanic residents were the largest group at roughly 43–45% of the homeless population; Black residents were roughly 29–32% despite being only about 9.4% of LA County&#39;s general population — a disproportionality factor of roughly 3–3.5x; white residents were roughly 25–29%.</li>
<li><strong>Veterans</strong>: 2,991 in 2024 (down 22.9% from 2023&#39;s 3,878); the 2026 count showed a further drop to 2,257. Veteran homelessness has fallen essentially every year even while the overall count has been volatile — plausibly reflecting sustained, targeted federal/VA voucher investment (HUD-VASH) rather than general system improvement. See the veteran housing case study on <a href="#rp-solutions">Solutions Tried</a>.</li>
<li><strong>Transition-age youth (18–24)</strong>: down 16.2% in the 2024 count.</li>
<li><strong>Disability/behavioral health</strong>: roughly 22% of the unhoused population reported serious mental illness and roughly 24% reported a substance use disorder in 2024 count-adjacent reporting — self-reported survey figures from a subsample, not clinical diagnoses.</li>
</ul>
<h3>How LA compares to other major U.S. metros</h3>
<p>Per HUD&#39;s 2025 Annual Homelessness Assessment Report, the national total was <strong>745,652</strong> people on a single night in January 2025 — a 3.4% decrease, the first national year-over-year decrease since 2016. By raw CoC population, <strong>New York City (125,683)</strong> and the <strong>LA CoC (67,777)</strong> were the two largest homeless populations of any Continuum of Care nationally.</p>
<div class="callout callout-finding">
<h5>The useful framing point: LA's crisis looks different from NYC's, even at similar scale</h5>
NYC and Boston have large <em>sheltered</em> populations — NYC operates under a legally enforceable "right to shelter." San Francisco, Portland, Seattle, and Los Angeles combine severe housing-cost pressure with substantial <em>unsheltered</em> homelessness. LA's homelessness is far more visible on the street; NYC's is largely contained within a shelter system — a structural difference, not just a numbers difference.
</div>

<div class="callout callout-question">
<h5>Open for follow-up</h5>
LAHSA's geographic dashboards (by City Council District, County Supervisorial District, and Service Planning Area) were not directly accessible in this research pass — a current district-by-district breakdown remains a priority gap. See <a href="#rp-findings">Findings Log</a>.
</div>
</div>

<p class="rp-eyebrow rp-section-eyebrow">The System</p>
<div class="rp-page" id="rp-system">
<h2>Phases of the Process</h2>
<p class="rp-subtitle">What actually happens, in what order, and who is responsible at each step.</p>
<div class="rp-meta-row"><span class="rp-status rp-status-researched">Researched</span><span>Last updated 2026-08-01</span></div>
<div class="callout callout-question">
<h5>How to read this page</h5>
This maps the intended end-to-end pipeline. Agency detail is kept light here — see <a href="#rp-agencies">Agencies &amp; NGOs</a> for full profiles — and outcome/effectiveness data for each phase lives on <a href="#rp-effectiveness">What Works, What Doesn't</a>.
</div>

<h3>1. Prevention &amp; diversion</h3>
<p><strong>Prevention</strong> targets people at <em>imminent</em> risk — e.g., someone given a 30-day notice to vacate — with short-term (generally up to six months) financial assistance and housing-stabilization case management. Eligibility is means-tested and prioritized using a <strong>Prevention Targeting Tool</strong>: households scoring above a risk-score cutoff get full assistance; households below it get a lighter-touch service instead — meaning many at-risk households are screened out of intensive help by design.</p>
<p><strong>Diversion</strong> is conceptually distinct: it targets people already homeless or about to enter the shelter/Coordinated Entry system <em>right now</em>, using a conversation-based &quot;problem-solving&quot; approach — helping someone identify any viable option in their own network (family, friends) to avoid ever entering the formal system, sometimes backed by small, one-time flexible financial assistance (a bus ticket, a small rent-gap payment) as a last resort.</p>
<h3>2. Street outreach</h3>
<p>Several outreach systems operate in parallel with different clinical focuses:</p>
<ul>
<li><strong>LA County DMH HOME Teams</strong> (&quot;Homeless Outreach &amp; Mobile Engagement&quot;) — specialized outreach for unhoused adults with serious mental illness, including people who&#39;ve declined other services, using a &quot;relentless engagement&quot; model with live handoffs to treatment and housing.</li>
<li><strong>LA County DHS Housing for Health Multidisciplinary Teams (MDTs)</strong> — outreach combining physical health, mental health, substance use, case management, and peer support for clients with complex, co-occurring needs.</li>
<li><strong>City of LA Inside Safe</strong> (Mayor Bass&#39;s initiative) — voluntary, location-based: a Field Intervention Team engages a specific targeted encampment, building a picture of who&#39;s there before offering placement into interim housing. See the full case study on <a href="#rp-solutions">Solutions Tried</a>.</li>
<li><strong>City of LA CIRCLE</strong> — a 24/7 unarmed crisis-response program deploying mental-health professionals to non-violent LAPD calls involving unhoused people in crisis, as an alternative to police-only response.</li>
<li><strong>LA-HOP</strong> (<a href="http://www.LA-HOP.org">www.LA-HOP.org</a>) — the public referral portal for requesting outreach to a specific unhoused individual, which triages to the appropriate team.</li>
</ul>
<p>No reliable current figure for total outreach-team headcount or annual contacts made across all these teams combined was found in this research pass — a plausible gap for future work. See <a href="#rp-effectiveness">What Works, What Doesn&#39;t</a> for outreach&#39;s actual conversion rate to housing.</p>
<h3>3. Coordinated Entry System (CES)</h3>
<p>CES is LA County&#39;s single coordinated intake/prioritization framework, in place since roughly 2013 — meant to replace an earlier first-come-first-served, provider-by-provider approach with one shared system: a person is assessed once, logged into HMIS, and matched to housing centrally under a shared Prioritization and Matching Policy rather than each provider running its own intake.</p>
<p>Historically, CES used the <strong>VI-SPDAT</strong> assessment tool — see <a href="#rp-tools">Tools &amp; Systems</a> for the documented bias critique and LA&#39;s transition to a successor tool.</p>
<div class="callout callout-fails">
<h5>Mayor Bass has publicly called CES "dysfunctional"</h5>
"The current coordinated entry system is dysfunctional, impractical and inequitable," she said, noting housing units can sit vacant "for far too long" while the matching process runs. Separately, California Policy Lab research found the CES/PSH matching process produces racially disparate outcomes, with Black unhoused residents specifically underprioritized relative to need. <a href="https://knock-la.com/inside-la-endless-queues-for-housing/">Knock LA</a>
</div>

<h3>4. Interim / crisis housing</h3>
<p>This category — emergency shelters, bridge housing, tiny home villages, motel/hotel vouchers — is explicitly meant to function as a <em>temporary bridge</em> to permanent housing, not an end state.</p>
<p><strong>A Bridge Home</strong> (launched under Mayor Garcetti) opened its first site in September 2018 (45 beds, a &quot;sleeping module&quot; congregate model) and expanded into tiny-home-village formats — Chandler Boulevard (40 units/75 beds), Tarzana (76 units/150 beds), Whitsett West (77 units/150 beds), and others. As of 2022 the City had delivered roughly 12 tiny-home villages totaling ~1,552 interim beds — a dated figure; the current total is almost certainly higher.</p>
<div class="callout callout-fails">
<h5>The documented "bridge to nowhere" problem</h5>
A LAist investigation found relatively few people placed in LA's bridge/interim shelters actually exit into permanent housing, because permanent housing supply is far scarcer than interim shelter capacity — every case manager and resident is effectively competing for a small number of permanent slots downstream. One expert warned against investing heavily in interim beds without a credible permanent-housing exit strategy, calling the risk "warehousing people indefinitely." This is corroborated directly by the 2026 count: interim-to-permanent transitions fell 36% year-over-year even as the system kept moving people from the street into interim beds. <a href="https://laist.com/news/bridge-home-los-angeles-garcetti-result">LAist, "A Bridge To Where?"</a>
</div>

<p>See <a href="#rp-breaks">Where &amp; Why It Breaks</a> for the full mechanics of this bottleneck.</p>
<h3>5. Permanent housing placement: RRH vs. PSH</h3>
<p><strong>Rapid Re-Housing (RRH)</strong> is a short-to-medium-term rental subsidy (HUD guidance: roughly 3 months short-term, 4–24 months medium-term) paired with housing-search and relocation services, meant to move people into permanent housing quickly and taper off as the household stabilizes. HUD does <strong>not</strong> require a disability to qualify — it&#39;s the lower-barrier, faster track for households who mainly need transition help and a temporary financial bridge.</p>
<p><strong>Permanent Supportive Housing (PSH)</strong> pairs an indefinite/long-term rental subsidy with ongoing supportive services, and — unlike RRH — generally <strong>requires a qualifying disability</strong> in the household. It&#39;s designed for people whose housing stability depends on both a subsidy and ongoing services, potentially for life.</p>
<p>In effect: <strong>RRH = short/medium subsidy + search help, no disability requirement, faster intended exit. PSH = indefinite subsidy + ongoing clinical/case-management services, disability required, for chronically homeless and other high-acuity individuals.</strong> CES&#39;s acuity score is the mechanism meant to sort people toward one track or the other — higher acuity toward PSH, lower toward RRH. See <a href="#rp-effectiveness">What Works, What Doesn&#39;t</a> for the documented mismatch when this sorting fails.</p>
<h3>6. Aftercare &amp; retention</h3>
<p>The clearest figure found: an LA County PSH program has reportedly maintained roughly a <strong>92% 12-month retention rate</strong> for the past decade. But that headline coexists with more troubling findings for a subset of the population: an estimated <strong>5%</strong> of PSH participants are described as needing a higher level of support than the standard PSH model provides — leading to proposals for an enhanced &quot;PSH+&quot; tier for higher-acuity individuals who are more likely to fall back out of housing under the standard model.</p>
<div class="callout callout-mixed">
<h5>Racial disparities show up here too</h5>
California Policy Lab research documents that Black residents in LA's PSH system experience disproportionate rates of returning to homelessness compared to other groups, connecting this to structural issues in how the CES/PSH matching and support system operates for Black clients specifically — not simply an individual-level outcome. <a href="https://capolicylab.org/inequity-in-the-psh-system-in-los-angeles/">California Policy Lab</a>
</div>

<p>No single authoritative, current, system-wide &quot;percent of all exits who return to homelessness&quot; figure exists that would let this site state one clean headline recidivism statistic. The honest picture: retention is genuinely high in the flagship PSH model for the population it&#39;s designed for, but there&#39;s a smaller higher-acuity subgroup and documented racial disparities where returns to homelessness are meaningfully more common — and RRH, being a shorter, lower-subsidy intervention, plausibly has different (likely lower) retention, though a specific LA figure wasn&#39;t found.</p>
</div>

<div class="rp-page" id="rp-agencies">
<h2>Agencies & NGOs</h2>
<p class="rp-subtitle">Who's actually involved, what each one does — and the fact that this entire structure is mid-collapse-and-rebuild as of 2026.</p>
<div class="rp-meta-row"><span class="rp-status rp-status-researched">Researched</span><span>Last updated 2026-08-01</span></div>
<div class="callout callout-finding">
<h5>This is a moving target — read the timeline first</h5>
As of this writing, LA is mid-collapse-and-rebuild of its core homelessness governance. <strong>April 2025</strong>: LA County voted to pull funding and staff out of LAHSA and build its own department. <strong>January 1, 2026</strong>: the new <strong>LA County Department of Homeless Services and Housing (HSH)</strong> launched. <strong>June 2026</strong>: HUD suspended LAHSA's federal funding over fraud allegations; LAHSA sued; a judge granted a stay pending an August 6, 2026 hearing. <strong>LAHSA's FY2026-27 budget</strong> dropped ~40%, from ~$829M to ~$496M, and it's now ~73% City-funded. As of this research date, it's genuinely unresolved whether LAHSA continues as a reduced joint agency, becomes a pure data/compliance shell, or is restructured again. Anything below should be checked against reporting dated after August 6, 2026.
</div>

<h3>The core structural problem: a joint powers authority nobody fully owns</h3>
<p><strong>LAHSA</strong> (LA Homeless Services Authority) is a <strong>joint powers authority</strong>, created in 1993 specifically so LA City and County would stop fighting over who &quot;owned&quot; homelessness. It&#39;s governed by a 10-member Commission — 5 appointed by the County Board of Supervisors, 5 by the Mayor with Council confirmation.</p>
<div class="callout callout-fails">
<h5>The JPA structure is a documented design flaw, not incidental</h5>
Because governance power is split evenly, neither government fully owns LAHSA — the County could vote to defund it, but the joint agreement still nominally gives it equal governing power, and the City can't unilaterally restructure or abolish it either. This structural ambiguity is cited repeatedly in coverage of the 2025-2026 breakup as the reason the split turned messy instead of clean.
</div>

<p>LAHSA also serves as the <strong>Collaborative Applicant</strong> for the HUD-recognized LA Continuum of Care — meaning it&#39;s not just &quot;a&quot; homeless-services agency but the entity that legally applies for and administers nearly $1 billion in cumulative federal funding on behalf of the entire county&#39;s system. That dual role is why HUD&#39;s 2026 suspension threatens the whole county&#39;s system, not just LAHSA&#39;s own programs.</p>
<h3>Government agencies</h3>
<table>
<thead>
<tr>
<th>Entity</th>
<th>Type</th>
<th>Role</th>
<th>Scale (most recent figure)</th>
<th>Funding</th>
</tr>
</thead>
<tbody><tr>
<td>LAHSA</td>
<td>Joint powers authority (1993)</td>
<td>Coordinates regional services, contracts with ~200+ nonprofits, HUD Collaborative Applicant</td>
<td>FY2026-27 budget ~$496M (down from ~$829M)</td>
<td>Federal, state, city, declining county</td>
</tr>
<tr>
<td>LA Continuum of Care</td>
<td>HUD-recognized planning body</td>
<td>Sets HUD funding policy/priorities countywide; LAHSA is its Collaborative Applicant</td>
<td>~$1B in HUD funds over 5 years through 2025</td>
<td>HUD CoC Program grants</td>
</tr>
<tr>
<td>LA County Dept. of Homeless Services and Housing (HSH) <em>(new, Jan 2026)</em></td>
<td>County department</td>
<td>Directly operates county-funded interim housing, outreach, prevention; absorbed Housing for Health</td>
<td>FY2026-27 budget $843M</td>
<td>Measure A, HHAP grants</td>
</tr>
<tr>
<td>LA County DHS – Housing for Health <em>(now under HSH)</em></td>
<td>County division</td>
<td>Outreach, case management, clinical services, housing subsidies for complex-needs clients</td>
<td>~57,000 served, ~600+ staff</td>
<td>County health funds, Medi-Cal, Measure H/A</td>
</tr>
<tr>
<td>LA County DMH</td>
<td>County department</td>
<td>Runs HOME mental-health street teams</td>
<td>All 8 County Service Planning Areas, 120+ staff</td>
<td>MHSA, Medi-Cal</td>
</tr>
<tr>
<td>LA County DPSS</td>
<td>County department</td>
<td>CalWORKs Homeless Assistance for cash-aid-eligible families — a separate, means-tested track</td>
<td>—</td>
<td>State/federal CalWORKs funds</td>
</tr>
<tr>
<td>LA Housing Department (LAHD)</td>
<td>City department</td>
<td>Finances affordable/supportive housing (ULA, Homekey); houses the new Homelessness Oversight Bureau</td>
<td>HOB combines 11 LAHD + 9 CAO positions</td>
<td>ULA tax, federal HOME/CDBG, general fund</td>
</tr>
<tr>
<td>Mayor&#39;s Office / Inside Safe</td>
<td>Mayoral initiative</td>
<td>Encampment-to-motel operations via a Field Intervention Team</td>
<td>$300M+ authorized since Dec. 2022</td>
<td>City general fund</td>
</tr>
<tr>
<td>HACLA</td>
<td>City housing authority</td>
<td>~83,000+ households of public housing/Section 8, including HUD-VASH</td>
<td>219 PSH voucher developments (10,322 units); paused new applications for 3,300+ families in March 2025 amid a $118M shortfall</td>
<td>HUD Section 8/public housing funds</td>
</tr>
<tr>
<td>LACDA</td>
<td>County housing authority equivalent</td>
<td>Section 8 + ~3,000 public housing units, Homeless Incentive Program</td>
<td>63 sites</td>
<td>HUD funds, Measure A</td>
</tr>
<tr>
<td>LACAHSA <em>(new, 2023-25)</em></td>
<td>Regional housing agency</td>
<td>Affordable housing production + eviction prevention — feeds the supply the CoC/HSH system depends on for exits</td>
<td>FY26-27: $228M+ production, $114M+ prevention</td>
<td>~35.75% of Measure A revenue</td>
</tr>
</tbody></table>
<h3>The audit trail that triggered the breakup</h3>
<p>A LA County Auditor-Controller review (finalized ~Feb. 2024) found LAHSA:</p>
<ul>
<li>Could not produce an accurate list of the agencies it contracts with, and made payments with no contract in place</li>
<li>Had recovered only $2.5 million of $50.8 million in Measure H funds advanced in FY2017-18</li>
<li>Failed to complete any of four planned internal audits in FY2022-23, and started only two of four planned in FY2023-24</li>
<li>Had &quot;almost no meaningful performance measures&quot; in service contracts, and didn&#39;t enforce the few it had</li>
</ul>
<p>HUD&#39;s June 2026 suspension cited a &quot;clear pattern of fraud,&quot; failure to track empty motel/hotel rooms being billed to programs, a 2024 audit showing <strong>$513 million in unspent funds</strong>, and a $2.1 million conflict-of-interest contract tied to former CEO Va Lecia Adams Kellum&#39;s resignation (funds went to a nonprofit that employed her husband). The suspension put an estimated $150 million in already-awarded grants in limbo and blocked LAHSA from submitting the region&#39;s next ~$241 million CoC application.</p>
<h3>Where mandates overlap and people fall through gaps</h3>
<ol>
<li><strong>LAHSA vs. HSH vs. the CoC</strong>: it&#39;s genuinely unclear who &quot;owns&quot; region-wide coordination right now. LAHSA retains the CoC&#39;s federal Collaborative Applicant role even as its operating budget and county staff have moved to HSH — reporters and advocates have flagged that no one has articulated what happens to CoC compliance if county capacity sits elsewhere while the &quot;lead agency&quot; designation doesn&#39;t.</li>
<li><strong>DPSS vs. LAHSA/CES</strong>: family homeless assistance through CalWORKs is a parallel, means-tested system not obviously integrated with Coordinated Entry — a family that doesn&#39;t qualify for CalWORKs (certain immigration statuses, or single adults) has no equivalent DPSS pathway.</li>
<li><strong>Federal voucher supply vs. local outreach capacity</strong>: Inside Safe can move people out of encampments into interim housing, but when HACLA&#39;s voucher pipeline pauses for budget reasons, there&#39;s no guaranteed permanent exit — a structural gap between the entities that find people and the entities that permanently house them.</li>
<li><strong>City Council district-by-district variation</strong>: each of the 15 council districts runs its own &quot;Homelessness Deputy&quot; operation independently, meaning encampment response, sanitation, and service-linkage vary by which office covers a given block — de facto policy variation within one city.</li>
<li><strong>DMH/DPH vs. the housing system</strong>: mental-health and public-health outreach teams have historically run their own caseloads largely in parallel with housing placement — HSH&#39;s stated FY2026-27 goals explicitly call for better coordinating them, an implicit admission they haven&#39;t been.</li>
</ol>
<h3>Major nonprofit service providers</h3>
<table>
<thead>
<tr>
<th>Organization</th>
<th>What it does</th>
<th>Scale (most recent figures found)</th>
</tr>
</thead>
<tbody><tr>
<td>PATH (People Assisting the Homeless)</td>
<td>Outreach, shelter, housing development</td>
<td>Revenue ~$181M / expenses ~$186M (2024 Form 990)</td>
</tr>
<tr>
<td>The People Concern</td>
<td>Outreach, shelter, PSH (2016 OPCC/Lamp Community merger)</td>
<td>Revenue ~$102M (FYE June 2024); ~85% government-grant-funded</td>
</tr>
<tr>
<td>Union Rescue Mission</td>
<td>Shelter, recovery, faith-based services</td>
<td>Revenue ~$58M / expenses ~$50M (2024)</td>
</tr>
<tr>
<td>Hope of the Valley Rescue Mission</td>
<td>Shelter, tiny-home village operation</td>
<td>Revenue ~$88M / expenses ~$82M (2024)</td>
</tr>
<tr>
<td>Weingart Center</td>
<td>Shelter (650 beds, 170,000 sq ft)</td>
<td>~6,000 served, 253,000 meals/year</td>
</tr>
<tr>
<td>The Chrysalis Center</td>
<td>Employment/job-training</td>
<td>8,000+ served/year</td>
</tr>
<tr>
<td>LA Family Housing</td>
<td>PSH development/operation</td>
<td>2,000+ units across 27 properties; 92% government-grant-funded</td>
</tr>
<tr>
<td>Urban Alchemy</td>
<td>Street-level safety/outreach staffing (contracted)</td>
<td>Revenue ~$85M (2024) — see controversy note below</td>
</tr>
<tr>
<td>Volunteers of America LA (VOALA)</td>
<td>Housing pathways, veterans, youth services</td>
<td>Consolidated budget figure not found</td>
</tr>
<tr>
<td>JWCH Institute</td>
<td>FQHC homeless health care</td>
<td>442,189 health center visits in 2024</td>
</tr>
<tr>
<td>St. Joseph Center</td>
<td>CES lead agency for SPA 5 (Westside)</td>
<td>—</td>
</tr>
</tbody></table>
<div class="callout callout-mixed">
<h5>Urban Alchemy is the most contested provider on this list</h5>
Investigative reporting (The Nation, CityWatch LA) has scrutinized Urban Alchemy's no-bid contracting and worker-treatment allegations; one incident showed a city-contracted employee spraying an unhoused person with a hose. Worth flagging specifically because it illustrates that "who gets the contract" is itself a live accountability question, not just "how much money flows."
</div>

<h3>Cross-cutting: the outreach/liaison landscape is genuinely fragmented</h3>
<p>Multiple outreach systems run in parallel with different clinical focuses and reporting lines — DMH&#39;s HOME teams, DHS&#39;s Multidisciplinary Teams, Inside Safe&#39;s Field Intervention Teams, CIRCLE&#39;s crisis-response teams, and 15 separate council-office liaison operations. See <a href="#rp-system">Phases of the Process</a> for how each fits into the pipeline, and <a href="#rp-tools">Tools &amp; Systems</a> for how (and whether) their data connects.</p>
</div>

<div class="rp-page" id="rp-tools">
<h2>Tools & Systems</h2>
<p class="rp-subtitle">The software and assessment instruments that decide who gets what — and how well they actually work.</p>
<div class="rp-meta-row"><span class="rp-status rp-status-researched">Researched</span><span>Last updated 2026-08-01</span></div>
<h3>HMIS (Homeless Management Information System)</h3>
<p>HMIS is the HUD-mandated data infrastructure requirement: any CoC receiving HUD funding must operate one, and any provider receiving CoC/ESG funds is generally required to enter client data into it. LAHSA administers LA&#39;s HMIS using the vendor platform <strong>Clarity Human Services</strong>, built by <strong>Bitfocus</strong>.</p>
<div class="callout callout-fails">
<h5>A concrete, damning data failure: exit logging can be bypassed</h5>
In 2026 reporting, LA councilmembers reacted with fury (Councilmember Bob Blumenfield: "That's horrifying") on learning that LAHSA's system lets providers <strong>bypass logging when someone exits the Inside Safe motel-shelter program</strong> — meaning the city could be paying for empty motel rooms for weeks after someone left, with no enforced requirement to log exits, on a program the Council has authorized $300 million for. <a href="https://laist.com/news/housing-homelessness/inside-safe-homeless-service-data-problems-lahsa-la-councilmembers-bass">LAist, "'Horrifying' Homeless Service Data Problems Prompt Fury From LA Councilmembers"</a>
</div>

<p>LAHSA itself commissioned a Homeless Data Assessment (funded via the Hilton Foundation) examining the state of its own data collection — an internal acknowledgment that data quality is a live, unsolved concern rather than a settled one.</p>
<h3>Coordinated Entry System (CES) and the assessment tool</h3>
<p>LA&#39;s CES has historically used the <strong>VI-SPDAT</strong> (Vulnerability Index – Service Prioritization Decision Assistance Tool) to score and prioritize people for permanent supportive housing. As of 2025–2026, LA is actively transitioning to a successor, the <strong>LA HAT (Los Angeles Housing Assessment Tool)</strong> — implementation milestones were last updated January 2026 and FAQs updated April 2026, meaning the rollout is still in progress as of this research date.</p>
<div class="callout callout-fails">
<h5>The VI-SPDAT has a real, published bias record — not just anecdotal complaints</h5>
Peer-reviewed and advocacy research found the tool systematically underperforms for Black populations, especially Black women — one study found white women scored consistently <em>higher</em> on vulnerability than Black women and most men, despite similar rates of trauma/abuse history, attributed to documented reluctance among Black respondents (rooted in historic institutional mistrust) to disclose formal healthcare use, mental-health history, or illicit behavior to an intake worker — the very things the tool scores on. <a href="https://homelesshub.ca/blog/2021/racial-and-gender-bias-vi-spdat/">HomelessHub</a>
</div>

<p>The tool&#39;s own creator, Ian DeJong, publicly disavowed it as an intake instrument years before its maintainer, OrgCode, formally announced in December 2020 it would stop developing it — explicitly citing &quot;communities&#39; persistent misuse of the tool&quot; and the need to &quot;accelerate activities to improve approaches that further promote racial and gender equity.&quot; Its underlying validation was also weak: it was built heavily on data from a single northeastern U.S. city, from a largely male sample, analyzed for likelihood of <em>death</em> rather than validated against a &quot;vulnerability&quot; threshold it&#39;s actually used to measure — a mismatch between what was measured and what the tool is used for. Because scores directly determine housing-resource priority, there&#39;s also documented concern (echoed in comparable-tool literature, e.g. Allegheny County&#39;s algorithmic housing tool) about both provider-side &quot;coaching&quot; of answers and client-side underreporting due to stigma — both distort who actually gets prioritized.</p>
<p>LA HAT is designed to separate &quot;vulnerability&quot; (harm a person faces if unhoused) from &quot;acuity&quot; (services needed to stay housed), and to explicitly account for systemic barriers like housing discrimination rather than relying solely on individual-deficit questions — a direct response to the critiques above. No independent (non-LAHSA) evaluation of whether LA HAT actually reduces the documented racial disparities was found — it&#39;s still mid-rollout.</p>
<div class="callout callout-fails">
<h5>Mayor Bass has called the CES it feeds "dysfunctional"</h5>
"The current coordinated entry system is dysfunctional, impractical and inequitable," she's said publicly, noting housing units can sit vacant "for far too long" while the matching process runs. See <a href="#rp-breaks">Where &amp; Why It Breaks</a>.
</div>

<h3>Case management software: Clarity Human Services (Bitfocus)</h3>
<p>Clarity is the cloud-based platform LAHSA licenses from Bitfocus as LA&#39;s HMIS front end — built to help providers stay compliant with HUD CoC/ESG and other federal-partner reporting requirements, with a client-facing portal.</p>
<h3>Interoperability failures</h3>
<div class="callout callout-fails">
<h5>LA County ran a data system that doesn't talk to HMIS at all</h5>
LA County separately ran a proprietary data system that does not connect to HMIS, forcing some providers to manually double-enter client data into both systems. As reporting on this put it: "manually double-entering things opens the door for all sorts of errors" — small data-entry mistakes can directly affect whether someone is recorded as sheltered or not, a direct mechanical link between an IT architecture choice and a person's real housing status as the system records it.
</div>

<p>City and county entities have separately, publicly acknowledged they&#39;re working to improve data sharing specifically between the homelessness and mental-health systems (HMIS/Clarity and DMH&#39;s clinical records) — again, an admission this integration hasn&#39;t historically existed. The Inside Safe exit-logging bypass described above is itself an interoperability/accountability failure: the mayor&#39;s signature program&#39;s outcome data isn&#39;t reliably captured by the system meant to track it.</p>
<h3>Encampment-tracking tools</h3>
<ul>
<li><strong>LASAN&#39;s CARE/CARE+ program</strong> (launched Oct. 2019) deploys 17 CARE teams and 13 CARE+ teams (the latter embedding LAHSA outreach workers alongside sanitation staff) for encampment cleanups. No dedicated, named software/tracking platform for CARE/CARE+ deployment or outcome tracking was found — city documentation describes team structure and legal protocol (LAMC 56.11) but not a specific case-management or GIS tool.</li>
<li><strong>Inside Safe</strong> has no distinct, named encampment-tracking system separate from HMIS/Clarity and general city reporting. City Controller Kenneth Mejia&#39;s public <strong>Homelessness Dashboard</strong> is the most visible tracking tool, but it&#39;s explicitly a Controller&#39;s-office accountability project, not an operational tool outreach teams themselves use.</li>
<li><strong>County encampment response</strong>: LA County Public Health issues countywide Encampment Resolution Guidance (a policy document, not software); no named county encampment-tracking system distinct from HMIS was identified.</li>
</ul>
<div class="callout callout-question">
<h5>An unexpected gap</h5>
Despite the volume of city/county reporting on encampment operations, no purpose-built encampment-tracking IT system (comparable to how Clarity/HMIS is named for case management) surfaced in this research. Tracking appears to happen through some combination of Clarity/HMIS entries, LASAN's internal systems, council-office spreadsheets, and after-the-fact Controller's-office dashboards — not one authoritative real-time system.
</div>
</div>

<p class="rp-eyebrow rp-section-eyebrow">The Money</p>
<div class="rp-page" id="rp-money">
<h2>Where It Comes From, Where It Goes</h2>
<p class="rp-subtitle">Federal formulas, state grants, local ballot measures, and philanthropy — traced from source to spend, including where the tracking itself has failed.</p>
<div class="rp-meta-row"><span class="rp-status rp-status-researched">Researched</span><span>Last updated 2026-08-01</span></div>
<div class="callout callout-question">
<h5>A note on precision here</h5>
Homelessness funding in LA is genuinely difficult to total up — city and county budgets use different fiscal years and accounting methods, and (as this page documents) auditors themselves have repeatedly found the spending untrackable. Where sources disagree or a figure couldn't be verified, that's stated explicitly below rather than resolved by picking one. See <a href="#rp-sources">Sources &amp; Methodology</a>.
</div>

<h3>Where the money comes from</h3>
<h4>Federal: HUD Continuum of Care and ESG</h4>
<p>The LA Continuum of Care (CA-600, administered by LAHSA) received <strong>$220.2 million</strong> from HUD&#39;s Continuum of Care Program for the 2025–2026 grant term — mostly renewals of 130 existing projects. (<a href="https://www.lahsa.org/news?article=963-fy-2024-2025-coc-program-nofo">LAHSA</a>) LA County separately received <strong>$1.77 million</strong> in Emergency Solutions Grant funds for FY2024-25, administered by the LA County Development Authority. (<a href="https://www.lacda.org/homelessness/emergency-solutions-grant">LACDA</a>)</p>
<div class="callout callout-fails">
<h5>2026: HUD suspended this pipeline</h5>
On June 11, 2026, HUD suspended LAHSA from federal grant activity pending an Inspector General investigation into "repeated false statements" and financial-control failures — jeopardizing roughly <strong>$241 million</strong> supporting more than 11,000 people county-wide. LAHSA sued HUD. See <a href="#rp-agencies">Agencies &amp; NGOs</a> and <a href="#rp-breaks">Where &amp; Why It Breaks</a> for the full institutional story. <a href="https://laist.com/news/housing-homelessness/lahsa-homeless-los-angeles-sue-hud-trump-mismanagement-fraud-contiuum-of-care-funding">LAist</a>
</div>

<h4>State: HHAP (Homeless Housing, Assistance and Prevention Program)</h4>
<p>HHAP is California&#39;s flagship block grant, administered in one-time, non-ongoing rounds — a structural weakness in itself, since it makes multi-year program planning difficult.</p>
<table>
<thead>
<tr>
<th>Round</th>
<th>LA City</th>
<th>LA County</th>
<th>LA CoC (LAHSA)</th>
</tr>
</thead>
<tbody><tr>
<td>Round 1</td>
<td>$117M</td>
<td>$64M</td>
<td>$66M</td>
</tr>
<tr>
<td>Round 2</td>
<td>$55M</td>
<td>—</td>
<td>$31M</td>
</tr>
<tr>
<td>Round 3</td>
<td>$143.6M</td>
<td>$82.3M</td>
<td>$84.2M</td>
</tr>
<tr>
<td>Round 4 (FY24-25)</td>
<td>$143M</td>
<td>$85M</td>
<td>$86M</td>
</tr>
<tr>
<td>Round 5</td>
<td>$164M</td>
<td>$97M</td>
<td>$102M</td>
</tr>
<tr>
<td>Round 6 (2026)</td>
<td>$760M statewide total, LA-specific split not isolated in available sources</td>
<td></td>
<td></td>
</tr>
</tbody></table>
<p><em>(Figures drawn from HCD award documents via search summaries — see <a href="#rp-sources">Sources &amp; Methodology</a> for a caveat on this research pass&#39;s source-verification limits.)</em></p>
<p>Round 6&#39;s <strong>$760 million</strong> statewide total is roughly a <strong>50% cut</strong> from the ~$1 billion of prior rounds, attributed to the expiration of one-time COVID-era federal relief and a widening state deficit. LA&#39;s own mayor is among the &quot;Big City Mayors&quot; lobbying Sacramento to convert HHAP into a permanent $1 billion/year stream instead of repeated one-off rounds. (<a href="https://www.gov.ca.gov/2026/01/16/following-9-drop-in-unsheltered-homelessness-governor-newsom-announces-new-investments-to-create-more-shelter-and-services-with-stronger-accountability/">Governor&#39;s Office</a>)</p>
<h4>County: Measure H → Measure A</h4>
<p><strong>Measure H</strong> (2017), a quarter-cent county sales tax generating roughly <strong>$500 million/year</strong>, was a services tax (not construction) with a 2027 sunset. It wasn&#39;t simply extended — it was repealed early and replaced.</p>
<p><strong>Measure A</strong>, approved by voters in November 2024 and effective April 2025, is a half-cent tax with <strong>no sunset date</strong>, projected at <strong>&quot;over $1 billion&quot; to &quot;$1.1 billion&quot; annually</strong>. Unlike Measure H, it flows through a different oversight structure — split among the County, cities/Councils of Governments, the LA County Development Authority, and the newly created LA County Affordable Housing Solutions Agency (LACAHSA). (<a href="https://laist.com/measure-a-explained-keeping-up-with-la-countys-homelessness-initiative">LAist</a>)</p>
<p>The County&#39;s FY2026-27 Measure A Spending Plan totals <strong>$843 million</strong> for the new Department of Homeless Services and Housing: $277M for interim housing, ~$239M for permanent housing, 65 outreach teams, 3,671 Time-Limited Subsidies, 3,675 locally-funded PSH subsidies, and 6,185 interim housing beds. (<a href="https://file.lacounty.gov/SDSInter/hsh/1200764_BOSFILEDVERSION_FY2026-27MeasureASpendingPlan-FinalBoardLetter_2_1.pdf">LA County HSH board letter</a>)</p>
<h4>City: Measure HHH and Measure ULA</h4>
<p><strong>Measure HHH</strong> (2016) — a <strong>$1.2 billion</strong> bond to build permanent supportive housing — is the most heavily audited local funding measure. See the cost breakdown below.</p>
<p><strong>Measure ULA</strong> (2022, the &quot;mansion tax&quot;) is a transfer tax on LA property sales above ~$5M (4%) and ~$10M (5.5%), funding affordable housing, tenant assistance, and homelessness prevention.</p>
<div class="callout callout-mixed">
<h5>ULA's revenue figures don't reconcile across sources</h5>
Original projections at passage: <strong>$672M–$1B annually</strong>. Actual: FY2022-23 (partial year) $15.6M; FY2023-24 $270.3M (55.3% below the $604.6M budgeted); FY2024-25 projected at $271.1M. Cumulative totals reported since inception range from <strong>$725M</strong> ("first 26 months," ~60% of the promised minimum) to <strong>"over $1 billion" (Jan. 2026)</strong> to <strong>$1.2 billion (May 2026)</strong> — these three don't fully reconcile, likely reflecting different measurement windows or gross-vs-net accounting, and none should be treated as the single authoritative figure. As of the most recent source found, ULA's constitutionality is still being litigated (HJTA/AAGLA v. City of LA), pending appellate oral argument. <a href="https://shelterforce.org/2025/01/17/what-has-measure-ula-done-so-far/">Shelterforce</a>
</div>

<h3>Where the money goes: the Measure HHH cost story</h3>
<div class="callout callout-fails">
<h5>Cost overruns cut the promised unit count by 41%</h5>
Original 2016 estimate: <strong>$350,000–$414,000/unit</strong>. By the 2022 Controller audit, median total development cost had risen to <strong>$580,155/unit</strong> (up 5.5% year-over-year); some individual projects reached as high as <strong>$837,000/unit</strong> — a specific high-end mixed-use project, not the program average. The original <strong>10,000-unit</strong> target was cut to <strong>5,873</strong> — a 41% reduction — without the bond's total dollar authorization changing, because rising per-unit costs consumed the same fixed pool of money faster than planned. <a href="https://controller.lacity.gov/audits/high-cost-of-homeless-housing-hhh">LA City Controller, "The High Cost of Homeless Housing"</a>
</div>

<p>As of March 2025, <strong>$1.03 billion</strong> of the $1.2B bond had been spent; current tracking shows <strong>8,091 total units</strong> (6,578 supportive) across 125 projects — 14% ready for occupancy, 54% in construction, 32% in pre-development. Projects took 3–6 years from funding to opening. The maximum <em>HHH subsidy</em> per unit (distinct from total development cost) was actually cut, from $220,000 in earlier cycles to $140,000 in the most recent one — meaning HHH dollars cover a shrinking share of a rising total cost, with tax credits and other loans making up the rest.</p>
<h3>Cost per unit, by program type</h3>
<table>
<thead>
<tr>
<th>Program type</th>
<th>Cost</th>
<th>Source / year</th>
</tr>
</thead>
<tbody><tr>
<td>Homekey (state motel/hotel conversion)</td>
<td>~$144,000/unit</td>
<td>State Auditor, found &quot;likely cost-effective&quot;</td>
</tr>
<tr>
<td>HHH permanent supportive housing (median, 2022 audit)</td>
<td>$580,155/unit</td>
<td>LA City Controller</td>
</tr>
<tr>
<td>HHH — high-end outlier project</td>
<td>up to $837,000/unit</td>
<td>LA City Controller, 2022</td>
</tr>
<tr>
<td>Congregate interim shelter</td>
<td>approx. $29,000/year per bed (approx. $79/night)</td>
<td>2024 City rate documents</td>
</tr>
<tr>
<td>Tiny-home / hotel-based interim shelter</td>
<td>approx. $57,000/year per bed (approx. $156/night)</td>
<td>2024 City rate documents</td>
</tr>
</tbody></table>
<p>Homekey&#39;s per-unit cost is roughly a <strong>quarter</strong> of HHH&#39;s median — the clearest documented evidence that motel/hotel acquisition-and-conversion is a cheaper delivery model than ground-up construction, though the two programs aren&#39;t fully apples-to-apples (acquisition vs. new-build, different unit mixes).</p>
<p>A clean, current &quot;<strong>cost per successful exit to permanent housing</strong>,&quot; broken out by program type, could not be found in this research pass despite being a commonly requested metric — flagged as a genuine data gap, not estimated here.</p>
<h3>The audits: waste, delay, and untracked money</h3>
<div class="callout callout-finding">
<h5>The state's own audit is the anchor statistic behind most "money wasted" narratives</h5>
The April 2024 California State Auditor report found the state spent <strong>$24 billion</strong> on homelessness from FY2018–19 through FY2022–23 but did not consistently track whether that spending improved outcomes. Of five state programs examined ($13.7B combined), only <strong>two</strong> were found "likely cost-effective" — Homekey was one of them. This figure is <em>statewide</em>, not LA-specific, but it's the number a subsequent federal fraud task force explicitly cited when it launched in LA. <a href="https://calmatters.org/housing/homelessness/2024/04/california-homelessness-spending/">CalMatters</a>
</div>

<p>LA-specific audits found similar patterns:</p>
<ul>
<li>A court-ordered independent audit (under federal Judge David O. Carter&#39;s oversight of the <em>LA Alliance v. City of LA</em> litigation) found roughly <strong>$2.4 billion</strong> in City spending over four years effectively impossible to verify — Carter called it a &quot;slow train wreck&quot; and warned he might appoint an outside receiver. (<a href="https://laist.com/news/housing-homelessness/audit-homeless-carter-lahsa">LAist</a>)</li>
<li>A November 2024 LA County Auditor-Controller review found LAHSA gave service providers nearly <strong>$51 million</strong> in cash advances starting in 2017 with no formal repayment agreements — only $2.5 million had been recovered by mid-2024. About 51% of LAHSA&#39;s planned contract-compliance reviews had no way to verify providers were actually delivering the contracted services.</li>
<li>A December 2024 City Controller audit found roughly <strong>a quarter of shelter beds sat empty</strong> every night from 2019–2023 — <strong>$218 million</strong> in wasted capacity — even as nearly a third of people who wanted a bed couldn&#39;t get one, and fewer than a fifth of people placed in interim housing ever reached permanent housing.</li>
<li>In April 2025, a U.S. Attorney announced a <strong>Homelessness Fraud and Corruption Task Force</strong> combining federal prosecutors, the IRS, FBI, and HUD&#39;s Inspector General — a concrete case tied to the scrutiny: a LAHSA contractor was charged with diverting $23 million in homeless funding for personal use through a nonprofit front.</li>
<li>The City separately left <strong>$473–513 million</strong> of its own homeless services budget unspent in FY2025, even as it cut nearly $200 million in homeless funding amid a broader budget deficit — underspending and cuts happening in the same year.</li>
</ul>
<h3>Does the spending correlate with fewer people homeless?</h3>
<p>LAHSA&#39;s finalized 2025 count found LA County homelessness fell 4% to 72,308 and City of LA fell 3.4% to 43,699 — a second consecutive annual decline, attributed partly to a record ~28,000 permanent housing placements. But 2026&#39;s count reversed that trend (see <a href="#rp-breaks">Where &amp; Why It Breaks</a>), and independent RAND field research has separately questioned the count&#39;s own accuracy.</p>
<div class="callout callout-question">
<h5>No source establishes a clean causal link</h5>
None of the sources reviewed directly connect specific dollar amounts spent to the count's rise or fall. The decline coincided with record encampment-clearing and housing placements — but also with hundreds of millions in documented underspending and active fraud investigations. The honest read: the trend and the spending problems run in parallel, and the evidence doesn't support a clean "spending worked" or "spending failed" story in either direction.
</div>

<h3>Philanthropy&#39;s role</h3>
<p>Private philanthropy appears meaningful but small relative to roughly $1.6–3 billion/year in combined public spending (sources on the exact combined public total disagree — see box below). The <strong>Conrad N. Hilton Foundation</strong> is the largest philanthropic funder identified, with over $80 million in chronic-homelessness grants over two decades, $56 million of it LA-focused. No source found gives a comprehensive total for all private/philanthropic giving toward LA homelessness in a given year.</p>
<div class="callout callout-question">
<h5>Even the top-line combined figure is contested</h5>
Reporting variously describes combined City+County annual spending as "about $2 billion," or roughly $1B (City) + $637M (County) ≈ $1.6B, or "nearly $3 billion" — three different aggregate figures that don't reconcile, because city and county budgets use different fiscal years and accounting methods and because (per the audits above) even the agencies themselves have struggled to produce a clean total.
</div>
</div>

<p class="rp-eyebrow rp-section-eyebrow">What Happens</p>
<div class="rp-page" id="rp-effectiveness">
<h2>What Works, What Doesn't</h2>
<p class="rp-subtitle">By phase of the process — what the evidence says is working, what isn't, and how confident we can actually be in that.</p>
<div class="rp-meta-row"><span class="rp-status rp-status-researched">Researched</span><span>Last updated 2026-08-01</span></div>
<div class="callout callout-question">
<h5>How to read this page</h5>
Each intervention below is rated by the strength of its outcome evidence: <strong>strong</strong>, <strong>mixed</strong>, or <strong>weak</strong> — and disputed claims are flagged as disputed rather than presented as settled. Ratings describe evidence quality, not political popularity. See <a href="#rp-sources">Sources &amp; Methodology</a>.
</div>

<h3>Prevention &amp; diversion — strong cost-effectiveness, small scale</h3>
<div class="callout callout-works">
<h5>Strong evidence of cost-effectiveness</h5>
Only <strong>14.5%</strong> of LA County Measure H-funded prevention clients returned to homelessness within 12 months — a strong outcome relative to every downstream intervention on this page. <a href="https://www.capolicylab.org/wp-content/uploads/2021/01/Prevention-Evaluation-full-report.pdf">California Policy Lab, 2021</a>
</div>

<p>Cost comparisons consistently favor prevention: eviction-prevention assistance averages roughly <strong>$2,500 per household</strong>, versus up to <strong>$5,000/month</strong> for emergency shelter for the same family, and far more once someone has fallen into chronic homelessness and needs Permanent Supportive Housing (PSH). (<a href="https://www.npscoalition.org/post/fact-sheet-cost-of-homelessness">cost-of-homelessness summary</a>) The <em>Just in Reach</em> jail-diversion program — a targeted form of prevention for people cycling through LA County jail — cost about <strong>$6,202 per participant per year</strong> and offset 50–100% of that cost through reduced jail, hospital, and shelter use. (<a href="https://www.rand.org/pubs/research_reports/RRA1758-1.html">RAND</a>)</p>
<p><strong>The catch:</strong> cheap-per-unit doesn&#39;t mean effective-at-scale is actually being tracked. The 2024 California State Auditor found that of five major state homelessness programs examined — $13.7 billion combined — only <strong>two</strong> were determined &quot;likely cost-effective,&quot; and three didn&#39;t produce enough data to judge effectiveness at all. (<a href="https://calmatters.org/housing/homelessness/2024/04/california-homelessness-spending/">CalMatters, April 2024</a>) Prevention also reaches only a fraction of the people who become homeless each year in LA — it&#39;s the cheapest lever per person, and the least-scaled one.</p>
<h3>Street outreach — moderate reach, low direct conversion to housing</h3>
<p>A California Policy Lab analysis of roughly 37,000 street outreach clients found only <strong>17%</strong> were enrolled in interim housing, Rapid Re-Housing, or PSH within one year of first contact. (<a href="https://capolicylab.org/topics/homelessness/unsheltered-in-los-angeles-insights-from-street-outreach-services-data/">California Policy Lab</a>)</p>
<div class="callout callout-mixed">
<h5>Historical baseline: outreach missed its own targets</h5>
A 2019 LA City Controller audit found LAHSA's outreach program placed only <strong>14%</strong> of assessed individuals in shelter/bridge housing against a 20% goal, and only <strong>4%</strong> in permanent housing against a 10% goal. Only 4% of people with a mental-health condition were connected to services; only 6% with substance-use issues were referred to treatment. The audit found workers spent disproportionate time on encampment-clearing logistics rather than sustained engagement. <a href="https://controller.lacity.gov/audits/strategy-on-the-streets">LA City Controller, "Strategy on the Streets," 2019</a> — no more recent outreach-specific performance audit was found in this research pass, so treat this as a pre-pandemic baseline, not current performance.
</div>

<p>Outreach is the necessary front door — it&#39;s typically where HMIS enrollment begins — but on its own it converts a modest share of contacts into housing placements.</p>
<h3>Interim / shelter housing — the weakest link in the pipeline</h3>
<div class="callout callout-fails">
<h5>Weak evidence it functions as a bridge</h5>
An LA City Controller audit (Dec. 2024) found fewer than <strong>1 in 5 people (under 20%)</strong> in city-funded interim housing over a five-year period moved into permanent housing — and more than half of exits went to homelessness or an unknown destination. A separate court-ordered independent audit found a median <strong>22% exit-to-permanent-housing</strong> rate for FY2023-24 versus <strong>47.8% of exits that returned people to homelessness</strong> — people were more likely to leave interim housing for the street than for permanent housing. <a href="https://ktla.com/news/local-news/audit-finds-1-in-4-shelter-beds-in-los-angeles-went-unused-costing-taxpayers-218-million/">KTLA, summarizing LA City Controller audit</a> / <a href="https://laist.com/news/housing-homelessness/audit-homeless-carter-lahsa">LAist, Carter-ordered audit</a>
</div>

<p>The same audit found roughly <strong>1 in 4 city-funded shelter beds sat unused</strong> — an estimated <strong>$218 million</strong> wasted over five years — even though nearly <strong>1 in 3</strong> people who wanted a bed in FY22–23 couldn&#39;t get one. That combination (empty beds <em>and</em> unmet demand at the same time) points to a matching/operations failure, not a lack of need. (<a href="https://controller.lacity.gov/landings/interim-housing-audit">LA City Controller</a>)</p>
<p>Interim housing currently functions better as crisis stabilization and encampment reduction than as a housing pipeline. See <a href="#rp-breaks">Where &amp; Why It Breaks</a> for how this bottleneck is directly connected to the 2026 rise in the homeless count.</p>
<h3>Permanent Supportive Housing (PSH) — strong evidence for retention, real equity gap</h3>
<div class="callout callout-works">
<h5>Strong evidence of effectiveness</h5>
Of roughly 25,000 people who received intensive case management in PSH, <strong>94% retained their housing after one year</strong> (<a href="https://capolicylab.org/topics/homelessness/key-performance-indicators-for-homelessness-services-in-los-angeles/">California Policy Lab / LAHSA KPI reporting</a>). Of ~75,000 Californians placed in PSH, only <strong>8% returned to the streets within 6 months</strong>, versus <strong>23%</strong> for people placed in time-limited subsidized housing instead (<a href="https://hpri.usc.edu/wp-content/uploads/2024/08/Breaking-Cycles-of-Homelessness-Achieving-Stability.pdf">USC Homelessness Policy Research Institute, 2024</a>). A 2021 cost study put PSH at roughly <strong>$15,358/person/year</strong> against average public-service costs of <strong>$40,449/year</strong> for a comparable unhoused person without it.
</div>

<div class="callout callout-mixed">
<h5>Documented racial disparity within an otherwise strong-performing model</h5>
Black single adults return to homelessness within a year of PSH exit at <strong>14.2%</strong> — nearly double the rate for white (7.3%) or Latino (8%) single adults. For families, the gap is wider still: 13.5% (Black) vs. 4.2% (white) vs. 3.7% (Latino). <a href="https://hpri.usc.edu/wp-content/uploads/2024/08/Breaking-Cycles-of-Homelessness-Achieving-Stability.pdf">USC HPRI, 2024</a>
</div>

<h3>Rapid Re-Housing (RRH / &quot;Time-Limited Subsidy&quot;) — mixed, with a real mismatch problem</h3>
<p>RRH provides a short-term (typically ≤24 month) rental subsidy plus light-touch services — cheaper and faster to scale than PSH. Where it fits, it works: California Policy Lab found it &quot;substantially reduced long-term homelessness,&quot; with benefits persisting after the subsidy ended for many participants; the <em>Breaking Barriers</em> RRH program for justice-involved individuals found <strong>83%</strong> of participants remained housed one year after move-in. (<a href="https://www.rand.org/pubs/research_reports/RRA4755-1.html">RAND</a>)</p>
<div class="callout callout-mixed">
<h5>The mismatch: RRH assumes people can absorb full market rent once the clock runs out</h5>
LA County projected that roughly <strong>3,040 households</strong> housed via Time-Limited Subsidy as of mid-2025 would lose that support by mid-2026 due to funding cuts — well before most participants' incomes could realistically cover market rent. Research links this "subsidy cliff" to elevated risk of returning to homelessness, especially for people whose real barriers (disability, chronic illness, no income growth) meant they needed PSH-level permanent support, not a time-limited bridge, in the first place. <a href="https://cao.lacity.gov/Homeless/HSC/hsc20250911c.pdf">LA City Homeless Strategy Committee, Sept. 2025</a>
</div>

<p>This isn&#39;t hypothetical at scale — it&#39;s the single largest driver of the system&#39;s 2026 reversal. See <a href="#rp-breaks">Where &amp; Why It Breaks</a>.</p>
<h3>Housing First as a model — the most contested part of the evidence base</h3>
<div class="callout callout-works">
<h5>Strong evidence: retention and cost savings</h5>
A systematic U.S. evidence review found societal savings of about <strong>$1.44 for every $1</strong> invested in Housing First, and consistently higher retention than "treatment-first" models. HUD and the U.S. Interagency Council on Homelessness formally designate it a "proven solution." Locally, RAND's evaluation of <em>Just in Reach</em> found participants had 1.64 fewer ER visits and 4+ fewer inpatient days in the year after placement, offsetting 50–100% of housing costs; a separate RAND/LA County evaluation found <strong>$1.20 saved for every $1 spent</strong>. <a href="https://journalistsresource.org/wp-content/uploads/2025/09/Housing-First_-A-Review-of-the-Evidence-_-HUDU-SER.pdf">HUD USER evidence review</a>
</div>

<div class="callout callout-mixed">
<h5>Disputed: whether housing without mandated treatment adequately serves the most severe cases</h5>
Proponents point to studies showing Housing First participants have equal or better mental-health and substance-use outcomes than treatment-first comparison groups. Critics — notably the <strong>Cicero Institute</strong> and <strong>Manhattan Institute</strong> — argue that housing with no preconditions doesn't reliably connect people to treatment, and is poorly suited to the subset of the unsheltered population with severe untreated mental illness or active addiction. Defenders respond that these critiques rely on narrow studies applied beyond their original scope. <strong>This dispute is not about whether Housing First keeps people housed</strong> (that evidence is strong) <strong>— it's about whether housing alone is sufficient for the highest-acuity cases.</strong> Treat as genuinely disputed, not settled. <a href="https://ciceroinstitute.org/research/housing-first-is-a-failure/">Cicero Institute</a> · <a href="https://truthout.org/articles/a-tech-bro-think-tank-is-trying-to-roll-back-evidence-based-homelessness-policy/">Truthout rebuttal</a>
</div>

<h3>Summary by phase</h3>
<table>
<thead>
<tr>
<th>Phase</th>
<th>Evidence rating</th>
<th>Core finding</th>
</tr>
</thead>
<tbody><tr>
<td>Prevention / diversion</td>
<td>Strong (cost-effectiveness)</td>
<td>14.5% return-to-homelessness rate, but reaches a small share of inflow</td>
</tr>
<tr>
<td>Street outreach</td>
<td>Weak–moderate</td>
<td>~17% of contacts convert to housing within a year</td>
</tr>
<tr>
<td>Interim / shelter housing</td>
<td>Weak</td>
<td>Under 20% exit to permanent housing; more likely to exit to the street</td>
</tr>
<tr>
<td>Permanent Supportive Housing</td>
<td>Strong (with equity gap)</td>
<td>94% one-year retention; racial disparity in returns to homelessness</td>
</tr>
<tr>
<td>Rapid Re-Housing</td>
<td>Mixed</td>
<td>Works for short-term financial shocks; fails when used for people who needed PSH</td>
</tr>
<tr>
<td>Housing First (as a model)</td>
<td>Strong on retention / disputed on acuity fit</td>
<td>Retention &amp; cost evidence strong; treatment-mandate debate unresolved</td>
</tr>
</tbody></table>
<div class="callout callout-question">
<h5>Related</h5>
This evidence connects directly to a live, current failure: see <a href="#rp-breaks">Where &amp; Why It Breaks</a> for how the RRH funding pause specifically reversed two years of declining homelessness counts in 2026.
</div>
</div>

<div class="rp-page" id="rp-breaks">
<h2>Where & Why It Breaks</h2>
<p class="rp-subtitle">Not "who's to blame" — where the pipeline actually leaks, and the structural reasons why.</p>
<div class="rp-meta-row"><span class="rp-status rp-status-researched">Researched</span><span>Last updated 2026-08-01</span></div>
<div class="callout callout-finding">
<h5>The system just visibly broke, in real time</h5>
After two consecutive years of decline, the 2026 Greater LA Homeless Count showed an <strong>increase</strong>: LA County up 1.2% to ~73,040 people, City of LA up 3.4% to ~45,194 — unsheltered homelessness specifically rose 3.3% county-wide and 7.9% in the city. LAHSA's own public statement attributed the reversal to a single, traceable cause below: a pause in Rapid Re-Housing funding. <a href="https://homeless.lacounty.gov/news/a-statement-on-the-2026-homeless-count/">LA County Homeless Services &amp; Housing, official statement</a>
</div>

<h3>The interim-to-permanent housing bottleneck</h3>
<p>This is the central, quantifiable structural failure in the current system:</p>
<ul>
<li>In 2025, movement from interim housing to permanent housing fell <strong>36%</strong> — from 12,120 people to 7,770. Total permanent housing placements county-wide fell from a record <strong>28,625 in 2024 to 23,532 in 2025</strong>.</li>
<li>The proximate cause: the <strong>Time-Limited Subsidy (Rapid Re-Housing) program</strong> paused new enrollments and placements — people newly housed through it dropped 36%, from 10,308 (2024) to 6,590 (2025).</li>
<li>The downstream effect: movement from interim housing <em>back to the street</em> rose <strong>24%</strong> (4,708 → 5,842), while inflow from the street into interim housing barely slowed (down only 8%). Interim housing kept filling from the front while its exit to permanent housing narrowed.</li>
</ul>
<p>This is a textbook bottleneck: the system had the capacity to move people <em>into</em> interim housing (via encampment resolution and shelter expansion) faster than its funded capacity to move them <em>out</em> into permanent housing. When the permanent-housing funding pipeline was interrupted even temporarily, hard-won gains reversed within a year. (<a href="https://laist.com/news/housing-homelessness/la-homelessness-rose-in-2026-official-count-shows/">LAist</a>)</p>
<h3>Exits back into homelessness — the funding cliff</h3>
<div class="callout callout-fails">
<h5>The subsidy cliff is documented, dated, and about to hit</h5>
Roughly <strong>3,040 LA County households</strong> housed via Time-Limited Subsidy as of mid-2025 were projected to lose that support by mid-2026 — well before most participants' incomes could realistically absorb full market rent. <a href="https://cao.lacity.gov/Homeless/HSC/hsc20250911c.pdf">LA City Homeless Strategy Committee, Sept. 2025</a>
</div>

<p>Racial disparity compounds the problem: Black clients return to homelessness after PSH exit at roughly double the rate of white or Latino clients (see <a href="#rp-effectiveness">What Works, What Doesn&#39;t</a>), suggesting the step-down support structure — or the housing/services match itself — isn&#39;t equally effective across populations.</p>
<p>Mayor Bass&#39;s <strong>Inside Safe</strong> program illustrates the exit problem directly: as of a March 2025 report, it had moved roughly 2,571 people into interim housing across 43 encampment operations, but of the 609 people who had since exited, about <strong>60% returned to homelessness</strong> — only around 500 people total had been permanently housed via the program by that point, at a cost that had topped <strong>$322 million</strong>. (<a href="https://knock-la.com/inside-safe-controversy-limited-success-reducing-homelessness/">Knock LA</a>) See <a href="#rp-solutions">Solutions Tried</a> for the full case study.</p>
<h3>Interagency handoff failures — and the collapse of the coordinating agency itself</h3>
<div class="callout callout-finding">
<h5>The clearest "fell through the cracks" story here isn't a single client — it's the agency</h5>
A federal judge overseeing the <em>LA Alliance v. City of Los Angeles</em> litigation ordered an independent audit that found roughly <strong>$2.4 billion</strong> in city homelessness spending over four years effectively impossible to verify, calling it a "slow train wreck." A separate 2025 county-commissioned review found LAHSA couldn't document the existence of nearly <strong>2,300 housing sites</strong> it was nominally responsible for. <a href="https://laist.com/news/housing-homelessness/audit-homeless-carter-lahsa">LAist, on the Carter-ordered audit</a>
</div>

<p>The consequences cascaded fast:</p>
<ul>
<li><strong>April 2025</strong> — LA County&#39;s Board of Supervisors voted to terminate its ~$300 million/year contract with LAHSA and moved those functions to a new county department. LAHSA laid off 284 employees. (<a href="https://calmatters.org/housing/homelessness/2025/05/la-homeless-agency/">CalMatters</a>)</li>
<li><strong>June 2026</strong> — HUD went further and <strong>suspended federal homelessness funding to LAHSA</strong>, citing repeated false statements and a failure to maintain financial controls and conflict-of-interest safeguards. (<a href="https://www.hud.gov/news/hud-no-26-048">HUD.gov</a>)</li>
<li>A longer-running, quieter version of the same failure: between 2015–2020, LAHSA, HACLA, and the LA County Development Authority collectively <strong>returned nearly $150 million in unspent federal homeless grants to HUD</strong> — money stuck at agency boundaries rather than reaching people, blamed on HUD&#39;s rigid rules, a shortage of workable units, and high client attrition. (<a href="https://www.pbssocal.org/news-community/l-a-agencies-returned-nearly-150-million-in-unspent-federal-homeless-grants/">PBS SoCal</a>)</li>
<li>The count itself became a case study in institutional distrust: reporting found LAHSA revised 2025 count data — excluding over 2,300 observations and removing 437 sheltered individuals — shortly before release, in a way that increased the reported year-over-year decline from 2.5% to 3.4%. This is a <strong>disputed claim about data integrity</strong>, not a confirmed finding of manipulation, but it bears directly on how much confidence to place in LAHSA&#39;s self-reported trends generally.</li>
</ul>
<h3>Data siloing between systems</h3>
<ul>
<li>LA/OC HMIS is legally required for most federally/state-funded providers — but not universal. Providers outside HMIS-covered funding aren&#39;t required to participate, and Victim Service Providers are legally <em>barred</em> from entering client data into HMIS at all, so a meaningful share of service contacts are invisible to system-wide tracking. (<a href="https://www.lahsa.org/hmis/about">LAHSA</a>)</li>
<li>Client intake in the City of LA has historically occurred at three separate entry points (call center, street outreach, shelters), with records &quot;continuously updated&quot; as people move between providers rather than unified at first contact — a structural source of duplicate intakes and inconsistent case histories.</li>
<li>The county&#39;s newer Measure A performance-metrics effort was explicitly framed as integrating data &quot;previously siloed between different County agencies&quot; — an implicit admission that, before Measure A (passed Nov. 2024), agencies couldn&#39;t reliably see a shared cross-agency picture of a person&#39;s status in the system.</li>
<li>Coordinated Entry (CES) — meant to be the unified &quot;front door&quot; — has been reported to function less as a single queue than as sequential gateways stacked behind each other, with PSH wait times from weeks to years, and prioritization that under-serves Black unhoused residents relative to need. (<a href="https://knock-la.com/inside-la-endless-queues-for-housing/">Knock LA</a>)</li>
</ul>
<h3>Workforce: turnover, burnout, and continuity of care</h3>
<div class="callout callout-fails">
<h5>One of the least-disputed structural breaks in this research</h5>
Most frontline workers earn <strong>$40,000–$60,000/year</strong>, while it takes roughly <strong>$64,000/year</strong> to afford a one-bedroom in LA County without exceeding 30% of income on housing — the workforce housing other people is itself often rent-burdened. At Chrysalis, case-worker turnover runs around <strong>30%</strong>; reported caseloads run 26–30 clients per manager. Some clients have cycled through <strong>six or seven different case managers</strong> — undermining the relationship-based trust that case management depends on. <a href="https://laist.com/news/housing-homelessness/homelessness-outreach-workers-in-la-are-exhausted-and-stressed-out">LAist</a> · <a href="https://www.kqed.org/news/11902904/underpaid-and-burned-out-many-outreach-workers-for-unhoused-californians-are-leaving-their-jobs">KQED</a>
</div>

<h3>Funding-cycle mismatches: the HHH construction timeline</h3>
<p>Proposition HHH (the 2016 city bond) shows the mismatch between how homelessness capital is funded and how long supportive housing actually takes to deliver: individual projects took <strong>3–6 years</strong> from funding to opening.</p>
<p>Per-unit costs rose sharply over that build-out: the original 2016 estimate was $350,000–$414,000/unit; by 2019 the average exceeded $502,000; for projects still under construction, average cost rose from $531,000 (2020) to $596,846 (2021); some individual units were audited as high as $837,000 (an outlier mixed-use project, not the program median — see <a href="#rp-money">The Money</a> for the fuller cost breakdown). The original target of <strong>10,000 units was cut to 5,873</strong> — a 41% reduction — without the bond&#39;s total authorization changing, because rising per-unit cost consumed the same fixed pool of money faster than expected. (<a href="https://controller.lacity.gov/audits/high-cost-of-homeless-housing-hhh">LA City Controller</a>)</p>
<p>That&#39;s the structural core of the mismatch: a one-time bond against a fixed dollar ceiling, passed in 2016, running into construction costs, permitting timelines, and land costs that kept rising over each project&#39;s 3–6 year build cycle.</p>
<h3>NIMBY and political resistance as a measurable friction point</h3>
<p>Even though voters approved HHH and Measure H/A by roughly 77% margins, individual proposed sites have repeatedly drawn organized local opposition — a 154-bed Venice shelter drew a 2019 lawsuit; a proposed Koreatown shelter drew large rallies after residents said the site was chosen without input. (<a href="https://www.npr.org/2018/06/30/624911798/la-homeless-shelters-face-opposition">NPR</a>)</p>
<p>Shelters on city-owned land can bypass standard zoning review — part of how the city has built interim housing at all despite opposition — but that workaround doesn&#39;t extend to most privately developed PSH, and roughly 80% of the city&#39;s residential land remains zoned single-family, sharply limiting where multi-family PSH can be built as-of-right. NIMBY resistance functions less as a single quantifiable delay and more as a recurring tax on siting — driving up legal costs, forcing site changes, and contributing to the broader pattern of rising per-unit costs.</p>
<h3>Cross-cutting: a state-level accountability gap</h3>
<p>The 2024 California State Auditor found the state <strong>could not account for how $24 billion</strong> spent on homelessness from FY2018–19 through FY2022–23 improved outcomes, partly because the state&#39;s own coordinating body (Cal ICH) hadn&#39;t analyzed spending data past 2021. Only 2 of 5 major programs examined ($13.7B combined) were found &quot;likely cost-effective&quot;; the other 3 lacked sufficient data to judge. (<a href="https://calmatters.org/housing/homelessness/2024/04/california-homelessness-spending/">CalMatters</a>)</p>
<div class="callout callout-question">
<h5>Also contested: how much of the "improvement" was ever real</h5>
Independent RAND field research found LAHSA's official count undercounts unsheltered people in surveyed hot-spot neighborhoods (Skid Row, Hollywood, Venice) by a widening margin — 26% in 2024, 32% in 2025 — and found rough sleeping specifically rose 20% year-over-year even during the two years the official count showed an overall decline. The official count and independent field research have diverged, and both cannot be fully correct at once. <a href="https://laist.com/news/housing-homelessness/lahsa-homeless-count-rand-accuracy-2025-volunteers-report-study">LAist, on the RAND accuracy study</a>
</div>
</div>

<div class="rp-page" id="rp-solutions">
<h2>Solutions Tried</h2>
<p class="rp-subtitle">Named programs, rated on documented outcomes — worked, didn't, or mixed, and why.</p>
<div class="rp-meta-row"><span class="rp-status rp-status-researched">Researched</span><span>Last updated 2026-08-01</span></div>
<div class="callout callout-question">
<h5>How to read this page</h5>
Each program gets a verdict based on documented outcomes, not popularity or intent. Where independent research (RAND, UCLA, state/city audits) contradicts a program's own reported numbers, that's flagged explicitly. See <a href="#rp-sources">Sources &amp; Methodology</a>.
</div>

<h3>Project Roomkey (2020, COVID-era hotel/motel leasing)</h3>
<p>Statewide, roughly 62,000 people were served through 300+ hotels (~16,000 rooms) across 55 counties; LAHSA reported it ended homelessness for 4,824 people in LA specifically. Cost ran about $35,308 per room over ~10 months. FEMA capped reimbursable stays at 20 days starting mid-2021, leaving state/local governments exposed to over $300 million for people who stayed longer.</p>
<p>After leaving Roomkey, roughly a third of participants moved to permanent or other temporary housing, a quarter entered other emergency shelter, 15% returned to unsheltered homelessness, and 18% had unknown destinations.</p>
<div class="callout callout-mixed">
<h5>Verdict: Mixed</h5>
Effective, low-friction emergency sheltering at scale during a pandemic — but never designed as a housing-exit pathway, so roughly two-thirds of exits weren't to permanent housing, and it became financially unsustainable once federal reimbursement was capped.
</div>

<h3>Project Homekey (state hotel/motel-to-housing conversion)</h3>
<p>By early 2024 the state had funded 15,000+ units statewide, committing the full initial $3.5 billion (later grown to $3.8B+, plus a $2.2B &quot;Homekey+&quot; round). The State Auditor&#39;s 2024 review of 8 sampled projects found an average cost of <strong>~$144,000/unit</strong> for Round 1 — versus $380,000–$570,000 for newly built affordable housing — making it &quot;likely&quot; cost-effective.</p>
<div class="callout callout-mixed">
<h5>Verdict: Mixed — the unit economics work, but nobody's tracking whether the projects actually succeed</h5>
A CalMatters investigation built on 100+ public-records requests (May 2026) found the state never systematically tracked which Homekey projects succeeded, stalled, or failed outright; a 2026 bill to mandate a comprehensive audit died in the legislature. Results are described as "boom-or-bust" — some conversions succeeded quickly, others remain stuck in limbo years later, with no public accounting of the failure rate.
</div>

<h3>Measure HHH-funded permanent supportive housing</h3>
<p>A $1.2 billion bond (2016) promising ~10,000 PSH units. Per-unit development costs rose from ~$507,000 (2019) to $531,000–$559,000 (2020), with some projects reaching $746,000–$837,000. As of the most recent tally, roughly 8,091 units were in the pipeline across 125 projects — only ~14% ready for occupancy, 54% still in construction, 32% in pre-development, nearly a decade after passage. See <a href="#rp-money">The Money</a> for the full cost breakdown.</p>
<div class="callout callout-fails">
<h5>Verdict: Mostly didn't work as promised</h5>
The core design flaw, per City Controller audits: a housing bond alone doesn't fund a project — it has to wait in line for other financing (tax credits, other loans), which is what stretched timelines to 3–6+ years and let per-unit costs balloon with construction-cost inflation. It also funded 100% ground-up construction — the most expensive, slowest delivery method — rather than the acquisition/conversion approach Homekey used.
</div>

<h3>Inside Safe (Mayor Bass, launched December 2022)</h3>
<p>Mayor Bass&#39;s signature encampment-resolution strategy: outreach teams and LAHSA negotiate with an entire encampment at once, offering everyone motel/hotel rooms on the spot. By October 2025, it had served 5,179 people across 114 operations — 1,243 in permanent housing, 1,636 still in interim placements, and 2,300 who&#39;d exited the program with <strong>no public breakdown of what happened to them</strong>. By mid-2026, of roughly 6,000 served cumulatively, about <strong>40% had exited and returned to unsheltered homelessness</strong>. Cost has topped <strong>$322 million</strong> — roughly $259,000 per person actually reaching permanent housing, or $62,000 per person served regardless of outcome.</p>
<div class="callout callout-fails">
<h5>Independent RAND research contradicts the "whack-a-mole" denials</h5>
RAND's longitudinal LA LEADS study (tracking Hollywood, Venice, Skid Row since 2021) found tent dwelling fell roughly 50% since 2021, but rough sleeping and vehicle dwelling rose to offset it — rough sleeping specifically hit a <strong>four-year high</strong>. Nearly half of surveyed rough sleepers reported losing a dwelling in the past year; 46% of those said it was confiscated or towed by officials. RAND's own summary: sweeps and camping-ban enforcement reduce visible tent homelessness short-term but push people into harder-to-track, often more dangerous forms of unsheltered homelessness rather than into housing. <a href="https://www.rand.org/news/press/2026/05/homelessness-holds-steady-across-three-la-neighborhoods.html">RAND, May 2026</a>
</div>

<p>Bass lifted her homelessness state of emergency in November 2025, citing a second straight year of declines — a decline the 2026 count then reversed (see <a href="#rp-breaks">Where &amp; Why It Breaks</a>).</p>
<div class="callout callout-mixed">
<h5>Verdict: Mixed</h5>
Real, verifiable reductions in visible tent encampments and several thousand people moved indoors at least temporarily — but a high and rising return-to-homelessness rate (~40%), incomplete outcome transparency, and independent research showing displacement into harder-to-see homelessness rather than net reduction.
</div>

<h3>Tiny home villages (Hope of the Valley and others)</h3>
<p>LA&#39;s first site (Chandler Street) opened with 40 homes/75 beds; North Hollywood-area sites now total 326 beds. A 39-home village cost $5.2 million to set up — individual units run ~$7,500 each, but the bulk of cost goes to re-routing water, power, and sewer to the site (a 30-unit Riverside village, by contrast, cost about $514,000 total — illustrating how much LA-specific infrastructure costs drive up the model). North Hollywood-area villages moved an average of 11–14 people/month into permanent housing.</p>
<div class="callout callout-mixed">
<h5>Verdict: Mixed</h5>
Cheap and fast to deploy relative to construction, and does get people into a supervised setting — but citywide interim-housing audit data (fewer than 1 in 5 reaching permanent housing, over half returning to homelessness or unknown destinations) applies to tiny homes too, and LA's site-prep costs erase much of the model's cost advantage over other cities.
</div>

<h3>Safe parking programs</h3>
<p>Safe Parking LA operates roughly six lots — the largest network in the region, and the only organization fully dedicated to vehicular homelessness, which makes up <strong>more than 44%</strong> of LA County&#39;s unsheltered population. It reports stabilizing 2,500+ vehicle-dwellers, with <strong>45%</strong> self-resolving or moving into interim/permanent housing.</p>
<div class="callout callout-works">
<h5>Verdict: Worked, at small scale</h5>
Because it targets a distinct sub-population (people who already have a vehicle and often some income, just not fixed housing) rather than the chronically unsheltered street population, safe parking shows a comparatively high self-resolution rate — but capacity covers only a small fraction of vehicle-dwelling need, and the program faces yearly budget-cut threats (11 sites were initially proposed for defunding in the FY2026-27 budget before public pressure restored partial funding).
</div>

<h3>A Bridge Home (Mayor Garcetti, 2018)</h3>
<p>The pre-Inside Safe strategy: at least one bridge shelter per council district, ~1,781 beds at peak. The City Controller&#39;s audit found fewer than 1 in 5 people in this category of interim housing moved to permanent housing — calling the rate &quot;woefully inadequate&quot; — while more than half returned to homelessness or an unknown destination.</p>
<div class="callout callout-fails">
<h5>Verdict: Mostly didn't work relative to its implicit goal</h5>
Succeeded at the narrow goal of adding shelter capacity relatively quickly, but never solved the harder problem — moving people from interim beds into permanent housing at meaningful volume — the same bottleneck that limits Inside Safe today.
</div>

<h3>LA Alliance for Human Rights v. City of Los Angeles</h3>
<p>A 2020 federal lawsuit that became the primary legal lever forcing shelter-bed commitments: the City committed to 6,700 new beds by June 2025 and 12,915 cumulative by June 2027; the County separately committed $293M+ for 6,700 beds/units plus 3,000 mental-health/substance-use treatment beds. In June 2025, Judge Carter found the City in breach of key settlement terms but declined full receivership, instead ordering an independent monitor with &quot;unfettered access&quot; to City and LAHSA data.</p>
<div class="callout callout-mixed">
<h5>Verdict: Mixed</h5>
Has kept sustained legal and political pressure on the City/County and forced real accountability gains (an independent monitor, mandated data reporting) — but its "beds offered" framing doesn't require conversion to permanent housing, plausibly reinforcing the same interim-heavy bias documented elsewhere on this page, and the City has repeatedly missed its own committed milestones.
</div>

<h3>CARE / CARE+ encampment cleanups</h3>
<p>The City&#39;s standing encampment-cleaning apparatus, separate from Inside Safe — $56M budgeted for FY2024-25, dropping to $35M for FY2025-26.</p>
<div class="callout callout-fails">
<h5>Verdict: Didn't work as a homelessness-reduction tool</h5>
A January 2026 UCLA study found that for every one person connected to social services through the program's outreach component, <strong>five people were displaced</strong> — concluding it functions primarily as clearance "with little to no outreach for shelter or housing." 37% of surveyed unhoused residents reported being forced to relocate more than five times in the prior 30 days. The 2021 Echo Park Lake clearance is the highest-profile illustration: officials pledged all ~200 residents would get "stable, permanent housing" within a year; a year later, only 17 of 183 people removed were in long-term housing.
</div>

<h3>Just In Reach (LA County, 2017) — jail-to-housing diversion</h3>
<p>A &quot;Pay for Success&quot; program placing people cycling through county jail with chronic homelessness and behavioral-health needs directly into Permanent Supportive Housing with intensive case management, rather than releasing them to the street. Targeted 300 people in its initial phase.</p>
<div class="callout callout-works">
<h5>Verdict: Worked</h5>
RAND's independent evaluation found an <strong>82% one-year housing stability rate</strong>, and that reduced jail/hospital/shelter use offset 50–100% of program costs — effectively close to self-funding. Unlike interim-housing-first programs, it places people directly into PSH, skipping the interim-to-permanent bottleneck that undermines HHH, A Bridge Home, and Inside Safe — and its narrow, high-need target population made rigorous RAND evaluation feasible in a way citywide programs haven't managed. Scale (a few hundred people) remains small relative to countywide need.
</div>

<h3>West LA VA campus veteran housing</h3>
<p>Following a 2015 legal settlement finding the VA had misused campus land for non-veteran purposes, the VA committed to a minimum of 900 units on-campus (PACT Act funding targets 1,200+ by 2030); 307 units were open as of September 2024. The VA reported housing 1,647 homeless veterans in LA in FY2024 — the most of any U.S. city for the third consecutive year — alongside a <strong>22.9% reduction</strong> in veteran homelessness county-wide.</p>
<div class="callout callout-works">
<h5>Verdict: Worked — the clearest population-specific success story in this research</h5>
Veterans have a dedicated, better-funded, single-payer benefit system (VA vouchers, healthcare, and a huge parcel of court-ordered campus land) — a funding and land-access advantage no other subpopulation in this research has, plausibly explaining why veteran homelessness fell faster and further than the general population even as citywide numbers rose in 2026. The mechanism worth noting: a single coordinating agency, not the fragmented city/county/nonprofit structure that hampers most other programs here.
</div>

<h3>Cross-cutting: the governing caveat over every program above</h3>
<div class="callout callout-question">
<h5>An audit undermines confidence in every self-reported number on this page</h5>
A 2025 independent review commissioned by federal Judge Carter found LAHSA's contracting oversight compromised — the same team approving invoices also monitored vendor performance — and that LAHSA routinely paid contractors without verifying services were delivered, amid roughly <strong>$2.3 billion</strong> in funding whose actual expenditure and service delivery the City, County, and LAHSA couldn't adequately account for. Because Inside Safe, Pathway Home, CARE+, HHH, and the LA Alliance settlement's own compliance reporting all depend substantially on LAHSA-supplied data, this finding is a caveat that belongs attached to every "outcomes" claim above, not just LAHSA's own programs. See <a href="#rp-agencies">Agencies &amp; NGOs</a> for the full institutional story.
</div>

<h3>Summary</h3>
<table>
<thead>
<tr>
<th>Program</th>
<th>Verdict</th>
<th>Core reason</th>
</tr>
</thead>
<tbody><tr>
<td>Project Roomkey</td>
<td>Mixed</td>
<td>Fast emergency shelter, poor housing pipeline, fiscally unsustainable</td>
</tr>
<tr>
<td>Project Homekey</td>
<td>Mixed</td>
<td>Genuinely cheaper per unit, but outcomes untracked</td>
</tr>
<tr>
<td>Measure HHH</td>
<td>Mostly didn&#39;t work</td>
<td>Financing-stack complexity, cost inflation, 41% unit-count cut</td>
</tr>
<tr>
<td>Inside Safe</td>
<td>Mixed</td>
<td>Real short-term reductions; ~40% return to homelessness; RAND shows displacement not reduction</td>
</tr>
<tr>
<td>Tiny home villages</td>
<td>Mixed</td>
<td>Cheap units, expensive LA site prep, same low move-on rate as other interim housing</td>
</tr>
<tr>
<td>Safe parking</td>
<td>Worked (small scale)</td>
<td>High self-resolution for a well-matched population, but tiny relative to need</td>
</tr>
<tr>
<td>A Bridge Home</td>
<td>Mostly didn&#39;t work</td>
<td>Added capacity, never solved interim-to-permanent bottleneck</td>
</tr>
<tr>
<td>LA Alliance settlement</td>
<td>Mixed</td>
<td>Forced real accountability gains; &quot;beds offered&quot; metric doesn&#39;t require permanent outcomes</td>
</tr>
<tr>
<td>CARE / CARE+</td>
<td>Didn&#39;t work (as a housing tool)</td>
<td>5:1 displacement-to-service ratio per UCLA</td>
</tr>
<tr>
<td>Just In Reach</td>
<td>Worked</td>
<td>Direct-to-PSH model skips the interim bottleneck; independently verified by RAND</td>
</tr>
<tr>
<td>West LA VA housing</td>
<td>Worked</td>
<td>Dedicated funding, court-ordered land, single coordinating agency</td>
</tr>
</tbody></table>
</div>

<p class="rp-eyebrow rp-section-eyebrow">Research Process</p>
<div class="rp-page" id="rp-findings">
<h2>Findings Log</h2>
<p class="rp-subtitle">Research-led means this list drives the rest of the site — not the other way around.</p>
<div class="rp-meta-row"><span class="rp-status rp-status-in-progress">In Progress</span><span>Last updated 2026-08-01</span></div>
<p>This is the working log for the project. New entries go at the top. Each entry is one of three kinds:</p>
<ul>
<li><strong>Finding</strong> — something established from sources, with citations</li>
<li><strong>Open question</strong> — something worth chasing that isn&#39;t answered yet</li>
<li><strong>Hypothesis</strong> — a tentative explanation to be tested against more sources, not yet a finding</li>
</ul>
<hr>

<h4>2026-08-01 — First full research pass: eight pages populated</h4>
<p>The site&#39;s core sections — Scope &amp; Scale, Phases of the Process, Agencies &amp; NGOs, Tools &amp; Systems, The Money, What Works/Doesn&#39;t, Where It Breaks, and Solutions Tried — are now researched and sourced. The single biggest surprise: this research landed in the middle of a live, unresolved institutional crisis, and that crisis shows up independently across every section.</p>
<div class="callout callout-finding">
<h5>Finding: LA's homelessness governance is mid-collapse-and-rebuild, right now</h5>
LA County voted (April 2025) to pull its funding and staff out of LAHSA and stand up its own department — the LA County Department of Homeless Services and Housing, launched January 1, 2026 with an $843M budget. LAHSA's own budget correspondingly dropped ~40% (from ~$829M to ~$496M) and it's now ~73% City-funded. In June 2026, HUD suspended LAHSA's federal funding entirely, citing a fraud investigation; LAHSA sued, and a judge granted a stay pending an August 6, 2026 hearing — a date past this research pass and worth checking directly before treating LAHSA's institutional status as settled. See <a href="#rp-agencies">Agencies &amp; NGOs</a>.
</div>

<div class="callout callout-finding">
<h5>Finding: the system just visibly broke, and the mechanism is traceable to a specific funding decision</h5>
After two years of decline, the 2026 count went back up (LA County +1.2%, City of LA +3.4%). LAHSA itself attributed this to a pause in Rapid Re-Housing ("Time-Limited Subsidy") funding: interim-to-permanent housing transitions fell 36% in one year, while returns from interim housing back to the street rose 24%. This is a rare case in this research where a system-wide outcome traces cleanly to one identifiable policy lever. See <a href="#rp-breaks">Where &amp; Why It Breaks</a>.
</div>

<div class="callout callout-finding">
<h5>Finding: interim/shelter housing is the weakest link, not outreach or funding volume</h5>
Under 20% of people in LA City-funded interim housing over five years reached permanent housing; more than half exited to homelessness or an unknown destination. At the same time, roughly 1 in 4 shelter beds sat unused ($218M wasted) while nearly 1 in 3 people who wanted a bed couldn't get one — pointing to a matching/operations failure, not a capacity or demand problem. This same pattern (low permanent-housing conversion) recurs across Measure HHH housing, A Bridge Home, tiny home villages, and Inside Safe — it looks structural to how interim housing is currently run, not specific to any one program. See <a href="#rp-effectiveness">What Works, What Doesn't</a> and <a href="#rp-solutions">Solutions Tried</a>.
</div>

<div class="callout callout-finding">
<h5>Finding: independent research contradicts program-reported "success" more often than it confirms it</h5>
RAND's independent LA LEADS field study found the official homeless count may miss up to ~39% of unsheltered people in some neighborhoods (Skid Row), and found rough sleeping at a four-year high even during years the official count showed decline. A UCLA study independently found LA's CARE+ encampment cleanups displace 5 people for every 1 connected to services. In both cases, city/county self-reported metrics told a more optimistic story than independent field research. Given the LAHSA audit findings above (agencies couldn't account for how $2.3B was spent), this site treats program-reported outcome numbers as provisional pending independent confirmation wherever possible.
</div>

<div class="callout callout-finding">
<h5>Finding: the interventions that worked share a specific structural trait</h5>
The two clearest success stories in this research — Just In Reach (jail-to-housing diversion, 82% one-year retention) and West LA VA veteran housing (22.9% reduction in veteran homelessness) — both skip the interim-housing bottleneck entirely (direct-to-permanent placement) and both operate through a single coordinating agency with dedicated funding, rather than the fragmented city/county/nonprofit/JPA structure that governs most other programs. This is a hypothesis worth testing further, not yet a settled finding: does bypassing interim housing, or does having a single accountable funder, do more of the work? The two are confounded in both examples found so far.
</div>

<div class="callout callout-question">
<h5>Open question</h5>
Both the financials and effectiveness research repeatedly ran into <strong>WebFetch access failures</strong> to primary-source PDFs (LA City Controller, California State Auditor, LAist, HUD) during this research pass — findings above are sourced from search-result summaries of those documents rather than the documents themselves in many cases. A priority follow-up: re-verify headline figures (the $24B state figure, the HHH per-unit cost trend, Measure ULA's exact revenue table, LAHSA's exact FY-by-FY budget) directly against primary PDFs.
</div>

<div class="callout callout-question">
<h5>Open question</h5>
No page on this site yet has a reliable, current, LAHSA-dashboard-sourced geographic breakdown (by City Council District, County Supervisorial District, or Service Planning Area) — this is a priority gap for the Scope &amp; Scale page.
</div>

<div class="callout callout-question">
<h5>Open question</h5>
A clean, citable "cost per successful exit to permanent housing," broken out by program type (outreach, RRH, PSH, interim), does not appear to exist anywhere in the public record found so far — despite being one of the most natural accountability metrics for this whole system. Worth a dedicated follow-up pass against LAHSA's data dashboards directly.
</div>

<hr>
<h4>2026-08-01 — Project kickoff</h4>
<p>Site scaffold went up; research began across eight areas in parallel.</p>
</div>

<div class="rp-page" id="rp-sources">
<h2>Sources & Methodology</h2>
<p class="rp-subtitle">How to read this site's claims, and how to challenge one.</p>
<div class="rp-meta-row"><span class="rp-status rp-status-in-progress">In Progress</span><span>Last updated 2026-08-01</span></div>
<h3>Sourcing standard</h3>
<p>Every factual claim on this site should trace to a citable, linkable source: government/agency reports and dashboards (LAHSA, HUD, HHAP, LA City Controller, LA County), primary budget/appropriations documents, academic or think-tank research, investigative journalism, and, where used, direct agency data releases. Where sources disagree, this site says so rather than picking one silently.</p>
<h3>Status badges</h3>
<p>Each page carries one of three badges:</p>
<ul>
<li><strong>Stub</strong> — outline only, not yet researched</li>
<li><strong>In Progress</strong> — partially sourced, still being built out</li>
<li><strong>Researched</strong> — claims are sourced and cross-checked; still subject to revision as new sources surface</li>
</ul>
<h3>What this project is not</h3>
<p>This is independent research, not an audit, not journalism with editorial fact-checking, and not affiliated with any agency or organization named on this site. Treat it as a working notebook that aims to be accurate, not as a definitive public record.</p>
<h3>Corrections</h3>
<p>This is a living document. If a claim is wrong or a source is misread, it should be corrected and the correction should be visible — not silently edited away. (Process for public corrections/contact TBD as this moves toward publication.)</p>
<h3>Full source list</h3>
<p>To be built out as research lands on each page — sources will be linked inline within each page&#39;s content, with a consolidated list maintained here as the project matures.</p>
</div>
`
