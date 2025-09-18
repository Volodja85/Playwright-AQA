import { GaragePage } from "./GaragePage.js";

export class LoginPage {
  constructor(page) {
    this.page = page;
    this.signEmail = page.locator("#signinEmail");
    this.signPassword = page.locator("#signinPassword");
    this.rememberFlag = page.locator("#remember");
    this.loginButton = page.getByRole("button", { name: "Login" });
  }

  async typeSignEmail(email) {
    await this.signEmail.waitFor({ state: "visible" });
    await this.signEmail.fill(email);
  }

  async typeSignPassword(password) {
    await this.signPassword.waitFor({ state: "visible" });
    await this.signPassword.fill(password);
  }

  async clickRememberFlag() {
    await this.rememberFlag.click();
  }

  async clickLogin() {
    await Promise.all([
      this.page.waitForNavigation({ waitUntil: "load" }),
      this.loginButton.click(),
    ]);
    return new GaragePage(this.page);
  }
}
