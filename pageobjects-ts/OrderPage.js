export class OrderPage {
    page;
    ordersButton;
    orderRows;
    constructor(page) {
        this.page = page;
        this.ordersButton = page.locator("button[routerlink*='myorders']");
        this.orderRows = page.locator("tbody tr");
    }
    async navigateToOrders() {
        await this.ordersButton.click();
        await this.page.locator("tbody").waitFor();
    }
    async openOrder(orderId) {
        const rows = this.orderRows;
        for (let i = 0; i < await rows.count(); i++) {
            const row = rows.nth(i);
            const rowOrderId = await row.locator("th").textContent();
            if (rowOrderId && orderId.includes(rowOrderId.trim())) {
                await row.locator("button").first().click();
                break;
            }
        }
    }
    async getOrderDetails() {
        const orderId = await this.page
            .locator("div.col-text.-main")
            .textContent();
        return orderId?.trim() ?? "";
    }
}
