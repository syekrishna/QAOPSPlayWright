import { test, expect } from "@playwright/test";

import { POManager } from "../pageobjects-ts/POManager";
import dataset from "../utlis/ProductDatasetTest.json";

test("User Logging with credentials", async ({ page }) => {

    const poManager = new POManager(page);

    // Login
    const loginPage = poManager.getLoginPage();

    await loginPage.goto();
    await loginPage.validLogin(
        dataset.username,
        dataset.password
    );

    // Dashboard
    const dashboardPage = poManager.getDashboardPage();

    await dashboardPage.searchTextAddCart(
        dataset.productName
    );

    await dashboardPage.navigateToCart();

    // Cart
    const cartPage = poManager.getCartPage();

    await cartPage.verifyProduct(
        dataset.productName
    );

    await cartPage.checkout();

    // Checkout
    const checkoutPage = poManager.getCheckoutPage();

    await checkoutPage.selectCountry("India");

    await expect(
        checkoutPage.userName
    ).toHaveValue(dataset.username);

    await checkoutPage.placeOrder();

    // Get Order ID
    const orderId = await checkoutPage.getOrderId();

    console.log("Order ID:", orderId);

    // Orders
    const orderPage = poManager.getOrderPage();

    await orderPage.navigateToOrders();

    await orderPage.openOrder(orderId);

    // Verify Order ID
    const orderDetails = await orderPage.getOrderDetails();

    console.log("Order Details:", orderDetails);

    expect(orderId).toContain(orderDetails);
});