#!/usr/bin/env bash
set -euo pipefail

if ! command -v uv >/dev/null 2>&1; then
  echo "uv is required" >&2
  exit 1
fi

uv run --project worker python - <<'PY'
import os

import boto3

endpoint_url = os.getenv("AWS_ENDPOINT_URL", "http://localhost:4566")
region_name = os.getenv("AWS_REGION", "us-east-1")
buckets = [
    os.getenv("AUDIT_BUCKET", "keystone-audit-local"),
    os.getenv("INGEST_BUCKET", "keystone-ingest-local"),
]

s3 = boto3.client(
    "s3",
    endpoint_url=endpoint_url,
    region_name=region_name,
    aws_access_key_id="test",
    aws_secret_access_key="test",
)

for bucket in buckets:
    try:
        s3.create_bucket(Bucket=bucket)
    except s3.exceptions.BucketAlreadyOwnedByYou:
        pass
    except s3.exceptions.BucketAlreadyExists:
        pass
PY