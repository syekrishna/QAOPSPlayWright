const {test,expect } = require('@playwright/test')
const {customtest} = require('../utlis/test-base');
const { POManager } = require('../pageobjects/POManager')


customtest(`User Logging`, async ({page,testforProduct }) => 
{
   const poManager = new POManager(page);
   const loginpage = poManager.getLoginPage();
   await loginpage.goto();
   await loginpage.validLogin(testforProduct.username, testforProduct.password);
   const dashboardPage = poManager.getDashboardPage();
   await dashboardPage.searchTextAddCart(testforProduct.productName);
   await dashboardPage.navigateToCart();

   await page.locator("div li").first().waitFor();
   const bool = await page.locator("h3:has-text('iphone 13 pro')").isVisible();
   console.log(await page.locator("h3:has-text('iphone 13 pro')").textContent());
   expect(bool).toBeTruthy();
   await page.locator('button').filter({ hasText: 'Checkout' }).click();
   await page.locator(".input.txt").first().waitFor();
   await page.locator("[placeholder*=Country]").pressSequentially("India")
   const dropdown = page.locator(".ta-results button");
   await dropdown.first().waitFor();
   await dropdown.last().click();
   await expect(page.locator(".user__name [type='text']").first()).toHaveText(testforProduct.username);
   await page.locator('a:has-text("PLACE ORDER")').click();
   await expect(page.locator(".hero-primary")).toHaveText(" Thankyou for the order. ");
   const OrderId = await page.locator(".em-spacer-1 .ng-star-inserted").first().textContent();
   console.log(OrderId);
   await page.locator("button[routerlink*='myorders']").click();
   await page.locator("tbody").waitFor();
   const rows = await page.locator("tbody tr");

   for (let i = 0; i < await rows.count(); ++i) {
      const roworderID = await rows.nth(i).locator("th").textContent();
      if (OrderId.includes(roworderID)) {
         await rows.nth(i).locator("button").first().click();
         break;
      }
   }
   const OrderIdDeatils = await page.locator("div.col-text.-main").textContent();
   expect(OrderId.includes(OrderIdDeatils)).toBeTruthy();
   console.log(OrderIdDeatils);
});