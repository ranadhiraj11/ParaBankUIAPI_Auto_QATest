import {Page, Locator, expect} from '@playwright/test';

export class TransferFundsPage {
    readonly page:Page;
    readonly locators: {
        readonly navTransferFundsLink: Locator;
        readonly amountToTransferTextBox: Locator;
        readonly transferFromAccountDropDown: Locator;
        readonly toAccountDropDown: Locator;
        readonly btnTransfer: Locator;
        readonly transferSuccessMessage: Locator
    }

    constructor(page: Page) {
        this.page = page;
        this.locators = {
            navTransferFundsLink: page.locator('#leftPanel').getByRole('link', { name: 'Transfer Funds' }),
            amountToTransferTextBox: page.locator('#amount'),
            transferFromAccountDropDown: page.locator('#fromAccountId'),
            toAccountDropDown: page.locator('#toAccountId'),
            btnTransfer: page.getByRole('button', { name: 'Transfer' }),
            transferSuccessMessage: page.locator('#showResult')
        }
    }

    async navigateToTransferFund() {
        await this.locators.navTransferFundsLink.click();
    }

    async transferFunds(fromAccountId: string){
        await this.locators.amountToTransferTextBox.fill('20');
        await this.locators.transferFromAccountDropDown.selectOption(fromAccountId);
        const toAccountId = await this.locators.toAccountDropDown.inputValue();
        console.log('To Account ID:', toAccountId);
        await this.locators.btnTransfer.click();
        await expect(this.locators.transferSuccessMessage).toContainText('Transfer Complete!');
        await expect(this.locators.transferSuccessMessage).toContainText(`$20.00 has been transferred from account #${fromAccountId} to account #${toAccountId}.`);
        await expect(this.locators.transferSuccessMessage).toContainText('See Account Activity for more details.')

    }
}