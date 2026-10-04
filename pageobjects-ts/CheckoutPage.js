export class CheckoutPage {
    page;
    countryInput;
    countryDropdown;
    userName;
    placeOrderButton;
    constructor(page) {
        this.page = page;
        this.countryInput = page.locator("[placeholder*=Country]");
        this.countryDropdown = page.locator(".ta-results button");
        this.userName = page.locator(".user__name [type='text']").first();
        this.placeOrderButton = page.locator("a:has-text('PLACE ORDER')");
    }
    async selectCountry(country) {
        await this.countryInput.fill(country);
        await this.countryDropdown.first().waitFor();
        await this.countryDropdown.last().click();
    }
    async verifyUserName(username) {
        await this.page.waitForSelector(".user__name [type='text']");
    }
    async placeOrder() {
        await this.placeOrderButton.click();
    }
    async getOrderId() {
        const orderId = await this.page
            .locator(".em-spacer-1 .ng-star-inserted")
            .first()
            .textContent();
        return orderId?.trim() ?? "";
    }
}
