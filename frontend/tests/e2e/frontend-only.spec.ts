import { expect, test } from "@playwright/test";

test("frontend shell shows the shared analytics workspace intro", async ({ page }) => {
  await page.goto("/");

  await expect(
    page.getByText("A shared shell for status, trust, and analytical views"),
  ).toBeVisible();
});
