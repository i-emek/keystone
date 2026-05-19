import asyncio
import logging

from src.jobs.bootstrap_job import run_bootstrap_job
from src.queue.sqs_adapter import SqsAdapter
from src.schedules.local_scheduler import LocalScheduler
from src.services.settings import get_settings


LOGGER = logging.getLogger("keystone.worker")


async def run() -> None:
    settings = get_settings()
    adapter = SqsAdapter(settings.queue_url, settings.queue_endpoint_url, settings.aws_region)
    scheduler = LocalScheduler(interval_seconds=30)

    logging.basicConfig(level=logging.INFO, format="%(asctime)s %(levelname)s %(name)s %(message)s")
    LOGGER.info("worker runtime starting")
    LOGGER.info("queue configured: %s", adapter.queue_url)
    LOGGER.info("queue endpoint: %s", adapter.endpoint_url)
    await scheduler.start(lambda: run_bootstrap_job(adapter))

    try:
        await run_bootstrap_job(adapter)
        while True:
            LOGGER.info("worker heartbeat")
            await asyncio.sleep(30)
    except asyncio.CancelledError:
        LOGGER.info("worker cancelled")
        raise
    finally:
        await scheduler.stop()


def main() -> None:
    asyncio.run(run())


if __name__ == "__main__":
    main()
