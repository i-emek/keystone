#!/usr/bin/env bash
set -euo pipefail

run_pnpm() {
  if command -v pnpm >/dev/null 2>&1; then
    pnpm "$@"
    return
  fi

  if command -v corepack >/dev/null 2>&1; then
    corepack pnpm "$@"
    return
  fi

  echo "pnpm or corepack is required" >&2
  exit 1
}

run_pnpm --dir frontend test
PYTHONPATH=backend uv run --project backend python -m pytest backend/tests
PYTHONPATH=worker uv run --project worker python -m pytest worker/tests
./scripts/tests/test_backend_entrypoint.sh
./scripts/tests/test_worker_entrypoint.sh
./scripts/tests/test_health_entrypoint.sh
./scripts/tests/test_provision_entrypoint.sh
./scripts/tests/test_format_entrypoint.sh
./scripts/tests/test_lint_entrypoint.sh