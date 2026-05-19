#!/usr/bin/env bash
set -euo pipefail

python3 - <<'PY'
import json
import os
import socket
from urllib import error, request
from urllib.parse import urlparse

api_url = os.getenv("NEXT_PUBLIC_API_BASE_URL", "http://localhost:8000") + "/health"
storage_url = os.getenv("AWS_ENDPOINT_URL", "http://localhost:4566")
queue_url = os.getenv("QUEUE_ENDPOINT_URL", "http://localhost:9324")

def socket_ready(host: str, port: int) -> bool:
    try:
        with socket.create_connection((host, port), timeout=1):
            return True
    except OSError:
        return False

def endpoint_ready(url: str) -> bool:
    parsed = urlparse(url)
    host = parsed.hostname or "127.0.0.1"
    port = parsed.port or (443 if parsed.scheme == "https" else 80)
    return socket_ready(host, port)

summary = {
    "postgres": socket_ready("127.0.0.1", 5432),
    "ministack": endpoint_ready(storage_url),
    "elasticmq": endpoint_ready(queue_url),
    "backend": False,
}

try:
    with request.urlopen(api_url, timeout=2) as response:
        summary["backend"] = response.status < 500
except (OSError, error.URLError):
    summary["backend"] = False

print(json.dumps(summary, indent=2))
raise SystemExit(0 if all(summary.values()) else 1)
PY