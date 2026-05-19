# Developer Workspace Contract

## Purpose

Define the contributor-facing contract for the Keystone setup foundation: what
exists at the repository root, which services are expected to run locally, which
supporting dependencies must be available, and which entry points contributors
use to bootstrap, validate, provision, and clean up the workspace.

## Repository Contract

The repository MUST expose these top-level areas:

- `frontend/` for the web application
- `backend/` for the API service
- `worker/` for background jobs and lightweight scheduling
- `shared/` for shared contracts, fixtures, and configuration helpers
- `deploy/` for local Docker assets and later AWS deployment assets
- `scripts/` for repository-level automation that does not belong to one service

The repository root MUST also expose:

- a committed environment example file
- root developer commands for bootstrap, infrastructure, provisioning,
  validation, and cleanup
- workspace-level dependency manifests for JavaScript and Python tooling

## Local Runtime Contract

### Core Services

| Service | Default Local Role | Expected Port / Interface |
|---|---|---|
| Frontend | Render the product shell and call the API | `http://localhost:3000` |
| Backend | Serve API routes and service health checks | `http://localhost:8000` |
| Worker | Consume queue messages and run lightweight scheduled jobs | Background process with log output |

### Supporting Dependencies

| Dependency | Local Mode | Expected Interface |
|---|---|---|
| PostgreSQL | Docker Compose container | `localhost:5432` |
| S3-compatible storage | MiniStack container or equivalent local service | `http://localhost:4566` via `AWS_ENDPOINT_URL` |
| SQS-compatible queue | ElasticMQ container or equivalent local service | `http://localhost:9324` via `QUEUE_ENDPOINT_URL` and `QUEUE_URL` |

## Command Contract

The workspace MUST provide contributor entry points for these actions:

| Action | Contract Requirement |
|---|---|
| Bootstrap dependencies | Install JavaScript and Python dependencies from committed manifests |
| Start infrastructure | Boot required local dependencies without starting all application services |
| Provision local resources | Create required buckets, queues, and related local assets after infrastructure startup through a root entry point such as `make infra-provision` |
| Start full workspace | Bring the core services to a healthy local development state |
| Start one service | Run frontend, backend, or worker independently |
| Validate quality | Run formatting, linting, and automated tests from root commands |
| Verify health | Confirm service-to-dependency connectivity after startup |
| Clean up | Stop local dependencies and background processes cleanly |

## Configuration Contract

The committed environment example MUST document at least:

- API base URL for the frontend
- Database connection details for local PostgreSQL
- MiniStack endpoint URL for local S3-compatible access
- ElasticMQ endpoint URL for local SQS-compatible access
- Object storage bucket names or prefixes for local artifact use
- ElasticMQ queue URL or queue name for local background processing
- Flags or values needed to keep local mode separate from hosted AWS mode

Secrets, production credentials, and machine-specific overrides MUST remain out
of committed files.

## Health Contract

The setup foundation MUST allow contributors to verify:

- the frontend can reach the backend
- the backend can reach PostgreSQL
- the backend and worker can reach the queue contract
- services that rely on artifact storage can reach the local S3-compatible surface

If any check fails, the workflow MUST identify the failing service or dependency
rather than report a generic startup error.

## AWS Migration Contract

The local workspace MUST preserve these direct mappings:

- local PostgreSQL → hosted PostgreSQL in AWS
- local S3-compatible object storage → AWS S3
- local SQS-compatible queue → AWS SQS
- lightweight local scheduled or background triggers → AWS-native scheduled or
  container task execution

The migration to AWS MUST change deployment targets, not the logical service
responsibilities established by the local foundation.