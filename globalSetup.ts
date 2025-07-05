// global-setup.ts
import { chromium, FullConfig } from '@playwright/test';
import { HomePage } from './pages/homePage';
import { RegisterPage } from './pages/registerPage';

async function globalSetup(config: FullConfig) {
  const browser = await chromium.launch();
  const context = await browser.newContext();
  const page = await browser.newPage();

  // Register a new user and log in
  const homePage = new HomePage(page);
  await homePage.goToParaBank();
  await homePage.navigateTo(homePage.locators.navRegisterLink);

  const registerPage = new RegisterPage(page);
  await registerPage.registerUser();

  // Save login session
  await page.context().storageState({ path: 'storageState.json' });
  console.log('Storage state saved to storageState.json');

  await browser.close();
}

export default globalSetup;
