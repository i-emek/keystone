from fastapi import FastAPI

from src.api.router import api_router
from src.core.settings import get_settings


settings = get_settings()
app = FastAPI(title="Keystone Backend", version="0.1.0")
app.include_router(api_router)


@app.get("/")
async def root() -> dict[str, str]:
    return {
        "service": settings.service_name,
        "status": "ready",
    }
