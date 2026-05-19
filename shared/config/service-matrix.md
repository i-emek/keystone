# Service Matrix

| Service | Purpose | Local Entry Point | Shared Dependencies |
|---|---|---|---|
| `frontend` | Render the local workspace shell and call backend health endpoints | `pnpm --dir frontend dev` | `.env`, backend |
| `backend` | Serve local API and dependency health state | `uv run --project backend uvicorn src.main:app --app-dir backend --host 0.0.0.0 --port 8000 --reload` | `.env`, PostgreSQL, MiniStack, ElasticMQ |
| `worker` | Consume the queue contract and run lightweight recurring jobs | `uv run --project worker --directory worker python -m src.main` | `.env`, ElasticMQ, MiniStack |
| `shared` | Hold cross-service contracts, fixtures, and config docs | n/a | repository-wide |
| `deploy` | Hold local Docker and later AWS deployment assets | `docker compose -f deploy/docker/docker-compose.yml up -d` | Docker |