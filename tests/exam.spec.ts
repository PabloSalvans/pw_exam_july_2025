import { expect, test } from '../fixtures/fixtures';
import { generateNewUserDataSet } from '../utils.ts';

test('Exam Pablo Salvans', async ({ pageManager }) => {
  test.slow();
  const userData = generateNewUserDataSet();
  await test.step('Ve a la página: https://parabank.parasoft.com/', async () => {
    await pageManager.onHomePage().navigation();
    await expect(pageManager.homePage.component).toBeVisible();
  });

  await test.step("Haz clic en el enlace 'Register'", async () => {
    await pageManager.onHomePage().registerLink.click();
    await expect(pageManager.onRegisterPage().component).toBeVisible();
  });

  await test.step('Rellena y envía el formulario para registrar un nuevo usuario', async () => {
    const registrationStatus = await pageManager
      .onRegisterPage()
      .registerNewUser(userData, 100);
    expect(registrationStatus).toEqual(200);
    await expect(pageManager.onHomePage().logoutButton).toBeVisible();
  });

  await test.step('Haz clic en el enlace “Log Out”', async () => {
    await pageManager.onHomePage().logoutButton.click();
    await expect(pageManager.onHomePage().loginButton).toBeVisible();
  });

  await test.step('Inicia sesión con los datos de tu nuevo usuario”', async () => {
    await pageManager
      .onHomePage()
      .loginWithReattempts(userData.userName, userData.password, 20);
    await expect(pageManager.onOverviewPage().component).toBeVisible();
  });
});
