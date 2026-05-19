# Keystone

Keystone is a local-first monorepo for the Map MVP foundation. The repository
currently provides a Next.js frontend, a FastAPI backend, and a Python worker
runtime backed by PostgreSQL, MiniStack, and ElasticMQ for local development.

## Local Development

1. Copy `.env.example` to `.env`.
2. Run `make bootstrap` to install dependencies.
3. Run `make infra-up` to start PostgreSQL, MiniStack, and ElasticMQ.
4. Run `make infra-provision` to create local buckets and queues.
5. Run `make dev` to start the frontend, backend, and worker together.
6. Run `make health` to confirm the local stack is reachable.

## Focused Service Work

- Frontend: `pnpm --dir frontend dev`
- Backend: `uv run --project backend uvicorn src.main:app --app-dir backend --host 0.0.0.0 --port 8000 --reload`
- Worker: `uv run --project worker --directory worker python -m src.main`

Focused development still shares the same `.env` contract. Backend and worker loops expect PostgreSQL, MiniStack, and ElasticMQ to be available through `make infra-up`.

## Shared Quality Workflow

- `make format`
- `make lint`
- `make test`
- `make infra-provision`

## Troubleshooting

- If `make infra-up` fails with a Docker socket permission error, verify that your user can reach `/var/run/docker.sock` or run the Docker steps in an environment with daemon access.
- If `make bootstrap` cannot find `pnpm`, ensure Node.js is installed with `corepack` available, or install `pnpm` explicitly.
- If `make health` reports a degraded backend, start `make dev` only after `make infra-up` and `make infra-provision` have completed.
- If you need to recreate local buckets or the queue definition after resetting infrastructure state, rerun `make infra-provision`.

## Local Infrastructure

- PostgreSQL: `localhost:5432`
- MiniStack: `http://localhost:4566`
- ElasticMQ: `http://localhost:9324`
- Frontend: `http://localhost:3000`
- Backend health: `http://localhost:8000/health`