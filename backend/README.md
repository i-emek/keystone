# Backend Workspace

Use the backend workspace when you are changing API routes, environment
configuration, or local dependency health logic.

## Commands

- `uv run --project backend uvicorn src.main:app --app-dir backend --host 0.0.0.0 --port 8000 --reload`
- `PYTHONPATH=backend uv run --project backend python -m pytest backend/tests`
- `uv run --project backend keystone-backend-info`

## Shared Inputs

- `.env` for local service settings
- shared contracts in `shared/contracts/`
- PostgreSQL for operational state
- MiniStack via `AWS_ENDPOINT_URL` for S3-compatible storage checks
- ElasticMQ via `QUEUE_ENDPOINT_URL` and `QUEUE_URL` for queue reachability