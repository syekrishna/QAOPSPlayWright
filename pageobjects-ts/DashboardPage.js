export class DashboardPage {
    page;
    products;
    cartButton;
    constructor(page) {
        this.page = page;
        this.products = page.locator(".card");
        this.cartButton = page.locator("[routerlink*='cart']");
    }
    async searchTextAddCart(productName) {
        const product = this.products.filter({
            hasText: productName
        });
        await product.locator("button").filter({
            hasText: "Add to Cart"
        }).click();
    }
    async navigateToCart() {
        await this.cartButton.click();
    }
}
