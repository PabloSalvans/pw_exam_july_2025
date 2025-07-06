import { Locator, Page } from '@playwright/test';

export class OverviewPage {
  get URL(): string {
    return 'https://parabank.parasoft.com/parabank/overview.htm';
  }

  readonly page: Page;
  readonly component: Locator;

  constructor(page: Page) {
    this.page = page;
    this.component = page.locator('#overviewAccountsApp');
  }
}
