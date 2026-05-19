import { expect, test } from "@playwright/test";

test("theme preference can switch to light mode and persist across reload", async ({ page }) => {
  await page.goto("/");

  await page.getByRole("button", { name: "Light" }).click();

  await expect(page.locator("html")).toHaveAttribute("data-theme", "light");

  await page.reload();

  await expect(page.locator("html")).toHaveAttribute("data-theme", "light");
});