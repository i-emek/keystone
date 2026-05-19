#!/usr/bin/env bash
set -euo pipefail

if ! command -v docker >/dev/null 2>&1; then
  echo "docker is required" >&2
  exit 1
fi

if ! command -v uv >/dev/null 2>&1; then
  echo "uv is required" >&2
  exit 1
fi

./deploy/docker/ministack-init.sh

uv run --project worker python - <<'PY'
import os

import boto3

queue_endpoint = os.getenv("QUEUE_ENDPOINT_URL", "http://localhost:9324")
queue_name = os.getenv("QUEUE_NAME", "keystone-events")

sqs = boto3.client(
    "sqs",
    endpoint_url=queue_endpoint,
    region_name=os.getenv("AWS_REGION", "us-east-1"),
    aws_access_key_id="test",
    aws_secret_access_key="test",
)

sqs.create_queue(QueueName=queue_name)
PY

echo "local resources provisioned"