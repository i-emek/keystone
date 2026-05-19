import { getApiBaseUrl } from "./env";

export type RuntimeState = "ready" | "degraded";

export type RuntimeStatus = {
  status: RuntimeState;
  services: Record<string, RuntimeState>;
  message: string;
};

const fallbackStatus: RuntimeStatus = {
  status: "degraded",
  services: {
    api: "degraded",
    postgres: "degraded",
    objectStorage: "degraded",
    queue: "degraded",
  },
  message: "Backend health endpoint is not reachable yet.",
};

export async function getRuntimeStatus(): Promise<RuntimeStatus> {
  try {
    const response = await fetch(`${getApiBaseUrl()}/health`, {
      cache: "no-store",
      headers: {
        Accept: "application/json",
      },
    });

    if (!response.ok) {
      return {
        ...fallbackStatus,
        message: `Backend health endpoint returned ${response.status}.`,
      };
    }

    return (await response.json()) as RuntimeStatus;
  } catch {
    return fallbackStatus;
  }
}
