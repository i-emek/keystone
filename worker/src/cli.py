from src.services.settings import get_settings


def main() -> None:
    settings = get_settings()
    print(f"service={settings.service_name}")
    print(f"queue_url={settings.queue_url}")
    print(f"queue_endpoint_url={settings.queue_endpoint_url}")
    print(f"storage_endpoint_url={settings.aws_endpoint_url}")
