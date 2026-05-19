# Frontend Workspace

Use the frontend workspace when you are changing the local product shell.

## Commands

- `corepack pnpm --dir frontend dev`
- `corepack pnpm --dir frontend build`
- `corepack pnpm --dir frontend exec tsc --noEmit`

## Shared Inputs

- `NEXT_PUBLIC_API_BASE_URL` from `.env`
- backend health endpoint at `/health`
- backend runtime status for PostgreSQL, MiniStack, and ElasticMQ reachability
- shared contracts in `shared/contracts/`

## Focused Workflow Notes

- The frontend can render independently, but the status cards become fully meaningful after `make infra-up`, `make infra-provision`, and the backend startup flow are running.
