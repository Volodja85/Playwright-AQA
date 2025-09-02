import { test, expect } from "@playwright/test";

test("Successful registration with valid credentials", async ({ page }) => {
  await page.goto("/");

  await page.getByRole("button", { name: /Sign up/i }).click();

  const nameField = page.locator("#signupName");
  const lastNameField = page.locator("#signupLastName");
  const emailField = page.locator("#signupEmail");
  const passwordField = page.locator("#signupPassword");
  const repeatPasswordField = page.locator("#signupRepeatPassword");
  const registerButton = page.getByRole("button", { name: /Register/i });

  await nameField.fill("Volodja");
  await lastNameField.fill("Zhemela");
  const email = `aqa-${Date.now()}@gmail.com`; // унікальний email
  await emailField.fill(email);
  await passwordField.fill("Password123");
  await repeatPasswordField.fill("Password123");
  await registerButton.click();

  await expect(page).toHaveURL(/.*garage/); // або інша сторінка після логіну
});
