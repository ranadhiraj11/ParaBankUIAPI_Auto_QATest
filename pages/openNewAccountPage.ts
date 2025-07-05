import {Page, Locator, expect} from '@playwright/test';

export class OpenNewAccountPage {
    readonly page: Page;
    readonly locators: {
        readonly selectAccountMenu: Locator;
        readonly btnOpenNewAccount: Locator;
    };

    constructor(page: Page) {
        this.page = page;
        this.locators = {
            selectAccountMenu: page.locator('#type'),
            btnOpenNewAccount: page.getByRole('button', { name: 'Open New Account' })
        }
    }
    
    async openSavingsAccount() {
        await this.locators.selectAccountMenu.selectOption('SAVINGS');
        await expect(this.locators.btnOpenNewAccount).toBeVisible();
        await expect(this.locators.btnOpenNewAccount).toBeEnabled();
        await this.page.waitForTimeout(500);
        console.log('Clicking...');
        await this.locators.btnOpenNewAccount.click();
       
        const resultLocator = this.page.locator('#openAccountResult');
        const accountIdLocator = this.page.locator('#newAccountId');

        // Assert content is displayed
        await expect(resultLocator).toContainText('Account Opened!');
        await expect(resultLocator).toContainText('Congratulations, your account is now open.');
        await expect(resultLocator).toContainText('Your new account number:');

        // Wait until the account ID is visible and has non-empty text
        await expect(accountIdLocator).toBeVisible();
        await expect(accountIdLocator).not.toHaveText('');

        // Safely extract and trim the text
        const accountId = (await accountIdLocator.textContent())?.trim();

        if (!accountId) {
            throw new Error('Account ID is still empty after waiting.');
        }

        console.log('New Account ID:', accountId);
        return accountId;
    }

}