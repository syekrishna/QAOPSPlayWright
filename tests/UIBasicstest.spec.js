const {test,expect} = require('@playwright/test')


test('@Web Browser context Playwright test',async({browser})=>
{
 const context = await browser.newContext();
 const page = await context.newPage();
 await page.goto("https://cwiki.apache.org/confluence/display/JMETER/Home");
});

test('page context',async ({page})=>
{
await page.goto("https://jsonformatter.org/json-viewer");
});

test('Test only',async({page})=>
{
   await page.goto("https://google.com");
   // get title -assertion
   console.log(await page.title());
   await expect(page).toHaveTitle("Google");

});
test('@Web rahulshettyacademy.com/loginpagePractise',async({page})=>
   {
   const userName = page.locator("[name='username']");
   const passWord = page.locator("[name='password']");
   const signInButton = page.locator("[type='submit']");
   await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
   await userName.fill("Admin");
   await passWord.fill("password");
   await signInButton.click();
   console.log(await page.locator("[style*='block']").textContent());
   await expect (page.locator("[style*='block']")).toContainText('Incorrect');
   await userName.fill("");
   await passWord.fill("");
   await userName.fill("rahulshettyacademy");
   await passWord.fill("Learning@830$3mK2");
   await signInButton.click();
   // parent to child Selector =====> ".card-body a"
   // for selecting IphoneX among the page
   console.log(await page.locator(".card-body a").nth(0).textContent());
  // await expect (page.locator(".card-body a")).toContainText('iphone X');
});

test('@Web Assignment lecture-16',async({page})=>
   {
   await page.goto('https://rahulshettyacademy.com/client/#/auth/login');
   await page.locator("[type='email']").fill("saikrishnareddy@gmail.com");
   await page.locator("[type='password']").fill("Sai@12345");
   await page.locator("[type='submit']").click();
   console.log(await page.locator(".card-body b").nth(0).textContent());
   const cardtitles = await page.locator(".card-body b").allTextContents();
   console.log(cardtitles);

});