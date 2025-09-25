//node src/setup/cookiesSetap.js
import { chromium } from "@playwright/test";
import fs from "fs";
import { HomePage } from "../pages/HomePage.js"; // змінити на правильний шлях

const SID_PATH = "src/storage/sid.json";

(async () => {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext();
  const page = await context.newPage();

  const homePage = new HomePage(
    page,
    "https://guest:welcome2qauto@qauto.forstudy.space/"
  );

  await page.goto(homePage.url);

  const loginPage = await homePage.clickSignInButton();
  await page.waitForSelector("#signinEmail", { state: "visible" });

  await loginPage.typeSignEmail("v.zemela@gmail.com");
  await loginPage.typeSignPassword("Password123");

  const garagePage = await loginPage.clickLogin();
  await garagePage.waitForPage();
  await page.waitForURL("**/garage");

  const cookies = await context.cookies();
  const sidCookie = cookies.find((cookie) => cookie.name === "sid");

  if (!sidCookie) {
    console.error("Cookie 'sid' не знайдена.");
    process.exit(1);
  }

  fs.writeFileSync(SID_PATH, JSON.stringify({ sid: sidCookie.value }, null, 2));
  console.log(`Cookie 'sid' збережено у ${SID_PATH}`);

  await browser.close();
})();
