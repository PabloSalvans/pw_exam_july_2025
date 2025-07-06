import { Page } from '@playwright/test';
import { HomePage } from '../pageobjects/pages/home.page';
import { RegisterPage } from '../pageobjects/pages/register.page';
import { OverviewPage } from '../pageobjects/pages/overview.page';

export class PageManager {
  readonly page: Page;
  readonly homePage: HomePage;
  readonly registerPage: RegisterPage;
  readonly overviewPage: OverviewPage;

  constructor(page: Page) {
    this.page = page;
    this.homePage = new HomePage(page);
    this.registerPage = new RegisterPage(page);
    this.overviewPage = new OverviewPage(page);
  }

  onHomePage() {
    return this.homePage;
  }

  onRegisterPage() {
    return this.registerPage;
  }

  onOverviewPage() {
    return this.overviewPage;
  }
}
