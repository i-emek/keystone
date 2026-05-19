import { expect, test } from "@playwright/test";

test("shared analytics shell renders the new landing workspace", async ({ page }) => {
  await page.goto("/");

  await expect(
    page.getByRole("heading", { name: "Operational clarity for engineering leadership" }),
  ).toBeVisible();
  await expect(page.getByText("Engineering Intelligence")).toBeVisible();
  await expect(page.getByText("Consistent analytical shell")).toBeVisible();
  await expect(page.getByText("Workspace status:")).toBeVisible();
});