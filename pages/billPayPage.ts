import {Page, Locator, expect} from '@playwright/test';
import { generatePayee, Payee } from '../helper/userPayeeGenerator';

export class BillPayPage {
    readonly page: Page;
    readonly locators: {
        readonly navBillPayLink: Locator;
        readonly nameTextBox: Locator
        readonly addressTextBox: Locator;
        readonly cityTextBox: Locator;
        readonly stateTextBox: Locator;
        readonly zipCodTextBox: Locator;
        readonly phoneTextBox: Locator;
        readonly accountTextBox: Locator;
        readonly verifyAccountTextBox: Locator;
        readonly amountTextBox: Locator;
        readonly btnSendPayment: Locator;
        readonly billPaySuccesMsg: Locator
        
    };

    constructor(page: Page) {
        this.page = page;
        this.locators = {
            navBillPayLink: page.locator('#leftPanel').getByRole('link', { name: 'Bill Pay' }),
            nameTextBox: page.locator('input[name="payee.name"]'),
            addressTextBox: page.locator('input[name="payee.address.street"]'),
            cityTextBox: page.locator('input[name="payee.address.city"]'),
            stateTextBox: page.locator('input[name="payee.address.state"]'),
            zipCodTextBox: page.locator('input[name="payee.address.zipCode"]'),
            phoneTextBox: page.locator('input[name="payee.phoneNumber"]'),
            accountTextBox: page.locator('input[name="payee.accountNumber"]'),
            verifyAccountTextBox: page.locator('input[name="verifyAccount"]'),
            amountTextBox: page.locator('input[name="amount"]'),
            btnSendPayment: page.getByRole('button', { name: 'Send Payment' }),
            billPaySuccesMsg: page.locator('#billpayResult')
        }
    }

    async navigatetoBillPay() {
        this.locators.navBillPayLink.click();
    }

    async payBill(fromAccountId: string, payee: Payee) {
        await this.locators.nameTextBox.fill(payee.payeeName);
        await this.locators.addressTextBox.fill(payee.address);
        await this.locators.cityTextBox.fill(payee.city);
        await this.locators.stateTextBox.fill(payee.state);
        await this.locators.zipCodTextBox.fill(payee.zipCode);
        await this.locators.phoneTextBox.fill(payee.phone);
        await this.locators.accountTextBox.fill(payee.account);
        await this.locators.verifyAccountTextBox.fill(payee.account);
        await this.locators.amountTextBox.fill(payee.amount);
        await this.page.waitForTimeout(500);
        await this.locators.btnSendPayment.click()

        await expect(this.locators.billPaySuccesMsg).toContainText('Bill Payment Complete')
        await expect(this.locators.billPaySuccesMsg).toContainText(`Bill Payment to ${payee.payeeName} in the amount of $${payee.amount}.00 from account ${fromAccountId} was successful.`)
        await expect(this.locators.billPaySuccesMsg).toContainText('See Account Activity for more details.')
    }
}