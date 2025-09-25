//node src/setup/ProfileAPI.js

import { chromium } from "@playwright/test";
import fs from "fs";
import { HomePage } from "../pages/HomePage.js";
(async () => {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext();
  const page = await context.newPage();

  const homePage = new HomePage(
    page,
    "https://guest:welcome2qauto@qauto.forstudy.space/"
  );

  // Перехід на сайт
  await page.goto(homePage.url);

  // Логін через UI
  const loginPage = await homePage.clickSignInButton();
  await page.waitForSelector("#signinEmail", { state: "visible" });

  await loginPage.typeSignEmail("v.zemela@gmail.com");
  await loginPage.typeSignPassword("Password123");

  const garagePage = await loginPage.clickLogin();
  await garagePage.gotoProfilePage();

  await page.waitForURL("**/profile");
  console.log("✅ Profile page loaded!");

  const cookies = await context.cookies();
  fs.writeFileSync(
    "src/storage/cookies.json",
    JSON.stringify(cookies, null, 2)
  );
  console.log("🍪 Cookies saved to src/storage/cookies.json");

  // Зберігаємо state (для Playwright)
  await context.storageState({ path: "src/storage/cookies.json" });
  console.log("💾 Storage state saved to src/storage/cookies.json");

  await browser.close();
})();
