const { test, expect } = require('@playwright/test');

let webcontext;

test.beforeAll(async ({ browser }) => {
    const context = await browser.newContext();
    const page = await context.newPage();

    await page.goto('https://rahulshettyacademy.com/client/#/auth/login');

    await page.locator("[type='email']").fill("saikrishnareddy@gmail.com");
    await page.locator("[type='password']").fill("Sai@12345");
    await page.locator("[type='submit']").click();

    await page.waitForLoadState('networkidle');

    console.log(await page.locator(".card-body b").first().textContent());

    await context.storageState({ path: 'state.json' });

    webcontext = await browser.newContext({
        storageState: 'state.json'
    });
});

test('@Web testcase:1', async () => {

    const page = await webcontext.newPage();

    await page.goto('https://rahulshettyacademy.com/client/');

    await page.locator(".card-body b").first().waitFor();

    const cardtitles = await page.locator(".card-body b").allTextContents();

    console.log(cardtitles);

    expect(cardtitles.length).toBeGreaterThan(0);
});
test('@Web test case:2', async () => {

    const page = await webcontext.newPage();

    await page.goto('https://rahulshettyacademy.com/client/');

    await page.locator(".card-body b").first().waitFor();

    const cardtitles = await page.locator(".card-body b").allTextContents();

    console.log(cardtitles);

    expect(cardtitles.length).toBeGreaterThan(0);
});
test.afterAll(async () => {
    await webcontext.close();
});
//test('rahulshettyacademy.com/loginpagePractise',async({page})=>
  //  {
  //  const userName = page.locator("[name='username']");
  //  const passWord = page.locator("[name='password']");
  //  const signInButton = page.locator("[type='submit']");
  //  const DocumentLink = page.getByRole('link', { name: 'Free Access to InterviewQues/' });
  //  const ShortlistedLink = page.getByRole('link', { name: 'Join Rahul Shetty for a QA' });
  //  await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
  //  await userName.fill("rahulshettyacademy");
  //  await passWord.fill("Learning@830$3mK2");
  //  const Dropdown = page.locator("select.form-control");
  //  await Dropdown.selectOption("consult");
  //  //await page.pause();
  //  await page.locator("span.radiotextsty").last().click();
  //  await page.locator("#okayBtn").click();
  //  console.log(await page.locator("span.radiotextsty").last().isChecked());
  //  await expect(page.locator("span.radiotextsty").last()).toBeChecked();
  //  await page.locator("#terms").click();
  //  await expect(page.locator("#terms")).toBeChecked();
  //  await page.locator("#terms").uncheck();
  //  expect(await page.locator("#terms").isChecked()).toBeFalsy();
  //  await expect(DocumentLink).toHaveAttribute("class","blinkingText");
  //  await expect(ShortlistedLink).toHaveAttribute("class","blinkingText");
  //  await page.locator(DocumentLink).click();
  //  await expect(page.locator("p.im-para.red")).toContainText("Please email us at ");
  //  await signInButton.click();
  //  // parent to child Selector =====> ".card-body a"
   // for selecting IphoneX among the page
//    console.log(await page.locator(".card-body a").nth(0).textContent());
//   await expect (page.locator(".card-body a")).toContainText('iphone X');
// });
// test("Switch to Other Browser",async({browser})=>
// {
//   const context = await browser.newContext();
//   const page = await context.newPage();
//   const DocumentLink = page.locator("[href*='documents-request']");
//   //const userName = page.locator("[name='username']");
//   await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
//   const [newPage] =await Promise.all([context.waitForEvent('page'),DocumentLink.click()])
//   const PageText = await newPage.locator(".red").textContent();
//   console.log(PageText);
//   const arrayText = PageText.split("@")
//   const Domain = PageText.split(" ")[4]
//   const arrayEmail = Domain.split("@")[1]
//   const email = arrayEmail.split(".")[0]
//   console.log(Domain);
//   console.log(email);
//   await  page.locator("[name='username']").fill(email);
//   //console.log(await page.locator("[name='username']").textContent());

// });

