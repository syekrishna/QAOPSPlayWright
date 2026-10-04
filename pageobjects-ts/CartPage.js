export class CartPage {
    page;
    cartItems;
    checkoutButton;
    constructor(page) {
        this.page = page;
        this.cartItems = page.locator("div li");
        this.checkoutButton = page.locator("button").filter({
            hasText: "Checkout"
        });
    }
    async verifyProduct(productName) {
        const product = this.page.locator("h3", {
            hasText: productName
        });
        await product.waitFor();
    }
    async checkout() {
        await this.checkoutButton.click();
    }
}
