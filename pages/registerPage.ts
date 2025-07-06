import {Page, Locator, expect} from '@playwright/test';
import { generateUser, User } from '../helper/userPayeeGenerator';

const keyPressDelay = 100;

export class RegisterPage {
    readonly page: Page;
    readonly locators: {
        readonly firstNameTextBox: Locator;
        readonly lastNameTextBox: Locator;
        readonly addressTextBox: Locator;
        readonly cityTextBox: Locator;
        readonly stateTextBox: Locator;
        readonly zipCodTextBox: Locator;
        readonly phoneTextBox: Locator;
        readonly ssnTextBox: Locator;
        readonly usernameTextBox: Locator;
        readonly passwordTextBox: Locator;
        readonly confirmTextBox: Locator;
        readonly registerButton: Locator;
        readonly successTitle: Locator;
        readonly successMsg: Locator;
        readonly userLoginTextBox: Locator;
        readonly userPasswordTextBox: Locator;
        readonly loginButton: Locator;
        readonly logoutLink: Locator;
        readonly successHeader: Locator;
    };

    constructor(page: Page) {
        this.page = page;
        this.locators = {
            firstNameTextBox: page.locator('input[name="customer.firstName"]'),
            lastNameTextBox: page.locator('input[name="customer.lastName"]'),
            addressTextBox: page.locator('input[name="customer.address.street"]'),
            cityTextBox: page.locator('input[name="customer.address.city"]'),
            stateTextBox: page.locator('input[name="customer.address.state"]'),
            zipCodTextBox: page.locator('input[name="customer.address.zipCode"]'),
            phoneTextBox: page.locator('input[name="customer.phoneNumber"]'),
            ssnTextBox: page.locator('input[name="customer.ssn"]'),
            usernameTextBox: page.locator('input[name="customer.username"]'),
            passwordTextBox: page.locator('input[name="customer.password"]'),
            confirmTextBox: page.locator('input[name="repeatedPassword"]'), 
            registerButton: page.getByRole('button', {name: 'REGISTER'}),
            successTitle: page.locator('.title'),
            successMsg: page.getByText('Your account was created successfully. You are now logged in'),
            userLoginTextBox: page.locator('input[name="username"]'),
            userPasswordTextBox: page.locator('input[name="password"]'),
            loginButton: page.locator('input[value="Log In"]'),
            logoutLink: page.locator('text=Log Out'),
            successHeader: page.getByRole('heading', { name: 'Accounts Overview' })
        }
    }

    async registerUser(user: User){
    await this.locators.firstNameTextBox.pressSequentially(user.firstName, { delay: keyPressDelay });
    await this.locators.lastNameTextBox.pressSequentially(user.lastname, { delay: keyPressDelay });
    await this.locators.addressTextBox.pressSequentially(user.address, { delay: keyPressDelay });
    await this.locators.cityTextBox.pressSequentially(user.city, { delay: keyPressDelay });
    await this.locators.stateTextBox.pressSequentially(user.state, { delay: keyPressDelay });
    await this.locators.zipCodTextBox.pressSequentially(user.zipCode, { delay: keyPressDelay });
    await this.locators.phoneTextBox.pressSequentially(user.phone, { delay: keyPressDelay });
    await this.locators.ssnTextBox.pressSequentially(user.ssn, { delay: keyPressDelay });
    await this.locators.usernameTextBox.pressSequentially(user.username, { delay: keyPressDelay });
    await this.locators.passwordTextBox.pressSequentially(user.password, { delay: keyPressDelay });
    await this.locators.confirmTextBox.pressSequentially(user.password, { delay: keyPressDelay });
    // try to prevent captcha
    await this.page.mouse.wheel(0, Math.random() * 500 + 200);
    await this.page.waitForTimeout(Math.random() * 2000 + 500);
    await this.locators.registerButton.click();

        const usernameError = this.page.locator('text=This username already exists.');

        if (await usernameError.isVisible({ timeout: 2000 })) {
            throw new Error(`Username already exists: ${user.username}`);
        }

        //  Verify registration success
        await expect(this.locators.successTitle).toHaveText('Welcome ' + user.username);
        await expect(this.locators.successMsg).toBeVisible();

        //  Log out
        await this.locators.logoutLink.click()

        //  Log in with the same credentials
        await this.locators.userLoginTextBox.fill(user.username)
        await this.locators.userPasswordTextBox.fill(user.password)
        await this.locators.loginButton.click()

        //  Verify login success
        await expect(this.locators.successHeader).toBeVisible();
    }

    
}