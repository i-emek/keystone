#!/usr/bin/env bash
set -euo pipefail

PYTHONPATH=worker uv run --project worker python -m src.cli | grep -q 'queue_endpoint_url=http://localhost:9324'