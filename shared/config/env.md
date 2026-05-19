# Environment Surface

The local workspace derives its runtime configuration from `.env.example`.

Key local variables:

- `NEXT_PUBLIC_API_BASE_URL` for frontend-to-backend requests
- `DATABASE_URL` for PostgreSQL
- `AWS_ENDPOINT_URL` for MiniStack-backed S3-compatible storage
- `QUEUE_ENDPOINT_URL` for ElasticMQ-backed SQS-compatible reachability checks
- `QUEUE_URL` for the worker queue contract

Required categories:

- frontend API base URL
- PostgreSQL connection string
- MiniStack endpoint URL
- ElasticMQ endpoint URL
- local audit bucket name
- local ingest bucket name
- local queue URL or queue name
- flags that force local mode

Troubleshooting notes:

- Keep `.env` at the repository root so the backend and worker settings loaders resolve the same values.
- If MiniStack is unavailable, object-storage checks will degrade until the local infrastructure is running.
- If ElasticMQ is unavailable, `QUEUE_ENDPOINT_URL` and `QUEUE_URL` checks will degrade until the local infrastructure is running.
- Run `make infra-provision` after `make infra-up` whenever you need to recreate local buckets or queues.
- `NEXT_PUBLIC_API_BASE_URL` must point to the backend service that exposes `/health`.