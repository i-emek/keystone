# Research: Project Setup Foundation

**Feature**: [spec.md](./spec.md)  
**Date**: 2026-05-19

## Decision 1: Keep the Existing MVP Service Split as the Monorepo Boundary

**Decision**: Use one small monorepo with top-level `frontend/`, `backend/`,
`worker/`, `shared/`, and `deploy/` directories rather than introducing a more
abstract app or package topology.

**Rationale**: The earlier MVP plan already assumes a frontend, API, and worker
split. Reusing that shape keeps the setup foundation aligned with the approved
product direction, reduces naming churn, and gives contributors obvious service
ownership boundaries.

**Alternatives considered**:
- An `apps/` and `packages/` layout was rejected because it adds another layer of
  abstraction without solving a current MVP problem.
- A single combined service repository was rejected because it would blur the API
  and background-processing boundaries that the existing MVP already relies on.

## Decision 2: Use pnpm for JavaScript Workspaces and uv for Python Services

**Decision**: Manage the frontend and root JavaScript tooling with pnpm
workspaces, and manage the backend and worker with `pyproject.toml` plus `uv`.

**Rationale**: pnpm keeps the Node.js surface fast and workspace-aware without
the overhead of a full monorepo build framework, while uv gives the Python
services reproducible and fast dependency sync with minimal ceremony. This keeps
each runtime close to its native ecosystem while preserving simple root-level
developer commands.

**Alternatives considered**:
- A heavier monorepo tool such as Turborepo or Nx was rejected because the MVP
  needs simple workspace orchestration, not a layered build platform.
- Poetry for Python was rejected because it adds more workflow overhead than is
  necessary for two service packages.
- Plain `pip` plus ad hoc requirements files was rejected because it tends to
  drift more quickly across services and environments.

## Decision 3: Standardize Local Infrastructure on Docker Compose, PostgreSQL, MiniStack, and ElasticMQ

**Decision**: Run local infrastructure with Docker Compose, PostgreSQL 16,
MiniStack for S3-compatible object storage, and ElasticMQ for SQS-compatible
queues.

**Rationale**: This is the smallest free local stack that still exercises the
storage and async seams the MVP already needs. It preserves the AWS object
storage and queue contracts without forcing contributors to use a paid or bundled
local AWS surface during routine bootstrap.

**Alternatives considered**:
- LocalStack was rejected because the user explicitly wants a free replacement
  and no longer wants the bundled local AWS surface to be the default.
- Direct AWS development from the start was rejected because it raises cost,
  credentials burden, and debugging friction before the repository foundation is
  stable.
- Pure mocks or in-memory substitutes were rejected because they would not
  exercise the real S3-compatible and SQS-compatible seams that later AWS hosting
  depends on.

## Decision 4: Keep Queueing AWS-Aligned from Day One with a Dedicated Local Emulator

**Decision**: Use one SQS-compatible queue contract from the start, with
ElasticMQ as the default local emulator during MVP development and AWS-managed
queueing after hosting begins.

**Rationale**: The setup feature now has an explicit clarification that queueing
must remain AWS-aligned even after replacing LocalStack. Using a dedicated local
queue emulator keeps the queue contract stable, limits the scope of change to the
infrastructure seam, and avoids cutting across backend and worker responsibilities
later.

**Alternatives considered**:
- Redis-based queues were rejected because they would create a later translation
  step into AWS-native queueing.
- Database-backed background jobs were rejected because they conflate durable
  application state with async delivery concerns.
- Deferring queue emulation details was rejected because the spec now requires a
  concrete local dependency contract for full-workspace startup.

## Decision 5: Keep Scheduling Lightweight Until AWS Hosting

**Decision**: Handle recurring and orchestrated MVP work with lightweight local
triggers owned by the backend and worker, then map those flows to AWS-native
scheduled or container tasks during hosting.

**Rationale**: The feature clarification favors simple local development over an
early workflow platform. This keeps the foundation production-aware without
dragging in a dedicated orchestrator before the actual job patterns are proven.

**Alternatives considered**:
- A dedicated orchestration platform from day one was rejected because it adds
  operational weight and local complexity too early.
- Deferring all scheduled work entirely was rejected because the worker still
  needs a credible path for recurring sync and maintenance behavior.

## Decision 6: Use Root-Level Developer Commands with Service-Specific Escape Hatches

**Decision**: Provide a small set of root commands for bootstrap, infrastructure,
development, linting, formatting, testing, and health checks, while still
allowing contributors to run any one service directly.

**Rationale**: The spec requires both a full local startup flow and independent
service loops. Root commands reduce onboarding friction, while service-specific
commands avoid forcing every contributor into a full-stack workflow for small
changes.

**Alternatives considered**:
- Service-only commands were rejected because they make first-time setup harder
  and increase documentation drift.
- An opaque all-in-one bootstrap script was rejected because it hides failure
  modes and makes focused development harder.

## Decision 7: Adopt Separate but Consistent Quality Tooling Per Runtime

**Decision**: Use ESLint, Prettier, Vitest, and Playwright on the frontend, and
Ruff plus pytest on the backend and worker, exposed through consistent root entry
points.

**Rationale**: The frontend and Python services have different idiomatic tooling,
but the setup feature only needs contributors to experience one predictable
quality workflow. Exposing per-runtime tools through shared commands satisfies
that goal without forcing unnatural cross-language standardization.

**Alternatives considered**:
- A single cross-language formatter or linter strategy was rejected because it
  would still need runtime-specific exceptions while offering little MVP value.
- End-to-end-only validation was rejected because it would slow development and
  make local failures harder to diagnose.

## Decision 8: Preserve the AWS Landing Zone Through Docker Images and Terraform Assets

**Decision**: Keep AWS hosting as the last step, but structure the repository so
Docker assets and Terraform modules can be added in `deploy/` without changing
service boundaries or local tooling.

**Rationale**: The user explicitly wants local development during MVP and AWS at
the end. This approach turns AWS into a deployment target for already-stable
service units rather than a second architecture.

**Alternatives considered**:
- Designing only for local execution was rejected because it would defer too much
  hosting structure and risk a later reorganization.
- Building the hosted deployment stack first was rejected because it would slow
  MVP feedback and violate the constitution's simplicity principle.