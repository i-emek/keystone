# Mehdi and Richard Task Split

## Purpose

This file proposes a practical split of responsibilities between Mehdi and Richard for building Keystone and taking it into the real world. The goal is not equal task count. The goal is clear ownership, fast execution, and a setup that matches each founder's strengths and time constraints.

Important context: this split assumes a pre-funding phase first. Both founders are still employed, and neither should behave as if Keystone is already a full-time company. Full-time dedication should happen only after funding is raised or after a deliberate transition decision.

## Current Reality

Right now, Keystone is not in a full-time founder phase. It is in a pre-funding validation and preparation phase.

That changes the right split significantly:

- the priority is not maximum build speed
- the priority is proving enough to justify funding, conviction, and a later full-time move
- work should focus on the smallest actions that reduce the biggest company risks
- neither founder should create a plan that depends on daily full-time availability

So the correct question is not only "who owns what?" It is also "what deserves founder time before funding at all?"

## Recommended Founder Shape

### Mehdi

Recommended role: Build and execution lead

Best-fit ownership:

- product engineering
- data platform implementation
- technical architecture
- delivery planning and execution
- dev environment, infrastructure, and system reliability
- technical demo readiness

### Richard

Recommended role: Domain, product, and commercial lead

Best-fit ownership:

- domain logic and product truth
- customer discovery and design-partner conversations
- product framing and messaging
- trust, compliance, and procurement narrative
- investor materials and market narrative
- structured feedback loops from customers into roadmap decisions

## Core Principle

The split should follow this rule:

- Mehdi owns the critical path of weekly execution.
- Richard owns the critical path of product relevance and commercial credibility.

That is the right split because Mehdi has fewer time constraints and stronger direct implementation bandwidth, while Richard brings heavier domain experience and stronger product and business framing value.

## Pre-Funding Principle

Before funding, both founders should optimize for evidence, not for volume.

That means:

- do not try to fully build the company before validation
- do not over-invest in production-grade systems before the wedge is proven
- do not split time evenly across too many streams
- spend time on the few activities that de-risk build, demand, and credibility

In practical terms, before funding:

- Mehdi should own building only what is needed to show the wedge clearly
- Richard should own proving that the wedge matters to real buyers

## Recommended Ownership Split

| Area | Primary owner | Secondary owner | Notes |
| --- | --- | --- | --- |
| MVP architecture | Mehdi | Richard | Mehdi decides technical shape; Richard reviews whether it supports the real domain needs. |
| Backend, worker, pipelines | Mehdi | Richard | Mehdi owns implementation. Richard helps define scoring logic, data interpretation, and edge cases. |
| Frontend and user workflows | Mehdi | Richard | Mehdi ships the flows; Richard validates whether the workflow matches operator, approver, and manager reality. |
| Data model and domain schema | Shared | Shared | Richard should shape the business meaning; Mehdi should shape implementation feasibility. |
| Topic-mapping logic | Mehdi | Richard | Mehdi owns the engine build; Richard owns what a good output should look like. |
| Coverage and authority scoring | Shared | Shared | Richard should define what "credible expert", "warm backup", and risk thresholds mean; Mehdi turns that into a reproducible system. |
| Workspace setup and team-import rules | Mehdi | Richard | Mehdi builds the flow; Richard validates what org setup information buyers will expect. |
| Product requirements and scope control | Richard | Mehdi | Richard should filter noise and keep the product meaningful; Mehdi should push back on scope that breaks delivery. |
| Design-partner discovery | Richard | Mehdi | Richard leads most interviews; Mehdi joins technical or product-deep calls. |
| Sales conversations | Richard | Mehdi | Richard should lead discovery and value framing; Mehdi joins for architecture, trust, and demo depth. |
| Investor deck and fundraising narrative | Richard | Mehdi | Richard leads market, problem, and differentiation narrative; Mehdi leads product credibility and technical defensibility. |
| Demo environment and investor demo | Mehdi | Richard | Mehdi owns reliability and flow; Richard owns story and framing. |
| Compliance positioning and trust bundle | Richard | Mehdi | Richard owns the narrative and checklist; Mehdi provides the real technical controls behind it. |
| Security and data-handling implementation | Mehdi | Richard | Mehdi owns the actual controls; Richard ensures they are explained in business language. |
| Operations, cadence, and delivery tracking | Mehdi | Richard | Mehdi should run weekly execution. |
| Legal, contracts, procurement prep | Richard | Mehdi | Richard owns founder-side coordination; Mehdi supports technical answers. |
| Hiring plan and advisor outreach | Richard | Mehdi | Richard should help shape the non-engineering side; Mehdi should define technical hiring needs. |

## What Mehdi Should Primarily Own

### 1. Product build

- monorepo and engineering setup
- backend and worker implementation
- database and data models
- connectors and ingestion pipelines
- topic-map engine implementation
- coverage and scoring engine implementation
- audit and trust technical controls
- frontend delivery for the main MVP flows

Pre-funding limit:

- focus on prototype-grade or MVP-grade build only
- avoid heavy platform hardening unless it unlocks trust for demos or design partners
- build enough to demonstrate the bus-factor audit wedge end to end

### 2. Technical product decisions

- what gets built first
- how to reduce scope without weakening the product
- how to preserve future extensibility without overbuilding
- system quality, observability, and release readiness

### 3. Technical founder responsibilities

- technical demos
- investor technical diligence
- security architecture answers
- hiring technical profiles
- engineering process and repo hygiene

### 4. Time-sensitive execution work

These are the tasks Mehdi should own because they suffer most from interruptions:

- implementation tasks with daily dependencies
- bug fixing and integration work
- environment setup and broken build issues
- sprint-level planning and reprioritization
- anything blocking the next product milestone

## What Richard Should Primarily Own

### 1. Product meaning and business value

- define what the product should actually say and why it matters
- define what good outputs look like for topic mapping and scoring
- pressure-test whether the product speaks to VPE, CTO, and EM realities
- decide which workflows are meaningful enough to deserve MVP space

### 2. Customer and market work

- design-partner outreach
- discovery interviews
- problem validation
- ICP sharpening
- competitor positioning and messaging refinement
- turning feedback into structured decisions

Pre-funding limit:

- prioritize buyer discovery, design-partner conversations, and product truth over broad business admin work
- do not spend too much time polishing fundraising or enterprise materials before strong problem validation exists

### 3. Trust, compliance, and enterprise readiness

- maintain risk and compliance notes
- shape the trust bundle
- prepare procurement-facing artifacts such as security and compliance summaries
- help define the advisory-only boundary in product language
- flag legal or reputational cliff risks early

### 4. Investor and founder narrative work

- investor story and pitch structure
- market narrative and why-now framing
- ROI framing and business case
- case-study structure
- advisor and partner outreach

### 5. Flexible but high-value work

These are especially suitable for Richard because they can be done in heavier bursts during free weeks and lighter async review during constrained weeks:

- document review
- scoring and taxonomy feedback
- strategy writing
- customer interview prep and synthesis
- pitch and memo iteration
- compliance and trust material drafting

## Shared Decisions That Should Never Be Owned By Only One Founder

- final MVP scope changes
- target customer definition
- pricing direction
- investor messaging
- any shift from advisory product toward people-decision support
- any decision that materially changes compliance exposure
- founder hiring decisions

## Weekly Operating Model

Because Richard's availability changes every other week, the operating model should reflect that openly instead of pretending both founders have equal execution capacity every week.

### Richard free week

Richard should take the heavier external and strategic load:

- customer and advisor calls
- investor conversations
- deep product review sessions
- scoring and taxonomy workshops
- documentation and strategy iterations
- sales or partner outreach

### Richard constrained week

Richard should avoid being on the engineering critical path.

Best work for constrained weeks:

- async review of product docs
- shorter decision reviews
- customer follow-up emails
- deck edits
- compliance and trust writing
- light roadmap feedback

### Mehdi every week

Mehdi should carry the stable delivery rhythm every week:

- run the build plan
- unblock implementation
- keep demos working
- maintain product momentum
- convert founder decisions into shipped progress

## Pre-Funding Operating Model

This is the model I would actually recommend until funding is raised.

### Main objective before funding

Reach enough proof on three questions:

1. Can we build the core wedge credibly?
2. Do VPEs, CTOs, or engineering leaders care enough to buy it?
3. Can we tell a believable investor and design-partner story around it?

### Mehdi before funding

Primary mission:

- build the smallest credible demo or MVP slice
- keep technical decisions lightweight and reversible
- create an end-to-end product story that can be shown, not just described

Best use of time before funding:

- architecture and repo setup only as much as needed
- the ingestion, topic, and audit wedge
- demo reliability
- technical notes that support investor and customer trust

Avoid before funding:

- overbuilding infrastructure
- building too many post-MVP workflows
- polishing internal systems with no validation value

### Richard before funding

Primary mission:

- validate that the product matters to real buyers
- sharpen the scoring and product logic
- shape the market, investor, and compliance story

Best use of time before funding:

- design-partner outreach
- discovery calls
- product narrative refinement
- scoring and workflow review
- trust and compliance positioning
- advisor and investor relationship building

Avoid before funding:

- becoming a blocker for day-to-day engineering delivery
- spending too much time on materials nobody is asking for yet
- taking on operational tasks that can wait until funding or incorporation needs them

## Suggested Time Allocation

This is not about equity or importance. It is about execution reality.

### Mehdi

- 60 to 75 percent product build and technical execution
- 10 to 15 percent product decisions and review
- 10 to 15 percent demo, founder, and investor support
- 5 to 10 percent ops, planning, and coordination

### Richard

- 30 to 40 percent customer and market work
- 20 to 25 percent product and domain shaping
- 15 to 20 percent investor and narrative work
- 10 to 20 percent trust, compliance, and procurement readiness
- remaining time on strategic reviews and founder decisions

These percentages are not full-time company percentages. They are relative shares of the limited Keystone time each founder can realistically spend while still employed.

## Recommended Split By Development Block

| Development block | Mehdi role | Richard role |
| --- | --- | --- |
| Setup and foundations | Lead | Review for future business and trust requirements |
| Workspace setup | Lead | Define what org setup and team structure must be supported |
| Data ingestion | Lead | Define source importance, business interpretation, and onboarding realism |
| Topic-map engine | Lead build | Lead output-quality review |
| Audit MVP | Lead build | Lead framing of what makes the output credible to leadership |
| Search and discovery | Lead build | Validate whether the answers are useful for real EM and VPE workflows |
| Trust layer | Implement controls | Lead trust narrative, access-policy review, and audit expectations |
| Polish and release prep | Lead delivery | Lead external readiness: docs, narrative, procurement, and pitch materials |

## Recommended Split For Non-Technical Startup Work

| Area | Primary owner | Notes |
| --- | --- | --- |
| Company setup and founder administration in Germany | Shared, with Richard leading coordination | This includes legal structure, agreements, tax/accounting setup, and operational founder paperwork. |
| Fundraising process | Richard | Mehdi should join technical diligence and selected pitch meetings. |
| Design-partner pipeline | Richard | This is too important to leave as a side task. |
| Investor updates | Richard | Mehdi contributes product progress and technical milestones. |
| Demo preparation | Mehdi | Richard refines the business story around the demo. |
| Pricing and packaging hypotheses | Richard | Mehdi should challenge what is expensive to deliver. |
| Advisor recruitment | Richard | Especially VPE, CTO, and AI-governance advisors. |
| Technical hiring | Mehdi | Richard participates for fit and company-building judgment. |
| Commercial hiring | Richard | Only after validation starts to convert. |

## What Actually Matters Before Funding

If you are both still employed, I would reduce the real pre-funding focus to these five tracks only:

1. Build the smallest compelling demo
2. Validate the buyer pain with real conversations
3. Define the scoring and audit logic well enough to be credible
4. Prepare a simple investor and design-partner story
5. Decide what proof would justify quitting after funding

Everything else is secondary until those five are moving.

## Suggested Pre-Funding Split

### Mehdi

- build the product wedge
- prepare demos
- document technical architecture at a lightweight level
- support investor and customer technical questions

### Richard

- run discovery and design-partner outreach
- refine positioning, messaging, and scoring meaning
- shape compliance and trust narrative
- support investor conversations and fundraising material

### Shared

- major roadmap decisions
- founder alignment
- legal and company setup only when needed
- funding strategy and fundraising readiness

## Important Warnings

### 1. Do not split ownership of the same execution area 50/50

That usually creates ambiguity and slows decisions. Each area should have one clear primary owner.

### 2. Richard should not be on the weekly engineering critical path

His time pattern makes him more valuable in product truth, external validation, and strategic work than in tasks that depend on daily uninterrupted progress.

### 3. Mehdi should not become engineering-only

If Mehdi only builds and never joins discovery, sales, or investor conversations, product quality will drift away from the real buyer context.

### 4. GTM still looks like a gap

Richard can lead a large part of product, customer, and narrative work, but if neither founder can consistently own founder-led selling, pipeline-building, and outbound, then GTM remains a real company risk.

### 5. Do not act like a funded startup before funding

If both founders are still employed, the biggest mistake is pretending the company already has full-time execution capacity. That usually leads to oversized plans, frustration, and fake urgency.

The better move is to make the pre-funding phase narrow and proof-driven.

## The Cleanest Practical Split

If you want the simplest summary for the Excel sheet, use this:

- Mehdi: product build, engineering, architecture, implementation, demos, technical diligence
- Richard: product meaning, scoring logic, customer discovery, compliance/trust narrative, investors, advisors, partnerships
- Shared: major scope decisions, pricing direction, fundraising strategy, legal risk boundaries, founder/company setup when needed

Pre-funding interpretation:

- Mehdi is the build lead
- Richard is the validation and narrative lead
- neither founder should carry unnecessary full-time-company overhead yet

## Short Excel-Ready Version

| Area | Mehdi | Richard |
| --- | --- | --- |
| Engineering and implementation | Primary owner | Reviewer |
| Architecture and infra | Primary owner | Reviewer |
| Data pipelines and engines | Primary owner | Domain reviewer |
| Product scope and workflows | Secondary owner | Primary owner |
| Scoring meaning and output quality | Secondary owner | Primary owner |
| Customer discovery and design partners | Support | Primary owner |
| Investors and deck narrative | Support | Primary owner |
| Demo delivery | Primary owner | Story owner |
| Trust, compliance, and procurement narrative | Technical support | Primary owner |
| Legal and company setup in Germany | Shared | Shared |
| Hiring engineers | Primary owner | Support |
| Advisor and partner outreach | Support | Primary owner |

## Short Pre-Funding Version

| Area | Mehdi | Richard |
| --- | --- | --- |
| Build the demo wedge | Primary owner | Reviewer |
| Validate buyer pain | Support | Primary owner |
| Define scoring and output meaning | Secondary owner | Primary owner |
| Demo and technical credibility | Primary owner | Support |
| Investor and market narrative | Support | Primary owner |
| Compliance and trust story | Technical support | Primary owner |
| Founder alignment and funding decision | Shared | Shared |