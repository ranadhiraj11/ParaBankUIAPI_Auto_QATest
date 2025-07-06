import { expect, test } from '@playwright/test';
import { HomePage } from '../pages/homePage';
import { OpenNewAccountPage } from '../pages/openNewAccountPage';
import { AccountOverviewPage } from '../pages/accountsOverviewPage';
import { TransferFundsPage } from '../pages/transferFundsPage';
import { BillPayPage } from '../pages/billPayPage';
import { RegisterPage } from '../pages/registerPage';
import { generatePayee, generateUser, Payee, User } from '../helper/userPayeeGenerator';


const findTransactionsUrl = (accountId: string, payee: Payee) =>
  `/parabank/services_proxy/bank/accounts/${ accountId }/transactions/amount/${ payee.amount }?timeout=30000`;

test("is able to create account and make transactions", async ({ page, request }) => {
  const homePage = new HomePage(page);
  const registerPage = new RegisterPage(page);
  const openNewAccountPage = new OpenNewAccountPage(page);
  const accountOverviewPage = new AccountOverviewPage(page);
  const transferFundsPage = new TransferFundsPage(page);
  const billPayPage = new BillPayPage(page);

  let user: User = generateUser();
  let payee: Payee = generatePayee();
  let accountId: string | undefined;

  await test.step("should be able to create account", async () => {
    await homePage.goToParaBank();
    await homePage.navigateTo(homePage.locators.navRegisterLink);
    await registerPage.registerUser(user);
  });

  await test.step("Verify global navigation Menu links redirect correctly", async () => {
    for (const { locator, urlPattern } of homePage.getNavLinksToVerify()) {
      await homePage.navigateAndVerify(locator, urlPattern);
    }
  });

  await test.step('Verify new savings account created successfully', async () => {
    await homePage.navigateTo(homePage.locators.navOpenNewAccountLink);
    accountId = await openNewAccountPage.openSavingsAccount();
    await accountOverviewPage.navigateToAccountOverview();
    await accountOverviewPage.validateAccountOverviewPage(accountId);
  });

  await test.step('Verify Transfer funds from new account successfully', async () => {
    await transferFundsPage.navigateToTransferFund();
    await transferFundsPage.transferFunds(accountId as string);
  });

  await test.step('Verify Pay bill using new account successfully', async () => {
    await billPayPage.navigatetoBillPay();
    await billPayPage.payBill(accountId as string, payee);
  });

  await test.step('Verify Find transactions by amount successfully', async () => {
    const response = await page.request.get(findTransactionsUrl(accountId as string, payee));
    expect(response.ok()).toBeTruthy();
    const body = await response.json();
    expect(body).toEqual(expect.arrayContaining([
      expect.objectContaining({
        accountId: Number(`${ accountId }`),
        amount: Number(`${ payee.amount }`),
        description: `Bill Payment to ${ payee.payeeName }`,
        type: "Debit"
      })
    ]))
  });

});
