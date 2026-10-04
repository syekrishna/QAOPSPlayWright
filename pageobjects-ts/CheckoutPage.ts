import { type Page, type Locator } from "@playwright/test";

export class CheckoutPage {
    readonly page: Page;
    readonly countryInput: Locator;
    readonly countryDropdown: Locator;
    readonly userName: Locator;
    readonly placeOrderButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.countryInput = page.locator("[placeholder*=Country]");
        this.countryDropdown = page.locator(".ta-results button");
        this.userName = page.locator(".user__name [type='text']").first();
        this.placeOrderButton = page.locator("a:has-text('PLACE ORDER')");
    }

    async selectCountry(country: string): Promise<void> {
        await this.countryInput.fill(country);

        await this.countryDropdown.first().waitFor();
        await this.countryDropdown.last().click();
    }

    async verifyUserName(username: string): Promise<void> {
        await this.page.waitForSelector(".user__name [type='text']");
    }

    async placeOrder(): Promise<void> {
        await this.placeOrderButton.click();
    }

    async getOrderId(): Promise<string> {
        const orderId = await this.page
            .locator(".em-spacer-1 .ng-star-inserted")
            .first()
            .textContent();

        return orderId?.trim() ?? "";
    }
}