import { ProfilePage } from "./ProfilePage.js";

export class GaragePage {
  constructor(page) {
    this.page = page;
    this.pageTitle = page.locator("h1", { hasText: "Garage" });
    this.profileLink = page.locator(
      "//a[contains(@class, 'btn-sidebar') and contains(@class, '-profile')]"
    );
  }

  async goto() {
    await this.page.goto("/panel/garage");
  }

  async gotoProfilePage() {
    await this.profileLink.click();
    return new ProfilePage(this.page);
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
