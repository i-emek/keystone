#!/usr/bin/env bash
set -euo pipefail

test -x ./scripts/provision-local.sh
test -x ./deploy/docker/ministack-init.sh
bash -n ./scripts/provision-local.sh
bash -n ./deploy/docker/ministack-init.sh