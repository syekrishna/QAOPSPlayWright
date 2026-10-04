import { type Page, type Locator } from "@playwright/test";

export class CartPage {
    readonly page: Page;
    readonly cartItems: Locator;
    readonly checkoutButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.cartItems = page.locator("div li");
        this.checkoutButton = page.locator("button").filter({
            hasText: "Checkout"
        });
    }

    async verifyProduct(productName: string): Promise<void> {
        const product = this.page.locator("h3", {
            hasText: productName
        });

        await product.waitFor();
    }

    async checkout(): Promise<void> {
        await this.checkoutButton.click();
    }
}