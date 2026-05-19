from src.core.settings import Settings


def test_backend_settings_default_to_local_mode():
    settings = Settings()

    assert settings.local_mode is True
    assert settings.aws_endpoint_url == "http://localhost:4566"
    assert settings.queue_endpoint_url == "http://localhost:9324"
    assert settings.queue_url.endswith("keystone-events")
