import { chromium } from "@playwright/test";
import { HomePage } from "../pages/HomePage.js";
//import { HomePage } from "../pages/HomePage.js";
//node src/setup/login.js запуск файлу

(async () => {
  const browser = await chromium.launch();
  const context = await browser.newContext();
  const page = await context.newPage();

  const homePage = new HomePage(
    page,
    "https://guest:welcome2qauto@qauto.forstudy.space/"
  );
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

  await page.waitForURL("**/garage");
  console.log("garage page loaded!");

  await context.storageState({ path: "src/storage/user.json" });
  console.log("Save context state!");

  await browser.close();
  console.log("Login storage state saved!");
})();
