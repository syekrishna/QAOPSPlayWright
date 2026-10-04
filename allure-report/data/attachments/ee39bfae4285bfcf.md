# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: DemoAppPOFixture.spec.js >> User Logging
- Location: tests\DemoAppPOFixture.spec.js:6:12

# Error details

```
Error: locator.waitFor: Target page, context or browser has been closed
Call log:
  - waiting for locator('div li').first() to be visible

```

# Test source

```ts
  1  | const {test,expect } = require('@playwright/test')
  2  | const {customtest} = require('../utlis/test-base');
  3  | const { POManager } = require('../pageobjects/POManager')
  4  | 
  5  | 
  6  | customtest.only(`User Logging`, async ({page,testforProduct }) => 
  7  | {
  8  |    const poManager = new POManager(page);
  9  |    const loginpage = poManager.getLoginPage();
  10 |    await loginpage.goto();
  11 |    await loginpage.validLogin(testforProduct.username, testforProduct.password);
  12 |    const dashboardPage = poManager.getDashboardPage();
  13 |    await dashboardPage.searchTextAddCart(testforProduct.productName);
  14 |    await dashboardPage.navigateToCart();
  15 | 
> 16 |    await page.locator("div li").first().waitFor();
     |                                         ^ Error: locator.waitFor: Target page, context or browser has been closed
  17 |    const bool = await page.locator("h3:has-text('iphone 13 pro')").isVisible();
  18 |    console.log(await page.locator("h3:has-text('iphone 13 pro')").textContent());
  19 |    expect(bool).toBeTruthy();
  20 |    await page.locator('button').filter({ hasText: 'Checkout' }).click();
  21 |    await page.locator(".input.txt").first().waitFor();
  22 |    await page.locator("[placeholder*=Country]").pressSequentially("India")
  23 |    const dropdown = page.locator(".ta-results button");
  24 |    await dropdown.first().waitFor();
  25 |    await dropdown.last().click();
  26 |    await expect(page.locator(".user__name [type='text']").first()).toHaveText(testforProduct.username);
  27 |    await page.locator('a:has-text("PLACE ORDER")').click();
  28 |    await expect(page.locator(".hero-primary")).toHaveText(" Thankyou for the order. ");
  29 |    const OrderId = await page.locator(".em-spacer-1 .ng-star-inserted").first().textContent();
  30 |    console.log(OrderId);
  31 |    await page.locator("button[routerlink*='myorders']").click();
  32 |    await page.locator("tbody").waitFor();
  33 |    const rows = await page.locator("tbody tr");
  34 | 
  35 |    for (let i = 0; i < await rows.count(); ++i) {
  36 |       const roworderID = await rows.nth(i).locator("th").textContent();
  37 |       if (OrderId.includes(roworderID)) {
  38 |          await rows.nth(i).locator("button").first().click();
  39 |          break;
  40 |       }
  41 |    }
  42 |    const OrderIdDeatils = await page.locator("div.col-text.-main").textContent();
  43 |    expect(OrderId.includes(OrderIdDeatils)).toBeTruthy();
  44 |    console.log(OrderIdDeatils);
  45 | });
```