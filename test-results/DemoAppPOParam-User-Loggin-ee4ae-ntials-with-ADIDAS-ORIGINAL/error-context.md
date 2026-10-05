# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: DemoAppPOParam.spec.js >> User Logging with credentials with ADIDAS ORIGINAL
- Location: tests\DemoAppPOParam.spec.js:8:2

# Error details

```
Test timeout of 40000ms exceeded.
```

```
Error: locator.waitFor: Test timeout of 40000ms exceeded.
Call log:
  - waiting for locator('div li').first() to be visible

```

# Page snapshot

```yaml
- generic [ref=e3]:
  - navigation [ref=e5]:
    - generic [ref=e7]:
      - link "Automation Automation Practice":
        - /url: ""
        - generic [ref=e8] [cursor=pointer]:
          - heading "Automation" [level=3] [ref=e9]
          - paragraph [ref=e10]: Automation Practice
    - text: 
    - link "🎯 I'll help you prepare for your next QA job — Explore the QA Career Accelerator." [ref=e11] [cursor=pointer]:
      - /url: https://rahulshettyacademy.com/qa-career-accelerator-job-ready
    - list [ref=e12]:
      - listitem [ref=e13] [cursor=pointer]:
        - button " HOME" [ref=e14]:
          - generic [ref=e15]: 
          - text: HOME
      - listitem
      - listitem [ref=e16] [cursor=pointer]:
        - button " ORDERS" [ref=e17]:
          - generic [ref=e18]: 
          - text: ORDERS
      - listitem [ref=e19] [cursor=pointer]:
        - button " Cart" [ref=e20]:
          - generic [ref=e21]: 
          - text: Cart
      - listitem [ref=e22] [cursor=pointer]:
        - button "Sign Out" [ref=e23]:
          - generic [ref=e24]: 
          - text: Sign Out
  - generic [ref=e25]:
    - generic [ref=e26]:
      - heading "My Cart" [level=1] [ref=e27]
      - button "Continue Shopping❯" [ref=e28] [cursor=pointer]
    - heading "No Products in Your Cart !" [level=1] [ref=e30]
```

# Test source

```ts
  1  | const { test, expect } = require('@playwright/test')
  2  | const { POManager } = require('../pageobjects/POManager')
  3  | //Json->String->JavaScript Object
  4  | const dataset = JSON.parse(JSON.stringify(require("../utlis/PrdParameter.json")));
  5  | 
  6  | for(const data of dataset)
  7  | {
  8  |  test(`User Logging with credentials with ${data.productName}`, async ({ page }) => {
  9  |    const poManager = new POManager(page);
  10 |    const loginpage = poManager.getLoginPage();
  11 |    await loginpage.goto();
  12 |    await loginpage.validLogin(data.username, data.password);
  13 |    const dashboardPage = poManager.getDashboardPage();
  14 |    await dashboardPage.searchTextAddCart(data.productName);
  15 |    await dashboardPage.navigateToCart();
  16 | 
> 17 |    await page.locator("div li").first().waitFor();
     |                                         ^ Error: locator.waitFor: Test timeout of 40000ms exceeded.
  18 |    const bool = await page.locator(`h3:has-text('${data.productName}')`).isVisible();
  19 |    console.log(await page.locator(`h3:has-text('${data.productName}')`).textContent());
  20 |    expect(bool).toBeTruthy();
  21 |    await page.locator('button').filter({ hasText: 'Checkout' }).click();
  22 |    await page.locator(".input.txt").first().waitFor();
  23 |    await page.locator("[placeholder*=Country]").pressSequentially("India")
  24 |    const dropdown = page.locator(".ta-results button");
  25 |    await dropdown.first().waitFor();
  26 |    await dropdown.last().click();
  27 |    await expect(page.locator(".user__name [type='text']").first()).toHaveText(data.username);
  28 |    await page.locator('a:has-text("PLACE ORDER")').click();
  29 |    await expect(page.locator(".hero-primary")).toHaveText(" Thankyou for the order. ");
  30 |    const OrderId = await page.locator(".em-spacer-1 .ng-star-inserted").first().textContent();
  31 |    console.log(OrderId);
  32 |    await page.locator("button[routerlink*='myorders']").click();
  33 |    await page.locator("tbody").waitFor();
  34 |    const rows = await page.locator("tbody tr");
  35 | 
  36 |    for (let i = 0; i < await rows.count(); ++i) {
  37 |       const roworderID = await rows.nth(i).locator("th").textContent();
  38 |       if (OrderId.includes(roworderID)) {
  39 |          await rows.nth(i).locator("button").first().click();
  40 |          break;
  41 |       }
  42 |    }
  43 |    const OrderIdDeatils = await page.locator("div.col-text.-main").textContent();
  44 |    expect(OrderId.includes(OrderIdDeatils)).toBeTruthy();
  45 |    console.log(OrderIdDeatils);
  46 | });
  47 | }
  48 | 
```