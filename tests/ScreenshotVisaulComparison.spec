const { test, expect } = require('@playwright/test');

test("@Web Page&ElementScreenshot", async ({ page }) => {
    await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
    await expect(page.locator("#displayed-text")).toBeVisible();
    //Page ScreenShot
    await page.screenshot({path: 'pagescreenshot.png'});
    //Locator Screenshot
    await page.locator("#displayed-text").screenshot({path:'LocatorScreenshot.png'});
    await page.locator("#hide-textbox").click();
    
});
// VisualComparison-UI Testing
test("@Web Visaulcomaprison",async({page})=>
    {
     await page.goto("https://petstore.octoperf.com/actions/Catalog.action")
     expect(await page.screenshot()).toMatchSnapshot('LandingPage.png');
});
