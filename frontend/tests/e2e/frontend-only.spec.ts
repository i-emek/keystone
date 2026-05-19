import { expect, test } from "@playwright/test";

test("frontend shell shows the workspace intro copy", async ({ page }) => {
  await page.goto("/");

  await expect(
    page.getByText(
      "This workspace confirms the frontend, backend, and worker can run together",
    ),
  ).toBeVisible();
});
