from functools import lru_cache

from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    service_name: str = "keystone-backend"
    database_url: str = "postgresql://keystone:keystone@localhost:5432/keystone"
    aws_endpoint_url: str = "http://localhost:4566"
    queue_endpoint_url: str = "http://localhost:9324"
    queue_url: str = "http://localhost:9324/queue/keystone-events"
    local_mode: bool = True

    model_config = SettingsConfigDict(
        env_file=".env",
        env_file_encoding="utf-8",
        extra="ignore",
    )


@lru_cache(maxsize=1)
def get_settings() -> Settings:
    return Settings()
