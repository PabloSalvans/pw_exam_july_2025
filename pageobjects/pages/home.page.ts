import { Locator, Page } from '@playwright/test';

export class HomePage {
  get URL(): string {
    return 'https://parabank.parasoft.com/parabank/index.htm';
  }

  readonly page: Page;
  readonly component: Locator;
  readonly registerLink: Locator;
  readonly logoutButton: Locator;
  readonly loginUsernameField: Locator;
  readonly loginPasswordField: Locator;
  readonly loginButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.component = page.locator("body[onload*='document.login.username']");
    this.registerLink = page.locator('#loginPanel a[href*=register]');
    this.logoutButton = page.locator('#leftPanel a[href*=logout]');
    this.loginUsernameField = page.locator('#loginPanel input[type=text]');
    this.loginPasswordField = page.locator('#loginPanel input[type=password]');
    this.loginButton = page.locator('#loginPanel input[type=submit]');
  }

  async navigation() {
    await this.page.goto(this.URL);
  }
}
