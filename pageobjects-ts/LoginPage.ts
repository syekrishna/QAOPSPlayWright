import { type Page, type Locator } from "@playwright/test";

export class LoginPage {
    readonly page: Page;
    readonly signInButton: Locator;
    readonly userName: Locator;
    readonly passWord: Locator;

    constructor(page: Page) {
        this.page = page;
        this.signInButton = page.locator("#login");
        this.userName = page.locator("#userEmail");
        this.passWord = page.locator("#userPassword");
    }

    async goto(): Promise<void> {
        await this.page.goto("https://rahulshettyacademy.com/client");
    }

    async validLogin(username: string, password: string): Promise<void> {
        await this.userName.fill(username);
        await this.passWord.fill(password);
        await this.signInButton.click();
        await this.page.waitForLoadState("networkidle");
    }
}