export class GaragePage {
  constructor(page) {
    this.page = page;
    this.pageTitle = page.locator("h1", { hasText: "Garage" });
  }

  async goto() {
    await this.page.goto("/panel/garage");
  }

  async getTitleText() {
    return this.pageTitle.textContent();
  }

  async waitForPage() {
    await this.pageTitle.waitFor({ state: "visible" });
  }

  async getAddCarButton() {
    return this.page.getByRole("button", { name: "Add car" });
  }
}
