const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const { POManager } = require('../../pageobjects/POManager');

// ======================================================
// LOGIN
// ======================================================

Given(
    'a login to Ecommerce application with {string} and {string}',
    { timeout: 300 * 1000 },

    async function (username, password) {
         this.username = username;
         const loginPage = this.poManager.getLoginPage();

        await loginPage.goto();

        await loginPage.validLogin(username, password);
    }
);


// ======================================================
// ADD PRODUCT TO CART
// ======================================================

When(
    'add a {string} product to the Cart',

    async function (productName) {

        this.dashboardPage =
            this.poManager.getDashboardPage();

        await this.dashboardPage
            .searchTextAddCart(productName);

        await this.dashboardPage
            .navigateToCart();
    }
);


// ======================================================
// VERIFY PRODUCT IN CART
// ======================================================

Then(
    'Verify iphone 13 pro is displayed in the Cart',

    async function () {

        // Wait for cart
        await this.page
            .locator("div li")
            .first()
            .waitFor();

        // Locate product
        const product = this.page.locator(
            "h3:has-text('iphone 13 pro')"
        );

        // Verify product is visible
        await expect(product).toBeVisible();

        console.log(
            "Product in cart:",
            await product.textContent()
        );

        // Checkout
        await this.page
            .locator('button')
            .filter({ hasText: 'Checkout' })
            .click();

        // Wait for checkout page
        await this.page
            .locator(".input.txt")
            .first()
            .waitFor();
    }
);


// ======================================================
// ENTER DETAILS AND PLACE ORDER
// ======================================================

When(
    'Enter valid Details and Place the Order',

    async function () {

        // ----------------------------------------------
        // Enter Country
        // ----------------------------------------------

        await this.page
            .locator("[placeholder*=Country]")
            .pressSequentially("India");


        // ----------------------------------------------
        // Country Dropdown
        // ----------------------------------------------

        const dropdown =
            this.page.locator(".ta-results button");

        await dropdown
            .first()
            .waitFor();

        await dropdown
            .last()
            .click();


        // ----------------------------------------------
        // Verify logged-in user
        // ----------------------------------------------

        const userName =
            this.page.locator(".user__name").first();

        await expect(userName)
        .toContainText(this.username);


        // ----------------------------------------------
        // Place Order
        // ----------------------------------------------

        await this.page
            .locator('a:has-text("PLACE ORDER")')
            .click();


        // ----------------------------------------------
        // Verify Order Confirmation
        // ----------------------------------------------

        await expect(
            this.page.locator(".hero-primary")
        ).toHaveText(
            " Thankyou for the order. "
        );


        // ----------------------------------------------
        // Capture Order ID
        // ----------------------------------------------

        this.OrderId =
            await this.page
                .locator(
                    ".em-spacer-1 .ng-star-inserted"
                )
                .first()
                .textContent();

        console.log(
            "Order ID:",
            this.OrderId
        );


        // ----------------------------------------------
        // Navigate to Order History
        // ----------------------------------------------

        await this.page
            .locator(
                "button[routerlink*='myorders']"
            )
            .click();


        // Wait for Order History
        await this.page
            .locator("tbody")
            .waitFor();


        // ----------------------------------------------
        // Find Order ID
        // ----------------------------------------------

        const rows =
            this.page.locator("tbody tr");

        const rowCount =
            await rows.count();

        console.log(
            "Number of orders:",
            rowCount
        );


        for (let i = 0; i < rowCount; i++) {

            const rowOrderID =
                await rows
                    .nth(i)
                    .locator("th")
                    .textContent();

            console.log(
                "Row Order ID:",
                rowOrderID
            );


            if (
                this.OrderId &&
                rowOrderID &&
                this.OrderId.includes(rowOrderID.trim())
            ) {

                await rows
                    .nth(i)
                    .locator("button")
                    .first()
                    .click();

                break;
            }
        }
    }
);


// ======================================================
// VERIFY ORDER IN ORDER HISTORY
// ======================================================

Then(
    'Verify the Order is present in the OrderHistory',

    async function () {

        // Get Order ID displayed in Order Details
        const OrderIdDetails =
            await this.page
                .locator("div.col-text.-main")
                .textContent();


        console.log(
            "Order ID from Order History:",
            OrderIdDetails
        );


        // Verify Order ID
        expect(
            this.OrderId.includes(
                OrderIdDetails.trim()
            )
        ).toBeTruthy();
    }
);

Given('a Login to Ecommerce2 Application with {string} and {string}',{timeout:100*1000},async function (username,password) {
  // Write code here that turns the phrase above into concrete actions
  this.userName = this.page.locator("[name='username']");
   this.passWord = this.page.locator("[name='password']");
   const signInButton = this.page.locator("[type='submit']");
  await this.page.goto("https://rahulshettyacademy.com/loginpagePractise/");
   await this.userName.fill("Admin");
   await this.passWord.fill("password");
   await signInButton.click();
});

Then('verify the login successfully or not', async function () {
  // Write code here that turns the phrase above into concrete actions
  console.log(await this.page.locator("[style*='block']").textContent());
   await expect (this.page.locator("[style*='block']")).toContainText('Incorrect');
});
