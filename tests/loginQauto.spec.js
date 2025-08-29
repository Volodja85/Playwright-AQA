const { test, expect } = require("@playwright/test");

test("sanity check", async ({ page }) => {
  await page.goto("/");
  await expect(page).toHaveTitle("Hillel Qauto");
});
