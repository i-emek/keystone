#!/usr/bin/env bash
set -euo pipefail

PYTHONPATH=backend uv run --project backend python -m src.cli | grep -q 'queue_endpoint_url=http://localhost:9324'