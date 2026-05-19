#!/usr/bin/env bash
set -euo pipefail

test -x ./scripts/healthcheck.sh
bash -n ./scripts/healthcheck.sh