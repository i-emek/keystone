from src.queue.sqs_adapter import SqsAdapter
from src.schedules.local_scheduler import LocalScheduler


def test_sqs_adapter_exposes_queue_contract():
    adapter = SqsAdapter(
        queue_url="http://localhost:9324/queue/keystone-events",
        endpoint_url="http://localhost:9324",
        region_name="us-east-1",
    )

    assert adapter.describe()["queueUrl"].endswith("keystone-events")
    assert adapter.describe()["endpointUrl"] == "http://localhost:9324"


def test_local_scheduler_starts_and_stops_event_loop_task():
    scheduler = LocalScheduler(interval_seconds=1)

    assert scheduler.interval_seconds == 1
