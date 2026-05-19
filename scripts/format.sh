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

run_pnpm --dir frontend format
uv run --project backend python -m ruff format --check backend/src backend/tests
uv run --project worker python -m ruff format --check worker/src worker/tests