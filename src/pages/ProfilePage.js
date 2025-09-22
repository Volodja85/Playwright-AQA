export class ProfilePage {
  constructor(page) {
    this.page = page;
    this.profile_name = page.locator("p.profile_name.display-4");
  }

  async getProfileName() {
    return this.profile_name.textContent();
  }
  async gotoProfile() {
    await this.page.goto("/panel/profile");
  }
}
