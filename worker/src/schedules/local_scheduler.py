import asyncio
from collections.abc import Awaitable, Callable


class LocalScheduler:
    def __init__(self, interval_seconds: int) -> None:
        self.interval_seconds = interval_seconds
        self._task: asyncio.Task[None] | None = None

    async def start(self, callback: Callable[[], Awaitable[None]] | None = None) -> None:
        if self._task is not None:
            return

        async def runner() -> None:
            while True:
                if callback is not None:
                    await callback()
                await asyncio.sleep(self.interval_seconds)

        self._task = asyncio.create_task(runner())

    async def stop(self) -> None:
        if self._task is None:
            return
        self._task.cancel()
        try:
            await self._task
        except asyncio.CancelledError:
            pass
        self._task = None
