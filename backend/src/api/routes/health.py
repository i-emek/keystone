from fastapi import APIRouter

from src.services.health_service import HealthService


router = APIRouter(tags=["health"])


@router.get("/health")
async def health() -> dict[str, object]:
    return await HealthService().get_runtime_status()
