import { Locator, Page } from '@playwright/test';
import { parabankUser } from '../../fixtures/types';
import { faker } from '@faker-js/faker/locale/en_US';

export class RegisterPage {
  get URL(): string {
    return 'https://parabank.parasoft.com/parabank/register.htm';
  }

  readonly page: Page;
  readonly component: Locator;
  readonly firstNameField: Locator;
  readonly lastNameField: Locator;
  readonly addressField: Locator;
  readonly cityField: Locator;
  readonly stateField: Locator;
  readonly zipCodeField: Locator;
  readonly phoneNumberField: Locator;
  readonly ssnField: Locator;
  readonly usernameField: Locator;
  readonly passwordField: Locator;
  readonly confirmPasswordField: Locator;
  readonly registerButton: Locator;
  readonly usernameErrorMessage: Locator;
  readonly welcomeMessage: Locator;

  constructor(page: Page) {
    this.page = page;
    this.component = page.locator('#customerForm');
    this.firstNameField = page.locator("input[id='customer.firstName']");
    this.lastNameField = page.locator("input[id='customer.lastName']");
    this.addressField = page.locator("input[id='customer.address.street']");
    this.cityField = page.locator("input[id='customer.address.city']");
    this.stateField = page.locator("input[id='customer.address.state']");
    this.zipCodeField = page.locator("input[id='customer.address.zipCode']");
    this.phoneNumberField = page.locator("input[id='customer.phoneNumber']");
    this.ssnField = page.locator("input[id='customer.ssn']");
    this.usernameField = page.locator("input[id='customer.username']");
    this.passwordField = page.locator("input[id='customer.password']");
    this.confirmPasswordField = page.locator('#repeatedPassword');
    this.registerButton = page.locator('td input[type=submit]');
    this.usernameErrorMessage = page.locator("[id='customer.username.errors']");
    this.welcomeMessage = page.locator('h1[class=title]');
  }

  async registerNewUser(
    userData: parabankUser,
    maxTriesToFindAcceptedUsername: number
  ): Promise<number> {
    await this.firstNameField.fill(userData.firstName);
    await this.lastNameField.fill(userData.lastName);
    await this.addressField.fill(userData.address);
    await this.cityField.fill(userData.city);
    await this.stateField.fill(userData.state);
    await this.zipCodeField.fill(userData.zipCode);
    await this.phoneNumberField.fill(userData.phoneNumber);
    await this.ssnField.fill(userData.ssNumber);
    await this.usernameField.fill(userData.userName);
    await this.passwordField.fill(userData.password);
    await this.confirmPasswordField.fill(userData.password);
    const responsePromise = this.page.waitForResponse(
      'https://parabank.parasoft.com/parabank/register.htm'
    );
    await this.registerButton.click();
    if (await this.userAlreadyExists(1000)) {
      await this.findAcceptedUsernameAndPasswordAndSubmit(
        userData,
        maxTriesToFindAcceptedUsername
      );
    }
    const response = await responsePromise;
    return response.status();
  }

  async findAcceptedUsernameAndPasswordAndSubmit(
    userData: parabankUser,
    maxTries: number
  ): Promise<string> {
    let tries = 0;
    let acceptedEmail = userData.userName;
    const triedEmails: string[] = [];
    try {
      while (tries < maxTries && (await this.userAlreadyExists(1000))) {
        const randomString = faker.string.alpha({ length: 6 });
        const randomNumber = faker.number.int({ min: 1000, max: 9999 });
        const randomDomain = faker.helpers.arrayElement([
          'gmail.com',
          'yahoo.com',
          'hotmail.com',
        ]);
        const nextEmailTry = `${randomString}${randomNumber}@${randomDomain}`;
        await this.usernameField.fill(nextEmailTry);
        await this.passwordField.fill(userData.password);
        await this.confirmPasswordField.fill(userData.password);
        await this.registerButton.click();
        acceptedEmail = nextEmailTry;
        triedEmails.push(acceptedEmail);
        tries++;
      }
    } catch (error) {
      const errorMessage = [
        `REGISTRATION FAILED`,
        `Attempts: ${tries}`,
        `Usernames: ${triedEmails}`,
        `Original error: ${error.message}`,
      ].join('\n');
      throw new Error(errorMessage);
    }
    console.log(
      `Accepted user: '${acceptedEmail}'. Password: ${userData.password}`
    );
    return acceptedEmail;
  }

  async userAlreadyExists(setTimeout: number): Promise<boolean> {
    const errorMessage = this.usernameErrorMessage.filter({
      hasText: 'username already exists',
    });
    try {
      await errorMessage.waitFor({ state: 'visible', timeout: setTimeout });
      return true;
    } catch {
      return false;
    }
  }
}
