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

  async loginWithReattempts(
    user: string,
    password: string,
    maxRetries: number
  ) {
    for (let tries = 1; tries <= maxRetries; tries++) {
      try {
        await this.loginUsernameField.fill(user);
        await this.loginPasswordField.fill(password);
        await this.loginButton.click();

        const errorText = this.page.locator('h1:has-text("Error!")');

        if (await errorText.isVisible()) {
          if (tries < maxRetries) {
            await this.page.reload();
            continue;
          }
        } else {
          console.log(`Login successful on attempt ${tries}`);
          return;
        }
      } catch (error) {
        console.log(`Login attempt ${tries} failed:`, error.message);
        if (tries < maxRetries) {
          await this.navigation();
        }
      }
    }

    const errorMessage = [
      `LOGIN FAILED AFTER ${maxRetries} ATTEMPTS`,
      `Username: ${user} (successfully registered some seconds ago, with API response 200)`,
      `Password: ${password}`,
      `Known issue: This is not a test failure. ParaBank frequently shows "An internal error has occurred" even with valid credentials`,
      `Suggestion: To better assess the test automation please run the test with '--repeat-each' or 'retry'`,
    ].join('\n');

    console.error(errorMessage);
    throw new Error(errorMessage);
  }
}
