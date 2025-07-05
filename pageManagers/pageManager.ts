import { Page } from '@playwright/test';
import { HomePage } from '../pageobjects/pages/home.page';
import { RegisterPage } from '../pageobjects/pages/register.page';

export class PageManager {
  readonly page: Page;
  readonly homePage: HomePage;
  readonly registerPage: RegisterPage;
  //   readonly coffeeSubscriptionsPage: CoffeeSubscriptionsPage;
  //   readonly checkoutShoppingBagSummaryPage: ShoppingBagSummaryPage;
  //   readonly checkoutPaymentPage: CheckoutPaymentPageLocal;
  //   readonly checkoutOrderSummaryPage: OrderSummaryPage;
  //   readonly paypalPopupPage: PaypalPopupPage;
  //   readonly checkoutOrderConfirmationPage: CheckoutOrderConfirmationPageLocal;

  constructor(page: Page) {
    this.page = page;
    this.homePage = new HomePage(page);
    this.registerPage = new RegisterPage(page);
    // this.coffeeSubscriptionsPage = new CoffeeSubscriptionsPage(page, baseURL);
    // this.checkoutShoppingBagSummaryPage = new ShoppingBagSummaryPage(page, baseURL);
    // this.checkoutPaymentPage = new CheckoutPaymentPageLocal(page, baseURL);
    // this.checkoutOrderSummaryPage = new OrderSummaryPage(page, baseURL);
    // this.paypalPopupPage = new PaypalPopupPage(page);
    // this.checkoutOrderConfirmationPage = new CheckoutOrderConfirmationPageLocal(page, baseURL);
  }

  onHomePage() {
    return this.homePage;
  }

  onRegisterPage() {
    return this.registerPage;
  }
}
