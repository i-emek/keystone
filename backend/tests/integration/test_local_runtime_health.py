from fastapi.testclient import TestClient

from src.main import app


def test_health_endpoint_returns_runtime_shape(monkeypatch):
    monkeypatch.setattr(
        "src.services.health_service.HealthService._check_socket", lambda *_args: True
    )
    monkeypatch.setattr(
        "src.services.health_service.HealthService._check_http", lambda *_args: True
    )
    monkeypatch.setattr(
        "src.services.health_service.HealthService._check_endpoint_socket",
        lambda *_args: True,
    )

    client = TestClient(app)
    response = client.get("/health")

    assert response.status_code == 200
    payload = response.json()
    assert payload["status"] == "ready"
    assert payload["services"]["api"] == "ready"
    assert payload["services"]["postgres"] == "ready"
    assert payload["services"]["objectStorage"] == "ready"
    assert payload["services"]["queue"] == "ready"
