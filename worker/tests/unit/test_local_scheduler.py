import asyncio

from src.schedules.local_scheduler import LocalScheduler


def test_local_scheduler_can_start_and_stop():
    async def scenario() -> None:
        scheduler = LocalScheduler(interval_seconds=3600)
        await scheduler.start()
        await scheduler.stop()

    asyncio.run(scenario())
