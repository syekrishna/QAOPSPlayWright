const {LoginPage}= require('../pageobjects/LoginPage');
const {DashboardPage}= require('../pageobjects/DashboardPage');

class POManager
{
    constructor(page)
    {
        this.page =page;
        this.LoginPage= new LoginPage(this.page);
        this.DashboardPage=new DashboardPage(this.page);

    }
getLoginPage()
{
    return this.LoginPage;
}
getDashboardPage(){
    return this.DashboardPage;
}
}
module.exports = {POManager};