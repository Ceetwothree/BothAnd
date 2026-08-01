---
title: Tools & Systems
description: HMIS, Coordinated Entry, the VI-SPDAT assessment tool and its documented bias problems, and the interoperability failures underneath LA's homelessness response.
status: researched
updated: 2026-08-01
subtitle: The software and assessment instruments that decide who gets what — and how well they actually work.
---

## HMIS (Homeless Management Information System)

HMIS is the HUD-mandated data infrastructure requirement: any CoC receiving HUD funding must operate one, and any provider receiving CoC/ESG funds is generally required to enter client data into it. LAHSA administers LA's HMIS using the vendor platform **Clarity Human Services**, built by **Bitfocus**.

<div class="callout callout-fails">
<h4>A concrete, damning data failure: exit logging can be bypassed</h4>
In 2026 reporting, LA councilmembers reacted with fury (Councilmember Bob Blumenfield: "That's horrifying") on learning that LAHSA's system lets providers <strong>bypass logging when someone exits the Inside Safe motel-shelter program</strong> — meaning the city could be paying for empty motel rooms for weeks after someone left, with no enforced requirement to log exits, on a program the Council has authorized $300 million for. <a href="https://laist.com/news/housing-homelessness/inside-safe-homeless-service-data-problems-lahsa-la-councilmembers-bass">LAist, "'Horrifying' Homeless Service Data Problems Prompt Fury From LA Councilmembers"</a>
</div>

LAHSA itself commissioned a Homeless Data Assessment (funded via the Hilton Foundation) examining the state of its own data collection — an internal acknowledgment that data quality is a live, unsolved concern rather than a settled one.

## Coordinated Entry System (CES) and the assessment tool

LA's CES has historically used the **VI-SPDAT** (Vulnerability Index – Service Prioritization Decision Assistance Tool) to score and prioritize people for permanent supportive housing. As of 2025–2026, LA is actively transitioning to a successor, the **LA HAT (Los Angeles Housing Assessment Tool)** — implementation milestones were last updated January 2026 and FAQs updated April 2026, meaning the rollout is still in progress as of this research date.

<div class="callout callout-fails">
<h4>The VI-SPDAT has a real, published bias record — not just anecdotal complaints</h4>
Peer-reviewed and advocacy research found the tool systematically underperforms for Black populations, especially Black women — one study found white women scored consistently <em>higher</em> on vulnerability than Black women and most men, despite similar rates of trauma/abuse history, attributed to documented reluctance among Black respondents (rooted in historic institutional mistrust) to disclose formal healthcare use, mental-health history, or illicit behavior to an intake worker — the very things the tool scores on. <a href="https://homelesshub.ca/blog/2021/racial-and-gender-bias-vi-spdat/">HomelessHub</a>
</div>

The tool's own creator, Ian DeJong, publicly disavowed it as an intake instrument years before its maintainer, OrgCode, formally announced in December 2020 it would stop developing it — explicitly citing "communities' persistent misuse of the tool" and the need to "accelerate activities to improve approaches that further promote racial and gender equity." Its underlying validation was also weak: it was built heavily on data from a single northeastern U.S. city, from a largely male sample, analyzed for likelihood of *death* rather than validated against a "vulnerability" threshold it's actually used to measure — a mismatch between what was measured and what the tool is used for. Because scores directly determine housing-resource priority, there's also documented concern (echoed in comparable-tool literature, e.g. Allegheny County's algorithmic housing tool) about both provider-side "coaching" of answers and client-side underreporting due to stigma — both distort who actually gets prioritized.

LA HAT is designed to separate "vulnerability" (harm a person faces if unhoused) from "acuity" (services needed to stay housed), and to explicitly account for systemic barriers like housing discrimination rather than relying solely on individual-deficit questions — a direct response to the critiques above. No independent (non-LAHSA) evaluation of whether LA HAT actually reduces the documented racial disparities was found — it's still mid-rollout.

<div class="callout callout-fails">
<h4>Mayor Bass has called the CES it feeds "dysfunctional"</h4>
"The current coordinated entry system is dysfunctional, impractical and inequitable," she's said publicly, noting housing units can sit vacant "for far too long" while the matching process runs. See <a href="breaks.html">Where &amp; Why It Breaks</a>.
</div>

## Case management software: Clarity Human Services (Bitfocus)

Clarity is the cloud-based platform LAHSA licenses from Bitfocus as LA's HMIS front end — built to help providers stay compliant with HUD CoC/ESG and other federal-partner reporting requirements, with a client-facing portal.

## Interoperability failures

<div class="callout callout-fails">
<h4>LA County ran a data system that doesn't talk to HMIS at all</h4>
LA County separately ran a proprietary data system that does not connect to HMIS, forcing some providers to manually double-enter client data into both systems. As reporting on this put it: "manually double-entering things opens the door for all sorts of errors" — small data-entry mistakes can directly affect whether someone is recorded as sheltered or not, a direct mechanical link between an IT architecture choice and a person's real housing status as the system records it.
</div>

City and county entities have separately, publicly acknowledged they're working to improve data sharing specifically between the homelessness and mental-health systems (HMIS/Clarity and DMH's clinical records) — again, an admission this integration hasn't historically existed. The Inside Safe exit-logging bypass described above is itself an interoperability/accountability failure: the mayor's signature program's outcome data isn't reliably captured by the system meant to track it.

## Encampment-tracking tools

- **LASAN's CARE/CARE+ program** (launched Oct. 2019) deploys 17 CARE teams and 13 CARE+ teams (the latter embedding LAHSA outreach workers alongside sanitation staff) for encampment cleanups. No dedicated, named software/tracking platform for CARE/CARE+ deployment or outcome tracking was found — city documentation describes team structure and legal protocol (LAMC 56.11) but not a specific case-management or GIS tool.
- **Inside Safe** has no distinct, named encampment-tracking system separate from HMIS/Clarity and general city reporting. City Controller Kenneth Mejia's public **Homelessness Dashboard** is the most visible tracking tool, but it's explicitly a Controller's-office accountability project, not an operational tool outreach teams themselves use.
- **County encampment response**: LA County Public Health issues countywide Encampment Resolution Guidance (a policy document, not software); no named county encampment-tracking system distinct from HMIS was identified.

<div class="callout callout-question">
<h4>An unexpected gap</h4>
Despite the volume of city/county reporting on encampment operations, no purpose-built encampment-tracking IT system (comparable to how Clarity/HMIS is named for case management) surfaced in this research. Tracking appears to happen through some combination of Clarity/HMIS entries, LASAN's internal systems, council-office spreadsheets, and after-the-fact Controller's-office dashboards — not one authoritative real-time system.
</div>
