# Feature Specification: Project Setup Foundation

**Feature Branch**: `002-project-setup-foundation`  
**Created**: 2026-05-19  
**Status**: Draft  
**Input**: User description: "Create the foundational project setup for Keystone with one shared repository structure, separate frontend, backend, and worker service areas, local supporting infrastructure, and standard environment, quality, and testing workflows that enable the previously defined MVP."

## Clarifications

### Session 2026-05-19

- Q: Which async job backbone should the setup foundation standardize around? → A: Use an SQS-compatible queue contract from the start, with local emulation during MVP development and AWS-managed queueing later.
- Q: Which scheduling and orchestration posture should the setup foundation standardize around? → A: Keep orchestration lightweight during MVP with simple local scheduled and background triggers, then map those flows to AWS-native scheduled or container tasks later.
- Q: How should MiniStack replace the current LocalStack role in local development? → A: Use MiniStack for S3-compatible object storage, and keep a separate SQS-compatible local queue emulator for background jobs.

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Start the Full Local Workspace (Priority: P1)

As a product engineer joining Keystone, I want one shared repository layout and a
repeatable local setup flow for the web application, API, worker, and supporting
services so I can run the MVP end to end without assembling infrastructure by hand.

**Why this priority**: Every later feature depends on a stable local foundation,
and the team cannot validate the existing MVP plan without this slice.

**Independent Test**: On a clean machine with the documented prerequisites, a
contributor can clone the repository, configure the local environment, start the
core services and supporting dependencies, and confirm that the product shell,
API, and background processing runtime are available together.

**Acceptance Scenarios**:

1. **Given** a contributor has a clean clone and the documented prerequisites,
   **When** they follow the setup steps, **Then** they can start the core
   workspace through one repeatable workflow and reach a healthy local state.
2. **Given** a required local dependency or configuration value is missing,
   **When** the contributor attempts to start the workspace, **Then** the setup
   flow fails with a clear reason and recovery guidance.

---

### User Story 2 - Work on Services Without Cross-Team Friction (Priority: P2)

As a contributor focused on one product surface, I want the web application, API,
and worker to have clear boundaries inside the same repository so I can change one
area quickly without guessing where shared assets, contracts, or operational files
live.

**Why this priority**: Clear service boundaries reduce onboarding time, lower the
risk of accidental coupling, and let the team move in parallel once the foundation
exists.

**Independent Test**: A contributor can open one service area, run only the
commands relevant to that area, and still use shared contracts, fixtures, and
configuration without restructuring the repository.

**Acceptance Scenarios**:

1. **Given** a contributor is changing only one service, **When** they use the
   repository conventions, **Then** they can run and validate that service without
   starting unrelated development loops.
2. **Given** a contributor needs a shared contract, fixture, or operational
   asset, **When** they navigate the repository, **Then** those shared assets are
   located in predictable places and are usable by each core service.

---

### User Story 3 - Enforce Shared Development Standards (Priority: P3)

As a maintainer, I want common environment configuration rules and standard
quality checks across the repository so code review focuses on product behavior
instead of avoidable setup drift or style inconsistencies.

**Why this priority**: Shared standards keep the foundation sustainable as more
contributors begin working on the MVP and later platform layers.

**Independent Test**: A maintainer can ask any contributor to run the standard
formatting, linting, and automated validation workflow before review and receive
comparable results across services.

**Acceptance Scenarios**:

1. **Given** a contributor prepares a change for review, **When** they run the
   standard validation workflow, **Then** they receive a consistent pass or fail
   result without needing service-specific ad hoc steps.
2. **Given** a configuration or quality rule changes, **When** the repository is
   updated, **Then** contributors can discover the new expectation through the
   shared configuration and setup guidance.

---

## MVP Scope & Expansion Path *(mandatory)*

**MVP Slice**: Establish one shared repository workspace for Keystone with clear
top-level boundaries for the web application, API, worker runtime, shared assets,
and local operational support, plus the minimum local environment guidance and
quality checks required to build and validate the existing Map MVP end to end.

**Out of Scope for MVP**:

- Production hosting automation, release pipelines, and cloud environment setup
- Advanced observability, autoscaling, disaster recovery, or multi-region
  operational hardening
- Business feature implementation beyond the structural scaffolding needed to
  start the core services locally
- Customer-hosted packaging, per-tenant deployment variants, and post-MVP
  platform decomposition

**Expansion Path**: The foundation keeps the web application, API, worker,
shared contracts, and operational assets in predictable boundaries so later work
can add new packages, services, deployment targets, or stricter environment tiers
without reorganizing the initial repository or breaking local-first development.
Background processing follows one queue contract that can run locally during MVP
development and map directly to managed hosting in AWS later. Scheduled and
orchestrated work stays lightweight in the local MVP setup so it can graduate to
AWS-native scheduling and task execution only when hosting begins. Local object
storage is emulated through MiniStack, while queue emulation remains a separate
SQS-compatible dependency so the AWS queue contract stays stable.

## Edge Cases

- What happens when a contributor can start the repository but one supporting
  dependency is unavailable locally?
- How does the setup behave when a contributor needs to work on only one service
  and should not have to boot the entire workspace?
- What happens when a required configuration value is missing, malformed, or set
  differently across services?
- How does the repository avoid drift when two services depend on the same shared
  contract or fixture?
- What happens when onboarding is attempted on a clean machine without access to
  live customer systems or production credentials?

## Trust, Compliance & Safety *(mandatory)*

- **Decision Support Boundary**: This feature provides the development foundation
  only. It does not introduce people-impacting product outputs, but it must
  protect the integrity of later advisory workflows by keeping local defaults safe
  and explicit.
- **Auditability**: Repository structure, setup instructions, shared environment
  contracts, and standard validation workflows must remain versioned and clear
  enough that contributors can reconstruct how the local workspace is expected to
  run at any point in time.
- **Data Handling**: Local setup must work without requiring live customer data by
  default, must keep secret values out of committed files, and must make any
  optional access to external systems explicit and separately configurable.
- **Failure Posture**: If prerequisites, configuration, or local dependencies are
  incomplete, the setup must fail fast, explain what is missing, and avoid giving
  contributors a false impression that the environment is healthy.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: The system MUST provide one shared repository structure with clear
  boundaries for the web application, API, worker runtime, shared assets, and
  local operational support.
- **FR-002**: The system MUST provide a repeatable way for contributors to derive
  their local environment configuration from committed examples without committing
  machine-specific or secret values.
- **FR-003**: The system MUST allow contributors to start the full local workspace,
  including the supporting dependencies needed for normal MVP development flows,
  through a documented and repeatable workflow.
- **FR-004**: The system MUST allow contributors to run the web application, API,
  and worker development loops independently when they are working on only one
  surface.
- **FR-005**: The system MUST provide predictable locations for shared contracts,
  fixtures, and operational assets that are used across the core services.
- **FR-006**: The system MUST include local equivalents for the storage,
  background-processing, and artifact-handling capabilities required by the
  current MVP scope.
- **FR-006a**: The system MUST standardize background processing on one queue
  contract that works in local development and maps directly to the hosted AWS
  environment without changing service responsibilities.
- **FR-006b**: The system MUST keep recurring and orchestrated background work
  lightweight during local MVP development while preserving a direct path to
  AWS-native scheduled or container task execution later.
- **FR-006c**: The system MUST provide MiniStack as the local S3-compatible
  object storage surface while keeping queue emulation as a separate
  SQS-compatible local dependency.
- **FR-007**: The system MUST provide a simple way to confirm that the core
  services can communicate with each other and with their required local
  dependencies after setup.
- **FR-008**: The system MUST provide standardized formatting, linting, and
  automated validation entry points that contributors can run before review.
- **FR-009**: The system MUST define configuration boundaries clearly enough that
  each core service can be configured without requiring contributors to inspect
  implementation code.
- **FR-010**: The system MUST support repository bootstrap and normal development
  flows without mandatory production credentials or live customer data.
- **FR-011**: The system MUST document local prerequisites, setup steps, startup
  expectations, and recovery guidance for common setup failures.
- **FR-012**: The system MUST preserve a clear path to add new services, shared
  packages, and stricter environment tiers later without reorganizing the
  foundational repository layout.

### Key Entities *(include if feature involves data)*

- **Repository Workspace**: The shared codebase foundation that groups the core
  services, shared assets, and operational support into one predictable layout.
- **Service Area**: A bounded part of the repository dedicated to one runtime,
  such as the web application, API, or worker, with its own local development
  loop and validation needs.
- **Shared Configuration**: The committed guidance and example settings that
  define how contributors supply environment-specific values without exposing
  secrets.
- **Local Dependency Set**: The supporting data, job, and artifact services needed
  to run the MVP locally in a repeatable way.
- **Validation Workflow**: The standard formatting, quality, and test checks that
  contributors run to confirm a change is ready for review.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: A new contributor can clone the repository, configure the local
  environment, and reach a healthy full-workspace startup in under 45 minutes by
  following the project guidance alone.
- **SC-002**: After initial setup, a contributor can start any one core service
  for focused development in under 10 minutes without starting unrelated service
  loops.
- **SC-003**: At least 90% of onboarding attempts by contributors who meet the
  documented prerequisites complete without direct help from another team member.
- **SC-004**: A contributor can run the standard pre-review validation workflow
  for a normal change in no more than three commands and finish it in under 15
  minutes on a supported development machine.

## Assumptions

- The immediate product foundation still centers on one web application, one API,
  and one worker runtime, consistent with the existing Map MVP planning.
- Local-first development remains the priority, and hosted environment design can
  be specified later once the core workspace is stable.
- Local object storage is emulated through MiniStack, while background queueing
  uses a separate SQS-compatible local emulator.
- Background processing uses an AWS-aligned queue contract from the start, with
  local emulation during MVP development and managed queueing only at hosting
  time.
- Recurring and orchestrated background work remains lightweight during MVP
  development and is promoted to AWS-native scheduled or container tasks only as
  part of the later hosting step.
- Contributors have access to supported development machines that can run the
  documented local prerequisites.
- Sample data, empty-state flows, or local test fixtures are sufficient for setup
  validation; real customer data is not required for repository bootstrap.
- Production deployment automation and broader platform operations will be defined
  in later planning once the local foundation proves stable.