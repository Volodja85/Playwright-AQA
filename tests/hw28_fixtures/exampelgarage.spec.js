import { test, expect } from "@playwright/test";
import { HomePage } from "../../src/pages/HomePage";

test.describe("Registration Tests", () => {
  let homePage;
  let sinPage;
  const email = `aqa-${Date.now()}@gmail.com`;
  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page, "/");
    await homePage.visit();
    sinPage = await homePage.clickSignInButton();
  });
  test("Перевірка SingIn", async ({ page }) => {
    await sinPage.typeSignEmail("v.zemela@gmail.com");
    await sinPage.typeSignPassword("Password123");
    // await sinPage.clickRememberFlag();
    await sinPage.clickLogin();

    await expect(page).toHaveURL(/.*garage/);
  });
});
