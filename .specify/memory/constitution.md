<!--
Sync Impact Report
Version change: 1.0.0 -> 1.0.1
Modified principles:
- None
Modified sections:
- Product Guardrails connector scope aligned with the clarified Tier-1 Map MVP
Added sections:
- None
Removed sections:
- None
Templates requiring updates:
- ✅ .specify/templates/plan-template.md
- ✅ .specify/templates/spec-template.md
- ✅ .specify/templates/tasks-template.md
Follow-up TODOs:
- None
-->
# Keystone Constitution

## Core Principles

### I. MVP-First, Expand-by-Seams
- Work MUST begin with the smallest independently valuable slice that can be
	shipped, validated with design partners, and expanded later without a rewrite.
- Specs and plans MUST state the MVP boundary, what is explicitly deferred, and
	the seam that enables later expansion. A seam can be an interface, versioned
	contract, schema boundary, or migration path; it is not permission to build
	the future tier in advance.
- Enterprise-grade concerns MUST only enter MVP when they are foundational trust,
	compliance, or isolation requirements already mandated by this constitution.

Rationale: Keystone needs a solid Tier-1 launch first, but it also needs clear
paths to mature multi-tenant, per-tenant, and self-hosted product variants.

### II. Advisory-Only, Auditable Decisions
- Keystone MUST ship as decision support, never as automated people decisioning.
- Any workflow that influences staffing, reorg, performance, retention, or other
	personnel outcomes MUST preserve hard human oversight: explicit reviewer action,
	visible rationale, and no blind batch execution.
- Decision-relevant outputs MUST preserve reconstructable evidence, including the
	triggering inputs, rule or model version, acting user or service, timestamp,
	and resulting artifact.

Rationale: Keystone's legal posture, customer trust, and product differentiation
all depend on proving that humans remain accountable for consequential decisions.

### III. Privacy, Data Minimization, and Tiered Isolation
- Only data required for the active product tier and documented use case MAY be
	ingested, retained, or exposed.
- Every feature spec and plan MUST declare the data sensitivity level, tenant
	isolation model, residency assumptions, and whether protected or proxy-sensitive
	attributes are excluded from production decision logic.
- Pooled multi-tenant architecture is acceptable for lower-sensitivity MVP flows
	only when logical isolation is enforced; higher-sensitivity, enterprise, or
	customer-contracted isolation requirements MUST preserve a per-tenant or
	self-host migration path.

Rationale: Keystone's margin model depends on a pragmatic pooled MVP, while its
enterprise path depends on credible isolation and privacy boundaries.

### IV. Evidence Before Automation
- Any metric, classifier, or recommendation surfaced to users MUST have a defined
	purpose, a validation approach, and a measurable failure mode before build work
	begins.
- Model and provider integrations MUST remain behind replaceable interfaces and
	explicit quality gates so that Bedrock, direct API, or self-hosted variants can
	evolve without rewriting product logic.
- When data quality, confidence, or validation thresholds are insufficient, the
	system MUST degrade safely to review queues, limited functionality, or explicit
	"insufficient evidence" states.

Rationale: Keystone competes on defensible evidence. Opaque scores without a
clear validation and fallback story weaken the product and the trust model.

### V. Production-Ready Simplicity
- The default implementation choice MUST be the simplest design that satisfies
	the current MVP requirement and the trust constraints above.
- Complexity added only for speculative scale, vendor optionality, or future
	tiers MUST be rejected unless the plan names the immediate requirement it
	unblocks and the simpler alternative that was considered.
- Every shipped slice MUST include proportional operational readiness: logging,
	failure visibility, access control, and a validation step appropriate to the
	risk of the change.

Rationale: Keystone has to move quickly without creating fragile systems or a
future rewrite trap.

## Product Guardrails

- The initial product target is a Tier-1 Map MVP for US-first, English-first
	customers, starting with GitHub or GitLab plus Jira or Confluence; Slack is
	intentionally deferred from the first release.
- Pulse, Reorg Discovery, Full Reorg Sim, EU-region delivery, self-hosting, and
	the broader enterprise Trust Bundle are intentionally post-MVP unless a later
	specification explicitly changes scope.
- The product MUST NOT position or implement surveillance, hidden productivity
	ranking, hire or fire automation, or opaque employee scoring.
- User-facing language SHOULD emphasize resilience, coverage, evidence, and
	accountability rather than HR or productivity-tracking framing.

## Delivery Workflow

- Every specification MUST include independently testable user stories, an
	explicit MVP slice, out-of-scope items, an expansion path, and the trust,
	compliance, and data-handling constraints relevant to that feature.
- Every implementation plan MUST pass a constitution check for MVP boundary,
	human oversight, auditability, data isolation, and operational readiness
	before research concludes and again after design is complete.
- Every task list MUST organize work by user story, sequence the MVP slice before
	expansion work, and add explicit auditability, access control, validation, and
	observability tasks whenever the feature touches people decisions or sensitive
	tenant data.
- Reviews MUST reject work that adds enterprise-only infrastructure without a
	current MVP need and a documented justification.

## Governance

- This constitution overrides conflicting local workflow preferences and serves
	as the source of truth for delivery decisions in this repository.
- Amendments require a written rationale, a sync impact report, updates to any
	affected templates or guidance files, and approval by the project owner.
- Versioning follows semantic versioning for governance changes: MAJOR for
	incompatible principle removals or redefinitions, MINOR for new principles or
	materially expanded mandatory guidance, PATCH for clarifications only.
- Any change affecting people-impacting outputs, model behavior, data retention,
	residency, protected-attribute handling, or tenant isolation MUST receive an
	explicit trust and compliance review during planning and before release.
- Plans, tasks, and reviews MUST verify constitution compliance. If a principle
	itself needs to change, the constitution MUST be amended first rather than
	bypassed within a feature plan.

**Version**: 1.0.1 | **Ratified**: 2026-05-14 | **Last Amended**: 2026-05-14
