import socket
from urllib import error, request
from urllib.parse import urlparse

from src.core.settings import get_settings


class HealthService:
    def __init__(self) -> None:
        self.settings = get_settings()

    async def get_runtime_status(self) -> dict[str, object]:
        postgres_ready = self._check_socket("127.0.0.1", 5432)
        object_storage_ready = self._check_http(
            f"{self.settings.aws_endpoint_url}/_ministack/health"
        )
        queue_ready = self._check_endpoint_socket(self.settings.queue_endpoint_url)

        services = {
            "api": "ready",
            "postgres": "ready" if postgres_ready else "degraded",
            "objectStorage": "ready" if object_storage_ready else "degraded",
            "queue": "ready" if queue_ready else "degraded",
        }

        overall_status = (
            "ready" if postgres_ready and object_storage_ready and queue_ready else "degraded"
        )
        message = (
            "All local dependencies are reachable."
            if overall_status == "ready"
            else "One or more local dependencies are not reachable yet."
        )

        return {
            "status": overall_status,
            "services": services,
            "message": message,
        }

    def _check_socket(self, host: str, port: int) -> bool:
        try:
            with socket.create_connection((host, port), timeout=1):
                return True
        except OSError:
            return False

    def _check_endpoint_socket(self, endpoint_url: str) -> bool:
        parsed = urlparse(endpoint_url)
        host = parsed.hostname or "127.0.0.1"
        port = parsed.port or (443 if parsed.scheme == "https" else 80)
        return self._check_socket(host, port)

    def _check_http(self, url: str) -> bool:
        try:
            with request.urlopen(url, timeout=2) as response:
                return response.status < 500
        except (OSError, error.URLError):
            return False
