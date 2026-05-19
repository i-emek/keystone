import { getApiBaseUrl } from "../../lib/env";

describe("frontend env helpers", () => {
  it("falls back to the local backend URL when NEXT_PUBLIC_API_BASE_URL is unset", () => {
    const previousValue = process.env.NEXT_PUBLIC_API_BASE_URL;
    delete process.env.NEXT_PUBLIC_API_BASE_URL;

    expect(getApiBaseUrl()).toBe("http://localhost:8000");

    process.env.NEXT_PUBLIC_API_BASE_URL = previousValue;
  });
});
