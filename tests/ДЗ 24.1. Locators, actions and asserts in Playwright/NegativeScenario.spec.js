import { test, expect } from "@playwright/test";

test.describe('Negative Registration fails if email does not start with "aqa"', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
    await page.getByRole("button", { name: /Sign up/i }).click();
  });

  test("Перевірка Field Name less than 2 letters", async ({ page }) => {
    const nameField = page.locator("#signupName");
    await nameField.fill("V");
    await nameField.blur();
    await expect(
      page.getByText("Name has to be from 2 to 20 characters long", {
        exact: true,
      })
    ).toBeVisible();
    await nameField.fill("");
  });

  test("Перевірка Field Name more than 20 letters", async ({ page }) => {
    const nameField = page.locator("#signupName");
    await nameField.fill("V".repeat(25));
    await nameField.blur();
    await expect(
      page.getByText("Name has to be from 2 to 20 characters long", {
        exact: true,
      })
    ).toBeVisible();
    await nameField.fill("");
  });

  test("Перевірка Field Last name less than 2 letters", async ({ page }) => {
    const lastNameField = page.locator("#signupLastName");
    await lastNameField.fill("Z");
    await lastNameField.blur();
    await expect(
      page.getByText("Last name has to be from 2 to 20 characters long", {
        exact: true,
      })
    ).toBeVisible();
    await lastNameField.fill("");
  });

  test("Перевірка Field Last name less than 20 letters", async ({ page }) => {
    const lastNameField = page.locator("#signupLastName");
    await lastNameField.fill("Z".repeat(25));
    await lastNameField.blur();
    await expect(
      page.getByText("Last name has to be from 2 to 20 characters long", {
        exact: true,
      })
    ).toBeVisible();
    await lastNameField.fill("");
  });

  test("помилки вводу некоректного email", async ({ page }) => {
    const invalidEmails = ["test", "test@", "@domain.com", "test@com", "t@.c"];
    const emailField = page.locator("#signupEmail");
    for (const email of invalidEmails) {
      await emailField.fill(email);
      await emailField.blur();
      await expect(
        page.getByText("Email is incorrect", { exact: true })
      ).toBeVisible();
      await emailField.fill("");
    }
  });

  test("помилки вводу некоректного пароля", async ({ page }) => {
    const invalidPasswords = [
      "Ab1!",
      "password123!",
      "PASSWORD123!",
      "Password!",
    ];
    const passwordField = page.locator("#signupPassword");
    for (const password of invalidPasswords) {
      await passwordField.fill(password);
      await passwordField.blur();
      await expect(
        page.getByText(
          "Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter",
          { exact: true }
        )
      ).toBeVisible();
      await passwordField.fill("");
    }
  });

  test('"помилки вводу некоректного повторного пароля"', async ({ page }) => {
    await page.locator("#signupName").fill("Volodja");
    await page.locator("#signupLastName").fill("Zhemela");
    const email = `aqa-${Date.now()}@gmail.com`;
    await page.locator("#signupEmail").fill(email);
    await page.locator("#signupPassword").fill("Password123");
    const repeatPasswordField = page.locator("#signupRepeatPassword");
    await repeatPasswordField.fill("Password1");
    await repeatPasswordField.blur();

    await expect(
      page.getByText("Passwords do not match", { exact: true })
    ).toBeVisible();
  });
});
