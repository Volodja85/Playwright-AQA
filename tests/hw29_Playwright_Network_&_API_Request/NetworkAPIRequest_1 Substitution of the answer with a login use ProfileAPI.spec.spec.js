import { test as base, expect } from "@playwright/test";
import { ProfilePage } from "../../src/pages/ProfilePage.js";

export const test = base.extend({
  userProfile: async ({ browser }, use) => {
    const context = await browser.newContext({
      storageState: "src/storage/cookies.json",
    });
    const page = await context.newPage();
    const profilePage = new ProfilePage(page);
    await profilePage.gotoProfile();

    await use(profilePage);

    await context.close();
  },
});

test("Підміна відповіді з логіном 2", async ({ userProfile }) => {
  const fakeUserData = {
    data: {
      name: "Fake Name",
      lastName: "Fake Lastname",
    },
  };

  // Підміна відповіді /users/profile
  await userProfile.page.route("**/users/profile", async (route) => {
    console.log("Перехоплено запит /users/profile");
    await route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify(fakeUserData),
    });
  });

  // Переходимо на сторінку профілю
  await userProfile.page.goto("https://qauto.forstudy.space/panel/profile");

  // Перевірка тексту
  const profileText = userProfile.page.locator("p.profile_name.display-4");
  await expect(profileText).toContainText("Fake Name");
  await expect(profileText).toContainText("Fake Lastname");
});
