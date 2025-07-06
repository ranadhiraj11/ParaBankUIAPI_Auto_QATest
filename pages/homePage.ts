import {Page, Locator, expect} from '@playwright/test';

export class HomePage {
    readonly page: Page;
    readonly locators: {
        readonly navRegisterLink: Locator;
        readonly navHomeLink: Locator;
        readonly navAboutLink: Locator;
        readonly navContactLink: Locator;
        readonly navOpenNewAccountLink: Locator;
    };

    constructor(page: Page) {
        this.page = page;
        this.locators = {
            navRegisterLink: page.getByRole('link', { name: 'Register' }),
            navHomeLink: page.getByRole('link', { name: 'home', exact: true }),
            navAboutLink: page.getByRole('link', { name: 'about', exact: true }),
            navContactLink: page.getByRole('link', { name: 'contact', exact: true }),
            navOpenNewAccountLink: page.getByRole('link', { name: 'Open New Account' })

        }
    }

    async goToParaBank() {
        await this.page.goto('/');
    }

    async navigateTo(linkLocator: Locator) {
        await linkLocator.click();
    }

    async navigateAndVerify(linkLocator: Locator, expectedUrlPart: string | RegExp) {
        await linkLocator.click();
        await this.page.waitForLoadState('load');
        await expect(this.page).toHaveURL(expectedUrlPart);
    }

    
    getNavLinksToVerify() {
    return [
        { locator: this.locators.navHomeLink, urlPattern: /index\.htm$/ },
        { locator: this.locators.navAboutLink, urlPattern: /about\.htm$/ },
        { locator: this.locators.navContactLink, urlPattern: /contact\.htm$/ },
    ];
    }



}