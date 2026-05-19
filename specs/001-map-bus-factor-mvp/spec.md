# Feature Specification: Keystone Map MVP

**Feature Branch**: `001-map-bus-factor-mvp`  
**Created**: 2026-05-14  
**Status**: Draft  
**Input**: User description: "We aim to build the product mentioned in the english folder, but we don't need to take what has been mentioned there blindly. We aim to respect the constitution, and build the MVP in the most optimised way so we could present it to investors or interested parties, however, still respect the best implementation that would allow smooth development and expansion to a mature/robust product"

## Clarifications

### Session 2026-05-14

- Q: Which data sources define the Tier-1 Map MVP? -> A: Git repositories, Jira, and Confluence are in the MVP; Slack is deferred.
- Q: What is the minimum source requirement for a publishable first audit? -> A: Git is mandatory, plus either Jira or Confluence.
- Q: Which Git providers are supported in the MVP? -> A: Both GitHub and GitLab are supported in the MVP.
- Q: What encryption posture defines the pooled Tier-1 Map MVP? -> A: Encrypt data in transit and at rest, with an added tenant-specific application-level encryption layer for sensitive Map data.
- Q: What identity protection model applies in the MVP? -> A: Contributor identities are pseudonymized by default and re-identified only in authorized tenant views.
- Infrastructure clarification: The MVP defaults to a low-cost shared-tenant hosting model, while preserving a clean migration path to provider-hosted per-tenant deployments and customer-hosted deployments in client infrastructure.
- Implementation clarification: TypeScript remains frontend-only, while Python is used for the backend API, connector orchestration, and worker services.

### Session 2026-05-15

- Delivery clarification: Development and MVP validation happen locally first, and cloud deployment is deferred until the product is stable enough to justify the ongoing hosting cost.

### Session 2026-05-17

- Q: What scope of scenario simulation belongs in the MVP? -> A: Include only a simple person-loss impact preview per topic or team; broader reorg or allocation simulation remains post-MVP.
- Q: What hierarchy scope belongs in the MVP? -> A: Support a simple team and sub-team hierarchy for display, filtering, and scoping of topics, audits, and search.
- Q: What does topic activity mean in the MVP? -> A: Include a richer per-topic activity timeline with contributor-level breakdowns and recent changes.
- Q: Which roles may re-identify contributors in the MVP? -> A: VPE/CTO-level roles and engineering managers may re-identify contributors, with engineering managers limited to their scoped teams and all requests requiring justification and audit logging.
- Q: Which source should be prioritized first when post-MVP connector expansion begins? -> A: Bitbucket is the first post-MVP connector priority.
- Q: What algorithm shape should topic-map bootstrap use? -> A: Use a hybrid pipeline with deterministic preprocessing, embeddings/clustering, structural signals where available, and targeted LLM labeling or refinement rather than sending all raw activity end-to-end to an LLM.
- Q: What should the default topic granularity be in the MVP? -> A: Default to medium-broad service or domain-level topics, with manual split and merge refinement.
- Q: How should low-confidence ambiguous activity be handled during topic bootstrap? -> A: Place it into a low-confidence needs-review or unassigned bucket rather than forcing it into a topic.
- Q: How should sources be weighted during topic bootstrap? -> A: Weight Git activity highest, use Jira or Confluence as strong supporting context, and increase confidence when sources agree.
- Q: What raw data may the LLM see during topic bootstrap? -> A: The LLM may see representative summaries or selected snippets only for ambiguous clusters or refinement steps, not broad raw activity batches.
- Q: What should the authority score primarily reward? -> A: Use a blended score centered on sustained contribution breadth plus review or ownership signals, with recency as a modifier rather than the main driver.
- Q: What qualifies someone as a warm backup in the MVP? -> A: A warm backup needs meaningful but secondary evidence across enough activity or time to be credible, while remaining below the primary authority holder.
- Q: How should confidence be represented in the MVP? -> A: Show low, medium, and high confidence to users, backed by an internal numeric score and thresholds.
- Q: How should BF1, BF2, and mentor-loss risks be defined in the MVP? -> A: BF1 means one dominant authority with no credible bench, BF2 means authority concentrated in the top two contributors with weak bench behind them, and mentor-loss means losing a mentoring or review-heavy bridge contributor would materially weaken readiness.
- Q: What minimum evidence threshold should gate scoring outputs in the MVP? -> A: Allow provisional outputs from strong single-source evidence, but require corroboration or stronger sustained evidence before high-confidence coverage and risk flags are shown.
- Q: What compliance gate is required before the first audit can be published? -> A: Require a workspace-admin attestation during onboarding that the customer's lawful basis and required worker notices are in place, and block first publish until it is completed.

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Publish First Bus-Factor Audit (Priority: P1)

As a Staff or Principal Engineer acting as the setup operator, I want to connect
GitHub or GitLab repositories together with Jira and Confluence when available,
review the initial topic map, and publish the first bus-factor audit so leadership
can see structural knowledge risk without waiting for a heavy implementation or
compliance-heavy scoring system.

**Why this priority**: This is the product wedge, the clearest investor demo, and
the first independently valuable outcome for a design partner.

**Independent Test**: A new customer workspace with sufficient recent activity from
GitHub or GitLab plus either Jira or Confluence can complete setup, confirm critical
topics, and publish a bus-factor audit that highlights single points of failure and
thin-coverage topics.

**Acceptance Scenarios**:

1. **Given** a customer has connected GitHub or GitLab and at least one of Jira or
  Confluence and enough recent history is available, **When** the operator reviews
  the proposed topic map and the approver confirms critical topics, **Then** the
  system publishes a current bus-factor audit with topic risk, primary owner
  coverage, backup coverage, and visible confidence context.
2. **Given** a customer has incomplete or thin source coverage, **When** a user
   tries to publish the audit, **Then** the system withholds the result and states
   what evidence is missing.
3. **Given** the workspace admin has not completed the required compliance
  attestation, **When** a user tries to publish the first audit, **Then** the
  system blocks publication and states that lawful-basis and worker-notice
  confirmation must be completed first.

---

### User Story 2 - Find Topic Experts and Warm Backups (Priority: P2)

As an Engineering Manager or Staff Engineer, I want to search for a topic and see
who likely knows it best, plus who could back them up, so I can make onboarding,
handoff, and planning decisions faster.

**Why this priority**: This creates day-to-day utility beyond the headline audit and
gives teams a reason to keep using the product after the first demo.

**Independent Test**: A team user can search for a supported topic and get a ranked,
actionable answer that includes both likely experts and warm backups.

**Acceptance Scenarios**:

1. **Given** a topic has sufficient evidence, **When** a manager searches for that
   topic, **Then** the system returns a ranked set of likely experts and warm
   backups with confidence and coverage context.
2. **Given** a topic is ambiguous or under-supported, **When** a user searches for
   it, **Then** the system either asks the operator to refine the topic map or shows
   that the answer is not yet reliable enough to use.

---

### User Story 3 - Review Why the Map Can Be Trusted (Priority: P3)

As a VPE, EM, or designated stakeholder, I want to understand why a topic is shown
as risky or well-covered, what changed over time, and who approved key map changes,
so I can rely on the output in internal discussions without treating it as an opaque
black box.

**Why this priority**: Trust, explainability, and auditable change history make the
MVP credible to investors, design partners, and internal approvers.

**Independent Test**: A stakeholder can inspect a published topic result, see the
supporting evidence context, and review the change history behind the current map.

**Acceptance Scenarios**:

1. **Given** a published map contains a high-risk topic, **When** a stakeholder opens
   that topic, **Then** the system shows the evidence coverage, the confidence level,
   and the latest approved map state that produced the result.
2. **Given** the operator renames, merges, or reclassifies a topic, **When** a
   stakeholder reviews the change history, **Then** they can see what changed, who
   changed it, and when it affected published outputs.

---

## MVP Scope & Expansion Path *(mandatory)*

**MVP Slice**: A Tier-1 Map product for one customer organization that supports
lightweight onboarding for GitHub and GitLab repositories and either Jira or
Confluence, optional support for the third source when available, a simple team
and sub-team hierarchy for display, filtering, and scoping, topic-map review,
critical-topic confirmation, Bus-Factor Audit, Knowledge Discovery,
confidence/coverage gating, auditable map history, a richer per-topic activity
timeline with contributor-level breakdowns and recent changes, a simple
person-loss impact preview per topic or team, and a low-cost shared-tenant
hosting model for the initial release.

**Out of Scope for MVP**:

- Pulse metrics, burnout signals, sprint realism, or any broader
  activity/engagement product tier beyond topic-specific activity context
- Reorg Discovery, full reorg simulation, broader resource reallocation
  simulation, retention-risk, promotion, or layoff decision support
- Slack-based collaboration signals in the initial MVP release
- Cross-customer benchmarking, self-host deployment, and EU-region delivery

**Expansion Path**: The MVP centers on a reusable evidence graph, versioned topic
map, published coverage snapshots, tenant-aware boundaries, and a narrow
person-loss preview seam so later tiers can add richer analytics, broader
simulation, provider-hosted per-tenant environments, and customer-hosted
deployments without redefining the core customer data, approval flow, or audit
history. When source expansion resumes after the MVP, Bitbucket is the first
connector priority ahead of later Notion-, Slack-, or other source additions.

## Edge Cases

- What happens when a customer connects only one source or has less history than is
  needed for a trustworthy answer?
- How does the system handle teams where key knowledge holders create little code but
  contribute heavily through reviews, tickets, or documentation?
- What happens when one concept appears under multiple team-specific names and the
  initial topic map splits or merges it incorrectly?
- How does the system behave when an organization has recently reorganized and the
  latest evidence conflicts with historical ownership patterns?
- What happens when a user has permission to view a team's risk summary but not the
  underlying identities for all contributors?

## Trust, Compliance & Safety *(mandatory)*

- **Decision Support Boundary**: This feature provides topic coverage and structural
  resilience insight only. It does not produce employee rankings, automated personnel
  actions, or hidden performance judgments. Human approval remains mandatory for
  critical-topic confirmation and any downstream organizational decision.
- **Auditability**: Every published map result must preserve its snapshot date,
  evidence coverage context, confidence state, topic lineage, and the history of key
  operator or approver changes that materially shaped the visible output.
- **Data Handling**: The MVP uses only the customer activity required from GitHub
  or GitLab repositories plus either Jira or Confluence for Tier-1 Map use cases,
  supports the third source when available, assumes US-first and English-first
  rollout, excludes protected attributes and HR data from production logic, defers
  Slack-based collaboration data, encrypts all customer traffic and stored data, adds
  a tenant-specific encryption layer for sensitive Map records in the pooled tier,
  limits model-assisted topic bootstrap to representative summaries or selected
  snippets for ambiguous clusters rather than broad raw activity batches,
  requires a workspace-admin attestation during onboarding that the customer's
  lawful basis and any required worker notices are in place before the first
  audit can be published,
  pseudonymizes contributor identities by default, allows re-identification only in
  authorized tenant views for VPE/CTO-level roles and engineering managers within
  their scoped teams, requires justification and audit logging for every
  re-identification request, preserves tenant-scoped access boundaries appropriate
  to a lower-sensitivity advisory product tier, and keeps customer tenancy separable
  so the same product can later run in shared-tenant, provider-hosted per-tenant,
  or customer-hosted environments.
- **Failure Posture**: If evidence is too sparse, too stale, too ambiguous, or too
  restricted to support a reliable answer, the system must block the output, explain
  why, and direct the operator toward additional data or map refinement.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: The system MUST allow a customer to connect either GitHub or GitLab
  repositories and at least one of Jira or Confluence as the minimum source set for
  the MVP and start building a first map from them.
- **FR-001b**: The system MUST support both GitHub and GitLab as first-class Git
  repository providers in the MVP.
- **FR-001a**: The system MUST support the remaining source as an optional additional
  input when the customer has it available.
- **FR-001c**: The system MUST support a simple team and sub-team hierarchy for a
  customer workspace and use it to scope displayed topics, audits, and topic
  search results without requiring full org-model history or reorg analytics.
- **FR-002**: The system MUST generate an initial topic map that groups customer work
  into medium-broad service or domain-level engineering topics and ownership
  candidates by default, with confidence and lineage hints for operator review.
- **FR-002a**: The system MUST generate draft topics through a hybrid topic-mapping
  pipeline that combines deterministic source signals, semantic clustering, and
  targeted model-assisted labeling or refinement so the MVP stays cost-effective
  without requiring end-to-end LLM processing of all raw activity.
- **FR-002b**: The system MUST place low-confidence or ambiguous activity into a
  needs-review or unassigned bucket rather than forcing every activity into a
  draft topic during bootstrap.
- **FR-002c**: The system MUST weight Git activity as the strongest default signal
  during topic bootstrap, use Jira or Confluence as supporting context, and raise
  topic confidence when multiple sources agree on the same topic interpretation.
- **FR-002d**: The system MUST limit model-assisted topic labeling or refinement to
  representative summaries or selected snippets for ambiguous clusters rather than
  broad raw activity batches so the bootstrap pipeline remains cost-effective and
  privacy-bounded.
- **FR-003**: The system MUST allow an operator to review, rename, merge, split, and
  confirm proposed topics before the map is published.
- **FR-004**: The system MUST allow an approver to mark business-critical topics and
  publish the first map with minimal approval effort.
- **FR-004a**: The system MUST block the first audit publish until a workspace admin
  attests during onboarding that the customer's lawful basis and required worker
  notices are in place for the planned use of the product.
- **FR-005**: The system MUST generate a bus-factor audit that identifies topics with
  single coverage or thin backup coverage.
- **FR-005a**: The system MUST define BF1 risk as one dominant authority with no
  credible bench, BF2 risk as authority concentrated in the top two contributors
  with weak bench behind them, and mentor-loss risk as the loss of a mentoring
  or review-heavy bridge contributor that would materially weaken topic
  readiness.
- **FR-006**: The system MUST allow authorized team users to search for a topic and
  see ranked likely experts and warm backups.
- **FR-006a**: The system MUST rank topic authority through a blended score that
  primarily rewards sustained contribution breadth plus review or ownership
  signals, while treating recency as a modifier rather than the main ranking
  driver.
- **FR-006b**: The system MUST treat a warm backup as a contributor with meaningful
  but secondary evidence across enough activity or time to be credible for the
  topic, while remaining below the primary authority holder.
- **FR-007**: The system MUST show confidence and coverage context for every visible
  topic answer and audit finding.
- **FR-007b**: The system MUST represent topic and coverage confidence to users as
  low, medium, or high while computing that result from an internal numeric score
  and thresholds.
- **FR-007a**: The system MUST provide a per-topic activity view that shows recent
  change history and contributor-level activity breakdowns as supporting context
  for topic understanding.
- **FR-008**: The system MUST block or suppress outputs that do not meet the minimum
  evidence threshold and explain what is missing.
- **FR-008a**: The system MUST allow provisional topic outputs to appear from strong
  single-source evidence, but MUST require corroborating evidence from another
  source or stronger sustained evidence before surfacing high-confidence
  coverage results and BF1, BF2, or mentor-loss risk flags.
- **FR-009**: The system MUST keep the product advisory-only by prohibiting automated
  people decisions, comparative employee ranking, and hidden performance scoring.
- **FR-010**: The system MUST record auditable history for topic changes,
  critical-topic approvals, and published map snapshots.
- **FR-011**: The system MUST enforce role-based visibility so users see only the
  views appropriate to their scope and permissions.
- **FR-012**: The system MUST preserve prior published snapshots so customers can see
  how topic coverage changed over time.
- **FR-013**: The system MUST protect customer data with encryption in transit,
  encryption at rest, and an added tenant-specific encryption layer for sensitive
  Map data stored in the pooled MVP environment.
- **FR-014**: The system MUST store contributor identities in pseudonymized form by
  default and allow re-identification only for authorized tenant roles and views.
- **FR-014b**: The system MUST restrict re-identification to VPE/CTO-level roles
  and engineering managers within their scoped teams, and MUST require
  justification plus audit logging for every re-identification event.
- **FR-014a**: The system MUST support a simple person-loss impact preview for an
  approved topic or team that shows how coverage and warm-backup posture would
  change if one selected contributor became unavailable.
- **FR-015**: The system MUST support a low-cost shared-tenant hosting model as the
  default deployment posture for MVP customers.
- **FR-016**: The system MUST preserve a migration path from the shared-tenant MVP to
  provider-hosted per-tenant deployments without changing the core customer data,
  role model, or audit history expectations.
- **FR-017**: The system MUST preserve a migration path to customer-hosted
  deployments in client infrastructure for later production and enterprise usage.

### Key Entities *(include if feature involves data)*

- **Customer Workspace**: A single customer environment containing connected work
  sources, user roles, an optional simple team and sub-team hierarchy, map
  settings, and published coverage snapshots.
- **Topic**: A named area of engineering knowledge or ownership, including its
  criticality status, lineage, and current coverage state.
- **Contributor Profile**: A pseudonymized person represented across connected work
  sources whose participation can support topic coverage, subject to role-based
  visibility rules and controlled re-identification in authorized views.
- **Activity Evidence**: A trace of work that contributes to topic understanding,
  confidence, and coverage conclusions.
- **Coverage Snapshot**: A point-in-time view of experts, warm backups, bus-factor
  state, confidence, and evidence coverage for the current map.
- **Topic Activity View**: A time-ordered summary of recent topic-related changes
  and contribution patterns used to explain freshness, momentum, and who has been
  active around a topic.
- **Map Change Record**: A logged operator or approver action that changes topic
  meaning, criticality, or published output lineage.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: A design-partner customer can reach a first publishable map and
  bus-factor audit within 7 calendar days of connecting the MVP sources.
- **SC-002**: VPE or CTO approver touch time for initial critical-topic confirmation
  stays under 10 minutes in at least 80% of pilot onboardings.
- **SC-003**: In pilot evaluations, at least 80% of first bus-factor audits surface
  one or more previously unrecognized single-point-of-failure or thin-coverage
  topics.
- **SC-004**: In observed pilot sessions, authorized users can answer "who knows X?"
  in under 2 minutes for at least 90% of supported topic lookups.
- **SC-005**: At least 85% of published topic results reviewed during pilot
  calibration are judged directionally correct by the customer's operator or
  approver.
- **SC-006**: 100% of published outputs maintain decision-support boundaries by
  showing visible confidence context and avoiding automated personnel actions or
  hidden ranking behavior.
- **SC-007**: 100% of MVP environments used for pilot customers enforce the defined
  encryption posture for customer traffic, stored customer data, and sensitive Map
  records before a customer audit is published.
- **SC-008**: 100% of pilot customer environments enforce pseudonymized contributor
  storage by default, with named contributor views limited to authorized tenant
  roles before a customer audit is published.
- **SC-008a**: 100% of pilot customer workspaces capture the required workspace-admin
  attestation for lawful basis and worker notices before the first audit publish is
  permitted.
- **SC-009**: The MVP can be launched and operated in a shared-tenant model for pilot
  customers without blocking a later move to provider-hosted per-tenant or
  customer-hosted deployment models.

## Assumptions

- Initial pilots target US-based, English-speaking engineering organizations in the
  30 to 500 engineer range.
- Customers can provide enough recent engineering activity history to support a
  trustworthy first map and audit.
- Customers can reach a publishable first audit with GitHub or GitLab plus Jira or
  Confluence; using all three sources improves coverage but is not mandatory.
- The MVP uses TypeScript for the frontend only; the backend API, connector
  orchestration, and classification services use Python 3.11.
- Development, integration, and early demo validation happen in a local-first
  environment by default; the first cloud deployment occurs only after the MVP is
  stable enough to justify active hosting costs.
- MVP customers start on a shared-tenant environment by default unless stricter
  contractual isolation is required later.
- A Staff or Principal Engineer acts as the primary operator, while the VPE or CTO
  serves as the lightweight approver.
- The MVP is optimized for structural resilience, onboarding, and planning insight,
  not for productivity tracking or employment decision automation.
- Later tiers and enterprise capabilities are expected, but intentionally deferred
  until the Tier-1 Map wedge is validated.