const {test,expect,request} = require("@playwright/test");
const payload = {
                userEmail: "saikrishnareddy@gmail.com",
                userPassword: "Sai@12345"
};
const Order_payload ={orders:[{country:"Austria",productOrderedId:"6960eac0c941646b7a8b3e68"}]};
let token;
let orderId;
test.beforeAll(async () => {
const APIcontext = await request.newContext();
const APIResponse = await APIcontext.post(
    "https://rahulshettyacademy.com/api/ecom/auth/login",
        {
        data: payload
    }
);
expect(APIResponse.ok()).toBeTruthy();
const APIResponseJSON =await APIResponse.json();
token = APIResponseJSON.token;
console.log(token);

 //Create Order API
const Create_APIResponse = await APIcontext.post(
          "https://rahulshettyacademy.com/api/ecom/order/create-order",
   {
      data : Order_payload,
      headers:{
                 'Authorization' :token,
                  'Content-Type': 'application/json'
      },
   })
   const Order_ResponseJson = await Create_APIResponse.json(); 
   console.log(Order_ResponseJson);
   orderId = Order_ResponseJson.orders[0];
      
});

test.beforeEach( ()=>
{

})
test("@API User Logging with credentials",async({page})=>
{
   await page.addInitScript(value => {
    
             window.localStorage.setItem('token',value);
             
   },token);
   await page.goto("https://rahulshettyacademy.com/client/");
   console.log(orderId);
   await page.locator("button[routerlink*='myorders']").click();
   await page.locator("tbody").waitFor();
  const rows = await page.locator("tbody tr");

  for(let i=0; i< await rows.count(); ++i){
   const roworderID = await rows.nth(i).locator("th").textContent();
   if(orderId.includes(roworderID))
      {
      await rows.nth(i).locator("button").first().click();
      break;
   }
  }
   const OrderIdDeatils =await page.locator("div.col-text.-main").textContent();
   expect(orderId.includes(OrderIdDeatils)).toBeTruthy();
   console.log(OrderIdDeatils);
   
});
 