import { test as base, expect } from "@playwright/test";
import { GaragePage } from "../../src/pages/GaragePage.js";

export const test = base.extend({
  userGaragePage: async ({ browser }, use) => {
    const context = await browser.newContext({
      storageState: "src/storage/user.json",
    });
    const page = await context.newPage();
    const garagePage = new GaragePage(page);
    await garagePage.goto();

    await use(garagePage);

    await context.close();
  },
});

test("Should be on garage page (URL check)", async ({ userGaragePage }) => {
  const url = userGaragePage.page.url();
  expect(url).toContain("/panel/garage");
});

test("Should see garage page", async ({ userGaragePage }) => {
  await userGaragePage.waitForPage();
  const title = await userGaragePage.getTitleText();
  expect(title).toContain("Garage");
});

test("Should see button name: 'Add car'", async ({ userGaragePage }) => {
  const addCarButton = await userGaragePage.getAddCarButton();
  await expect(addCarButton).toBeVisible();
});
