const { test, expect } = require('@playwright/test');
test('@Web Network-Interception', async ({ page }) => {
    await page.goto('https://rahulshettyacademy.com/client/#/auth/login');
    await page.locator("[type='email']").fill("saikrishnareddy@gmail.com");
    await page.locator("[type='password']").fill("Sai@12345");
    await page.locator("[type='submit']").click();

    await page.waitForLoadState('networkidle');
    await page.locator(".card-body b").first().waitFor();
    await page.locator("button[routerLink*='myorders']").click();
    await page.route("https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=*",
        route => route.continue({ url: "https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=6a39570d378febeacdc3fc49" }))
    await page.locator("button:has-text('View')").first().click();
    await expect(page.locator("p").last()).toHaveText("You are not authorize to view this order");
}
)
