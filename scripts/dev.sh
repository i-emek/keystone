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

if ! command -v uv >/dev/null 2>&1; then
  echo "uv is required" >&2
  exit 1
fi

echo "waiting for PostgreSQL, MiniStack, and ElasticMQ"
./scripts/wait-for-dependencies.sh

cleanup() {
  jobs -pr | xargs -r kill
}

trap cleanup EXIT INT TERM

echo "starting backend, frontend, and worker"
uv run --project backend uvicorn src.main:app --app-dir backend --host 0.0.0.0 --port 8000 --reload &
run_pnpm --dir frontend dev &
uv run --project worker --directory worker python -m src.main &

wait