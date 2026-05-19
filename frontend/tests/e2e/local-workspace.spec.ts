import { expect, test } from "@playwright/test";

test("renders the local workspace status page", async ({ page }) => {
  await page.goto("/");

  await expect(
    page.getByRole("heading", { name: "Local Workspace Foundation" }),
  ).toBeVisible();
  await expect(page.getByText("Workspace status:")).toBeVisible();
  await expect(
    page.getByText(/MiniStack-backed object storage/i),
  ).toBeVisible();
  await expect(page.getByText(/ElasticMQ-backed queue/i)).toBeVisible();
});
