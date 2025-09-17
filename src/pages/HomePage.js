import { BasePage } from "./BasePage";
import { RegistrationPage } from "./RegistrationPage";

export class HomePage extends BasePage {
  constructor(page, url) {
    super(page, url);
    this.signUpButton = page.getByRole("button", { name: "Sign up" });
  }

  async clickSignUpButton() {
    await this.signUpButton.click();
    return new RegistrationPage(this.page);
  }
}
