const {test,expect} = require('@playwright/test')
test("@Web User Logging with credentials",async({browser})=>
{
   const context =await browser.newContext();
   const page = await context.newPage();
   const email = "saikrishnareddy@gmail.com";
   const userName = page.locator("#userEmail");
   const passWord = page.locator("#userPassword");
   const Login = page.locator("#login");
   
   //const products = page.locator(".card-body b");
   await page.goto("https://rahulshettyacademy.com/client/#/auth/login");
   await userName.fill(email);
   await passWord.fill("Sai@12345");
   await Login.click();
   await page.waitForLoadState('networkidle');
   await page.locator(".card-body b").first().waitFor();
   const titles =await page.locator(".card-body b").allTextContents();
   console.log(titles);
   await page.locator(".card-body", { hasText: "ADIDAS ORIGINAL" }).locator("text=Add To Cart").click();
   await page.locator("[routerlink*='/dashboard/cart']").click();
   await page.locator('button').filter({ hasText: 'Checkout' }).click();
   await page.locator("[value*='4542 9931 9292 2293']").clear();
   await page.locator("[value*='4542 9931 9292 2293']").fill("4542 9931 9292 2293");
   await page.locator(".input.ddl").nth(0).selectOption("02");
   await page.locator(".input.ddl").nth(1).selectOption("17");
   await page.locator(".input.txt").nth(1).fill("678");
   await page.locator(".input.txt").nth(2).fill("Saikrishna Magunta");
   await page.locator(".input.txt").nth(3).fill("rahulshettyacademy");
   await page.locator("[type*='submit']").click();
   await expect(page.locator(".mt-1.ng-star-inserted")).toHaveText("* Coupon Applied");
   await page.locator(".input.txt").first().waitFor();
   await page.locator(".input.txt").nth(4).clear("");
   await page.locator(".input.txt").nth(4).fill("saikrishnareddy@gmail.com");
    await page.getByRole('textbox', { name: 'Select Country' }).first().waitFor();
   await page.getByRole('textbox', { name: 'Select Country' }).pressSequentially("Ind",{delay :150});
   const DropDown  =  page.locator(".ta-results");
   await DropDown.waitFor();
   const countryCount = await DropDown.locator("button").count();
   for (let i=0; i< countryCount; ++i)
      {
      const Text = await DropDown.locator("button").nth(i).textContent();
      if(Text === "India")
         {
        await DropDown.locator("button").nth(i).click(); 
        break;
      }
   }
   await expect(page.locator(".user__name [type='text']").first()).toHaveText(email);
   await page.locator('.ta-backdrop').click();
});