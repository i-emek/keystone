import logging

from src.queue.sqs_adapter import SqsAdapter


LOGGER = logging.getLogger("keystone.worker.bootstrap")


async def run_bootstrap_job(adapter: SqsAdapter) -> None:
    LOGGER.info("worker bootstrap job running against %s", adapter.queue_url)
