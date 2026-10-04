class DashboardPage
{
 constructor(page){
    this.page = page;
    this.products = page.locator(".card-body");
    this.productsText = page.locator(".card-body b");
    this.Cart = page.locator("[routerlink$='cart']");
 }
async searchTextAddCart(productName)
{
    
       const titles =await this.productsText.allTextContents();
       console.log(titles);
       const count =await this.products.count();
       for(let i=0; i<count; ++i)
       {
          if(await this.products.nth(i).locator("b").textContent() === productName)
          {
            await this.products.nth(i).locator("text= Add To Cart").click();
            break;
          }
       }
}
async navigateToCart(){
  // await this.page.locator("[routerlink*='cart']").click();
  await this.Cart.click();
}
}
module.exports = {DashboardPage}