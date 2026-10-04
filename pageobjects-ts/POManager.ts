import { type Page } from "@playwright/test";

import { LoginPage } from "./LoginPage";
import { DashboardPage } from "./DashboardPage";
import { CartPage } from "./CartPage";
import { CheckoutPage } from "./CheckoutPage";
import { OrderPage } from "./OrderPage";

export class POManager {
    readonly page: Page;

    readonly loginPage: LoginPage;
    readonly dashboardPage: DashboardPage;
    readonly cartPage: CartPage;
    readonly checkoutPage: CheckoutPage;
    readonly orderPage: OrderPage;

    constructor(page: Page) {
        this.page = page;

        this.loginPage = new LoginPage(page);
        this.dashboardPage = new DashboardPage(page);
        this.cartPage = new CartPage(page);
        this.checkoutPage = new CheckoutPage(page);
        this.orderPage = new OrderPage(page);
    }

    getLoginPage(): LoginPage {
        return this.loginPage;
    }

    getDashboardPage(): DashboardPage {
        return this.dashboardPage;
    }

    getCartPage(): CartPage {
        return this.cartPage;
    }

    getCheckoutPage(): CheckoutPage {
        return this.checkoutPage;
    }

    getOrderPage(): OrderPage {
        return this.orderPage;
    }
}