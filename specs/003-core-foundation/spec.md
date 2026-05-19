# Feature Specification: Core Foundation

**Feature Branch**: `003-core-foundation`  
**Created**: 2026-05-19  
**Status**: Draft  
**Input**: User description: "Proceed to the next development phase: core foundation. Build the platform pieces everything depends on, including the core schema and migrations, authentication, tenant context, role permissions, encryption, pseudonymization, identity vault basics, storage, queue, model-provider adapter layers, and a worker runtime skeleton with telemetry. Do not add business data modeling or business features in this phase."

## Clarifications

### Session 2026-05-19

- Q: What encryption posture should the core foundation standardize for stored data in the MVP and after it? → A: All stored data is encrypted in the MVP with platform-managed default keys, and the foundation keeps an extension path so later phases can continue with platform-managed default keys or support bring-your-own-key per tenant.
- Q: What authentication posture should the core foundation standardize for MVP account access and later expansion? → A: The MVP uses email-based account creation and login only, keeps later employee or peer access on an invitation-based path built on the same account model, defers Google sign-in plus broader SSO or SAML until later phases, and allows local development account creation without email validation.
- Q: How much of tenant context, role permissions, and pseudonymization belongs in the core foundation phase? → A: The core foundation must include the basics of tenant context, role permissions, and pseudonymization from the start, while leaving deeper expansion of those controls to later development on the same platform model.

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Establish Secure Tenant Boundaries (Priority: P1)

As a platform engineer, I want every protected action and background task to run
inside a shared tenant, authentication, and permission model so later product
features inherit isolation and access control instead of inventing their own.

**Why this priority**: Every later phase depends on trustworthy tenant
boundaries. If this slice is weak or inconsistent, workspace setup, ingestion,
topic mapping, audit publication, and controlled identity access all become
harder to build safely.

**Independent Test**: In a clean environment, a maintainer can create a baseline
tenant, authenticate multiple actors, and verify that protected actions and
background jobs succeed only when the correct tenant context and role
permissions are present.

**Acceptance Scenarios**:

1. **Given** a valid tenant administrator is authenticated for one tenant,
   **When** they perform a protected tenant-scoped action, **Then** the action
   succeeds inside that tenant boundary and the resulting record carries tenant
   context.
2. **Given** an authenticated actor from another tenant or without the required
   role, **When** they attempt the same protected action, **Then** the system
   denies the action and records the decision.
3. **Given** a tenant-scoped action starts background work, **When** the worker
   receives the job, **Then** the same tenant context and permission boundary are
   enforced during execution.

---

### User Story 2 - Protect Sensitive Identity Data (Priority: P2)

As a security-conscious product owner, I want identity-linked records to remain
pseudonymized by default and direct identity access to pass through a protected
vault boundary so future workflows can use people-related evidence without
exposing identities in routine product views.

**Why this priority**: Keystone's roadmap depends on people-linked activity data.
The product cannot safely extend into ingestion, topic review, trust screens, or
publish flows unless identity protection is foundational rather than bolted on.

**Independent Test**: A maintainer can store and retrieve protected records using
pseudonymous references, confirm that non-privileged flows never reveal direct
identities, and verify that any authorized re-identification request requires a
reason and leaves an audit trail.

**Acceptance Scenarios**:

1. **Given** a protected identity is stored for a tenant, **When** a normal
   application-facing read occurs, **Then** the returned record exposes only the
   pseudonymous reference and not the direct identity mapping.
2. **Given** an authorized actor with privileged identity access provides the
   required justification, **When** they request re-identification, **Then** the
   system returns the allowed identity details and records who accessed them,
   when, and why.
3. **Given** the authorization, vault access, or protection controls are
   unavailable, **When** direct identity access is attempted, **Then** the system
   fails closed and does not reveal the identity.

---

### User Story 3 - Provide Extensible Runtime Foundations (Priority: P3)

As a platform maintainer, I want shared storage, queue, model-provider, worker,
and telemetry contracts so later feature teams can build on one foundation
without reworking how background processing, artifacts, protected calls, or
operational visibility behave.

**Why this priority**: Future phases rely on durable assets, asynchronous work,
provider calls, and traceability. A stable platform seam reduces rework across
workspace setup, ingestion, topic mapping, audit generation, and trust controls.

**Independent Test**: A maintainer can submit a representative background job,
store and retrieve a durable artifact, invoke a provider through the shared
adapter boundary, and trace the resulting flow through the worker and telemetry
records without using feature-specific code paths.

**Acceptance Scenarios**:

1. **Given** a platform job is submitted with tenant context, **When** the worker
   processes it, **Then** the system records lifecycle status, retryable failure
   state, and final outcome.
2. **Given** a durable artifact or audit artifact is written through the shared
   storage boundary, **When** an authorized later workflow retrieves it,
   **Then** the artifact can be located and accessed through the same shared
   contract.
3. **Given** the default model-provider route is unavailable, **When** a
   provider-backed task is attempted, **Then** the system surfaces a structured
   failure that can be traced without exposing secrets or direct identities.

---

## MVP Scope & Expansion Path *(mandatory)*

**MVP Slice**: Establish the minimum shared platform foundation for Keystone by
defining the core persistent schema and migrations, tenant-aware access and role
boundaries, protected identity handling, shared storage and background-work
contracts, an email-based authentication boundary for the initial account model,
a model-provider adapter boundary, a worker runtime skeleton, and the baseline
audit and telemetry signals needed for later phases. This minimum slice includes
the baseline tenant-context model, baseline role-permission model, and baseline
pseudonymization behavior that later features must inherit.

**Out of Scope for MVP**:

- Workspace creation flows, team hierarchies, organization imports, and tenant
  onboarding experience
- Source connectors, ingestion orchestration, normalized evidence, and
  source-specific business rules
- Topic maps, authority scoring, bus-factor calculations, publish flows, trust
  screens, and other customer-facing product outputs
- Business-domain schemas for teams, sources, topics, evidence, audits, or
  knowledge-discovery features
- Advanced hosting hardening, region expansion, customer-hosted packaging, and
  mature operations dashboards beyond the baseline telemetry needed now

**Expansion Path**: This phase creates the contracts and control points that
later phases extend rather than replace. Workspace setup can add customer and
team entities on top of the tenant boundary. Ingestion can attach source and
evidence records to the shared schema and queue contracts. Topic mapping and
audit features can use the protected identity, storage, and model-provider
boundaries without redefining how sensitive records, background work, or
traceability behave. The encryption boundary starts with platform-managed
default keys for all stored data in the MVP and must remain extensible so later
tenants can stay on the default key path or adopt bring-your-own-key controls
without changing higher-level feature schemas. The authentication boundary
starts with email-based account creation and login for the MVP, while keeping a
direct extension path to invite-based team access plus later Google, SSO, or
SAML identity providers without redefining tenant or role concepts. Tenant
context, role permissions, and pseudonymization begin with a deliberately basic
platform model in this phase and are expected to deepen later without replacing
the foundation contracts introduced here.

## Edge Cases

- What happens when a migration is attempted against an environment with partial
  setup state or an unexpected earlier schema version?
- How does the platform behave when a protected request or job arrives without a
  tenant context, with a disabled tenant, or with stale permissions?
- What happens when a re-identification request is made for a pseudonymous
  identity that has no valid vault mapping or no supplied justification?
- How does the worker handle retried jobs when the original storage or provider
  dependency remains unavailable?
- What happens when protection controls are unavailable during reads or writes of
  sensitive tenant-linked records?

## Trust, Compliance & Safety *(mandatory)*

- **Decision Support Boundary**: This feature does not produce business-facing or
  employment-related decisions. It establishes the platform controls that later
  advisory features must inherit, including human-controlled privileged access
  and tenant-scoped permissions.
- **Auditability**: The platform must keep a reconstructable history of schema
  changes, authentication outcomes, authorization decisions, privileged identity
  access, durable artifact operations, background job execution, and provider
  interactions that matter for later trust reviews.
- **Data Handling**: The foundation assumes an early shared-tenant operating
  model with strong tenant separation, encryption for all stored data in the
  MVP using platform-managed default keys, tenant-applied protection for
  sensitive identity-linked records, pseudonymized identity references by
  default, a protected vault boundary for direct identity mappings, a forward
  path to later tenant-level bring-your-own-key support, and US-first residency
  assumptions until later regional rollout is specified.
- **Access Handling**: The foundation uses email-based account creation and
  login for the MVP, keeps account-to-tenant membership compatible with later
  invitation-based onboarding, defers Google sign-in and broader SSO or SAML
  federation to later phases, and permits local development account creation
  without email validation while keeping non-local environments verification-capable.
- **Failure Posture**: If tenant context, permissions, vault access, or
  protection controls are missing or uncertain, the platform must fail closed,
  prevent privileged disclosure, and surface an auditable failure reason rather
  than guessing or silently degrading.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: The system MUST define a versioned core platform schema that covers
  tenant boundaries, actor access, role assignments, protected identity
  references, background work records, durable asset references, and auditable
  platform events.
- **FR-002**: The system MUST provide repeatable schema migration behavior so the
  core platform foundation can be created and updated across environments without
  manual record editing during normal rollout.
- **FR-003**: The system MUST require authentication for all protected platform
  and tenant-scoped actions.
- **FR-003a**: The system MUST support email-based account creation and login as
  the only end-user authentication method required for the MVP foundation.
- **FR-003b**: The system MUST structure account and membership records so later
  invitation-based access for employees, peers, or colleagues can be added on
  the same tenant and role model without redefining authenticated identities.
- **FR-003c**: The system MUST keep Google sign-in and broader SSO or SAML
  federation as deferred extensions behind the same authentication boundary.
- **FR-003d**: The system MUST allow local development environments to create
  accounts without email validation while preserving a clear path for verified
  email flows outside local development.
- **FR-004**: The system MUST attach tenant context to every tenant-scoped
  request, persisted record, durable asset reference, and background job before
  later business features are added.
- **FR-005**: The system MUST enforce role-based permissions that at minimum
  separate platform administration, tenant administration, privileged identity
  access, and standard authenticated application access.
- **FR-006**: The system MUST support service and background-task execution under
  the same tenant and permission model used for interactive protected actions.
- **FR-007**: The system MUST store people-linked references in pseudonymized
  form by default in application-facing records.
- **FR-008**: The system MUST keep direct identity mappings inside a protected
  identity-vault boundary that is separate from routine application reads.
- **FR-009**: The system MUST allow controlled re-identification only for
  authorized roles, with explicit reason capture and an auditable outcome.
- **FR-010**: The system MUST encrypt all stored data in the MVP at rest using
  platform-managed default keys.
- **FR-010a**: The system MUST structure storage and protection controls so later
  phases can keep platform-managed default keys or enable bring-your-own-key per
  tenant without requiring later business features to redesign their data model.
- **FR-011**: The system MUST provide a shared storage boundary for operational
  records, derived artifacts, and immutable audit artifacts.
- **FR-012**: The system MUST provide a shared queue boundary for asynchronous
  work that preserves tenant context, execution status, and retry state.
- **FR-013**: The system MUST provide a model-provider adapter boundary so later
  inference or classification workflows can use a default provider while
  preserving the option to substitute providers without redefining feature logic.
- **FR-014**: The system MUST provide a worker runtime skeleton that can receive
  queued work, resolve tenant and permission context, use shared adapters, and
  report structured outcomes.
- **FR-015**: The system MUST emit baseline telemetry and audit events for schema
  changes, authentication, authorization, privileged identity access, adapter
  usage, durable asset operations, and job execution.
- **FR-016**: The system MUST keep secrets, direct identities, and sensitive
  payload details out of routine logs, telemetry views, and non-privileged
  operational surfaces.
- **FR-017**: The system MUST allow later schemas and services to extend the
  platform foundation without redefining the tenant, access, identity, storage,
  queue, or telemetry contracts established in this phase.

### Key Entities *(include if feature involves data)*

- **Tenant**: A customer-isolated operating boundary that scopes protected data,
  access rules, assets, and background work.
- **Actor Account**: A human or system identity that can authenticate and perform
  protected actions within platform or tenant boundaries.
- **Account Membership**: The binding between an authenticated account and a
  tenant-scoped role context, designed to support direct account creation now and
  invitation-based expansion later.
- **Role Assignment**: A rule that grants an actor a defined level of authority
  within either the platform or a tenant.
- **Tenant Context**: The required scoping information that binds a request,
  record, asset, or job to the correct tenant boundary.
- **Pseudonymous Identity**: The default application-facing representation of a
  person-linked subject that avoids exposing direct identity details.
- **Identity Vault Entry**: The protected mapping that connects a pseudonymous
  identity to the direct identity details allowed only in privileged flows.
- **Protection Scope**: The tenant-applied protection context used to secure
  sensitive records and identity-linked data.
- **Durable Asset Reference**: A tracked pointer to stored artifacts such as raw
  files, derived outputs, or immutable audit evidence.
- **Queued Job**: A tenant-scoped unit of background work with lifecycle state,
  retry history, and execution outcome.
- **Worker Run**: A recorded execution instance of a queued job, including start,
  finish, outcome, and trace context.
- **Platform Audit Event**: A structured record of a security-relevant or
  trust-relevant action such as schema change, privileged access, authorization
  decision, or job outcome.
- **Migration Version**: The tracked state that identifies which core schema
  changes have been applied in a given environment.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: Maintainers can apply the initial core schema and migration set to
  a new environment through one repeatable workflow without manual record edits
  during normal setup.
- **SC-002**: In foundation acceptance testing, 100% of protected tenant-scoped
  actions and background jobs either succeed with valid tenant and role context
  or are denied with an auditable reason.
- **SC-003**: 100% of re-identification attempts require explicit reason capture
  and produce an audit record containing actor, tenant, outcome, and timestamp.
- **SC-004**: A platform contributor can connect one later-phase feature spike to
  the shared tenant, storage, queue, and provider contracts in under one working
  day without changing the core access or identity model.
- **SC-005**: Maintainers can trace a failed protected request or background job
  from entry to outcome in under 10 minutes using the baseline audit and
  telemetry records alone.

## Assumptions

- The early Keystone foundation remains shared-tenant by default, while keeping a
  clean path to stricter hosting isolation in later phases.
- All stored data is encrypted in the MVP through platform-managed default keys,
  and customer-managed key support is deferred to a later phase behind the same
  storage and protection contract.
- Email-based account creation and login are sufficient for the MVP foundation,
  while Google sign-in, SSO, SAML, and richer invitation workflows are deferred
  to later phases behind the same account and membership model.
- Local development may bypass email validation for account creation, while
  non-local environments are expected to use verification-capable flows.
- Future phases will introduce business-domain entities such as workspace teams,
  source connections, evidence, topics, audits, and trust-review artifacts on top
  of this platform layer rather than inside it.
- The minimum role model for this phase only needs to distinguish platform
  administration, tenant administration, privileged identity access, and normal
  authenticated access; finer-grained product roles can be added later.
- Tenant context propagation, role permissions, and pseudonymization are
  intentionally foundational in this phase, but only at the baseline level
  needed for safe extension by later feature work.
- Direct identity access is exceptional and must stay behind explicit privileged
  controls from the beginning, even before customer-facing re-identification
  workflows exist.
- One default storage route, one default queue route, and one default model
  provider route are sufficient for the MVP foundation as long as each sits
  behind a replaceable contract.
- Local-first development and later hosted operation should share the same core
  schema, access, identity, and job contracts even if infrastructure choices
  evolve.