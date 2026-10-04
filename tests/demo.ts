import {type Page} from '@playwright/test'
//Number notation
let a:number =10;
let b:number = 20;
let c:number = a+b;
let d:number = b-a;
//string notation
let message:string ="Playwright";
let message1:string="Automation";


console.log(c);
console.log(d);
console.log(message+message1);
//Boolean notation
let isActive:boolean=true;
console.log(isActive);
//function call
function add(a:number,b:number):number
{
    return a+b
}
console.log(add(10,20));
//arrays
let names:string[]=["Asus","dell","HP"];
let numbersarry:number[]=[10,20,30]
console.log(numbersarry);
console.log(names);
console.log(names[0]);


//class 

//const {LoginPage}= require('../pageobjects/LoginPage');
//const {DashboardPage}= require('../pageobjects/DashboardPage');
