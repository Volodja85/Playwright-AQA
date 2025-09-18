import { BasePage } from "./BasePage.js";
import { LoginPage } from "./LoginPage.js";
import { RegistrationPage } from "./RegistrationPage.js";

export class HomePage extends BasePage {
  constructor(page, url) {
    super(page, url);
    this.signUpButton = page.getByRole("button", { name: "Sign up" });
    this.signInButton = page.getByRole("button", { name: "Sign In" });
  }

  async clickSignUpButton() {
    await this.signUpButton.click();
    return new RegistrationPage(this.page);
  }

  async clickSignInButton() {
    await this.signInButton.click();
    return new LoginPage(this.page);
  }
}
