# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: DemoApp3.specs.js >> User Logging with credentials
- Location: tests\DemoApp3.specs.js:9:1

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
  1   | const { test, expect } = require('@playwright/test')
  2   | const { POManager } = require('../pageobjects/POManager')
  3   | const {customtest} = require('../utlis/test-base');
  4   | //Json->String->JavaScript Object
  5   | const dataset = JSON.parse(JSON.stringify(require("../utlis/PrdParameter.json")));
  6   | const dataset1= JSON.parse(JSON.stringify(require("../utlis/ProductDatasetTest.json")));
  7   | 
  8   | 
  9   | test("User Logging with credentials", async ({ page }) => {
  10  |    const poManager = new POManager(page);
  11  |    const loginpage = poManager.getLoginPage();
  12  |    await loginpage.goto();
  13  |    await loginpage.validLogin(dataset1.username, dataset1.password);
  14  |    const dashboardPage = poManager.getDashboardPage();
  15  |    await dashboardPage.searchTextAddCart(dataset1.productName);
  16  |    await dashboardPage.navigateToCart();
  17  | 
> 18  |    await page.locator("div li").first().waitFor();
      |                                         ^ Error: locator.waitFor: Test timeout of 40000ms exceeded.
  19  |    const bool = await page.locator("h3:has-text('iphone 13 pro')").isVisible();
  20  |    console.log(await page.locator("h3:has-text('iphone 13 pro')").textContent());
  21  |    expect(bool).toBeTruthy();
  22  |    await page.locator('button').filter({ hasText: 'Checkout' }).click();
  23  |    await page.locator(".input.txt").first().waitFor();
  24  |    await page.locator("[placeholder*=Country]").pressSequentially("India")
  25  |    const dropdown = page.locator(".ta-results button");
  26  |    await dropdown.first().waitFor();
  27  |    await dropdown.last().click();
  28  |    await expect(page.locator(".user__name [type='text']").first()).toHaveText(dataset1.username);
  29  |    await page.locator('a:has-text("PLACE ORDER")').click();
  30  |    await expect(page.locator(".hero-primary")).toHaveText(" Thankyou for the order. ");
  31  |    const OrderId = await page.locator(".em-spacer-1 .ng-star-inserted").first().textContent();
  32  |    console.log(OrderId);
  33  |    await page.locator("button[routerlink*='myorders']").click();
  34  |    await page.locator("tbody").waitFor();
  35  |    const rows = await page.locator("tbody tr");
  36  | 
  37  |    for (let i = 0; i < await rows.count(); ++i) {
  38  |       const roworderID = await rows.nth(i).locator("th").textContent();
  39  |       if (OrderId.includes(roworderID)) {
  40  |          await rows.nth(i).locator("button").first().click();
  41  |          break;
  42  |       }
  43  |    }
  44  |    const OrderIdDeatils = await page.locator("div.col-text.-main").textContent();
  45  |    expect(OrderId.includes(OrderIdDeatils)).toBeTruthy();
  46  |    console.log(OrderIdDeatils);
  47  | });
  48  | 
  49  | for(const data of dataset)
  50  | {
  51  |  test(`User Logging with credentials with ${data.productName}`, async ({ page }) => {
  52  |    const poManager = new POManager(page);
  53  |    const loginpage = poManager.getLoginPage();
  54  |    await loginpage.goto();
  55  |    await loginpage.validLogin(data.username, data.password);
  56  |    const dashboardPage = poManager.getDashboardPage();
  57  |    await dashboardPage.searchTextAddCart(data.productName);
  58  |    await dashboardPage.navigateToCart();
  59  | 
  60  |    await page.locator("div li").first().waitFor();
  61  |    const bool = await page.locator(`h3:has-text('${data.productName}')`).isVisible();
  62  |    console.log(await page.locator(`h3:has-text('${data.productName}')`).textContent());
  63  |    expect(bool).toBeTruthy();
  64  |    await page.locator('button').filter({ hasText: 'Checkout' }).click();
  65  |    await page.locator(".input.txt").first().waitFor();
  66  |    await page.locator("[placeholder*=Country]").pressSequentially("India")
  67  |    const dropdown = page.locator(".ta-results button");
  68  |    await dropdown.first().waitFor();
  69  |    await dropdown.last().click();
  70  |    await expect(page.locator(".user__name [type='text']").first()).toHaveText(data.username);
  71  |    await page.locator('a:has-text("PLACE ORDER")').click();
  72  |    await expect(page.locator(".hero-primary")).toHaveText(" Thankyou for the order. ");
  73  |    const OrderId = await page.locator(".em-spacer-1 .ng-star-inserted").first().textContent();
  74  |    console.log(OrderId);
  75  |    await page.locator("button[routerlink*='myorders']").click();
  76  |    await page.locator("tbody").waitFor();
  77  |    const rows = await page.locator("tbody tr");
  78  | 
  79  |    for (let i = 0; i < await rows.count(); ++i) {
  80  |       const roworderID = await rows.nth(i).locator("th").textContent();
  81  |       if (OrderId.includes(roworderID)) {
  82  |          await rows.nth(i).locator("button").first().click();
  83  |          break;
  84  |       }
  85  |    }
  86  |    const OrderIdDeatils = await page.locator("div.col-text.-main").textContent();
  87  |    expect(OrderId.includes(OrderIdDeatils)).toBeTruthy();
  88  |    console.log(OrderIdDeatils);
  89  | });
  90  | }
  91  | 
  92  | customtest(`User Logging`, async ({page,testforProduct}) => 
  93  | {
  94  |    const poManager = new POManager(page);
  95  |    const loginpage = poManager.getLoginPage();
  96  |    await loginpage.goto();
  97  |    await loginpage.validLogin(testforProduct.username,testforProduct.password);
  98  |    const dashboardPage = poManager.getDashboardPage();
  99  |    await dashboardPage.searchTextAddCart(testforProduct.productName);
  100 |    await dashboardPage.navigateToCart();
  101 | 
  102 |    await page.locator("div li").first().waitFor();
  103 |    const bool = await page.locator("h3:has-text('iphone 13 pro')").isVisible();
  104 |    console.log(await page.locator("h3:has-text('iphone 13 pro')").textContent());
  105 |    expect(bool).toBeTruthy();
  106 |    await page.locator('button').filter({ hasText: 'Checkout' }).click();
  107 |    await page.locator(".input.txt").first().waitFor();
  108 |    await page.locator("[placeholder*=Country]").pressSequentially("India")
  109 |    const dropdown = page.locator(".ta-results button");
  110 |    await dropdown.first().waitFor();
  111 |    await dropdown.last().click();
  112 |    await expect(page.locator(".user__name [type='text']").first()).toHaveText(testforProduct.username);
  113 |    await page.locator('a:has-text("PLACE ORDER")').click();
  114 |    await expect(page.locator(".hero-primary")).toHaveText(" Thankyou for the order. ");
  115 |    const OrderId = await page.locator(".em-spacer-1 .ng-star-inserted").first().textContent();
  116 |    console.log(OrderId);
  117 |    await page.locator("button[routerlink*='myorders']").click();
  118 |    await page.locator("tbody").waitFor();
```