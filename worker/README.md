# Worker Workspace

Use the worker workspace when you are changing queue handling or recurring local
background jobs.

## Commands

- `uv run --project worker --directory worker python -m src.main`
- `PYTHONPATH=worker uv run --project worker python -m pytest worker/tests`
- `uv run --project worker keystone-worker-info`

## Shared Inputs

- `.env` for queue and object-storage endpoint configuration
- shared fixtures in `shared/fixtures/`
- shared service definitions in `shared/contracts/service-manifest.json`
- ElasticMQ via `QUEUE_ENDPOINT_URL` and `QUEUE_URL`
- MiniStack via `AWS_ENDPOINT_URL` for artifact-storage compatibility