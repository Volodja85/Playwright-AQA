import { test, expect } from "@playwright/test";
import { HomePage } from "../../src/pages/HomePage";

test.describe("Registration Tests", () => {
  let homePage;
  let regPage;
  const email = `aqa-${Date.now()}@gmail.com`;
  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page, "/");
    await homePage.visit();
    regPage = await homePage.clickSignUpButton();
  });
  test("Перевірка Field Name less than 2 letters", async ({ page }) => {
    await regPage.typeUsername("V");
    await regPage.typeUserlastname("");

    await expect(
      page.getByText("Name has to be from 2 to 20 characters long", {
        exact: true,
      })
    ).toBeVisible();
  });

  test("Перевірка Field Name more than 20 letters", async ({ page }) => {
    await regPage.typeUsername("V".repeat(25));
    await regPage.typeUserlastname("");

    await expect(
      page.getByText("Name has to be from 2 to 20 characters long", {
        exact: true,
      })
    ).toBeVisible();
  });

  test("Перевірка Field Last name less than 2 letters", async ({ page }) => {
    await regPage.typeUsername("Volodja");
    await regPage.typeUserlastname("Z");
    await regPage.typeEmail("");

    await expect(
      page.getByText("Last name has to be from 2 to 20 characters long", {
        exact: true,
      })
    ).toBeVisible();
  });

  test("Перевірка Field Last name less than 20 letters", async ({ page }) => {
    await regPage.typeUsername("Volodja");
    await regPage.typeUserlastname("Z".repeat(25));
    await regPage.typeEmail("");

    await expect(
      page.getByText("Last name has to be from 2 to 20 characters long", {
        exact: true,
      })
    ).toBeVisible();
  });

  test("помилки вводу некоректного email", async ({ page }) => {
    await regPage.typeUsername("Valid");
    await regPage.typeUserlastname("Kompas");
    await regPage.typeEmail("@example.com");
    await regPage.typePassword("");

    await expect(
      page.getByText("Email is incorrect", { exact: true })
    ).toBeVisible();
  });

  test("помилки вводу некоректного пароля", async ({ page }) => {
    await regPage.typeUsername("ValidName");
    await regPage.typeUserlastname("Kompas");
    await regPage.typeEmail("aqa-email@example.com");
    await regPage.typePassword("Password!");
    await regPage.typeRepeatPassword("");

    await expect(
      page.getByText(
        "Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter",
        { exact: true }
      )
    ).toBeVisible();
  });

  test("Positive: successful registration", async ({ page }) => {
    await regPage.typeUsername("ValidName");
    await regPage.typeUserlastname("Kompas");
    await regPage.typeEmail(email);
    await regPage.typePassword("Password123");
    await regPage.typeRepeatPassword("Password123");
    await regPage.clickRegister();

    await expect(page).toHaveURL(/.*garage/);
  });
});
