const{Before,After, BeforeStep,AfterStep, Status} = require('@cucumber/cucumber');
const playwright = require('@playwright/test');
const { POManager } = require('../../pageobjects/POManager');

Before(async function(){
     this.browser = await playwright.chromium.launch({
                        headless: false
                    });
            
                    // Create browser context
                    this.context = await this.browser.newContext();
            
                    // Create page
                    this.page = await this.context.newPage();
            
                    // Store username for later steps
                   
            
                    // Create POManager
                    this.poManager = new POManager(this.page);
});

After(function(){
    console.log("I am Executing Last");
})

BeforeStep(function(){
    //Run at every step
})

AfterStep(async function(result){
    if(result.status === Status.FAILED){
        await this.page.screenshot({path:'cucumber-Result.png'});
    }
    
})