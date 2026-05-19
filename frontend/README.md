# Frontend Workspace

Use the frontend workspace when you are changing the shared Keystone product
shell, theme system, or reusable analytical UI patterns.

## Commands

- `corepack pnpm --dir frontend dev`
- `corepack pnpm --dir frontend build`
- `corepack pnpm --dir frontend exec tsc --noEmit`
- `corepack pnpm --dir frontend lint`
- `corepack pnpm --dir frontend test`
- `corepack pnpm --dir frontend test:e2e`

## Shared Inputs

- `NEXT_PUBLIC_API_BASE_URL` from `.env`
- backend health endpoint at `/health`
- backend runtime status for PostgreSQL, MiniStack, and ElasticMQ reachability
- shared contracts in `shared/contracts/`

## UI Foundation Surfaces

- `app/layout.tsx` wires the shared global styles, Geist fonts, and theme provider
- `app/page.tsx` is the representative analytics landing page built from the
	shared shell and reusable patterns
- `components/system/` contains the product shell, theme controls, status
	primitives, and reusable analytical containers
- `lib/theme.ts` and `lib/theme-preference.ts` define the theme model and local
	preference seam for later account-backed persistence

## Focused Workflow Notes

- The frontend can render independently, but the runtime status surfaces become
	fully meaningful after `make infra-up`, `make infra-provision`, and the
	backend startup flow are running.
- The shared shell defaults to dark mode, supports light mode through the header
	theme toggle, and persists the chosen preference locally.
- Reusable pattern work should extend `components/system/` rather than adding
	page-local one-off styling for new analytical screens.
