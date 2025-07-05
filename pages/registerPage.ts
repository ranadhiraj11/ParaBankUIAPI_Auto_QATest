import {Page, Locator, expect} from '@playwright/test';
import { generateUser } from '../helper/user-payee-generator';

export class RegisterPage {
    readonly page: Page;
    readonly locators: {
        readonly firstNameTextBox: Locator;
        readonly lastNameTextBox: Locator;
        readonly addressTextBox: Locator;
        readonly cityTextBox: Locator;
        readonly stateTextBox: Locator;
        readonly zipCodTextBoxe: Locator;
        readonly phoneTextBox: Locator;
        readonly ssnTextBox: Locator;
        readonly usernameTextBox: Locator;
        readonly passwordTextBox: Locator;
        readonly confirmTextBox: Locator;
        readonly registerButton: Locator;
        readonly successTitle: Locator;
        readonly successMsg: Locator;
    };

    constructor(page: Page) {
        this.page = page;
        this.locators = {
            firstNameTextBox: page.locator('input[name="customer.firstName"]'),
            lastNameTextBox: page.locator('input[name="customer.lastName"]'),
            addressTextBox: page.locator('input[name="customer.address.street"]'),
            cityTextBox: page.locator('input[name="customer.address.city"]'),
            stateTextBox: page.locator('input[name="customer.address.state"]'),
            zipCodTextBoxe: page.locator('input[name="customer.address.zipCode"]'),
            phoneTextBox: page.locator('input[name="customer.phoneNumber"]'),
            ssnTextBox: page.locator('input[name="customer.ssn"]'),
            usernameTextBox: page.locator('input[name="customer.username"]'),
            passwordTextBox: page.locator('input[name="customer.password"]'),
            confirmTextBox: page.locator('input[name="repeatedPassword"]'), 
            registerButton: page.getByRole('button', {name: 'REGISTER'}),
            successTitle: page.locator('.title'),
            successMsg: page.getByText('Your account was created successfully. You are now logged in')
        }
    }

    async registerUser(){
        const user = generateUser();
        await this.locators.firstNameTextBox.fill(user.firstName);
        await this.locators.lastNameTextBox.fill(user.lastname);
        await this.locators.addressTextBox.fill(user.address);
        await this.locators.cityTextBox.fill(user.city);
        await this.locators.stateTextBox.fill(user.state);
        await this.locators.zipCodTextBoxe.fill(user.zipCode);
        await this.locators.phoneTextBox.fill(user.phone);
        await this.locators.ssnTextBox.fill(user.ssn);
        await this.locators.usernameTextBox.fill(user.username);
        await this.locators.passwordTextBox.fill(user.password);
        await this.locators.confirmTextBox.fill(user.password);
        await this.locators.registerButton.click();

        const usernameError = this.page.locator('text=This username already exists.');

        if (await usernameError.isVisible({ timeout: 2000 })) {
            throw new Error(`Username already exists: ${user.username}`);
        }

        //  Verify registration success
        await expect(this.locators.successTitle).toHaveText('Welcome ' + user.username);
        await expect(this.locators.successMsg).toBeVisible();

        //  Log out
        await this.page.click('text=Log Out');

        //  Log in with the same credentials
        await this.page.fill('input[name="username"]', user.username);
        await this.page.fill('input[name="password"]', user.password);
        await this.page.click('input[value="Log In"]');

        //  Verify login success
        await expect(this.page.getByRole('heading', { name: 'Accounts Overview' })).toBeVisible();

    }

    
}