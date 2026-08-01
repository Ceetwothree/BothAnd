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
<h3>The lens this project uses</h3>
<p>Before the findings: this project isn&#39;t trying to catch anyone doing something wrong, and it isn&#39;t a spending-scandal writeup. It uses W. Edwards Deming&#39;s <strong>System of Profound Knowledge</strong> — a discipline for seeing a system (not just the people in it) clearly enough to know where it would actually give, if pushed. See <a href="#rp-sopk">The Analytical Frame</a> before the rest, since every other page is written to be read through it.</p>
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

<div class="rp-page" id="rp-sopk">
<h2>A System of Profound Knowledge</h2>
<p class="rp-subtitle">This project isn't trying to catch anyone doing something wrong. It's trying to see the system clearly enough to know where it would actually give, if pushed.</p>
<div class="rp-meta-row"><span class="rp-status rp-status-in-progress">In Progress</span><span>Last updated 2026-08-01</span></div>
<h3>Why this page exists</h3>
<p>Every other page on this site documents a failure somewhere — an audit that couldn&#39;t verify spending, a tool with a documented bias record, a bottleneck that reversed two years of progress in one. Read in isolation, that list reads as an indictment: LA&#39;s homelessness system is corrupt, or incompetent, or both.</p>
<p>That&#39;s not the read this project is going for, and it&#39;s worth saying explicitly why, because it changes what the rest of this site is <em>for</em>.</p>
<p>W. Edwards Deming — the statistician whose work underpins modern process improvement — argued that most failures inside an organization aren&#39;t caused by the people working in it. They&#39;re caused by the <em>system</em> those people work inside: its structure, its incentives, its information flows, its variation. His shorthand for this was blunt: <strong>&quot;a bad system will beat a good person every time.&quot;</strong> He proposed a discipline for actually seeing a system clearly enough to improve it, which he called the <strong>System of Profound Knowledge</strong> — four interdependent lenses:</p>
<ol>
<li><strong>Appreciation for a system</strong> — seeing the whole set of interdependent parts working (or failing to work) toward a shared aim, instead of judging each part in isolation.</li>
<li><strong>Knowledge of variation</strong> — telling the difference between normal noise in a process and a genuine, causal signal, so you don&#39;t chase phantom explanations for random fluctuation or ignore real ones.</li>
<li><strong>Theory of knowledge</strong> — understanding what a measurement actually measures, what it predicts, and where it breaks down — because a number that looks precise can still be measuring the wrong thing.</li>
<li><strong>Psychology</strong> — understanding what actually motivates the people inside the system, both the workforce and the people the system is meant to serve, and what happens to that motivation under fear, blame, or perverse incentive.</li>
</ol>
<div class="callout callout-question">
<h5>What this page is not</h5>
This is not a claim that LAHSA, the City, the County, or any provider on this site is well-run, or that the fraud/waste findings documented elsewhere are somehow excused by "it's the system's fault." Some of what's documented here — the LAHSA conflict-of-interest contract, for instance — is straightforwardly individual misconduct, and this page doesn't launder that into a systems problem. The point is narrower: <strong>most of the poor outcomes on this site would still happen even if every individual currently working in this system were replaced with an equally well-intentioned, competent person</strong> — because the structure itself produces them. That's the part worth understanding, because it's the part a new hire, a new mayor, or a new audit can't fix by simply trying harder.
</div>

<h3>1. Appreciation for a system</h3>
<p>A system is a set of interdependent components working toward a common aim. The first failure mode Deming describes is optimizing one component in a way that damages the system as a whole — because the components aren&#39;t actually independent, even when they&#39;re managed as if they were.</p>
<p>LA&#39;s homelessness response is a textbook case of this, and it&#39;s visible at every scale documented on this site:</p>
<ul>
<li><strong>The interim-housing bottleneck</strong> (see <a href="#rp-breaks">Where &amp; Why It Breaks</a>) exists because the sub-systems that add capacity to <em>shelters</em> (Inside Safe, A Bridge Home, tiny-home villages) were funded and scaled independently of the sub-system that moves people <em>out</em> of shelters into permanent housing (Rapid Re-Housing, PSH). Each sub-system, measured on its own terms, looks like it&#39;s working — beds opened, encampments cleared. The system as a whole still gets worse, because the two halves were never designed as one pipeline with one shared capacity constraint.</li>
<li><strong>LAHSA as a joint powers authority</strong> (see <a href="#rp-agencies">Agencies &amp; NGOs</a>) is a structural admission that City and County are two components that don&#39;t share one aim — the JPA was built specifically because neither government would subordinate its own control to the other&#39;s. That same non-alignment is what made the 2025 split messy instead of clean: there was no single accountable owner of the whole system to begin with.</li>
<li><strong>Fifteen City Council districts each running an independent &quot;Homelessness Deputy&quot; operation</strong> means encampment response, sanitation, and service-linkage vary block to block by design — fifteen locally-optimized sub-systems, no shared aim enforced across them.</li>
<li><strong>Prevention is the single most cost-effective intervention documented on this site</strong> (a 14.5% return-to-homelessness rate, versus far worse downstream — see <a href="#rp-effectiveness">What Works, What Doesn&#39;t</a>) and it is also the smallest, most poorly scaled program in the entire system. A system genuinely optimizing for its stated aim (reducing homelessness) would over-invest in its highest-leverage, lowest-cost intervention. This one doesn&#39;t, because prevention funding, interim-shelter funding, and PSH funding are appropriated through entirely separate political and bureaucratic channels that don&#39;t compete against each other for the same dollar — so there&#39;s no mechanism that would ever reallocate toward the highest-leverage point.</li>
</ul>
<p>The pattern across all four: nobody has to be incompetent or dishonest for these outcomes to occur. They occur because the components are managed as separate systems when they are, in fact, one system with a single population moving through it.</p>
<h3>2. Knowledge of variation</h3>
<p>Deming distinguished <strong>common cause variation</strong> (the normal, expected noise in any process, which no single event explains) from <strong>special cause variation</strong> (a real, identifiable event that shifted the process). Treating common-cause noise as if it were a special cause — reacting to every wiggle in a chart as news — is one of the most reliable ways to make a stable system perform worse, because you end up &quot;correcting&quot; for noise that will regress on its own, and mistaking a random dip for a policy win.</p>
<p>This site&#39;s own Scope &amp; Scale data is a live example of exactly this problem:</p>
<ul>
<li>The PIT count moved from 75,312 (2024) to a finalized 72,195 (2025) to 73,040 (2026) — see <a href="#rp-overview">Scope &amp; Scale</a>. LAHSA itself characterized the 2026 increase as &quot;not statistically significant.&quot; That&#39;s a variation claim, not a trend claim — and it cuts both ways: the celebrated &quot;two years of decline&quot; that preceded it should be read with the same skepticism about whether it was signal or noise, especially given the methodology concerns below.</li>
<li>Independent RAND field research found the official count may miss a large and <em>growing</em> share of the unsheltered population in hot-spot neighborhoods (undercounting an estimated 32-39% in some areas by 2025) as encampment-clearing pushed the remaining unsheltered population into harder-to-find locations. If the undercount itself has a trend embedded in it, then part of what looks like &quot;the homeless population is shrinking&quot; may actually be &quot;the count is getting worse at seeing it&quot; — two different processes producing the same headline number, and no way to tell them apart from the topline figure alone.</li>
<li>The 2025 count&#39;s reported 27-34% drop in street-family counts was attributed by LAHSA&#39;s own chief of staff not to genuine improvement but to fewer family shelter beds pushing families into doubled-up situations the count doesn&#39;t see at all — a case where a number moved for a reason that has nothing to do with the outcome the number is supposed to represent.</li>
</ul>
<div class="callout callout-mixed">
<h5>The practical implication</h5>
Every year-over-year percentage change on this site should be read with the same discipline Deming applied to a control chart: is there a specific, identifiable, sourced cause for this move (a subsidy pause, a methodology change), or is it inside the range of normal noise for a count of this kind, taken this way? Where this project could find a specific documented cause, it says so explicitly (the 2026 reversal has one: the RRH funding pause). Where it couldn't, that's stated as an open question rather than resolved with a story.
</div>

<h3>3. Theory of knowledge</h3>
<p>A measurement is only useful to the extent you understand what it actually measures, what it was validated against, and where that validation breaks down. Deming&#39;s theory of knowledge is about taking that seriously instead of treating a number as self-evidently meaningful just because it&#39;s precise.</p>
<p>This site has already documented at least three concrete cases where LA&#39;s system is running on a measurement whose theoretical foundation doesn&#39;t hold up under its actual use:</p>
<ul>
<li><strong>The VI-SPDAT</strong> (see <a href="#rp-tools">Tools &amp; Systems</a>) was built on data from a single northeastern U.S. city, from a largely male sample, and validated against likelihood of <em>death</em> — then deployed for years as a <em>housing-priority</em> instrument, a different construct than the one it was actually validated on. Its own creator publicly disavowed it as an intake tool. That&#39;s not a data-entry bug; it&#39;s a category error in what the number was ever entitled to predict — and it directly produced a documented racial disparity in who got prioritized, because the thing it was actually measuring (willingness to disclose trauma/substance use to an intake worker) correlates with institutional trust, which correlates with race.</li>
<li><strong>The PIT count</strong> is a single-night methodology being asked to answer a fundamentally different question — &quot;how big is homelessness in LA, and is it going up or down&quot; — than the one it&#39;s actually built to answer, which is closer to &quot;how many people were visible to a volunteer team on one specific night.&quot; National literature suggests true scale could be 2.5-10x what a PIT count captures. Every policy conversation that treats the PIT number as <em>the</em> homelessness figure for LA is smuggling in a theory-of-knowledge error.</li>
<li><strong>&quot;Cost per successful exit to permanent housing&quot;</strong> — arguably the single most useful accountability metric this system could produce — does not exist anywhere in the public record found in this research pass (see <a href="#rp-findings">Findings Log</a>). Its absence is itself a theory-of-knowledge finding: an enormous amount of measurement effort goes into tracking inputs (dollars appropriated, beds opened, contacts made) and comparatively little into the one output measure that would let anyone compare interventions on equal footing.</li>
</ul>
<div class="callout callout-fails">
<h5>Where this compounds with the workforce, not just the tooling</h5>
Because scores and metrics directly determine resource allocation, there is documented concern (echoed in comparable-tool literature) about both provider-side "coaching" of answers and client-side underreporting due to stigma — both distort the measurement further, on top of the tool's own validity problems. A theory-of-knowledge failure at the instrument level and a psychology failure at the human level compound each other; they aren't separate problems.
</div>

<h3>4. Psychology</h3>
<p>Deming&#39;s fourth lens is about what actually motivates people — and what a system does to that motivation through fear, blame, extrinsic incentives, and ranking. A system that responds to failure by assigning individual blame tends to get <em>less</em> honest information over time, not more, because the rational response to being blamed for a systemic problem is to stop surfacing it.</p>
<p>Two workforces sit inside this system, and both show documented psychology effects:</p>
<ul>
<li><strong>The frontline services workforce.</strong> Case managers earning $40,000-$60,000/year in a county where it takes roughly $64,000/year to afford a one-bedroom without being rent-burdened; ~30% turnover at Chrysalis; some clients cycling through six or seven different case managers (see <a href="#rp-breaks">Where &amp; Why It Breaks</a>). Case management is fundamentally a relationship-based intervention — its effectiveness depends on continuity and trust, which is precisely the thing high turnover destroys. This isn&#39;t a training problem or a hiring-bar problem; it&#39;s a direct, mechanical result of paying the people who provide the intervention less than it costs to live in the place they&#39;re providing it.</li>
<li><strong>The audit/accountability apparatus itself.</strong> LAHSA facing simultaneous county defunding, a HUD suspension, and a federal fraud task force is exactly the environment Deming would predict produces defensive, blame-avoidant behavior rather than open reporting — and there&#39;s a specific documented instance of this: LAHSA revising 2025 count data shortly before release in a way that increased the reported decline, a disputed-but-troubling data-integrity claim (see <a href="#rp-breaks">Where &amp; Why It Breaks</a>). Whether or not that specific instance was deliberate, a system under this much simultaneous scrutiny has a strong psychological incentive to make its numbers look better, which is corrosive to exactly the kind of honest measurement Deming&#39;s third lens depends on.</li>
<li><strong>The people the system is meant to serve.</strong> The VI-SPDAT bias finding above is also a psychology finding: documented reluctance among Black respondents, rooted in historic institutional mistrust, to disclose formal healthcare use, mental-health history, or illicit behavior to an intake worker. That&#39;s a rational psychological response to a real history of institutional harm — and a system that scores people on their willingness to disclose, without accounting for why disclosure itself carries risk for some populations differently than others, will systematically misjudge exactly the people who have the most reason to be guarded.</li>
</ul>
<div class="callout callout-question">
<h5>The throughline</h5>
In all three cases, the "fix" that occurs to a spending-scandal reading of this system — audit harder, punish more, add more compliance reporting — is close to the opposite of what Deming's psychology lens would suggest. More fear-based accountability on top of an already-strained, already-scrutinized system is more likely to produce more defensive reporting and faster burnout, not more honest information or better retention. That doesn't mean accountability is wrong. It means accountability mechanisms that ignore psychology tend to get the reporting behavior they incentivize, not the reporting behavior they intend.
</div>

<h3>Reading the rest of this site through this frame</h3>
<p>Every page from here on documents specific, sourced findings — the same standard as before (see <a href="#rp-sources">Sources &amp; Methodology</a>). What changes is the question being asked of each finding: not just <em>what went wrong</em>, but <em>which of these four lenses explains why the system produced this outcome, and would a different person in the same seat have produced a materially different result?</em> Where the answer is &quot;yes, this really is about a specific individual or specific decision,&quot; this site says so — the LAHSA conflict-of-interest contract is that kind of finding, and it&#39;s presented as one. Where the answer is &quot;no, this is what the structure produces regardless of who&#39;s in the seat,&quot; that&#39;s the more useful and more actionable finding, because it points at what would actually have to change.</p>
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
<div class="pm">
<p class="pm-title">How one headline number gets produced — and where measurement theory breaks down</p>
<div class="pm-flow">
<div class="pm-step">
<div class="pm-marker"><span class="pm-dot pm-dot-person"></span><span class="pm-line"></span></div>
<div class="pm-body"><span class="pm-tag pm-tag-person">Person</span><p class="pm-label">Volunteer teams of ~4 physically tally people, tents, and vehicles across ~4,000 square miles over 1-3 nights in late January<small>No interviews during the tally itself — a visual count only.</small></p></div>
</div>
<div class="pm-step pm-step-break">
<div class="pm-marker"><span class="pm-dot pm-dot-process"></span><span class="pm-line"></span></div>
<div class="pm-body"><span class="pm-tag pm-tag-process">Process</span><p class="pm-label">The raw tally is extrapolated using a separate demographic/youth survey and combined with HMIS records for the sheltered population</p><p class="pm-break-note"><strong>Breaks here — this is a theory-of-knowledge problem, not a data-entry one:</strong> a single-night visual tally structurally cannot see people who are doubled-up, and RAND field research found the official tally captured only about 68% of the unsheltered population in three hot-spot neighborhoods when cross-checked against a more intensive count — as low as 61% in Skid Row. The instrument is being asked to answer "how big is homelessness in LA" when it can only actually answer "how many people were visible to a volunteer team on one specific night." See <a href="#rp-sopk">The Analytical Frame</a>.</p></div>
</div>
<div class="pm-step">
<div class="pm-marker"><span class="pm-dot pm-dot-agency"></span></div>
<div class="pm-body"><span class="pm-tag pm-tag-agency">Agency</span><p class="pm-label">LAHSA aggregates, finalizes (sometimes revising totals shortly before release), and reports the countywide/city figure<small>See <a href="#rp-breaks">Where &amp; Why It Breaks</a> for the disputed 2025 late-revision finding.</small></p></div>
</div>
</div>
<div class="pm-legend">
<span class="pm-legend-item"><span class="pm-legend-dot" style="color:var(--site-teal)"></span>Agency</span>
<span class="pm-legend-item"><span class="pm-legend-dot" style="color:var(--site-ink-muted)"></span>Process step</span>
<span class="pm-legend-item"><span class="pm-legend-dot" style="color:#8a63b0"></span>Person</span>
<span class="pm-legend-item">Dashed red = a documented break point</span>
</div>
</div>

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

<h3>The topographical view: the intended pipeline, end to end</h3>
<div class="pm">
<p class="pm-title">One person's intended path from unsheltered to permanently housed</p>
<div class="pm-flow">
<div class="pm-step">
<div class="pm-marker"><span class="pm-dot pm-dot-process"></span><span class="pm-line"></span></div>
<div class="pm-body"><span class="pm-tag pm-tag-process">Phase 1</span><p class="pm-label">Prevention &amp; diversion<small>Financial assistance + case management for people at imminent risk, or a "problem-solving" conversation to avoid formal entry entirely.</small></p></div>
</div>
<div class="pm-step">
<div class="pm-marker"><span class="pm-dot pm-dot-process"></span><span class="pm-line"></span></div>
<div class="pm-body"><span class="pm-tag pm-tag-process">Phase 2</span><p class="pm-label">Street outreach<small>DMH HOME, DHS MDT, Inside Safe FIT, CIRCLE, and LA-HOP-triaged teams make contact and attempt to engage. See the zoomed-in view below.</small></p></div>
</div>
<div class="pm-step pm-step-break">
<div class="pm-marker"><span class="pm-dot pm-dot-process"></span><span class="pm-line"></span></div>
<div class="pm-body"><span class="pm-tag pm-tag-process">Phase 3</span><p class="pm-label">Coordinated Entry System (CES): assessment &amp; matching<small>A person is scored and matched centrally to an open unit rather than applying to each provider separately. See the zoomed-in view below.</small></p><p class="pm-break-note"><strong>Breaks here:</strong> Mayor Bass has publicly called CES "dysfunctional," noting units can sit vacant "for far too long" while matching runs — see <a href="#rp-breaks">Where &amp; Why It Breaks</a>.</p></div>
</div>
<div class="pm-step pm-step-break">
<div class="pm-marker"><span class="pm-dot pm-dot-process"></span><span class="pm-line"></span></div>
<div class="pm-body"><span class="pm-tag pm-tag-process">Phase 4</span><p class="pm-label">Interim / crisis housing<small>Shelters, bridge housing, tiny-home villages, motel/hotel vouchers — meant as a temporary bridge, not an end state.</small></p><p class="pm-break-note"><strong>Breaks here — the central bottleneck of the whole system:</strong> interim-to-permanent transitions fell 36% in one year (2025); fewer than 1 in 5 people in city-funded interim housing reach permanent housing at all. See the zoomed-in view below and <a href="#rp-breaks">Where &amp; Why It Breaks</a>.</p></div>
</div>
<div class="pm-step">
<div class="pm-marker"><span class="pm-dot pm-dot-process"></span><span class="pm-line"></span></div>
<div class="pm-body"><span class="pm-tag pm-tag-process">Phase 5</span><p class="pm-label">Permanent placement: RRH or PSH<small>CES's acuity score is meant to sort higher-acuity households toward PSH (indefinite subsidy + services) and lower-acuity toward RRH (short/medium subsidy, faster exit).</small></p></div>
</div>
<div class="pm-step">
<div class="pm-marker"><span class="pm-dot pm-dot-process"></span></div>
<div class="pm-body"><span class="pm-tag pm-tag-process">Phase 6</span><p class="pm-label">Aftercare &amp; retention<small>~94% one-year PSH retention overall, with a documented racial disparity in returns to homelessness — see <a href="#rp-effectiveness">What Works, What Doesn't</a>.</small></p></div>
</div>
</div>
<div class="pm-legend">
<span class="pm-legend-item"><span class="pm-legend-dot" style="color:var(--site-teal)"></span>Agency</span>
<span class="pm-legend-item"><span class="pm-legend-dot" style="color:var(--site-gold)"></span>Tool / system</span>
<span class="pm-legend-item"><span class="pm-legend-dot" style="color:var(--site-ink-muted)"></span>Process step</span>
<span class="pm-legend-item"><span class="pm-legend-dot" style="color:#8a63b0"></span>Person</span>
<span class="pm-legend-item">Dashed red = a documented break point</span>
</div>
</div>

<p>This is the &quot;topographical&quot; view — the shape of the whole system. The sections below zoom into three of these phases at the process level: not just that CES is &quot;dysfunctional,&quot; but what specifically happens, mechanically, when a match is offered and declined; not just that outreach converts few contacts to housing, but where in a specific contact-to-enrollment chain that conversion is lost; not just that interim-to-permanent transitions fell 36%, but what actually happens (or fails to happen) at the handoff itself.</p>
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
<h4>Zoomed in: what a contact-to-enrollment chain actually looks like</h4>
<p>HUD&#39;s HMIS data model draws a hard technical line between a <strong>&quot;contact&quot;</strong> — any documented interaction &quot;designed to engage the client,&quot; logged via the Current Living Situation data element — and <strong>&quot;engagement&quot;</strong>, a single milestone date marking &quot;the date on which an interactive client relationship results in a deliberate client assessment or the beginning of a case plan.&quot; The system is explicitly built around the assumption that engagement is a later, harder-won state reached only after repeated contacts, not a first-conversation outcome. (<a href="https://www.hudexchange.info/programs/hmis/hmis-data-standards/standards/common-program-specific-data-elements/413-date-of-engagement/">HUD Exchange</a>)</p>
<div class="pm">
<p class="pm-title">From first contact to a service offer that actually holds</p>
<div class="pm-flow">
<div class="pm-step">
<div class="pm-marker"><span class="pm-dot pm-dot-person"></span><span class="pm-line"></span></div>
<div class="pm-body"><span class="pm-tag pm-tag-person">Person</span><p class="pm-label">Unhoused person is contacted by an outreach team<small>Often low-barrier at first: hygiene kits, water, information — building trust, not extracting a housing decision.</small></p></div>
</div>
<div class="pm-step pm-step-break">
<div class="pm-marker"><span class="pm-dot pm-dot-agency"></span><span class="pm-line"></span></div>
<div class="pm-body"><span class="pm-tag pm-tag-agency">Agency</span><p class="pm-label">Repeated contacts over an undocumented timeframe build toward "engagement"<small>No LA-specific published data exists on average contacts-to-acceptance — LA has the lagging outcome metric (17% enrolled within a year) but not the leading process metric that would show where in repeated contact people are lost.</small></p><p class="pm-break-note"><strong>Breaks here:</strong> up to five parallel teams (DMH HOME, DHS MDT, Inside Safe FIT, CIRCLE, council-district contractors) can contact the same person with no shared real-time deconfliction — the court-ordered Alvarez &amp; Marsal audit found "an unhoused person may be contacted by multiple providers, none of whom coordinate with the other." Council District 13 has separately admitted this was its own status quo: "some of them were doing the same thing in the same area, while other parts of the district were being entirely ignored." <a href="https://www.cacd.uscourts.gov/sites/default/files/Dkt%20905%20FINAL%20AM%20REPORT.pdf">Alvarez &amp; Marsal report</a> &middot; <a href="https://cd13.lacity.gov/issues/homelessness">LA City Council District 13</a></p></div>
</div>
<div class="pm-step pm-step-break">
<div class="pm-marker"><span class="pm-dot pm-dot-tool"></span><span class="pm-line"></span></div>
<div class="pm-body"><span class="pm-tag pm-tag-tool">Tool</span><p class="pm-label">Worker checks bed/shelter availability and makes an offer<small>The City/County tasked LAHSA with a real-time bed-availability system in 2016.</small></p><p class="pm-break-note"><strong>Breaks here:</strong> seven years later a Controller audit found no such system — LAHSA tracked beds by phone calls and daily emails, called "woefully inadequate." A 2025 fix (the Interim Housing Inventory Module) introduced new mismatches instead of fixing the old one: in August 2025 LAHSA's own system showed 2 of 88 beds occupied at a PATH-run East Hollywood shelter that PATH's internal records showed 84 of 88 filled. <a href="https://laist.com/news/housing-homelessness/finding-a-shelter-bed-in-la-isnt-easy-la-city-controller-releases-audit">LAist, on the Controller audit</a> &middot; <a href="https://www.aol.com/news/homeless-shelters-open-beds-advocates-100000952.html">LA Times, via AOL, on the 2025 data mismatch</a></p></div>
</div>
<div class="pm-step">
<div class="pm-marker"><span class="pm-dot pm-dot-agency"></span></div>
<div class="pm-body"><span class="pm-tag pm-tag-agency">Agency</span><p class="pm-label">A standardized DHS/DMH/LAHSA referral form is meant to carry the person's information into the receiving program<small>LA County's Interim Housing Outreach Program (IHOP) uses a "single anchor care manager" who stays with a client through the transition — a dedicated fix that exists specifically because the default pathway doesn't guarantee continuity.</small></p></div>
</div>
</div>
<div class="pm-legend">
<span class="pm-legend-item"><span class="pm-legend-dot" style="color:var(--site-teal)"></span>Agency</span>
<span class="pm-legend-item"><span class="pm-legend-dot" style="color:var(--site-gold)"></span>Tool / system</span>
<span class="pm-legend-item"><span class="pm-legend-dot" style="color:#8a63b0"></span>Person</span>
<span class="pm-legend-item">Dashed red = a documented break point</span>
</div>
</div>

<div class="callout callout-fails">
<h5>What "successful" outreach placement can still fail to mean, a year out</h5>
After the 2021 Echo Park Lake encampment clearing, LAHSA's Executive Director reported at least 180 people placed into interim housing at the time of the operation — but a year later, fewer than 1 in 10 of those residents had moved into permanent supportive housing, subsidized rentals, or any other long-term housing. The overwhelming majority of "successful" placements never converted into a stable outcome. <a href="https://laist.com/news/housing-homelessness/echo-park-housing-report">LAist, "Only 1 In 10 Of Echo Park's Unhoused Residents Have Found Long Term Housing"</a>
</div>

<div class="callout callout-question">
<h5>What looks like resistance is often something more specific</h5>
Outreach workers are described in reporting as effectively "salespeople without a product": what reads downstream as a person declining help is frequently "the unwillingness to begin a lengthy, tedious process that may never come to fruition," not a rejection of housing itself. <a href="http://thelion.sites.lmu.edu/city/los-angeles-homelessness-outreach-workers/">THE LION (LMU)</a>. On the workforce side: KQED profiled LAHSA outreach worker Denise Velazquez, tasked with getting 10 people indoors during the Echo Park operation, whose blood pressure and mental health deteriorated badly enough in the weeks after that she eventually concluded the only way to recover was to quit — a decision she called heartbreaking because it meant abandoning clients mid-relationship. Reported caseloads have run as high as 36 clients per worker, roughly double-to-triple the 12-15 recommended for Housing First-model case management. <a href="https://www.kqed.org/news/11902904/underpaid-and-burned-out-many-outreach-workers-for-unhoused-californians-are-leaving-their-jobs">KQED</a> &middot; <a href="https://laist.com/news/housing-homelessness/homelessness-outreach-workers-in-la-are-exhausted-and-stressed-out">LAist</a>
</div>

<h3>3. Coordinated Entry System (CES)</h3>
<p>CES is LA County&#39;s single coordinated intake/prioritization framework, in place since roughly 2013 — meant to replace an earlier first-come-first-served, provider-by-provider approach with one shared system: a person is assessed once, logged into HMIS, and matched to housing centrally under a shared Prioritization and Matching Policy rather than each provider running its own intake.</p>
<p>Historically, CES used the <strong>VI-SPDAT</strong> assessment tool — see <a href="#rp-tools">Tools &amp; Systems</a> for the documented bias critique and LA&#39;s transition to a successor tool.</p>
<div class="callout callout-fails">
<h5>Mayor Bass has publicly called CES "dysfunctional"</h5>
"The current coordinated entry system is dysfunctional, impractical and inequitable," she said, noting housing units can sit vacant "for far too long" while the matching process runs. Separately, California Policy Lab research found the CES/PSH matching process produces racially disparate outcomes, with Black unhoused residents specifically underprioritized relative to need. <a href="https://knock-la.com/inside-la-endless-queues-for-housing/">Knock LA</a>
</div>

<h4>Zoomed in: what a match is, mechanically, and how a household falls out of the pool without ever &quot;declining&quot;</h4>
<p>CES was built from its 2013 pilot as two connected algorithms, not one: a ranking algorithm that scores vulnerability, and a matching algorithm that pairs ranked people to specific housing openings, running inside LAHSA&#39;s HMIS platform (Clarity, vendor Bitfocus) via a &quot;Community Queue&quot; and eligibility engine, coordinated by a dedicated internal <strong>CES Matching Team</strong>. (<a href="https://www.americanscientist.org/article/high-tech-homelessness">American Scientist</a>; <a href="https://www.bitfocus.com/coordinated-entry-products">Bitfocus</a>)</p>
<div class="callout callout-finding">
<h5>The ranking logic is not simply "highest acuity score wins"</h5>
Per CES governance documentation, <strong>length of time homeless is the primary prioritization factor</strong> — treated as a proxy for overall vulnerability — with shelter status as a secondary factor and the VI-SPDAT/LA HAT acuity score used mainly as a tie-breaker, which the same documentation says is "rarely, if ever" actually needed. A carve-out reserves the top 10% of the by-name list for unsheltered people regardless of shelter status, specifically so they aren't perpetually out-ranked by sheltered households. <a href="https://ceo.oc.gov/sites/ceo/files/2022-08/CES%20Committee_CES%20Policies%20Upda.pdf">Orange County CEO's Office, describing the shared regional CES methodology</a>. LAHSA's own current governing document — "CES PSH Prioritization and Matching Guidance," revised 4/24/2026 — exists and is publicly linked but was not readable in this research pass; its full text should be checked directly before treating this ranking description as final. <a href="https://www.lahsa.org/documents?id=7658-ces-psh-prioritization-and-matching-guidance-revised-04-24-2026-.pdf">LAHSA</a>
</div>

<div class="pm">
<p class="pm-title">How a household can go from "matched" to "unmatchable" without ever declining anything</p>
<div class="pm-flow">
<div class="pm-step">
<div class="pm-marker"><span class="pm-dot pm-dot-person"></span><span class="pm-line"></span></div>
<div class="pm-body"><span class="pm-tag pm-tag-person">Person</span><p class="pm-label">Household is assessed and enters the CES Community Queue, ranked mainly by time homeless</p></div>
</div>
<div class="pm-step pm-step-break">
<div class="pm-marker"><span class="pm-dot pm-dot-tool"></span><span class="pm-line"></span></div>
<div class="pm-body"><span class="pm-tag pm-tag-tool">Tool</span><p class="pm-label">A designated Point of Contact (POC) on the household's file must be refreshed every 90 days<small>Any provider staff member who can maintain regular contact qualifies — but the record itself must stay current.</small></p><p class="pm-break-note"><strong>Breaks here:</strong> per LAHSA policy, "CES Matchers will only be able to match CES Participants who have a current point of contact" — if the 90-day refresh lapses (a case manager turns over, a phone number changes), the household silently drops out of active matching without ever formally declining a unit. This connects directly to the workforce-turnover finding above: a Point of Contact that depends on one case manager staying in place is only as stable as that case manager's own job tenure. <a href="https://www.sbceh.org/uploads/4/5/0/7/45075441/2-2019_lahsa_ces_points_of_contact_what_you_need_to_know_draft.pdf">LAHSA, "CES Points of Contact"</a></p></div>
</div>
<div class="pm-step">
<div class="pm-marker"><span class="pm-dot pm-dot-agency"></span><span class="pm-line"></span></div>
<div class="pm-body"><span class="pm-tag pm-tag-agency">Agency</span><p class="pm-label">A match is generated; the case manager is contractually required to reach the household within 7 days<small>LA County's own workflow documentation specifies this provider-side deadline.</small></p></div>
</div>
<div class="pm-step pm-step-break">
<div class="pm-marker"><span class="pm-dot pm-dot-tool"></span><span class="pm-line"></span></div>
<div class="pm-body"><span class="pm-tag pm-tag-tool">Tool</span><p class="pm-label">If lease-up doesn't happen, the unit accrues "Vacancy Days" — a tracked metric with no published SLA<small>LA County's own system defines Vacancy Days and says it's meant to trigger follow-up.</small></p><p class="pm-break-note"><strong>Breaks here — the clearest documented gap in this entire pipeline:</strong> no public document specifies a numeric threshold that forces escalation, whether a declined unit is immediately re-offered, or a cap on how many times a unit can go unfilled before someone intervenes. What vacancy investigations <em>do</em> show is that units mostly sit empty from paperwork/eligibility mismatches, not explicit declines — LAist found 274 newly built Prop HHH apartments sat empty 60+ days past "ready to occupy," partly from federal eligibility rules mismatched to a building's target population. A 2023 Council motion by Nithya Raman found ~20% of shelter beds vacant on any given night and PSH units "taking months to fill." <a href="https://homeless.lacounty.gov/icms-glossary/">LA County HSH glossary</a> &middot; <a href="https://laist.com/news/housing-homelessness/homeless-la-empty-apartments-prop-hhh-bass-vacant-units-los-angeles">LAist, on empty Prop HHH units</a></p></div>
</div>
</div>
<div class="pm-legend">
<span class="pm-legend-item"><span class="pm-legend-dot" style="color:var(--site-teal)"></span>Agency</span>
<span class="pm-legend-item"><span class="pm-legend-dot" style="color:var(--site-gold)"></span>Tool / system</span>
<span class="pm-legend-item"><span class="pm-legend-dot" style="color:#8a63b0"></span>Person</span>
<span class="pm-legend-item">Dashed red = a documented break point</span>
</div>
</div>

<div class="callout callout-fails">
<h5>The clearest current illustration: LAHSA's own master-leased apartments</h5>
LAHSA master-leases 14 buildings totaling 758 units, renting whole buildings with tax dollars and subleasing to unhoused people. By May 2026, <strong>259 of those 758 units (about 34%) sat vacant</strong> — while taxpayers remained on the hook for the full lease regardless of occupancy, at roughly $3,400/unit/month (~$880,000/month, ~$10.6 million/year, on vacant units alone). LAHSA blamed "subsidy restrictions, funding reductions, and bureaucratic hurdles," but didn't explain why buildings were leased without a plan to keep them filled — and had committed to more than $70 million in future payments on noncancelable leases, removing the normal financial incentive to solve the matching bottleneck quickly, since the agency pays the same rent whether units are filled or not. The presentation on this vacancy was pulled from LAHSA's own public finance-committee agenda after LAist asked about it. Part of LAHSA's own fix was to loosen front-end verification itself — approving "presumptive eligibility" waivers letting people self-certify without proving eligibility up front — which is itself a mechanistic clue about where the agency believed the real bottleneck lived. This episode directly contributed to HUD's June 2026 funding suspension, which explicitly cited "a failure to track empty hotel rooms." <a href="https://laist.com/news/housing-homelessness/tax-funded-la-apartments-sit-empty-mayor-bass-homelessness-strategy">LAist</a>
</div>

<p>Case conferencing — where difficult matches are meant to get resolved — happens through each Service Planning Area&#39;s designated &quot;SPA Lead&quot; agency (e.g., HOPICS for South LA), on a roughly biweekly-to-monthly cadence rather than a real-time one. No public document lists who specifically attends these meetings or documents what gets decided there versus left unresolved — an open gap, not a confirmed failure. (<a href="https://www.lahsa.org/ces/home/accessingces/">LAHSA</a>; <a href="http://ceslosangeles.weebly.com/spa-2-san-fernando-valley.html">CES Los Angeles, SPA 2 schedule</a>)</p>
<h3>4. Interim / crisis housing</h3>
<p>This category — emergency shelters, bridge housing, tiny home villages, motel/hotel vouchers — is explicitly meant to function as a <em>temporary bridge</em> to permanent housing, not an end state.</p>
<p><strong>A Bridge Home</strong> (launched under Mayor Garcetti) opened its first site in September 2018 (45 beds, a &quot;sleeping module&quot; congregate model) and expanded into tiny-home-village formats — Chandler Boulevard (40 units/75 beds), Tarzana (76 units/150 beds), Whitsett West (77 units/150 beds), and others. As of 2022 the City had delivered roughly 12 tiny-home villages totaling ~1,552 interim beds — a dated figure; the current total is almost certainly higher.</p>
<div class="callout callout-fails">
<h5>The documented "bridge to nowhere" problem</h5>
A LAist investigation found relatively few people placed in LA's bridge/interim shelters actually exit into permanent housing, because permanent housing supply is far scarcer than interim shelter capacity — every case manager and resident is effectively competing for a small number of permanent slots downstream. One expert warned against investing heavily in interim beds without a credible permanent-housing exit strategy, calling the risk "warehousing people indefinitely." This is corroborated directly by the 2026 count: interim-to-permanent transitions fell 36% year-over-year even as the system kept moving people from the street into interim beds. <a href="https://laist.com/news/bridge-home-los-angeles-garcetti-result">LAist, "A Bridge To Where?"</a>
</div>

<p>See <a href="#rp-breaks">Where &amp; Why It Breaks</a> for the full mechanics of this bottleneck.</p>
<h4>Zoomed in: the handoff itself, and where a specific person&#39;s case actually stalls</h4>
<p>LA&#39;s CES treats case management and housing navigation as two service tracks that don&#39;t automatically stay with the same person — LAHSA&#39;s own CES description offers housing navigation specifically &quot;for homeless participants who do not yet have a primary case manager,&quot; meaning whether someone keeps their case manager through the transition or gets handed to a separate navigator depends on which track they were sorted into, not a uniform continuity policy. No LAHSA or City/County document found formally mandates who follows a client through the transition. (<a href="https://www.lahsa.org/ces/home/inaction/">LAHSA CES</a>)</p>
<div class="pm">
<p class="pm-title">The paperwork gauntlet between "matched" and "moved in"</p>
<div class="pm-flow">
<div class="pm-step">
<div class="pm-marker"><span class="pm-dot pm-dot-process"></span><span class="pm-line"></span></div>
<div class="pm-body"><span class="pm-tag pm-tag-process">Step</span><p class="pm-label">Eligibility documentation<small>Proof of homelessness, income/asset verification, photo ID, Social Security cards for every household member.</small></p></div>
</div>
<div class="pm-step">
<div class="pm-marker"><span class="pm-dot pm-dot-process"></span><span class="pm-line"></span></div>
<div class="pm-body"><span class="pm-tag pm-tag-process">Step</span><p class="pm-label">Criminal background check<small>Assistance can be denied outright for a household member evicted from federally assisted housing for drug-related activity in the prior three years.</small></p></div>
</div>
<div class="pm-step pm-step-break">
<div class="pm-marker"><span class="pm-dot pm-dot-process"></span><span class="pm-line"></span></div>
<div class="pm-body"><span class="pm-tag pm-tag-process">Step</span><p class="pm-label">Request for Tenancy Approval (RFTA) + unit inspection<small>HACLA says this "should take about a month" once a landlord and unit are matched.</small></p><p class="pm-break-note"><strong>Breaks here — a documented, named case:</strong> Yolanda Robins, unhoused on Skid Row for three decades, was approved for an apartment via federal voucher in January 2022. Her RFTA sat incomplete and HACLA staff stopped responding to email; it wasn't filed until June 4, and only got resolved after the LA Times contacted HACLA directly — more than six months after her approval. HACLA's own assistant housing manager acknowledged understaffing as the direct cause elsewhere in the same period: <em>"It's not normal... we will drop the ball."</em> <a href="https://www.hacla.org/en/news/hacla-response-la-times-article-july-25-2022-la-gives-them-housing-vouchers-they-cant-use">HACLA's response, quoting the LA Times reporting</a> &middot; <a href="https://laist.com/news/housing-homelessness/hacla-unhoused-la-homelessness">LAist</a></p></div>
</div>
<div class="pm-step">
<div class="pm-marker"><span class="pm-dot pm-dot-process"></span></div>
<div class="pm-body"><span class="pm-tag pm-tag-process">Step</span><p class="pm-label">Move-in funds<small>A CalAIM program covers deposit/furnishing costs up to $5,000-$6,000 — but requires submission within 3 business days of move-in with a draft lease already in place, meaning it only works if every prior step already cleared on a tight timeline.</small></p></div>
</div>
</div>
<div class="pm-legend">
<span class="pm-legend-item"><span class="pm-legend-dot" style="color:var(--site-ink-muted)"></span>Process step</span>
<span class="pm-legend-item">Dashed red = a documented break point</span>
</div>
</div>

<div class="callout callout-fails">
<h5>A second named case: bounced between case managers, not paperwork</h5>
Halcyon Selfmade, a wheelchair user with Stickler syndrome living at the Schrader Boulevard "A Bridge Home" site in Hollywood, was told he and his partner would be connected to a wheelchair-accessible unit within 90 days. Ninety days passed. Then another 90. In the interim, LAist reported he was "bounced from one case manager who couldn't find an apartment to another that wouldn't set appointments with him" — the continuity failure this section is about, on the record, with a name attached. <a href="https://laist.com/news/homeless-shelter-housing-halcyon-selfmade-hollywood">LAist, "LA's Homeless Services System Can Be Achingly Slow"</a>
</div>

<div class="callout callout-question">
<h5>What "unknown exit destination" actually means, mechanically</h5>
HUD's HMIS Data Standards (Universal Data Element 3.12) instruct staff to record "No exit interview completed" or "Data not collected" whenever a client exits <em>without</em> staff having contact with them about where they're going. National HMIS training guidance specifically flags night-by-night shelters as prone to high rates of missing destination data, because a client is auto-exited after a set period of not showing up — the system doesn't wait and investigate; it times out and defaults to "unknown," because by definition no one got to ask. In other words: "unknown exit destination" is overwhelmingly a record of <em>lost contact before a documented exit conversation</em>, not a confirmed outcome. <a href="https://www.hudexchange.info/programs/hmis/hmis-data-standards/standards/universal-data-elements/312-destination/">HUD Exchange, HMIS Data Standards</a>
</div>

<p>On the granular reasons beds sit empty while people are turned away in the same building: a Controller audit found restrictive geographic catchment areas can keep an empty bed off-limits to someone eligible for it but currently located a few miles outside its zone, and documented shelters that don&#39;t accept walk-ins, cap how many belongings or family members someone can bring, or prohibit pets outright — each a concrete way a specific open bed and a specific person in need can coexist without matching. A June 2024 Inside Safe operation to clear a Hollywood encampment was itself delayed a week and a half not by a lack of beds or motel rooms, but by late payments from LAHSA to the provider running the motel placements — the money mechanics from <a href="#rp-money">The Money</a> directly stalling a physical placement. (<a href="https://www.nbclosangeles.com/news/local/audit-finds-inefficient-system-responsible-for-leaving-available-shelter-beds-empty/3289819/">NBC Los Angeles</a>; <a href="https://laist.com/news/housing-homelessness/inside-safe-unhoused-encampment-cleared-in-hollywood">LAist</a>)</p>
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
<div class="pm">
<p class="pm-title">Who governs, who funds, who owns nothing fully</p>
<div class="pm-flow">
<div class="pm-step">
<div class="pm-marker"><span class="pm-dot pm-dot-agency"></span><span class="pm-line"></span></div>
<div class="pm-body"><span class="pm-tag pm-tag-agency">Agency</span><p class="pm-label">HUD designates the LA Continuum of Care as the federal funding vehicle; LAHSA is its sole Collaborative Applicant<small>One agency's legal standing determines whether the entire county's ~$1B federal pipeline can be applied for at all.</small></p></div>
</div>
<div class="pm-step pm-step-break">
<div class="pm-marker"><span class="pm-dot pm-dot-agency"></span><span class="pm-line"></span></div>
<div class="pm-body"><span class="pm-tag pm-tag-agency">Agency</span><p class="pm-label">LAHSA Commission: 5 seats appointed by the County Board of Supervisors, 5 by the Mayor with Council confirmation<small>Governance power is split exactly evenly by design.</small></p><p class="pm-break-note"><strong>Breaks here:</strong> because neither government fully owns LAHSA, the County can vote to defund it but the joint agreement still nominally gives it equal governing power, and the City can't unilaterally restructure or abolish it either — the structural ambiguity cited repeatedly as why the 2025-2026 breakup turned messy instead of clean.</p></div>
</div>
<div class="pm-step">
<div class="pm-marker"><span class="pm-dot pm-dot-agency"></span><span class="pm-line"></span></div>
<div class="pm-body"><span class="pm-tag pm-tag-agency">Agency</span><p class="pm-label">County pulls funding and staff into its own new department (HSH, launched Jan. 2026)<small>Directly operates county-funded interim housing, outreach, and prevention — but LAHSA keeps the federal Collaborative Applicant role regardless.</small></p></div>
</div>
<div class="pm-step pm-step-break">
<div class="pm-marker"><span class="pm-dot pm-dot-agency"></span></div>
<div class="pm-body"><span class="pm-tag pm-tag-agency">Agency</span><p class="pm-label">City keeps funding LAHSA directly (~73% of its FY2026-27 budget) while HUD suspends LAHSA's federal funding over the same institution</p><p class="pm-break-note"><strong>Breaks here:</strong> no reporter or advocate has articulated what happens to CoC compliance if County operating capacity sits at HSH while the federal "lead agency" designation stays with LAHSA — see "Where mandates overlap" below.</p></div>
</div>
</div>
<div class="pm-legend">
<span class="pm-legend-item"><span class="pm-legend-dot" style="color:var(--site-teal)"></span>Agency</span>
<span class="pm-legend-item">Dashed red = a documented break point</span>
</div>
</div>

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

<div class="pm">
<p class="pm-title">Where a person's data actually lives, and where it stops flowing</p>
<div class="pm-flow">
<div class="pm-step">
<div class="pm-marker"><span class="pm-dot pm-dot-person"></span><span class="pm-line"></span></div>
<div class="pm-body"><span class="pm-tag pm-tag-person">Person</span><p class="pm-label">Assessed via VI-SPDAT / LA HAT; scored and entered into HMIS</p></div>
</div>
<div class="pm-step">
<div class="pm-marker"><span class="pm-dot pm-dot-tool"></span><span class="pm-line"></span></div>
<div class="pm-body"><span class="pm-tag pm-tag-tool">Tool</span><p class="pm-label">Clarity (Bitfocus), LAHSA's HMIS front end, holds the record and drives CES matching<small>The Community Queue and Points-of-Contact tracking described on <a href="#rp-system">Phases of the Process</a> both live here.</small></p></div>
</div>
<div class="pm-step pm-step-break">
<div class="pm-marker"><span class="pm-dot pm-dot-tool"></span><span class="pm-line"></span></div>
<div class="pm-body"><span class="pm-tag pm-tag-tool">Tool</span><p class="pm-label">A separate, proprietary County data system runs in parallel and does not connect to HMIS</p><p class="pm-break-note"><strong>Breaks here:</strong> some providers manually double-enter client data into both systems — "manually double-entering things opens the door for all sorts of errors" — a direct mechanical link between an IT architecture choice and whether a person is correctly recorded as sheltered.</p></div>
</div>
<div class="pm-step pm-step-break">
<div class="pm-marker"><span class="pm-dot pm-dot-tool"></span><span class="pm-line"></span></div>
<div class="pm-body"><span class="pm-tag pm-tag-tool">Tool</span><p class="pm-label">DMH's clinical records track mental-health outreach and services separately</p><p class="pm-break-note"><strong>Breaks here:</strong> City and county entities have publicly acknowledged they're still working to connect HMIS/Clarity with DMH's clinical records — an admission this integration hasn't historically existed, even though DMH's HOME teams are one of the outreach paths feeding people into this same pipeline (see <a href="#rp-system">Phases of the Process</a>).</p></div>
</div>
<div class="pm-step pm-step-break">
<div class="pm-marker"><span class="pm-dot pm-dot-agency"></span></div>
<div class="pm-body"><span class="pm-tag pm-tag-agency">Agency</span><p class="pm-label">Program exit is supposed to be logged back into HMIS, closing the loop</p><p class="pm-break-note"><strong>Breaks here:</strong> LAHSA's system lets providers bypass exit logging entirely when someone leaves an Inside Safe motel-shelter placement — meaning the city can keep paying for empty motel rooms for weeks with no enforced requirement to record that the person left. Councilmember Bob Blumenfield: "That's horrifying."</p></div>
</div>
</div>
<div class="pm-legend">
<span class="pm-legend-item"><span class="pm-legend-dot" style="color:var(--site-teal)"></span>Agency</span>
<span class="pm-legend-item"><span class="pm-legend-dot" style="color:var(--site-gold)"></span>Tool / system</span>
<span class="pm-legend-item"><span class="pm-legend-dot" style="color:#8a63b0"></span>Person</span>
<span class="pm-legend-item">Dashed red = a documented break point</span>
</div>
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
<h3>How the money actually moves, mechanically — and where it jams</h3>
<p>The audits above establish <em>that</em> huge sums are untracked, unspent, or unverified. This section is about the specific, documented mechanical steps that produce those headline figures — the process level underneath the spending scandal.</p>
<div class="pm">
<p class="pm-title">How a dollar is supposed to move from a funder to a frontline service</p>
<div class="pm-flow">
<div class="pm-step">
<div class="pm-marker"><span class="pm-dot pm-dot-agency"></span><span class="pm-line"></span></div>
<div class="pm-body"><span class="pm-tag pm-tag-agency">Agency</span><p class="pm-label">HUD / State (HHAP) / County (Measure A) / City appropriate funds<small>Each layer runs its own fiscal year and accounting method — see <a href="#rp-sopk">The Analytical Frame</a> on why that alone breaks a shared theory of knowledge about "total spending."</small></p></div>
</div>
<div class="pm-step pm-step-break">
<div class="pm-marker"><span class="pm-dot pm-dot-agency"></span><span class="pm-line"></span></div>
<div class="pm-body"><span class="pm-tag pm-tag-agency">Agency</span><p class="pm-label">LAHSA, as HUD's sole Collaborative Applicant, receives and re-grants federal CoC funds; separately submits a "cash request" to the City for city-funded programs<small>LAHSA cannot pay its own providers for city-funded work until the City pays that cash request.</small></p><p class="pm-break-note"><strong>Breaks here:</strong> the court-ordered Alvarez &amp; Marsal audit found this City&#8596;LAHSA cash-request process is "a time-consuming, manual process at risk of human error" — reconciled without a shared information system between the two governments. A discrepancy anywhere in one bundled funding agreement can delay payment for every program bundled under it, whether or not that specific program had the discrepancy. <a href="https://mynewsla.com/government/2025/03/06/report-lack-of-clarity-oversight-hamper-las-homeless-programs-2/">MyNewsLA, on the Alvarez &amp; Marsal audit</a></p></div>
</div>
<div class="pm-step pm-step-break">
<div class="pm-marker"><span class="pm-dot pm-dot-agency"></span><span class="pm-line"></span></div>
<div class="pm-body"><span class="pm-tag pm-tag-agency">Agency</span><p class="pm-label">Nonprofit provider delivers the service, fronting its own cash, then submits an invoice for reimbursement<small>Standard cost-reimbursement structure: the provider is paid back, not paid up front.</small></p><p class="pm-break-note"><strong>Breaks here:</strong> providers report waiting 3&#8211;4 months in the ordinary course, and specific providers have been owed $12M&#8211;$20M at a time; as of February 2026 LAHSA owed at least $69.3 million to providers system-wide, $26.9 million of it on invoices over two months old. <a href="https://laist.com/news/housing-homelessness/lahsa-late-payments-city-county-homeless-funds">LAist</a></p></div>
</div>
<div class="pm-step">
<div class="pm-marker"><span class="pm-dot pm-dot-person"></span></div>
<div class="pm-body"><span class="pm-tag pm-tag-person">Frontline</span><p class="pm-label">Case manager, shelter staff, or outreach worker actually delivers the service the dollar was meant to fund</p></div>
</div>
</div>
<div class="pm-legend">
<span class="pm-legend-item"><span class="pm-legend-dot" style="color:var(--site-teal)"></span>Agency</span>
<span class="pm-legend-item"><span class="pm-legend-dot" style="color:#8a63b0"></span>Frontline / person</span>
<span class="pm-legend-item">Dashed red = a documented break point</span>
</div>
</div>

<h4>Why invoices can&#39;t be filed on time in the first place</h4>
<p>The reimbursement lag isn&#39;t a processing-speed problem so much as a contract-timing problem. At the start of a fiscal year (July 1), LAHSA has historically finalized only <strong>about one-third</strong> of its provider contracts — the rest aren&#39;t finalized until as late as the following February. Providers legally cannot submit an invoice against a contract that isn&#39;t yet executed, so once a contract is finally signed, providers file what LAHSA itself has described as an &quot;avalanche&quot; of invoices covering up to six months of already-delivered services. South LA provider HOPICS was owed nearly $20 million as a direct result of this pattern spanning two budget years. LA City Councilmember Nithya Raman placed &quot;most of the delay this year in contracting&quot; specifically at LAHSA. (<a href="https://laist.com/news/housing-homelessness/lahsa-homeless-agency-late-payments-providers-city-county-crisis-blame-finances">LAist</a>)</p>
<div class="callout callout-fails">
<h5>The reimbursement gap isn't hypothetical — it's a specific, dated crisis</h5>
The People Concern (~$102M revenue, ~85% government-funded) pays roughly <strong>$63,000/month in interest</strong> on a $9 million line of credit taken out purely to bridge the 3&#8211;4 month gap between spending its own cash and getting reimbursed — interest the government will never pay back. CEO John Maceri: <em>"Every month we're going deeper and deeper in the hole."</em> HOPICS director Kelvin Driscoll: <em>"Providers cannot continue operating on uncertainty and IOUs."</em> LA Family Housing CEO Stephanie Klasky-Gamer: <em>"These delays are one of the biggest issues for our organization because if we cannot pay our staff, we don't operate."</em> <a href="https://www.scrippsnews.com/us-news/homeless-service-providers-face-huge-debt-threatening-to-undermine-their-work">Scripps News</a> &middot; <a href="https://laist.com/news/housing-homelessness/lahsa-homeless-agency-late-payments-providers-city-county-crisis-blame-finances">LAist</a>
</div>

<h4>What happens when a provider&#39;s own documentation is the failure point</h4>
<p>Providers must retain — not necessarily submit upfront — the receipts and financial records backing every reimbursed cost, produced when LAHSA conducts on-site monitoring (contractually at least quarterly). The more consequential documentation failure sits a level up, in the contracts themselves: the Alvarez &amp; Marsal audit found City/LAHSA/provider contracts &quot;frequently contained broad terms without clear definitions, which created ambiguity about the scope and type of service delivered&quot; — meaning a dispute over whether an activity is even billable is often built into the contract language, not just an invoicing-desk judgment call. (<a href="https://mynewsla.com/government/2025/03/06/report-lack-of-clarity-oversight-hamper-las-homeless-programs-2/">MyNewsLA</a>)</p>
<p>That same ambiguity shows up as the verification gap already documented on this site: the November 2024 County Auditor-Controller review found LAHSA &quot;failed to verify whether the services invoiced were provided&quot; in a large share of cases, and that <strong>51% of LAHSA&#39;s planned contract-compliance reviews had no method built in to verify a provider&#39;s compliance</strong> — the review process itself wasn&#39;t designed to catch a mismatch between what was billed and what happened on the ground. (<a href="https://laist.com/news/housing-homelessness/los-angeles-homeless-services-authority-lahsa-audit-2024-november-county">LAist</a>)</p>
<div class="callout callout-fails">
<h5>What happens when that gap goes unenforced: a $100M case study</h5>
Weingart Center — a major shelter operator already profiled on <a href="#rp-agencies">Agencies &amp; NGOs</a> — received over <strong>$100 million</strong> in taxpayer funds while continuously out of compliance with federal "single audit" deadlines since early 2022, filing its FY2022 and FY2023 single audits roughly a year and a half late each, with the audits that did surface showing repeat, unremedied accounting failures from one year to the next. That didn't stop a $9 million no-bid 2023 contract, directed by the Mayor's office, to run the City's largest shelter site. <a href="https://laist.com/news/housing-homelessness/la-homelessness-nonprofit-got-over-100-million-from-taxpayers-despite-failing-audit-requirements">LAist</a>
</div>

<h4>Why &quot;unspent&quot; money accumulates — the mechanics underneath the headline figures</h4>
<ul>
<li><strong>LAHSA&#39;s own underspending is now dated and quantified year-over-year</strong>: $108 million underspent in the fiscal year ending June 2025 (attributed by the agency mainly to &quot;program delays&quot;), after underspending nearly $150 million the prior year, on top of at least $7 million in federal dollars left unspent in FY2025 and $3.5 million flagged as unused federal grant money in a January 2022 internal audit. (<a href="https://laist.com/news/housing-homelessness/la-homeless-underspending">LAist</a>)</li>
<li><strong>City Controller Kenneth Mejia&#39;s office attributed the City&#39;s own $513 million in unspent homelessness funds</strong> to a &quot;sluggish, inefficient approach&quot; driven by four specific mechanical causes: understaffing, homelessness programs spread across multiple City departments <em>and</em> 15 individual council-district offices with no single owner, obsolete technology, and no real-time data — meaning the City structurally cannot see, in the moment, how much of its own homelessness budget has gone out the door. (<a href="https://laist.com/news/housing-homelessness/la-sat-on-nearly-half-a-billion-dollars-in-homelessness-funds-last-year">LAist</a>)</li>
<li><strong>LAHSA has been structurally unable to audit itself, compounding the tracking problem.</strong> LAHSA completed no internal audits in some recent years; one internal audit specifically investigating why LAHSA failed to spend $7 million in granted federal dollars sat unfinished for over two years because LAHSA management was months late responding to the auditors&#39; own findings, and external auditors separately found &quot;significant&quot; inaccuracies in LAHSA&#39;s financial statements that had to be corrected late in the audit process. (<a href="https://laist.com/news/housing-homelessness/audit-lahsa-management-homeless">LAist</a>)</li>
<li><strong>At the state level</strong>, the mechanism behind the $24 billion figure already on this site isn&#39;t just &quot;no one checked&quot; — Cal ICH, the state&#39;s own coordinating body, tracked and reported homelessness spending data only through FY2020-21 and stopped updating it even as the state kept awarding large new funding rounds after that point. Three of the five programs the State Auditor reviewed simply lacked enough data to judge cost-effectiveness either way — a data-infrastructure failure sitting underneath what reads as a spending-discipline failure. (<a href="https://information.auditor.ca.gov/reports/2023-102.1/index.html">California State Auditor</a>)</li>
<li><strong>The older, quieter precedent</strong>: between 2015-2020, LAHSA, HACLA, and LACDA collectively returned nearly $150 million in unspent federal grants to HUD (LAHSA alone: over $29 million). Agency-cited causes on the record: HUD&#39;s own &quot;rigid&quot; and &quot;complex&quot; funding rules that make it hard to redirect money once it can&#39;t be spent on its original purpose; a tight rental market where landlords wouldn&#39;t lease to formerly homeless tenants; poor credit/rental histories among clients; and high client attrition — people leaving the pipeline before a unit could be matched to them. (<a href="https://www.pbssocal.org/news-community/l-a-agencies-returned-nearly-150-million-in-unspent-federal-homeless-grants/">PBS SoCal</a>)</li>
</ul>
<h4>The staffing problem behind the 51% verification gap</h4>
<p>LAHSA&#39;s own finance deputy described the agency&#39;s finance function, at a public LAHSA Commission meeting, as &quot;overworked&quot; and low-morale, destabilized by turnover among the mid-level leaders who held the institutional knowledge needed to keep contracts moving, on top of a broader leadership vacuum. County Supervisor Lindsey Horvath, at that same meeting: <strong>&quot;LAHSA does not have the staffing or expertise to pay its bills.&quot;</strong> (<a href="https://laist.com/news/housing-homelessness/lahsa-homeless-agency-late-payments-providers-city-county-crisis-blame-finances">LAist</a>)</p>
<div class="callout callout-question">
<h5>Open gap</h5>
No source located gives a specific contract-monitor-to-contract ratio or a documented vacancy/turnover rate for LAHSA's Monitoring &amp; Compliance unit specifically — the causal link between "the finance/compliance function is short-staffed" and "51% of compliance reviews couldn't verify service delivery" is strongly implied by every source touching this topic, but not quantitatively demonstrated by any single one found in this research pass. Presented here as a well-supported inference, not a directly sourced fact.
</div>

<p>Useful because it&#39;s an official naming the mechanism rather than disputing it: LAHSA Commissioner Amy Perkins asked LAHSA finance staff directly, <em>&quot;Providers are submitting invoices for work they&#39;ve completed for the city of Los Angeles and you don&#39;t have that money, and you are not calling out that as a 911?&quot;</em> — then-CEO Gita O&#39;Neill&#39;s response: <em>&quot;LAHSA has been structured for decades as the entity that takes the blame,&quot;</em> adding, <em>&quot;Political incentive has always been to point at LAHSA rather than to address structural issues.&quot;</em> (<a href="https://laist.com/news/housing-homelessness/lahsa-homeless-agency-late-payments-providers-city-county-crisis-blame-finances">LAist</a>)</p>
<h4>Where the system is trying to fix this</h4>
<ul>
<li>California&#39;s <strong>AB 590</strong> now authorizes state agencies to pay nonprofits up to 25% of contracted funds up front — a direct legislative acknowledgment that pure cost-reimbursement structurally underfunds providers&#39; cash-flow needs — alongside companion bills targeting prompt-payment timing (SB 1246), reduced small-grant reporting burden (AB 2322), and indirect-cost reimbursement (SB 336); a broader Prompt Payment Act fix (SB 557) was vetoed. (<a href="https://www.fplglaw.com/insights/ca-grant-reform-third-times-a-charm/">For Purpose Law Group</a>)</li>
<li>Several LA City departments are reportedly moving away from pure reimbursement toward paying some costs upfront, and the Nonprofit Finance Fund runs a $9 million 0%-interest bridge fund specifically to cover LAHSA payment delays for Hilton Foundation grantees. (<a href="https://nff.org/blog/how-ensure-front-payments-homeless-services-providers-work">Nonprofit Finance Fund</a>)</li>
<li>The new County Department of Homeless Services and Housing (HSH) completed its transition from LAHSA on January 1, 2026, and began directly managing County-funded provider contracts on July 1, 2026, explicitly committing to &quot;established best practices to ensure providers are reliably paid on time&quot; — itself an implicit admission the prior LAHSA-mediated pass-through wasn&#39;t. Whether that holds up in practice is a live, checkable claim rather than a settled improvement, since the transition only fully completed a few weeks before this research date. (<a href="https://homeless.lacounty.gov/news/la-county-successfully-completes-transition-of-county-funded-homeless-services-contracts-to-streamline-system-and-improve-accountability/">LA County HSH</a>)</li>
</ul>
<h4>Summary: mechanism, cause, source</h4>
<table>
<thead>
<tr>
<th>Mechanism</th>
<th>Documented cause</th>
<th>Source</th>
</tr>
</thead>
<tbody><tr>
<td>Providers front cash 3-4 months before reimbursement</td>
<td>Standard cost-reimbursement contract structure</td>
<td><a href="https://calmatters.org/housing/homelessness/2024/10/nonprofit-reimbursements/">CalMatters</a></td>
</tr>
<tr>
<td>Invoices can&#39;t be filed on time</td>
<td>Only ~1/3 of contracts finalized by the July 1 fiscal-year start; rest not done until February</td>
<td><a href="https://laist.com/news/housing-homelessness/lahsa-homeless-agency-late-payments-providers-city-county-crisis-blame-finances">LAist</a></td>
</tr>
<tr>
<td>City&#8594;LAHSA payments jam</td>
<td>Manual &quot;cash request&quot; reconciliation process; a discrepancy in one bundled funding agreement can freeze the whole group</td>
<td><a href="https://mynewsla.com/government/2025/03/06/report-lack-of-clarity-oversight-hamper-las-homeless-programs-2/">MyNewsLA, on Alvarez &amp; Marsal</a></td>
</tr>
<tr>
<td>Compliance reviews can&#39;t confirm services happened</td>
<td>51% of planned reviews lacked a verification method</td>
<td><a href="https://laist.com/news/housing-homelessness/los-angeles-homeless-services-authority-lahsa-audit-2024-november-county">LAist</a></td>
</tr>
<tr>
<td>Money sits unspent at LAHSA</td>
<td>Program delays; $108M (FY25) and $150M (FY24) underspends</td>
<td><a href="https://laist.com/news/housing-homelessness/la-homeless-underspending">LAist</a></td>
</tr>
<tr>
<td>Money sits unspent at the City</td>
<td>No single owner across departments/council offices; obsolete tech; no real-time data</td>
<td><a href="https://laist.com/news/housing-homelessness/la-sat-on-nearly-half-a-billion-dollars-in-homelessness-funds-last-year">LAist</a></td>
</tr>
<tr>
<td>HUD funds returned unspent, 2015-2020</td>
<td>HUD&#39;s rigid rules; tight rental market; poor client credit/rental history; high attrition</td>
<td><a href="https://www.pbssocal.org/news-community/l-a-agencies-returned-nearly-150-million-in-unspent-federal-homeless-grants/">PBS SoCal</a></td>
</tr>
<tr>
<td>State can&#39;t judge $24B cost-effectiveness</td>
<td>Cal ICH stopped updating tracking data after FY2020-21 despite continued new funding</td>
<td><a href="https://information.auditor.ca.gov/reports/2023-102.1/index.html">CA State Auditor</a></td>
</tr>
</tbody></table>
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

<div class="pm">
<p class="pm-title">The funnel: where people are lost at each phase</p>
<div class="pm-flow">
<div class="pm-step">
<div class="pm-marker"><span class="pm-dot pm-dot-process"></span><span class="pm-line"></span></div>
<div class="pm-body"><span class="pm-tag pm-tag-process">Outreach</span><p class="pm-label">~37,000 street-outreach clients tracked in one California Policy Lab cohort<small>Only 17% enrolled in interim housing, RRH, or PSH within a year of first contact.</small></p></div>
</div>
<div class="pm-step pm-step-break">
<div class="pm-marker"><span class="pm-dot pm-dot-process"></span><span class="pm-line"></span></div>
<div class="pm-body"><span class="pm-tag pm-tag-process">Interim housing</span><p class="pm-label">Of those who do enroll, fewer than 1 in 5 (under 20%) exit city-funded interim housing into permanent housing<small>More than half of exits go to homelessness or an unknown destination — see <a href="#rp-system">Phases of the Process</a> for the mechanics of "unknown destination."</small></p></div>
</div>
<div class="pm-step">
<div class="pm-marker"><span class="pm-dot pm-dot-process"></span><span class="pm-line"></span></div>
<div class="pm-body"><span class="pm-tag pm-tag-process">RRH or PSH</span><p class="pm-label">Of those who reach permanent placement, PSH shows 94% one-year retention overall<small>RRH's "subsidy cliff" produces a different, generally worse retention profile for people who needed PSH-level support but were sorted toward RRH instead.</small></p></div>
</div>
<div class="pm-step">
<div class="pm-marker"><span class="pm-dot pm-dot-process"></span></div>
<div class="pm-body"><span class="pm-tag pm-tag-process">Aftercare</span><p class="pm-label">Black clients return to homelessness after PSH exit at roughly double the rate of white or Latino clients — a disparity that recurs at every phase of this funnel, not just this one</p></div>
</div>
</div>
<div class="pm-legend">
<span class="pm-legend-item"><span class="pm-legend-dot" style="color:var(--site-ink-muted)"></span>Process step</span>
<span class="pm-legend-item">Dashed red = a documented break point</span>
</div>
</div>

<p>This funnel is why the interim-housing phase gets singled out repeatedly across this site: it&#39;s not the phase with the worst headline number (RRH&#39;s subsidy cliff and CES&#39;s racial-disparity findings are arguably worse in evidence-quality terms) — it&#39;s the phase where the largest <em>number</em> of people are lost, because outreach has already spent its 17% conversion getting them this far.</p>
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

<div class="pm">
<p class="pm-title">The cascade, in sequence</p>
<div class="pm-flow">
<div class="pm-step pm-step-break">
<div class="pm-marker"><span class="pm-dot pm-dot-agency"></span><span class="pm-line"></span></div>
<div class="pm-body"><span class="pm-tag pm-tag-agency">Feb. 2024</span><p class="pm-label">County Auditor-Controller review finds LAHSA can't produce an accurate contractor list, made payments with no contract in place, recovered only $2.5M of $50.8M in cash advances</p></div>
</div>
<div class="pm-step pm-step-break">
<div class="pm-marker"><span class="pm-dot pm-dot-agency"></span><span class="pm-line"></span></div>
<div class="pm-body"><span class="pm-tag pm-tag-agency">Mar. 2025</span><p class="pm-label">Court-ordered Alvarez &amp; Marsal audit finds $2.3-2.4B in City homelessness spending effectively impossible to verify; Judge Carter calls it a "slow train wreck"</p></div>
</div>
<div class="pm-step pm-step-break">
<div class="pm-marker"><span class="pm-dot pm-dot-agency"></span><span class="pm-line"></span></div>
<div class="pm-body"><span class="pm-tag pm-tag-agency">Apr. 2025</span><p class="pm-label">County Board of Supervisors votes to terminate its ~$300M/year contract with LAHSA; LAHSA lays off 284 employees</p></div>
</div>
<div class="pm-step">
<div class="pm-marker"><span class="pm-dot pm-dot-agency"></span><span class="pm-line"></span></div>
<div class="pm-body"><span class="pm-tag pm-tag-agency">Jan. 2026</span><p class="pm-label">New LA County Department of Homeless Services and Housing (HSH) launches, absorbing County functions and staff formerly run through LAHSA</p></div>
</div>
<div class="pm-step pm-step-break">
<div class="pm-marker"><span class="pm-dot pm-dot-agency"></span><span class="pm-line"></span></div>
<div class="pm-body"><span class="pm-tag pm-tag-agency">May 2026</span><p class="pm-label">LAist reports 259 of LAHSA's 758 master-leased units (34%) sitting vacant, costing ~$10.6M/year — see <a href="#rp-system">Phases of the Process</a> for the mechanics</p></div>
</div>
<div class="pm-step pm-step-break">
<div class="pm-marker"><span class="pm-dot pm-dot-agency"></span><span class="pm-line"></span></div>
<div class="pm-body"><span class="pm-tag pm-tag-agency">Jun. 2026</span><p class="pm-label">HUD suspends LAHSA's federal funding entirely, citing "a clear pattern of fraud" and the failure to track empty motel/hotel rooms; LAHSA sues HUD</p></div>
</div>
<div class="pm-step">
<div class="pm-marker"><span class="pm-dot pm-dot-agency"></span></div>
<div class="pm-body"><span class="pm-tag pm-tag-agency">Aug. 2026</span><p class="pm-label">A judge's stay holds pending an August 6 hearing — genuinely unresolved as of this research date whether LAHSA continues as a reduced joint agency, becomes a compliance shell, or is restructured again</p></div>
</div>
</div>
<div class="pm-legend">
<span class="pm-legend-item"><span class="pm-legend-dot" style="color:var(--site-teal)"></span>Agency</span>
<span class="pm-legend-item">Dashed red = a documented break point</span>
</div>
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
<div class="pm">
<p class="pm-title">Inside Safe, as a case study in how agency, tool, and person interact</p>
<div class="pm-flow">
<div class="pm-step">
<div class="pm-marker"><span class="pm-dot pm-dot-agency"></span><span class="pm-line"></span></div>
<div class="pm-body"><span class="pm-tag pm-tag-agency">Agency</span><p class="pm-label">Mayor's Field Intervention Team engages a targeted encampment and offers everyone a motel/hotel room on the spot</p></div>
</div>
<div class="pm-step">
<div class="pm-marker"><span class="pm-dot pm-dot-person"></span><span class="pm-line"></span></div>
<div class="pm-body"><span class="pm-tag pm-tag-person">Person</span><p class="pm-label">Person accepts and moves into a motel room, tracked as "served"</p></div>
</div>
<div class="pm-step pm-step-break">
<div class="pm-marker"><span class="pm-dot pm-dot-tool"></span><span class="pm-line"></span></div>
<div class="pm-body"><span class="pm-tag pm-tag-tool">Tool</span><p class="pm-label">HMIS/Clarity is supposed to log the eventual exit and destination<small>See <a href="#rp-tools">Tools &amp; Systems</a>.</small></p><p class="pm-break-note"><strong>Breaks here:</strong> LAHSA's system lets providers bypass exit logging entirely for this program — the city can keep paying for a motel room for weeks after someone has already left, with no enforced requirement to record it. This is the specific, named mechanism behind the "2,300 people with no public breakdown of what happened to them" figure above.</p></div>
</div>
<div class="pm-step">
<div class="pm-marker"><span class="pm-dot pm-dot-agency"></span></div>
<div class="pm-body"><span class="pm-tag pm-tag-agency">Agency</span><p class="pm-label">Person either reaches permanent housing (~1 in 5 of those served) or returns to unsheltered homelessness (~40% of exits)</p></div>
</div>
</div>
<div class="pm-legend">
<span class="pm-legend-item"><span class="pm-legend-dot" style="color:var(--site-teal)"></span>Agency</span>
<span class="pm-legend-item"><span class="pm-legend-dot" style="color:var(--site-gold)"></span>Tool / system</span>
<span class="pm-legend-item"><span class="pm-legend-dot" style="color:#8a63b0"></span>Person</span>
<span class="pm-legend-item">Dashed red = a documented break point</span>
</div>
</div>

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

<h4>2026-08-01 — Second pass: process-level mechanics, and an explicit analytical frame</h4>
<p>The first pass established <em>that</em> the system breaks in specific places (interim-to-permanent bottleneck, CES matching delays, untracked spending) and <em>how much</em> it costs. This pass went one level deeper on four of those breaks specifically — the actual mechanical steps underneath the headline stats — and added <a href="#rp-sopk">The Analytical Frame</a>, which states explicitly what this project is and isn&#39;t trying to do: not a spending-scandal writeup, but an attempt to see the system the way Deming&#39;s System of Profound Knowledge would, so the findings point at what would actually have to change rather than who to blame.</p>
<div class="callout callout-finding">
<h5>Finding: most of what looks like a "decline" in CES is actually a silent drop-out, not a refusal</h5>
LAHSA policy requires a household's Point of Contact to be refreshed every 90 days or the CES matching software can no longer match them at all — meaning a household can go from "matched" to "unmatchable" purely because a case manager turned over or a phone number changed, with no formal decline ever recorded. This connects directly to the case-manager turnover already documented on <a href="#rp-breaks">Where &amp; Why It Breaks</a>: a Point of Contact is only as stable as the case manager holding it. See the zoomed-in diagram on <a href="#rp-system">Phases of the Process</a>.
</div>

<div class="callout callout-finding">
<h5>Finding: "unknown exit destination" is a tracking artifact, not a mystery</h5>
HUD's own HMIS Data Standards instruct staff to record "no exit interview completed" whenever a client stops showing up before anyone can ask where they're going — a default the system reaches by timing out, not by investigating. This reframes a number that reads as ominous (someone vanished) into a number that's more precisely a measurement failure (no one was in contact at the moment of exit) — an important distinction for a reader assessing how worried to be about that specific statistic. See <a href="#rp-system">Phases of the Process</a>.
</div>

<div class="callout callout-finding">
<h5>Finding: the money mechanics have a genuinely simple villain — a manual, Excel-based reconciliation process between the City and LAHSA</h5>
The court-ordered Alvarez &amp; Marsal audit found the City-to-LAHSA "cash request" process — the mechanism that determines whether LAHSA has money to pay its own providers — is manual, error-prone, and structured so that one discrepancy anywhere in a bundled funding agreement can delay payment for every program in that bundle, whether or not that program caused the discrepancy. This is about as close to a single, fixable root cause as this research has found anywhere on the site. See <a href="#rp-money">The Money</a>.
</div>

<div class="callout callout-finding">
<h5>Finding: LAHSA's own master-leasing program is a live, current illustration of the CES vacancy problem, not just a historical audit finding</h5>
259 of 758 units LAHSA master-leases sat vacant as of May 2026, costing roughly $10.6M/year, while the agency remained contractually obligated to pay full rent regardless of occupancy — removing the normal financial pressure to solve the vacancy quickly. LAHSA's own fix was to loosen front-end eligibility verification rather than add matching capacity, which is itself a clue about where the agency believes its actual bottleneck lives. This episode is cited as one of the specific triggers for HUD's June 2026 funding suspension. See <a href="#rp-system">Phases of the Process</a>.
</div>

<div class="callout callout-question">
<h5>Open question, now more specific than before</h5>
The single most important unread document surfaced in this pass: LAHSA's current governing document for CES matching, "CES PSH Prioritization and Matching Guidance" (revised 4/24/2026), is publicly linked but its full text could not be fetched in this research pass. It likely answers several of the specific open gaps below directly and should be read before treating this site's description of CES ranking logic as final.
</div>

<div class="callout callout-question">
<h5>Open question</h5>
No source found anywhere in either research pass gives a numeric SLA or cap on how long a CES match can sit unresolved, or how many times a specific unit can be declined before an escalation process is triggered. This was searched for directly and repeatedly and appears to be a genuine gap in LA's public documentation, not a research shortfall — worth asking directly of LAHSA/HSH if this project ever gets a live interview with someone inside the system.
</div>

<div class="callout callout-question">
<h5>Methodological note for this pass</h5>
Direct fetching of several primary-source domains (controller.lacity.gov, laist.com, kqed.org, lahsa.org, cacd.uscourts.gov) was blocked at the network level during this research pass, not by the sources themselves. Findings from those domains are sourced through search-engine-mediated summaries, third-party quotation, or outlets mirroring the same reporting — weaker than a direct primary-document fetch, and flagged inline wherever it applies. Load-bearing claims (the LAHSA master-leasing vacancy figures, the "cash request" mechanism, the Halcyon Selfmade and Yolanda Robins cases) were independently cross-checked against multiple outlets before being included.
</div>

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
