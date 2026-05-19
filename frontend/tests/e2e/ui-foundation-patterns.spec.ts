import { expect, test } from "@playwright/test";

test("representative dashboard patterns render on the landing page", async ({ page }) => {
  await page.goto("/");

  await expect(page.getByRole("heading", { name: "Foundation metrics" })).toBeVisible();
  await expect(page.getByRole("heading", { name: "Adoption trajectory" })).toBeVisible();
  await expect(page.getByRole("heading", { name: "Foundation quality" })).toBeVisible();
  await expect(page.getByRole("heading", { name: "Rollout runway" })).toBeVisible();
  await expect(page.getByText("Trust-sensitive visuals stay reviewable")).toBeVisible();
});