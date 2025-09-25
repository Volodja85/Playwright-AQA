import { test, expect } from "@playwright/test";
import { HomePage } from "../../src/pages/HomePage";

test("Підміна відповіді з логіном", async ({ page }) => {
  const fakeUserData = {
    data: {
      name: "Fake Name",
      lastName: "Fake Lastname",
    },
  };

  // Логін через UI
  const homePage = new HomePage(page, "/");
  await page.goto(homePage.url);

  const loginPage = await homePage.clickSignInButton(); // клацнути кнопку "Sign In", щоб відкрити логін форму
  console.log("Current URL after login:", page.url());

  await page.waitForSelector("#signinEmail", { state: "visible" });

  await loginPage.typeSignEmail("v.zemela@gmail.com");
  await loginPage.typeSignPassword("Password123");
  //await loginPage.clickRememberFlag();
  const garagePage = await loginPage.clickLogin();
  await garagePage.waitForPage();
  console.log("Garage page loaded!");

  // Підміна відповіді /users/profile
  await page.route("**/users/profile", async (route) => {
    console.log("Перехоплено запит /users/profile");
    await route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify(fakeUserData),
    });
  });

  // Переходимо на сторінку профілю
  await page.goto("https://qauto.forstudy.space/panel/profile");

  // Перевірка
  const profileText = page.locator("p.profile_name.display-4");
  await expect(profileText).toContainText("Fake Name");
  await expect(profileText).toContainText("Fake Lastname");
});
