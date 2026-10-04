export class LoginPage {
    page;
    signInButton;
    userName;
    passWord;
    constructor(page) {
        this.page = page;
        this.signInButton = page.locator("#login");
        this.userName = page.locator("#userEmail");
        this.passWord = page.locator("#userPassword");
    }
    async goto() {
        await this.page.goto("https://rahulshettyacademy.com/client");
    }
    async validLogin(username, password) {
        await this.userName.fill(username);
        await this.passWord.fill(password);
        await this.signInButton.click();
        await this.page.waitForLoadState("networkidle");
    }
}
