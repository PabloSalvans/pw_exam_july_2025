import test, { expect } from '@playwright/test';
import { faker } from '@faker-js/faker/locale/en_US';

test('exam', async ({ page }) => {
  // Ve a la pa gina: https://parabank.parasoft.com/
  await page.goto('https://parabank.parasoft.com/');
  //expect component to be visible

  //Haz clic en el enlace “Register”.
  const registerLink = page.locator('#loginPanel a[href*=register]');
  await registerLink.click();
  //expect registercomponent to be visible

  //Rellena y envía el formulario para registrar un nuevo usuario.
  const firstNameField = page.locator("input[id='customer.firstName']");
  const lastNameField = page.locator("input[id='customer.lastName']");
  const addressField = page.locator("input[id='customer.address.street']");
  const cityField = page.locator("input[id='customer.address.city']");
  const stateField = page.locator("input[id='customer.address.state']");
  const zipCodeField = page.locator("input[id='customer.address.zipCode']");
  const phoneNumberField = page.locator("input[id='customer.phoneNumber']");
  const ssnField = page.locator("input[id='customer.ssn']");
  const usernameField = page.locator("input[id='customer.username']");
  const passwordField = page.locator("input[id='customer.password']");
  const confirmPasswordField = page.locator('#repeatedPassword');
  const registerButton = page.locator('td input[type=submit]');

  const firstName = faker.person.firstName();
  const lastName = faker.person.lastName();
  const address = faker.location.streetAddress();
  const city = faker.location.city();
  const state = faker.location.state();
  const zipCode = faker.location.zipCode();
  const phoneNumber = faker.phone.number();
  const ssNumber = 'AAA-GG-SSSS';
  const userName = faker.internet.email({
    lastName: Date.now() as unknown as string,
  });
  const password = faker.internet.password();

  //   await expect(usernameField).toBeHidden();
  //   await expect(passwordField).toBeHidden();
  //   await expect(confirmPasswordField).toBeHidden();
  //   await expect(registerButton).toBeHidden();
  await firstNameField.fill(firstName);
  await lastNameField.fill(lastName);
  await addressField.fill(address);
  await cityField.fill(city);
  await stateField.fill(state);
  await zipCodeField.fill(zipCode);
  await phoneNumberField.fill(phoneNumber);
  await ssnField.fill(ssNumber);
  await expect(usernameField).toBeVisible();
  await expect(passwordField).toBeVisible();
  await expect(confirmPasswordField).toBeVisible();
  await expect(registerButton).toBeVisible();
  await usernameField.fill(userName);
  await passwordField.fill(password);
  await confirmPasswordField.fill(password);
  await registerButton.click();
  const logOutButton = page.locator('#leftPanel a[href*=logout]');
  //await expect(logOutButton).toBeVisible();
  //expect username to be displayed

  //Haz clic en el enlace “Log Out”.
  await logOutButton.click();

  //Inicia sesio n con los datos de tu nuevo usuario.
  const loginUsernameField = page.locator('#loginPanel input[type=text]');
  const loginPasswordField = page.locator('#loginPanel input[type=password]');
  const loginButton = page.locator('#loginPanel input[type=submit]');
  await loginUsernameField.fill(userName);
  await loginPasswordField.fill(password);
  await loginButton.click();
  //expect accounts component to be visible
  //or epxect logout to be hidden
});

// Ve a la pa gina: https://parabank.parasoft.com/
// 2. Haz clic en el enlace “Register”.
// 3. Rellena y enví a el formulario para registrar un nuevo usuario.
// 4. Haz clic en el enlace “Log Out”.
// 5. Inicia sesio n con los datos de tu nuevo usuario.
