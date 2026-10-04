const { test, expect, request } = require('@playwright/test');

const Payload = {
    userEmail: "saikrishnareddy@gmail.com",
    userPassword: "Sai@12345"
};

test.beforeAll(async () => {
    const LoginAPI = await request.newContext();

    const LoginResponse = await LoginAPI.post(
        "https://rahulshettyacademy.com/api/ecom/auth/login",
    {
        data: Payload
    }
    );

    expect(LoginResponse.ok()).toBeTruthy();

    const loginResponseJson = await LoginResponse.json();
    const token = loginResponseJson.token;

    console.log("Token:", token);
});

test('@API Login API Test', async () => {
    console.log("Test executed successfully");
});