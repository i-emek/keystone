from dataclasses import dataclass


@dataclass(slots=True)
class SqsAdapter:
    queue_url: str
    endpoint_url: str
    region_name: str

    def describe(self) -> dict[str, str]:
        return {
            "queueUrl": self.queue_url,
            "endpointUrl": self.endpoint_url,
            "region": self.region_name,
        }
