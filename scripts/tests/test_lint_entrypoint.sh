#!/usr/bin/env bash
set -euo pipefail

test -x ./scripts/lint.sh
bash -n ./scripts/lint.sh