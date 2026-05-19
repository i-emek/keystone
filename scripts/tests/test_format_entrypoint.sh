#!/usr/bin/env bash
set -euo pipefail

test -x ./scripts/format.sh
bash -n ./scripts/format.sh