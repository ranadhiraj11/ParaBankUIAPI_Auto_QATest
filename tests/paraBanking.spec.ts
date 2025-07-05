import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/homePage';
import { OpenNewAccountPage } from '../pages/openNewAccountPage';
import { AccountOverviewPage } from '../pages/accountsOverviewPage';
import { TransferFundsPage } from '../pages/transferFundsPage';
import { BillPayPage } from '../pages/billPayPage';
import { saveAccountId } from '../utils/accountIdStore';
import { savePayee } from '../utils/payeeStore';
import { loadPayee } from '../utils/payeeStore';
import { getRequiredAccountId } from '../utils/accountUtils';

// Run before each UI test
test.beforeEach(async ({ page }, testInfo) => {
  // Only navigate for UI tests (not for API ones)
  if (!testInfo.title.includes('Find transactions')) {
    await page.goto('/');
  }
});

// 👤 User is already logged in from global-setup
test('Verify global navigation Menu links redirect correctly', async ({ page }) => {
  const homePage = new HomePage(page);

  for (const { locator, urlPattern } of homePage.getNavLinksToVerify()) {
    await homePage.navigateAndVerify(locator, urlPattern);
  }
});

test('Verify new savings account created successfully', async ({ page }) => {
  const homePage = new HomePage(page);
  await homePage.navigateTo(homePage.locators.navOpenNewAccountLink);

  const openNewAccountPage = new OpenNewAccountPage(page);
  const accountId = await openNewAccountPage.openSavingsAccount();

  saveAccountId(accountId); // persist to file
  console.log('Account ID saved for future tests:', accountId);

  const accountOverviewPage = new AccountOverviewPage(page);
  await accountOverviewPage.navigateToAccountOverview();
  await accountOverviewPage.validateAccountOverviewPage(accountId);
});

test('Verify Transfer funds from new account successfully', async ({ page }) => {
  const accountId = getRequiredAccountId();
  const transferFundsPage = new TransferFundsPage(page);
  await transferFundsPage.navigateToTransferFund();
  await transferFundsPage.transferFunds(accountId);
});

test('Verify Pay bill using new account successfully', async ({ page }) => {
  const accountId = getRequiredAccountId();
  const billPayPage = new BillPayPage(page);
  await billPayPage.navigatetoBillPay();
  const payee = await billPayPage.payBill(accountId);
  savePayee(payee);
});

test('Verify Find transactions by amount successfully', async ({page, request }) => { 
  const accountId = getRequiredAccountId();
  const payee = loadPayee();
  const response = await request.get(`/parabank/services_proxy/bank/accounts/${accountId}/transactions/amount/${payee.amount}?timeout=30000`);
  expect(response.ok()).toBeTruthy();
  const body = await response.json();
  expect(body).toEqual(expect.arrayContaining([
    expect.objectContaining({
      accountId: Number(`${accountId}`), 
      amount: Number(`${payee.amount}`),
      description: `Bill Payment to ${payee.payeeName}`,
      type: "Debit"
    })
  ]))
});
