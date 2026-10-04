

module.exports={ApiUtlis};
class ApiUtlis{

    constructor(APIcontext,payload){
             this.APIcontext=APIcontext;
             this.payload=payload;
        
    }
    async get Token()
    {
        const APIcontext = await request.newContext();
        const APIResponse = await APIcontext.post(
            "https://rahulshettyacademy.com/api/ecom/auth/login",
                {
                data: this.payload
            }
        );
        const APIResponseJSON =await APIResponse.json();
        token = APIResponseJSON.token;
        console.log(token);
        return token;
    }
    async createOrder(Order_payload){
        const Create_APIResponse = await APIcontext.post(
          "https://rahulshettyacademy.com/api/ecom/order/create-order",
   {
      data : Order_payload,
      headers:{
                 'Authorization' :this.getToken(),
                  'Content-Type': 'application/json'
      },
   })
   const Order_ResponseJson = await Create_APIResponse.json(); 
   console.log(Order_ResponseJson);
   orderId = Order_ResponseJson.orders[0];
   return orderId
    }
}