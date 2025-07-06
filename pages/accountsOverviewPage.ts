import {Page, Locator, expect} from '@playwright/test';

export class AccountOverviewPage {
    readonly page: Page;
    readonly locators: {
        readonly navAccountOveriewLink : Locator;
    
    };

    constructor(page: Page) {
        this.page = page;
        this.locators = {
            navAccountOveriewLink: (page.getByRole('link', { name: 'Accounts Overview' }))
        }
    }

    async navigateToAccountOverview() {
        await this.page.waitForTimeout(500);
        await this.locators.navAccountOveriewLink.click();
    }

    async validateAccountOverviewPage(accountId : string) {
        const rowBalanceDetails = this.page.locator('tbody tr', { hasText: accountId });
        await expect(rowBalanceDetails).toBeVisible();
        await expect(rowBalanceDetails).toContainText(accountId);
        await expect(rowBalanceDetails).toContainText('$100.00');
        
    }
}