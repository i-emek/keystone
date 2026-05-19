# Quickstart: Project Setup Foundation

## Goal

Bootstrap the Keystone monorepo locally, start the required infrastructure,
launch the frontend, backend, and worker in development mode, and verify that
the local-first MVP foundation is ready before any AWS hosting work begins.

## Prerequisites

- Node.js 20 LTS
- pnpm 9.x
- Python 3.11
- `uv`
- Docker with Docker Compose support
- No production credentials required for normal local setup

## 1. Install Repository Dependencies

```bash
make bootstrap
```

## 2. Configure Local Environment

Create a local environment file from the committed example:

```bash
cp .env.example .env
```

Minimum local values should cover:

- frontend-to-backend API base URL
- PostgreSQL connection string
- MiniStack endpoint URL
- ElasticMQ endpoint URL
- local audit bucket name
- local ingest bucket name
- ElasticMQ queue URL or queue name
- flags that keep the workspace in local mode

## 3. Start Local Infrastructure

```bash
make infra-up
make infra-provision
```

Expected local dependencies:

- PostgreSQL 16
- MiniStack with S3-compatible storage
- ElasticMQ with SQS-compatible queues

Default local interfaces:

- MiniStack: `http://localhost:4566`
- ElasticMQ: `http://localhost:9324`

## 4. Verify Infrastructure Health

Run the repository health check entry point:

```bash
make health
```

Expected outcome:

- database is reachable
- local queue is reachable
- local object storage is reachable

## 5. Start the Core Services

Use one full-workspace command when you want the entire stack running:

```bash
make dev
```

Or run services independently when working on one area:

```bash
pnpm --filter frontend dev
uv run --project backend uvicorn src.main:app --app-dir backend --host 0.0.0.0 --port 8000 --reload
uv run --project worker --directory worker python -m src.main
```

## 6. Verify the Local Runtime

Confirm these expectations after startup:

- frontend is available at `http://localhost:3000`
- backend health endpoint responds at `http://localhost:8000/health`
- worker logs show queue subscription and scheduled job readiness
- backend can reach PostgreSQL, MiniStack-backed storage, and ElasticMQ-backed
  queue services
- `make health` exits successfully once the backend is running

## 7. Run Standard Validation

```bash
make format
make lint
make test
```

Expected coverage:

- frontend formatting, linting, and unit tests
- backend and worker linting plus automated tests
- root smoke checks for service and dependency connectivity
- shared shell checks for the root validation entry points

## 8. Shut Down Cleanly

```bash
docker compose -f deploy/docker/docker-compose.yml down
```

## Expected Outcome

At the end of this quickstart, contributors should have a repeatable local
workspace that supports full-stack MVP development, independent service loops,
MiniStack-backed object storage, an AWS-aligned SQS queue seam, and one shared
validation workflow without requiring live customer data or hosted cloud
infrastructure.

## Validation Notes

- The repository quality workflow is expected to pass through `make format`, `make lint`, and `make test` once dependencies are installed.
- The full local infrastructure smoke requires Docker daemon access for PostgreSQL, MiniStack, and ElasticMQ.
- In this workspace shell, command validation succeeded for the code and script surfaces, but a full Docker-backed smoke still depends on Docker daemon access.
- If Docker is unavailable in the current shell, backend, worker, and frontend validation can still proceed, but dependency health will remain degraded until infrastructure is reachable.