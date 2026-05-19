# Quickstart: UI Foundation

## Goal

Run the Keystone frontend, preview the shared UI foundation, verify dark and
light theme behavior, and validate the reusable shell and component baseline for
later product screens.

## Prerequisites

- Node.js 20 LTS
- pnpm 9.x via Corepack
- Frontend dependencies installed through the repository bootstrap flow or the
  frontend workspace directly

## 1. Install Dependencies

From the repository root:

```bash
make bootstrap
```

Or install only the frontend workspace dependencies:

```bash
corepack pnpm --dir frontend install
```

## 2. Configure the Frontend Environment

Ensure the frontend has access to its environment values, especially:

- `NEXT_PUBLIC_API_BASE_URL`

The current frontend can render even if the backend is unavailable, but the
runtime status surface becomes more meaningful when the backend is reachable.

## 3. Start the Frontend

Use the focused frontend workflow:

```bash
corepack pnpm --dir frontend dev
```

Open the application at:

```text
http://localhost:3000
```

## 4. Optional Full-Workspace Runtime

If you want the shell to render against live runtime status from the backend and
infrastructure, start the local stack from the repository root:

```bash
make infra-up
make infra-provision
make dev
```

## 5. Verify the UI Foundation

Confirm these expectations:

- the shared shell renders without broken layout
- the navigation rail, top header, and content frame read as one analytical
  workspace
- primary headings, secondary text, and analytical cards follow one consistent
  hierarchy
- dark mode and light mode both preserve readability and meaning
- the header theme toggle can switch between dark and light modes and keeps the
  selected preference on reload
- severity, loading, and AI-marker treatments remain recognizable in both themes
- the runtime-status area degrades clearly if the backend is unreachable
- the representative analytics patterns for metrics, trend containers, radar
  summaries, and trajectory progress render without one-off styling

## 6. Run Frontend Validation

```bash
corepack pnpm --dir frontend lint
corepack pnpm --dir frontend exec tsc --noEmit
corepack pnpm --dir frontend test
```

Run browser-level smoke checks when end-to-end coverage is needed:

```bash
corepack pnpm --dir frontend test:e2e
```

Recommended browser smoke focus:

- shell hierarchy and landing-page composition
- theme switching plus persistence across reload
- representative analytical pattern rendering

## Expected Outcome

At the end of this quickstart, contributors should have a running Keystone
frontend with a shared shell baseline, reusable UI patterns ready for extension,
and validation coverage for theme parity and core interaction behavior.

## Validation Notes

- The current frontend can render independently, with degraded runtime status if
  the backend is not available.
- Full end-to-end shell validation is stronger when the backend and local
  infrastructure are also running.
- The UI foundation is expected to validate primarily through linting,
  typechecking, unit tests, and focused theme smoke checks rather than through a
  separate design-system platform.