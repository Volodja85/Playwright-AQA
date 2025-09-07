export class RegistrationPage {
  constructor(page) {
    this.page = page;
    this.usernameInput = page.locator("#signupName");
    this.userlastnameInput = page.locator("#signupLastName");
    this.emailInput = page.locator("#signupEmail");
    this.passwordInput = page.locator("#signupPassword");
    this.repeatPasswordInput = page.locator("#signupRepeatPassword");
    this.registerButton = page.getByRole("button", { name: "Register" });
  }

  async typeUsername(name) {
    await this.usernameInput.fill(name);
    //return new RegistrationPage(this.page);
  }

  async typeUserlastname(lastname) {
    await this.userlastnameInput.fill(lastname);
    // return this;
  }

  async typeEmail(email) {
    await this.emailInput.fill(email);
    // return this;
  }

  async typePassword(password) {
    await this.passwordInput.fill(password, { sensitive: true });
    //return this;
  }

  async typeRepeatPassword(password) {
    await this.repeatPasswordInput.fill(password, { sensitive: true });
    // return this;
  }

  async clickRegister() {
    await this.registerButton.click();
    // return this;
  }
}
