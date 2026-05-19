#!/usr/bin/env bash
set -euo pipefail

python3 - <<'PY'
import os
import socket
import time
from urllib.parse import urlparse

def endpoint_to_target(url: str, name: str) -> tuple[str, int, str]:
    parsed = urlparse(url)
    host = parsed.hostname or "127.0.0.1"
    port = parsed.port or (443 if parsed.scheme == "https" else 80)
    return (host, port, name)


targets = [
    ("127.0.0.1", 5432, "postgres"),
    endpoint_to_target(os.getenv("AWS_ENDPOINT_URL", "http://localhost:4566"), "ministack"),
    endpoint_to_target(os.getenv("QUEUE_ENDPOINT_URL", "http://localhost:9324"), "elasticmq"),
]
deadline = time.time() + 60

while time.time() < deadline:
    pending = []
    for host, port, name in targets:
        try:
            with socket.create_connection((host, port), timeout=1):
                continue
        except OSError:
            pending.append(name)
    if not pending:
        print("dependencies ready")
        raise SystemExit(0)
    time.sleep(1)

raise SystemExit("timed out waiting for dependencies")
PY