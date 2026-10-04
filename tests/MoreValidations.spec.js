const {test,expect} = require('@playwright/test')
test ("@Web MoreValidations",async({page})=>
{
    await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
    //await page.goto("http://google.com");
//1.Page to go forward similiar to the browser action forward
   // await page.goForward();
//2.Page to go Back similiar to the browser action Back
   //await page.goBack();
//3.to visible the hidden items in the page
   await expect(page.locator("#displayed-text")).toBeVisible();
   await page.locator("#hide-textbox").click();
   await page.locator("#show-textbox").click();
//4.Dailog box which displays while performing any action.
   page.on('dialog',dailog => dailog.accept());
//5.After displaying we have confirm by Ok(Confirm Button)
   await page.locator("#confirmbtn").click();
//6.Mouse Hover action by using Locator().hover()
   await page.locator("#mousehover").hover();
   const newFrame = page.frameLocator("#courses-iframe");
   await newFrame.locator("li a[href*='lifetime-access']:visible").click();
   const Subscribers =await newFrame.locator(".text h2").textContent();
   console.log(Subscribers.split(" ")[1]);


});