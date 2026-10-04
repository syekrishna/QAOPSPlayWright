const base = require('@playwright/test');

exports.customtest = base.test.extend(
{
  testforProduct: {
    username: "saikrishnareddy@gmail.com",
    password: "Sai@12345",
    productName: "iphone 13 pro"
  }
}
);