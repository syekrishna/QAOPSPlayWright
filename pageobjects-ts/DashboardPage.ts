import { type Page, type Locator } from "@playwright/test";

export class DashboardPage {
    readonly page: Page;
    readonly products: Locator;
    readonly cartButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.products = page.locator(".card");
        this.cartButton = page.locator("[routerlink*='cart']");
    }

    async searchTextAddCart(productName: string): Promise<void> {
        const product = this.products.filter({
            hasText: productName
        });

        await product.locator("button").filter({
            hasText: "Add to Cart"
        }).click();
    }

    async navigateToCart(): Promise<void> {
        await this.cartButton.click();
    }
}